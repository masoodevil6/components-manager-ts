import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    resolve: {
        alias: [
            { find: "@/core_configs",    replacement: path.resolve(__dirname, "./src/framework/module_core/module_configs") },
            { find: "@/core_components", replacement: path.resolve(__dirname, "./src/framework/module_core/module_components") },
            { find: "@/core_event",      replacement: path.resolve(__dirname, "./src/framework/module_core/module_event") },
            { find: "@/core_languages",  replacement: path.resolve(__dirname, "./src/framework/module_core/module_languages") },
            { find: "@/core_observable", replacement: path.resolve(__dirname, "./src/framework/module_core/module_observable") },
            { find: "@/core_reactive",   replacement: path.resolve(__dirname, "./src/framework/module_core/module_reactive") },
            { find: "@/core_route",      replacement: path.resolve(__dirname, "./src/framework/module_core/module_route") },
            { find: "@/core",            replacement: path.resolve(__dirname, "./src/framework/module_core") },
            { find: "@/ui_categories",   replacement: path.resolve(__dirname, "./src/framework/module_ui/module_categories") },
            { find: "@/ui_components",   replacement: path.resolve(__dirname, "./src/framework/module_ui/module_components") },
            { find: "@/ui_icons",        replacement: path.resolve(__dirname, "./src/framework/module_ui/module_icons") },
            { find: "@/ui_pages",        replacement: path.resolve(__dirname, "./src/framework/module_ui/module_pages") },
            { find: "@/ui",              replacement: path.resolve(__dirname, "./src/framework/module_ui") },
            { find: "@/performance",     replacement: path.resolve(__dirname, "./src/framework/module_performance") },
            { find: "@/util_brands",     replacement: path.resolve(__dirname, "./src/framework/module_util/module_brands") },
            { find: "@/util_consts",     replacement: path.resolve(__dirname, "./src/framework/module_util/module_consts") },
            { find: "@/util_styles",     replacement: path.resolve(__dirname, "./src/framework/module_util/module_styles") },
            { find: "@/util_validators", replacement: path.resolve(__dirname, "./src/framework/module_util/module_validators") },
            { find: "@/util_convertor",  replacement: path.resolve(__dirname, "./src/framework/module_util/module_convertor") },
            { find: "@/util_files",      replacement: path.resolve(__dirname, "./src/framework/module_util/module_files") },
            { find: "@/util_dates",      replacement: path.resolve(__dirname, "./src/framework/module_util/module_dates") },
            { find: "@/util_excels",     replacement: path.resolve(__dirname, "./src/framework/module_util/module_excel") },
            { find: "@/util_tools",      replacement: path.resolve(__dirname, "./src/framework/module_util/module_tools") },
            { find: "@/util",            replacement: path.resolve(__dirname, "./src/framework/module_util") },
            { find: "@",                 replacement: path.resolve(__dirname, "./src") },
        ],
    },
    test: {
        environment: "node",
        pool:        "threads",
        fileParallelism: false,
        include:     ["tests/perf/**/*.test.ts"],
        globals:     true,
        testTimeout: 60000,
        hookTimeout: 30000,
    },
});
