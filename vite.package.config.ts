import {defineConfig, mergeConfig} from "vite";
import baseConfig from "./vite.config";

export default mergeConfig(baseConfig, defineConfig({
    build: {
        outDir: "dist/package",
        emptyOutDir: true,
        lib: {
            entry: "src/index.ts",
            formats: ["es"],
            fileName: () => "index.mjs",
        },
    },
}));
