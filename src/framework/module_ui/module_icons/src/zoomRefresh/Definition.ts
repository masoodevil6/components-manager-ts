import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.zoomRefresh.name,
    description:     Keys.icons.zoomRefresh.description,

    viewBoxX:        24 ,
    viewBoxY:        24 ,

    render(context) {

        return [
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:               "11",
                    cy:               "11",
                    r:                "7"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    "fill" :          context.secondaryColor
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "16.65",
                    y1:               "16.65",
                    x2:               "21",
                    y2:               "21"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M10 8H8v2 M12 8h2v2 M8 12v2h2 M14 12v2h-2"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};