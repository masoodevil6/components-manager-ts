import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {gzipSync} from "node:zlib";
import {readFileSync, statSync} from "node:fs";
import {basename, dirname, join, resolve, relative} from "node:path";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = join(root, "inside-project/consumer");
const outputRoot = join(projectRoot, "dist/measure");
const viteBin = join(root, "node_modules/vite/bin/vite.js");
const manifest = JSON.parse(readFileSync(join(projectRoot, "inside-project.json"), "utf8"));
const bundleBudget = JSON.parse(readFileSync(join(projectRoot, "bundle-budget.json"), "utf8"));
const checkBudget = process.argv.includes("--check-budget");
const allPairs = [
    ["Button", "button-root", "button"],
    ["Button via lazy subpath", "button-root", "button-lazy"],
    ["Mixed consumer: Button + lazy ElementCreator", "button-root", "consumer-mixed-loading"],
    ["ElementCreator", "element-creator-root", "element-creator-focused"],
    ["ElementCreator lazy", "element-creator-root", "element-creator-lazy"],
    ["ProgressLinear", "progress-linear-root", "progress-linear-focused"],
    ["JsonTree", "json-tree-root", "json-tree-focused"],
    ["Table", "table-root", "table-focused"],
    ["InputListSelector", "input-list-selector-root", "input-list-selector-focused"],
    ["InputListSelector + Framework icon", "input-list-selector-root", "input-list-selector-focused-icon"],
    ["InputListSelector + icon subpath", "input-list-selector-root", "input-list-selector-focused-icon-entry"],
    ["InputListSelector focused baseline vs icon subpath", "input-list-selector-focused", "input-list-selector-focused-icon-entry"],
    ["CustomForm", "custom-form-root", "custom-form-focused"],
    ["CustomForm RUN", "custom-form-run-root", "custom-form-run-focused"],
];
const pairs = process.argv.includes("--custom-form-loading")
    ? allPairs.filter(([name]) => name === "CustomForm" || name === "CustomForm RUN")
    : process.argv.includes("--icons")
        ? allPairs.filter(([name]) => name.includes("InputListSelector"))
        : allPairs;
const scenariosToBuild = [...new Set(pairs.flatMap(([, rootId, focusedId]) => [rootId, focusedId]))]
    .map((id) => manifest.scenarios.find((scenario) => scenario.id === id))
    .filter(Boolean);

function buildScenario(scenario) {
    const outputDir = `dist/measure/${scenario.id}`;
    const result = spawnSync(process.execPath, [viteBin, "build", "--config", "vite.config.ts"], {
        cwd: projectRoot,
        env: {...process.env, CONSUMER_SCENARIO: scenario.id, CONSUMER_OUTPUT_DIR: outputDir},
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
    });
    if (result.error || result.status !== 0) {
        throw new Error(`Could not build consumer scenario ${scenario.id}.\n${result.error?.message ?? result.stdout}\n${result.stderr ?? ""}`);
    }
}

for (const scenario of scenariosToBuild) buildScenario(scenario);

function getAssetPath(url, htmlFile, outputDir) {
    const projectPrefix = "/internal-projects/consumer/";
    return url.startsWith(projectPrefix)
        ? join(outputDir, url.slice(projectPrefix.length))
        : resolve(dirname(htmlFile), url);
}

function getEntryAsset(scenario) {
    const outputDir = join(outputRoot, scenario.id);
    const htmlFile = join(outputDir, scenario.path);
    const html = readFileSync(htmlFile, "utf8");
    const entryMatch = html.match(/<script\b[^>]*\bsrc="([^"]+)"/i);
    if (!entryMatch) return null;
    return {htmlFile, outputDir, entryFile: getAssetPath(entryMatch[1], htmlFile, outputDir)};
}

function visitStaticDependencies(file, htmlFile, outputDir, visited) {
    file = resolve(file);
    if (visited.has(file)) return;
    if (!statSync(file, {throwIfNoEntry: false})?.isFile()) throw new Error(`Missing built asset ${relative(outputDir, file)}`);
    visited.add(file);
    const code = readFileSync(file, "utf8");
    for (const match of code.matchAll(/\bfrom\s*["']([^"']+\.js(?:\?[^"']*)?)["']/g)) {
        const specifier = match[1].split("?", 1)[0];
        const dependency = specifier.startsWith("/")
            ? getAssetPath(specifier, htmlFile, outputDir)
            : resolve(dirname(file), specifier);
        visitStaticDependencies(dependency, htmlFile, outputDir, visited);
    }
}

function getInitialAssets(scenario) {
    const entry = getEntryAsset(scenario);
    if (!entry) return [];
    const visited = new Set();
    visitStaticDependencies(entry.entryFile, entry.htmlFile, entry.outputDir, visited);
    return [...visited];
}

function getDeferredAssets(scenario, importMatcher = "", matchImportedContent = false) {
    const entry = getEntryAsset(scenario);
    if (!entry) return [];
    const initialFiles = new Set(getInitialAssets(scenario).map((file) => resolve(file)));
    const deferredFiles = new Set();
    const visitDeferred = (file) => {
        file = resolve(file);
        if (initialFiles.has(file) || deferredFiles.has(file)) return;
        if (!statSync(file, {throwIfNoEntry: false})?.isFile()) throw new Error(`Missing deferred asset ${relative(entry.outputDir, file)} for ${scenario.id}`);
        deferredFiles.add(file);
        const code = readFileSync(file, "utf8");
        for (const match of code.matchAll(/\bfrom\s*["']([^"']+\.js(?:\?[^"']*)?)["']/g)) {
            const specifier = match[1].split("?", 1)[0];
            const dependency = specifier.startsWith("/")
                ? getAssetPath(specifier, entry.htmlFile, entry.outputDir)
                : resolve(dirname(file), specifier);
            visitDeferred(dependency);
        }
    };

    for (const file of initialFiles) {
        const code = readFileSync(file, "utf8");
        for (const match of code.matchAll(/\bimport\s*\(\s*["']([^"']+\.js(?:\?[^"']*)?)["']\s*\)/g)) {
            const specifier = match[1].split("?", 1)[0];
            const dependency = specifier.startsWith("/")
                ? getAssetPath(specifier, entry.htmlFile, entry.outputDir)
                : resolve(dirname(file), specifier);
            if (
                importMatcher &&
                !specifier.toLowerCase().includes(importMatcher.toLowerCase()) &&
                !(matchImportedContent && statSync(dependency, {throwIfNoEntry: false})?.isFile() &&
                    readFileSync(dependency, "utf8").toLowerCase().includes(importMatcher.toLowerCase()))
            ) continue;
            visitDeferred(dependency);
        }
    }
    return [...deferredFiles];
}

function getLazyComponentAssets(scenario, slug) {
    const entry = getEntryAsset(scenario);
    if (!entry) return [];
    const initialFiles = new Set(getInitialAssets(scenario).map((file) => resolve(file)));
    const deferredFiles = new Set();
    const visitDeferred = (file) => {
        file = resolve(file);
        if (initialFiles.has(file) || deferredFiles.has(file)) return;
        if (!statSync(file, {throwIfNoEntry: false})?.isFile()) throw new Error(`Missing deferred asset ${relative(entry.outputDir, file)} for ${scenario.id}`);
        deferredFiles.add(file);
        const code = readFileSync(file, "utf8");
        for (const match of code.matchAll(/\bfrom\s*["']([^"']+\.js(?:\?[^"']*)?)["']/g)) {
            const specifier = match[1].split("?", 1)[0];
            const dependency = specifier.startsWith("/")
                ? getAssetPath(specifier, entry.htmlFile, entry.outputDir)
                : resolve(dirname(file), specifier);
            visitDeferred(dependency);
        }
    };

    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const lazyImportPattern = new RegExp(`(?:["']${escapedSlug}["']|${escapedSlug}):\\(\\)=>\\w+\\(\\(\\)=>import\\(["']([^"']+\\.js)["']\\),__vite__mapDeps\\(\\[([^\\]]+)\\]\\)\\)`);
    for (const file of initialFiles) {
        const code = readFileSync(file, "utf8");
        const lazyImport = code.match(lazyImportPattern);
        if (!lazyImport) continue;

        const dependencyTable = code.match(/m\.f=\[(.*?)\]\)\)\)=>i\.map/s);
        if (!dependencyTable) throw new Error(`Could not read Vite's lazy dependency table for ${scenario.id}`);
        const dependencyPaths = [...dependencyTable[1].matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
        const dependencyIndexes = lazyImport[2].split(",").map((index) => Number(index));
        const assets = [lazyImport[1], ...dependencyIndexes.map((index) => dependencyPaths[index])];
        for (const asset of assets) {
            if (!asset || !asset.endsWith(".js")) continue;
            const dependency = asset.startsWith("assets/")
                ? resolve(entry.outputDir, asset)
                : asset.startsWith("/")
                    ? getAssetPath(asset, entry.htmlFile, entry.outputDir)
                    : resolve(dirname(file), asset);
            visitDeferred(dependency);
        }
        return [...deferredFiles];
    }

    throw new Error(`Could not find lazy import for component "${slug}" in ${scenario.id}`);
}

function measure(scenario) {
    const files = getInitialAssets(scenario);
    const rawBytes = files.reduce((total, file) => total + statSync(file).size, 0);
    const gzipBytes = files.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
    return {files, rawBytes, gzipBytes};
}

const results = new Map(scenariosToBuild.map((scenario) => [scenario.id, measure(scenario)]));
const measuredGzipKiB = new Map([...results].map(([id, result]) => [`initial:${id}`, result.gzipBytes / 1024]));
const format = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;
console.log("Consumer production initial JavaScript graph (each page built in isolation; HTML/CSS excluded)");
for (const [name, rootId, focusedId] of pairs) {
    const baseline = results.get(rootId);
    const focused = results.get(focusedId);
    if (!baseline || !focused) throw new Error(`Missing comparison pages for ${name}: ${rootId}, ${focusedId}`);
    const rawReduction = (1 - focused.rawBytes / baseline.rawBytes) * 100;
    const gzipReduction = (1 - focused.gzipBytes / baseline.gzipBytes) * 100;
    console.log(`${name.padEnd(20)} Framework ${format(baseline.rawBytes)} / ${format(baseline.gzipBytes)} gzip  ->  focused ${format(focused.rawBytes)} / ${format(focused.gzipBytes)} gzip  (${rawReduction.toFixed(1)}% raw, ${gzipReduction.toFixed(1)}% gzip less)`);
    if (name === "ElementCreator") {
        const deferredFiles = getDeferredAssets(manifest.scenarios.find((scenario) => scenario.id === focusedId));
        const deferredRawBytes = deferredFiles.reduce((total, file) => total + statSync(file).size, 0);
        const deferredGzipBytes = deferredFiles.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
        measuredGzipKiB.set("deferred:element-creator-focused:settings", deferredGzipBytes / 1024);
        console.log(`  ElementCreator settings deferred chunks: ${deferredFiles.length} files, ${format(deferredRawBytes)} raw / ${format(deferredGzipBytes)} gzip`);
    }
    if (name === "Button via lazy subpath") {
        const lazyScenario = manifest.scenarios.find((scenario) => scenario.id === focusedId);
        const deferredFiles = getLazyComponentAssets(lazyScenario, "button");
        const deferredRawBytes = deferredFiles.reduce((total, file) => total + statSync(file).size, 0);
        const deferredGzipBytes = deferredFiles.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
        measuredGzipKiB.set("deferred:button-lazy:button", deferredGzipBytes / 1024);
        console.log(`  Lazy-subpath Button chunk graph: ${deferredFiles.length} files, ${format(deferredRawBytes)} raw / ${format(deferredGzipBytes)} gzip`);
    }
    if (name === "ElementCreator lazy") {
        const lazyScenario = manifest.scenarios.find((scenario) => scenario.id === focusedId);
        const deferredFiles = getDeferredAssets(lazyScenario, "element-creator");
        const deferredRawBytes = deferredFiles.reduce((total, file) => total + statSync(file).size, 0);
        const deferredGzipBytes = deferredFiles.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
        measuredGzipKiB.set("deferred:element-creator-lazy:on-demand", deferredGzipBytes / 1024);
        console.log(`  ElementCreator on-demand chunks: ${deferredFiles.length} files, ${format(deferredRawBytes)} raw / ${format(deferredGzipBytes)} gzip`);
    }
    if (name === "Mixed consumer: Button + lazy ElementCreator") {
        const mixedScenario = manifest.scenarios.find((scenario) => scenario.id === focusedId);
        const initialFiles = getInitialAssets(mixedScenario);
        const initialNames = initialFiles.map((file) => basename(file));
        const deferredFiles = getLazyComponentAssets(mixedScenario, "element-creator");
        const creatorChunk = deferredFiles.find((file) => basename(file).startsWith("ComponentElementCreator-"));
        assert.ok(creatorChunk, "The mixed consumer must put the ElementCreator implementation in an on-demand chunk.");
        assert.ok(
            !initialNames.some((file) => file.startsWith("ComponentElementCreator-")),
            "The mixed consumer must keep the ElementCreator implementation out of its initial JS graph.",
        );
        const deferredRawBytes = deferredFiles.reduce((total, file) => total + statSync(file).size, 0);
        const deferredGzipBytes = deferredFiles.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
        measuredGzipKiB.set("deferred:consumer-mixed-loading:element-creator", deferredGzipBytes / 1024);
        console.log(`${name}: ElementCreator stays outside initial JS and loads via its tab.`);
        console.log(`  ElementCreator requested chunk graph: ${deferredFiles.length} files, ${format(deferredRawBytes)} raw / ${format(deferredGzipBytes)} gzip`);
    }
    if (name === "CustomForm") {
        const editScenario = manifest.scenarios.find((scenario) => scenario.id === focusedId);
        const deferredFiles = getDeferredAssets(editScenario);
        const deferredRawBytes = deferredFiles.reduce((total, file) => total + statSync(file).size, 0);
        const deferredGzipBytes = deferredFiles.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
        measuredGzipKiB.set("deferred:custom-form-focused:on-demand", deferredGzipBytes / 1024);
        console.log(`  CustomForm on-demand chunks: ${deferredFiles.length} files, ${format(deferredRawBytes)} raw / ${format(deferredGzipBytes)} gzip`);
        const editorFiles = getDeferredAssets(editScenario, "ComponentLayoutCreator", true);
        const editorRawBytes = editorFiles.reduce((total, file) => total + statSync(file).size, 0);
        const editorGzipBytes = editorFiles.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
        measuredGzipKiB.set("deferred:custom-form-focused:layout-creator", editorGzipBytes / 1024);
        const editInitialFiles = new Set(getInitialAssets(editScenario).map((file) => resolve(file)));
        const implementationFile = editorFiles.find((file) => readFileSync(file, "utf8").includes("ComponentLayoutCreator"));
        assert.ok(implementationFile, "CustomForm EDIT must keep the LayoutCreator implementation in an async chunk.");
        assert.ok(!editInitialFiles.has(resolve(implementationFile)), "CustomForm EDIT must not include LayoutCreator implementation in its initial JS graph.");
        console.log(`  LayoutCreator implementation graph (requested when EDIT renders): ${editorFiles.length} files, ${format(editorRawBytes)} raw / ${format(editorGzipBytes)} gzip`);
        console.log("  CustomForm EDIT build-graph check passed: LayoutCreator implementation stays outside the initial JS graph.");
    }
    if (name === "CustomForm RUN") {
        const runScenario = manifest.scenarios.find((scenario) => scenario.id === focusedId);
        const initialFiles = getInitialAssets(runScenario);
        const initialNames = initialFiles.map((file) => basename(file));
        for (const moduleName of ["ComponentLayoutCreator", "ComponentInputDescription", "ComponentInputCheckBox", "ComponentInputRadioBox", "ComponentInputListSelector"]) {
            assert.ok(
                !initialNames.some((file) => file.startsWith(`${moduleName}-`)),
                `CustomForm RUN must not include optional ${moduleName} code in its initial JS graph.`,
            );
        }
        const fieldFiles = getDeferredAssets(runScenario, "ComponentInputDescription", true);
        const fieldRawBytes = fieldFiles.reduce((total, file) => total + statSync(file).size, 0);
        const fieldGzipBytes = fieldFiles.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
        measuredGzipKiB.set("deferred:custom-form-run-focused:field-controls", fieldGzipBytes / 1024);
        console.log(`  Optional RUN field-controls graph: ${fieldFiles.length} files, ${format(fieldRawBytes)} raw / ${format(fieldGzipBytes)} gzip; requested only when a non-INPUT field is present.`);
        console.log("  CustomForm RUN build-graph check passed: optional field controls and LayoutCreator stay out of the initial JS graph.");
    }
}

if (checkBudget) {
    const entries = [
        ...Object.entries(bundleBudget.initialGzipKiB).map(([id, limit]) => [`initial:${id}`, limit]),
        ...Object.entries(bundleBudget.deferredGzipKiB).map(([id, limit]) => [`deferred:${id}`, limit]),
    ];
    const failures = [];
    for (const [key, limit] of entries) {
        const measured = measuredGzipKiB.get(key);
        if (measured === undefined) {
            failures.push(`${key}: no measurement was produced`);
        } else if (measured > limit) {
            failures.push(`${key}: ${measured.toFixed(1)} KiB exceeds ${limit.toFixed(1)} KiB`);
        } else {
            console.log(`[bundle-budget] PASS ${key}: ${measured.toFixed(1)} / ${limit.toFixed(1)} KiB gzip`);
        }
    }
    if (failures.length) {
        console.error(`[bundle-budget] FAIL\n${failures.map((failure) => `  ${failure}`).join("\n")}`);
        process.exitCode = 1;
    } else {
        console.log(`[bundle-budget] all ${entries.length} gzip ceilings passed`);
    }
}
