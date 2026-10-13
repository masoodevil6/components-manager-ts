import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.separatorVertical.name,
    description: Keys.icons.separatorVertical.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgRect({
                attrs: {x: "4", y: "3", width: "16", height: "18", rx: "2"},
                attrsBind: {fill: context.secondaryColor, stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
            CoreReactive.App.svgLine({
                attrs: {x1: "12", y1: "3", x2: "12", y2: "21", "stroke-linecap": "round"},
                attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
        ];
    },
};
