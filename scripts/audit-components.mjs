import {readFileSync, statSync} from "node:fs";
import {dirname, relative, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {gzipSync} from "node:zlib";
import ts from "typescript";
import {rollup} from "rollup";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(root, "src");
const registryFile = resolve(sourceRoot, "framework/module_ui/module_components/lists/index.ts");
const focusedFactoryFile = resolve(sourceRoot, "framework/module_ui/module_categories/basic/methods/MtCreateFocusedComponent.ts");
const tsconfig = ts.readConfigFile(resolve(root, "tsconfig.json"), ts.sys.readFile);
if (tsconfig.error) throw new Error(ts.flattenDiagnosticMessageText(tsconfig.error.messageText, "\n"));
const parsedConfig = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, root);
const registrySource = readFileSync(registryFile, "utf8");
const componentEntries = new Map();

function kebabCase(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}

function toProjectImport(file) {
    return `./${relative(root, file).replaceAll("\\", "/")}`;
}

for (const match of registrySource.matchAll(/export\s+\*\s+as\s+(Component\w+)\s+from\s+["']([^"']+)["']/g)) {
    const [, publicName, modulePath] = match;
    if (componentEntries.has(publicName)) throw new Error(`Duplicate component registry entry: ${publicName}`);

    const directory = resolve(dirname(registryFile), modulePath);
    const indexFile = resolve(directory, "index.ts");
    if (!statSync(indexFile, {throwIfNoEntry: false})?.isFile()) {
        throw new Error(`Missing component index for ${publicName}: ${relative(root, indexFile)}`);
    }
    const moduleSource = readFileSync(indexFile, "utf8");
    const componentMatch = moduleSource.match(/export\s*\{\s*(\w+)\s+as\s+Component\b[^}]*\}\s*from\s+["']([^"']+)["']/s);
    const definitionMatch = moduleSource.match(/export\s*\{\s*Definition\s*\}\s*from\s+["']([^"']+)["']/);
    if (!componentMatch || !definitionMatch) {
        throw new Error(`Could not resolve Component and Definition for ${publicName} (${modulePath}).`);
    }

    const [, className, classPath] = componentMatch;
    const [, definitionPath] = definitionMatch;
    componentEntries.set(publicName, {
        publicName,
        className,
        slug: kebabCase(className.replace(/^Component/, "")),
        directory,
        classFile: resolve(directory, `${classPath}.ts`),
        definitionFile: resolve(directory, `${definitionPath}.ts`),
    });
}

if (componentEntries.size === 0) throw new Error(`No components found in ${relative(root, registryFile)}.`);

const componentSelector = process.argv.find((argument) => argument.startsWith("--component="))?.slice("--component=".length).trim().toLowerCase();
const showDetails = process.argv.includes("--details");
const showShared = process.argv.includes("--shared");
const selectedEntries = componentSelector
    ? [...componentEntries.values()].filter((entry) =>
        entry.slug.toLowerCase() === componentSelector
        || entry.publicName.toLowerCase() === componentSelector
        || kebabCase(entry.publicName.replace(/^Component/, "")).toLowerCase() === componentSelector
    )
    : [...componentEntries.values()];
if (componentSelector && selectedEntries.length !== 1) {
    throw new Error(`Unknown component "${componentSelector}". Use a component slug, e.g. --component=button.`);
}

const virtualPrefix = "\0component-audit:";
const assetPattern = /\.(?:css|scss|sass|less|svg|png|jpe?g|gif|webp|woff2?|ttf|eot)(?:\?.*)?$/i;

function resolveProjectSource(specifier, importer) {
    const cleanSpecifier = specifier.split("?", 1)[0];
    if (assetPattern.test(specifier)) {
        const candidate = cleanSpecifier.startsWith(".") ? resolve(dirname(importer), cleanSpecifier) : resolve(root, cleanSpecifier);
        return statSync(candidate, {throwIfNoEntry: false})?.isFile() ? candidate : null;
    }

    if (importer?.startsWith(virtualPrefix) && cleanSpecifier.startsWith("./")) {
        const candidate = resolve(root, cleanSpecifier);
        return statSync(candidate, {throwIfNoEntry: false})?.isFile() ? candidate : null;
    }

    if (!cleanSpecifier.startsWith(".") && !cleanSpecifier.startsWith("@/")) return null;
    const resolution = ts.resolveModuleName(cleanSpecifier, importer ?? resolve(root, "__audit_entry__.ts"), parsedConfig.options, ts.sys).resolvedModule;
    if (!resolution) return null;
    const resolvedFile = resolve(resolution.resolvedFileName);
    return statSync(resolvedFile, {throwIfNoEntry: false})?.isFile() ? resolvedFile : null;
}

function focusedEntryPlugin(entries) {
    const virtualSources = new Map(entries.map((entry) => {
        const virtualId = `${virtualPrefix}${entry.slug}`;
        const localClassName = entry.className === "default" ? "ComponentAuditClass" : entry.className;
        const factoryName = entry.publicName.replace(/^Component/, "");
        const source = [
            `import {MtCreateFocusedComponent} from ${JSON.stringify(toProjectImport(focusedFactoryFile))};`,
            entry.className === "default"
                ? `import ${localClassName} from ${JSON.stringify(toProjectImport(entry.classFile))};`
                : `import {${entry.className}} from ${JSON.stringify(toProjectImport(entry.classFile))};`,
            `import {Definition} from ${JSON.stringify(toProjectImport(entry.definitionFile))};`,
            `export const ${factoryName} = MtCreateFocusedComponent(Definition, ${localClassName});`,
            "",
        ].join("\n");
        return [virtualId, source];
    }));

    return {
        name: "component-audit",
        resolveId(specifier, importer) {
            if (specifier.startsWith("component-audit:")) return `${virtualPrefix}${specifier.slice("component-audit:".length)}`;
            if (specifier.startsWith(virtualPrefix)) return specifier;
            const local = resolveProjectSource(specifier, importer);
            if (local) return local;
            // Project imports outside src (npm packages and built-ins) remain external and are counted separately.
            if (importer && (!specifier.startsWith(".") || !statSync(resolve(dirname(importer), specifier), {throwIfNoEntry: false})?.isFile())) {
                if (specifier.startsWith(".") && assetPattern.test(specifier)) return `\0component-audit-asset:${specifier}`;
                if (!specifier.startsWith(".")) return {id: specifier, external: true};
            }
            return null;
        },
        load(id) {
            if (virtualSources.has(id)) return virtualSources.get(id);
            if (id.startsWith("\0component-audit-asset:")) {
                const request = id.slice("\0component-audit-asset:".length);
                return assetPattern.test(request) ? "export default '';" : "";
            }
            if (assetPattern.test(id)) {
                return /\.(?:css|scss|sass|less)(?:\?.*)?$/i.test(id) ? "" : "export default '';";
            }
            if (/\.(?:ts|tsx)$/.test(id) && !id.endsWith(".d.ts")) {
                const sourceText = readFileSync(id, "utf8");
                return ts.transpileModule(sourceText, {
                    fileName: id,
                    reportDiagnostics: false,
                    compilerOptions: {
                        ...parsedConfig.options,
                        module: ts.ModuleKind.ESNext,
                        sourceMap: false,
                        inlineSourceMap: false,
                        verbatimModuleSyntax: false,
                    },
                }).outputText;
            }
            return null;
        },
    };
}

function normalizePath(path) {
    return resolve(path).replaceAll("\\", "/").toLowerCase();
}

async function measureBundle(entries) {
    const bundle = await rollup({
        input: Object.fromEntries(entries.map((entry) => [entry.slug, `component-audit:${entry.slug}`])),
        plugins: [focusedEntryPlugin(entries)],
        treeshake: true,
        onwarn(warning, warn) {
            if (warning.code === "CIRCULAR_DEPENDENCY" || warning.code === "THIS_IS_UNDEFINED") return;
            warn(warning);
        },
    });
    const generated = await bundle.generate({
        format: "es",
        dir: ".component-audit-output",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        inlineDynamicImports: false,
    });
    await bundle.close();

    const chunks = generated.output.filter((item) => item.type === "chunk");
    const chunksByFile = new Map(chunks.map((chunk) => [chunk.fileName, chunk]));
    return entries.map((entry) => {
        const entryChunk = chunks.find((chunk) => chunk.isEntry && chunk.name === entry.slug);
        if (!entryChunk) throw new Error(`No entry chunk emitted for ${entry.publicName}.`);

        const initialChunks = new Set();
        const renderedModuleBytes = new Map();
        const dynamicImports = new Set();
        const queue = [entryChunk];
        while (queue.length) {
            const chunk = queue.pop();
            if (initialChunks.has(chunk.fileName)) continue;
            initialChunks.add(chunk.fileName);
            for (const dynamicImport of chunk.dynamicImports) dynamicImports.add(dynamicImport);
            for (const [moduleId, moduleInfo] of Object.entries(chunk.modules)) {
                if (moduleInfo.renderedLength > 0) {
                    renderedModuleBytes.set(moduleId, (renderedModuleBytes.get(moduleId) ?? 0) + moduleInfo.renderedLength);
                }
            }
            for (const importedFile of chunk.imports) {
                const importedChunk = chunksByFile.get(importedFile);
                if (importedChunk) queue.push(importedChunk);
            }
        }

        const deferredChunks = new Set();
        const deferredQueue = [...dynamicImports]
            .map((fileName) => chunksByFile.get(fileName))
            .filter(Boolean);
        while (deferredQueue.length) {
            const chunk = deferredQueue.pop();
            if (!chunk || initialChunks.has(chunk.fileName) || deferredChunks.has(chunk.fileName)) continue;
            deferredChunks.add(chunk.fileName);
            for (const importedFile of chunk.imports) {
                const importedChunk = chunksByFile.get(importedFile);
                if (importedChunk) deferredQueue.push(importedChunk);
            }
        }

        let rawBytes = 0;
        let gzipBytes = 0;
        let deferredRawBytes = 0;
        let deferredGzipBytes = 0;
        const externalPackages = new Set();
        for (const fileName of initialChunks) {
            const chunk = chunksByFile.get(fileName);
            const code = Buffer.from(chunk.code);
            rawBytes += code.length;
            gzipBytes += gzipSync(code, {level: 6}).length;
            for (const importedFile of chunk.imports) {
                if (chunksByFile.has(importedFile)) continue;
                const packageName = importedFile.startsWith("@") ? importedFile.split("/").slice(0, 2).join("/") : importedFile.split("/")[0];
                externalPackages.add(packageName);
            }
        }
        for (const fileName of deferredChunks) {
            const code = Buffer.from(chunksByFile.get(fileName).code);
            deferredRawBytes += code.length;
            deferredGzipBytes += gzipSync(code, {level: 6}).length;
        }

        const sourceRootPrefix = `${normalizePath(sourceRoot)}/`;
        const renderedModules = [...renderedModuleBytes]
            .map(([moduleId, renderedBytes]) => ({path: resolve(moduleId.split("?", 1)[0]), renderedBytes}))
            .filter(({path}) => normalizePath(path).startsWith(sourceRootPrefix) && /\.(ts|tsx|js|jsx|mjs|cjs)$/i.test(path));
        const renderedSourceInputs = renderedModules.map(({path}) => path);
        const ownInputs = renderedSourceInputs.filter((path) => {
            const relativePath = relative(entry.directory, path).replaceAll("\\", "/");
            return relativePath === "" || (!relativePath.startsWith("../") && relativePath !== "..");
        });
        const exampleCount = renderedSourceInputs.filter((path) => /(?:^|[\\/])examples?(?:[\\/]|\.|$)/i.test(path)).length;
        const registryCount = renderedSourceInputs.filter((path) => normalizePath(path) === normalizePath(registryFile)).length;
        const sourceBytes = renderedSourceInputs.reduce((sum, path) => sum + (statSync(path, {throwIfNoEntry: false})?.size ?? 0), 0);
        const registryChunks = [...initialChunks].filter((fileName) => Object.entries(chunksByFile.get(fileName).modules)
            .some(([moduleId, moduleInfo]) => moduleInfo.renderedLength > 0 && normalizePath(moduleId) === normalizePath(registryFile)));

        const dependencyModules = renderedModules
            .filter(({path}) => !ownInputs.some((ownPath) => normalizePath(ownPath) === normalizePath(path)))
            .map(({path, renderedBytes}) => ({
                path,
                relativePath: relative(sourceRoot, path).replaceAll("\\", "/"),
                renderedBytes,
            }))
            .sort((a, b) => b.renderedBytes - a.renderedBytes);
        const dependencyAreas = new Map();
        for (const module of dependencyModules) {
            const parts = module.relativePath.split("/");
            const componentIndex = parts.indexOf("module_components");
            const area = componentIndex >= 0 && parts[componentIndex + 1] === "lists" && parts[componentIndex + 2]
                ? `component:${parts[componentIndex + 2]}`
                : componentIndex >= 0
                    ? `shared:${parts.slice(0, componentIndex + 2).join("/")}`
                    : `shared:${parts.slice(0, Math.min(2, parts.length - 1)).join("/")}`;
            dependencyAreas.set(area, (dependencyAreas.get(area) ?? 0) + module.renderedBytes);
        }

        return {
            ...entry,
            moduleCount: renderedSourceInputs.length,
            dependencyCount: renderedSourceInputs.length - ownInputs.length,
            sourceBytes,
            rawBytes,
            gzipBytes,
            deferredChunkCount: deferredChunks.size,
            deferredRawBytes,
            deferredGzipBytes,
            exampleCount,
            registryCount,
            dynamicImports: dynamicImports.size,
            externalPackages: externalPackages.size,
            registryChunks,
            renderedSourceModules: renderedModules.map(({path, renderedBytes}) => ({
                relativePath: relative(sourceRoot, path).replaceAll("\\", "/"),
                renderedBytes,
            })),
            dependencyModules,
            dependencyAreas: [...dependencyAreas]
                .map(([area, renderedBytes]) => ({area, renderedBytes}))
                .sort((a, b) => b.renderedBytes - a.renderedBytes),
        };
    });
}

const requestedMode = process.argv.find((argument) => argument.startsWith("--mode="))?.slice("--mode=".length).trim().toLowerCase();
const mode = requestedMode ?? "isolated";
if (mode !== "isolated" && mode !== "combined") {
    throw new Error(`Unknown audit mode "${mode}". Use --mode=isolated or --mode=combined.`);
}
if (showShared && mode !== "isolated") {
    throw new Error("--shared requires --mode=isolated so each entry's dependency graph is measured independently.");
}

async function measureComponents(entries) {
    if (mode === "combined" || entries.length === 1) return measureBundle(entries);

    const results = [];
    for (let index = 0; index < entries.length; index++) {
        const entry = entries[index];
        results.push(...await measureBundle([entry]));
        const completed = index + 1;
        if (completed === entries.length || completed % 10 === 0) {
            process.stdout.write(`[component-audit] isolated ${completed}/${entries.length} entries\n`);
        }
    }
    return results;
}

process.stdout.write(`[component-audit] bundling ${selectedEntries.length} ${mode === "isolated" ? "isolated Rollup entries" : "entries in one combined in-memory Rollup build"}...\n`);
const measured = await measureComponents(selectedEntries);
const ranked = measured.sort((a, b) => b.rawBytes - a.rawBytes);
const formatKiB = (bytes) => (bytes / 1024).toFixed(1);
const nameWidth = Math.max(19, ...ranked.map(({publicName}) => publicName.length));
const lines = [
    `[component-audit] ${ranked.length} component entries from ${relative(root, registryFile).replaceAll("\\", "/")}`,
    mode === "isolated"
        ? "Method: each entry is bundled separately with tree-shaking, so component rows do not share chunks. npm packages are excluded from byte totals."
        : "Method: combined multi-entry Rollup build with tree-shaking; shared chunks can make individual rows reflect cross-entry chunking. Use --mode=isolated (default) for isolated measurements. npm packages are excluded from byte totals.",
    "CSS/assets and dynamic-import chunks are excluded from initial JS bytes. Gzip is calculated per JS chunk; sizes are estimates, not browser measurements.",
    "",
    `${"#".padStart(3)}  ${"Component".padEnd(nameWidth)}  ${"mods".padStart(5)}  ${"deps".padStart(5)}  ${"src KiB".padStart(8)}  ${"raw KiB".padStart(8)}  ${"gzip KiB".padStart(9)}  examples  registry  dynamic  packages`,
];

for (let index = 0; index < ranked.length; index++) {
    const item = ranked[index];
    lines.push(
        `${String(index + 1).padStart(3)}  ${item.publicName.padEnd(nameWidth)}  ${String(item.moduleCount).padStart(5)}  ${String(item.dependencyCount).padStart(5)}  ${String(formatKiB(item.sourceBytes)).padStart(8)}  ${String(formatKiB(item.rawBytes)).padStart(8)}  ${String(formatKiB(item.gzipBytes)).padStart(9)}  ${String(item.exampleCount).padStart(8)}  ${String(item.registryCount).padStart(8)}  ${String(item.dynamicImports).padStart(7)}  ${String(item.externalPackages).padStart(8)}`
    );
}

const exampleLeaks = ranked.filter((item) => item.exampleCount > 0);
const registryLeaks = ranked.filter((item) => item.registryCount > 0);
lines.push(
    "",
    `Focused entries whose initial JS chunks contain example code: ${exampleLeaks.length}/${ranked.length}.`,
    `Focused entries whose initial JS chunks contain the full component registry: ${registryLeaks.length}/${ranked.length}.`,
);
const registryChunkNames = [...new Set(registryLeaks.flatMap((item) => item.registryChunks))];
if (registryChunkNames.length) lines.push(`Initial chunk(s) containing registry code: ${registryChunkNames.join(", ")}.`);
console.log(lines.join("\n"));

if (showDetails) {
    for (const item of ranked) {
        const topAreas = item.dependencyAreas.slice(0, 12);
        const topModules = item.dependencyModules.slice(0, 15);
        console.log(`\nDependency breakdown: ${item.publicName}`);
        console.log("Area totals and module sizes use Rollup renderedLength (pre-minification); they rank source contribution and do not sum to gzip output.");
        console.log("Largest dependency areas:");
        for (const area of topAreas) console.log(`  ${formatKiB(area.renderedBytes).padStart(8)} KiB  ${area.area}`);
        console.log("Largest dependency modules:");
        for (const module of topModules) console.log(`  ${formatKiB(module.renderedBytes).padStart(8)} KiB  ${module.relativePath}`);
        if (item.deferredChunkCount > 0) {
            console.log(`First-level deferred JS graph (static descendants only): ${item.deferredChunkCount} chunks, ${formatKiB(item.deferredRawBytes)} KiB raw / ${formatKiB(item.deferredGzipBytes)} KiB gzip.`);
        }
    }
}

if (showShared) {
    const modulesByPath = new Map();
    for (const item of measured) {
        for (const module of item.renderedSourceModules) {
            const moduleKey = module.relativePath.toLowerCase();
            if (!modulesByPath.has(moduleKey)) {
                modulesByPath.set(moduleKey, {relativePath: module.relativePath, entries: new Map()});
            }
            const entrySizes = modulesByPath.get(moduleKey).entries;
            entrySizes.set(item.slug, Math.max(entrySizes.get(item.slug) ?? 0, module.renderedBytes));
        }
    }

    const sharedModules = [...modulesByPath.values()]
        .filter(({entries}) => entries.size > 1)
        .map(({relativePath, entries}) => ({
            relativePath,
            entryCount: entries.size,
            averageRenderedBytes: [...entries.values()].reduce((total, bytes) => total + bytes, 0) / entries.size,
            maxRenderedBytes: Math.max(...entries.values()),
        }));
    const printSharedModules = (title, items) => {
        console.log(`\n${title}:`);
        console.log("Sizes use isolated Rollup renderedLength per entry (pre-minification); average and max rank source contribution, not final transfer or gzip size.");
        console.log(`${"avg KiB".padStart(8)}  ${"max KiB".padStart(8)}  ${"entries".padStart(7)}  source module`);
        for (const module of items.slice(0, 15)) {
            console.log(`${formatKiB(module.averageRenderedBytes).padStart(8)}  ${formatKiB(module.maxRenderedBytes).padStart(8)}  ${String(module.entryCount).padStart(7)}  ${module.relativePath}`);
        }
    };
    printSharedModules(
        "Most widely retained shared source modules",
        [...sharedModules].sort((a, b) => b.entryCount - a.entryCount || b.averageRenderedBytes - a.averageRenderedBytes),
    );
    printSharedModules(
        "Largest average source contribution shared by focused entries",
        [...sharedModules].sort((a, b) => b.averageRenderedBytes - a.averageRenderedBytes || b.entryCount - a.entryCount),
    );
}
