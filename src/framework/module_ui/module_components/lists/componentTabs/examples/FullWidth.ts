import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons     from "@/ui_icons";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * FullWidth Example برای ComponentTabs
 *
 * تب‌های تمام‌عرض با ۲ تب (آیکون + عنوان + بدنه)
 */
export const FullWidthExample: ComponentExample = {

    id:          "tabs_full_width",

    name:        Keys.category.components.tabs.examples.fullWidth.name,

    description: Keys.category.components.tabs.examples.fullWidth.description,

    render: (): HTMLElement => UiCategory.UI.Contents.Tabs(
        {
            prop_tabsView:   "full_width",
            prop_tabSelected: 1,
            prop_tabs: [
                {
                    id:    1,
                    title:  "Tab A",
                    icon:   UiIcons.Src.InputNumber.Definition,
                    body:   CoreReactive.App.div({
                        children: ["This is Tab A body content."],
                    }),
                },
                {
                    id:    2,
                    title:  "Tab B",
                    icon:   UiIcons.Src.InputCalender.Definition,
                    body:   CoreReactive.App.div({
                        children: ["This is Tab B body content."],
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
