import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.arrowLeft.name,
    description:     Keys.icons.arrowLeft.description,

    viewBoxX:        24 ,
    viewBoxY:        24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrsBind: {
                    fill: context.primaryColor
                },
                attrs: {
                    d: "M14 6 L8 12 L14 18 Z"
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "16",
                    y1:               "12",
                    x2:               "22",
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