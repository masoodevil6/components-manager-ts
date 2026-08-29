import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.inputSelectOption.name,
    description: Keys.icons.inputSelectOption.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            /// Select box
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "3" ,
                    y:        "7" ,
                    width:    "18" ,
                    height:   "10" ,
                    rx:       "2"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Chevron down arrow
            CoreReactive.App.svgPath({
                attrs: {
                    d:                       "M9 11l3 3 3-3" ,
                    fill:                    "none" ,
                    "stroke-linecap":        "round" ,
                    "stroke-linejoin":       "round" ,
                    "stroke-width":          "1.8"
                },
                attrsBind: {
                    stroke:  context.primaryColor
                }
            })
        ];
    }
};