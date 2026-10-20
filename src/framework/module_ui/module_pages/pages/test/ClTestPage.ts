import {ITemplate} from "@/core_route";
import * as CoreConfig from "@/core_configs";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import type {RequestState} from "@/ui_controller/module_requests";
import {RequestMethod} from "@/ui_controller/module_requests/types/RequestMethod";
import {InputTypes} from "../../../module_components/lists/componentInput/Props";
import {MenuMoreOrientation} from "../../../module_components/lists/componentMenuMore";
import {SelectTypeShow} from "../../../module_components/lists/componentSelectCustomSimple/Props";
import type {PropsType as ComponentWidgetProps} from "../../../module_components/lists/componentWidget/Props";

type RequestFieldDefinition = {
    name: string;
    label: string;
    type: InputTypes;
    value?: string | null;
    placeholder?: string;
} | {
    name: string;
    label: string;
    type: "select";
    value?: string | null;
    placeholder?: string;
    options: Array<{id: string; name: string; prefix: string}>;
};

type ControllerRequestDefinition = {
    id: string;
    categoryId: string;
    name: string;
    method: RequestMethod;
    fields: RequestFieldDefinition[];
    run: (params: Record<string, unknown>) => RequestState;
    widget?: Partial<ComponentWidgetProps>;
};

type ControllerRequestCategory = {id: string; name: string; children?: ControllerRequestCategory[]};

const CONTROLLER_REQUEST_CATEGORIES: ControllerRequestCategory[] = [
    {
        id: "my-page",
        name: "My Page",
        children: [
            {id: "tests", name: "Tests"},
            {id: "header", name: "Header"},
        ],
    },
];

const findControllerRequestCategory = (id: string): ControllerRequestCategory | undefined => {
    const find = (categories: ControllerRequestCategory[]): ControllerRequestCategory | undefined => {
        for (const category of categories) {
            if (category.id === id) return category;
            const child = find(category.children ?? []);
            if (child) return child;
        }
        return undefined;
    }
    return find(CONTROLLER_REQUEST_CATEGORIES);
};

const toControllerRequestMenuItem = (category: ControllerRequestCategory) => ({
    id: category.id,
    title: category.name,
    ...(category.children?.length
        ? {children: category.children.map(toControllerRequestMenuItem)}
        : {action: "selectCategory"}),
});

const CONTROLLER_REQUESTS: ControllerRequestDefinition[] = [
    {
        id: "static.v1.testConnect",
        categoryId: "tests",
        name: "Test Connect",
        method: RequestMethod.INTERNAL,
        run: UiCategory.UI.Controllers.Tests.testConnect,
        widget: {
            prop_widgetHeight: "180px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [{
            name: "title",
            label: "Title",
            type: InputTypes.STRING,
            value: "Test Connect",
            placeholder: "Enter a title",
        }, {
            name: "sourceMode",
            label: "Response source",
            type: "select",
            value: "source",
            options: [
                {id: "source", name: "source", prefix: ""},
            {id: "sourceAddress", name: "sourceAddress", prefix: ""},
            ],
        }],
    },
    {
        id: "static.v1.headerPublic",
        categoryId: "header",
        name: "headerPublic",
        method: RequestMethod.INTERNAL,
        run: UiCategory.UI.Controllers.Header.headerPublic,
        widget: {
            prop_widgetHeight: "180px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [{
            name: "pageTitle",
            label: "Page title",
            type: InputTypes.STRING,
            value: "Public page",
            placeholder: "Enter a page title",
        }, {
            name: "hasIconBack",
            label: "Show back button",
            type: "select",
            value: "true",
            options: [
                {id: "true", name: "Show", prefix: ""},
                {id: "false", name: "Hide", prefix: ""},
            ],
        }, {
            name: "pageNav",
            label: "Address list (JSON)",
            type: InputTypes.STRING,
            value: '[{"name":"home","title":"Home"},{"name":"public","title":"Public page"}]',
            placeholder: '[{"name":"home","title":"Home"}]',
        }, {
            name: "optionsList",
            label: "MenuMore items (JSON)",
            type: InputTypes.STRING,
            value: '[{"id":"help","title":"Help","action":"help"}]',
            placeholder: '[{"id":"settings","title":"Settings","action":"settings"}]',
        }],
    },
];

export class ClTestPage implements ITemplate {
    render(): HTMLElement {
        const selectedTestType = new CoreObservable.App("All categories");
        const targetRequestId = new CoreObservable.App<string>("");
        const requestOptions = new CoreObservable.App<Array<{id: string; name: string; prefix: string}>>(
            CONTROLLER_REQUESTS.map(({id, name, method}) => ({id, name, prefix: method})),
        );
        const statusText = new CoreObservable.App("No request sent yet.");
        const responseData = new CoreObservable.App<any>({info: "The response body will appear here."});
        const responseWidgetElement = new CoreObservable.App<HTMLElement | null>(null);
        let responseWidget: any = null;
        let requestForm: any;

        const requestSelect = UiCategory.UI.Simples.SelectCustomSimple({
            classList: ["w-100"],
            prop_selectName: "controllerRequest",
            prop_selectOptions: requestOptions as any,
            prop_selectValue: targetRequestId as any,
            prop_selectDisable: CONTROLLER_REQUESTS.length === 0,
            prop_selectTypeShow: SelectTypeShow.BOTH,
            prop_selectPlaceholder: "Choose a controller request",
        } as any, {
            SELECT_CHANGE: (_event: Event, _dataArgs: any, componentArgs: any) => {
                const selectedId = String(componentArgs?.VALUE ?? "");
                const selectedRequest = CONTROLLER_REQUESTS.find((request) => request.id === selectedId);
                if (selectedRequest) {
                    requestForm?.set("prop_forms", this.renderRequestFields(selectedRequest));
                    targetRequestId.set(selectedRequest.id);
                }
            },
        } as any);
        requestForm = UiCategory.UI.Fetch.Form({
            prop_forms: [],
            prop_formClass: ["d-block", "w-100", "m-0"],
            prop_borderClass: ["d-block", "position-relative", "p-2", "m-0"],
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
            prop_btnSubmit: {prop_title: "Run internal request", prop_btnClass: []},
            prop_controller: (context: {formData: FormData | null}) => {
                const selectedRequest = CONTROLLER_REQUESTS.find((request) => request.id === targetRequestId.get());
                if (!selectedRequest) throw new Error("Choose a controller request first.");
                const params = context.formData
                    ? Object.fromEntries(Array.from(context.formData.entries(), ([name, value]) => [name.replace(/\[value\]$/, ""), value]))
                    : {};
                const requestParams = {
                    ...params,
                    ...(selectedRequest.widget ? {widget: selectedRequest.widget} : {}),
                };
                statusText.set(`Running ${selectedRequest.method} ${selectedRequest.id} ...`);
                const request = Promise.resolve().then(() => selectedRequest.run(requestParams));
                responseWidget?.dispose?.();
                responseWidget = UiCategory.UI.Fetch.Widget({
                    prop_widgetWidth: "100%",
                    prop_widgetHeight: "180px",
                    prop_widgetStyles: {minHeight: "0"},
                    prop_componentBorderClass: ["shadow-sm", "position-relative"],
                    ...(requestParams.widget as Partial<ComponentWidgetProps> | undefined),
                    prop_controller: request,
                    prop_requestData: requestParams,
                } as any);
                responseWidgetElement.set(responseWidget.getElement() as HTMLElement);
                return request;
            },
        } as any, {
            RESPONSE: (_event: Event, payload: {RESPONSE: RequestState}) => {
                this.showResponse(payload.RESPONSE, statusText, responseData);
            },
        } as any);

        const responseTree = UiCategory.UI.Tools.DataType.JsonTree({
            classList: ["w-100"],
            styles: {display: "block", width: "100%", height: "100%", minHeight: "0"},
            prop_structureStyles: {display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: "0"},
            prop_data: responseData as any,
            prop_initialExpandDepth: 2,
            prop_showSearch: false,
            prop_showExpandControls: true,
            prop_showCopyButton: true,
            prop_componentBorderElementStyles: {display: "block", width: "100%", height: "100%", minHeight: "0"},
            prop_componentBorderStructureStyles: {display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: "0"},
            prop_componentBorderStyles: {display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: "0", overflow: "hidden"},
        } as any);
        const responsePanel = CoreReactive.App.section({
            className: ["col-12", "col-xl-5"],
            styles: {minHeight: "0"},
            children: [
                CoreReactive.App.h2({className: ["h4"], children: ["Response"]}),
                CoreReactive.App.p({className: ["mb-2"], children: [statusText]}),
                CoreReactive.App.section({
                    className: ["w-100"],
                    styles: {height: "420px", minHeight: "0", overflow: "hidden"},
                    children: [responseTree.getElement()],
                }),
                CoreReactive.App.h2({className: ["h5", "mt-3"], children: ["ComponentWidget"]}),
                CoreReactive.App.section({
                    className: ["w-100"],
                    styles: {minHeight: "0"},
                    children: [responseWidgetElement],
                }),
            ],
        });
        const content = CoreReactive.App.section({
            className: ["row", "p-2", "m-0"],
            styles: {width: "100%", minWidth: "0"},
            children: [
                CoreReactive.App.section({
                    className: ["col-12", "mb-3"],
                    children: [
                        CoreReactive.App.h1({className: ["h3"], children: ["Controller request test"]}),
                        CoreReactive.App.p({children: ["Run an internal controller request through ComponentForm and inspect its response."]}),
                    ],
                }),
                CoreReactive.App.section({
                    className: ["col-12", "col-xl-7"],
                    styles: {minHeight: "0"},
                    children: [
                        CoreReactive.App.h2({className: ["h4"], children: ["Request"]}),
                        CoreReactive.App.section({
                            className: ["d-flex", "align-items-center", "gap-2", "mb-3"],
                            children: [
                                CoreReactive.App.b({children: ["Category:"]}),
                                CoreReactive.App.span({children: [selectedTestType]}),
                            ],
                        }),
                        CoreReactive.App.section({
                            className: ["mb-3"],
                            children: [
                                CoreReactive.App.label({className: ["form-label"], children: ["Controller request"]}),
                                requestSelect.getElement(),
                                CoreObservable.App.conditionWhen(
                                    [targetRequestId],
                                    (requestId: string) => !!requestId,
                                    () => CoreReactive.App.p({className: ["small", "text-muted", "mt-1"], children: ["Method: Internal · Handler: ", targetRequestId, ". Executed directly through the framework controller API."]}),
                                    () => CoreReactive.App.p({className: ["small", "text-muted", "mt-1"], children: ["Choose a request from ", selectedTestType, "."]}),
                                ),
                            ],
                        }),
                        CoreObservable.App.conditionWhen(
                            [targetRequestId],
                            (requestId: string) => !!requestId,
                            () => requestForm.getReactiveElement(),
                            () => null,
                        ),
                    ],
                }),
                responsePanel,
            ],
        });

        const testTypesMenu = UiCategory.UI.Menus.MenuMore({
            styles: {width: "100%"},
            prop_orientation: MenuMoreOrientation.VERTICAL,
            prop_directionRtl: !CoreConfig.Settings.DirectionRtl.get(),
            prop_menuBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
            prop_items: [
                {id: "all-categories", title: "All categories", action: "selectCategory"},
                ...CONTROLLER_REQUEST_CATEGORIES.map(toControllerRequestMenuItem),
            ],
        }, {
            SELECT_ITEM: (_event: Event, dataArgs: any) => {
                const selectedCategoryId = String(dataArgs?.ITEM?.id ?? "");
                const category = findControllerRequestCategory(selectedCategoryId);
                const isAllCategories = selectedCategoryId === "all-categories";
                if (!category && !isAllCategories) return;

                const categoryName = isAllCategories ? "All categories" : category!.name;
                const requests = isAllCategories
                    ? CONTROLLER_REQUESTS
                    : CONTROLLER_REQUESTS.filter((request) => request.categoryId === category!.id);
                selectedTestType.set(categoryName);
                targetRequestId.set("");
                requestForm?.set("prop_forms", []);
                requestOptions.set(requests.map(({id, name, method}) => ({id, name, prefix: method})));
                requestSelect.set("prop_selectDisable", requests.length === 0);
                statusText.set(requests.length > 0 ? `Choose a request in ${categoryName}.` : `No requests are available in ${categoryName}.`);
            },
        } as any);

        const sidebar = CoreReactive.App.section({
            styles: {
                display: "flex",
                flexDirection: "column",
                gap: "var(--marginMedium)",
                padding: "var(--paddingMedium)",
                color: "var(--shanColor1)",
            },
            children: [
                CoreReactive.App.h3({
                    styles: {margin: "0", color: "var(--shanColor1)"},
                    children: ["Categories"],
                }),
                testTypesMenu.getElement(),
            ],
        });

        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Request Test",
            prop_hasIconBack: true,
            prop_pageNav: [{name: "home", title: "Home"}],
        }, {
            BACK: () => { window.location.href = "/"; },
            SELECT_NAV_ITEM: (_event: Event, args: any) => {
                if (args?.NAME === "home") window.location.href = "/";
            },
        } as any).getElement();

        return UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_content: content.getElement(),
            prop_aside: sidebar,
            prop_asideWidth: UtilStyle.Css_SizeUnit(240, UtilConst.Units.PEXEL),
            prop_isFullHeight: true,
        } as any).getElement() as HTMLElement;
    }

    private showResponse(response: unknown, statusText: CoreObservable.App<string>, responseData: CoreObservable.App<any>): void {
        if (!response || typeof response !== "object") {
            statusText.set("Request completed, but the response body was empty.");
            responseData.set({response: response ?? null});
            return;
        }
        const payload = response as {state?: number; status?: boolean; messages?: unknown[]};
        statusText.set(`${payload.state ?? "Response"} ${payload.status ? "Success" : "Error"}`);
        responseData.set(response);
    }

    private renderRequestFields(request: ControllerRequestDefinition): any[] {
        return request.fields.map((field) => {
            if (field.type === "select") {
                const select = UiCategory.UI.Simples.SelectCustomSimple({
                    classList: ["w-100"],
                    prop_selectName: field.name,
                    prop_selectValue: field.value ?? null,
                    prop_selectOptions: field.options,
                    prop_selectTypeShow: SelectTypeShow.JUST_NAME,
                    prop_selectPlaceholder: field.placeholder ?? null,
                } as any);
                return CoreReactive.App.section({
                    className: ["col-12", "mb-3"],
                    children: [
                        CoreReactive.App.label({className: ["form-label"], children: [field.label]}),
                        select.getReactiveElement(),
                    ],
                });
            }
            return UiCategory.UI.Inputs.Input({
                prop_name: field.name,
                prop_labelTitle: field.label,
                prop_type: field.type,
                prop_value: field.value ?? null,
                prop_placeholder: field.placeholder ?? null,
            } as any).getReactiveElement();
        });
    }

    onLoad(_pageElement: HTMLElement): void {}
}
