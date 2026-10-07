import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id:"input_acl_default",
    name:Keys.category.components.inputAcl.examples.default.name,
    description:Keys.category.components.inputAcl.examples.default.description,
    render:():HTMLElement=>UiCategory.UI.Inputs.InputAcl({
        prop_labelTitle:"Access control",
        prop_title:"Select access rules",
        prop_value:[],
    },{}).getElement() as HTMLElement,
};
