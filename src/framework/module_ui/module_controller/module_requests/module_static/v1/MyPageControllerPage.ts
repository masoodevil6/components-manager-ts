import {ClTestPage} from "../../../../module_pages/pages/test/ClTestPage";
import * as UiCategory from "@/ui_categories";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const MY_PAGE_CONTROLLER_PAGE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.controllers.controllerPage";

const CONTROLLER_PAGE_CONTENT_SOURCE = "return response?.content ?? null;";

/** Reuses the /test request interface as the content and sidebar of the v2 page shell. */
export const controllerPage = () => {
    const {content, categoryMenuItems, selectCategory} = new ClTestPage().createControllerSlots();
    const sidebar = UiCategory.UI.Controllers.MyPage.Tools.sideBarMenu({
        title: "Categories",
        items: categoryMenuItems,
        methods: {
            SELECT_ITEM: (_event: Event, dataArgs: {ITEM?: {id?: string}}) => {
                selectCategory(String(dataArgs?.ITEM?.id ?? ""));
            },
        },
    });

    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Controller test page content is ready."],
        data: {content, sidebar},
        source: CONTROLLER_PAGE_CONTENT_SOURCE,
        reference: {
            source: MY_PAGE_CONTROLLER_PAGE_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};
