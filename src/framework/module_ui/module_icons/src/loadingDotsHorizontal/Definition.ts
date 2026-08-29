import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.loadingDotsHorizontal.name,
    description: Keys.icons.loadingDotsHorizontal.description,

    viewBoxX:    50,
    viewBoxY:    50,

    render(context) {

        return [

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "12",
                    cy: "25",
                    r:  "5"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "r",
                            values:          "5;3;5",
                            dur:             "1.2s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "opacity",
                            values:          "1;0.3;1",
                            dur:             "1.2s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "25",
                    cy: "25",
                    r:  "5"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "r",
                            values:          "5;3;5",
                            dur:             "1.2s",
                            begin:           "0.2s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "opacity",
                            values:          "1;0.3;1",
                            dur:             "1.2s",
                            begin:           "0.2s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "38",
                    cy: "25",
                    r:  "5"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "r",
                            values:          "5;3;5",
                            dur:             "1.2s",
                            begin:           "0.4s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "opacity",
                            values:          "1;0.3;1",
                            dur:             "1.2s",
                            begin:           "0.4s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            })

        ];
    }
};
