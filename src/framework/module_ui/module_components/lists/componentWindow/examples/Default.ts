import {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UIComponents from "@/ui_components";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentWindow
 *
 * نمایش یک Window ساده با title و content.
 */
export const DefaultExample: ComponentExample = {

    id:          "window_default",

    name:        Keys.category.components.window.examples.default.name,

    description: Keys.category.components.window.examples.default.description,

    render: (): HTMLElement => {
        const root = document.createElement("div");

        const btn = CoreReactive.App.button({
            attrs: {
                "class": "btn btn-primary",
            },
            children: ["Open Window"],
            on: {
                click: () => {
                    const popup = new UIComponents.Lists.ComponentWindow.Component(
                        {
                            prop_title: "Test Window",
                            prop_content: "This is a test window content.",
                            prop_isVisible: true,
                            prop_windowWidth: 500,
                            prop_windowHeight: 300,
                        } as any,
                        {
                            CLOSE: (event: Event) => {
                                console.log("[WindowExample] closed", event);
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
