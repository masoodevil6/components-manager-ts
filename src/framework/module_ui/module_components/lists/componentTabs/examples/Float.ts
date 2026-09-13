import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons     from "@/ui_icons";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Float Example برای ComponentTabs
 *
 * تب‌های شناور (float) با ۳ تب (آیکون + عنوان + بدنه)
 */
export const FloatExample: ComponentExample = {

    id:          "tabs_float",

    name:        Keys.category.components.tabs.examples.float.name,

    description: Keys.category.components.tabs.examples.float.description,

    render: (): HTMLElement => UiCategory.UI.Contents.Tabs(
        {
            prop_tabsView:   "float",
            prop_tabSelected: 1,
            prop_tabs: [
                {
                    id:    1,
                    title:  "First",
                    icon:   UiIcons.Src.InputNumber.Definition,
                    body:   CoreReactive.App.div({
                        children: ["First tab body"],
                    }),
                },
                {
                    id:    2,
                    title:  "Second",
                    icon:   UiIcons.Src.InputCalender.Definition,
                    body:   CoreReactive.App.div({
                        children: ["Second tab body"],
                    }),
                },
                {
                    id:    3,
                    title:  "Third",
                    icon:   UiIcons.Src.InputSelectOption.Definition,
                    body:   CoreReactive.App.div({
                        children: ["Third tab body"],
                    }),
                },
            ],
        },
        {
            CLICK_TAB:  (event, _dataArgs, _componentArgs) => { console.log("tab clicked", event); },
            CLICK_BODY: (event, _dataArgs, _componentArgs) => { console.log("body clicked", event); },
        },
    ).getElement() as HTMLElement,

};
