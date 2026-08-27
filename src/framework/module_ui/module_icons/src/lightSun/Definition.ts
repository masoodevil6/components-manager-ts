import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:           Keys.icons.sun.name,
    description:     Keys.icons.sun.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:               "12",
                    cy:               "12",
                    r:                "5"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth ,
                    "fill" :          context.secondaryColor
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "12",
                    y1:               "1",
                    x2:               "12",
                    y2:               "3"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "12",
                    y1:               "21",
                    x2:               "12",
                    y2:               "23"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "4.22",
                    y1:               "4.22",
                    x2:               "5.64",
                    y2:               "5.64"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "18.36",
                    y1:               "18.36",
                    x2:               "19.78",
                    y2:               "19.78"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "1",
                    y1:               "12",
                    x2:               "3",
                    y2:               "12"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "21",
                    y1:               "12",
                    x2:               "23",
                    y2:               "12"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "4.22",
                    y1:               "19.78",
                    x2:               "5.64",
                    y2:               "18.36"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "18.36",
                    y1:               "5.64",
                    x2:               "19.78",
                    y2:               "4.22"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};