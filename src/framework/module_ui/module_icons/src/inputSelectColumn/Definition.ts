import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.inputSelectColumn.name,
    description: Keys.icons.inputSelectColumn.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            /// First column - background fill
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "3" ,
                    y:        "4" ,
                    width:    "4" ,
                    height:   "16" ,
                    rx:       "0.8" ,
                    opacity:  "0.25"
                },
                attrsBind: {
                    fill:  context.secondaryColor
                }
            }),
            /// First column - border
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "3" ,
                    y:        "4" ,
                    width:    "4" ,
                    height:   "16" ,
                    rx:       "0.8" ,
                    fill:     "none"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Middle column (selected) - background fill
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "10" ,
                    y:        "3" ,
                    width:    "4" ,
                    height:   "18" ,
                    rx:       "0.8" ,
                    opacity:  "0.75"
                },
                attrsBind: {
                    fill:  context.secondaryColor
                }
            }),
            /// Middle column (selected) - border
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "10" ,
                    y:        "3" ,
                    width:    "4" ,
                    height:   "18" ,
                    rx:       "0.8" ,
                    fill:     "none"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Third column - background fill
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "17" ,
                    y:        "4" ,
                    width:    "4" ,
                    height:   "16" ,
                    rx:       "0.8" ,
                    opacity:  "0.25"
                },
                attrsBind: {
                    fill:  context.secondaryColor
                }
            }),
            /// Third column - border
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "17" ,
                    y:        "4" ,
                    width:    "4" ,
                    height:   "16" ,
                    rx:       "0.8" ,
                    fill:     "none"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};