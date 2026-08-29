import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.loadingBarsHorizontal.name,
    description: Keys.icons.loadingBarsHorizontal.description,

    viewBoxX:    50,
    viewBoxY:    50,

    render(context) {

        return [

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "8",
                    y:      "10",
                    width:  "6",
                    height: "30",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "height",
                            values:          "30;10;30",
                            dur:             "1s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "y",
                            values:          "10;20;10",
                            dur:             "1s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "18",
                    y:      "10",
                    width:  "6",
                    height: "30",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "height",
                            values:          "30;10;30",
                            dur:             "1s",
                            begin:           "0.15s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "y",
                            values:          "10;20;10",
                            dur:             "1s",
                            begin:           "0.15s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "28",
                    y:      "10",
                    width:  "6",
                    height: "30",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "height",
                            values:          "30;10;30",
                            dur:             "1s",
                            begin:           "0.3s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "y",
                            values:          "10;20;10",
                            dur:             "1s",
                            begin:           "0.3s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "38",
                    y:      "10",
                    width:  "6",
                    height: "30",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "height",
                            values:          "30;10;30",
                            dur:             "1s",
                            begin:           "0.45s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "y",
                            values:          "10;20;10",
                            dur:             "1s",
                            begin:           "0.45s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            })

        ];
    }
};
