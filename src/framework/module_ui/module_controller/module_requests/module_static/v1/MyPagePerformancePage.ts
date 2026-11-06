import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import {RequestManager} from "../../class/RequestManager";
import {ColorGrad, ColorMain, HttpStatusCode} from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {RequestMethod} from "../../types/RequestMethod";
import type {MetricBand} from "../../../../module_components/lists/componentChartMetricGauge/Model";
import type {MenuMoreItem} from "../../../../module_components/lists/componentMenuMore/Props";
import {createComponentsCatalog} from "./MyPageComponentsPage";
import {runComponentScenario, type ComponentScenarioInstance} from "../../../../../module_performance/core/ComponentScenario";
import {jsonTreePerformanceScenarios} from "../../../../module_components/lists/componentJsonTree/performance";
import {internalProjects} from "./InternalProjects";

export const MY_PAGE_PERFORMANCE_PAGE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.performance.performancePage";

export type PerformancePageControllerParams = Record<string, unknown> & {
    widget?: Record<string, unknown> | null;
    metricProfiles?: Partial<Record<"ready" | "load" | "transfer" | "requests", {min: number; max: number; bands: MetricBand[]}>>;
    componentBudgets?: Record<string, Partial<Record<number, Partial<Record<"createP95" | "operationP95" | "disposeMedian", {good: number; moderate: number; max: number}>>>>>;
};

// Illustrative budgets for this page; consumers can replace them with project-specific profiles.
const exampleProfile = (good: number, moderate: number, max: number) => ({
    min: 0, max, bands: [
        {id: "good", label: "Good", from: 0, to: good, color: "var(--bs-success, #198754)"},
        {id: "moderate", label: "Moderate", from: good, to: moderate, color: "var(--bs-warning, #ffc107)"},
        {id: "poor", label: "Needs attention", from: moderate, to: max, color: "var(--bs-danger, #dc3545)"},
    ],
});
const exampleProfiles = {
    ready: exampleProfile(500, 1500, 3000),
    load: exampleProfile(1000, 2500, 5000),
    transfer: exampleProfile(512, 2048, 5120),
    requests: exampleProfile(30, 80, 160),
};

// Provisional project targets, not externally validated standards. Values are in milliseconds.
const exampleComponentBudgets: NonNullable<PerformancePageControllerParams["componentBudgets"]> = {
    "json-tree-initial": {
        100: {createP95: {good: 50, moderate: 100, max: 200}, disposeMedian: {good: 10, moderate: 25, max: 50}},
        500: {createP95: {good: 150, moderate: 300, max: 600}, disposeMedian: {good: 25, moderate: 50, max: 100}},
        1000: {createP95: {good: 300, moderate: 600, max: 1200}, disposeMedian: {good: 50, moderate: 100, max: 200}},
    },
    "json-tree-search": {
        100: {createP95: {good: 50, moderate: 100, max: 200}, operationP95: {good: 30, moderate: 60, max: 120}, disposeMedian: {good: 10, moderate: 25, max: 50}},
        500: {createP95: {good: 150, moderate: 300, max: 600}, operationP95: {good: 80, moderate: 160, max: 320}, disposeMedian: {good: 25, moderate: 50, max: 100}},
        1000: {createP95: {good: 300, moderate: 600, max: 1200}, operationP95: {good: 150, moderate: 300, max: 600}, disposeMedian: {good: 50, moderate: 100, max: 200}},
    },
};

export const performancePage = (params: PerformancePageControllerParams = {}) => {
    let restoringSelection = false;
    let activeCategory = "";
    const persistSelection = (type: "page" | "component" | "project", selected: string, category = "") => {
        if (restoringSelection || typeof window === "undefined") return;
        const url = new URL(window.location.href);
        url.searchParams.set("type", type);
        if (selected) url.searchParams.set("selected", selected); else url.searchParams.delete("selected");
        if (type === "component" && category) url.searchParams.set("category", category); else url.searchParams.delete("category");
        if (type === "project" && category) url.searchParams.set("scenario", category); else url.searchParams.delete("scenario");
        window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    };
    const values = {
        ready: new CoreObservable.App<number | null>(null),
        load: new CoreObservable.App<number | null>(null),
        transfer: new CoreObservable.App<number | null>(null),
        requests: new CoreObservable.App<number | null>(null),
    };
    const transferComparable = new CoreObservable.App(false);
    const metricScope = new CoreObservable.Scope();
    const gauges: Array<ReturnType<typeof UiCategory.UI.Charts.Monitor.Gauge>> = [];
    const label = (text: string) => CoreReactive.App.div({
        className: ["small", "text-muted"],
        children: [text],
    });
    const metric = (key: keyof typeof values, title: string, description: string) => {
        const profile = params.metricProfiles?.[key] ?? exampleProfiles[key];
        const allowAssessment = key === "transfer" ? transferComparable : new CoreObservable.App(true);
        const min = profile.min;
        const max = profile.max;
        const bands = CoreObservable.App.computed((allowed: boolean) => allowed && profile ? profile.bands : [], [allowAssessment], metricScope);
        const formatted = CoreObservable.App.computed((value: number | null) => value === null ? null : key === "transfer" ? `${value.toFixed(1)} KiB` : key === "requests" ? String(value) : `${value.toFixed(0)} ms`, [values[key]], metricScope);
        const gauge = UiCategory.UI.Charts.Monitor.Gauge({prop_title: title, prop_value: values[key], prop_valueText: formatted, prop_unit: key === "transfer" ? "KiB" : key === "requests" ? "" : "ms", prop_min: min, prop_max: max, prop_bands: bands});
        gauges.push(gauge);
        return CoreReactive.App.section({
        className: ["p-3"],
        styles: {flex: "1 1 160px", minWidth: "0", border: "1px solid var(--bs-border-color, #dee2e6)", borderRadius: "8px"},
        children: [
            gauge.getElement(),
            label(description),
        ],
        });
    };
    const preview = UiCategory.UI.Fetch.Iframe({
        prop_url: "/v2/home",
        prop_width: "100%",
        prop_heightAuto: false,
        prop_widgetWidth: "100%",
        prop_widgetHeight: "66.6667vh",
        prop_iframeClass: ["d-block"],
        prop_iframeStyles: {width: "100%"},
        prop_componentBorderColor: UtilStyle.Css_Color(ColorMain.PRIMARY, ColorGrad.GRADE_1),
        prop_componentBorderStyles: {overflow: "hidden"},
    });
    const frame = (preview.getElement() as HTMLElement).querySelector("iframe")!;
    const progressVisible = new CoreObservable.App(false);
    const progressStatus = new CoreObservable.App<"running" | "success" | "error">("running");
    const progressMessage = new CoreObservable.App("");
    const progress = UiCategory.UI.Charts.Progress.ProgressLinear({
        prop_show: progressVisible,
        prop_title: "Measurement",
        prop_value: null,
        prop_status: progressStatus,
        prop_statusText: progressMessage,
    });
    const status = CoreReactive.App.span({className: ["badge", "text-bg-secondary"], children: ["No measurement yet"]});
    const detail = label("Run a measurement to see the resource breakdown.");
    const resourceBreakdown = CoreReactive.App.div({className: ["mt-3"]});
    const resourceBreakdownElement = resourceBreakdown.getElement() as HTMLElement;
    let resourceProgress: Array<ReturnType<typeof UiCategory.UI.Charts.Progress.ProgressLinear>> = [];
    const feedback = CoreReactive.App.p({className: ["small", "text-muted", "mt-2", "mb-0"], children: ["Reloads the selected page for measurement."]});
    const projectScenarios = internalProjects.flatMap((project) => project.scenarios.map((scenario) => ({project, scenario, path: `${project.previewBase}${scenario.path}`})));
    const mainPages = [
        ["/v2/home", "Home"], ["/v2/components", "Components"], ["/v2/icons", "Icons"],
        ["/v2/controllers", "Controllers"], ["/v2/workflow", "Workflow"], ["/v2/performance", "Performance"],
    ];
    const pageSearch = CoreReactive.App.create("input", {
        className: ["form-control", "mt-1"],
        attrs: {type: "search", placeholder: "Search pages", "aria-label": "Search pages"},
    });
    const pageSelect = CoreReactive.App.create("select", {
        className: ["form-select", "mt-1", "mb-3"],
        attrs: {"aria-label": "Page to measure"},
        children: mainPages.map(([value, title]) => CoreReactive.App.create("option", {attrs: {value}, children: [title]})),
    });
    const selectElement = pageSelect.getElement() as HTMLSelectElement;
    const searchElement = pageSearch.getElement() as HTMLInputElement;
    const setPageScope = (path: string) => {
        const selectedProject = projectScenarios.find((item) => item.path === path)?.project;
        const options = selectedProject
            ? projectScenarios.filter(({project}) => project.id === selectedProject.id).map(({scenario, path}) => [path, scenario.title])
            : mainPages;
        searchElement.value = "";
        selectElement.replaceChildren(...options.map(([value, title]) => new Option(title, value)));
    };
    searchElement.addEventListener("input", () => {
        const query = searchElement.value.trim().toLocaleLowerCase();
        for (const option of selectElement.options) option.hidden = !option.text.toLocaleLowerCase().includes(query);
    });
    const statusElement = status.getElement() as HTMLElement;
    const detailElement = detail.getElement() as HTMLElement;
    const feedbackElement = feedback.getElement() as HTMLElement;
    const resetResults = () => {
        Object.values(values).forEach((value) => value.set(null));
        transferComparable.set(false);
        statusElement.textContent = "No measurement yet";
        detailElement.textContent = "Run a measurement to see the resource breakdown.";
        resourceProgress.forEach((item) => item.dispose());
        resourceProgress = [];
        resourceBreakdownElement.replaceChildren();
        progressVisible.set(false);
    };
    selectElement.addEventListener("change", () => {
        resetResults();
        frame.src = selectElement.value;
        const project = projectScenarios.find((item) => item.path === selectElement.value);
        feedbackElement.textContent = project ? `Start the ${project.project.title} development server before measuring this scenario.` : "Reloads the selected page for measurement.";
        if (project) persistSelection("project", project.project.id, project.scenario.id);
        else persistSelection("page", selectElement.value.replace(/^\/v2\//, ""));
    });
    const run = CoreReactive.App.create("button", {
        attrs: {type: "button"},
        className: ["btn", "btn-primary", "w-100"],
        children: ["Run measurement"],
    });
    const runElement = run.getElement() as HTMLButtonElement;
    let activeCleanup: (() => void) | null = null;
    let detachObserver: MutationObserver | null = null;
    let measurementSequence = 0;
    runElement.addEventListener("click", () => {
        if (!detachObserver && content.getElement().isConnected && typeof MutationObserver !== "undefined") {
            detachObserver = new MutationObserver(() => {
                if (content.getElement().isConnected) return;
                activeCleanup?.();
                resourceProgress.forEach((item) => item.dispose());
                resourceProgress = [];
                gauges.forEach((gauge) => gauge.dispose());
                metricScope.dispose();
                progress.dispose();
                preview.dispose();
                detachObserver?.disconnect();
                detachObserver = null;
            });
            detachObserver.observe(document.documentElement, {childList: true, subtree: true});
        }
        resetResults();
        runElement.disabled = true;
        selectElement.disabled = true;
        statusElement.textContent = "Loading…";
        progressStatus.set("running");
        progressMessage.set("Loading the selected page…");
        progressVisible.set(true);
        feedbackElement.textContent = "Loading the selected page…";
        let finished = false;
        let timeout: ReturnType<typeof setTimeout>;
        let readTimer: ReturnType<typeof setTimeout> | undefined;
        const finish = (message?: string) => {
            if (finished) return;
            finished = true;
            clearTimeout(timeout);
            if (readTimer !== undefined) clearTimeout(readTimer);
            frame.removeEventListener("load", onLoad);
            activeCleanup = null;
            runElement.disabled = false;
            selectElement.disabled = false;
            if (message) {
                statusElement.textContent = "Unavailable";
                feedbackElement.textContent = message;
                progressStatus.set("error");
                progressMessage.set(message);
            }
        };
        activeCleanup = () => finish();
        const onLoad = () => {
            progressMessage.set("Collecting timing data…");
            // loadEventEnd is populated after the load handler returns.
            readTimer = setTimeout(() => {
                if (finished) return;
                try {
                    const frameWindow = frame.contentWindow;
                    if (!frameWindow || frameWindow.location.origin !== window.location.origin) throw new Error("The page is not accessible.");
                    if (frameWindow.location.pathname !== new URL(selectElement.value, window.location.href).pathname) return;
                    const selectedProject = projectScenarios.find((item) => item.path === selectElement.value);
                    if (selectedProject && frameWindow.document.querySelector('meta[name="internal-project"]')?.getAttribute("content") !== `${selectedProject.project.id}:${selectedProject.scenario.id}`) throw new Error("Internal project is unavailable.");
                    if (selectedProject && frameWindow.document.querySelector('meta[name="internal-project-ready"]')?.getAttribute("content") !== "ready") throw new Error("Internal project failed to initialize.");
                    const timing = frameWindow.performance;
                    const navigation = timing.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
                    const resources = timing.getEntriesByType("resource") as PerformanceResourceTiming[];
                    if (!navigation) throw new Error("Navigation timing is not available for this page.");
                    const duration = (value: number) => Number.isFinite(value) && value > 0 ? value : null;
                    values.ready.set(duration(navigation.domContentLoadedEventEnd));
                    values.load.set(duration(navigation.loadEventEnd));
                    const transfer = [navigation, ...resources].reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
                    const transferEntries = [navigation, ...resources];
                    const reportedCount = transferEntries.filter((entry) => Number.isFinite(entry.transferSize) && entry.transferSize > 0).length;
                    values.transfer.set(reportedCount ? transfer / 1024 : null);
                    transferComparable.set(reportedCount === transferEntries.length);
                    values.requests.set(resources.length);
                    const counts = resources.reduce<Record<string, number>>((groups, entry) => {
                        const type = entry.initiatorType || "other";
                        groups[type] = (groups[type] || 0) + 1;
                        return groups;
                    }, {});
                    const groups = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
                    detailElement.textContent = groups.length
                        ? `Share of ${resources.length} recorded resources, grouped by initiator type.`
                        : "No resource entries recorded.";
                    resourceProgress = groups.map(([type, count]) => UiCategory.UI.Charts.Progress.ProgressLinear({
                        prop_title: type,
                        prop_statusText: `${count} of ${resources.length} resources`,
                        prop_value: count,
                        prop_min: 0,
                        prop_max: resources.length,
                    }));
                    resourceBreakdownElement.replaceChildren(...resourceProgress.map((item) => {
                        const wrapper = document.createElement("div");
                        wrapper.className = "mb-3";
                        wrapper.appendChild(item.getElement());
                        return wrapper;
                    }));
                    statusElement.textContent = "Measurement complete";
                    progressStatus.set("success");
                    progressMessage.set("Measurement complete.");
                    feedbackElement.textContent = `Transfer sizes reported for ${reportedCount} of ${transferEntries.length} entries; cached or cross-origin resources may report zero. SPA route changes are not measured.`;
                    finish();
                } catch {
                    finish(projectScenarios.some((item) => item.path === selectElement.value) ? "Could not load the internal project. Start its development server and try again." : "Could not read this page's timing data. Select a page from this project and try again.");
                }
            }, 0);
        };
        frame.addEventListener("load", onLoad);
        timeout = setTimeout(() => finish("Page loading timed out. Please try again."), 30000);
        const measurementUrl = new URL(selectElement.value, window.location.href);
        measurementUrl.searchParams.set("__performance_run", `${Date.now()}-${++measurementSequence}`);
        frame.src = `${measurementUrl.pathname}${measurementUrl.search}${measurementUrl.hash}`;
    });
    const catalog = createComponentsCatalog();
    const componentSelect = CoreReactive.App.create("select", {className: ["form-select", "mt-1", "mb-3"], attrs: {"aria-label": "Component to test"}});
    const componentSelectElement = componentSelect.getElement() as HTMLSelectElement;
    const selectedCategory = label("");
    const scenarioSelect = CoreReactive.App.create("select", {className: ["form-select", "mt-1", "mb-3"], attrs: {"aria-label": "Performance scenario"}});
    const datasetSelect = CoreReactive.App.create("select", {className: ["form-select", "mt-1", "mb-3"], attrs: {"aria-label": "Dataset size"}, children: [["100", "Small (100 items)"], ["500", "Medium (500 items)"], ["1000", "Large (1,000 items)"]].map(([value, title]) => CoreReactive.App.create("option", {attrs: {value}, children: [title]}))});
    const iterationSelect = CoreReactive.App.create("select", {className: ["form-select", "mt-1", "mb-3"], attrs: {"aria-label": "Iterations"}, children: ["5", "10", "20"].map((value) => CoreReactive.App.create("option", {attrs: {value}, children: [value]}))});
    const componentRun = CoreReactive.App.create("button", {attrs: {type: "button", disabled: "disabled"}, className: ["btn", "btn-primary", "w-100"], children: ["Run component test"]});
    const componentRunElement = componentRun.getElement() as HTMLButtonElement;
    const scenarioSelectElement = scenarioSelect.getElement() as HTMLSelectElement;
    const componentMessage = label("Choose JSON Tree to see available test scenarios.");
    const componentProgressValue = new CoreObservable.App<number | null>(0);
    const componentProgressShow = new CoreObservable.App(false);
    const componentProgress = UiCategory.UI.Charts.Progress.ProgressLinear({prop_show: componentProgressShow, prop_title: "Component measurement", prop_value: componentProgressValue, prop_min: 0, prop_max: 100});
    const componentPanel = CoreReactive.App.section({styles: {display: "none"}, children: [
        CoreReactive.App.p({className: ["small", "text-muted", "mb-4"], children: ["Choose a component in the selected category."]}),
        label("CATEGORY"), selectedCategory,
        label("COMPONENT"), componentSelect,
        label("SCENARIO"), scenarioSelect, label("DATASET"), datasetSelect, label("ITERATIONS"), iterationSelect,
        componentRun, componentMessage,
    ]});
    const pagePanel = CoreReactive.App.section({children: [
        CoreReactive.App.p({className: ["small", "text-muted", "mb-4"], children: ["Measure a page loaded inside the preview."]}),
        label("PAGE"), pageSearch, pageSelect, label("TEST TYPE"),
        CoreReactive.App.div({className: ["fw-semibold", "mt-1", "mb-3"], children: ["Page load"]}), run, feedback,
        CoreReactive.App.p({className: ["small", "text-muted", "mt-2"], children: ["Each measurement requests a fresh page. Internal project responses through the development proxy use no-store. Browser, service worker and other resource caches may still affect results; use DevTools Disable cache for a cold-cache measurement."]}),
    ]});
    const panel = UiCategory.UI.Contents.Border({
        prop_width: "100%",
        prop_structureStyles: {height: "66.6667vh"},
        prop_borderStyles: {height: "66.6667vh", boxSizing: "border-box", overflowY: "auto"},
        prop_content: CoreReactive.App.section({
            className: ["p-3"],
            children: [
                label("PERFORMANCE MONITOR"),
                CoreReactive.App.h2({className: ["fs-5", "fw-semibold", "mt-2", "mb-1"], children: ["Test setup"]}),
                pagePanel, componentPanel,
            ],
        }),
    });
    const bottomPanel = UiCategory.UI.Contents.Border({
        prop_width: "100%",
        prop_borderStyles: {minHeight: "20vh", boxSizing: "border-box"},
        prop_content: CoreReactive.App.section({
            className: ["p-3"],
            children: [
                CoreReactive.App.div({
                    className: ["d-flex", "flex-wrap", "justify-content-between", "align-items-start", "gap-2", "mb-3"],
                    children: [
                        CoreReactive.App.div({children: [
                            label("MEASUREMENT RESULTS"),
                            CoreReactive.App.h2({className: ["fs-5", "fw-semibold", "mt-1", "mb-1"], children: ["Page overview"]}),
                            label("Latest page-load measurement."),
                            label("Colored ranges are example budgets and can be configured for your project."),
                        ]}),
                        status,
                    ],
                }),
                CoreReactive.App.div({
                    styles: {display: "flex", flexWrap: "wrap", gap: "var(--marginMedium)"},
                    children: [
                        metric("ready", "DOM READY", "DOMContentLoaded event completed"),
                        metric("load", "PAGE LOAD", "Time until page load completes"),
                        metric("transfer", "TRANSFERRED", "Reported document and resource transfer"),
                        metric("requests", "RESOURCES", "Recorded page resource entries"),
                    ],
                }),
                CoreReactive.App.div({className: ["mt-3"], children: [progress.getElement()]}),
                CoreReactive.App.div({
                    className: ["mt-4", "pt-3"],
                    styles: {borderTop: "1px solid var(--bs-border-color, #dee2e6)"},
                    children: [
                        CoreReactive.App.div({className: ["fw-semibold", "mb-1"], children: ["Resource breakdown"]}),
                        detail,
                        resourceBreakdown,
                    ],
                }),
            ],
        }),
    });
    const componentTitle = CoreReactive.App.h2({className: ["fs-5", "fw-semibold", "mt-2"], children: ["Select a component"]});
    const componentResultText = CoreReactive.App.div({attrs: {"data-component-test-result": "", "aria-live": "polite"}, className: ["small", "mt-3"]});
    const componentGaugeInfo = CoreReactive.App.div({className: ["small", "text-muted", "mt-3"], styles: {display: "none"}, children: [params.componentBudgets ? "Configured project targets. Smaller times are better; compare the same dataset and environment. P95 from a small sample is approximate." : "These are provisional project targets, not industry standards. Smaller times are better; compare the same dataset and environment. P95 from a small sample is approximate."]});
    const componentGaugeHost = CoreReactive.App.div({attrs: {"data-component-result-gauges": ""}, styles: {display: "flex", flexWrap: "wrap", gap: "var(--marginMedium)"}, className: ["mt-3"]});
    let resultGauges: Array<ReturnType<typeof UiCategory.UI.Charts.Monitor.Gauge>> = [];
    const clearResultGauges = () => {
        resultGauges.forEach((gauge) => gauge.dispose());
        resultGauges = [];
        (componentGaugeHost.getElement() as HTMLElement).replaceChildren();
        (componentGaugeInfo.getElement() as HTMLElement).style.display = "none";
    };
    const componentResultRows = new CoreObservable.App<Array<{metric: string; value: string}>>([]);
    const componentResultTable = UiCategory.UI.Contents.Table({
        prop_header: [{id: "metric", content: "Metric"}, {id: "value", content: "Result"}],
        prop_order: ["metric", "value"], prop_data: componentResultRows,
        prop_hasColNumber: false, prop_hasColSelector: false, prop_doColSelector: false,
        prop_tableClass: ["table", "table-sm", "table-striped", "mb-0"],
        prop_tableItemHeadStyles: {padding: "var(--paddingSmall)"},
        prop_tableItemBodyStyles: {padding: "var(--paddingSmall)", overflowWrap: "anywhere"},
    } as any);
    const componentResultTableWrapper = CoreReactive.App.div({attrs: {"data-component-test-table": ""}, className: ["mt-3"], styles: {display: "none", overflowX: "auto"}, children: [componentResultTable.getElement()]});
    const clearComponentResultTable = () => {
        componentResultRows.set([]);
        (componentResultTableWrapper.getElement() as HTMLElement).style.display = "none";
        clearResultGauges();
    };
    const componentWorkspace = UiCategory.UI.Contents.Border({prop_width: "100%", prop_content: CoreReactive.App.section({className: ["p-3"], children: [
        label("COMPONENT TESTS"), componentTitle,
        CoreReactive.App.div({className: ["mt-4", "pt-3"], styles: {borderTop: "1px solid var(--bs-border-color, #dee2e6)"}, children: [
            CoreReactive.App.div({className: ["fw-semibold", "mb-1"], children: ["Test scenarios"]}),
            componentProgress.getElement(), componentResultText, componentGaugeInfo, componentGaugeHost, componentResultTableWrapper,
        ]}),
    ]})});
    const componentResults = CoreReactive.App.section({styles: {display: "none"}, children: [componentWorkspace.getElement()]});
    const pageResults = CoreReactive.App.section({children: [bottomPanel.getElement()]});
    const content = CoreReactive.App.section({
        className: ["row", "p-0", "m-0", "w-100"],
        children: [CoreReactive.App.section({
            className: ["col-12", "p-2", "m-2"],
            styles: {display: "flex", gap: "var(--marginMedium)", alignItems: "flex-start"},
            children: [
                CoreReactive.App.section({styles: {flex: "2 1 0", minWidth: "0"}, children: [preview.getElement()]}),
                CoreReactive.App.section({styles: {flex: "1 1 0", minWidth: "0"}, children: [panel.getElement()]}),
            ],
        }), CoreReactive.App.section({
            className: ["col-12", "p-2", "m-2"],
            children: [pageResults, componentResults],
        })],
    });
    let componentRunning = false;
    let previewInstance: ComponentScenarioInstance | null = null;
    let componentAbort: AbortController | null = null;
    let componentDetachObserver: MutationObserver | null = null;
    const clearComponentPreview = () => { previewInstance?.dispose(); previewInstance?.element.remove(); previewInstance = null; };
    componentRunElement.addEventListener("click", async () => {
        const scenario = jsonTreePerformanceScenarios.find((item) => item.id === scenarioSelectElement.value && item.componentId === componentSelectElement.value);
        if (!scenario || componentRunning) return;
        componentRunning = true;
        componentAbort = new AbortController();
        const signal = componentAbort.signal;
        componentRunElement.disabled = true;
        componentSelectElement.disabled = true;
        scenarioSelectElement.disabled = true;
        (datasetSelect.getElement() as HTMLSelectElement).disabled = true;
        (iterationSelect.getElement() as HTMLSelectElement).disabled = true;
        componentProgressValue.set(0);
        componentProgressShow.set(true);
        clearComponentResultTable();
        const output = componentResultText.getElement() as HTMLElement;
        output.textContent = "Preparing the preview…";
        if (content.getElement().isConnected && typeof MutationObserver !== "undefined") {
            componentDetachObserver?.disconnect();
            componentDetachObserver = new MutationObserver(() => {
                if (content.getElement().isConnected) return;
                componentAbort?.abort();
                clearComponentPreview();
                clearResultGauges();
                componentDetachObserver?.disconnect();
                componentDetachObserver = null;
            });
            componentDetachObserver.observe(document.documentElement, {childList: true, subtree: true});
        }
        try {
            clearComponentPreview();
            await new Promise<void>((resolve, reject) => {
                const cleanup = () => { clearTimeout(timer); frame.removeEventListener("load", loaded); signal.removeEventListener("abort", aborted); };
                const loaded = () => { cleanup(); resolve(); };
                const aborted = () => { cleanup(); reject(new Error("Measurement cancelled.")); };
                const timer = setTimeout(() => { cleanup(); reject(new Error("Preview loading timed out.")); }, 10000);
                frame.addEventListener("load", loaded, {once: true});
                signal.addEventListener("abort", aborted, {once: true});
                frame.srcdoc = "<!doctype html><html><head></head><body></body></html>";
            });
            const doc = frame.contentDocument;
            if (!doc?.body || !doc.head) throw new Error("The component preview is unavailable.");
            for (const style of document.querySelectorAll('link[rel="stylesheet"], style')) doc.head.appendChild(style.cloneNode(true));
            doc.body.style.cssText = "margin:0;padding:16px;";
            doc.body.replaceChildren();
            const size = Number((datasetSelect.getElement() as HTMLSelectElement).value);
            const iterations = Number((iterationSelect.getElement() as HTMLSelectElement).value);
            const result = await runComponentScenario(scenario, doc.body, size, iterations, (done, total) => {
                componentProgressValue.set(done / total * 100);
                output.textContent = `Measuring ${done} of ${total} runs…`;
            }, signal);
            if (signal.aborted) return;
            previewInstance = scenario.prepare(size).create();
            doc.body.appendChild(previewInstance.element);
            previewInstance.run();
            previewInstance.validate();
            const budgets = (params.componentBudgets ?? exampleComponentBudgets)[scenario.id]?.[size];
            const measurements = [
                {key: "createP95" as const, title: "Creation · p95", value: result.createP95Ms, detail: "Time to create the tree."},
                ...(scenario.id === "json-tree-initial" ? [] : [{key: "operationP95" as const, title: "Search · p95", value: result.operationP95Ms, detail: "Time to execute the search."}]),
                {key: "disposeMedian" as const, title: "Cleanup · median", value: result.disposeMedianMs, detail: "Time to dispose and remove the tree."},
            ];
            for (const item of measurements) {
                const budget = budgets?.[item.key];
                const validBudget = budget && Number.isFinite(budget.good) && Number.isFinite(budget.moderate) && Number.isFinite(budget.max) && budget.good > 0 && budget.good < budget.moderate && budget.moderate < budget.max;
                const profile = validBudget && !result.truncated ? exampleProfile(budget.good, budget.moderate, budget.max) : null;
                const gauge = UiCategory.UI.Charts.Monitor.Gauge({prop_title: item.title, prop_value: item.value, prop_unit: "ms", prop_valueText: `${item.value.toFixed(2)} ms`, prop_min: profile?.min ?? null, prop_max: profile?.max ?? null, prop_bands: profile?.bands ?? []});
                resultGauges.push(gauge);
                const card = document.createElement("section");
                card.style.cssText = "flex:1 1 240px;min-width:0;padding:var(--paddingMedium);border:1px solid var(--bs-border-color, #dee2e6);border-radius:8px";
                card.appendChild(gauge.getElement());
                const detail = document.createElement("p");
                detail.className = "small text-muted mt-2 mb-0";
                const targetComparison = validBudget && item.value >= budget.good ? ` Result exceeds the good target by ${(item.value - budget.good).toFixed(2)} ms.` : "";
                const outsideScale = validBudget && item.value > budget.max ? " Result exceeds the chart scale and needs attention." : "";
                detail.textContent = result.truncated ? `${item.detail} Assessment unavailable because the tree was truncated.` : validBudget ? `${item.detail} Good target: under ${budget.good} ms.${targetComparison}${outsideScale}` : `${item.detail} No valid target configured.`;
                card.appendChild(detail);
                componentGaugeHost.getElement().appendChild(card);
            }
            (componentGaugeInfo.getElement() as HTMLElement).style.display = "";
            const operation = scenario.id === "json-tree-initial" ? "Not applicable" : `${result.operationMedianMs.toFixed(2)} / ${result.operationP95Ms.toFixed(2)} ms`;
            componentResultRows.set([
                {metric: "Scenario", value: scenario.title},
                {metric: "Dataset", value: `${size} items`},
                {metric: "Runs", value: `${result.iterations} (2 warm-up)`},
                {metric: "Create median / p95", value: `${result.createMedianMs.toFixed(2)} / ${result.createP95Ms.toFixed(2)} ms`},
                {metric: "Operation median / p95", value: operation},
                {metric: "Dispose median", value: `${result.disposeMedianMs.toFixed(2)} ms`},
                {metric: "Input nodes", value: String(result.inputNodes)},
                {metric: "Visible tree nodes", value: String(result.visibleNodes)},
                {metric: "DOM elements", value: String(result.domElements)},
                {metric: "Limits", value: `${result.maxNodes} nodes, depth ${result.maxDepth}`},
                {metric: "Truncated", value: result.truncated ? "Yes" : "No"},
                {metric: "Measurement scope", value: "Synchronous JavaScript only; paint is not measured."},
            ]);
            (componentResultTableWrapper.getElement() as HTMLElement).style.display = "";
            output.textContent = "Measurement complete.";
        } catch (error) {
            if (!signal.aborted) output.textContent = `Measurement failed: ${error instanceof Error ? error.message : String(error)}`;
            clearComponentPreview();
        } finally {
            componentRunning = false;
            componentAbort = null;
            componentRunElement.disabled = false;
            componentSelectElement.disabled = false;
            scenarioSelectElement.disabled = false;
            (datasetSelect.getElement() as HTMLSelectElement).disabled = false;
            (iterationSelect.getElement() as HTMLSelectElement).disabled = false;
        }
    });
    const showPage = () => {
        clearComponentPreview();
        frame.removeAttribute("srcdoc");
        (componentPanel.getElement() as HTMLElement).style.display = "none";
        (componentResults.getElement() as HTMLElement).style.display = "none";
        (pagePanel.getElement() as HTMLElement).style.display = "";
        (pageResults.getElement() as HTMLElement).style.display = "";
    };
    const showComponent = (category = "") => {
        if (selectElement.disabled || componentRunning) return;
        activeCategory = category;
        clearComponentPreview();
        const entries = catalog.entries.filter((entry) => !category || (category === "__other__" ? !catalog.categoryLabels.has(catalog.categoryOf(entry)) : catalog.categoryOf(entry) === category || catalog.categoryOf(entry).startsWith(`${category}/`)));
        componentSelectElement.replaceChildren(new Option("Select a component", ""), ...entries.map((entry) => new Option(entry.definition.name, entry.definition.id)));
        (selectedCategory.getElement() as HTMLElement).textContent = category === "__other__" ? "Other" : catalog.categoryLabels.get(category) ?? (category || "All components");
        (componentTitle.getElement() as HTMLElement).textContent = "Select a component";
        scenarioSelectElement.replaceChildren();
        componentRunElement.disabled = true;
        (componentMessage.getElement() as HTMLElement).textContent = "Choose JSON Tree to see available test scenarios.";
        (componentResultText.getElement() as HTMLElement).textContent = "";
        clearComponentResultTable();
        componentProgressShow.set(false);
        (pagePanel.getElement() as HTMLElement).style.display = "none";
        (pageResults.getElement() as HTMLElement).style.display = "none";
        (componentPanel.getElement() as HTMLElement).style.display = "";
        (componentResults.getElement() as HTMLElement).style.display = "";
        persistSelection("component", "", activeCategory);
    };
    componentSelectElement.addEventListener("change", () => {
        clearComponentPreview();
        const entry = catalog.entries.find((item) => item.definition.id === componentSelectElement.value);
        (componentTitle.getElement() as HTMLElement).textContent = entry?.definition.name ?? "Select a component";
        const scenarios = jsonTreePerformanceScenarios.filter((scenario) => scenario.componentId === componentSelectElement.value);
        scenarioSelectElement.replaceChildren(...scenarios.map((scenario) => new Option(scenario.title, scenario.id)));
        componentRunElement.disabled = scenarios.length === 0;
        (componentMessage.getElement() as HTMLElement).textContent = scenarios.length ? "Synchronous JavaScript timings; browser paint is not included." : "No test scenarios are registered for this component.";
        (componentResultText.getElement() as HTMLElement).textContent = "";
        clearComponentResultTable();
        componentProgressShow.set(false);
        persistSelection("component", entry?.definition.id ?? "", activeCategory);
    });
    const componentCategoryMenu = (item: MenuMoreItem): MenuMoreItem => {
        const path = item.action ?? "";
        const children = (item.children ?? [])
            .filter((child): child is MenuMoreItem => !("type" in child))
            .map(componentCategoryMenu);
        return {id: `monitor-${item.id}`, title: item.title, action: `component-category:${path}`, ...(children.length ? {openOn: "click" as const, children} : {})};
    };
    const componentCategories = catalog.menuItems.filter((item) => item.id.startsWith("category:")).map(componentCategoryMenu);
    const uncategorized = catalog.entries.filter((entry) => !catalog.categoryLabels.has(catalog.categoryOf(entry)));
    if (uncategorized.length) componentCategories.push({id: "monitor-other", title: "Other", action: "component-category:__other__"});
    const sidebar = UiCategory.UI.Controllers.MyPage.Tools.sideBarMenu({
        title: "Performance",
        items: [
            {id: "my-page", title: "My Page", openOn: "click", children: [
                {id: "page-home", title: "Home", action: "/v2/home"},
                {id: "page-components", title: "Components", action: "/v2/components"},
                {id: "page-icons", title: "Icons", action: "/v2/icons"},
                {id: "page-controllers", title: "Controllers", action: "/v2/controllers"},
                {id: "page-workflow", title: "Workflow", action: "/v2/workflow"},
                {id: "page-performance", title: "Performance", action: "/v2/performance"},
            ]},
            {id: "components", title: "Components", openOn: "click", children: [
                {id: "component-workspace", title: "All components", action: "component-category:"},
                ...componentCategories,
            ]},
            ...(internalProjects.length ? [{id: "internal-projects", title: "Internal projects", openOn: "click" as const, children: internalProjects.map((project) => ({id: `project:${project.id}`, title: project.title, openOn: "click" as const, children: project.scenarios.map((scenario) => ({id: `project:${project.id}:${scenario.id}`, title: scenario.title, action: `${project.previewBase}${scenario.path}`}))}))}] : []),
        ],
        methods: {
            SELECT_ITEM: (_event: Event, args: {ITEM?: {id?: string; action?: string}}) => {
                const path = args.ITEM?.action;
                if (path?.startsWith("component-category:")) { showComponent(path.slice("component-category:".length)); return; }
                if (path && (mainPages.some(([value]) => value === path) || projectScenarios.some((item) => item.path === path))) {
                    if (selectElement.disabled || componentRunning) return;
                    showPage();
                    setPageScope(path);
                    selectElement.value = path;
                    selectElement.dispatchEvent(new Event("change"));
                    return;
                }
            },
        },
    });
    if (typeof window !== "undefined") {
        const query = new URLSearchParams(window.location.search);
        const type = query.get("type");
        const selected = query.get("selected") ?? "";
        restoringSelection = true;
        try {
            if (type === "page") {
                const path = selected.startsWith("/v2/") ? selected : `/v2/${selected}`;
                if (Array.from(selectElement.options).some((option) => option.value === path)) {
                    selectElement.value = path;
                    selectElement.dispatchEvent(new Event("change"));
                }
            } else if (type === "project") {
                const item = projectScenarios.find(({project, scenario}) => project.id === selected && scenario.id === query.get("scenario"));
                if (item) {
                    setPageScope(item.path);
                    selectElement.value = item.path;
                    selectElement.dispatchEvent(new Event("change"));
                }
            } else if (type === "component") {
                const entry = catalog.entries.find((item) => item.definition.id === selected);
                const requestedCategory = query.get("category") ?? "";
                const validCategory = requestedCategory === "__other__" || catalog.categoryLabels.has(requestedCategory);
                const entryCategory = entry ? catalog.categoryOf(entry) : "";
                const category = validCategory && (!entry || entryCategory === requestedCategory || entryCategory.startsWith(`${requestedCategory}/`))
                    ? requestedCategory : entry ? (catalog.categoryLabels.has(entryCategory) ? entryCategory : "__other__") : "";
                showComponent(category);
                if (entry && Array.from(componentSelectElement.options).some((option) => option.value === entry.definition.id)) {
                    componentSelectElement.value = entry.definition.id;
                    componentSelectElement.dispatchEvent(new Event("change"));
                }
            }
        } finally { restoringSelection = false; }
    }
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Performance page content is ready."],
        widget: params.widget ?? null,
        data: {content, sidebar, pageTitle: "Performance", pageNav: [{name: "home", title: "Home"}]},
        reference: {source: MY_PAGE_PERFORMANCE_PAGE_SOURCE, method: RequestMethod.INTERNAL, respondedAt: new Date()},
    }).get();
};
