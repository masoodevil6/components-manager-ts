import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";
import * as UtilStyle from "@/util_styles";


export const Definition: IconDefinition = {

    title:           Keys.icons.print.name,
    description:     Keys.icons.print.description,

    viewBoxX:        350,
    viewBoxY:        205,

    render(context) {

        return [

            // Printer body
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M327.75,80.75h-77c-5.52,0-10,4.48-10,10v5.21c0,5.41-4.39,9.79-9.79,9.79H118.62c-5.45,0-9.87-4.42-9.87-9.87v-5.13c0-5.52-4.48-10-10-10h-77c-5.52,0-10,4.48-10,10v135c0,5.52,4.48,10,10,10h77c5.52,0,10-4.48,10-10l7-20.03c0-8.27-0.3-14.97,7.97-14.97h100.87c8.92,0,7.16,7.23,7.16,16.16l9,18.84c0,5.52,4.48,10,10,10h77c5.52,0,10-4.48,10-10v-135C337.75,85.22,333.27,80.75,327.75,80.75zM315.03,105.83c3.28,0,5.94,2.66,5.94,5.94s-2.66,5.94-5.94,5.94c-3.28,0-5.94-2.66-5.94-5.94S311.75,105.83,315.03,105.83zM315.03,139.96c-3.94,0-7.14-3.2-7.14-7.14s3.2-7.14,7.14-7.14c3.94,0,7.14,3.2,7.14,7.14S318.97,139.96,315.03,139.96z"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),


            // Paper
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M125.73,101.29h99.16c6.24,0,11.3-3,11.3-6.69V16.54c0-3.7-5.06-6.69-11.3-6.69h-84.14c-3.14,0-6.13,0.77-8.27,2.13l-15.02,16.54c-1.95,1.24-3.03,10.87-3.03,12.56V94.6C114.42,98.3,119.48,101.29,125.73,101.29z"
                },

                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),


            // Folded paper corner
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M130.22,11.98L115.2,28.53c-1.39,0.88-2.34,6.04-2.77,9.54h21.22c5.85,0,10.57-4.76,10.53-10.61l-0.14-17.6h-5.55C135.35,9.85,132.36,10.62,130.22,11.98z"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),


            // Output paper
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M129.94,197.43h85.72c2.74,0,5.25,1.63,6.48,4.2l28.84,60.58c2.41,5.06-1.09,11-6.48,11H108.93c-5.03,0-8.52-5.25-6.8-10.21l21.01-60.58C124.18,199.43,126.89,197.43,129.94,197.43z"
                },

                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),


            // Output paper line 1
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "236.19",
                    y1: "258.44",
                    x2: "116.97",
                    y2: "258.44"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),


            // Output paper line 2
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "223.59",
                    y1: "240.75",
                    x2: "127.31",
                    y2: "240.75"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),


            // Output paper line 3
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "212.98",
                    y1: "225.47",
                    x2: "136.18",
                    y2: "225.47"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];

    }

};