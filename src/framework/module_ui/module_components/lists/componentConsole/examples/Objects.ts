import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {ConsoleEntry, serializeConsoleValue} from "../Types";

const sampleError = new Error("Sample request failed");
const entries: ConsoleEntry[] = [
    {id: "console-objects-1", level: "log", timestamp: Date.now() - 1000, values: [serializeConsoleValue({user: {name: "Ada", active: true}, tags: ["editor", "console"]})]},
    {id: "console-objects-2", level: "error", timestamp: Date.now(), values: [serializeConsoleValue(sampleError)]},
];

export const ObjectsExample: ComponentExample = {
    id: "console_objects",
    name: Keys.category.components.console.examples.objects.name,
    description: Keys.category.components.console.examples.objects.description,
    render: (): HTMLElement => UiCategory.UI.Tools.Code.Console({prop_entries: entries}).getElement() as HTMLElement,
};
