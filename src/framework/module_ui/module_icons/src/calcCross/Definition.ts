import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.calcCross.name,
    description: Keys.icons.calcCross.description,

    viewBoxX:    24 ,
    viewBoxY:    24 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({

                attrs: {
                    d:                 "M6 6l12 12M18 6L6 18",
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