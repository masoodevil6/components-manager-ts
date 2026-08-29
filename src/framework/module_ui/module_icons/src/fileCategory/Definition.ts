import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.fileCategory.name,
    description: Keys.icons.fileCategory.description,

    viewBoxX:    379 ,
    viewBoxY:    344 ,

    render(context) {

        return [
            /// Top diamond shape
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M280.32,131.68c8.11-8.11,8.05-21.32-0.14-29.51l-75.85-74.85c-8.19-8.19-21.4-8.25-29.51-0.14l-75.13,75.13 c-8.11,8.11-8.05,21.32,0.14,29.51L280.32,131.68z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Right circle shape
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:       "286.36" ,
                    cy:       "246.5" ,
                    r:        "75"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Bottom-left square shape
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M38.64,321.5h110c11.05,0,20-8.95,20-20v-110c0-11.05-8.95-20-20-20h-110c-11.05,0-20,8.95-20,20v110 C18.64,312.55,27.6,321.5,38.64,321.5z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};