import {defineConfig, mergeConfig} from "vite";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import baseConfig from "./vite.config";

const generatedManifest = JSON.parse(readFileSync(resolve("src/generated/focused/manifest.json"), "utf8"));

export default mergeConfig(baseConfig, defineConfig({
    build: {
        outDir: "dist/package/lazy",
        emptyOutDir: true,
        copyPublicDir: false,
        lib: {
            entry: generatedManifest.lazyEntry,
            formats: ["es"],
            fileName: () => "index.mjs",
        },
        rollupOptions: {
            output: {
                chunkFileNames: "chunks/[name]-[hash].mjs",
                experimentalMinChunkSize: 2_000,
            },
        },
    },
}));
