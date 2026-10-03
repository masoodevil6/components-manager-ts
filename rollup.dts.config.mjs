import dts from "rollup-plugin-dts";

export default {
    input: "src/index.ts",
    external: id => id.endsWith(".css"),
    output: {
        file: "dist/package/index.d.ts",
        format: "es",
    },
    plugins: [dts({tsconfig: "./tsconfig.json"})],
};
