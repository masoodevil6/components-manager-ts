import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.fileMenu.name,
    description: Keys.icons.fileMenu.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgLine({
                attrs: {
                    x1: "3",
                    y1: "6",
                    x2: "21",
                    y2: "6"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1: "3",
                    y1: "12",
                    x2: "21",
                    y2: "12"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1: "3",
                    y1: "18",
                    x2: "21",
                    y2: "18"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                }
            })

        ];
    }
};
