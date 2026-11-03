import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const PAGE_SETTINGS_SOURCE = "framework.ui.controller.requests.static.v1.pageSettings";

const PAGE_SETTINGS_WIDGET_SOURCE = [
    "const names = response?.workflowNodeNames ?? {};",
    "const workflowTree = UiCategory.UI.Tools.DataType.JsonTree({",
    '    prop_workflowChildName: String(names.workflowEvent ?? "workflowEvent"),',
    "    styles: {display: \"flex\", flexDirection: \"column\", width: \"100%\", height: \"calc(100vh - 64px)\", minWidth: \"0\", minHeight: \"0\", flex: \"1 1 auto\", boxSizing: \"border-box\"},",
    "    prop_structureStyles: {display: \"flex\", flexDirection: \"column\", width: \"100%\", height: \"100%\", minHeight: \"0\", flex: \"1 1 auto\", boxSizing: \"border-box\"},",
    "    prop_data: response?.workflowData ?? null,",
    "    prop_initialExpandDepth: 4,",
    "    prop_treeHorizontalScroll: true,",
    "    prop_treeFillHeight: true,",
    "    prop_componentBorderElementStyles: {display: \"flex\", flexDirection: \"column\", width: \"100%\", minWidth: \"0\", height: \"100%\", minHeight: \"0\", flex: \"1 1 auto\"},",
    "    prop_componentBorderStructureStyles: {display: \"flex\", flexDirection: \"column\", width: \"100%\", height: \"100%\", minHeight: \"0\", flex: \"1 1 auto\"},",
    "    prop_componentBorderStyles: {display: \"flex\", flexDirection: \"column\", height: \"100%\", minHeight: \"0\", flex: \"1 1 auto\"},",
    "});",
    "const dictionaryRows = Array.isArray(response?.workflowNodeEntries) ? response.workflowNodeEntries : [];",
    "const dictionaryTable = UiCategory.UI.Contents.Table({",
    '    prop_workflowChildName: String(names.dictionary ?? "dictionary"),',
    '    prop_header: [{id: "name", content: "name", width: 45}, {id: "title", content: "title", width: 55}],',
    '    prop_order: ["name", "title"],',
    "    prop_data: dictionaryRows,",
    "    prop_hasColNumber: false,",
    "    prop_hasColSelector: false,",
    "    prop_doColSelector: false,",
    "    prop_tableBordered: true,",
    "    prop_tableStriped: true,",
    "});",
    "return UiCategory.UI.Contents.Tabs({",
    '    prop_workflowChildName: String(names.tabs ?? "tabs"),',
    '    prop_tabsView: "full_width",',
    '    prop_tabSelected: "workflow-event",',
    '    prop_tabs: [{id: "workflow-event", title: "workflow-event", body: workflowTree}, {id: "dictionary", title: "dictionary", body: dictionaryTable}],',
    "});",
].join("\n");

export type PageSettingsParams = Record<string, unknown> & {
    workflowData?: unknown;
    workflowNodeEntries?: Array<{name: string; title: string}>;
    widget?: Record<string, unknown> | null;
    workflowNodeNames?: {
        tabs?: string;
        workflowEvent?: string;
        dictionary?: string;
    };
};

export const pageSettings = (params: PageSettingsParams = {}) => {
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Page settings are ready."],
        widget: params.widget ?? null,
        data: {
            workflowData: params.workflowData ?? null,
            workflowNodeEntries: Array.isArray(params.workflowNodeEntries) ? params.workflowNodeEntries : [],
            workflowNodeNames: params.workflowNodeNames ?? {},
        },
        source: PAGE_SETTINGS_WIDGET_SOURCE,
        reference: {
            source: PAGE_SETTINGS_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};
