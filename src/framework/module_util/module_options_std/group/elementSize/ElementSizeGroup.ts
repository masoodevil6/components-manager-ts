import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";
import {
    CreateHeightInputGroup,
    ParseHeightStyleValue,
    type HeightInputGroupComponents,
    type HeightInputGroupState,
} from "./HeightInputGroup";
import {
    CreateWidthInputGroup,
    ParseWidthStyleValue,
    type WidthInputGroupComponents,
    type WidthInputGroupState,
} from "./WidthInputGroup";

export type ElementSizeValue = UtilConsts.Sizes | string | number | null;
export type HeightGroupValue = {value?: ElementSizeValue};
export type WidthGroupValue = {value?: ElementSizeValue};

export type HeightEditor = {component: any};
export type WidthEditor = {component: any};

export type HeightEditorConfig = {
    components: HeightInputGroupComponents;
    title?: string;
    labels?: Parameters<typeof CreateHeightInputGroup>[1]["labels"];
    onChange?: (value: string | null, state: HeightInputGroupState) => void;
};

export type WidthEditorConfig = {
    components: WidthInputGroupComponents;
    title?: string;
    labels?: Parameters<typeof CreateWidthInputGroup>[1]["labels"];
    onChange?: (value: string | null, state: WidthInputGroupState) => void;
};

export function CreateHeightGroup(value: HeightGroupValue): HeightGroupValue {
    return {...value};
}

export function CreateWidthGroup(value: WidthGroupValue): WidthGroupValue {
    return {...value};
}

/** Translate one standardized dimension value to CSS. */
function CreateDimensionCssStyle(property: "height" | "width", value: ElementSizeValue | undefined): Partial<Record<"height" | "width", string>> {
    if (value == null || value === "") return {};
    if (value === UtilConsts.Sizes.DEFAULT) return {[property]: "auto"};
    if (typeof value === "number") {
        return {[property]: UtilStyles.Css_SizeUnit(value, UtilConsts.Units.PEXEL)};
    }
    if (Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)) {
        return {[property]: UtilStyles.Css_Height(value as UtilConsts.Sizes)};
    }
    return {[property]: String(value)};
}

export function CreateHeightCssStyles(group: HeightGroupValue): Partial<Record<"height", string>> {
    return CreateDimensionCssStyle("height", group?.value);
}

export function CreateWidthCssStyles(group: WidthGroupValue): Partial<Record<"width", string>> {
    return CreateDimensionCssStyle("width", group?.value);
}

export function CreateHeightEditors(group: HeightGroupValue, config: HeightEditorConfig): HeightEditor[] {
    const initial = ParseHeightStyleValue(group?.value);
    const component = CreateHeightInputGroup(config.components, {
        inputGroupProps: {
            prop_name: "height",
            prop_labelTitle: config.title ?? "Height",
        },
        labels: config.labels,
        groupSelected: initial.mode,
        sizeValue: initial.sizeValue,
        numberValue: initial.numberValue,
        unitValue: initial.unitValue,
        customValue: initial.customValue,
        onChange: config.onChange,
    });
    return [{component}];
}

export function CreateWidthEditors(group: WidthGroupValue, config: WidthEditorConfig): WidthEditor[] {
    const initial = ParseWidthStyleValue(group?.value);
    const component = CreateWidthInputGroup(config.components, {
        inputGroupProps: {
            prop_name: "width",
            prop_labelTitle: config.title ?? "Width",
        },
        labels: config.labels,
        groupSelected: initial.mode,
        sizeValue: initial.sizeValue,
        numberValue: initial.numberValue,
        unitValue: initial.unitValue,
        customValue: initial.customValue,
        onChange: config.onChange,
    });
    return [{component}];
}

export const Height = Object.freeze({
    Key: "height" as const,
    Title: "Height",
    Properties: Object.freeze(["height"] as const),
    create: CreateHeightGroup,
    createCssStyles: CreateHeightCssStyles,
    createPropertyCssStyles: (_property: "height", value: HeightGroupValue["value"]) =>
        CreateHeightCssStyles({value}),
    createEditors: CreateHeightEditors,
});

export const Width = Object.freeze({
    Key: "width" as const,
    Title: "Width",
    Properties: Object.freeze(["width"] as const),
    create: CreateWidthGroup,
    createCssStyles: CreateWidthCssStyles,
    createPropertyCssStyles: (_property: "width", value: WidthGroupValue["value"]) =>
        CreateWidthCssStyles({value}),
    createEditors: CreateWidthEditors,
});

export type ElementSizeGroupValue = {
    height?: HeightGroupValue;
    width?: WidthGroupValue;
};

export function CreateElementSizeGroup(value: ElementSizeGroupValue): ElementSizeGroupValue {
    return {
        ...(value.height ? {height: Height.create(value.height)} : {}),
        ...(value.width ? {width: Width.create(value.width)} : {}),
    };
}

export function CreateElementSizeCssStyles(value: ElementSizeGroupValue): Record<string, string> {
    return {
        ...Height.createCssStyles(value.height ?? {}),
        ...Width.createCssStyles(value.width ?? {}),
    };
}

export function CreateElementSizePropertyCssStyles(
    property: "height" | "width",
    value: ElementSizeValue,
): Record<string, string> {
    return property === Height.Key
        ? Height.createPropertyCssStyles(property, value)
        : Width.createPropertyCssStyles(property, value);
}

export const ElementSize = Object.freeze({
    Key: "elementSize" as const,
    Title: "Element size",
    Height,
    Width,
    Properties: Object.freeze([...Height.Properties, ...Width.Properties]),
    create: CreateElementSizeGroup,
    createCssStyles: CreateElementSizeCssStyles,
    createPropertyCssStyles: CreateElementSizePropertyCssStyles,
});
