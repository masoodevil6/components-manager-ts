import {ComponentExample} from "@/core_components";
import * as UiIcons     from "@/ui_icons";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentInputListSelector
 *
 * نمایش یک InputListSelector با چند ستون و آیکون انتخاب.
 */
export const DefaultExample: ComponentExample = {

    id:          "input_list_selector_default",

    name:        Keys.category.components.inputListSelector.examples.default.name,

    description: Keys.category.components.inputListSelector.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Inputs.InputListSelector(
        ({
            prop_labelTitle:             "Input List Selector",
            prop_labelTooltipDescription: "this is for [input-list-selector]",
            prop_labelShow:              true,
            prop_showListSelected:       true,
            prop_draggable:             true,
            prop_widthBody:              "350px",
            prop_heightBody:              "300px",
            prop_heightItems:             45,
            prop_columns: [
                { id: "col1", title: "Column 1", selected: true  },
                { id: "col2", title: "Column 2", selected: true  },
                { id: "col3", title: "Column 3", selected: false },
                { id: "col4", title: "Column 4", selected: true  },
                { id: "col5", title: "Column 5", selected: false },
            ],
            prop_icon: UiIcons.Src.InputSelectColumn.Definition as any,
        } as any),
        {
            CLICK_ICON: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] icon clicked", event, dataArgs, componentArgs);
            },
            CLICK_ACCEPT: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] accept clicked", componentArgs);
            },
            CLICK_REJECT: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] reject clicked");
            },
            CALLBACK_COL_SELECTOR: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] callback col selector", componentArgs);
            },
            DELETE_SELECTED_ITEM: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] delete selected item", componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};


/**
 * Icon Only Example برای ComponentInputListSelector
 *
 * نمایش یک InputListSelector فقط با آیکون — بدون label و بدون لیست انتخاب‌شده.
 */
export const IconOnlyExample: ComponentExample = {

    id:          "input_list_selector_icon_only",

    name:        Keys.category.components.inputListSelector.examples.default.name,

    description: Keys.category.components.inputListSelector.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Inputs.InputListSelector(
        ({
            classList:                   ["mt-2"],
            prop_labelShow:              false,
            prop_showListSelected:       false,
            prop_inputBackgroundColor:    null,
            prop_columns: [
                { id: "col1", title: "Column 1", selected: true  },
                { id: "col2", title: "Column 2", selected: true  },
                { id: "col3", title: "Column 3", selected: false },
                { id: "col4", title: "Column 4", selected: true  },
                { id: "col5", title: "Column 5", selected: false },
            ],
            prop_icon: UiIcons.Src.InputSelectColumn.Definition as any,
        } as any),
        {
            CLICK_ICON: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] icon clicked", event, dataArgs, componentArgs);
            },
            CLICK_ACCEPT: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] accept clicked", componentArgs);
            },
            CLICK_REJECT: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] reject clicked");
            },
            CALLBACK_COL_SELECTOR: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] callback col selector", componentArgs);
            },
            DELETE_SELECTED_ITEM: function(event, dataArgs, componentArgs) {
                console.log("[InputListSelector] delete selected item", componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
