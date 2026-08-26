import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const DefinitionZoom: IconDefinition = {
    title:           Keys.icons.zoom.name,
    description:     Keys.icons.zoom.description,
    viewBox:         "0 0 24 24",
    render(context) {

        const el1 = CoreReactive.App.svgCircle({
                attrs: {
                    cx:               "11",
                    cy:               "11",
                    r:                "8"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":    2 //context.strokeWidth
                }
            });

        console.log(el1.getElement().getAttribute("cy"));
        console.log(el1.getElement().getAttribute("r"));
        console.log(el1.getElement().getAttribute("stroke"));
        console.log(el1.getElement().getAttribute("stroke-width"));

        return [
            el1,
            CoreReactive.App.svgLine({
                attrs: {
                    x1:               "21",
                    y1:               "21",
                    x2:               "16.65",
                    y2:               "16.65"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":      context.strokeWidth
                }
            }),
            CoreReactive.App.svgLine({
                attrs: {
                    x1:              "8",
                    y1:              "11",
                    x2:              "14",
                    y2:              "11"
                },
                attrsBind: {
                    stroke:          context.primaryColor,
                    "stroke-width":     context.strokeWidth
                }
            })
        ];
    }
};