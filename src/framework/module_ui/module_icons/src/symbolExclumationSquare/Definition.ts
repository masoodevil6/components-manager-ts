import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.symbolExclumationSquare.name,
    description: Keys.icons.symbolExclumationSquare.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "3",
                    y:      "3",
                    width:  "18",
                    height: "18",
                    rx:     "3",
                    ry:     "3"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    fill:           context.secondaryColor
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M12 7v6M12 17h0",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                    "stroke-linecap": "round"
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "150.49",
                    cy: "225.52",
                    r:  "15"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

        ];
    }
};
