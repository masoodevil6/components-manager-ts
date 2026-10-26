export {
    Border,
    BorderDirection,
    BorderColorDirection,
    BorderLineStyle,
    BorderLineStyleValues,
    BorderStyleDirection,
    BorderDirectionSets,
    CreateBorderGroup,
    CreateBorderCssStyles,
    CreateBorderColorGroup,
    CreateBorderColorCssStyles,
    CreateBorderStyleGroup,
    CreateBorderStyleCssStyles,
    CreateBorderDirectionEditors,
    CreateBorderStyleDirectionEditors,
} from "./border";
export type {
    BorderCssProperty,
    BorderProperty,
    BorderDirectionSelection,
    BorderDirectionSetName,
    BorderGroupValue,
    BorderColorGroupValue,
    BorderStyleGroupValue,
    CreateBorderGroupConfig,
    BorderDirectionEditor,
    BorderDirectionEditorConfig,
    BorderStyleInput,
    BorderStyleInputs,
    BorderStyleDirectionEditor,
    BorderStyleSelectComponentCreator,
    BorderStyleDirectionEditorConfig,
} from "./border";

export {
    Margin,
    MarginDirection,
    MarginDirectionSets,
    CreateMarginGroup,
    CreateMarginCssStyles,
    CreateMarginDirectionEditors,
} from "./margin";
export type {
    MarginDirectionSetName,
    MarginGroupValue,
    MarginGroupValues,
    MarginDirectionEditor,
    MarginDirectionEditorConfig,
    CreateMarginDirectionEditorsConfig,
} from "./margin";

export {
    Padding,
    PaddingDirection,
    PaddingDirectionSets,
    CreatePaddingGroup,
    CreatePaddingCssStyles,
    CreatePaddingDirectionEditors,
} from "./padding";
export type {
    PaddingDirectionSetName,
    PaddingGroupValue,
    PaddingGroupValues,
    PaddingDirectionEditor,
    PaddingDirectionEditorConfig,
    CreatePaddingDirectionEditorsConfig,
} from "./padding";
export {
    PaddingInputGroupMode,
    CreatePaddingInputGroup,
    ResolvePaddingStyleValue,
    ParsePaddingStyleValue,
} from "./padding";
export type {
    PaddingInputGroupValue,
    PaddingInputGroupState,
    PaddingInputGroupOnChange,
    PaddingInputGroupComponents,
    PaddingInputGroupConfig,
    PaddingInputGroupComponentCreator,
    PaddingInputGroupInitialValue,
} from "./padding";

export {
    BorderRadius,
    BorderRadiusCorner,
    BorderRadiusCornerSets,
    CreateBorderRadiusGroup,
    CreateBorderRadiusCssStyles,
    CreateBorderRadiusCornerEditors,
} from "./borderRadius";
export type {
    BorderRadiusCornerSetName,
    BorderRadiusGroupValue,
    BorderRadiusGroupValues,
    BorderRadiusCornerEditor,
    BorderRadiusCornerEditorConfig,
    CreateBorderRadiusCornerEditorsConfig,
} from "./borderRadius";
export {
    BorderRadiusInputGroupMode,
    CreateBorderRadiusInputGroup,
    ResolveBorderRadiusStyleValue,
    ParseBorderRadiusStyleValue,
} from "./borderRadius";
export type {
    BorderRadiusInputGroupValue,
    BorderRadiusInputGroupState,
    BorderRadiusInputGroupOnChange,
    BorderRadiusInputGroupComponents,
    BorderRadiusInputGroupConfig,
    BorderRadiusInputGroupComponentCreator,
    BorderRadiusInputGroupInitialValue,
} from "./borderRadius";

export {
    Colors,
    ColorProperty,
    CreateColorsGroup,
    CreateColorsCssStyles,
    CreateColorPropertyCssStyles,
} from "./colors";
export type {ColorsGroupValue} from "./colors";

export {
    ElementSize,
    CreateElementSizeGroup,
    CreateElementSizeCssStyles,
    CreateElementSizePropertyCssStyles,
} from "./elementSize";
export type {ElementSizeGroupValue} from "./elementSize";
export {
    CreateHeightGroup,
    CreateHeightCssStyles,
    CreateHeightEditors,
    HeightInputGroupMode,
    CreateHeightInputGroup,
    ResolveHeightStyleValue,
    ParseHeightStyleValue,
} from "./elementSize";
export type {
    HeightGroupValue,
    HeightEditor,
    HeightEditorConfig,
    HeightInputGroupValue,
    HeightInputGroupState,
    HeightInputGroupOnChange,
    HeightInputGroupComponents,
    HeightInputGroupConfig,
    HeightInputGroupComponentCreator,
    HeightInputGroupInitialValue,
} from "./elementSize";
export {
    CreateWidthGroup,
    CreateWidthCssStyles,
    CreateWidthEditors,
    WidthInputGroupMode,
    CreateWidthInputGroup,
    ResolveWidthStyleValue,
    ParseWidthStyleValue,
} from "./elementSize";
export type {
    WidthGroupValue,
    WidthEditor,
    WidthEditorConfig,
    WidthInputGroupValue,
    WidthInputGroupState,
    WidthInputGroupOnChange,
    WidthInputGroupComponents,
    WidthInputGroupConfig,
    WidthInputGroupComponentCreator,
    WidthInputGroupInitialValue,
} from "./elementSize";

export {
    Text,
    TextAlign,
    FontWeight,
    TextDecoration,
    TextTransform,
    CreateFontSizeGroup,
    CreateFontSizeCssStyles,
    CreateFontSizeEditors,
    CreateLineHeightGroup,
    CreateLineHeightCssStyles,
    CreateLineHeightEditors,
    FontSizeInputGroupMode,
    CreateFontSizeInputGroup,
    ResolveFontSizeStyleValue,
    ParseFontSizeStyleValue,
    LineHeightInputGroupMode,
    CreateLineHeightInputGroup,
    ResolveLineHeightStyleValue,
    ParseLineHeightStyleValue,
} from "./text";
export type {TextSelectProperty, TextSelectValue} from "./text";
export type {
    FontSizeGroupValue,
    FontSizeEditor,
    FontSizeEditorConfig,
    FontSizeInputGroupValue,
    FontSizeInputGroupState,
    FontSizeInputGroupOnChange,
    FontSizeInputGroupComponents,
    FontSizeInputGroupConfig,
    FontSizeInputGroupComponentCreator,
    FontSizeInputGroupInitialValue,
    LineHeightGroupValue,
    LineHeightEditor,
    LineHeightEditorConfig,
    LineHeightInputGroupValue,
    LineHeightInputGroupState,
    LineHeightInputGroupOnChange,
    LineHeightInputGroupComponents,
    LineHeightInputGroupConfig,
    LineHeightInputGroupComponentCreator,
    LineHeightInputGroupInitialValue,
} from "./text";

import {Border} from "./border";
import {Margin} from "./margin";
import {Padding} from "./padding";
import {BorderRadius} from "./borderRadius";
import {Colors} from "./colors";
import {ElementSize} from "./elementSize";
import {Text} from "./text";

export type ResolvedStyleProperty = {
    /** CSS property name used as the key in componentStyles.prop_value. */
    property: string;
    /** Standard group used to render and translate the property. */
    groupKey: string;
    descriptor: any;
};

const STYLE_PROPERTY_GROUPS: readonly {groupKey: string; descriptor: any}[] = [
    {groupKey: Border.Key, descriptor: Border},
    {groupKey: Margin.Key, descriptor: Margin},
    {groupKey: Padding.Key, descriptor: Padding},
    {groupKey: BorderRadius.Key, descriptor: BorderRadius},
    {groupKey: Colors.Key, descriptor: Colors},
    {groupKey: ElementSize.Key, descriptor: ElementSize},
    {groupKey: Text.Key, descriptor: Text.FontSize},
    {groupKey: Text.Key, descriptor: Text.LineHeight},
    {groupKey: Text.Key, descriptor: Text.Align},
    {groupKey: Text.Key, descriptor: Text.Weight},
    {groupKey: Text.Key, descriptor: Text.Decoration},
    {groupKey: Text.Key, descriptor: Text.Transform},
];

/** Resolve a CSS property through the property definitions owned by its standard group. */
export function ResolveProperty(property: string): ResolvedStyleProperty | null {
    for (const {groupKey, descriptor} of STYLE_PROPERTY_GROUPS) {
        if (descriptor.Properties?.includes(property)) {
            return {property, groupKey, descriptor};
        }
    }
    return null;
}

/** Convert flat CSS-property values using each property's standard-group translator. */
export function CreateCssStyles(values: Record<string, any>): Record<string, string> {
    const styles: Record<string, string> = {};
    for (const [property, value] of Object.entries(values ?? {})) {
        const resolved = ResolveProperty(property);
        if (!resolved || typeof resolved.descriptor.createPropertyCssStyles !== "function") continue;
        const propertyStyles = resolved.descriptor.createPropertyCssStyles(property, value);
        for (const [styleName, styleValue] of Object.entries(propertyStyles ?? {})) {
            if (styleValue != null && styleValue !== "") styles[styleName] = String(styleValue);
        }
    }
    return styles;
}

/** Resolve a style group descriptor by its stable string key. */
export function Resolve(key: string): typeof Border | typeof Margin | typeof Padding | typeof BorderRadius | typeof Colors | typeof ElementSize | typeof Text | null {
    if (key === Border.Key) return Border;
    if (key === Margin.Key) return Margin;
    if (key === Padding.Key) return Padding;
    if (key === BorderRadius.Key) return BorderRadius;
    if (key === Colors.Key) return Colors;
    if (key === ElementSize.Key) return ElementSize;
    if (key === Text.Key) return Text;
    return null;
}
