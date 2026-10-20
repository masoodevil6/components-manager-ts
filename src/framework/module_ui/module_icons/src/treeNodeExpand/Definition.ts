import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

export const Definition: IconDefinition = {
    title: Keys.icons.treeNodeExpand.name,
    description: Keys.icons.treeNodeExpand.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [CoreReactive.App.svgPath({
            attrs: {
                d: "M7 3.75h10A3.25 3.25 0 0 1 20.25 7v10A3.25 3.25 0 0 1 17 20.25H7A3.25 3.25 0 0 1 3.75 17V7A3.25 3.25 0 0 1 7 3.75ZM12 8v8M8 12h8",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
            },
            attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth},
        })];
    },
};
