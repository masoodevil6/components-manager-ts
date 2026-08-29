import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.userAccount.name,
    description: Keys.icons.userAccount.description,

    viewBoxX:    300,
    viewBoxY:    300,

    render(context) {

        return [

            CoreReactive.App.svgCircle({
                attrs: {
                    cx:      "151.75",
                    cy:      "150.25",
                    r:       "140",
                    opacity: "0.6"
                },
                attrsBind: {
                    fill: context.secondaryColor
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx:   "151.75",
                    cy:   "150.25",
                    r:    "140",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgEllipse({
                attrs: {
                    cx: "152.2",
                    cy: "109.52",
                    rx: "60",
                    ry: "55"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            })

        ];
    }
};
