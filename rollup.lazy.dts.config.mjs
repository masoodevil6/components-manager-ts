import dts from "rollup-plugin-dts";
import {readFileSync} from "node:fs";

const generatedManifest = JSON.parse(readFileSync("src/generated/focused/manifest.json", "utf8"));

export default {
    input: generatedManifest.lazyEntry,
    external: id => id.endsWith(".css"),
    output: {
        file: "dist/package/lazy/index.d.ts",
        format: "es",
    },
    plugins: [dts({tsconfig: "./tsconfig.json"})],
};
