import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.moon.name,
    description:     Keys.icons.moon.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:                "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth ,
                    "fill" :          context.secondaryColor
                }
            })
        ];
    }
};