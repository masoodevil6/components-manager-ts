import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.fileFilter.name,
    description: Keys.icons.fileFilter.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:                 "M4 4h16l-6 7v6l-4 3v-9L4 4z",
                    fill:              context.secondaryColor,
                    stroke:            context.primaryColor,
                    "stroke-width":    context.strokeWidth,
                    "stroke-linecap":  "round",
                    "stroke-linejoin": "round"
                }
            })

        ];
    }
};