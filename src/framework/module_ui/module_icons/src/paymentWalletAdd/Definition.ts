import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentWalletAdd.name,
    description: Keys.icons.paymentWalletAdd.description,

    viewBoxX:    216,
    viewBoxY:    200,

    render(context) {

        return [

            // Wallet flap shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M164.39,156.99c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L164.39,156.99z",
                    opacity: "0.4",
                    fill:    "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Wallet body shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M36.18,141.61v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H56.18 c-11.05,0-20,8.95-20,20v24.72",
                    opacity: "0.2"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Wallet body outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M36.18,141.61v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H56.18 c-11.05,0-20,8.95-20,20v24.72",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Wallet top line
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "39.18",
                    y1: "102.96",
                    x2: "205.54",
                    y2: "102.96",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Wallet bottom line
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "39.18",
                    y1: "168.51",
                    x2: "205.54",
                    y2: "168.51",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Wallet flap
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M164.39,152.12c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L164.39,152.12z"
                },
                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Wallet button circle
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:   "171.31",
                    cy:   "136.25",
                    r:    "7.77",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Plus icon background
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M8.57,145.15c1.65,4.59,11.06,18.67,26.83,18.59C50.08,163.66,64.12,151.46,64.12,135.09 c0-15.82-12.83-28.65-28.65-28.65c-12.93,0-23.43,9.34-27.1,19.33"
                },
                attrsBind: {
                    fill: context.secondaryColor
                }
            }),

            // Plus icon outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M8.56,145.15c4.07,10.87,14.55,18.61,26.84,18.61c15.82,0,28.65-12.83,28.65-28.65s-12.83-28.65-28.65-28.65 c-12.55,0-23.21,8.07-27.09,19.3",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Plus horizontal bar
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M21.7,141.18H49.6c2.76,0,5-2.24,5-5V134c0-2.76-2.24-5-5-5H21.7c-2.76,0-5,2.24-5,5v2.18 C16.7,138.94,18.94,141.18,21.7,141.18z"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Plus vertical bar
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M29.56,121.74v27.89c0,2.76,2.24,5,5,5h2.18c2.76,0,5-2.24,5-5v-27.89c0-2.76-2.24-5-5-5h-2.18 C31.8,116.74,29.56,118.98,29.56,121.74z"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Card shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M170.55,77.01c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07L137.49,9.42 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C102.83,76.75,170.55,77.01,170.55,77.01z",
                    opacity: "0.2"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Card outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M170.55,79.06c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C102.83,78.8,170.55,79.06,170.55,79.06z",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Card inner
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M151.39,79.07L162,66.69c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C108.79,77.76,151.39,79.07,151.39,79.07z"
                },
                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Card hole
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M110.6,74.61c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75s-5.26-11.75-11.75-11.75 S110.6,68.12,110.6,74.61z",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
