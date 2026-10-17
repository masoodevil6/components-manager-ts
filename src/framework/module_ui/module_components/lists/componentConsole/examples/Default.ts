import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {ConsoleEntry} from "../Types";

const now = Date.now();
const entries: ConsoleEntry[] = [
    {id: "console-default-1", level: "log", timestamp: now - 2000, values: [{type: "string", preview: "Console is ready", value: "Console is ready"}]},
    {id: "console-default-2", level: "info", timestamp: now - 1000, values: [{type: "string", preview: "Try the filters and clear button", value: "Try the filters and clear button"}]},
];

export const DefaultExample: ComponentExample = {
    id: "console_default",
    name: Keys.category.components.console.examples.default.name,
    description: Keys.category.components.console.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Tools.Code.Console({
        classList: ["col-12", "mb-3"],
        prop_entries: entries,
    }).getElement() as HTMLElement,
};
