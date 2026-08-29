import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.inputNumber.name,
    description: Keys.icons.inputNumber.description,

    viewBoxX:    73.77 ,
    viewBoxY:    69.22 ,

    render(context) {

        return [
            /// Top horizontal bar (top of number one)
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M13.29,28.04h54.42c2.76,0,5-2.24,5-5v-1.37c0-2.76-2.24-5-5-5H13.29c-2.76,0-5,2.24-5,5v1.37 C8.29,25.8,10.53,28.04,13.29,28.04z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Bottom horizontal bar (bottom of number one)
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M8.29,53.56h54.42c2.76,0,5-2.24,5-5v-1.37c0-2.76-2.24-5-5-5H8.29c-2.76,0-5,2.24-5,5v1.37 C3.29,51.32,5.53,53.56,8.29,53.56z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Right diagonal stroke (number one stem)
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M50.36,61.26L63.19,8.37c0.65-2.68-1-5.39-3.68-6.04l-1.33-0.32c-2.68-0.65-5.39,1-6.04,3.68L39.32,58.58 c-0.65,2.68,1,5.39,3.68,6.04l1.33,0.32C47.01,65.59,49.71,63.94,50.36,61.26z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// Left diagonal stroke (number one serif)
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M23.85,64.26l12.83-52.89c0.65-2.68-1-5.39-3.68-6.04l-1.33-0.32c-2.68-0.65-5.39,1-6.04,3.68L12.8,61.58 c-0.65,2.68,1,5.39,3.68,6.04l1.33,0.32C20.49,68.59,23.2,66.94,23.85,64.26z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};