import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.fileWindowClose.name,
    description: Keys.icons.fileWindowClose.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M6 6l12 12M6 18L18 6"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":  context.strokeWidth,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                }
            })

        ];
    }
};
