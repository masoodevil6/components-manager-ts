// Re-export از Core — ComponentExampleDefinition در module_core تعریف شده
// چون ExampleRenderer (که در module_core است) به آن وابسته است.
// module_ui فقط برای راحتی استفاده آن را re-export می‌کند.
export type {ComponentExampleDefinition} from "@/core_components";
