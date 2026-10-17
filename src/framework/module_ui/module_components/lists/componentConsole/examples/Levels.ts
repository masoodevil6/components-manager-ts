import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {ConsoleEntry} from "../Types";

const entries: ConsoleEntry[] = (["log", "info", "warn", "error", "debug"] as const).map((level, index) => ({
    id: `console-level-${level}`,
    level,
    timestamp: Date.now() - (5 - index) * 1000,
    values: [{type: "string", preview: `${level} message`, value: `${level} message`}],
}));

export const LevelsExample: ComponentExample = {
    id: "console_levels",
    name: Keys.category.components.console.examples.levels.name,
    description: Keys.category.components.console.examples.levels.description,
    render: (): HTMLElement => UiCategory.UI.Tools.Code.Console({prop_entries: entries}).getElement() as HTMLElement,
};
