import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.arrowDoubleLeft.name,
    description:     Keys.icons.arrowDoubleLeft.description,

    viewBoxX:        24 ,
    viewBoxY:        24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M20 8l-6 4 6 4",
                    "stroke-linecap":  "round",
                    "stroke-linejoin": "round"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M14 8l-6 4 6 4",
                    "stroke-linecap":  "round",
                    "stroke-linejoin": "round"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};