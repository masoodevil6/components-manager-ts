import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentCoinCurrency.name,
    description: Keys.icons.paymentCoinCurrency.description,

    viewBoxX:    208,
    viewBoxY:    240,

    render(context) {

        return [

            CoreReactive.App.svgEllipse({
                attrs: {
                    cx: "103.22",
                    cy: "140.06",
                    rx: "91.05",
                    ry: "94.89"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "103.66",
                    cy: "132.09",
                    r:  "91.05"
                },
                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgEllipse({
                attrs: {
                    cx: "103.65",
                    cy: "112.68",
                    rx: "91.05",
                    ry: "98.01"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "104.09",
                    cy: "101.59",
                    r:  "91.05"
                },
                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "103.5",
                    cy: "101.59",
                    r:  "74.88"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M119.1,90.85c0,0,17.1-25.38-7.27-30.78c-10.39-2.3-22.95,5.47-24.14,17.38c-1.17,11.62,0.57,20.18,14.85,23.53 c12.52,2.93,12.54,2.08,18.66,8.17c10.67,10.61,4.57,25.77-7.13,30.39s-20.51,3.18-29.13-5.72c-10.46-10.8-0.09-22.8-0.09-22.8",
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1: "106.09",
                    y1: "45.2",
                    x2: "106.44",
                    y2: "60.04",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1: "103.3",
                    y1: "143.15",
                    x2: "103.65",
                    y2: "157.99",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
