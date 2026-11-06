import dts from "rollup-plugin-dts";
import {readFileSync} from "node:fs";

const focusedManifest = JSON.parse(readFileSync("src/generated/focused/manifest.json", "utf8"));
const entries = Object.fromEntries(focusedManifest.components.map(({slug, entry}) => [slug, entry]));

export default Object.entries(entries).map(([name, input]) => ({
    input,
    external: id => id.endsWith(".css"),
    output: {
        file: `dist/package/focused/${name}.d.ts`,
        format: "es",
    },
    plugins: [dts({tsconfig: "./tsconfig.json"})],
}));
