import { ITemplate }          from "@/core_route";
import { App as ReactiveApp } from "@/core_reactive";
import * as UiComponents      from "@/ui_components";
///------------------------------

export class ClTestsPage implements ITemplate {

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        /* -------------------------------------------------------------
           پلن 6.1 — قرارداد سه‌آرگومانی ComponentBase (Core)
           constructor(props, methods, identity)

           معیار موفقیت (بخش ۵ پلن 6.1):
             Componentهای Structure/Button/Collapse با قرارداد جدید
             بدون کرش کار می‌کنند.
        ------------------------------------------------------------- */

        // ---- 1) ComponentStructure — Structure عمومی با Composition Point ----
        const structure =
            new UiComponents.Lists.ComponentStructure.Component(
                {
                    classList:      ["border", "p-2", "mb-3"],
                    structureClass: ["bg-light", "rounded"],
                    content: () => {
                        return ReactiveApp.button({
                            className: ["btn", "btn-outline-secondary"],
                            children:  ["Structure content button"],
                        });
                    },
                },
                {}, // methods
            );

        // ---- 2) ComponentButton — Component مستقل ----
        const button =
            new UiComponents.Lists.ComponentButton.Component(
                {
                    btnTitle: "Save",
                    variant:  "primary",
                },
                {}, // methods
                {
                    events: {
                        click: () => {
                            console.log("[ComponentButton] clicked");
                        },
                    },
                },
            );

        // ---- 3) ComponentCollapse — معیار موفقیت (State + Method + Composition) ----
        const collapse =
            new UiComponents.Lists.ComponentCollapse.Component(
                {
                    headerTitle: "Collapse — click header",
                    classList:   ["mb-3"],
                    content: () => {
                        return ReactiveApp.button({
                            className: ["btn", "btn-outline-primary"],
                            children:  ["Toggle (from content)"],
                            on: {
                                click: () => {
                                    collapse.toggle();
                                    console.log("[ComponentCollapse] open =", collapse.isOpen());
                                },
                            },
                        });
                    },
                },
                {
                    onToggle: (open: boolean) => {
                        console.log("[ComponentCollapse] onToggle =", open);
                    },
                },
            );

        // ---- 4) Toggle بیرونی برای state بیرونی Collapse ----
        const externalToggleButton = ReactiveApp.button({
            className: ["btn", "btn-outline-warning", "m-2"],
            children:  ["External toggle collapse"],
            on: {
                click: () => {
                    collapse.toggle();
                },
            },
        });

        const content = ReactiveApp.section(
            {
                className: [
                    "row" , "p-3" , "m-0"
                ],
                children:[
                    externalToggleButton,
                    button.getElement(),
                    structure.getElement(),
                    collapse.getElement(),
                ]
            }
        )



        return content.getElement();
    }




    onLoad(pageElement: HTMLElement): void {



    }





}

///Set-ExecutionPolicy RemoteSigned