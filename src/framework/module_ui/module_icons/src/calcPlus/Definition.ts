import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.calcDivide.name,
    description: Keys.icons.calcDivide.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "12",
                    cy: "6",
                    r:  "1.5"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1: "7",
                    y1: "12",
                    x2: "17",
                    y2: "12"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    "stroke-linecap": "round"
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "12",
                    cy: "18",
                    r:  "1.5"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            })
        ];
    }
};