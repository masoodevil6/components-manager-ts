import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.fileSetting.name,
    description: Keys.icons.fileSetting.description,

    viewBoxX: 24,
    viewBoxY: 24,

    render(context) {

        return [

            // Gear
            CoreReactive.App.svgPath({
                attrs: {
                    d: `
                        M19.43 12.98
                        c0.04 -0.32 0.07 -0.65 0.07 -0.98
                        s-0.02 -0.66 -0.07 -0.98
                        l2.11 -1.65
                        c0.19 -0.15 0.24 -0.42 0.12 -0.64
                        l-2 -3.46
                        c-0.12 -0.22 -0.37 -0.31 -0.6 -0.22
                        l-2.49 1
                        c-0.52 -0.4 -1.08 -0.73 -1.69 -0.98
                        L14.5 2.42
                        C14.47 2.18 14.25 2 14 2
                        h-4
                        c-0.25 0 -0.46 0.18 -0.5 0.42
                        L9.12 5.07
                        c-0.61 0.25 -1.18 0.59 -1.69 0.98
                        l-2.49 -1
                        c-0.23 -0.08 -0.48 0 -0.6 0.22
                        l-2 3.46
                        c-0.13 0.22 -0.07 0.49 0.12 0.64
                        l2.11 1.65
                        c-0.04 0.32 -0.08 0.65 -0.08 0.98
                        s0.03 0.66 0.08 0.98
                        l-2.11 1.65
                        c-0.19 0.15 -0.24 0.42 -0.12 0.64
                        l2 3.46
                        c0.12 0.22 0.37 0.31 0.6 0.22
                        l2.49 -1
                        c0.52 0.4 1.08 0.73 1.69 0.98
                        l0.38 2.65
                        c0.04 0.24 0.25 0.42 0.5 0.42
                        h4
                        c0.25 0 0.46 -0.18 0.5 -0.42
                        l0.38 -2.65
                        c0.61 -0.25 1.18 -0.58 1.69 -0.98
                        l2.49 1
                        c0.23 0.08 0.48 0 0.6 -0.22
                        l2 -3.46
                        c0.12 -0.22 0.07 -0.49 -0.12 -0.64
                        l-2.11 -1.65z
                    `,
                    fill: "none"
                },
                attrsBind: {
                    fill:            context.secondaryColor ,
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                }
            }),

            // Gear center
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "12",
                    cy: "12",
                    r:  "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            })

        ];
    }
};