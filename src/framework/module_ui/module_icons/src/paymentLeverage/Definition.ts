import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentLeverage.name,
    description: Keys.icons.paymentLeverage.description,

    viewBoxX:    236,
    viewBoxY:    164,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {},
                attrsBind: {
                    d:    "M55.53,160.73h136.02c2.2,0,3.99-1.79,3.99-3.99v-0.36c0-2.2-1.79-3.99-3.99-3.99H55.53 c-2.2,0-3.99,1.79-3.99,3.99v0.36C51.54,158.94,53.32,160.73,55.53,160.73z",
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {},
                attrsBind: {
                    d:    "M233.1,44.19c-1.43-4.38-6.14-6.76-10.52-5.33l-90.64,29.68c-1.74-1.86-4.23-2.8-6.72-2.61 c-3.09-0.23-6.2,1.27-7.85,4.14l-2.31,4.01l-91.11,29.84c-4.38,1.43-6.76,6.14-5.33,10.52s6.14,6.76,10.52,5.33l73.43-24.05 l-29.91,51.81c-2.3,3.99-0.94,9.09,3.05,11.39v0c3.99,2.3,9.09,0.94,11.39-3.05l38.13-66.04l38.13,66.04 c2.3,3.99,7.4,5.35,11.39,3.05v0c3.99-2.3,5.35-7.4,3.05-11.39l-37.12-64.29l87.09-28.52C232.15,53.27,234.53,48.56,233.1,44.19z M125.51,86.55c-4.73,0-8.57-4.14-8.57-9.24c0-5.11,3.84-9.24,8.57-9.24c4.73,0,8.57,4.14,8.57,9.24 C134.08,82.41,130.24,86.55,125.51,86.55z",
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "27.57",
                    cy: "74.6",
                    r:  "23.97"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "213.3",
                    cy: "20.79",
                    r:  "17.76"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    opacity: "0.5"
                },
                attrsBind: {
                    d:    "M195.54,20.79c0,9.81,7.95,17.76,17.76,17.76s17.76-7.95,17.76-17.76S195.54,10.98,195.54,20.79z",
                    fill: context.secondaryColor
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    opacity: "0.5"
                },
                attrsBind: {
                    d:    "M3.6,74.6c0,13.24,10.73,23.97,23.97,23.97S51.54,87.84,51.54,74.6S3.6,61.36,3.6,74.6z",
                    fill: context.secondaryColor
                }
            })

        ];
    }
};
