import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";
import {
    CreateFontSizeInputGroup,
    ParseFontSizeStyleValue,
    type FontSizeInputGroupComponents,
    type FontSizeInputGroupState,
} from "./FontSizeInputGroup";

export type FontSizeGroupValue = {
    value?: UtilConsts.Sizes | string | number | null;
};

export type FontSizeEditor = {component: any};

export type FontSizeEditorConfig = {
    components: FontSizeInputGroupComponents;
    title?: string;
    labels?: Parameters<typeof CreateFontSizeInputGroup>[1]["labels"];
    onChange?: (value: string | null, state: FontSizeInputGroupState) => void;
};

export function CreateFontSizeGroup(value: FontSizeGroupValue): FontSizeGroupValue {
    return {...value};
}

/** Convert the configured font-size value to its CSS property. */
export function CreateFontSizeCssStyles(
    group: FontSizeGroupValue,
): Partial<Record<"fontSize", string>> {
    const value = group?.value;
    if (value == null || value === "") return {};
    if (value === UtilConsts.Sizes.DEFAULT) return {fontSize: "inherit"};
    if (typeof value === "number") {
        return {fontSize: UtilStyles.Css_SizeUnit(value, UtilConsts.Units.PEXEL)};
    }
    if (Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)) {
        return {fontSize: UtilStyles.Css_FontSize(value as UtilConsts.Sizes)};
    }
    return {fontSize: String(value)};
}

/** Build the standard preset, number + unit, and custom CSS editor. */
export function CreateFontSizeEditors(
    group: FontSizeGroupValue,
    config: FontSizeEditorConfig,
): FontSizeEditor[] {
    const initial = ParseFontSizeStyleValue(group?.value);
    const component = CreateFontSizeInputGroup(config.components, {
        inputGroupProps: {
            prop_name: "font-size",
            prop_labelTitle: config.title ?? "Font size",
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

export const FontSize = Object.freeze({
    Key: "font-size" as const,
    Title: "Font size",
    Properties: Object.freeze(["font-size"] as const),
    create: CreateFontSizeGroup,
    createCssStyles: CreateFontSizeCssStyles,
    createPropertyCssStyles: (_property: "font-size", value: FontSizeGroupValue["value"]) =>
        CreateFontSizeCssStyles({value}),
    createEditors: CreateFontSizeEditors,
});
