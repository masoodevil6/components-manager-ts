import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";

export enum LineHeightInputGroupMode {
    SIZE = "SIZE",
    NUMBER_UNIT = "NUMBER_UNIT",
    CUSTOM = "CUSTOM",
}

export type LineHeightInputGroupValue = {
    size?: UtilConsts.Sizes | null;
    value?: number | string | null;
    unit?: UtilConsts.Units | null;
    custom?: string | null;
};

export type LineHeightInputGroupState = {
    mode: LineHeightInputGroupMode;
    values: LineHeightInputGroupValue;
};

export type LineHeightInputGroupOnChange = (
    cssValue: string | null,
    state: LineHeightInputGroupState,
) => void;

export type LineHeightInputGroupComponentCreator =
    | ((config?: Record<string, any>, methods?: Record<string, any>) => any)
    | (new (config?: Record<string, any>, methods?: Record<string, any>) => any);

export type LineHeightInputGroupComponents = {
    InputGroup: LineHeightInputGroupComponentCreator;
    InputSimple: LineHeightInputGroupComponentCreator;
    SelectCustomSimple: LineHeightInputGroupComponentCreator;
};

export type LineHeightInputGroupConfig = {
    inputGroupProps?: Record<string, any>;
    groupSelected?: LineHeightInputGroupMode | null;
    labels?: Partial<{
        title: string;
        size: string;
        numberUnit: string;
        custom: string;
        sizePlaceholder: string;
        numberPlaceholder: string;
        unitPlaceholder: string;
        customPlaceholder: string;
    }>;
    sizeValue?: UtilConsts.Sizes;
    numberValue?: number | string;
    unitValue?: UtilConsts.Units;
    customValue?: string;
    onChange?: LineHeightInputGroupOnChange;
};

export type LineHeightInputGroupInitialValue = {
    mode: LineHeightInputGroupMode;
    sizeValue?: UtilConsts.Sizes;
    numberValue?: number | string;
    unitValue?: UtilConsts.Units;
    customValue?: string;
};

const DEFAULT_LABELS = {
    title: "Line height",
    size: "Preset size",
    numberUnit: "Number + unit",
    custom: "Custom",
    sizePlaceholder: "Size",
    numberPlaceholder: "Number",
    unitPlaceholder: "Unit",
    customPlaceholder: "CSS line-height value",
};

const createComponent = (
    creator: LineHeightInputGroupComponentCreator,
    config: Record<string, any>,
    methods?: Record<string, any>,
): any => {
    const factory = creator as any;
    try {
        const instance = factory(config, methods);
        if (instance != null) return instance;
    } catch {
        // Component classes require `new`; category factories are callable.
    }
    return new factory(config, methods);
};

const readComponentProp = (component: any, propName: string): any => {
    if (typeof component?.get === "function") return component.get(propName);
    return component?._COMPONENT_PROPS_BIND?.[propName]?.get?.();
};

export function ResolveLineHeightStyleValue(
    mode: LineHeightInputGroupMode | string | null,
    values: LineHeightInputGroupValue,
): string | null {
    if (mode === LineHeightInputGroupMode.SIZE) {
        const size = values?.size;
        if (size === UtilConsts.Sizes.DEFAULT) return "normal";
        if (size != null && Object.values(UtilConsts.Sizes).includes(size)) {
            return UtilStyles.Css_Height(size);
        }
        return null;
    }

    if (mode === LineHeightInputGroupMode.NUMBER_UNIT) {
        if (values?.value == null || String(values.value).trim() === "") return null;
        const numericValue = Number(values.value);
        if (!Number.isFinite(numericValue)) return null;
        const unit = values.unit ?? UtilConsts.Units.PEXEL;
        if (!Object.values(UtilConsts.Units).includes(unit)) return null;
        return UtilStyles.Css_SizeUnit(numericValue, unit);
    }

    if (mode === LineHeightInputGroupMode.CUSTOM) {
        const customValue = values?.custom;
        return typeof customValue === "string" && customValue.trim() !== ""
            ? customValue.trim()
            : null;
    }

    return null;
}

export function ParseLineHeightStyleValue(value: unknown): LineHeightInputGroupInitialValue {
    if (value == null || value === "") {
        return {mode: LineHeightInputGroupMode.SIZE, sizeValue: UtilConsts.Sizes.DEFAULT};
    }

    if (Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)) {
        return {mode: LineHeightInputGroupMode.SIZE, sizeValue: value as UtilConsts.Sizes};
    }

    if (typeof value === "number" && Number.isFinite(value)) {
        return {mode: LineHeightInputGroupMode.NUMBER_UNIT, numberValue: value, unitValue: UtilConsts.Units.PEXEL};
    }

    if (typeof value !== "string") {
        return {mode: LineHeightInputGroupMode.CUSTOM, customValue: String(value)};
    }

    const cssValue = value.trim();
    const preset = Object.values(UtilConsts.Sizes).find(
        (size) => UtilStyles.Css_Height(size) === cssValue,
    );
    if (preset) return {mode: LineHeightInputGroupMode.SIZE, sizeValue: preset};
    if (cssValue.toLowerCase() === "normal") {
        return {mode: LineHeightInputGroupMode.SIZE, sizeValue: UtilConsts.Sizes.DEFAULT};
    }

    const numberUnit = cssValue.match(/^([+-]?(?:\d+\.?\d*|\.\d+))(%|px|pt|vh)$/i);
    if (numberUnit) {
        const unit = Object.values(UtilConsts.Units).find(
            (candidate) => candidate.toLowerCase() === numberUnit[2].toLowerCase(),
        );
        if (unit) {
            return {
                mode: LineHeightInputGroupMode.NUMBER_UNIT,
                numberValue: numberUnit[1],
                unitValue: unit,
            };
        }
    }

    return {mode: LineHeightInputGroupMode.CUSTOM, customValue: cssValue};
}

export function CreateLineHeightInputGroup(
    components: LineHeightInputGroupComponents,
    config: LineHeightInputGroupConfig = {},
): any {
    const labels = {...DEFAULT_LABELS, ...config.labels};
    const sizeInput = createComponent(components.SelectCustomSimple, {
        prop_selectName: "size",
        prop_selectValue: config.sizeValue ?? UtilConsts.Sizes.DEFAULT,
        prop_selectPlaceholder: labels.sizePlaceholder,
        prop_selectTypeShow: "just_name",
        prop_selectOptions: Object.values(UtilConsts.Sizes).map((size) => ({
            id: size,
            name: size,
            prefix: "",
        })),
    });
    const numberInput = createComponent(components.InputSimple, {
        prop_inputName: "value",
        prop_inputValue: String(config.numberValue ?? 24),
        prop_inputPlaceholder: labels.numberPlaceholder,
        prop_inputType: "number",
    });
    const unitInput = createComponent(components.SelectCustomSimple, {
        prop_selectName: "unit",
        prop_selectValue: config.unitValue ?? UtilConsts.Units.PEXEL,
        prop_selectPlaceholder: labels.unitPlaceholder,
        prop_selectTypeShow: "just_name",
        prop_selectOptions: Object.values(UtilConsts.Units).map((unit) => ({
            id: unit,
            name: unit,
            prefix: "",
        })),
    });
    const customInput = createComponent(components.InputSimple, {
        prop_inputName: "custom",
        prop_inputValue: config.customValue ?? "",
        prop_inputPlaceholder: labels.customPlaceholder,
        prop_inputType: "string",
    });

    const groupDefinitions = [
        {
            id: LineHeightInputGroupMode.SIZE,
            title: labels.size,
            inputs: [{type: "INPUT", input: sizeInput, width: "COL_12"}],
        },
        {
            id: LineHeightInputGroupMode.NUMBER_UNIT,
            title: labels.numberUnit,
            inputs: [
                {type: "INPUT", input: numberInput, width: "COL_8"},
                {type: "INPUT", input: unitInput, width: "COL_4"},
            ],
        },
        {
            id: LineHeightInputGroupMode.CUSTOM,
            title: labels.custom,
            inputs: [{type: "INPUT", input: customInput, width: "COL_12"}],
        },
    ];

    const readValues = (mode: LineHeightInputGroupMode): LineHeightInputGroupValue => {
        switch (mode) {
            case LineHeightInputGroupMode.SIZE:
                return {size: readComponentProp(sizeInput, "prop_selectValue")};
            case LineHeightInputGroupMode.NUMBER_UNIT:
                return {
                    value: readComponentProp(numberInput, "prop_inputValue"),
                    unit: readComponentProp(unitInput, "prop_selectValue"),
                };
            case LineHeightInputGroupMode.CUSTOM:
                return {custom: readComponentProp(customInput, "prop_inputValue")};
        }
    };

    const notifyChange = function(this: any): void {
        if (!config.onChange) return;
        const mode = this.get("prop_groupSelected") as LineHeightInputGroupMode;
        const state = {mode, values: readValues(mode)};
        config.onChange(ResolveLineHeightStyleValue(mode, state.values), state);
    };

    const inputGroupProps = config.inputGroupProps ?? {};
    return createComponent(
        components.InputGroup,
        {
            ...inputGroupProps,
            prop_name: inputGroupProps.prop_name ?? "lineHeight",
            prop_labelTitle: inputGroupProps.prop_labelTitle ?? labels.title,
            prop_groupSelected: config.groupSelected !== undefined
                ? config.groupSelected
                : inputGroupProps.prop_groupSelected ?? LineHeightInputGroupMode.SIZE,
            prop_inputs: groupDefinitions,
        },
        {
            INPUT_CHANGE: notifyChange,
            CHANGE_GROUP: notifyChange,
        },
    );
}
