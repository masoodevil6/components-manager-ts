import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const DefaultExample: ComponentExample = {
    id: "input_file_default",
    name: Keys.category.components.inputFile.examples.default.name,
    description: Keys.category.components.inputFile.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputFile({
        prop_labelTitle: "Upload file",
        prop_maxCount: 1,
        prop_maxSize: 5120,
        prop_accept: "image/*,.pdf",
    }, {
        CHANGE_FILES: (_event, dataArgs) => { void dataArgs.FILES; },
        DELETE_FILE: (_event, dataArgs) => { void dataArgs.FILE_NAME; },
    }).getElement() as HTMLElement,
};
