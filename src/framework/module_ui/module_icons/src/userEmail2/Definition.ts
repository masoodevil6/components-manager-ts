import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.userEmail2.name,
    description: Keys.icons.userEmail2.description,

    viewBoxX:    235,
    viewBoxY:    140,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {},
                attrsBind: {
                    d:             "M229.65,127.15c0.31-1.21,0.5-2.47,0.5-3.78v-105c0-2.1-0.43-4.09-1.21-5.9L151.36,62L229.65,127.15z",
                    fill:           context.primaryColor,
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {},
                attrsBind: {
                    d:             "M117.15,67.37L223.93,6.23c-2.47-1.79-5.5-2.86-8.78-2.86h-196c-3.28,0-6.31,1.07-8.78,2.86L117.15,67.37z",
                    fill:           context.primaryColor,
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {},
                attrsBind: {
                    d:             "M5.62,11.92c-0.93,1.96-1.47,4.14-1.47,6.45v105c0,2.39,0.58,4.65,1.57,6.66l73.32-69.47L5.62,11.92z",
                    fill:           context.primaryColor,
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {},
                attrsBind: {
                    d:             "M137.81,69.84l-20.66,12.52L94.58,68.32l-83.61,67.61c2.35,1.54,5.16,2.44,8.18,2.44h196 c4.25,0,8.08-1.77,10.8-4.61L137.81,69.84z",
                    fill:           context.primaryColor,
                    stroke:         context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
