import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentWallet1.name,
    description: Keys.icons.paymentWallet1.description,

    viewBoxX:    346,
    viewBoxY:    244,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M229.73,181.71c-15.74,0-28.5-12.76-28.5-28.5v-4c0-15.74,12.76-28.5,28.5-28.5h41.5V82.65 c0-13.25-10.75-24-24-24h-207c-13.25,0-24,10.75-24,24v132c0,13.25,10.75,24,24,24h207c13.25,0,24-10.75,24-24v-32.94H229.73z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M225.21,54.36l-21.09-37.72c-5.1-9.8-17.17-13.61-26.97-8.52l-88.9,46.22L225.21,54.36z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M295.98,125.21h-67.8c-11.05,0-20,8.95-20,20v10.88c0,11.05,8.95,20,20,20h67.8c5.52,0,10-4.48,10-10v-30.88 C305.98,129.69,301.5,125.21,295.98,125.21z M234.65,169.23c-10.26,0-18.58-8.32-18.58-18.58s8.32-18.58,18.58-18.58 s18.58,8.32,18.58,18.58S244.91,169.23,234.65,169.23z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
