import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.loadingPulse.name,
    description: Keys.icons.loadingPulse.description,

    viewBoxX:    50,
    viewBoxY:    50,

    render(context) {

        return [

            CoreReactive.App.svgCircle({
                attrs: {
                    cx:   "25",
                    cy:   "25",
                    r:    "20",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "r",
                            values:          "20;8;20",
                            dur:             "1.5s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "opacity",
                            values:          "0.2;1;0.2",
                            dur:             "1.5s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "25",
                    cy: "25",
                    r:  "8"
                },
                attrsBind: {
                    fill: context.secondaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "r",
                            values:          "8;4;8",
                            dur:             "1.5s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "opacity",
                            values:          "1;0.5;1",
                            dur:             "1.5s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            })

        ];
    }
};
