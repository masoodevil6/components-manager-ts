import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.timeCalender.name,
    description: Keys.icons.timeCalender.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [

            // Calendar body
            CoreReactive.App.svgRect({
                attrs: {
                    x:             "3",
                    y:             "4",
                    width:         "18",
                    height:        "18",
                    rx:            "2",
                    ry:            "2",
                    "stroke-linecap":  "round",
                    "stroke-linejoin": "round"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    fill:           context.secondaryColor
                }
            }),

            // Right binding
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "16",
                    y1: "2",
                    x2: "16",
                    y2: "6"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    "stroke-linecap": "round"
                }
            }),

            // Left binding
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "8",
                    y1: "2",
                    x2: "8",
                    y2: "6"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    "stroke-linecap": "round"
                }
            }),

            // Header separator
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "3",
                    y1: "10",
                    x2: "21",
                    y2: "10"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    "stroke-linecap": "round"
                }
            })

        ];
    }
};