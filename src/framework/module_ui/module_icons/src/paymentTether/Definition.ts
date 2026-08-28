import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {

    title:       Keys.icons.paymentTether.name,
    description: Keys.icons.paymentTether.description,

    viewBoxX:    275,
    viewBoxY:    275,

    render(context) {

        return [

            // Main background
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "140.3",
                    cy: "137.75",
                    r:  "126.5"
                },
                attrsBind: {
                    fill:            context.secondaryColor,
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth
                }
            }),

            // Inner circle
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:      "139.42",
                    cy:      "137.88",
                    r:       "99.62",
                    fill:    "none",
                    opacity: "0.6"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth
                }
            }),

            // Left horizontal symbol
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M130.33,92.81h-19.28v-6.1c0-3.74-3.92-6.78-8.77-6.78h-4.09c-4.84,0-8.77,3.03-8.77,6.78v28.92c0,3.74,3.92,6.78,8.77,6.78h4.09c4.84,0,8.77-3.03,8.77-6.78v-6.1h19.28c4.84,0,8.77-3.03,8.77-6.78v-3.16C139.09,95.84,135.17,92.81,130.33,92.81z",
                    transform: "translate(-4 -8)"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth
                }
            }),

            // Right horizontal symbol
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M148.04,109.83l19.48-0.18l0.06,6.1c0.04,3.74,4.03,6.74,8.92,6.69l4.13-0.04c4.89-0.05,8.83-3.12,8.79-6.86l-0.27-28.91c-0.04-3.74-4.03-6.74-8.92-6.69l-4.13,0.04c-4.89,0.05-8.83,3.12-8.79,6.86l0.06,6.1l-19.48,0.18c-4.89,0.05-8.83,3.12-8.79,6.86l0.03,3.16C139.16,106.88,143.15,109.88,148.04,109.83z",
                    transform: "translate(4 -8)"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth
                }
            }),

            // Main T symbol
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M164.11,197.52h-15.96V109.4c0-3.74-3.03-6.78-6.78-6.78h-4.52c-3.74,0-6.78,3.03-6.78,6.78v88.12h-15.96c-3.74,0-6.78,3.03-6.78,6.78v4.52c0,3.74,3.03,6.78,6.78,6.78h22.74h4.52h22.74c3.74,0,6.78-3.03,6.78-6.78v-4.52C170.89,200.55,167.85,197.52,164.11,197.52z" ,
                    transform: "translate(0 4)"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Bottom ellipse
            CoreReactive.App.svgPath({
                attrs: {
                    d:    "M162.54,136.44c24.26,1.79,41.49,6.3,41.49,11.59c0,6.85-28.93,12.41-64.61,12.41s-64.61-5.56-64.61-12.41c0-5.51,18.7-10.18,44.57-11.8",
                    fill: "none"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth
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