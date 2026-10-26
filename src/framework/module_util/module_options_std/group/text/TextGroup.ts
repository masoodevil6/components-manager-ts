import {FontSize} from "./FontSizeGroup";
import {LineHeight} from "./LineHeightGroup";

export type TextSelectValue = string | null;

function createTextSelectProperty(key: string, title: string, values: readonly string[]) {
    const property = key as TextSelectProperty;
    return Object.freeze({
        Key: property,
        Title: title,
        Values: Object.freeze([...values]),
        Properties: Object.freeze([property]),
        createPropertyCssStyles: (_property: TextSelectProperty, value: TextSelectValue) => {
            if (value == null || value === "") return {};
            const styleName = property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
            return {[styleName]: value};
        },
    });
}

export type TextSelectProperty = "text-align" | "font-weight" | "text-decoration" | "text-transform";

export const TextAlign = createTextSelectProperty("text-align", "Text align", [
    "start", "end", "left", "right", "center", "justify",
]);

export const FontWeight = createTextSelectProperty("font-weight", "Font weight", [
    "normal", "bold", "lighter", "bolder", "100", "200", "300", "400", "500", "600", "700", "800", "900",
]);

export const TextDecoration = createTextSelectProperty("text-decoration", "Text decoration", [
    "none", "underline", "overline", "line-through",
]);

export const TextTransform = createTextSelectProperty("text-transform", "Text transform", [
    "none", "capitalize", "uppercase", "lowercase",
]);

const TEXT_SELECT_PROPERTIES = [TextAlign, FontWeight, TextDecoration, TextTransform] as const;

/** TEXT category for standard text-related style options. */
export const Text = Object.freeze({
    Key: "text" as const,
    Title: "Text",
    FontSize,
    LineHeight,
    Align: TextAlign,
    Weight: FontWeight,
    Decoration: TextDecoration,
    Transform: TextTransform,
    Properties: Object.freeze([
        ...FontSize.Properties,
        ...LineHeight.Properties,
        ...TEXT_SELECT_PROPERTIES.flatMap((definition) => definition.Properties),
    ]),
});
