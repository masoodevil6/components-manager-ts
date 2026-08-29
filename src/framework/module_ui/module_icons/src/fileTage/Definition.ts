import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.fileTage.name,
    description: Keys.icons.fileTage.description,

    viewBoxX:    277 ,
    viewBoxY:    300 ,

    render(context) {

        return [
            /// Main tag body
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M94.38,279.52l111.46-121.67l25.83-101.33c0,0-102.08,29.43-103.26,30.41L16.95,208.59 c-7.46,8.14-6.91,20.8,1.24,28.26l47.93,43.91C74.27,288.22,86.92,287.67,94.38,279.52z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// First inner line
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M66.13,199.07l41.81-45.64c1.7-1.85,1.57-4.73-0.28-6.42h0c-1.85-1.7-4.73-1.57-6.42,0.28l-41.81,45.64 c-1.7,1.85-1.57,4.73,0.28,6.42l0,0C61.56,201.05,64.44,200.92,66.13,199.07z"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Second inner line
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M134.07,213.17l-45.64-41.81c-1.85-1.7-4.73-1.57-6.42,0.28h0c-1.7,1.85-1.57,4.73,0.28,6.42l45.64,41.81 c1.85,1.7,4.73,1.57,6.42-0.28h0C136.05,217.75,135.93,214.87,134.07,213.17z"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Tag hole circle
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "188.52",
                    cy: "99.03",
                    r:  "12.5"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Tag string
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M179.21,67.43c-12.1-45.11-0.09-44.43,30.26-53.62c42.13-12.77,46.69-7.12,54.32,38.78 c4.3,25.88-16.7,34.71-62.57,45.91"
                },
                attrsBind: {
                    fill:             "none",
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            })
        ];
    }
};