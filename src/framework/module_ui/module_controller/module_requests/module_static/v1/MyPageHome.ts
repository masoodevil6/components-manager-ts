import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreEvent from "@/core_event";
import type {CodeMirrorRunContext} from "../../../../module_components/lists/componentCodeMirror/Props";

export const MY_PAGE_HOME_REACTIVE_ELEMENT_SOURCE = "framework.ui.controller.requests.static.v1.myPage.home.reactiveElement";
export const MY_PAGE_HOME_OBSERVABLE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.home.observable";
export const MY_PAGE_HOME_WORKFLOW_EVENT_SOURCE = "framework.ui.controller.requests.static.v1.myPage.home.workflowEvent";

export type HomeExampleRunHandler = (...args: any[]) => unknown;

export type HomeExampleControllerParams = {
    run?: HomeExampleRunHandler | null;
};

type HomeExampleDefinition = {
    title: string;
    description: string;
    code: string;
    source: string;
};

const HOME_EXAMPLE_WIDGET_SOURCE = [
    "const description = document.createElement('p');",
    "description.textContent = String(response?.description ?? '');",
    "const codeMirror = UiCategory.UI.Tools.Code.CodeMirror({",
    '    classList: ["w-100", "mb-3"],',
    '    prop_title: String(response?.title ?? ""),',
    '    prop_language: "javascript",',
    "    prop_canRun: true,",
    '    prop_value: String(response?.code ?? ""),',
    '    prop_editorHeight: "300px",',
    '    prop_run: typeof response?.run === "function" ? response.run : null,',
    "});",
    "const body = UiCategory.UI.Basic.Layout({",
    "    prop_col: 'COL_12',",
    "    prop_layoutContent: [",
    "        {content: description, col: 'COL_12'},",
    "        {content: codeMirror, col: 'COL_12'}",
    "    ],",
    "});",
    "queueMicrotask(() => codeMirror.run());",
    "return UiCategory.UI.Contents.Collapse({",
    '    styles: {marginBottom: "var(--marginMedium)"},',
    '    prop_collapseTitle: String(response?.title ?? ""),',
    "    prop_collapseBodyIsOpen: true,",
    "    prop_collapseBody: body,",
    "});",
].join("\n");

const REACTIVE_ELEMENT: HomeExampleDefinition = {
    title: "ReactiveElement",
    description: "CoreReactive.App creates DOM elements as composable reactive elements. The returned element can contain other reactive elements and can be mounted directly.",
    code: `() => {
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
}`,
    source: MY_PAGE_HOME_REACTIVE_ELEMENT_SOURCE,
};

const OBSERVABLE: HomeExampleDefinition = {
    title: "Observable",
    description: "CoreObservable.App stores changing state. When the value changes, the observable child is rendered again while the surrounding reactive element stays in place.",
    code: `() => {
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
}`,
    source: MY_PAGE_HOME_OBSERVABLE_SOURCE,
};

const WORKFLOW_EVENT: HomeExampleDefinition = {
    title: "Workflow Event",
    description: "The form connects inputs and a submit button through CoreEvent steps. Clicking Submit sends validation requests and prints the collected responses in the CodeMirror console.",
    code: `() => {
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
}`,
    source: MY_PAGE_HOME_WORKFLOW_EVENT_SOURCE,
};

export const reactiveElement = (params: HomeExampleControllerParams = {}) => createHomeExample(REACTIVE_ELEMENT, params);
export const observable = (params: HomeExampleControllerParams = {}) => createHomeExample(OBSERVABLE, params);
export const workflowEvent = (params: HomeExampleControllerParams = {}) => createHomeExample(WORKFLOW_EVENT, params);

function createHomeExample(definition: HomeExampleDefinition, params: HomeExampleControllerParams) {
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: [`${definition.title} example is ready.`],
        data: {
            title: definition.title,
            description: definition.description,
            code: definition.code,
            run: params.run ?? null,
        },
        source: HOME_EXAMPLE_WIDGET_SOURCE,
        reference: {
            source: definition.source,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
}

/** Run a code example with the framework APIs exposed to the example source. */
export function executeHomeExample(source: string, context?: CodeMirrorRunContext): HTMLElement | Node | void {
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
