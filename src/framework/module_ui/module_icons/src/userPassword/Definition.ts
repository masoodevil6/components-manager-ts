import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.userPassword.name,
    description: Keys.icons.userPassword.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "5",
                    y:      "10",
                    width:  "14",
                    height: "10",
                    rx:     "2"
                },
                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M8 10V7a4 4 0 0 1 8 0v3",
                    fill: "none"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth,
                    "stroke-linecap": "round"
                }
            })

        ];
    }
};
