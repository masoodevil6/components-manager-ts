import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.visit.name,
    description:     Keys.icons.visit.description,

    viewBoxX:        24 ,
    viewBoxY:        24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.041-3.362M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8M17.94 17.94A9.969 9.969 0 0021.542 12a9.97 9.97 0 00-4.133-5.868",
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