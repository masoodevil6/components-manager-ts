import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";

export enum WidthInputGroupMode {
    SIZE = "SIZE",
    NUMBER_UNIT = "NUMBER_UNIT",
    CUSTOM = "CUSTOM",
}

export type WidthInputGroupValue = {
    size?: UtilConsts.Sizes | null;
    value?: number | string | null;
    unit?: UtilConsts.Units | null;
    custom?: string | null;
};

export type WidthInputGroupState = {
    mode: WidthInputGroupMode;
    values: WidthInputGroupValue;
};

export type WidthInputGroupOnChange = (
    cssValue: string | null,
    state: WidthInputGroupState,
) => void;

export type WidthInputGroupComponentCreator =
    | ((config?: Record<string, any>, methods?: Record<string, any>) => any)
    | (new (config?: Record<string, any>, methods?: Record<string, any>) => any);

export type WidthInputGroupComponents = {
    InputGroup: WidthInputGroupComponentCreator;
    InputSimple: WidthInputGroupComponentCreator;
    SelectCustomSimple: WidthInputGroupComponentCreator;
};

export type WidthInputGroupConfig = {
    inputGroupProps?: Record<string, any>;
    groupSelected?: WidthInputGroupMode | null;
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
    onChange?: WidthInputGroupOnChange;
};

export type WidthInputGroupInitialValue = {
    mode: WidthInputGroupMode;
    sizeValue?: UtilConsts.Sizes;
    numberValue?: number | string;
    unitValue?: UtilConsts.Units;
    customValue?: string;
};

const DEFAULT_LABELS = {
    title: "Width",
    size: "Preset size",
    numberUnit: "Number + unit",
    custom: "Custom",
    sizePlaceholder: "Size",
    numberPlaceholder: "Number",
    unitPlaceholder: "Unit",
    customPlaceholder: "CSS width value",
};

const createComponent = (
    creator: WidthInputGroupComponentCreator,
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

export function ResolveWidthStyleValue(
    mode: WidthInputGroupMode | string | null,
    values: WidthInputGroupValue,
): string | null {
    if (mode === WidthInputGroupMode.SIZE) {
        const size = values?.size;
        if (size === UtilConsts.Sizes.DEFAULT) return "auto";
        if (size != null && Object.values(UtilConsts.Sizes).includes(size)) {
            return UtilStyles.Css_Height(size);
        }
        return null;
    }

    if (mode === WidthInputGroupMode.NUMBER_UNIT) {
        if (values?.value == null || String(values.value).trim() === "") return null;
        const numericValue = Number(values.value);
        if (!Number.isFinite(numericValue)) return null;
        const unit = values.unit ?? UtilConsts.Units.PEXEL;
        if (!Object.values(UtilConsts.Units).includes(unit)) return null;
        return UtilStyles.Css_SizeUnit(numericValue, unit);
    }

    if (mode === WidthInputGroupMode.CUSTOM) {
        const customValue = values?.custom;
        return typeof customValue === "string" && customValue.trim() !== ""
            ? customValue.trim()
            : null;
    }

    return null;
}

/** Parse a configured width value so its editor opens in the matching mode. */
export function ParseWidthStyleValue(value: unknown): WidthInputGroupInitialValue {
    if (value == null || value === "") {
        return {mode: WidthInputGroupMode.SIZE, sizeValue: UtilConsts.Sizes.DEFAULT};
    }

    if (Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)) {
        return {mode: WidthInputGroupMode.SIZE, sizeValue: value as UtilConsts.Sizes};
    }

    if (typeof value === "number" && Number.isFinite(value)) {
        return {mode: WidthInputGroupMode.NUMBER_UNIT, numberValue: value, unitValue: UtilConsts.Units.PEXEL};
    }

    if (typeof value !== "string") {
        return {mode: WidthInputGroupMode.CUSTOM, customValue: String(value)};
    }

    const cssValue = value.trim();
    const preset = Object.values(UtilConsts.Sizes).find(
        (size) => UtilStyles.Css_Height(size) === cssValue,
    );
    if (preset) return {mode: WidthInputGroupMode.SIZE, sizeValue: preset};
    if (cssValue.toLowerCase() === "auto") {
        return {mode: WidthInputGroupMode.SIZE, sizeValue: UtilConsts.Sizes.DEFAULT};
    }

    const numberUnit = cssValue.match(/^([+-]?(?:\d+\.?\d*|\.\d+))(%|px|pt|vh)$/i);
    if (numberUnit) {
        const unit = Object.values(UtilConsts.Units).find(
            (candidate) => candidate.toLowerCase() === numberUnit[2].toLowerCase(),
        );
        if (unit) {
            return {
                mode: WidthInputGroupMode.NUMBER_UNIT,
                numberValue: numberUnit[1],
                unitValue: unit,
            };
        }
    }

    return {mode: WidthInputGroupMode.CUSTOM, customValue: cssValue};
}

/** Create a reusable editor with preset, number + unit, and custom CSS modes. */
export function CreateWidthInputGroup(
    components: WidthInputGroupComponents,
    config: WidthInputGroupConfig = {},
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
        prop_inputValue: String(config.numberValue ?? 1),
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
            id: WidthInputGroupMode.SIZE,
            title: labels.size,
            inputs: [{type: "INPUT", input: sizeInput, width: "COL_12"}],
        },
        {
            id: WidthInputGroupMode.NUMBER_UNIT,
            title: labels.numberUnit,
            inputs: [
                {type: "INPUT", input: numberInput, width: "COL_8"},
                {type: "INPUT", input: unitInput, width: "COL_4"},
            ],
        },
        {
            id: WidthInputGroupMode.CUSTOM,
            title: labels.custom,
            inputs: [{type: "INPUT", input: customInput, width: "COL_12"}],
        },
    ];

    const readValues = (mode: WidthInputGroupMode): WidthInputGroupValue => {
        switch (mode) {
            case WidthInputGroupMode.SIZE:
                return {size: readComponentProp(sizeInput, "prop_selectValue")};
            case WidthInputGroupMode.NUMBER_UNIT:
                return {
                    value: readComponentProp(numberInput, "prop_inputValue"),
                    unit: readComponentProp(unitInput, "prop_selectValue"),
                };
            case WidthInputGroupMode.CUSTOM:
                return {custom: readComponentProp(customInput, "prop_inputValue")};
        }
    };

    const notifyChange = function(this: any): void {
        if (!config.onChange) return;
        const mode = this.get("prop_groupSelected") as WidthInputGroupMode;
        const state = {mode, values: readValues(mode)};
        config.onChange(ResolveWidthStyleValue(mode, state.values), state);
    };

    const inputGroupProps = config.inputGroupProps ?? {};
    return createComponent(
        components.InputGroup,
        {
            ...inputGroupProps,
            prop_name: inputGroupProps.prop_name ?? "width",
            prop_labelTitle: inputGroupProps.prop_labelTitle ?? labels.title,
            prop_groupSelected: config.groupSelected !== undefined
                ? config.groupSelected
                : inputGroupProps.prop_groupSelected ?? WidthInputGroupMode.SIZE,
            prop_inputs: groupDefinitions,
        },
        {
            INPUT_CHANGE: notifyChange,
            CHANGE_GROUP: notifyChange,
        },
    );
}

export const Width = Object.freeze({
    Mode: WidthInputGroupMode,
    createInputGroup: CreateWidthInputGroup,
    resolve: ResolveWidthStyleValue,
    parse: ParseWidthStyleValue,
});
