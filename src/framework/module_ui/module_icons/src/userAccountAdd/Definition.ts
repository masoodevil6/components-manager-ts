import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.userAccountAdd.name,
    description: Keys.icons.userAccountAdd.description,

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
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx:      "234.26",
                    cy:      "226.26",
                    r:       "61.74",
                    opacity: "0.6"
                },
                attrsBind: {
                    fill: context.secondaryColor
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx:   "234.26",
                    cy:   "226.26",
                    r:    "61.74",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M200.48,235h65c5.52,0,10-4.48,10-10v0c0-5.52-4.48-10-10-10h-65c-5.52,0-10,4.48-10,10v0 C190.48,230.52,194.96,235,200.48,235z"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M224.26,193.76v65c0,5.52,4.48,10,10,10h0c5.52,0,10-4.48,10-10v-65c0-5.52-4.48-10-10-10h0 C228.74,183.76,224.26,188.24,224.26,193.76z"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            })

        ];
    }
};
