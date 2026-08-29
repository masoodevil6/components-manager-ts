import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.statusPinOpen.name,
    description: Keys.icons.statusPinOpen.description,

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
            })

        ];
    }
};
