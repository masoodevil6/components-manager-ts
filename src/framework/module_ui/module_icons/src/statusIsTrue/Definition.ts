import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.isTrue.name,
    description:     Keys.icons.isTrue.description,

    viewBoxX:        24 ,
    viewBoxY:        24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M5 13l4 4L19 7",
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