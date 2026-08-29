import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.fileClearBroom.name,
    description: Keys.icons.fileClearBroom.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M15 2L9 14"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    fill:             "none",
                    "stroke-linecap": "round"
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M8 14c-1 2-2 4-2 6h12c0-2-1-4-2-6H8z"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    fill:             context.secondaryColor,
                    "stroke-linejoin": "round"
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M7 20h10"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    fill:             "none",
                    "stroke-linecap": "round"
                }
            })
        ];
    }
};