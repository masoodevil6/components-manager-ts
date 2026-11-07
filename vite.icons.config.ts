import {defineConfig, mergeConfig} from "vite";
import {iconEntries} from "./scripts/icon-entries.mjs";
import baseConfig from "./vite.config";

export default mergeConfig(baseConfig, defineConfig({
    build: {
        outDir: "dist/package/icons",
        emptyOutDir: true,
        copyPublicDir: false,
        lib: {
            entry: iconEntries,
            formats: ["es"],
            fileName: (_format, entryName) => `${entryName}.mjs`,
        },
        rollupOptions: {output: {chunkFileNames: "chunks/[name]-[hash].mjs"}},
    },
}));
