import type {TCategoryComponentDefinition} from "@/ui_categories";
import {Keys} from "../../../languages";
import {Definition as ProgressDefinition} from "./progress";
import {Definition as MonitorDefinition} from "./monitor";

export const Definition: TCategoryComponentDefinition = {
    id: "charts",
    name: Keys.category.components.charts.name,
    description: Keys.category.components.charts.description,
    components: [],
    children: [ProgressDefinition, MonitorDefinition],
};
