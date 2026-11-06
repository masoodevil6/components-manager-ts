import type {ITemplate} from "@/core_route";
import {MonitoringScenarios, runMonitoringScenario, type MonitoringResult} from "../../../../module_performance/core/Monitoring";

const BASELINE_KEY = "framework.performance.baselines.v1";

type Baseline = MonitoringResult & {userAgent: string};

function readBaselines(): Record<string, Baseline> {
    try { return JSON.parse(localStorage.getItem(BASELINE_KEY) || "{}"); } catch { return {}; }
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    return node;
}

export class ClPerformancePage implements ITemplate {
    render(): HTMLElement {
        const root = element("main");
        root.setAttribute("data-performance-monitor", "");
        root.style.cssText = "max-width:1100px;margin:auto;padding:24px;display:grid;gap:20px;font-family:system-ui,sans-serif;line-height:1.5";
        const heading = element("header");
        heading.append(element("h1", "Performance monitor"), element("p", "Measure the current page and run registered scenarios. Results are local to this browser."));
        root.append(heading);

        const card = (title: string) => {
            const section = element("section");
            section.style.cssText = "border:1px solid #cbd5e1;border-radius:10px;padding:18px;min-width:0";
            section.append(element("h2", title));
            root.append(section);
            return section;
        };
        const overview = card("Current page");
        const overviewData = element("dl");
        const addMetric = (label: string, value: string) => { overviewData.append(element("dt", label), element("dd", value)); };
        const navigation = performance.getEntriesByType?.("navigation")?.[0] as PerformanceNavigationTiming | undefined;
        addMetric("DOM content loaded", navigation && navigation.domContentLoadedEventEnd > 0 ? `${navigation.domContentLoadedEventEnd.toFixed(1)} ms` : "Unavailable for this navigation");
        addMetric("Page load", navigation && navigation.loadEventEnd > 0 ? `${navigation.loadEventEnd.toFixed(1)} ms` : "Not available yet");
        const resources = performance.getEntriesByType?.("resource") as PerformanceResourceTiming[] | undefined;
        addMetric("Recorded resources", resources ? String(resources.length) : "Unavailable");
        const exposedSizes = resources?.filter((entry) => entry.transferSize > 0) ?? [];
        addMetric("Reported resource transfer", resources ? `${(exposedSizes.reduce((sum, entry) => sum + entry.transferSize, 0) / 1024).toFixed(1)} KiB (${exposedSizes.length} resources with a reported transfer size)` : "Unavailable");
        const memory = (performance as any).memory?.usedJSHeapSize;
        addMetric("Current JS heap", typeof memory === "number" && Number.isFinite(memory) ? `${(memory / 1048576).toFixed(1)} MiB (browser estimate)` : "Unavailable in this browser");
        overview.append(overviewData, element("p", "Navigation and resource timings refer to the current document, not an isolated library load. Cached or cross-origin resources may not expose transfer sizes; use DevTools for the full network trace."));

        const runner = card("Scenario runner");
        runner.append(element("p", "Choose a scenario and run repeated synchronous measurements. Times exclude browser paint; compare results on the same device and browser."));
        const controls = element("div");
        controls.style.cssText = "display:flex;flex-wrap:wrap;align-items:end;gap:12px";
        const selectLabel = element("label", "Scenario ");
        const select = element("select");
        select.setAttribute("aria-label", "Scenario");
        const scenarios = MonitoringScenarios.list();
        scenarios.forEach((scenario) => { const option = element("option", scenario.title); option.value = scenario.id; select.append(option); });
        selectLabel.append(select);
        const countLabel = element("label", "Iterations ");
        const count = element("input");
        count.type = "number"; count.min = "1"; count.max = "100"; count.value = "10"; count.style.width = "5rem";
        countLabel.append(count);
        const run = element("button", "Run scenario"); run.type = "button";
        const save = element("button", "Save as baseline"); save.type = "button"; save.disabled = true;
        controls.append(selectLabel, countLabel, run, save);
        const description = element("p");
        const updateDescription = () => { description.textContent = scenarios.find((item) => item.id === select.value)?.description ?? "No scenarios registered."; };
        select.addEventListener("change", () => { updateDescription(); save.disabled = true; });
        updateDescription();
        const result = element("div"); result.setAttribute("aria-live", "polite");
        const host = element("div"); host.setAttribute("data-performance-host", "");
        host.style.cssText = "position:fixed;left:-10000px;top:0;width:800px;visibility:hidden;pointer-events:none";
        runner.append(controls, description, result, host);
        let lastResult: MonitoringResult | null = null;
        run.addEventListener("click", () => {
            const scenario = scenarios.find((item) => item.id === select.value);
            if (!scenario) return;
            try {
                const measurement = runMonitoringScenario(scenario, host, Number(count.value));
                lastResult = measurement; save.disabled = false;
                result.replaceChildren(element("h3", "Latest result"));
                const list = element("dl");
                const add = (name: string, value: string) => list.append(element("dt", name), element("dd", value));
                add("Create — median / p95", `${measurement.medianCreateMs.toFixed(2)} / ${measurement.p95CreateMs.toFixed(2)} ms`);
                add("Mount — median", `${measurement.medianMountMs.toFixed(2)} ms`);
                add("Dispose and remove — median", `${measurement.medianDisposeMs.toFixed(2)} ms`);
                add("DOM elements", String(measurement.domNodes));
                add("Samples", `${measurement.iterations} measured, 2 warmup`);
                const baseline = readBaselines()[measurement.scenarioId];
                if (!baseline || !Number.isFinite(baseline.medianCreateMs) || baseline.medianCreateMs <= 0) add("Baseline comparison", "No comparable baseline saved.");
                else {
                    const delta = (measurement.medianCreateMs / baseline.medianCreateMs - 1) * 100;
                    const context = baseline.userAgent === navigator.userAgent && baseline.iterations === measurement.iterations ? "" : " Browser or iteration count differs; comparison may not be reliable.";
                    add("Create median vs baseline", `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}% (baseline ${baseline.medianCreateMs.toFixed(2)} ms).${context}`);
                }
                result.append(list);
            } catch (error) { lastResult = null; save.disabled = true; result.textContent = `Scenario failed: ${error instanceof Error ? error.message : String(error)}`; }
        });
        save.addEventListener("click", () => {
            if (!lastResult || lastResult.scenarioId !== select.value) return;
            try {
                const baselines = readBaselines();
                baselines[lastResult.scenarioId] = {...lastResult, userAgent: navigator.userAgent};
                localStorage.setItem(BASELINE_KEY, JSON.stringify(baselines));
                result.append(element("p", "Baseline saved in this browser."));
            } catch { result.append(element("p", "Could not save baseline in this browser.")); }
        });
        return root;
    }
    onLoad(_pageElement: HTMLElement): void {}
}
