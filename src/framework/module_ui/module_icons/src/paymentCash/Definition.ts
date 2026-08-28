import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentCash.name,
    description: Keys.icons.paymentCash.description,

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

            // Cash shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M64.99,120.71l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05l-96.6-76.89c-4.32-3.44-10.61-2.73-14.05,1.6L63.4,106.66C59.96,110.98,60.67,117.27,64.99,120.71z",
                    opacity: "0.6"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Cash bottom shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M208.02,154.32c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1s-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83C213.06,164.05,212.34,157.76,208.02,154.32",
                    opacity: "0.6"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Cash outer border
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M64.99,120.71l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05l-96.6-76.89c-4.32-3.44-10.61-2.73-14.05,1.6L63.4,106.66C59.96,110.98,60.67,117.27,64.99,120.71z",
                    fill: "none"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Cash paper
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M81.84,123.59l74.18,58.62c2.24,1.78,4.88-2.55,9.31-2.92c4.13-0.34,8.08,4.41,9.74,2.33l20.58-25.4c1.72-2.16-5.1-6.81-5.89-11.36s4.45-8.98,2.29-10.7l-71.18-55.62c-2.23-1.78-5.87,3.82-10.29,4.45c-4.14,0.58-9.1-3.94-10.76-1.85l-19.58,23.4c-1.72,2.16,3.6,6.06,3.89,9.86C84.42,118.18,79.68,121.87,81.84,123.59z"
                },

                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Left mark
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "105.57",
                    cy: "106.07",
                    r:  "6.35"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Right mark
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "169.13",
                    cy: "156.25",
                    r:  "6.35"
                },

                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Cash center ellipse
            CoreReactive.App.svgEllipse({
                attrs: {
                    cx:   "137.05",
                    cy:   "131.81",
                    rx:   "22.23",
                    ry:   "22.74",
                    fill: "none"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Currency symbol
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M142.27,132.04c0,0,7.92-2.25,4-8.2c-1.67-2.54-5.56-3.27-7.91-0.88c-2.29,2.33-3.46,4.56-1.2,8.08c1.98,3.09,2.14,2.91,2.28,5.44c0.25,4.42-3.65,6.57-6.81,5.31s-4.66-3.3-4.81-6.95c-0.18-4.42,4.02-5.04,4.02-5.04",
                    fill: "none"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Currency line 1
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "147.36",
                    y1: "119.05",
                    x2: "144.8",
                    y2: "122.39"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Currency line 2
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "129.85",
                    y1: "140.48",
                    x2: "127.29",
                    y2: "143.81"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Cash lower outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M209.42,154.32c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1s-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83C214.46,164.05,213.74,157.76,209.42,154.32",
                    fill: "none"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Highlight
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z",
                    opacity: "0.4"
                },

                attrsBind: {
                    fill: context.secondaryColor
                }
            })

        ];
    }
};