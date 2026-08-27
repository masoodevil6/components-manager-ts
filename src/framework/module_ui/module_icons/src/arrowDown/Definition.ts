import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.arrowDown.name,
    description:     Keys.icons.arrowDown.description,

    viewBoxX:        24,
    viewBoxY:        24,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrsBind: {
                    fill: context.primaryColor
                },
                attrs: {
                    d: "M6 14 L12 20 L18 14 Z"
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "12",
                    y1:               "6",
                    x2:               "12",
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