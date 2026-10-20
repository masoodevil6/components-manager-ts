import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const HEADER_PUBLIC_SOURCE = "framework.ui.controller.requests.static.v1.headerPublic";

const HEADER_PUBLIC_WIDGET_SOURCE = [
    "return UiCategory.UI.Pages.Header.PageHeader({",
    '    prop_pageTitle: String(response?.pageTitle ?? "Public page"),',
    '    prop_hasIconBack: response?.hasIconBack !== false,',
    '    prop_pageNav: Array.isArray(response?.pageNav) ? response.pageNav : [],',
    '    prop_optionsList: Array.isArray(response?.optionsList) ? response.optionsList : [],',
    "});",
].join("\n");

export type HeaderPublicParams = Record<string, unknown> & {
    pageTitle?: string | null;
    hasIconBack?: boolean | string | null;
    pageNav?: Array<{name: string; title: string}> | string | null;
    optionsList?: Array<Record<string, unknown>> | string | null;
};

const parseList = <T>(value: T[] | string | null | undefined, fallback: T[]): T[] => {
    if (Array.isArray(value)) return value;
    if (typeof value !== "string" || !value.trim()) return fallback;
    try {
        const parsed: unknown = JSON.parse(value);
        return Array.isArray(parsed) ? parsed as T[] : fallback;
    } catch {
        return fallback;
    }
};

export const headerPublic = (params: HeaderPublicParams = {}) => {
    const pageTitle = params.pageTitle?.trim() || "Public page";
    const hasIconBack = params.hasIconBack == null
        ? true
        : params.hasIconBack === true || params.hasIconBack === "true";
    const pageNav = parseList(params.pageNav, [
        {name: "home", title: "Home"},
        {name: "public", title: pageTitle},
    ]);
    const optionsList = parseList(params.optionsList, [
        {id: "help", title: "Help", action: "help"},
    ]);

    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Public page header is ready."],
        data: {
            pageTitle,
            hasIconBack,
            pageNav,
            optionsList,
        },
        source: HEADER_PUBLIC_WIDGET_SOURCE,
        reference: {
            source: HEADER_PUBLIC_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};
