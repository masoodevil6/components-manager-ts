import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";
import {
    CreateLineHeightInputGroup,
    ParseLineHeightStyleValue,
    type LineHeightInputGroupComponents,
    type LineHeightInputGroupState,
} from "./LineHeightInputGroup";

export type LineHeightGroupValue = {
    value?: UtilConsts.Sizes | string | number | null;
};

export type LineHeightEditor = {component: any};

export type LineHeightEditorConfig = {
    components: LineHeightInputGroupComponents;
    title?: string;
    labels?: Parameters<typeof CreateLineHeightInputGroup>[1]["labels"];
    onChange?: (value: string | null, state: LineHeightInputGroupState) => void;
};

export function CreateLineHeightGroup(value: LineHeightGroupValue): LineHeightGroupValue {
    return {...value};
}

/** Convert a configured line-height value into its CSS property. */
export function CreateLineHeightCssStyles(
    group: LineHeightGroupValue,
): Partial<Record<"lineHeight", string>> {
    const value = group?.value;
    if (value == null || value === "") return {};
    if (value === UtilConsts.Sizes.DEFAULT) return {lineHeight: "normal"};
    if (typeof value === "number") {
        return {lineHeight: UtilStyles.Css_SizeUnit(value, UtilConsts.Units.PEXEL)};
    }
    if (Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)) {
        return {lineHeight: UtilStyles.Css_Height(value as UtilConsts.Sizes)};
    }
    return {lineHeight: String(value)};
}

/** Build the standard preset, number + unit, and custom CSS editor. */
export function CreateLineHeightEditors(
    group: LineHeightGroupValue,
    config: LineHeightEditorConfig,
): LineHeightEditor[] {
    const initial = ParseLineHeightStyleValue(group?.value);
    const component = CreateLineHeightInputGroup(config.components, {
        inputGroupProps: {
            prop_name: "line-height",
            prop_labelTitle: config.title ?? "Line height",
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

export const LineHeight = Object.freeze({
    Key: "line-height" as const,
    Title: "Line height",
    Properties: Object.freeze(["line-height"] as const),
    create: CreateLineHeightGroup,
    createCssStyles: CreateLineHeightCssStyles,
    createPropertyCssStyles: (_property: "line-height", value: LineHeightGroupValue["value"]) =>
        CreateLineHeightCssStyles({value}),
    createEditors: CreateLineHeightEditors,
});
