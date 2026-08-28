import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:           Keys.icons.edit.name,
    description:     Keys.icons.edit.description,

    viewBoxX:        24,
    viewBoxY:        24,

    render(context) {

        return [

            // Pencil body
            CoreReactive.App.svgPath({
                attrs: {
                    d:                "M3 17.25V21h3.75L17.81 9.94a1 1 0 0 0 0-1.41L15.47 6.19a1 1 0 0 0-1.41 0L3 17.25z",
                    "stroke-linejoin": "round"
                },

                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),


            // Pencil separator line
            CoreReactive.App.svgPath({
                attrs: {
                    d:              "M14.06 7.02l2.92 2.92",
                    "stroke-linecap": "round"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];

    }

};