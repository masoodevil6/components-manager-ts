import {mkdirSync, readFileSync, statSync, writeFileSync} from "node:fs";
import {dirname, join, relative, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryFile = join(root, "src/framework/module_ui/module_components/lists/index.ts");
const configFile = join(root, "config/focused-components.json");
const outputDir = join(root, "src/generated/focused");
const registrySource = readFileSync(registryFile, "utf8");
const config = JSON.parse(readFileSync(configFile, "utf8"));

if (config.version !== 1 || !["selected", "all"].includes(config.mode)) {
    throw new Error("focused-components.json must use version 1 and mode 'selected' or 'all'.");
}

function kebabCase(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}

function relativeImport(fromFile, targetFile) {
    const path = relative(dirname(fromFile), targetFile).replaceAll("\\", "/").replace(/\.tsx?$/, "");
    return path.startsWith(".") ? path : `./${path}`;
}

const moduleEntries = new Map();
for (const match of registrySource.matchAll(/export\s+\*\s+as\s+(Component\w+)\s+from\s+["']([^"']+)["']/g)) {
    const [, publicName, modulePath] = match;
    if (moduleEntries.has(publicName)) throw new Error(`Duplicate component registry entry: ${publicName}`);

    const directory = resolve(dirname(registryFile), modulePath);
    const indexFile = join(directory, "index.ts");
    const moduleSource = readFileSync(indexFile, "utf8");
    const componentMatch = moduleSource.match(/export\s*\{\s*(\w+)\s+as\s+Component\b[^}]*\}\s*from\s*["']([^"']+)["']/s);
    const definitionMatch = moduleSource.match(/export\s*\{\s*Definition\s*\}\s*from\s*["']([^"']+)["']/);
    if (!componentMatch || !definitionMatch) {
        throw new Error(`Could not resolve Component and Definition exports for ${publicName} (${modulePath}).`);
    }

    const [, className, classPath] = componentMatch;
    const [, definitionPath] = definitionMatch;
    const classFile = resolve(directory, `${classPath}.ts`);
    const definitionFile = resolve(directory, `${definitionPath}.ts`);
    const factoryName = publicName.replace(/^Component/, "");
    if (!factoryName) throw new Error(`Invalid component class name for ${publicName}: ${className}`);

    const typeFiles = ["Props.ts", "Methods.ts", "Types.ts"]
        .map((file) => join(directory, file))
        .filter((file) => statSync(file, {throwIfNoEntry: false})?.isFile() ?? false);

    moduleEntries.set(publicName, {
        publicName,
        className,
        factoryName,
        slug: kebabCase(factoryName),
        classFile,
        definitionFile,
        typeFiles,
    });
}

if (moduleEntries.size === 0) throw new Error(`No component entries found in ${registryFile}.`);

const selectedNames = config.mode === "all" ? [...moduleEntries.keys()] : config.components;
if (!Array.isArray(selectedNames) || selectedNames.length === 0) {
    throw new Error("focused-components.json must select at least one component.");
}
const duplicates = selectedNames.filter((name, index) => selectedNames.indexOf(name) !== index);
if (duplicates.length) throw new Error(`Duplicate selected components: ${[...new Set(duplicates)].join(", ")}`);
const missing = selectedNames.filter((name) => !moduleEntries.has(name));
if (missing.length) throw new Error(`Unknown components in focused-components.json: ${missing.join(", ")}`);

mkdirSync(outputDir, {recursive: true});
const components = selectedNames.map((publicName) => {
    const entry = moduleEntries.get(publicName);
    const entryFile = join(outputDir, `${entry.slug}.ts`);
    const localClassName = entry.className === "default" ? `${entry.factoryName}ComponentClass` : entry.className;
    const imports = [
        `import {MtCreateFocusedComponent} from ${JSON.stringify(relativeImport(entryFile, join(root, "src/framework/module_ui/module_categories/basic/methods/MtCreateFocusedComponent.ts")))};`,
        entry.className === "default"
            ? `import ${localClassName} from ${JSON.stringify(relativeImport(entryFile, entry.classFile))};`
            : `import {${entry.className}} from ${JSON.stringify(relativeImport(entryFile, entry.classFile))};`,
        `import {Definition} from ${JSON.stringify(relativeImport(entryFile, entry.definitionFile))};`,
    ];
    const typeExports = entry.typeFiles.map((file) => `export type * from ${JSON.stringify(relativeImport(entryFile, file))};`);
    const source = [
        `/** Generated focused entry for ${entry.publicName}; edit config/focused-components.json to change the pilot set. */`,
        ...imports,
        "",
        `export const ${entry.factoryName} = MtCreateFocusedComponent(Definition, ${localClassName});`,
        ...typeExports,
        "",
    ].join("\n");
    writeFileSync(entryFile, source);
    return {
        publicName: entry.publicName,
        className: entry.className,
        factoryName: entry.factoryName,
        slug: entry.slug,
        entry: relative(root, entryFile).replaceAll("\\", "/"),
    };
});

const lazyOutputDir = join(root, "src/generated/lazy");
mkdirSync(lazyOutputDir, {recursive: true});
const lazyComponents = [...moduleEntries.values()].map((entry) => {
    const entryFile = join(lazyOutputDir, `${entry.slug}.ts`);
    const localClassName = entry.className === "default" ? `${entry.factoryName}ComponentClass` : entry.className;
    const imports = [
        `import {MtCreateFocusedComponent} from ${JSON.stringify(relativeImport(entryFile, join(root, "src/framework/module_ui/module_categories/basic/methods/MtCreateFocusedComponent.ts")))};`,
        entry.className === "default"
            ? `import ${localClassName} from ${JSON.stringify(relativeImport(entryFile, entry.classFile))};`
            : `import {${entry.className}} from ${JSON.stringify(relativeImport(entryFile, entry.classFile))};`,
        `import {Definition} from ${JSON.stringify(relativeImport(entryFile, entry.definitionFile))};`,
    ];
    const typeExports = entry.typeFiles.map((file) => `export type * from ${JSON.stringify(relativeImport(entryFile, file))};`);
    const source = [
        `/** Generated lazy entry for ${entry.publicName}; edit the component registry to change the available set. */`,
        ...imports,
        "",
        `export const ${entry.factoryName} = MtCreateFocusedComponent(Definition, ${localClassName});`,
        ...typeExports,
        "",
    ].join("\n");
    writeFileSync(entryFile, source);
    return entry;
});

const lazyIndexFile = join(lazyOutputDir, "index.ts");
const loaderRows = lazyComponents.map((entry) =>
    `    ${JSON.stringify(entry.slug)}: () => import(${JSON.stringify(`./${entry.slug}`)}).then((module) => module[${JSON.stringify(entry.factoryName)}]),`,
);
const loaderSource = [
    "/** Dynamically load one component by its generated public slug. */",
    "const componentLoaders = {",
    ...loaderRows,
    "} as const;",
    "",
    "export type LazyComponentSlug = keyof typeof componentLoaders;",
    "export type LazyComponentFactory<TSlug extends LazyComponentSlug> = Awaited<ReturnType<(typeof componentLoaders)[TSlug]>>;",
    "",
    "export function loadComponent<TSlug extends LazyComponentSlug>(slug: TSlug): Promise<LazyComponentFactory<TSlug>> {",
    "    const loader = (componentLoaders as Record<string, (() => Promise<unknown>) | undefined>)[slug];",
    "    if (!loader) return Promise.reject(new Error(`Unknown component slug: ${String(slug)}`));",
    "    return loader() as Promise<LazyComponentFactory<TSlug>>;",
    "}",
    "",
].join("\n");
writeFileSync(lazyIndexFile, loaderSource);

writeFileSync(join(outputDir, "manifest.json"), `${JSON.stringify({
    version: 1,
    mode: config.mode,
    registryCount: moduleEntries.size,
    components,
    lazyEntry: relative(root, lazyIndexFile).replaceAll("\\", "/"),
    lazyComponentCount: lazyComponents.length,
}, null, 2)}\n`);
console.log(`[focused-entries] generated ${components.length} entries from ${moduleEntries.size} registry components (${config.mode} mode).`);
console.log(`[focused-entries] generated lazy loaders for all ${lazyComponents.length} registry components.`);
