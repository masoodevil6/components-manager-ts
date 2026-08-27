import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UtilStyle      from "@/util_styles";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.timeClock.name,
    description: Keys.icons.timeClock.description,

    viewBoxX:    313 ,
    viewBoxY:    346 ,

    render(context) {

        return [

            // Background
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:      "158.07",
                    cy:      "172.22",
                    r:       "140",
                    opacity: "0.6"
                },

                attrsBind: {
                    fill:     context.secondaryColor
                }
            }),

            // Clock border
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "158.07",
                    cy: "172.22",
                    r:  "140",
                    fill: "none"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Hour hand
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M156.57,172.22h3c2.76,0,5-2.24,5-5V51.72c0-2.76-2.24-5-5-5h-3c-2.76,0-5,2.24-5,5v115.5C151.57,169.98,153.81,172.22,156.57,172.22z"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Minute hand
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M217.64,251.33l2.4-1.8c2.21-1.65,2.66-4.79,1.01-7l-58.07-77.65c-1.65-2.21-4.79-2.66-7-1.01l-2.4,1.8c-2.21,1.65-2.66,4.79-1.01,7l58.07,77.65C212.29,252.53,215.43,252.98,217.64,251.33z"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Top-left bell
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M127.07,35.45C119.06,18.52,101.83,6.8,81.85,6.8c-27.61,0-50,22.39-50,50c0,12.53,4.62,23.97,12.23,32.75C63.91,62.51,93.19,42.85,127.07,35.45z"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Top-right bell
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M272.49,92.96c9.54-9.11,15.49-21.94,15.49-36.16c0-27.61-22.39-50-50-50c-20.45,0-38.02,12.28-45.77,29.86C225.3,45.22,253.64,65.57,272.49,92.96z"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Bottom
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M218.87,296.44c-17.72,6.99-37.88,10.95-59.26,10.95s-41.54-3.96-59.26-10.95c-39.08,3.8-65.63,11.25-65.63,19.82c0,12.43,55.91,22.51,124.89,22.51s124.89-10.08,124.89-22.51C284.49,307.7,257.94,300.25,218.87,296.44z"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            })

        ];
    }
};