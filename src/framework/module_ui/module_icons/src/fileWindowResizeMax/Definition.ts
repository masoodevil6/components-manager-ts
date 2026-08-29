import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.fileWindowResizeMax.name,
    description: Keys.icons.fileWindowResizeMax.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    d: "M10 4H4v6M14 4h6v6M4 14v6h6M20 14v6h-6"
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
