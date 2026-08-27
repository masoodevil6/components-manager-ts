import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.arrowChevronUp.name,
    description:     Keys.icons.arrowChevronUp.description,

    viewBoxX:        24,
    viewBoxY:        24,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M6 15l6-6 6 6",
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