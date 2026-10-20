import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const TEST_CONNECT_SOURCE = "framework.ui.controller.requests.static.v1.testConnect";
const TEST_CONNECT_WIDGET_SOURCE_ADDRESS = "/test-connect-widget-source.txt";
const TEST_CONNECT_WIDGET_SOURCE = [
    'return UiCategory.UI.Contents.CardViewInfo({',
    '    prop_title: String(response?.title ?? "Test Connect"),',
    '    prop_content: "Request title: " + String(request?.title ?? ""),',
    '});',
].join("\n");

export type TestConnectParams = Record<string, unknown> & {
    title?: string | null;
    sourceMode?: "source" | "sourceAddress";
    source?: string | null;
    sourceAddress?: string | null;
    widget?: Record<string, unknown>;
};

export const testConnect = (params: TestConnectParams = {}) => {
    const useSourceAddress = params.sourceMode === "sourceAddress";
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Server connection succeeded."],
        data: {title: params.title ?? ""},
        source: params.source ?? (useSourceAddress ? null : TEST_CONNECT_WIDGET_SOURCE),
        sourceAddress: params.sourceAddress ?? (useSourceAddress ? TEST_CONNECT_WIDGET_SOURCE_ADDRESS : null),
        ...(params.widget !== undefined ? {widget: params.widget} : {}),
        reference: {
            source: TEST_CONNECT_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};
