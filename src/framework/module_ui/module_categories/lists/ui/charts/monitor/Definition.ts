import type {TCategoryComponentDefinition} from "@/ui_categories";
import {Keys} from "../../../../languages";
import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const Gauge = CreateCategoryComponent<
    UIComponents.Lists.ComponentChartMetricGauge.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentChartMetricGauge.PropsConfigType,
    UIComponents.Lists.ComponentChartMetricGauge.MethodsConfigType<any>
>(UIComponents.Lists.ComponentChartMetricGauge.Definition, UIComponents.Lists.ComponentChartMetricGauge.Component);

export const Definition: TCategoryComponentDefinition = {
    id: "monitor",
    name: Keys.category.components.charts.monitor.name,
    description: Keys.category.components.charts.monitor.description,
    components: [Gauge],
};
