import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.userEmail1.name,
    description: Keys.icons.userEmail1.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "2",
                    y:      "5",
                    width:  "20",
                    height: "14",
                    rx:     "2"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    fill:           context.secondaryColor
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M3 7.5L12 13L21 7.5"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
