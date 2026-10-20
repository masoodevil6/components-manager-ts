import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.fileCopy.name,
    description: Keys.icons.fileCopy.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [CoreReactive.App.svgPath({
            attrs: {
                d: "M8 8V5.5A2.5 2.5 0 0 1 10.5 3h8A2.5 2.5 0 0 1 21 5.5v9a2.5 2.5 0 0 1-2.5 2.5H16M6.5 8h7A2.5 2.5 0 0 1 16 10.5v8a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 18.5v-8A2.5 2.5 0 0 1 6.5 8Z",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
            },
            attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth},
        })];
    },
};
