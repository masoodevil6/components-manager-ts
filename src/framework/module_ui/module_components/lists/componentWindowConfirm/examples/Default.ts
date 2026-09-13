import {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons     from "@/ui_icons";
import * as UIComponents from "@/ui_components";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentWindowConfirm
 *
 * نمایش یک Confirm Window ساده با message و دکمه‌های تایید/لغو.
 */
export const DefaultExample: ComponentExample = {

    id:          "window_confirm_default",

    name:        Keys.category.components.windowConfirm.examples.default.name,

    description: Keys.category.components.windowConfirm.examples.default.description,

    render: (): HTMLElement => {
        const root = document.createElement("div");

        const btn = CoreReactive.App.button({
            attrs: {
                "class": "btn btn-primary",
            },
            children: ["Open Confirm"],
            on: {
                click: () => {
                    const popup = new UIComponents.Lists.ComponentWindowConfirm.Component(
                        {
                            prop_title: "Delete Item",
                            prop_message: "Are you sure you want to delete this item?",
                            prop_icon: UiIcons.Src.SymbolExclumationWarning.Definition,
                            prop_acceptText: "Delete",
                            prop_cancelText: "Cancel",
                            prop_windowWidth: 400,
                            prop_windowHeight: 200,
                        } as any,
                        {
                            CONFIRM: (event: Event) => {
                                console.log("[ConfirmExample] confirmed", event);
                            },
                            CANCEL: (event: Event) => {
                                console.log("[ConfirmExample] cancelled", event);
                            },
                        } as any,
                    );
                    document.body.appendChild(popup.getElement() as HTMLElement);
                    popup.call_open();
                },
            },
        }).getElement() as HTMLElement;

        root.appendChild(btn);
        return root;
    },

};
