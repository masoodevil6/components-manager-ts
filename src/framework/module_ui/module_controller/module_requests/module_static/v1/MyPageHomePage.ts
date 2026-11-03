import * as Core from "@/core";
import * as UiCategory from "@/ui_categories";
import {LayoutColumn} from "../../../../module_components/lists/componentLayout/Props";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";
import {
    executeHomeExample,
    type HomeExampleRunHandler,
    reactiveElement,
    observable,
    workflowEvent,
} from "./MyPageHome";

export const MY_PAGE_HOME_PAGE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.home.homePage";

type HomePageWorkflowNames = Partial<Record<
    "homePage" | "layout" | "exploreMenu" | "homeReactiveElement" | "homeObservable" | "homeWorkflowEvent",
    string
>>;

export type HomePageControllerParams = {
    run?: HomeExampleRunHandler | null;
    workflowNodeNames?: HomePageWorkflowNames;
    widget?: Record<string, unknown> | null;
};

/** Shared examples layout used by the /home controller and the v2 workflow demo. */
export function createHomeExamplesLayout(params: HomePageControllerParams = {}): any {
    const runExample = params.run ?? executeHomeExample;
    const names = {...Core.Dictionary.WorkflowNodeNames, ...(params.workflowNodeNames ?? {})};

    const createWidget = (controller: unknown, workflowChildName: string) => UiCategory.UI.Fetch.Widget({
        prop_workflowChildName: workflowChildName,
        prop_widgetWidth: "100%",
        prop_widgetStyles: {minHeight: "0"},
        prop_controller: controller,
    } as any);

    return UiCategory.UI.Basic.Layout({
        prop_workflowChildName: names.layout,
        prop_col: LayoutColumn.COL_12,
        prop_layoutContent: [
            {
                content: createWidget(reactiveElement({run: runExample}), names.homeReactiveElement),
                col: LayoutColumn.COL_12,
                workflowChildName: names.homeReactiveElement,
            },
            {
                content: createWidget(observable({run: runExample}), names.homeObservable),
                col: LayoutColumn.COL_12,
                workflowChildName: names.homeObservable,
            },
            {
                content: createWidget(workflowEvent({run: runExample}), names.homeWorkflowEvent),
                col: LayoutColumn.COL_12,
                workflowChildName: names.homeWorkflowEvent,
            },
        ],
    } as any);
}

export const homePage = (params: HomePageControllerParams = {}) => {
    const workflowNodeNames = {...Core.Dictionary.WorkflowNodeNames, ...(params.workflowNodeNames ?? {})};
    const sideBarMenuController = UiCategory.UI.Controllers.MyPage.Tools.sideBarMenu({
        title: "Explore",
        workflowNodeNames: {categoryMenu: workflowNodeNames.exploreMenu},
        items: [
            {id: "components", title: "Components", action: "/v2/components"},
            {id: "icons", title: "Icons", action: "/v2/icons"},
            {id: "controllers", title: "Controllers", action: "/v2/controllers"},
            {id: "workflow", title: "Workflow", action: "/v2/workflow"},
            {id: "pager", title: "Pager", action: "/pager"},
            {id: "request-test", title: "Request Test", action: "/test"},
        ],
        methods: {
            SELECT_ITEM: (_event: Event, dataArgs: {ITEM?: {action?: string}}) => {
                const destination = dataArgs?.ITEM?.action;
                if (!destination) return;
                window.dispatchEvent(new CustomEvent("framework:route:navigate", {
                    detail: {path: destination},
                }));
            },
        },
    });
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Home page content and sidebar are ready."],
        widget: params.widget ?? null,
        data: {
            content: createHomeExamplesLayout({...params, workflowNodeNames}),
            sidebar: sideBarMenuController,
        },
        reference: {
            source: MY_PAGE_HOME_PAGE_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};
