import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.loadingBarsVertical.name,
    description: Keys.icons.loadingBarsVertical.description,

    viewBoxX:    50,
    viewBoxY:    50,

    render(context) {

        return [

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "10",
                    y:      "8",
                    width:  "30",
                    height: "6",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "width",
                            values:          "30;10;30",
                            dur:             "1s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "x",
                            values:          "10;20;10",
                            dur:             "1s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgRect({
                attrs: {
                    x:      "10",
                    y:      "18",
                    width:  "30",
                    height: "6",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "width",
                            values:          "30;10;30",
                            dur:             "1s",
                            begin:           "0.15s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "x",
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
                    x:      "10",
                    y:      "28",
                    width:  "30",
                    height: "6",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "width",
                            values:          "30;10;30",
                            dur:             "1s",
                            begin:           "0.3s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "x",
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
                    x:      "10",
                    y:      "38",
                    width:  "30",
                    height: "6",
                    rx:     "3"
                },
                attrsBind: {
                    fill: context.primaryColor
                },
                children: [
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "width",
                            values:          "30;10;30",
                            dur:             "1s",
                            begin:           "0.45s",
                            repeatCount:     "indefinite"
                        }
                    }),
                    CoreReactive.App.svgAnimate({
                        attrs: {
                            attributeName:    "x",
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
