import {RouteRenderMode, type TRouter} from "@/core_route";
import * as Core from "@/core";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import {executeHomeExample} from "@/ui_controller/module_requests/module_static/v1/MyPageHome";
import {
    beginPageFormatTransition,
    pageFormat,
    updatePageFormat,
    type PageFormatControllerParams,
} from "@/ui_controller/module_requests/module_static/v1/MyPagePageFormat";

const V2_PAGE_FORMAT_SESSION = "v2-page-format";
let v2PageUpdateGeneration = 0;

type PageControllerResponse = {
    data?: {
        content?: unknown;
        sidebar?: unknown;
        pageTitle?: string;
        pageNav?: unknown[];
        onPageCreated?: (page: any) => void;
    };
    reference?: {source?: string | null};
};

type V2PageDefinition = {
    title: string | ((path: string) => string);
    source: string;
    controller: () => PageControllerResponse;
};

function createV2PageRoute(definition: V2PageDefinition) {
    const getTitle = (path = typeof window === "undefined" ? "/" : window.location.pathname): string =>
        typeof definition.title === "function" ? definition.title(path) : definition.title;
    const headerTitle = new CoreObservable.App(getTitle());
    const getPageData = () => definition.controller();
    const getFormatParams = (
        response: PageControllerResponse = {},
        changeDirection?: "forward" | "backward",
    ): PageFormatControllerParams & {changeDirection?: "forward" | "backward"} => ({
        ...response.data,
        sessionKey: V2_PAGE_FORMAT_SESSION,
        pageTitle: response.data?.pageTitle ?? getTitle(),
        hasIconBack: true,
        pageNav: response.data?.pageNav ?? [{name: "home", title: "Home"}],
        asideWidth: "280px",
        workflowNodeNames: Core.Dictionary.WorkflowNodeNames,
        controllerSource: response.reference?.source ?? definition.source,
        changeDirection,
    });

    return {
        reuseKey: V2_PAGE_FORMAT_SESSION,
        // Page-level motion is disabled; the content and sidebar wrappers own transitions.
        renderMode: RouteRenderMode.NONE,
        controller: () => pageFormat(getFormatParams(getPageData())),
        onReuse: (_pageElement: HTMLElement, context: {direction: "forward" | "backward"; path: string}) => {
            const updateGeneration = ++v2PageUpdateGeneration;
            headerTitle.set(getTitle(context.path));
            beginPageFormatTransition(getFormatParams({}, context.direction));

            const renderNextPage = () => {
                if (updateGeneration !== v2PageUpdateGeneration || window.location.pathname !== context.path) return;
                updatePageFormat(getFormatParams(getPageData(), context.direction));
            };
            if (typeof window.requestAnimationFrame === "function") {
                // Let the loading state paint once, then prepare the destination in the next task.
                // A second animation frame only added another frame of visible route latency.
                window.requestAnimationFrame(() => setTimeout(renderNextPage, 0));
            } else {
                setTimeout(renderNextPage, 16);
            }
        },
        widgetProps: {
            prop_widgetWidth: "100%",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: [],
            prop_componentBorderStyles: {
                border: "0",
                borderRadius: "0",
                boxShadow: "none",
                padding: "0",
                margin: "0",
                background: "transparent",
            },
        },
        headerTitle,
    };
}

/** Routes whose shared page shell stays mounted while its content/sidebar slots change. */
export const CtControllerPageMaps: TRouter = {
    "/v2": {
        redirectTo: "/v2/home",
    },
    "/v2/home": createV2PageRoute({
        title: "Home",
        source: "framework.ui.controller.requests.static.v1.myPage.home.homePage",
        controller: () => UiCategory.UI.Controllers.MyPage.Home.homePage({
            run: executeHomeExample,
            workflowNodeNames: Core.Dictionary.WorkflowNodeNames,
        }),
    }),
    "/v2/components": createV2PageRoute({
        title: "Components",
        source: "framework.ui.controller.requests.static.v1.myPage.components.componentsPage",
        controller: () => UiCategory.UI.Controllers.MyPage.Components.componentsPage(),
    }),
    "/v2/components/:componentName": createV2PageRoute({
        title: (path) => {
            const pathSegments = path.split("/").filter(Boolean);
            const segment = pathSegments[pathSegments.length - 1] ?? "Component";
            try {
                return decodeURIComponent(segment);
            } catch {
                return segment;
            }
        },
        source: "framework.ui.controller.requests.static.v1.myPage.componentInfo.componentInfoPage",
        controller: () => UiCategory.UI.Controllers.MyPage.ComponentInfo.componentInfoPage(),
    }),
    "/v2/icons": createV2PageRoute({
        title: "Icons",
        source: "framework.ui.controller.requests.static.v1.myPage.icons.iconsPage",
        controller: () => UiCategory.UI.Controllers.MyPage.Icons.iconsPage(),
    }),
    "/v2/controllers": createV2PageRoute({
        title: "Controllers",
        source: "framework.ui.controller.requests.static.v1.myPage.controllers.controllerPage",
        controller: () => UiCategory.UI.Controllers.MyPage.Controllers.controllerPage(),
    }),
    "/v2/workflow": createV2PageRoute({
        title: "Workflow",
        source: "framework.ui.controller.requests.static.v1.myPage.workflow.workflowPage",
        controller: () => UiCategory.UI.Controllers.MyPage.Workflow.workflowPage(),
    }),
    "/v2/performance": createV2PageRoute({
        title: "Performance",
        source: "framework.ui.controller.requests.static.v1.myPage.performance.performancePage",
        controller: () => UiCategory.UI.Controllers.MyPage.Performance.performancePage(),
    }),
};
