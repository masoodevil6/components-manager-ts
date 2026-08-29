import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.fileAttachment.name,
    description: Keys.icons.fileAttachment.description,

    viewBoxX:    490,
    viewBoxY:    420,

    render(context) {

        return [

            // Clip bar (top-left)
            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:              "M65.41,248.8L344.66,48.46c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3L48.51,225.23 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C54.67,250.99,60.92,252.02,65.41,248.8z",
                    fill:           context.primaryColor
                }
            }),

            // Lower left hook (stroke)
            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:              "M191.18,420.73c-40.97,29.39-103.8,11.92-140.35-39.02s-32.96-116.06,8.01-145.45",
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Clip bar (bottom-left)
            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:              "M198.03,433.66l131.5-94.34c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3l-131.5,94.34 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C187.3,435.85,193.54,436.88,198.03,433.66z",
                    fill:           context.primaryColor
                }
            }),

            // Clip bar (right)
            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:              "M420.27,142.52L150.11,336.33c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31c3.22,4.49,9.47,5.52,13.95,2.3l270.16-193.81 c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31C431.01,140.33,424.76,139.3,420.27,142.52z",
                    fill:           context.primaryColor
                }
            }),

            // Upper right hook (stroke)
            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:              "M336.87,36.51c36.51-26.19,85.59-20.28,109.61,13.21s13.9,81.87-22.61,108.07",
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Small inner hook (stroke)
            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:              "M155.22,350.51c-12.87,9.23-32.62,3.73-44.11-12.28c-11.49-16.02-10.37-36.48,2.5-45.72",
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            // Clip bar (center)
            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:              "M125.41,301.9l216.85-155.57c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3L108.51,278.33 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C114.68,304.09,120.93,305.12,125.41,301.9z",
                    fill:           context.primaryColor
                }
            })

        ];
    }
};