import {defineConfig} from "vite";
import {fileURLToPath} from "node:url";
import {resolve, dirname} from "node:path";
import {readFileSync} from "node:fs";
import manifest from "./inside-project.json";
import {iconEntries} from "../../scripts/icon-entries.mjs";

const projectDir = dirname(fileURLToPath(import.meta.url));
const libraryRoot = resolve(projectDir, "../..");
const focusedManifest = JSON.parse(readFileSync(resolve(libraryRoot, "src/generated/focused/manifest.json"), "utf8"));
const scenarioFilter = process.env.CONSUMER_SCENARIO;
const scenarios = scenarioFilter
    ? manifest.scenarios.filter((scenario) => scenario.id === scenarioFilter)
    : manifest.scenarios;
if (scenarioFilter && scenarios.length === 0) throw new Error(`Unknown consumer scenario: ${scenarioFilter}`);
const focusedAliases = focusedManifest.components.map(({slug}) => ({
    find: new RegExp(`^component-manager/components/${slug}$`),
    replacement: resolve(libraryRoot, `dist/package/focused/${slug}.mjs`),
}));
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const iconAliases = Object.keys(iconEntries).map((slug) => ({
    find: new RegExp(`^component-manager/icons/${escapeRegExp(slug)}$`),
    replacement: resolve(libraryRoot, `dist/package/icons/${slug}.mjs`),
}));

// Resolve the public built entry, not the framework's internal source tree.
export default defineConfig({
    base: manifest.previewBase,
    resolve: {alias: [
        ...focusedAliases,
        ...iconAliases,
        {find: /^component-manager\/button$/, replacement: resolve(libraryRoot, "dist/package/focused/button.mjs")},
        {find: /^component-manager\/progress-linear$/, replacement: resolve(libraryRoot, "dist/package/focused/progress-linear.mjs")},
        {find: /^component-manager\/json-tree$/, replacement: resolve(libraryRoot, "dist/package/focused/json-tree.mjs")},
        {find: /^component-manager\/lazy$/, replacement: resolve(libraryRoot, "dist/package/lazy/index.mjs")},
        {find: /^component-manager$/, replacement: resolve(libraryRoot, "dist/package/index.mjs")},
    ]},
    server: {port: manifest.devPort, strictPort: true, fs: {allow: [libraryRoot]}},
    build: {
        ...(process.env.CONSUMER_OUTPUT_DIR ? {outDir: process.env.CONSUMER_OUTPUT_DIR, emptyOutDir: true} : {}),
        rollupOptions: {input: Object.fromEntries(scenarios.map((scenario) => [scenario.id, resolve(projectDir, scenario.path)]))},
    },
});
