import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.arrowRight.name,
    description:     Keys.icons.arrowRight.description,

    viewBoxX:        24 ,
    viewBoxY:        24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrsBind: {
                    fill: context.primaryColor
                },
                attrs: {
                    d: "M10 6 L16 12 L10 18 Z"
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "2",
                    y1:               "12",
                    x2:               "8",
                    y2:               "12",
                    "stroke-linecap": "round"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};