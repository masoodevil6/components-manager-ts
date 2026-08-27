import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:            Keys.icons.isFalse.name,
    description:      Keys.icons.isFalse.description,

    viewBoxX:         24 ,
    viewBoxY:         24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M6 18L18 6M6 6l12 12",
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