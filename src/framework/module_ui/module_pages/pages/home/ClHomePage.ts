import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreEvent from "@/core_event";
import * as CoreConfig from "@/core_configs";
import * as UiCategory from "@/ui_categories";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {MenuMoreOrientation} from "../../../module_components/lists/componentMenuMore";
import {CodeMirrorLanguage} from "../../../module_components/lists/componentCodeMirror/Props";
import type {CodeMirrorRunContext} from "../../../module_components/lists/componentCodeMirror/Props";

const reactiveElementSource = `() => {
    const heading = CoreReactive.App.h2({
        children: ["ReactiveElement"]
    });
    const description = CoreReactive.App.p({
        children: ["This element was created and composed with CoreReactive.App."]
    });

    return CoreReactive.App.section({
        className: ["p-3"],
        children: [heading, description]
    }).getElement();
}`;

const reactiveObservableSource = `() => {
    const count = new CoreObservable.App(0);
    const value = CoreReactive.App.b({
        children: ["Count: ", count]
    });
    const increment = CoreReactive.App.button({
        className: ["btn", "primary"],
        children: ["Increase"],
        on: {
            click: () => count.set(count.get() + 1)
        }
    });

    return CoreReactive.App.section({
        className: ["d-flex", "flex-column", "gap-2", "p-3"],
        children: [value, increment]
    }).getElement();
}`;

const eventSource = `() => {
    const StepRegister = CoreEvent.Step({
        children: {
            info: CoreEvent.Step({
                children: {
                    name: CoreEvent.Step({
                        request: CoreEvent.Request(),
                        response: CoreEvent.Response({value: ""})
                    }),
                    family: CoreEvent.Step({
                        request: CoreEvent.Request(),
                        response: CoreEvent.Response({value: ""})
                    }),
                    submit: CoreEvent.Step({
                        request: CoreEvent.Request(),
                        response: CoreEvent.Response()
                    })
                }
            })
        }
    });

    const nameInput = CoreReactive.App.input({
        className: ["form-input"],
        attrs: {placeholder: "Name"},
        unique: StepRegister.info.name,
        emit: () => {
            const value = nameInput.getElement().value;
            return {value, valid: value.trim().length > 0};
        }
    });
    const familyInput = CoreReactive.App.input({
        className: ["form-input"],
        attrs: {placeholder: "Family name"},
        unique: StepRegister.info.family,
        emit: () => {
            const value = familyInput.getElement().value;
            return {value, valid: value.trim().length > 0};
        }
    });
    const submitButton = CoreReactive.App.button({
        className: ["form-submit"],
        children: ["Submit"],
        unique: StepRegister.info.submit,
        on: {
            click: (_event, helper) => {
                const responses = helper.request(
                    CoreEvent.requestMap([
                        [StepRegister.info.name, {action: "validate"}],
                        [StepRegister.info.family, {action: "validate"}]
                    ]),
                    StepRegister.info.submit
                );
                const nameResponse = responses.get(StepRegister.info.name);
                const familyResponse = responses.get(StepRegister.info.family);
                console.log("[CoreEvent] responses", {
                    requestId: nameResponse?.requestId,
                    dispatchIds: [nameResponse?.dispatchId, familyResponse?.dispatchId],
                    source: StepRegister.info.submit.unique,
                    results: {
                        name: {target: StepRegister.info.name.unique, ...nameResponse?.value, status: nameResponse?.status},
                        family: {target: StepRegister.info.family.unique, ...familyResponse?.value, status: familyResponse?.status}
                    },
                    entries: Array.from(responses.entries()).map(([step, response]) => ({
                        target: step.unique,
                        response
                    }))
                });
            }
        }
    });

    return CoreReactive.App.section({
        className: ["d-flex", "flex-column", "gap-2", "p-3"],
        children: [nameInput, familyInput, submitButton]
    }).getElement();
}`;

export class ClHomePage implements ITemplate {

    render(_query?: Record<string, string>, _extra?: Record<string, any>): HTMLElement {
        const reactiveExample = createCodeExample(
            "ReactiveElement",
            "CoreReactive.App creates DOM elements as composable reactive elements. The returned element can contain other reactive elements and can be mounted directly.",
            reactiveElementSource,
        );
        const observableExample = createCodeExample(
            "ReactiveElement + Observable",
            "CoreObservable.App stores changing state. When the value changes, the observable child is rendered again while the surrounding reactive element stays in place.",
            reactiveObservableSource,
        );
        const eventExample = createCodeExample(
            "CoreEvent request / response",
            "The form connects inputs and a submit button through CoreEvent steps. Clicking Submit sends validation requests and prints the collected responses in the CodeMirror console.",
            eventSource,
        );

        const examples = CoreReactive.App.section({
            className: ["w-100"],
            children: [reactiveExample, observableExample, eventExample],
        });

        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Home",
            prop_hasIconBack: false,
        } as any).getElement();

        const exploreMenu = UiCategory.UI.Menus.MenuMore({
            styles: {width: "100%"},
            prop_orientation: MenuMoreOrientation.VERTICAL,
            prop_menuBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
            prop_items: [
                {id: "components", title: "Components", action: "/components"},
                {id: "icons", title: "Icons", action: "/icons"},
                {id: "workflow", title: "Workflow", action: "/workflow"},
            ],
        }, {
            SELECT_ITEM: (_event, dataArgs) => {
                const destination = dataArgs?.ITEM?.action;
                if (destination) window.location.href = destination;
            },
        } as any);

        const sidebar = CoreReactive.App.section({
            styles: {
                display: "flex",
                flexDirection: "column",
                gap: "var(--marginMedium)",
                padding: "var(--paddingMedium)",
                color: "var(--shanColor1)",
            },
            children: [
                CoreReactive.App.h3({
                    styles: {margin: "0", color: "var(--shanColor1)"},
                    children: ["Explore"],
                }),
                exploreMenu.getElement(),
            ],
        });

        const page = UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_content: examples.getElement(),
            prop_aside: sidebar,
            prop_asideWidth: UtilStyle.Css_SizeUnit(280, UtilConst.Units.PEXEL),
        } as any);

        return page.getElement() as HTMLElement;
    }

    onLoad(_pageElement: HTMLElement): void {}
}

function createCodeExample(title: string, explanation: string, source: string): HTMLElement {
    const codeMirror = UiCategory.UI.Tools.Code.CodeMirror({
        classList: ["w-100", "mb-3"],
        prop_title: title,
        prop_language: CodeMirrorLanguage.JAVASCRIPT,
        prop_canRun: true,
        prop_value: source,
        prop_editorHeight: "300px",
        prop_run: (editedSource: string, _language: CodeMirrorLanguage, context?: CodeMirrorRunContext) =>
            executeCodeExample(editedSource, context),
    } as any);

    queueMicrotask(() => codeMirror.run());

    return UiCategory.UI.Contents.Collapse({
        styles: CoreObservable.App.computed(
            (sizeName) => ({marginBottom: UtilStyle.Css_Margin(sizeName)}),
            [CoreConfig.Settings.SizeName.observable()],
        ) as any,
        prop_collapseTitle: title,
        prop_collapseBodyIsOpen: true,
        prop_collapseBody: CoreReactive.App.section({
            children: [
                CoreReactive.App.p({children: [explanation]}),
                codeMirror.getElement(),
            ],
        }),
    }).getElement() as HTMLElement;
}

function executeCodeExample(source: string, context?: CodeMirrorRunContext): HTMLElement | Node | void {
    const evaluated = new Function(
        "CoreReactive",
        "CoreObservable",
        "CoreEvent",
        "console",
        `"use strict"; return (${source});`,
    )(
        CoreReactive,
        CoreObservable,
        CoreEvent,
        context?.console ?? console,
    );

    const result = typeof evaluated === "function" ? evaluated() : evaluated;
    if (result instanceof Node) return result;
    if (result && typeof result.getElement === "function") return result.getElement() as HTMLElement;
    if (result && typeof result.getReactiveElement === "function") return result.getReactiveElement().getElement() as HTMLElement;
    if (result == null) return;
    throw new Error("The example source must return an HTMLElement or a reactive element.");
}
