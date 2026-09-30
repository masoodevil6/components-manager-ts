import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {Props as LabelProps} from "../../lists/componentLabel/Props";
import * as ComponentLabel from "../../lists/componentLabel";

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

    createLabel(config: Record<string, any>, methods?: any, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}): InstanceType<typeof ComponentLabel.Component> {
        return new ComponentLabel.Component(config as any, methods, identity);
    },
};

export type ComponentLabelPropsType = import("../../lists/componentLabel/Props").PropsType;
