import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {Props as LabelProps} from "../../lists/componentLabel/Props";
import {ComponentLabel} from "../../lists/componentLabel/ComponentLabel";

/** Shared ComponentLabel capability for components that expose a label. */
export const ComponentLabelTrait = {
    props: LabelProps,
    schemas: {
        LABEL: {
            part: "part-input-label",
            props: Object.values(LabelProps),
            name: Keys.category.components.input.schemas.label.name,
            description: Keys.category.components.input.schemas.label.description,
        },
    } as CoreComponents.ComponentSchemas,

    createLabel(config: Record<string, any>, methods?: any, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}): ComponentLabel {
        return new ComponentLabel(config as any, methods, identity);
    },
};

export type ComponentLabelPropsType = import("../../lists/componentLabel/Props").PropsType;
