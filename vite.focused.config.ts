import {defineConfig, mergeConfig} from "vite";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import baseConfig from "./vite.config";

const focusedManifest = JSON.parse(readFileSync(resolve("src/generated/focused/manifest.json"), "utf8"));
const entries = Object.fromEntries(focusedManifest.components.map(({slug, entry}) => [slug, entry]));

export default mergeConfig(baseConfig, defineConfig({
    build: {
        outDir: "dist/package/focused",
        emptyOutDir: true,
        copyPublicDir: false,
        lib: {
            entry: entries,
            formats: ["es"],
            fileName: (_format, entryName) => `${entryName}.mjs`,
        },
        rollupOptions: {output: {chunkFileNames: "chunks/[name]-[hash].mjs"}},
    },
}));
