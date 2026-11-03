import * as CoreComponents from "@/core_components";
import * as CoreConfig from "@/core_configs";
import * as CoreEvent from "@/core_event";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";
import {CodeMirrorLanguage} from "../../../../module_components/lists/componentCodeMirror/Props";
import type {CodeMirrorRunContext} from "../../../../module_components/lists/componentCodeMirror/Props";
import * as ComponentCollapse from "../../../../module_components/lists/componentCollapse";
import * as ComponentJsonTree from "../../../../module_components/lists/componentJsonTree";
import {
    executeExampleSource,
    formatExampleSource,
    readComponentWorkflow,
} from "../../../../module_pages/pages/components/ClComponentDetailsPage";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const MY_PAGE_COMPONENT_INFO_PAGE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.componentInfo.componentInfoPage";

export type ComponentInfoPageControllerParams = Record<string, unknown> & {
    componentName?: string | null;
    widget?: Record<string, unknown> | null;
};

/** Supplies the existing component-details content to the shared v2 page shell. */
export const componentInfoPage = (params: ComponentInfoPageControllerParams = {}) => {
    const componentName = getRequestedComponentName(params.componentName);
    const entry = CoreComponents.ComponentManager.list().find(({definition}) =>
        definition.name === componentName || definition.id === componentName,
    );

    if (!entry) {
        const content = CoreReactive.App.section({
            className: ["w-100", "p-3"],
            children: [
                CoreReactive.App.h2({children: ["Component not found"]}),
                CoreReactive.App.p({
                    className: ["text-muted"],
                    children: [`No component is registered as “${componentName}”.`],
                }),
            ],
        });
        return new RequestManager({
            state: HttpStatusCode.OK,
            status: true,
            messages: [`No component is registered as “${componentName}”.`],
            widget: params.widget ?? null,
            data: {
                content,
                sidebar: null,
                pageTitle: "Component not found",
                pageNav: componentPageNavigation(),
            },
            reference: {
                source: MY_PAGE_COMPONENT_INFO_PAGE_SOURCE,
                method: RequestMethod.INTERNAL,
                respondedAt: new Date(),
            },
        }).get();
    }

    const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);
    const workflowTree = new ComponentJsonTree.Component({
        styles: {width: "100%", minWidth: "0"},
        prop_data: readComponentWorkflow(entry),
        prop_initialExpandDepth: 4,
        prop_treeHorizontalScroll: true,
    } as any);
    const workflowCollapse = new ComponentCollapse.Component({
        prop_collapseTitle: "Component event workflow",
        prop_collapseIcon: UiIcons.Src.EventWorkflow.Definition,
        prop_collapseBody: workflowTree.getElement(),
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
    const exampleTargets: HTMLElement[] = [];
    const contentStyles = CoreObservable.App.computed((sizeName: any) => {
        const padding = UtilStyles.Css_Padding(sizeName) as any;
        return {
            height: UtilStyles.Css_SizeCalc(
                UtilStyles.Css_SizeUnit(100, UtilConsts.Units.VH) as any,
                UtilConsts.Operation.MINUS,
                UtilStyles.Css_Height(sizeName) as any,
                UtilConsts.Operation.MINUS,
                UtilStyles.Css_Margin(sizeName) as any,
                UtilConsts.Operation.MINUS,
                padding,
                UtilConsts.Operation.MINUS,
                padding,
                UtilConsts.Operation.MINUS,
                padding,
                UtilConsts.Operation.MINUS,
                padding,
                UtilConsts.Operation.MINUS,
                padding,
                UtilConsts.Operation.MINUS,
                padding,
            ),
            minHeight: "0",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
        };
    }, [CoreConfig.Settings.SizeName.observable()]);
    const content = CoreReactive.App.section({
        className: ["w-100", "p-3"],
        stylesBind: contentStyles as any,
        children: [
            workflowCollapse.getElement(),
            CoreReactive.App.h3({className: ["mb-3"], children: ["Examples"]}),
            ...(examples.length
                ? examples.map((example, index) => {
                    const source = formatExampleSource(example.render);
                    const codeMirror = UiCategory.UI.Tools.Code.CodeMirror({
                        classList: ["w-100", "mb-3"],
                        prop_title: "Example code",
                        prop_language: CodeMirrorLanguage.JAVASCRIPT,
                        prop_canRun: true,
                        prop_value: source,
                        prop_editorHeight: "280px",
                        prop_run: (editedSource: string, _language: CodeMirrorLanguage, context?: CodeMirrorRunContext) =>
                            executeExampleSource(example.render, source, editedSource, context, {pageWorkflow}),
                    } as any);
                    queueMicrotask(() => codeMirror.run());
                    const card = UiCategory.UI.Contents.CardViewInfo({
                        classList: ["mb-3"],
                        prop_title: CoreLanguage.App.translate(example.name).get(),
                        prop_content: CoreReactive.App.section({
                            children: [
                                ...(example.description ? [
                                    CoreReactive.App.p({children: [CoreLanguage.App.translate(example.description).get()]}),
                                ] : []),
                                codeMirror.getElement(),
                            ],
                        }).getElement(),
                    });
                    const cardElement = card.getElement() as HTMLElement;
                    cardElement.id = `component-info-example-${index}`;
                    cardElement.style.scrollMarginTop = "var(--marginMedium)";
                    exampleTargets.push(cardElement);
                    return cardElement;
                })
                : [CoreReactive.App.p({className: ["text-muted"], children: ["No examples are available."]})]),
        ],
    });
    const sidebar = UiCategory.UI.Controllers.MyPage.Tools.sideBarMenu({
        title: "Examples",
        items: examples.map((example, index) => ({
            id: String(index),
            title: CoreLanguage.App.translate(example.name).get(),
            action: "scroll-to-example",
        })),
        methods: {
            SELECT_ITEM: (_event: Event, dataArgs: {ITEM?: {id?: string}}) => {
                const targetIndex = Number(dataArgs?.ITEM?.id);
                if (!Number.isInteger(targetIndex)) return;
                scrollToExample(exampleTargets[targetIndex]);
            },
        },
    });

    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: [`Component details for ${entry.definition.name} are ready.`],
        widget: params.widget ?? null,
        data: {
            content,
            sidebar,
            pageTitle: entry.definition.name,
            pageNav: componentPageNavigation(),
        },
        reference: {
            source: MY_PAGE_COMPONENT_INFO_PAGE_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};

function getRequestedComponentName(value: unknown): string {
    const provided = typeof value === "string" ? value.trim() : "";
    if (provided) return provided;
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const segment = pathSegments[pathSegments.length - 1] ?? "";
    try {
        return decodeURIComponent(segment);
    } catch {
        return segment;
    }
}

function scrollToExample(target: HTMLElement | undefined): void {
    if (!target?.isConnected) return;

    const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
    let ancestor = target.parentElement;
    while (ancestor && ancestor !== document.body && ancestor !== document.documentElement) {
        const styles = window.getComputedStyle(ancestor);
        const canScrollY = (styles.overflowY === "auto" || styles.overflowY === "scroll") &&
            ancestor.scrollHeight > ancestor.clientHeight;
        if (canScrollY) {
            const targetTop = target.getBoundingClientRect().top - ancestor.getBoundingClientRect().top + ancestor.scrollTop;
            ancestor.scrollTo({top: Math.max(0, targetTop - scrollMargin), behavior: "smooth"});
            return;
        }
        ancestor = ancestor.parentElement;
    }

    const scrollRoot = document.scrollingElement as HTMLElement | null ?? document.documentElement;
    const targetTop = target.getBoundingClientRect().top + scrollRoot.scrollTop;
    scrollRoot.scrollTo({top: Math.max(0, targetTop - scrollMargin), behavior: "smooth"});
}

function componentPageNavigation(): Array<{name: string; title: string}> {
    return [
        {name: "home", title: "Home"},
        {name: "components", title: "Components"},
    ];
}
