import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.statusPinClose.name,
    description: Keys.icons.statusPinClose.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M16 3v4l2 2-4 4 2 2v4H8v-4l2-2-4-4 2-2V3h8z"
                },
                attrsBind: {
                    stroke: context.primaryColor,
                    fill:   context.secondaryColor
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1: "4",
                    y1: "20",
                    x2: "20",
                    y2: "4"
                },
                attrsBind: {
                    stroke: context.primaryColor
                }
            })

        ];
    }
};
