// @vitest-environment jsdom
import {beforeEach, describe, expect, it, vi} from "vitest";
import {MY_PAGE_PERFORMANCE_PAGE_SOURCE, performancePage} from "../../src/framework/module_ui/module_controller/module_requests/module_static/v1/MyPagePerformancePage";
import {internalProjects} from "../../src/framework/module_ui/module_controller/module_requests/module_static/v1/InternalProjects";

describe("performance page controller", () => {
    beforeEach(() => history.replaceState(null, "", "/v2/performance"));
    it("returns the standard page data with the project home page in the iframe", () => {
        const response = performancePage();
        expect(response.status).toBe(true);
        expect(response.reference.source).toBe(MY_PAGE_PERFORMANCE_PAGE_SOURCE);
        expect(response.data.pageTitle).toBe("Performance");
        const sidebar = response.data.sidebar;
        expect(sidebar.data.items.map((item: {id: string}) => item.id)).toEqual(["my-page", "components", "internal-projects"]);
        const pages = sidebar.data.items[0].children;
        expect(pages.map((item: {title: string}) => item.title)).toEqual(["Home", "Components", "Icons", "Controllers", "Workflow", "Performance"]);
        const iframe = response.data.content.getElement().querySelector("iframe");
        expect(iframe).not.toBeNull();
        expect(iframe?.getAttribute("src")).toBe("/v2/home");
        expect(iframe?.style.height).toBe("100%");
        expect(iframe?.parentElement?.style.height).toBe("100%");
        sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: pages[2]});
        expect(iframe?.getAttribute("src")).toBe("/v2/icons");
        expect(response.data.content.getElement().querySelector("select")?.value).toBe("/v2/icons");
        const previewColumn = iframe?.closest("component-iframe")?.parentElement;
        expect(previewColumn?.style.flex).toBe("2 1 0px");
        expect(previewColumn?.querySelector("component-progress-linear")).toBeNull();
        expect(response.data.content.getElement().querySelector("component-progress-linear")).not.toBeNull();
        expect(previewColumn?.nextElementSibling?.querySelector("component-border")).not.toBeNull();
    });

    it("stores and restores the selected page while preserving other URL state", () => {
        history.replaceState({router: 5}, "", "/v2/performance?other=keep#results");
        const response = performancePage();
        const root = response.data.content.getElement();
        const page = root.querySelector('[aria-label="Page to measure"]') as HTMLSelectElement;
        page.value = "/v2/icons";
        page.dispatchEvent(new Event("change"));
        expect(location.search).toContain("type=page");
        expect(new URLSearchParams(location.search).get("selected")).toBe("icons");
        expect(new URLSearchParams(location.search).get("other")).toBe("keep");
        expect(location.hash).toBe("#results");
        expect(history.state).toEqual({router: 5});
        const restored = performancePage().data.content.getElement();
        expect((restored.querySelector('[aria-label="Page to measure"]') as HTMLSelectElement).value).toBe("/v2/icons");
        expect(restored.querySelector("iframe")?.getAttribute("src")).toBe("/v2/icons");
    });

    it("selects and restores an internal project scenario", () => {
        const response = performancePage();
        const root = response.data.content.getElement();
        const select = root.querySelector('[aria-label="Page to measure"]') as HTMLSelectElement;
        const search = root.querySelector('[aria-label="Search pages"]') as HTMLInputElement;
        const scenario = response.data.sidebar.data.items[2].children[0].children.find((item) => item.id === "project:consumer:json-tree-root");
        expect(scenario).toBeDefined();
        const expectedProjectOptions = internalProjects.find((project) => project.id === "consumer")!.scenarios.map((item) => item.title);
        response.data.sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: scenario});
        expect(root.querySelector("iframe")?.getAttribute("src")).toBe("/internal-projects/consumer/json-tree.html");
        expect([...select.options].map((option) => option.text)).toEqual(expectedProjectOptions);
        search.value = "button";
        search.dispatchEvent(new Event("input"));
        expect([...select.options].filter((option) => !option.hidden).map((option) => option.text)).toEqual(expectedProjectOptions.filter((title) => title.toLowerCase().includes("button")));
        expect(select.value).toBe("/internal-projects/consumer/json-tree.html");
        expect(new URLSearchParams(location.search).get("type")).toBe("project");
        expect(new URLSearchParams(location.search).get("selected")).toBe("consumer");
        const restored = performancePage().data.content.getElement();
        expect(restored.querySelector("iframe")?.getAttribute("src")).toBe("/internal-projects/consumer/json-tree.html");
        expect([...(restored.querySelector('[aria-label="Page to measure"]') as HTMLSelectElement).options].map((option) => option.text)).toEqual(expectedProjectOptions);
        response.data.sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: response.data.sidebar.data.items[0].children[0]});
        expect([...select.options].map((option) => option.text)).toEqual(["Home", "Components", "Icons", "Controllers", "Workflow", "Performance"]);
        expect(search.value).toBe("");
    });

    it("stores and restores the component and category selection", () => {
        const response = performancePage();
        const sidebar = response.data.sidebar;
        sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: sidebar.data.items[1].children[0]});
        const select = response.data.content.getElement().querySelector('[aria-label="Component to test"]') as HTMLSelectElement;
        select.value = "component_json_tree";
        select.dispatchEvent(new Event("change"));
        expect(new URLSearchParams(location.search).get("type")).toBe("component");
        expect(new URLSearchParams(location.search).get("selected")).toBe("component_json_tree");
        const restored = performancePage().data.content.getElement();
        const restoredSelect = restored.querySelector('[aria-label="Component to test"]') as HTMLSelectElement;
        expect(restoredSelect.value).toBe("component_json_tree");
        expect(restoredSelect.closest('section[style*="display: none"]')).toBeNull();
        expect((restored.querySelector('[aria-label="Performance scenario"]') as HTMLSelectElement).options).toHaveLength(2);
    });

    it("safely ignores invalid URL selections", () => {
        history.replaceState(null, "", "/v2/performance?type=page&selected=https%3A%2F%2Fevil.example");
        const page = performancePage().data.content.getElement();
        expect(page.querySelector("iframe")?.getAttribute("src")).toBe("/v2/home");
        history.replaceState(null, "", "/v2/performance?type=component&selected=unknown");
        const component = performancePage().data.content.getElement();
        expect((component.querySelector('[aria-label="Component to test"]') as HTMLSelectElement).value).toBe("");
    });

    it("selects registered components by category and returns to page monitoring", () => {
        const response = performancePage();
        const root = response.data.content.getElement();
        const sidebar = response.data.sidebar;
        const findCategory = (items: any[]): any => {
            for (const item of items) {
                expect(item.action?.startsWith("component:") ?? false).toBe(false);
                if (item.action === "component-category:charts/monitor") return item;
                const found = findCategory(item.children ?? []);
                if (found) return found;
            }
            return null;
        };
        const category = findCategory(sidebar.data.items[1].children);
        expect(category).not.toBeNull();
        sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: category});
        const componentSelect = root.querySelector('[aria-label="Component to test"]') as HTMLSelectElement;
        expect([...componentSelect.options].some((option) => option.text === "componentChartMetricGauge")).toBe(true);
        componentSelect.value = "component_chart_metric_gauge";
        componentSelect.dispatchEvent(new Event("change"));
        expect(root.textContent).toContain("componentChartMetricGauge");
        expect(root.textContent).toContain("No test scenarios are registered for this component.");
        const workspace = [...root.querySelectorAll("section")].find((section) => section.textContent?.includes("COMPONENT TESTS"))!;
        expect((workspace as HTMLElement).style.display).not.toBe("none");
        const frame = root.querySelector("iframe")!;
        sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: sidebar.data.items[0].children[0]});
        expect(frame.getAttribute("src")).toBe("/v2/home");
        expect((frame.closest(".row") as HTMLElement).style.display).not.toBe("none");
    });

    it("runs the JSON Tree search scenario and displays measured results", async () => {
        const budget = {good: 100000, moderate: 200000, max: 300000};
        const response = performancePage({componentBudgets: {"json-tree-search": {100: {createP95: budget, operationP95: budget, disposeMedian: budget}}}});
        const root = response.data.content.getElement();
        document.body.appendChild(root);
        const sidebar = response.data.sidebar;
        sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: sidebar.data.items[1].children[0]});
        const select = root.querySelector('[aria-label="Component to test"]') as HTMLSelectElement;
        select.value = "component_json_tree";
        select.dispatchEvent(new Event("change"));
        const scenario = root.querySelector('[aria-label="Performance scenario"]') as HTMLSelectElement;
        expect([...scenario.options].map((option) => option.value)).toEqual(["json-tree-initial", "json-tree-search"]);
        scenario.value = "json-tree-search";
        const button = [...root.querySelectorAll("button")].find((item) => item.textContent === "Run component test")!;
        const frame = root.querySelector("iframe")!;
        const previewDocument = document.implementation.createHTMLDocument("Preview");
        Object.defineProperty(frame, "contentDocument", {value: previewDocument});
        button.click();
        frame.dispatchEvent(new Event("load"));
        await vi.waitFor(() => expect(root.querySelector("[data-component-test-result]")?.textContent).toContain("Measurement complete."), {timeout: 15000, interval: 50});
        const resultTable = root.querySelector("[data-component-test-table] component-table")!;
        expect(resultTable).not.toBeNull();
        const rows = [...resultTable.querySelectorAll("tbody tr")].map((row) => [...row.querySelectorAll("td")].map((cell) => cell.textContent));
        expect(rows).toContainEqual(["Input nodes", "302"]);
        expect(rows.some(([name]) => name === "Operation median / p95")).toBe(true);
        const gauges = [...root.querySelectorAll("[data-component-result-gauges] component-chart-metric-gauge")];
        expect(gauges).toHaveLength(3);
        gauges.forEach((gauge) => {
            expect(gauge.querySelector("[data-gauge-assessment]")?.textContent).toBe("Good");
            expect(gauge.querySelector("svg line")).not.toBeNull();
        });
        expect(root.textContent).toContain("Good target: under 100000 ms");
        expect(frame.contentDocument?.body.textContent).toContain("item-42");
        expect(button.disabled).toBe(false);
        root.remove();
    }, 20000);

    it("runs a CustomForm input interaction and displays component metrics", async () => {
        const response = performancePage();
        const root = response.data.content.getElement();
        document.body.appendChild(root);
        response.data.sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: response.data.sidebar.data.items[1].children[0]});
        const component = root.querySelector('[aria-label="Component to test"]') as HTMLSelectElement;
        component.value = "component_custom_form";
        component.dispatchEvent(new Event("change"));
        const scenario = root.querySelector('[aria-label="Performance scenario"]') as HTMLSelectElement;
        expect([...scenario.options].map((option) => option.value)).toEqual([
            "custom-form-edit-render",
            "custom-form-run-render",
            "custom-form-input-change",
            "custom-form-edit-to-run",
        ]);
        scenario.value = "custom-form-input-change";
        scenario.dispatchEvent(new Event("change"));
        const dataset = root.querySelector('[aria-label="Dataset size"]') as HTMLSelectElement;
        expect([...dataset.options].map((option) => option.value)).toEqual(["5", "10", "20"]);
        const button = [...root.querySelectorAll("button")].find((item) => item.textContent === "Run component test")!;
        const frame = root.querySelector("iframe")!;
        const previewDocument = document.implementation.createHTMLDocument("Preview");
        Object.defineProperty(frame, "contentDocument", {value: previewDocument});
        button.click();
        frame.dispatchEvent(new Event("load"));
        await vi.waitFor(() => expect(root.querySelector("[data-component-test-result]")?.textContent).toContain("Measurement complete."), {timeout: 20000, interval: 50});
        const resultTable = root.querySelector("[data-component-test-table] component-table")!;
        const rows = [...resultTable.querySelectorAll("tbody tr")].map((row) => [...row.querySelectorAll("td")].map((cell) => cell.textContent));
        expect(rows).toContainEqual(["Dataset", "5 fields"]);
        expect(rows).toContainEqual(["Configured fields", "5"]);
        expect(rows).toContainEqual(["Rendered form controls", "5"]);
        expect(rows.some(([name]) => name === "Operation median / p95")).toBe(true);
        expect(rows).toContainEqual(["Truncated", "Not applicable"]);
        expect(root.querySelectorAll("[data-component-result-gauges] component-chart-metric-gauge")).toHaveLength(3);
        expect(button.disabled).toBe(false);
        root.remove();
    }, 30000);

    it("runs an ElementCreator hover interaction and displays component metrics", async () => {
        const response = performancePage();
        const root = response.data.content.getElement();
        document.body.appendChild(root);
        response.data.sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: response.data.sidebar.data.items[1].children[0]});
        const component = root.querySelector('[aria-label="Component to test"]') as HTMLSelectElement;
        component.value = "component_element_creator";
        component.dispatchEvent(new Event("change"));
        const scenario = root.querySelector('[aria-label="Performance scenario"]') as HTMLSelectElement;
        expect([...scenario.options].map((option) => option.value)).toEqual([
            "element-creator-render",
            "element-creator-edit-render",
            "element-creator-edit-hover",
        ]);
        scenario.value = "element-creator-edit-hover";
        scenario.dispatchEvent(new Event("change"));
        const dataset = root.querySelector('[aria-label="Dataset size"]') as HTMLSelectElement;
        expect([...dataset.options].map((option) => option.value)).toEqual(["1", "5", "20"]);
        const button = [...root.querySelectorAll("button")].find((item) => item.textContent === "Run component test")!;
        const frame = root.querySelector("iframe")!;
        const previewDocument = document.implementation.createHTMLDocument("Preview");
        Object.defineProperty(frame, "contentDocument", {value: previewDocument});
        button.click();
        frame.dispatchEvent(new Event("load"));
        await vi.waitFor(() => expect(root.querySelector("[data-component-test-result]")?.textContent).toContain("Measurement complete."), {timeout: 20000, interval: 50});
        const resultTable = root.querySelector("[data-component-test-table] component-table")!;
        const rows = [...resultTable.querySelectorAll("tbody tr")].map((row) => [...row.querySelectorAll("td")].map((cell) => cell.textContent));
        expect(rows).toContainEqual(["Dataset", "1 rows"]);
        expect(rows).toContainEqual(["ElementCreator rows", "1"]);
        expect(rows).toContainEqual(["Rendered input controls", "1"]);
        expect(rows.some(([name]) => name === "Operation median / p95")).toBe(true);
        expect(rows).toContainEqual(["Truncated", "Not applicable"]);
        expect(root.querySelectorAll("[data-component-result-gauges] component-chart-metric-gauge")).toHaveLength(3);
        expect(root.textContent).toContain("Good target: under 400 ms.");
        expect(root.textContent).toContain("Good target: under 150 ms.");
        expect(root.textContent).toContain("Good target: under 60 ms.");
        expect(button.disabled).toBe(false);
        root.remove();
    }, 30000);

    it("shows four measured gauges with the page's example budgets", () => {
        vi.useFakeTimers();
        try {
            const root = performancePage().data.content.getElement();
            const frame = root.querySelector("iframe")!;
            Object.defineProperty(frame, "contentWindow", {value: {
                location: {origin: window.location.origin, pathname: "/v2/home"},
                performance: {getEntriesByType: (type: string) => type === "navigation"
                    ? [{domContentLoadedEventEnd: 100, loadEventEnd: 200, transferSize: 1024}]
                    : [{initiatorType: "script", transferSize: 1024}]},
            }});
            root.querySelector("button")!.click();
            frame.dispatchEvent(new Event("load"));
            vi.advanceTimersByTime(1);

            const gauges = [...root.querySelectorAll("component-chart-metric-gauge")];
            expect(gauges).toHaveLength(4);
            expect(gauges[0].textContent).toContain("100 ms");
            expect(gauges[1].textContent).toContain("200 ms");
            expect(gauges[2].textContent).toContain("2.0 KiB");
            expect(gauges[3].textContent).toContain("1");
            gauges.forEach((gauge) => {
                expect(gauge.querySelectorAll("svg rect").length).toBeGreaterThan(1);
                expect(gauge.querySelector("svg line")).not.toBeNull();
            });
            expect(root.textContent).toContain("Colored ranges are example budgets");
        } finally {
            vi.useRealTimers();
        }
    });

    it("loads the selected page and displays timing data from the iframe", () => {
        vi.useFakeTimers();
        try {
            const root = performancePage({metricProfiles: {
                ready: {min: 0, max: 1000, bands: [{id: "fast", label: "Fast", from: 0, to: 500}, {id: "slow", label: "Slow", from: 500, to: 1000}]},
                transfer: {min: 0, max: 10, bands: [{id: "tiny", label: "Tiny", from: 0, to: 10}]},
            }}).data.content.getElement();
            const frame = root.querySelector("iframe")!;
            Object.defineProperty(frame, "contentWindow", {value: {
                location: {origin: window.location.origin, pathname: "/v2/icons"},
                performance: {getEntriesByType: (type: string) => type === "navigation"
                    ? [{domContentLoadedEventEnd: 125, loadEventEnd: 220, transferSize: 1024}]
                    : [{initiatorType: "script", transferSize: 2048}, {initiatorType: "script", transferSize: 1024}, {initiatorType: "link", transferSize: 0}]},
            }});
            const select = root.querySelector("select")!;
            select.value = "/v2/icons";
            select.dispatchEvent(new Event("change"));
            expect(frame.getAttribute("src")).toBe("/v2/icons");
            const button = root.querySelector("button")!;
            button.click();
            const firstMeasurementUrl = new URL(frame.getAttribute("src")!, window.location.href);
            expect(firstMeasurementUrl.pathname).toBe("/v2/icons");
            expect(firstMeasurementUrl.searchParams.get("__performance_run")).toBeTruthy();
            expect(button.disabled).toBe(true);
            expect(root.textContent).toContain("Loading the selected page…");
            expect(root.querySelector('[data-progress-indeterminate="true"]')).not.toBeNull();
            frame.dispatchEvent(new Event("load"));
            vi.advanceTimersByTime(1);
            expect(button.disabled).toBe(false);
            expect(root.textContent).toContain("125 ms");
            expect(root.textContent).toContain("220 ms");
            expect(root.textContent).toContain("4.0 KiB");
            const gauges = [...root.querySelectorAll("component-chart-metric-gauge")];
            expect(gauges).toHaveLength(4);
            expect(gauges[0].querySelector("[data-gauge-assessment]")?.textContent).toBe("Fast");
            expect(gauges[2].querySelector("[data-gauge-assessment]")?.textContent).not.toContain("Tiny");
            expect(root.textContent).toContain("reported for 3 of 4 entries");
            expect(root.textContent).toContain("2 of 3 resources");
            const resourceProgress = root.querySelector('[role="progressbar"][aria-label="script"]');
            expect(resourceProgress?.getAttribute("aria-valuenow")).toBe("2");
            expect(resourceProgress?.getAttribute("aria-valuemax")).toBe("3");
            expect(root.textContent).toContain("67%");
            expect(root.textContent).toContain("Measurement complete");
            expect(root.textContent).toContain("Measurement complete.");
            button.click();
            const secondMeasurementUrl = new URL(frame.getAttribute("src")!, window.location.href);
            expect(secondMeasurementUrl.searchParams.get("__performance_run")).not.toBe(firstMeasurementUrl.searchParams.get("__performance_run"));
        } finally {
            vi.useRealTimers();
        }
    });

    it("shows a timeout error and allows another run", () => {
        vi.useFakeTimers();
        try {
            const root = performancePage().data.content.getElement();
            const button = root.querySelector("button")!;
            button.click();
            vi.advanceTimersByTime(30000);
            expect(button.disabled).toBe(false);
            expect(root.textContent).toContain("Page loading timed out");
            expect(root.textContent).toContain("Unavailable");
            const fill = root.querySelector('[data-progress-indeterminate="true"]') as HTMLElement;
            expect(fill.style.animation).toBe("none");
        } finally {
            vi.useRealTimers();
        }
    });
});
