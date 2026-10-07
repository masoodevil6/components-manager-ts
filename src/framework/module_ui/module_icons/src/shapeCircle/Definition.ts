import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.shapeCircle.name,
    description: Keys.icons.shapeCircle.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [CoreReactive.App.svgCircle({
            attrs: {cx: "12", cy: "12", r: "12"},
            attrsBind: {fill: context.primaryColor},
        })];
    },
};
