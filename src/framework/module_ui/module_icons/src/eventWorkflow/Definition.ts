import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.eventWorkflow.name,
    description: Keys.icons.eventWorkflow.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgRect({
                attrs: {x: "8", y: "2.5", width: "8", height: "5", rx: "1.5"},
                attrsBind: {fill: "none", stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
            CoreReactive.App.svgRect({
                attrs: {x: "2.5", y: "15.5", width: "8", height: "5", rx: "1.5"},
                attrsBind: {fill: "none", stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
            CoreReactive.App.svgRect({
                attrs: {x: "13.5", y: "15.5", width: "8", height: "5", rx: "1.5"},
                attrsBind: {fill: "none", stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M12 7.5v3M6.5 10.5h11M6.5 10.5v5M17.5 10.5v5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                },
                attrsBind: {fill: "none", stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
        ];
    },
};
