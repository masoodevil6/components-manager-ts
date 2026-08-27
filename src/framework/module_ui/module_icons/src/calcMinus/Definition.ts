import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.calcMinus.name,
    description: Keys.icons.calcMinus.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({

                attrs: {
                    d:                 "M8 12h8",
                    "stroke-linecap":  "round",
                    "stroke-linejoin": "round"
                },

                attrsBind: {
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth
                }

            })
        ];
    }
};