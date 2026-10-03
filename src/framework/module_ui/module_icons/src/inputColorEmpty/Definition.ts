import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.inputColorEmpty.name,
    description: Keys.icons.inputColorEmpty.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgRect({
                attrs: {x: "3", y: "3", width: "18", height: "18", rx: "3"},
                attrsBind: {fill: context.secondaryColor, stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
            CoreReactive.App.svgPath({
                attrs: {d: "M5 19 19 5", fill: "none", "stroke-linecap": "round"},
                attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
        ];
    },
};
