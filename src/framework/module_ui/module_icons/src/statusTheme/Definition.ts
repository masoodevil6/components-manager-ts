import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.theme.name,
    description: Keys.icons.theme.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgCircle({
                attrs: {cx: "12", cy: "12", r: "9"},
                attrsBind: {fill: context.secondaryColor},
            }),
            CoreReactive.App.svgPath({
                attrs: {d: "M12 3a9 9 0 0 0 0 18Z"},
                attrsBind: {fill: context.primaryColor},
            }),
            CoreReactive.App.svgCircle({
                attrs: {cx: "12", cy: "12", r: "9", fill: "none"},
                attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
        ];
    },
};
