import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.zoomIn.name,
    description:     Keys.icons.zoomIn.description,

    viewBoxX:        24 ,
    viewBoxY:        24 ,

    render(context) {

        return [
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:               "11",
                    cy:               "11",
                    r:                "8"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    "fill" :          context.secondaryColor
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "21",
                    y1:               "21",
                    x2:               "16.65",
                    y2:               "16.65"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }) ,
            CoreReactive.App.svgLine({
                attrs: {
                    x1:              "11",
                    y1:              "8",
                    x2:              "11",
                    y2:              "14"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:              "8",
                    y1:              "11",
                    x2:              "14",
                    y2:              "11"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth
                }
            })
        ];
    }
};