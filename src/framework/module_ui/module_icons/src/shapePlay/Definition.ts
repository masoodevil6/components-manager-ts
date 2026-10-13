import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.shapePlay.name,
    description: Keys.icons.shapePlay.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [CoreReactive.App.svgPath({
            attrs: {d: "M8 5v14l11-7L8 5z"},
            attrsBind: {fill: context.primaryColor},
        })];
    },
};
