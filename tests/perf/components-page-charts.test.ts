// @vitest-environment jsdom
import {describe, expect, it} from "vitest";
import {componentsPage} from "../../src/framework/module_ui/module_controller/module_requests/module_static/v1/MyPageComponentsPage";

describe("components page categories", () => {
    it("includes Charts in the sidebar and registers ProgressLinear under it", () => {
        const response = componentsPage();
        const sidebar = response.data.sidebar;
        const charts = sidebar.data.items.find((item: {id: string}) => item.id === "category:charts");
        expect(charts).toBeDefined();
        expect(sidebar.data.items[1]).toBe(charts);
        expect(charts.action).toBe("charts");
        const progress = charts.children.find((item: {id: string}) => item.id === "category:charts/progress");
        expect(progress?.action).toBe("charts/progress");
        const monitor = charts.children.find((item: {id: string}) => item.id === "category:charts/monitor");
        expect(monitor?.action).toBe("charts/monitor");
        expect(response.data.content.getElement().textContent).toContain("componentProgressLinear");
        sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: monitor});
        expect(response.data.content.getElement().textContent).toContain("componentChartMetricGauge");
        sidebar.data.methods.SELECT_ITEM(new Event("click"), {ITEM: progress});
        expect(response.data.content.getElement().textContent).toContain("componentProgressLinear");
        expect(response.data.content.getElement().textContent).not.toContain("componentIframe");
    });
});
