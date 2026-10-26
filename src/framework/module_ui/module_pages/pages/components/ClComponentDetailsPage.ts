import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as CoreComponents from "@/core_components";
import * as CoreEvent from "@/core_event";
import * as CoreLanguage from "@/core_languages";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import * as CoreObservable from "@/core_observable";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UtilValidators from "@/util_validators";
import {CodeMirrorLanguage} from "../../../module_components/lists/componentCodeMirror/Props";
import type {CodeMirrorRunContext} from "../../../module_components/lists/componentCodeMirror/Props";
import * as ComponentCollapse from "../../../module_components/lists/componentCollapse";
import * as ComponentJsonTree from "../../../module_components/lists/componentJsonTree";
import type {JsonValue} from "../../../module_components/lists/componentJsonTree/Types";

export class ClComponentDetailsPage implements ITemplate {
    render(): HTMLElement {
        const pathParts = location.pathname.split("/").filter(Boolean);
        const componentName = decodeURIComponent(pathParts[pathParts.length - 1] ?? "");
        const entry = CoreComponents.ComponentManager.list().find(({definition}) =>
            definition.name === componentName || definition.id === componentName,
        );

        if (!entry) {
            const header = UiCategory.UI.Pages.Header.PageHeader({
                prop_pageTitle: "Component not found",
                prop_hasIconBack: true,
                prop_pageNav: [
                    {name: "home", title: "Home"},
                    {name: "components", title: "Components"},
                ],
            }, {
                BACK: () => { window.location.href = "/components"; },
                SELECT_NAV_ITEM: (_event: Event, args: any) => {
                    if (args?.NAME === "home") window.location.href = "/";
                    if (args?.NAME === "components") window.location.href = "/components";
                },
            } as any).getElement();
            const page = UiCategory.UI.Pages.Page({
                prop_header: header,
                prop_content: CoreReactive.App.section({
                    className: ["w-100", "p-3"],
                    children: [
                        CoreReactive.App.h2({children: ["Component not found"]}),
                        CoreReactive.App.p({
                            className: ["text-muted"],
                            children: [`No component is registered as “${componentName}”.`],
                        }),
                    ],
                }),
            } as any);
            return page.getElement() as HTMLElement;
        }

        const descriptionSchema = Object.entries(entry.schemas ?? {}).find(([name, schema]: [string, any]) =>
            name !== "COMPONENT" && name !== "STRUCTURE" && (schema.description || schema.descriptionKey),
        )?.[1] as any;
        const descriptionKey = descriptionSchema?.description ?? descriptionSchema?.descriptionKey;
        const description = descriptionKey ? CoreLanguage.App.translate(descriptionKey).get() : "";
        const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);
        const componentWorkflowTree = new ComponentJsonTree.Component({
            styles: {width: "100%", minWidth: "0"},
            prop_data: readComponentWorkflow(entry),
            prop_initialExpandDepth: 4,
            prop_treeHorizontalScroll: true,
        } as any);
        const componentWorkflowCollapse = new ComponentCollapse.Component({
            prop_collapseTitle: "Component event workflow",
            prop_collapseIcon: UiIcons.Src.EventWorkflow.Definition,
            prop_collapseBody: componentWorkflowTree.getElement(),
            prop_collapseBodyIsOpen: false,
        } as any);
        const pageWorkflow = CoreEvent.Step({
            children: {
                showWorkflow: CoreEvent.Step({
                    request: CoreEvent.Request(),
                    response: CoreEvent.Response(),
                }),
            },
        });
        let workflowEndpoint: CoreEvent.TStepRef | null = null;

        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: entry.definition.name,
            prop_hasIconBack: true,
            prop_pageNav: [
                {name: "home", title: "Home"},
                {name: "components", title: "Components"},
            ],
            prop_menuItems: [{
                id: "show-page-workflow",
                title: "Event workflow",
                icon: UiIcons.Src.EventWorkflow.Definition,
                action: "show-workflow",
            }],
        }, {
            BACK: () => { window.location.href = "/components"; },
            SELECT_NAV_ITEM: (_event: Event, args: any) => {
                if (args?.NAME === "home") window.location.href = "/";
                if (args?.NAME === "components") window.location.href = "/components";
            },
            SELECT_OPTION: (_event: Event, args: any) => {
                if (args?.NAME !== "show-workflow" || !workflowEndpoint) return;
                CoreEvent.App.request(
                    CoreEvent.requestMap([[workflowEndpoint, {}]]),
                    pageWorkflow.showWorkflow,
                );
            },
        } as any).getElement();
        const settingContent = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-2", "p-3"],
            children: [
                CoreReactive.App.h3({className: ["mb-1"], children: [entry.definition.name]}),
                CoreReactive.App.p({className: ["text-muted", "mb-0"], children: [entry.definition.id]}),
                CoreReactive.App.p({className: ["mb-0"], children: [`Version: ${entry.definition.version}`]}),
                ...(description ? [
                    CoreReactive.App.div({className: ["border-top", "my-1"]}),
                    CoreReactive.App.p({children: [description]}),
                ] : []),
            ],
        });
        const content = CoreReactive.App.section({
            className: ["w-100", "p-3"],
            children: [
                componentWorkflowCollapse.getElement(),
                CoreReactive.App.h3({className: ["mb-3"], children: ["Examples"]}),
                ...(examples.length
                    ? examples.map((example) => {
                        const source = formatExampleSource(example.render);
                        const codeMirrorComponent = UiCategory.UI.Tools.Code.CodeMirror({
                            classList: ["w-100", "mb-3"],
                            prop_title: "Example code",
                            prop_language: CodeMirrorLanguage.JAVASCRIPT,
                            prop_canRun: true,
                            prop_value: source,
                            prop_editorHeight: "280px",
                            prop_run: (editedSource: string, _language: CodeMirrorLanguage, context?: CodeMirrorRunContext) =>
                                executeExampleSource(example.render, source, editedSource, context, {pageWorkflow}),
                        } as any);
                        queueMicrotask(() => codeMirrorComponent.run());
                        const codeMirror = codeMirrorComponent.getElement();
                        return UiCategory.UI.Contents.CardViewInfo({
                            classList: ["mb-3"],
                            prop_title: CoreLanguage.App.translate(example.name).get(),
                            prop_content: CoreReactive.App.section({
                                children: [
                                    ...(example.description ? [CoreReactive.App.p({children: [CoreLanguage.App.translate(example.description).get()]})] : []),
                                    codeMirror,
                                ],
                            }).getElement(),
                        }).getElement();
                    })
                    : [CoreReactive.App.p({className: ["text-muted"], children: ["No examples are available."]})]),
            ],
        });
        const page = UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_setting: settingContent,
            prop_content: content,
        } as any, {}, {unique: pageWorkflow});
        const pageStep = CoreEvent.getChild(pageWorkflow, "page");
        workflowEndpoint = pageStep ? CoreEvent.getChild(pageStep, "workflow") : null;
        return page.getElement() as HTMLElement;
    }

    onLoad(_pageElement: HTMLElement): void {}
}

type WorkflowStepLike = {
    unique: string;
    getChildEntries(): ReadonlyArray<readonly [string, WorkflowStepLike]>;
};

type WorkflowInspectableComponent = {
    getComponentWorkflow?: () => WorkflowStepLike;
    getScope?: () => {dispose(): void};
    dispose?: () => void;
};

function readComponentWorkflow(entry: CoreComponents.ComponentRegistryEntry): JsonValue {
    let instance: WorkflowInspectableComponent | null = null;

    try {
        if (entry.constructor) {
            const ComponentConstructor = entry.constructor as any;
            instance = new ComponentConstructor({}, {}) as WorkflowInspectableComponent;
        }

        const workflow = instance?.getComponentWorkflow?.();
        const steps = workflow?.getChildEntries
            ? Object.fromEntries(workflow.getChildEntries().map(([key, step]) => [key, serializeWorkflowStep(step, key)]))
            : {};

        return {
            component: {
                name: entry.definition.name,
                id: entry.definition.id,
            },
            workflow: {
                root: workflow?.unique || entry.definition.id,
                steps,
            },
        };
    } catch (error) {
        console.warn(`[ComponentDetails] Could not inspect workflow for "${entry.definition.id}".`, error);
        return {
            component: {
                name: entry.definition.name,
                id: entry.definition.id,
            },
            workflow: {
                root: entry.definition.id,
                steps: {},
                available: false,
            },
        };
    } finally {
        try {
            instance?.dispose?.();
        } catch (error) {
            console.warn(`[ComponentDetails] Could not dispose workflow probe for "${entry.definition.id}".`, error);
        }
        instance?.getScope?.().dispose();
    }
}

function serializeWorkflowStep(step: WorkflowStepLike, key: string): JsonValue {
    const children = Object.fromEntries(
        step.getChildEntries().map(([childKey, child]) => [childKey, serializeWorkflowStep(child, childKey)]),
    );
    return {
        name: key,
        unique: step.unique,
        ...(Object.keys(children).length > 0 ? {steps: children} : {}),
    };
}

function formatExampleSource(render: () => HTMLElement): string {
    return render.toString().trim();
}

function executeExampleSource(
    render: (context?: {pageWorkflow?: unknown}) => HTMLElement,
    originalSource: string,
    editedSource: string,
    context?: CodeMirrorRunContext,
    exampleContext?: {pageWorkflow?: unknown},
): HTMLElement | Node | void {
    if (editedSource.trim() === originalSource.trim()) {
        return render(exampleContext);
    }

    const evaluated = new Function(
        "UiCategory",
        "UiIcons",
        "CoreReactive",
        "CoreObservable",
        "CoreComponents",
        "CoreEvent",
        "CoreLanguage",
        "CodeMirrorLanguage",
        "console",
        "UtilValidators",
        "UtilConst",
        "UtilStyle",
        `"use strict"; return (${editedSource});`,
    )(
        UiCategory,
        UiIcons,
        CoreReactive,
        CoreObservable,
        CoreComponents,
        CoreEvent,
        CoreLanguage,
        CodeMirrorLanguage,
        context?.console ?? console,
        UtilValidators,
        UtilConst,
        UtilStyle,
    );
    const result = typeof evaluated === "function" ? evaluated(exampleContext) : evaluated;
    if (result instanceof Node) return result;
    if (result && typeof result.getElement === "function") return result.getElement() as HTMLElement;
    if (result && typeof result.getReactiveElement === "function") return result.getReactiveElement().getElement() as HTMLElement;
    if (result == null) return;
    throw new Error("The example source must return an HTMLElement or a Component instance.");
}
