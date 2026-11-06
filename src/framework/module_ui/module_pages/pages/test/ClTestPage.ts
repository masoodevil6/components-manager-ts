import {Navigate} from "@/core_route";
import type {ITemplate} from "@/core_route";
import * as Core from "@/core";
import * as CoreComponents from "@/core_components";
import * as CoreConfig from "@/core_configs";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import type {RequestState} from "@/ui_controller/module_requests";
import {RequestMethod} from "@/ui_controller/module_requests/types/RequestMethod";
import {InputTypes} from "../../../module_components/lists/componentInput/Props";
import {CustomFormFieldType, CustomFormMode} from "../../../module_components/lists/componentCustomForm/Props";
import type {CustomFormGroup} from "../../../module_components/lists/componentCustomForm/Props";
import {MenuMoreOrientation} from "../../../module_components/lists/componentMenuMore";
import {SelectTypeShow} from "../../../module_components/lists/componentSelectCustomSimple/Props";
import type {PropsType as ComponentWidgetProps} from "../../../module_components/lists/componentWidget/Props";
import {testConnect} from "../../../module_controller/module_requests/module_static/v1/TestConnect";
import {executeHomeExample} from "../home/ClHomePage";

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

function formatPageControllerPreview(response: RequestState, title: string): RequestState {
    return UiCategory.UI.Controllers.MyPage.Tools.pageFormat({
        ...response.data,
        pageTitle: title,
        sessionKey: `test-preview-${title.toLocaleLowerCase()}`,
        controllerSource: response.reference.source,
    });
}

type ControllerRequestCategory = {id: string; name: string; children?: ControllerRequestCategory[]};

const CONTROLLER_REQUEST_CATEGORIES: ControllerRequestCategory[] = [
    {id: "tests", name: "Tests"},
    {
        id: "my-page",
        name: "My Page",
        children: [
            {id: "tools", name: "Tools"},
            {id: "home", name: "Home"},
            {id: "components", name: "Components"},
            {id: "icons", name: "Icons"},
            {id: "controllers", name: "Controllers"},
            {id: "componentInfo", name: "Component Info"},
            {id: "workflow", name: "Workflow"},
            {id: "performance", name: "Performance"},
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
        id: "static.v1.myPage.performance.performancePage",
        categoryId: "performance",
        name: "performancePage",
        method: RequestMethod.INTERNAL,
        run: () => UiCategory.UI.Controllers.MyPage.Performance.performancePage(),
        fields: [],
    },
    {
        id: "static.v1.testConnect",
        categoryId: "tests",
        name: "Test Connect",
        method: RequestMethod.INTERNAL,
        run: testConnect,
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
        categoryId: "tools",
        name: "headerPublic",
        method: RequestMethod.INTERNAL,
        run: (params) => UiCategory.UI.Controllers.MyPage.Tools.headerPublic(params),
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
    {
        id: "static.v1.pageSettings",
        categoryId: "tools",
        name: "pageSettings",
        method: RequestMethod.INTERNAL,
        run: (params) => UiCategory.UI.Controllers.MyPage.Tools.pageSettings({
            widget: params.widget as Record<string, unknown> | undefined,
            workflowData: {
                component: {name: "componentPage", id: "component_page"},
                workflow: {
                    root: String(params.rootName ?? "component_page"),
                    steps: {
                        setting: {name: Core.Dictionary.WorkflowNodeNames.setting, unique: "page-setting"},
                        workflow: {name: "workflow", unique: "page-workflow"},
                    },
                    children: {},
                },
            },
            workflowNodeEntries: Object.values(Core.Dictionary.WorkflowNodeDictionary).map((entry) => ({
                name: entry.name,
                title: entry.title,
            })),
            workflowNodeNames: {
                tabs: Core.Dictionary.WorkflowNodeNames.tabs,
                workflowEvent: Core.Dictionary.WorkflowNodeNames.workflowEvent,
                dictionary: Core.Dictionary.WorkflowNodeNames.dictionary,
            },
        }),
        widget: {
            prop_widgetHeight: "480px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [{
            name: "rootName",
            label: "Workflow root",
            type: InputTypes.STRING,
            value: "component_page",
            placeholder: "Enter the workflow root name",
        }],
    },
    {
        id: "static.v1.myPage.tools.pageFormat",
        categoryId: "tools",
        name: "pageFormat",
        method: RequestMethod.INTERNAL,
        run: (params) => UiCategory.UI.Controllers.MyPage.Tools.pageFormat({
            pageTitle: String(params.pageTitle ?? "Page format preview"),
            hasIconBack: params.hasIconBack !== "false",
            content: String(params.content ?? "Page-specific content goes here."),
            widget: params.widget as Record<string, unknown> | undefined,
        }),
        widget: {
            prop_widgetHeight: "480px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [{
            name: "pageTitle",
            label: "Page title",
            type: InputTypes.STRING,
            value: "Page format preview",
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
            name: "content",
            label: "Page content slot",
            type: InputTypes.STRING,
            value: "Page-specific content goes here.",
            placeholder: "Enter page content",
        }],
    },
    {
        id: "static.v1.myPage.tools.sideBarMenu",
        categoryId: "tools",
        name: "sideBarMenu",
        method: RequestMethod.INTERNAL,
        run: () => UiCategory.UI.Controllers.MyPage.Tools.sideBarMenu(),
        widget: {
            prop_widgetHeight: "480px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.home.homePage",
        categoryId: "home",
        name: "homePage",
        method: RequestMethod.INTERNAL,
        run: () => formatPageControllerPreview(UiCategory.UI.Controllers.MyPage.Home.homePage({
            run: executeHomeExample,
            workflowNodeNames: Core.Dictionary.WorkflowNodeNames,
        }), "Home"),
        widget: {
            prop_widgetHeight: "680px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.home.reactiveElement",
        categoryId: "home",
        name: "ReactiveElement",
        method: RequestMethod.INTERNAL,
        run: () => UiCategory.UI.Controllers.MyPage.Home.reactiveElement({
            run: executeHomeExample,
        }),
        widget: {
            prop_widgetHeight: "480px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.home.observable",
        categoryId: "home",
        name: "Observable",
        method: RequestMethod.INTERNAL,
        run: () => UiCategory.UI.Controllers.MyPage.Home.observable({
            run: executeHomeExample,
        }),
        widget: {
            prop_widgetHeight: "480px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.home.workflowEvent",
        categoryId: "home",
        name: "workflowEvent",
        method: RequestMethod.INTERNAL,
        run: () => UiCategory.UI.Controllers.MyPage.Home.workflowEvent({
            run: executeHomeExample,
        }),
        widget: {
            prop_widgetHeight: "480px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.components.componentsPage",
        categoryId: "components",
        name: "componentsPage",
        method: RequestMethod.INTERNAL,
        run: () => formatPageControllerPreview(UiCategory.UI.Controllers.MyPage.Components.componentsPage(), "Components"),
        widget: {
            prop_widgetHeight: "680px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.icons.iconsPage",
        categoryId: "icons",
        name: "iconsPage",
        method: RequestMethod.INTERNAL,
        run: () => formatPageControllerPreview(UiCategory.UI.Controllers.MyPage.Icons.iconsPage(), "Icons"),
        widget: {
            prop_widgetHeight: "680px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.controllers.controllerPage",
        categoryId: "controllers",
        name: "controllerPage",
        method: RequestMethod.INTERNAL,
        run: () => UiCategory.UI.Controllers.MyPage.Controllers.controllerPage(),
        widget: {
            prop_widgetHeight: "680px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
    {
        id: "static.v1.myPage.componentInfo.componentInfoPage",
        categoryId: "componentInfo",
        name: "componentInfoPage",
        method: RequestMethod.INTERNAL,
        run: (params) => UiCategory.UI.Controllers.MyPage.ComponentInfo.componentInfoPage({
            componentName: String(params.componentName ?? "Input"),
        }),
        widget: {
            prop_widgetHeight: "680px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [{
            name: "componentName",
            label: "Component name",
            type: InputTypes.STRING,
            value: CoreComponents.ComponentManager.list()[0]?.definition.name ?? "Input",
            placeholder: "Enter a component name or id",
        }],
    },
    {
        id: "static.v1.myPage.workflow.workflowPage",
        categoryId: "workflow",
        name: "workflowPage",
        method: RequestMethod.INTERNAL,
        run: () => UiCategory.UI.Controllers.MyPage.Workflow.workflowPage(),
        widget: {
            prop_widgetHeight: "680px",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: ["shadow-sm", "position-relative"],
        },
        fields: [],
    },
];

export class ClTestPage implements ITemplate {
    render(): HTMLElement {
        const {content, sidebar} = this.createPageParts();
        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Request Test",
            prop_hasIconBack: true,
            prop_pageNav: [{name: "home", title: "Home"}],
        }, {
            BACK: () => { Navigate("/"); },
            SELECT_NAV_ITEM: (_event: Event, args: any) => {
                if (args?.NAME === "home") Navigate("/");
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

    createControllerSlots() {
        return this.createPageParts(false);
    }

    private createPageParts(includeTestSidebar = true) {
        const selectedTestType = new CoreObservable.App("All categories");
        const targetRequestId = new CoreObservable.App<string>("");
        const requestOptions = new CoreObservable.App<Array<{id: string; name: string; prefix: string}>>(
            CONTROLLER_REQUESTS.map(({id, name, method}) => ({id, name, prefix: method})),
        );
        const statusText = new CoreObservable.App("No request sent yet.");
        const responseData = new CoreObservable.App<any>({info: "The response body will appear here."});
        const responseWidgetElement = new CoreObservable.App<HTMLElement | null>(null);
        const requestFieldStyles = CoreObservable.App.computed(
            (size: UtilConst.Sizes) => ({display: "block", marginBottom: UtilStyle.Css_Margin(size)}),
            [CoreConfig.Settings.SizeName.observable()],
        );
        let responseWidget: any = null;
        let requestForm: any;

        const requestSelect = UiCategory.UI.Simples.SelectCustomSimple({
            classList: ["w-100"],
            prop_selectName: "controllerRequest",
            prop_selectOptions: requestOptions as any,
            prop_selectValue: targetRequestId as any,
            prop_selectDisable: CONTROLLER_REQUESTS.length === 0,
            prop_prefixItemsWidth: "72px",
            prop_selectTypeShow: SelectTypeShow.BOTH,
            prop_selectPlaceholder: "Choose a controller request",
        } as any, {
            SELECT_CHANGE: (_event: Event, _dataArgs: any, componentArgs: any) => {
                const selectedId = String(componentArgs?.VALUE ?? "");
                const selectedRequest = CONTROLLER_REQUESTS.find((request) => request.id === selectedId);
                if (selectedRequest) {
                    requestForm?.set("prop_customFormGroups", this.renderRequestGroups(selectedRequest, requestFieldStyles));
                    targetRequestId.set(selectedRequest.id);
                }
            },
        } as any);
        requestForm = UiCategory.UI.Fetch.CustomForm({
            prop_customFormMode: CustomFormMode.RUN,
            prop_customFormGroups: [],
            prop_customFormLayoutStyles: {width: "100%", minWidth: "0", margin: "0"},
            prop_customFormFormOptions: {
                prop_formClass: ["d-block", "w-100", "m-0"],
                prop_formStyles: {minWidth: "0"},
                prop_btnformStyles: {display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "var(--marginMedium)"},
                prop_btnSubmit: {prop_title: "Run internal request", prop_btnClass: [], prop_btnStyles: {width: "auto"}},
                prop_controller: (context: {formData: FormData | null}) => {
                    const selectedRequest = CONTROLLER_REQUESTS.find((request) => request.id === targetRequestId.get());
                    if (!selectedRequest) throw new Error("Choose a controller request first.");
                    const params = context.formData
                        ? Object.fromEntries(context.formData.entries())
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
            styles: {minHeight: "0", minWidth: "0", padding: "0.75rem"},
            children: [
                CoreReactive.App.h2({className: ["h4"], styles: {margin: "0 0 0.75rem"}, children: ["Response"]}),
                CoreReactive.App.p({styles: {margin: "0 0 0.75rem", overflowWrap: "anywhere"}, children: [statusText]}),
                CoreReactive.App.section({
                    className: ["w-100"],
                    styles: {height: "420px", minHeight: "0", overflow: "hidden"},
                    children: [responseTree.getElement()],
                }),
                CoreReactive.App.h2({className: ["h5"], styles: {margin: "1rem 0 0.75rem"}, children: ["ComponentWidget"]}),
                CoreReactive.App.section({
                    className: ["w-100"],
                    styles: {minHeight: "0"},
                    children: [responseWidgetElement],
                }),
            ],
        });
        const content = CoreReactive.App.section({
            className: ["row", "m-0"],
            styles: {width: "100%", minWidth: "0", padding: "0.75rem", rowGap: "0.75rem"},
            children: [
                CoreReactive.App.section({
                    className: ["col-12"],
                    styles: {padding: "0.75rem"},
                    children: [
                        CoreReactive.App.h1({className: ["h3"], styles: {margin: "0 0 0.75rem"}, children: ["Controller request test"]}),
                        CoreReactive.App.p({styles: {margin: "0"}, children: ["Run an internal controller request through ComponentCustomForm and inspect its response."]}),
                    ],
                }),
                CoreReactive.App.section({
                    className: ["col-12", "col-xl-7"],
                    styles: {minHeight: "0", minWidth: "0", padding: "0.75rem"},
                    children: [
                        CoreReactive.App.h2({className: ["h4"], styles: {margin: "0 0 0.75rem"}, children: ["Request"]}),
                        CoreReactive.App.section({
                            className: ["d-flex", "align-items-center"],
                            styles: {flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem"},
                            children: [
                                CoreReactive.App.b({children: ["Category:"]}),
                                CoreReactive.App.span({children: [selectedTestType]}),
                            ],
                        }),
                        CoreReactive.App.section({
                            styles: {display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem", minWidth: "0"},
                            children: [
                                CoreReactive.App.label({className: ["form-label"], children: ["Controller request"]}),
                                requestSelect.getElement(),
                                CoreObservable.App.conditionWhen(
                                    [targetRequestId],
                                    (requestId: string) => !!requestId,
                                    () => CoreReactive.App.p({className: ["small", "text-muted"], styles: {margin: "0", overflowWrap: "anywhere"}, children: ["Method: Internal · Handler: ", targetRequestId, ". Executed directly through the framework controller API."]}),
                                    () => CoreReactive.App.p({className: ["small", "text-muted"], styles: {margin: "0"}, children: ["Choose a request from ", selectedTestType, "."]}),
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

        const categoryMenuItems = [
            {id: "all-categories", title: "All categories", action: "selectCategory"},
            ...CONTROLLER_REQUEST_CATEGORIES.map(toControllerRequestMenuItem),
        ];
        const selectCategory = (selectedCategoryId: string): void => {
            const category = findControllerRequestCategory(selectedCategoryId);
            const isAllCategories = selectedCategoryId === "all-categories";
            if (!category && !isAllCategories) return;

            const categoryName = isAllCategories ? "All categories" : category!.name;
            const requests = isAllCategories
                ? CONTROLLER_REQUESTS
                : CONTROLLER_REQUESTS.filter((request) => request.categoryId === category!.id);
            selectedTestType.set(categoryName);
            targetRequestId.set("");
            requestForm?.set("prop_customFormGroups", []);
            requestOptions.set(requests.map(({id, name, method}) => ({id, name, prefix: method})));
            requestSelect.set("prop_selectDisable", requests.length === 0);
            statusText.set(requests.length > 0 ? `Choose a request in ${categoryName}.` : `No requests are available in ${categoryName}.`);
        };

        const testTypesMenu = includeTestSidebar ? UiCategory.UI.Menus.MenuMore({
            styles: {width: "100%"},
            prop_orientation: MenuMoreOrientation.VERTICAL,
            prop_directionRtl: !CoreConfig.Settings.DirectionRtl.get(),
            prop_menuBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
            prop_items: categoryMenuItems,
        }, {
            SELECT_ITEM: (_event: Event, dataArgs: any) => {
                selectCategory(String(dataArgs?.ITEM?.id ?? ""));
            },
        } as any) : null;

        const sidebar = includeTestSidebar ? CoreReactive.App.section({
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
                testTypesMenu!.getElement(),
            ],
        }) : null;

        return {content, sidebar, categoryMenuItems, selectCategory};
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

    private renderRequestGroups(request: ControllerRequestDefinition, fieldStyles: CoreObservable.App<any>): CustomFormGroup[] {
        return [{
            id: "controller-request-parameters",
            title: "Request parameters",
            columns: 1,
            fields: request.fields.map((field) => field.type === "select"
                ? {
                    id: field.name,
                    name: field.name,
                    label: field.label,
                    type: CustomFormFieldType.SELECT,
                    value: field.value ?? null,
                    placeholder: field.placeholder,
                    props: {styles: fieldStyles},
                    options: field.options.map((option) => ({label: option.name, value: option.id})),
                }
                : {
                    id: field.name,
                    name: field.name,
                    label: field.label,
                    type: CustomFormFieldType.INPUT,
                    value: field.value ?? null,
                    placeholder: field.placeholder,
                    props: {prop_type: field.type, styles: fieldStyles},
                }),
        }];
    }

    onLoad(_pageElement: HTMLElement): void {}
}
