import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.paymentRate.name,
    description: Keys.icons.paymentRate.description,

    viewBoxX:    290 ,
    viewBoxY:    270 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M260.03,136.86c0-69.04-55.96-125-125-125s-125,55.96-125,125s55.96,125,125,125c45.02,0,84.48-23.8,106.49-59.5"
                },
                attrsBind: {
                    fill:     context.secondaryColor,
                    opacity:  "0.6"
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M260.03,136.86c0-69.04-55.96-125-125-125s-125,55.96-125,125s55.96,125,125,125c45.02,0,84.48-23.8,106.49-59.5"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    fill:             "none"
                }
            }),
            CoreReactive.App.svgPolygon({
                attrs: {
                    points:   "223.52,114.32 258.34,176.86 288.94,114.32"
                },
                attrsBind: {
                    fill:     context.primaryColor
                }
            }),
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:       "107.39" ,
                    cy:       "100.2" ,
                    r:        "25"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    fill:             "none"
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M87.68,209.33l6.11,3.77c2.35,1.45,5.43,0.72,6.88-1.63l84.79-137.48c1.45-2.35,0.72-5.43-1.63-6.88l-6.11-3.77c-2.35-1.45-5.43-0.72-6.88,1.63L86.05,202.45C84.6,204.8,85.33,207.88,87.68,209.33z"
                },
                attrsBind: {
                    fill:     context.primaryColor
                }
            }),
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:       "164.87" ,
                    cy:       "174.98" ,
                    r:        "25"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    fill:             "none"
                }
            })
        ];
    }
};