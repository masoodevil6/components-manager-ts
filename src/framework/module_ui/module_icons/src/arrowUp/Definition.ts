import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.arrowUp.name,
    description:     Keys.icons.arrowUp.description,

    viewBoxX:        24,
    viewBoxY:        24,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrsBind: {
                    fill: context.primaryColor
                },
                attrs: {
                    d: "M6 10 L12 4 L18 10 Z"
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "12",
                    y1:               "18",
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