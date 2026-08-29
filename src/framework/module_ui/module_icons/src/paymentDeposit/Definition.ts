import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentDeposit.name,
    description: Keys.icons.paymentDeposit.description,

    viewBoxX:    350.91,
    viewBoxY:    358.26,

    render(context) {

        return [

            // ---- Layer_4: Ground lines ----

            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M321.66,349.33c7.96,0.01,15.33,0.02,15.33,0.02l0,0c3.46,0,6.91,0.01,10.37,0.01",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M34.84,348.92c1.74,0,279.26,0.39,279.3,0.39",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M3.55,348.87c4.67,0.01,9.35,0.01,14.02,0.02",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // ---- Layer_1: Wallet ----

            // Wallet flap shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M142.99,316.64c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L142.99,316.64z",
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
                    d:       "M152.66,238.47c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,238.21,152.66,238.47,152.66,238.47z",
                    opacity: "0.2"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Wallet body fill shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72",
                    opacity: "0.2"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Wallet body outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M14.78,301.26v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72",
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
                    x1: "17.78",
                    y1: "262.61",
                    x2: "184.14",
                    y2: "262.61",
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
                    x1: "17.78",
                    y1: "328.17",
                    x2: "184.14",
                    y2: "328.17",
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
                    d: "M142.99,311.78c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L142.99,311.78z"
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
                    cx:   "149.91",
                    cy:   "295.91",
                    r:    "7.77",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Card shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M152.66,240.51c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,240.26,152.66,240.51,152.66,240.51z",
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
                    d: "M133.5,240.53l10.6-12.38c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C90.9,239.21,133.5,240.53,133.5,240.53z"
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
                    d:    "M92.71,236.06c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75c0-6.49-5.26-11.75-11.75-11.75 S92.71,229.58,92.71,236.06z",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // ---- Layer_2: Bill/Document ----

            // Bill shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M131.44,70.38l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05 L179.58,9.9c-4.32-3.44-10.61-2.73-14.05,1.6l-35.69,44.83C126.4,60.65,127.12,66.94,131.44,70.38z",
                    opacity: "0.2"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Bill holder shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M327.18,118.34l-25.09,34.76c-1.62,2.24-1.11,5.36,1.13,6.98l5.94,4.29c2.24,1.62,5.36,1.11,6.98-1.13 l25.09-34.76c1.62-2.24,1.11-5.36-1.13-6.98l-5.94-4.29C331.92,115.6,328.79,116.1,327.18,118.34z",
                    opacity: "0.2"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Bill lower shadow
            CoreReactive.App.svgPath({
                attrs: {
                    d:       "M274.47,103.99c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1 c-5.06-4.03-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83 C279.5,113.72,278.79,107.42,274.47,103.99",
                    opacity: "0.2"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Bill outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M131.44,70.38l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05 L179.58,9.9c-4.32-3.44-10.61-2.73-14.05,1.6l-35.69,44.83C126.4,60.65,127.12,66.94,131.44,70.38z",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Bill paper
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M148.29,73.25l74.18,58.62c2.24,1.78,4.88-2.55,9.31-2.92c4.13-0.34,8.08,4.41,9.74,2.33l20.58-25.4 c1.72-2.16-5.1-6.81-5.89-11.36c-0.79-4.54,4.45-8.98,2.29-10.7l-71.18-55.62c-2.23-1.78-5.87,3.82-10.29,4.45 c-4.14,0.58-9.1-3.94-10.76-1.85l-19.58,23.4c-1.72,2.16,3.6,6.06,3.89,9.86C150.87,67.85,146.13,71.53,148.29,73.25z"
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
                    cx: "172.01",
                    cy: "55.74",
                    r:  "6.35"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Right mark
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "235.58",
                    cy: "105.92",
                    r:  "6.35"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // Center ellipse
            CoreReactive.App.svgEllipse({
                attrs: {
                    cx:   "203.49",
                    cy:   "81.47",
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
                    d:    "M208.72,81.71c0,0,7.92-2.25,4-8.2c-1.67-2.54-5.56-3.27-7.91-0.88c-2.29,2.33-3.46,4.56-1.2,8.08 c1.98,3.09,2.14,2.91,2.28,5.44c0.25,4.42-3.65,6.57-6.81,5.31c-3.16-1.26-4.66-3.3-4.81-6.95c-0.18-4.42,4.02-5.04,4.02-5.04",
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
                    x1: "213.8",
                    y1: "68.72",
                    x2: "211.24",
                    y2: "72.05",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Currency line 2
            CoreReactive.App.svgLine({
                attrs: {
                    x1: "196.29",
                    y1: "90.14",
                    x2: "193.73",
                    y2: "93.48",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Bill lower outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M275.87,103.99c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1 c-5.06-4.03-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83 C280.9,113.72,280.19,107.42,275.87,103.99",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Hand detail
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M323.6,121.25c0,0-10.59-17.67-18.42-27.02s-30.29-27.54-34.59-28.55s-16.44,2.02-16.44,2.02l22.48,18.44 c0,0,1.77,0.51,5.05,2.02c3.28,1.52,26.02,24.51,26.02,24.51S286.12,86,277.13,86.66c-13.63,1-19.46-1.94-26.02-1.16 c-4.54,0.54-6.33,7.46-0.52,9.23c5.81,1.77,16.44,1.52,21.49,4.8c5.05,3.28,1.75,7.32,5.05,13.64c3.3,6.32,13.64,16.68,13.64,16.68 l-11.35-11.36l-11.39,14.89c0,0,9.85,10.36,14.65,11.62c4.8,1.26,22.99,2.53,22.99,2.53L323.6,121.25z",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Bill holder outline
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M327.18,118.34l-25.09,34.76c-1.62,2.24-1.11,5.36,1.13,6.98l5.94,4.29c2.24,1.62,5.36,1.11,6.98-1.13 l25.09-34.76c1.62-2.24,1.11-5.36-1.13-6.98l-5.94-4.29C331.92,115.6,328.79,116.1,327.18,118.34z",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // ---- Layer_3: Deposit arrow ----

            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M202.57,315.81l39.42,3.73l-11.27-6.88c0,0,46.18-3.76,73.03-51.57c12.66-22.53,18.97-50.12,20.03-55.03 c4.54-0.79,8.39-4.21,9.5-8.98c1.48-6.36-2.48-12.72-8.84-14.2s-12.72,2.48-14.2,8.84c-1.27,5.45,1.46,10.89,6.27,13.27 c-1.74,7.52-6.64,26.05-16.74,47.56c-22.94,48.82-72.63,52.96-72.63,52.96l3.15-11.98L202.57,315.81z",
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
