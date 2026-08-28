import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:           Keys.icons.delete_.name,
    description:     Keys.icons.delete_.description,

    viewBoxX:        24,
    viewBoxY:        24,

    render(context) {

        return [

            // Trash lid
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M9 3h6l1 2h4v2H4V5h4l1-2z",
                    "stroke-linejoin": "round"
                },

                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),


            // Trash body
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M6 7h12l-1 13H7L6 7z",
                    "stroke-linejoin": "round"
                },

                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),


            // Trash lines
            CoreReactive.App.svgPath({
                attrs: {
                    d:                "M10 10v8M14 10v8",
                    "stroke-linecap": "round"
                },

                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];

    }

};