import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";

export const Definition: IconDefinition = {
    title:       Keys.icons.statusError.name,
    description: Keys.icons.statusError.description,

    viewBoxX:    24,
    viewBoxY:    24,

    render(context) {
        return [
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "12",
                    cy: "12",
                    r:  "9",
                },
                attrsBind: {
                    fill:           context.secondaryColor,
                    stroke:         context.primaryColor,
                    "stroke-width": context.strokeWidth,
                },
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d:                 "M8.5 8.5l7 7M15.5 8.5l-7 7",
                    "stroke-linecap":  "round",
                    "stroke-linejoin": "round",
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                },
            }),
        ];
    },
};
