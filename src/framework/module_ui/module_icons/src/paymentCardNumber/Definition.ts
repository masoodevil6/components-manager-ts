import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentCardNumber.name,
    description: Keys.icons.paymentCardNumber.description,

    viewBoxX:    316,
    viewBoxY:    221,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M271.25,138.17c-22.09,0-40,17.91-40,40c0,22.09,17.91,40,40,40s40-17.91,40-40 C311.25,156.08,293.34,138.17,271.25,138.17z M289.73,174.17h-6.51l-2.36,8.06h6.87c2.22,0,4.03,1.8,4.03,4.03v0 c0,2.22-1.8,4.03-4.03,4.03h-9.22l-1.69,5.78c-0.62,2.14-2.86,3.36-5,2.74h0c-2.14-0.62-3.36-2.86-2.74-5l1.03-3.52h-5.73 l-1.69,5.78c-0.62,2.14-2.86,3.36-5,2.74h0c-2.14-0.62-3.36-2.86-2.74-5l1.03-3.52h-3.21c-2.22,0-4.03-1.8-4.03-4.03v0 c0-2.22,1.8-4.03,4.03-4.03h5.56l2.36-8.06h-5.92c-2.22,0-4.03-1.8-4.03-4.03s1.8-4.03,4.03-4.03h8.27l1.71-5.85 c0.62-2.14,2.86-3.36,5-2.74c2.14,0.62,3.36,2.86,2.74,5l-1.05,3.59h5.73l1.71-5.85c0.62-2.14,2.86-3.36,5-2.74 c2.14,0.62,3.36,2.86,2.74,5l-1.05,3.59h4.16c2.22,0,4.03,1.8,4.03,4.03S291.95,174.17,289.73,174.17z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPolygon({
                attrs: {
                    points: "266.73,182.23 272.47,182.23 274.82,174.17 269.09,174.17"
                },
                attrsBind: {
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M260.25,6.17h-234c-11.05,0-20,8.95-20,20v140c0,11.05,8.95,20,20,20h194c0-33.14,26.86-60,60-60v-100 C280.25,15.12,271.3,6.17,260.25,6.17z M63.04,15.21c19.33,0,35,15.67,35,35c0,19.33-15.67,35-35,35s-35-15.67-35-35 C28.04,30.88,43.71,15.21,63.04,15.21z M232.67,111.41c0,5.44-4.41,9.85-9.85,9.85H37.89c-5.44,0-9.85-4.41-9.85-9.85v0 c0-5.44,4.41-9.85,9.85-9.85h184.93C228.26,101.56,232.67,105.97,232.67,111.41L232.67,111.41z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPolygon({
                attrs: {
                    points: "56.6,68.24 68.73,68.24 68.73,42.17 83.34,42.17 83.34,31.56 42.41,31.56 42.41,42.17 56.6,42.17"
                },
                attrsBind: {
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
