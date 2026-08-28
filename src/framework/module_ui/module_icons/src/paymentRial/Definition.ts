import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {

    title:       Keys.icons.paymentRial.name,
    description: Keys.icons.paymentRial.description,

    viewBoxX:    275,
    viewBoxY:    275,

    render(context) {

        return [

            // Main background
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "137.33",
                    cy: "135.94",
                    r:  "126.5"
                },
                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Inner circle
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:      "136.45",
                    cy:      "136.07",
                    r:       "99.62",
                    fill:    "none",
                    opacity: "0.6"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),



            // R border layer
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M71.02,172.35v-67.27h25.14c5.05,0,8.89,0.6,11.52,1.81c2.63,1.21,4.73,3.34,6.3,6.4c1.57,3.06,2.36,6.44,2.36,10.14c0,4.77-1.3,8.79-3.91,12.07c-2.6,3.27-6.63,5.35-12.06,6.24c1.98,1.13,3.49,2.25,4.52,3.35c2.19,2.39,4.27,5.37,6.23,8.95l9.86,18.31h-9.44l-7.5-14c-2.19-4.04-4-7.13-5.41-9.27c-1.42-2.14-2.69-3.64-3.81-4.5c-1.12-0.86-2.26-1.45-3.42-1.79c-0.85-0.21-2.24-0.32-4.18-0.32h-8.7v29.87H71.02z M78.52,134.77h16.12c3.43,0,6.11-0.42,8.04-1.26c1.93-0.84,3.4-2.19,4.41-4.04c1.01-1.85,1.51-3.86,1.51-6.03c0-3.18-0.97-5.8-2.92-7.85c-1.95-2.05-5.02-3.07-9.22-3.07H78.52V134.77z"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // I border layer
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M127.24,114.58v-9.5h6.96v9.5H127.24z M127.24,172.35v-48.73h6.96v48.73H127.24z"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // A border layer
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M171.6,166.34c-2.58,2.6-5.06,4.44-7.44,5.51c-2.38,1.07-4.94,1.61-7.68,1.61c-4.51,0-7.98-1.31-10.4-3.92c-2.42-2.62-3.64-5.96-3.64-10.03c0-2.39,0.46-4.57,1.37-6.54c0.91-1.97,2.11-3.56,3.6-4.75c1.48-1.19,3.15-2.09,5.01-2.71c1.37-0.43,3.43-0.84,6.19-1.24c5.62-0.79,9.76-1.74,12.41-2.84c0.03-1.13,0.04-1.85,0.04-2.16c0-3.37-0.66-5.74-1.97-7.11c-1.78-1.87-4.42-2.8-7.93-2.8c-3.27,0-5.69,0.68-7.25,2.04c-1.56,1.36-2.71,3.77-3.46,7.23l-6.81-1.1c0.62-3.46,1.64-6.25,3.06-8.37c1.42-2.13,3.47-3.76,6.15-4.91c2.68-1.15,5.79-1.72,9.32-1.72c3.5,0,6.35,0.49,8.55,1.47c2.19,0.98,3.8,2.21,4.83,3.69c1.03,1.48,1.75,3.36,2.17,5.62c0.23,1.41,0.35,3.95,0.35,7.62v11.01c0,7.68,0.15,12.53,0.45,14.57c0.3,2.04,0.88,3.99,1.76,5.85h-7.27C172.27,170.64,171.8,168.63,171.6,166.34z M171.02,147.89c-2.53,1.22-6.32,2.26-11.37,3.12c-2.86,0.49-4.89,1.04-6.07,1.65c-1.19,0.61-2.1,1.51-2.75,2.68c-0.65,1.18-0.97,2.49-0.97,3.92c0,2.2,0.7,4.04,2.11,5.51c1.4,1.47,3.46,2.2,6.17,2.2c2.68,0,5.07-0.7,7.15-2.09s3.62-3.3,4.6-5.71c0.75-1.87,1.12-4.62,1.12-8.26V147.89z"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // L border layer
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M188.69,172.35v-67.27h6.96v67.27H188.69z"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Light reflection
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z",
                    opacity: "0.4",
                    fill:    "#fff"
                }
            })

        ];
    }

};