import * as Core from "@/core";
import * as CoreComponents from "@/core_components";
import * as CoreEvent from "@/core_event";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";
import type {JsonValue} from "../../../../module_components/lists/componentJsonTree/Types";
import {PAGE_FORMAT_WIDGET_SOURCE} from "./MyPagePageFormatSource";

export const MY_PAGE_PAGE_FORMAT_SOURCE = "framework.ui.controller.requests.static.v1.myPage.tools.pageFormat";

export type PageFormatControllerParams = {
    sessionKey?: string | null;
    pageTitle?: string | null;
    hasIconBack?: boolean;
    pageNav?: unknown[] | null;
    content?: unknown;
    sidebar?: unknown;
    asideWidth?: string | number | null;
    headerOptionsList?: unknown[] | null;
    headerMethods?: Record<string, (...args: any[]) => any> | null;
    workflowNodeNames?: Partial<Record<"page" | "header" | "layout" | "aside" | "sideBarMenu", string>>;
    onPageCreated?: ((page: any) => void) | null;
    /** Keeps the originating page controller visible in request metadata when this format is reused. */
    controllerSource?: string | null;
    statusMessage?: string | null;
    widget?: Record<string, unknown> | null;
};

type PageFormatSession = {
    page: any;
    header: any;
    contentTransition: any;
    sidebarTransition: any | null;
};

const pageFormatSessions = new Map<string, PageFormatSession>();

export type PageFormatUpdateParams = Omit<PageFormatControllerParams,
    "controllerSource" | "statusMessage" | "widget" | "headerOptionsList" | "headerMethods"
> & {
    changeDirection?: "forward" | "backward";
};

export type PageFormatTransitionParams = Pick<PageFormatUpdateParams,
    "sessionKey" | "pageTitle" | "hasIconBack" | "pageNav" | "asideWidth" | "changeDirection"
>;

/** Updates page chrome and reveals the built-in loading layer before preparing heavy slots. */
export function beginPageFormatTransition(params: PageFormatTransitionParams): boolean {
    const sessionKey = params.sessionKey?.trim() || MY_PAGE_PAGE_FORMAT_SOURCE;
    const session = pageFormatSessions.get(sessionKey);
    if (!session) return false;

    session.header.set("prop_pageTitle", params.pageTitle ?? "");
    session.header.set("prop_hasIconBack", params.hasIconBack ?? true);
    session.header.set("prop_pageNav", params.pageNav ?? []);
    session.page.set("prop_asideWidth", params.asideWidth ?? "280px");

    const direction = params.changeDirection ?? "forward";
    session.contentTransition.set("prop_changeDirection", direction);
    session.contentTransition.set("prop_mode", "loading");
    if (session.sidebarTransition) {
        session.sidebarTransition.set("prop_changeDirection", direction);
        session.sidebarTransition.set("prop_mode", "loading");
    }
    return true;
}

/** Updates the live page shell while keeping its header and layout mounted. */
export function updatePageFormat(params: PageFormatUpdateParams): boolean {
    const sessionKey = params.sessionKey?.trim() || MY_PAGE_PAGE_FORMAT_SOURCE;
    const session = pageFormatSessions.get(sessionKey);
    if (!session) return false;
    const workflowNodeNames = {...Core.Dictionary.WorkflowNodeNames, ...(params.workflowNodeNames ?? {})};

    session.header.set("prop_pageTitle", params.pageTitle ?? "");
    session.header.set("prop_hasIconBack", params.hasIconBack ?? true);
    session.header.set("prop_pageNav", params.pageNav ?? []);
    session.page.set("prop_asideWidth", params.asideWidth ?? "280px");

    const direction = params.changeDirection ?? "forward";
    session.contentTransition.set("prop_changeDirection", direction);
    session.contentTransition.set("prop_mode", "slide");
    session.contentTransition.set("prop_content", params.content ?? null);

    const sidebarWidget = params.sidebar == null ? null : UiCategory.UI.Fetch.Widget({
        prop_workflowChildName: workflowNodeNames.sideBarMenu,
        prop_widgetWidth: "100%",
        prop_widgetStyles: {minHeight: "0"},
        prop_controller: params.sidebar as any,
    });
    if (session.sidebarTransition) {
        session.sidebarTransition.set("prop_changeDirection", direction);
        session.sidebarTransition.set("prop_mode", "slide");
        if (sidebarWidget) session.page.transitionAsideContent?.();
        session.sidebarTransition.set("prop_content", sidebarWidget);
    } else if (sidebarWidget) {
        session.page.set("prop_aside", sidebarWidget);
    }
    params.onPageCreated?.(session.page);
    return true;
}

/** Shared page shell. The page-specific content and sidebar controller are supplied as slots. */
export const pageFormat = (params: PageFormatControllerParams = {}) => {
    const sessionKey = params.sessionKey?.trim() || MY_PAGE_PAGE_FORMAT_SOURCE;
    const workflowNodeNames = {...Core.Dictionary.WorkflowNodeNames, ...(params.workflowNodeNames ?? {})};
    const headerMethods = params.headerMethods ?? createHeaderMethods(workflowNodeNames);
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: [params.statusMessage?.trim() || "Page format is ready."],
        widget: params.widget ?? null,
        data: {
            sessionKey,
            pageTitle: params.pageTitle ?? "",
            hasIconBack: params.hasIconBack ?? true,
            pageNav: params.pageNav ?? (params.hasIconBack === false ? [] : [{name: "home", title: "Home"}]),
            content: params.content ?? null,
            sidebar: params.sidebar ?? null,
            asideWidth: params.asideWidth ?? "280px",
            headerOptionsList: params.headerOptionsList ?? [{
                id: "open-page-settings",
                title: "Settings",
                icon: UiIcons.Src.FileSetting.Definition,
                action: "open-page-settings",
            }],
            headerMethods,
            workflowNodeNames,
            onPageCreated: (page: any, header: any, contentTransition: any, sidebarTransition: any) => {
                pageFormatSessions.set(sessionKey, {page, header, contentTransition, sidebarTransition});
                params.onPageCreated?.(page);
            },
        },
        source: PAGE_FORMAT_WIDGET_SOURCE,
        reference: {
            source: params.controllerSource?.trim() || MY_PAGE_PAGE_FORMAT_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};

function createHeaderMethods(workflowNodeNames: Record<string, string>) {
    let workflowTreeUnsubscribe: (() => void) | null = null;
    let settingContentWidget: any = null;
    let workflowData: CoreObservable.App<JsonValue> | null = null;

    return {
        BACK: () => navigateToPage("/v2/home"),
        SELECT_NAV_ITEM: (_event: Event, args: {NAME?: string}) => {
            if (args?.NAME === "home") navigateToPage("/v2/home");
            if (args?.NAME === "components") navigateToPage("/v2/components");
        },
        SELECT_OPTION: function(this: any, _event: Event, args: {NAME?: string}) {
            if (args?.NAME !== "open-page-settings") return;
            const source = this.getComponentWorkflow() as CoreEvent.TStepRef;
            const settingMatch = CoreEvent.findWorkflowNodes(source, workflowNodeNames.setting)
                .find(({node}) => CoreComponents.Tools.Workflow.Get_ComponentWorkflowMetadata(node)?.kind !== "component");
            if (!settingMatch) return;

            const workflowRoot = settingMatch.root;
            workflowTreeUnsubscribe?.();
            const initialData = serializeWorkflowComponent(workflowRoot);
            if (!workflowData) workflowData = new CoreObservable.App<JsonValue>(initialData);
            else workflowData.set(initialData);
            workflowTreeUnsubscribe = CoreComponents.Tools.Workflow.Subscribe_ComponentWorkflow(
                workflowRoot,
                () => workflowData?.set(serializeWorkflowComponent(workflowRoot)),
            );

            if (!settingContentWidget) {
                const workflowNodeEntries = Object.values(Core.Dictionary.WorkflowNodeDictionary).map((entry) => ({
                    name: entry.name,
                    title: entry.title,
                }));
                settingContentWidget = UiCategory.UI.Fetch.Widget({
                    prop_widgetWidth: "100%",
                    prop_widgetHeight: "100%",
                    prop_widgetStyles: {height: "100%", minHeight: "0"},
                    prop_controller: UiCategory.UI.Controllers.MyPage.Tools.pageSettings({
                        workflowData,
                        workflowNodeEntries,
                        workflowNodeNames: {
                            tabs: workflowNodeNames.tabs,
                            workflowEvent: workflowNodeNames.workflowEvent,
                            dictionary: workflowNodeNames.dictionary,
                        },
                    }),
                });
            }

            CoreEvent.App.request(
                CoreEvent.requestMap([[settingMatch.node, {content: settingContentWidget}]]),
                source,
            );
        },
    };
}

function navigateToPage(path: string): void {
    window.dispatchEvent(new CustomEvent("framework:route:navigate", {detail: {path}}));
}

function serializeWorkflowComponent(step: CoreEvent.TStepRef): JsonValue {
    const componentStep = step as CoreEvent.ClStep;
    const metadata = CoreComponents.Tools.Workflow.Get_ComponentWorkflowMetadata(step);
    const localSteps = Object.fromEntries(
        componentStep.getChildEntries()
            .filter(([key]) => key !== CoreComponents.Tools.Workflow.COMPONENT_WORKFLOW_CHILDREN_KEY)
            .map(([key, child]) => [key, serializeWorkflowStep(child, key)]),
    );
    const children = Object.fromEntries(
        CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(step)
            .map(([key, child]) => [key, serializeWorkflowComponent(child)]),
    );
    return {
        component: metadata?.component ?? {name: componentStep.unique, id: componentStep.unique},
        workflow: {root: componentStep.unique, steps: localSteps, children},
    };
}

function serializeWorkflowStep(step: CoreEvent.TStepRef, name: string): JsonValue {
    const stepInstance = step as CoreEvent.ClStep;
    const steps = Object.fromEntries(
        stepInstance.getChildEntries()
            .filter(([key]) => key !== CoreComponents.Tools.Workflow.COMPONENT_WORKFLOW_CHILDREN_KEY)
            .map(([key, child]) => [key, serializeWorkflowStep(child, key)]),
    );
    return {name, unique: stepInstance.unique, ...(Object.keys(steps).length ? {steps} : {})};
}
