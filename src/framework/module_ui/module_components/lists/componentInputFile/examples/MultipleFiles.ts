import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const MultipleFilesExample: ComponentExample = {
    id: "input_file_multiple",
    name: Keys.category.components.inputFile.examples.multipleFiles.name,
    description: Keys.category.components.inputFile.examples.multipleFiles.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputFile({
        prop_labelTitle: "Attachments",
        prop_maxCount: 5,
        prop_maxSize: 10240,
        prop_accept: ".pdf,image/*",
    }, {}).getElement() as HTMLElement,
};
