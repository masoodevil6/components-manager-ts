import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.loading.name,
    description: Keys.icons.loading.description,

    viewBoxX:    50,
    viewBoxY:    50,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    d:             "M25 5 A20 20 0 1 1 5 25",
                    fill:          "none",
                    "stroke-linecap": "round"
                },
                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                },
                children: [
                    CoreReactive.App.svgAnimateTransform({
                        attrs: {
                            attributeName:    "transform",
                            type:            "rotate",
                            from:            "0 25 25",
                            to:              "360 25 25",
                            dur:             "1s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    d:             "M25 5 A20 20 0 0 1 45 25",
                    fill:          "none",
                    opacity:       "0.4",
                    "stroke-linecap": "round"
                },
                attrsBind: {
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                },
                children: [
                    CoreReactive.App.svgAnimateTransform({
                        attrs: {
                            attributeName:    "transform",
                            type:            "rotate",
                            from:            "0 25 25",
                            to:              "360 25 25",
                            dur:             "1s",
                            repeatCount:     "indefinite"
                        }
                    })
                ]
            })

        ];
    }
};
