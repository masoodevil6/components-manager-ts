import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";


export const Definition: IconDefinition = {

    title:           Keys.icons.excel.name,
    description:     Keys.icons.excel.description,

    viewBoxX:        340,
    viewBoxY:        380,

    render(context) {

        return [

            // Excel document background
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M234.65,349.08h64.75c15.05,0,27.25-12.2,27.25-27.25v-266c0-15.05-12.2-27.25-27.25-27.25h-64.75V349.08z"
                },

                attrsBind: {
                    fill:           context.primaryColor,
                    stroke:         context.secondaryColor,
                    "stroke-width": 5
                }
            }),


            // Excel file and X symbol
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M197.4,6.58l-174.75,22c-5.52,0-10,4.48-10,10v300.5c0,5.52,4.48,10,10,10l174.75,21c15.05,0,27.25-12.2,27.25-27.25v-309C224.65,18.78,212.45,6.58,197.4,6.58zM162.52,146.8h-11.22l-29.45,61.75l30.75,65.64h9.92v12.55H123.9V274.2h9.84l-21.41-45.69L90.55,274.2h6.85v12.55H58.79V274.2h12.84l31.33-65.71l-28.9-61.69H59.98v-12.55h38.61v12.55h-5.68l19.55,41.74l19.91-41.74h-8.47v-12.55h38.61V146.8z"
                },

                attrsBind: {
                    fill:           context.primaryColor,
                    stroke:         context.secondaryColor,
                    "stroke-width": 5
                }
            })

        ];

    }

};