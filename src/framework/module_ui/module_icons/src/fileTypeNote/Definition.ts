import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.fileTypeNote.name,
    description: Keys.icons.fileTypeNote.description,

    viewBoxX:    201 ,
    viewBoxY:    239 ,

    render(context) {

        return [
            /// Main note body
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M171.38,228.02h-141c-11.05,0-20-8.95-20-20v-147c0-11.05,8.95-20,20-20h141c11.05,0,20,8.95,20,20v147 C191.38,219.07,182.42,228.02,171.38,228.02z"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            /// First bullet point
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "48.59",
                    cy: "102.88",
                    r:  "10"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M155.95,108.63H77.76c-3.31,0-6-2.69-6-6v0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6v0 C161.95,105.95,159.26,108.63,155.95,108.63z"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Second bullet point
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "49.12",
                    cy: "135.28",
                    r:  "10"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M156.48,141.03H78.29c-3.31,0-6-2.69-6-6v0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6v0 C162.48,138.35,159.79,141.03,156.48,141.03z"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Third bullet point
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "47.7",
                    cy: "167.68",
                    r:  "10"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M155.06,173.43H76.87c-3.31,0-6-2.69-6-6l0,0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6l0,0 C161.06,170.75,158.37,173.43,155.06,173.43z"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Spiral springs on top of the note
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M55.33,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30s20,13.43,20,30"
                },
                attrsBind: {
                    fill:             "none",
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M103.83,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30s20,13.43,20,30"
                },
                attrsBind: {
                    fill:             "none",
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M143.83,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30c11.05,0,20,13.43,20,30"
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