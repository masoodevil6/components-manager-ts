import { ITemplate } from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as Perf from "@/performance";
import * as CoreComponents from "@/core_components";
// --------------------------------
import { ClHomePage  as HomePage }  from "@/ui_pages/pages/home/ClHomePage";
import { ClIconPage  as IconPage }  from "@/ui_pages/pages/icons/ClIconPage";
import { ClTestsPage as TestsPage } from "@/ui_pages/pages/tests/ClTestsPage";

/**
 * ClPerformancePage — صفحه نمایش نتایج Performance Module
 *
 * این صفحه Performance Module را مصرف می‌کند:
 *   ۱. benchmark صفحات
 *   ۲. benchmark Component examples
 *   ۳. نمایش نتایج در section‌های جداگانه (Pages, Components, Regression)
 *
 * مدل داده از UI مستقل است — همین data می‌تواند برود داخل Console، JSON، CI، AI.
 *
 * مسیر: /performance
 */
export class ClPerformancePage implements ITemplate {

    render(query?: Record<string, string>, extra?: Record<string, any>): HTMLElement {

        Perf.PerformanceRegistry.clear();

        // Benchmark صفحات
        Perf.benchmarkPage("HomePage",  new HomePage());
        Perf.benchmarkPage("IconPage",  new IconPage());
        Perf.benchmarkPage("TestsPage", new TestsPage());

        // Benchmark Component examples
        const entries = CoreComponents.ComponentManager.list().sort((a, b) =>
            a.definition.id.localeCompare(b.definition.id)
        );

        for (const entry of entries) {
            const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);
            if (examples.length === 0) continue;

            for (const example of examples) {
                const name = `${entry.definition.name}/${example.id}`;
                try {
                    Perf.benchmarkComponent(name, () => example.render());
                } catch (e) {
                    console.error(`[PerformancePage] Failed: ${name}`, e);
                }
            }
        }

        // ساخت نمایش — section‌های جداگانه
        const reports = Perf.PerformanceRegistry.query();
        const pageReports      = reports.filter(r => ["HomePage", "IconPage", "TestsPage"].includes(r.target));
        const componentReports = reports.filter(r => !["HomePage", "IconPage", "TestsPage"].includes(r.target));

        return CoreReactive.App.section({
            className: ["row", "p-0", "m-0"],
            children: [
                // Header
                CoreReactive.App.section({
                    className: ["col-12", "p-2", "m-2"],
                    children: [`<h3>Performance</h3>`, `<hr/>`],
                }),

                // Pages section
                this._renderSection("Pages", pageReports),

                // Components section
                this._renderSection("Components", componentReports),

                // Regression section
                this._renderRegressionSection(reports),
            ],
        }).getElement();
    }

    /**
     * _renderSection — ساخت یک section جدولی
     *
     * status-aware: اگر metric.status !== "measured"،
     * به‌جای عدد "unsupported" یا "unavailable" نمایش داده می‌شود.
     */
    private _renderSection(title: string, reports: Perf.PerfReport[]): HTMLElement {
        const header = CoreReactive.App.section({
            className: ["d-flex", "border-bottom", "fw-bold", "py-1", "small"],
            children: [
                `<div class="col-4">Target</div>`,
                `<div class="col-2 text-end">Render (median)</div>`,
                `<div class="col-2 text-end">P95</div>`,
                `<div class="col-2 text-end">DOM</div>`,
                `<div class="col-2 text-end">Components</div>`,
            ],
        });

        const rows = reports.map(r => {
            const renderMs = this._formatMetric(r, "renderExecutionMs");
            const domCount = this._formatMetric(r, "domElementCount");
            const compCount = this._formatMetric(r, "componentCount");

            return CoreReactive.App.section({
                className: ["d-flex", "border-bottom", "py-1"],
                children: [
                    `<div class="col-4 small">${r.target}</div>`,
                    `<div class="col-2 small text-end">${renderMs}</div>`,
                    `<div class="col-2 small text-end">${r.benchmark.p95.toFixed(2)} ms</div>`,
                    `<div class="col-2 small text-end">${domCount}</div>`,
                    `<div class="col-2 small text-end">${compCount}</div>`,
                ],
            });
        });

        return CoreReactive.App.section({
            className: ["col-12", "px-3", "mb-3"],
            children: [
                `<h5 class="mt-2">${title}</h5>`,
                header,
                ...rows,
            ],
        });
    }

    /**
     * _renderRegressionSection — نمایش وضعیت regression
     */
    private _renderRegressionSection(reports: Perf.PerfReport[]): HTMLElement {
        const rows = reports.map(r => {
            if (!r.regression) {
                return CoreReactive.App.section({
                    className: ["d-flex", "border-bottom", "py-1"],
                    children: [
                        `<div class="col-6 small">${r.target}</div>`,
                        `<div class="col-6 small text-end text-muted">(no baseline)</div>`,
                    ],
                });
            }

            const icon = r.regression.status === "PASS" ? "\u2713" : "\u2717";
            const cls  = r.regression.status === "PASS" ? "text-success" : "text-danger";
            const pct  = r.regression.changePercent >= 0 ? "+" : "";

            return CoreReactive.App.section({
                className: ["d-flex", "border-bottom", "py-1"],
                children: [
                    `<div class="col-6 small">${r.target}</div>`,
                    `<div class="col-6 small text-end ${cls}">${icon} ${pct}${r.regression.changePercent.toFixed(1)}%</div>`,
                ],
            });
        });

        return CoreReactive.App.section({
            className: ["col-12", "px-3", "mb-3"],
            children: [
                `<h5 class="mt-2">Regression</h5>`,
                ...rows,
            ],
        });
    }

    /**
     * _formatMetric — نمایش status-aware یک metric
     *
     * measured    → مقدار عددی
     * unsupported → "unsupported"
     * unavailable → "unavailable"
     */
    private _formatMetric(report: Perf.PerfReport, name: string): string {
        const m = report.metrics.find(mv => mv.name === name);
        if (!m || m.status !== "measured") return m?.status ?? "—";
        if (m.value === undefined) return "N/A";
        if (m.unit === "ms") return `${m.value.toFixed(2)} ms`;
        return `${m.value}`;
    }

    onLoad(pageElement: HTMLElement): void {
        console.log("[PerformancePage] onLoad");
    }
}
