import {ComponentExample} from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {RadioBoxDirection} from "../Props";

export const DefaultExample: ComponentExample = {
    id: "input_radio_box_default",
    name: Keys.category.components.inputRadioBox.examples.default.name,
    description: Keys.category.components.inputRadioBox.examples.default.description,
    render: (): HTMLElement => {
        const selection = new CoreObservable.App<string | number | null>("basic");
        return UiCategory.UI.Inputs.InputRadioBox({
            classList: ["col-12", "p-2"],
            styles: {},
            prop_labelShow: true,
            prop_labelTitle: "Choose an option",
            prop_options: [
                {id: "basic", name: "Basic", body: "The basic option is selected."},
                {id: "advanced", name: "Advanced", body: "Advanced option details."},
                {id: "custom", name: "Custom"},
            ],
            prop_itemSelected: selection,
            prop_direction: RadioBoxDirection.VERTICAL,
            prop_firstCallback: true,
        }, {
            SELECT_ITEM: (_event, args) => console.log("radio option", args),
        } as any).getElement() as HTMLElement;
    },
};
