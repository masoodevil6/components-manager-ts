import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.loadingOrbit.name,
    description: Keys.icons.loadingOrbit.description,

    viewBoxX:    50,
    viewBoxY:    50,

    render(context) {

        return [

            CoreReactive.App.svgCircle({
                attrs: {
                    cx:   "25",
                    cy:   "25",
                    r:    "6"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgG({
                children: [
                    CoreReactive.App.svgAnimateTransform({
                        attrs: {
                            attributeName:    "transform",
                            type:            "rotate",
                            from:            "0 25 25",
                            to:              "360 25 25",
                            dur:             "2s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgEllipse({
                        attrs: {
                            cx:          "25",
                            cy:          "25",
                            rx:          "18",
                            ry:          "8",
                            fill:        "none",
                            opacity:     "0.6"
                        },
                        attrsBind: {
                            stroke:         context.secondaryColor,
                            "stroke-width": context.strokeWidth
                        }
                    }),
                    CoreReactive.App.svgCircle({
                        attrs: {
                            cx: "43",
                            cy: "25",
                            r:  "3.5"
                        },
                        attrsBind: {
                            fill: context.secondaryColor
                        }
                    })
                ]
            }),

            CoreReactive.App.svgG({
                children: [
                    CoreReactive.App.svgAnimateTransform({
                        attrs: {
                            attributeName:    "transform",
                            type:            "rotate",
                            from:            "360 25 25",
                            to:              "0 25 25",
                            dur:             "1.5s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgEllipse({
                        attrs: {
                            cx:          "25",
                            cy:          "25",
                            rx:          "18",
                            ry:          "8",
                            fill:        "none",
                            opacity:     "0.4",
                            transform:   "rotate(60 25 25)"
                        },
                        attrsBind: {
                            stroke:         context.primaryColor,
                            "stroke-width": context.strokeWidth
                        }
                    }),
                    CoreReactive.App.svgCircle({
                        attrs: {
                            cx:        "43",
                            cy:        "25",
                            r:         "3",
                            transform: "rotate(60 25 25)"
                        },
                        attrsBind: {
                            fill: context.primaryColor
                        }
                    })
                ]
            })

        ];
    }
};
