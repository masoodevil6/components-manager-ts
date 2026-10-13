import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.separatorHorizontal.name,
    description: Keys.icons.separatorHorizontal.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgRect({
                attrs: {x: "3", y: "4", width: "18", height: "16", rx: "2"},
                attrsBind: {fill: context.secondaryColor, stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
            CoreReactive.App.svgLine({
                attrs: {x1: "3", y1: "12", x2: "21", y2: "12", "stroke-linecap": "round"},
                attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
        ];
    },
};
