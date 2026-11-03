import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const MY_PAGE_WORKFLOW_PAGE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.workflow.workflowPage";

export type WorkflowPageControllerParams = Record<string, unknown> & {
    widget?: Record<string, unknown> | null;
};

/** Supplies the existing /workflow content to the shared v2 page shell. */
export const workflowPage = (params: WorkflowPageControllerParams = {}) => {
    const workflowContent = UiCategory.UI.Contents.Workflow();
    const content = CoreReactive.App.section({
        className: ["row", "p-0", "m-0", "w-100"],
        children: [
            CoreReactive.App.section({
                className: ["col-12", "p-2", "m-2"],
                children: [workflowContent.getElement()],
            }),
        ],
    });

    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Workflow page content is ready."],
        widget: params.widget ?? null,
        data: {
            content,
            sidebar: null,
            pageTitle: "Workflow",
            pageNav: [{name: "home", title: "Home"}],
        },
        reference: {
            source: MY_PAGE_WORKFLOW_PAGE_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};
