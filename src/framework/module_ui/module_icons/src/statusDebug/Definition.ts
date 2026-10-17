import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.debug.name,
    description: Keys.icons.debug.description,
    viewBoxX: 24,
    viewBoxY: 24,

    render(context) {
        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M8 9h8v7a4 4 0 0 1-8 0V9Z",
                    "stroke-linejoin": "round",
                },
                attrsBind: {
                    fill: context.secondaryColor,
                    stroke: context.primaryColor,
                    "stroke-width": context.strokeWidth,
                },
            }),
            CoreReactive.App.svgLine({attrs: {x1: "8", y1: "11", x2: "5", y2: "11"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth, "stroke-linecap": "round"}}),
            CoreReactive.App.svgLine({attrs: {x1: "16", y1: "11", x2: "19", y2: "11"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth, "stroke-linecap": "round"}}),
            CoreReactive.App.svgLine({attrs: {x1: "8", y1: "14", x2: "5", y2: "15"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth, "stroke-linecap": "round"}}),
            CoreReactive.App.svgLine({attrs: {x1: "16", y1: "14", x2: "19", y2: "15"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth, "stroke-linecap": "round"}}),
            CoreReactive.App.svgLine({attrs: {x1: "10", y1: "9", x2: "9", y2: "6"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth, "stroke-linecap": "round"}}),
            CoreReactive.App.svgLine({attrs: {x1: "14", y1: "9", x2: "15", y2: "6"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth, "stroke-linecap": "round"}}),
            CoreReactive.App.svgCircle({attrs: {cx: "10.5", cy: "12", r: "0.8"}, attrsBind: {fill: context.primaryColor}}),
            CoreReactive.App.svgCircle({attrs: {cx: "13.5", cy: "12", r: "0.8"}, attrsBind: {fill: context.primaryColor}}),
        ];
    },
};
