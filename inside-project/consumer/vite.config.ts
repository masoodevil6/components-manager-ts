import {defineConfig} from "vite";
import {fileURLToPath} from "node:url";
import {resolve, dirname} from "node:path";
import {readFileSync} from "node:fs";
import manifest from "./inside-project.json";

const projectDir = dirname(fileURLToPath(import.meta.url));
const libraryRoot = resolve(projectDir, "../..");
const focusedManifest = JSON.parse(readFileSync(resolve(libraryRoot, "src/generated/focused/manifest.json"), "utf8"));
const focusedAliases = focusedManifest.components.map(({slug}) => ({
    find: new RegExp(`^component-manager/components/${slug}$`),
    replacement: resolve(libraryRoot, `dist/package/focused/${slug}.mjs`),
}));

// Resolve the public built entry, not the framework's internal source tree.
export default defineConfig({
    base: manifest.previewBase,
    resolve: {alias: [
        ...focusedAliases,
        {find: /^component-manager\/button$/, replacement: resolve(libraryRoot, "dist/package/focused/button.mjs")},
        {find: /^component-manager\/progress-linear$/, replacement: resolve(libraryRoot, "dist/package/focused/progress-linear.mjs")},
        {find: /^component-manager\/json-tree$/, replacement: resolve(libraryRoot, "dist/package/focused/json-tree.mjs")},
        {find: /^component-manager$/, replacement: resolve(libraryRoot, "dist/package/index.mjs")},
    ]},
    server: {port: manifest.devPort, strictPort: true, fs: {allow: [libraryRoot]}},
    build: {rollupOptions: {input: Object.fromEntries(manifest.scenarios.map((scenario) => [scenario.id, resolve(projectDir, scenario.path)]))}},
});
