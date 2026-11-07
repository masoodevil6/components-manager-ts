import dts from "rollup-plugin-dts";
import {iconEntries} from "./scripts/icon-entries.mjs";

export default {
    input: iconEntries,
    external: id => id.endsWith(".css"),
    output: {
        dir: "dist/package/icons",
        format: "es",
        entryFileNames: "[name].d.ts",
        chunkFileNames: "chunks/[name]-[hash].d.ts",
    },
    plugins: [dts({tsconfig: "./tsconfig.json"})],
};
