import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";
import {
    CreateBorderRadiusInputGroup,
    ParseBorderRadiusStyleValue,
    type BorderRadiusInputGroupComponents,
    type BorderRadiusInputGroupState,
} from "./BorderRadiusInputGroup";

export enum BorderRadiusCorner {
    TOP_LEFT = "border-top-left-radius",
    TOP_RIGHT = "border-top-right-radius",
    BOTTOM_RIGHT = "border-bottom-right-radius",
    BOTTOM_LEFT = "border-bottom-left-radius",
}

export const BorderRadiusCornerSets = Object.freeze({
    ALL: [
        BorderRadiusCorner.TOP_LEFT,
        BorderRadiusCorner.TOP_RIGHT,
        BorderRadiusCorner.BOTTOM_RIGHT,
        BorderRadiusCorner.BOTTOM_LEFT,
    ] as const,
    TOP: [BorderRadiusCorner.TOP_LEFT, BorderRadiusCorner.TOP_RIGHT] as const,
    RIGHT: [BorderRadiusCorner.TOP_RIGHT, BorderRadiusCorner.BOTTOM_RIGHT] as const,
    BOTTOM: [BorderRadiusCorner.BOTTOM_RIGHT, BorderRadiusCorner.BOTTOM_LEFT] as const,
    LEFT: [BorderRadiusCorner.BOTTOM_LEFT, BorderRadiusCorner.TOP_LEFT] as const,
});

export type BorderRadiusCornerSetName = keyof typeof BorderRadiusCornerSets;
export type BorderRadiusGroupValue<T> = Partial<Record<BorderRadiusCorner, T>>;
export type BorderRadiusGroupValues = BorderRadiusGroupValue<UtilConsts.Sizes | string | number | null>;

export type BorderRadiusCornerEditor = {
    corner: BorderRadiusCorner;
    component: any;
};

export type BorderRadiusCornerEditorConfig = {
    corners?: readonly BorderRadiusCorner[];
    cornerTitles?: Partial<Record<BorderRadiusCorner, string>>;
    labels?: Partial<{
        size: string;
        numberUnit: string;
        custom: string;
        sizePlaceholder: string;
        numberPlaceholder: string;
        unitPlaceholder: string;
        customPlaceholder: string;
    }>;
    onChange?: (
        corner: BorderRadiusCorner,
        value: string | null,
        state: BorderRadiusInputGroupState,
    ) => void;
};

export type CreateBorderRadiusCornerEditorsConfig = BorderRadiusCornerEditorConfig & {
    components: BorderRadiusInputGroupComponents;
};

export function CreateBorderRadiusGroup<T>(
    values: BorderRadiusGroupValue<T>,
): BorderRadiusGroupValue<T> {
    return {...values};
}

/** Convert configured border-radius corners into CSS values. */
export function CreateBorderRadiusCssStyles(
    group: BorderRadiusGroupValues,
): Partial<Record<string, string>> {
    const styles: Record<string, string> = {};
    for (const [corner, value] of Object.entries(group) as [BorderRadiusCorner, BorderRadiusGroupValues[BorderRadiusCorner]][]) {
        const key = corner.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        if (value === UtilConsts.Sizes.DEFAULT) {
            styles[key] = "0px";
            continue;
        }
        if (value == null || value === "") continue;
        const cssValue = typeof value === "number"
            ? UtilStyles.Css_SizeUnit(value, UtilConsts.Units.PEXEL)
            : Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)
                ? UtilStyles.Css_BorderRadius(value as UtilConsts.Sizes)
                : String(value);
        styles[key] = cssValue;
    }
    return styles;
}

/** Build one standard three-mode input group for each border-radius corner. */
export function CreateBorderRadiusCornerEditors(
    values: BorderRadiusGroupValues,
    config: CreateBorderRadiusCornerEditorsConfig,
): BorderRadiusCornerEditor[] {
    return (config.corners ?? BorderRadiusCornerSets.ALL).map((corner) => {
        const configuredValue = values[corner];
        const initial = ParseBorderRadiusStyleValue(configuredValue);
        const title = config.cornerTitles?.[corner] ?? `Border radius ${corner}`;
        const component = CreateBorderRadiusInputGroup(config.components, {
            inputGroupProps: {
                prop_name: corner,
                prop_labelTitle: title,
            },
            groupSelected: initial.mode,
            sizeValue: initial.sizeValue,
            numberValue: initial.numberValue,
            unitValue: initial.unitValue,
            customValue: initial.customValue,
            labels: config.labels,
            onChange: (value, state) => config.onChange?.(corner, value, state),
        });
        return {corner, component};
    });
}

export const BorderRadius = Object.freeze({
    Key: "borderRadius" as const,
    Title: "Border radius",
    Corner: BorderRadiusCorner,
    Properties: Object.freeze(Object.values(BorderRadiusCorner)),
    CornerSets: BorderRadiusCornerSets,
    create: CreateBorderRadiusGroup,
    createCssStyles: CreateBorderRadiusCssStyles,
    createPropertyCssStyles: (property: BorderRadiusCorner, value: BorderRadiusGroupValues[BorderRadiusCorner]) =>
        CreateBorderRadiusCssStyles({[property]: value}),
    createCornerEditors: CreateBorderRadiusCornerEditors,
});
