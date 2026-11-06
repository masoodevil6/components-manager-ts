import {gzipSync} from "node:zlib";
import {readFileSync, statSync} from "node:fs";
import {dirname, join, resolve, relative} from "node:path";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = join(root, "inside-project/consumer");
const outputDir = join(projectRoot, "dist");
const manifest = JSON.parse(readFileSync(join(projectRoot, "inside-project.json"), "utf8"));
const pairs = [
    ["Button", "button-root", "button"],
    ["ProgressLinear", "progress-linear-root", "progress-linear-focused"],
    ["JsonTree", "json-tree-root", "json-tree-focused"],
    ["Table", "table-root", "table-focused"],
    ["InputListSelector", "input-list-selector-root", "input-list-selector-focused"],
];

function getAssetPath(url, htmlFile) {
    const projectPrefix = "/internal-projects/consumer/";
    return url.startsWith(projectPrefix)
        ? join(outputDir, url.slice(projectPrefix.length))
        : resolve(dirname(htmlFile), url);
}

function getInitialAssets(scenario) {
    const htmlFile = join(outputDir, scenario.path);
    const html = readFileSync(htmlFile, "utf8");
    const entryMatch = html.match(/<script\b[^>]*\bsrc="([^"]+)"/i);
    if (!entryMatch) return [];

    const visited = new Set();
    const visit = (file) => {
        file = resolve(file);
        if (visited.has(file)) return;
        if (!statSync(file, {throwIfNoEntry: false})?.isFile()) throw new Error(`Missing built asset ${relative(outputDir, file)} for ${scenario.id}`);
        visited.add(file);
        const code = readFileSync(file, "utf8");
        for (const match of code.matchAll(/\bfrom\s*["']([^"']+\.js(?:\?[^"']*)?)["']/g)) {
            const specifier = match[1].split("?", 1)[0];
            const dependency = specifier.startsWith("/")
                ? getAssetPath(specifier, htmlFile)
                : resolve(dirname(file), specifier);
            visit(dependency);
        }
    };
    visit(getAssetPath(entryMatch[1], htmlFile));
    return [...visited];
}

function measure(scenario) {
    const files = getInitialAssets(scenario);
    const rawBytes = files.reduce((total, file) => total + statSync(file).size, 0);
    const gzipBytes = files.reduce((total, file) => total + gzipSync(readFileSync(file)).length, 0);
    return {files, rawBytes, gzipBytes};
}

const results = new Map(manifest.scenarios.map((scenario) => [scenario.id, measure(scenario)]));
const format = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;
console.log("Consumer production initial JavaScript graph (HTML/CSS excluded)");
for (const [name, rootId, focusedId] of pairs) {
    const baseline = results.get(rootId);
    const focused = results.get(focusedId);
    if (!baseline || !focused) throw new Error(`Missing comparison pages for ${name}: ${rootId}, ${focusedId}`);
    const rawReduction = (1 - focused.rawBytes / baseline.rawBytes) * 100;
    const gzipReduction = (1 - focused.gzipBytes / baseline.gzipBytes) * 100;
    console.log(`${name.padEnd(20)} Framework ${format(baseline.rawBytes)} / ${format(baseline.gzipBytes)} gzip  →  focused ${format(focused.rawBytes)} / ${format(focused.gzipBytes)} gzip  (${rawReduction.toFixed(1)}% raw, ${gzipReduction.toFixed(1)}% gzip less)`);
}
