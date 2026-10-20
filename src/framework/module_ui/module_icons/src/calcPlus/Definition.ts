import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.calcPlus.name,
    description: Keys.icons.calcPlus.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {
        return [
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "12",
                    y1: "5",
                    x2: "12",
                    y2: "19",
                },
                attrsBind: {
                    stroke: context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    "stroke-linecap": "round",
                },
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "5",
                    y1: "12",
                    x2: "19",
                    y2: "12",
                },
                attrsBind: {
                    stroke: context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    "stroke-linecap": "round",
                },
            }),
        ];
    },
};
