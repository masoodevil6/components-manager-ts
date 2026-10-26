import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";

export enum BorderInputGroupMode {
    SIZE = "SIZE",
    NUMBER_UNIT = "NUMBER_UNIT",
    CUSTOM = "CUSTOM",
}

export type BorderInputGroupValue = {
    size?: UtilConsts.Sizes | null;
    value?: number | string | null;
    unit?: UtilConsts.Units | null;
    custom?: string | null;
};

export type BorderInputGroupState = {
    mode: BorderInputGroupMode;
    values: BorderInputGroupValue;
};

export type BorderInputGroupOnChange = (
    cssValue: string | null,
    state: BorderInputGroupState,
) => void;

export type BorderInputGroupComponentCreator =
    | ((config?: Record<string, any>, methods?: Record<string, any>) => any)
    | (new (config?: Record<string, any>, methods?: Record<string, any>) => any);

export type BorderInputGroupComponents = {
    InputGroup: BorderInputGroupComponentCreator;
    InputSimple: BorderInputGroupComponentCreator;
    SelectCustomSimple: BorderInputGroupComponentCreator;
};

export type BorderInputGroupConfig = {
    inputGroupProps?: Record<string, any>;
    groupSelected?: BorderInputGroupMode | null;
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
    onChange?: BorderInputGroupOnChange;
};

export type BorderInputGroupInitialValue = {
    mode: BorderInputGroupMode;
    sizeValue?: UtilConsts.Sizes;
    numberValue?: number | string;
    unitValue?: UtilConsts.Units;
    customValue?: string;
};

const DEFAULT_LABELS = {
    title: "Border width",
    size: "Preset size",
    numberUnit: "Number + unit",
    custom: "Custom",
    sizePlaceholder: "Size",
    numberPlaceholder: "Number",
    unitPlaceholder: "Unit",
    customPlaceholder: "CSS border width",
};

const createComponent = (
    creator: BorderInputGroupComponentCreator,
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

/** Convert the selected border editor fields into a CSS border-width value. */
export function ResolveBorderStyleValue(
    mode: BorderInputGroupMode | string | null,
    values: BorderInputGroupValue,
): string | null {
    if (mode === BorderInputGroupMode.SIZE) {
        const size = values?.size;
        if (size != null && Object.values(UtilConsts.Sizes).includes(size)) {
            return UtilStyles.Css_BorderWidth(size);
        }
        return null;
    }

    if (mode === BorderInputGroupMode.NUMBER_UNIT) {
        if (values?.value == null || String(values.value).trim() === "") return null;
        const numericValue = Number(values.value);
        if (!Number.isFinite(numericValue)) return null;
        const unit = values.unit ?? UtilConsts.Units.PEXEL;
        if (!Object.values(UtilConsts.Units).includes(unit)) return null;
        return UtilStyles.Css_SizeUnit(numericValue, unit);
    }

    if (mode === BorderInputGroupMode.CUSTOM) {
        const customValue = values?.custom;
        return typeof customValue === "string" && customValue.trim() !== ""
            ? customValue.trim()
            : null;
    }

    return null;
}

/** Interpret an existing CSS value so the standard editor opens in its matching mode. */
export function ParseBorderStyleValue(value: unknown): BorderInputGroupInitialValue {
    if (value != null && Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)) {
        return {mode: BorderInputGroupMode.SIZE, sizeValue: value as UtilConsts.Sizes};
    }

    if (typeof value === "number" && Number.isFinite(value)) {
        return {mode: BorderInputGroupMode.NUMBER_UNIT, numberValue: value, unitValue: UtilConsts.Units.PEXEL};
    }

    if (typeof value !== "string" || value.trim() === "") {
        return {mode: BorderInputGroupMode.CUSTOM, customValue: ""};
    }

    const cssValue = value.trim();
    const preset = Object.values(UtilConsts.Sizes).find(
        (size) => UtilStyles.Css_BorderWidth(size) === cssValue,
    );
    if (preset) return {mode: BorderInputGroupMode.SIZE, sizeValue: preset};

    const numberUnit = cssValue.match(/^([+-]?(?:\d+\.?\d*|\.\d+))(%|px|pt|vh)$/i);
    if (numberUnit) {
        const unit = Object.values(UtilConsts.Units).find(
            (candidate) => candidate.toLowerCase() === numberUnit[2].toLowerCase(),
        );
        if (unit) {
            return {
                mode: BorderInputGroupMode.NUMBER_UNIT,
                numberValue: numberUnit[1],
                unitValue: unit,
            };
        }
    }

    return {mode: BorderInputGroupMode.CUSTOM, customValue: cssValue};
}

/**
 * Create a reusable ComponentInputGroup for choosing a border width as a
 * project size, a number plus unit, or a custom CSS value.
 * UI component creators are injected so this utility module stays independent
 * from the UI category layer.
 */
export function CreateBorderInputGroup(
    components: BorderInputGroupComponents,
    config: BorderInputGroupConfig = {},
): any {
    const labels = {...DEFAULT_LABELS, ...config.labels};
    const sizeInput = createComponent(components.SelectCustomSimple, {
        prop_selectName: "size",
        prop_selectValue: config.sizeValue ?? UtilConsts.Sizes.M,
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
        prop_inputMin: 0,
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
            id: BorderInputGroupMode.SIZE,
            title: labels.size,
            inputs: [{type: "INPUT", input: sizeInput, width: "COL_12"}],
        },
        {
            id: BorderInputGroupMode.NUMBER_UNIT,
            title: labels.numberUnit,
            inputs: [
                {type: "INPUT", input: numberInput, width: "COL_8"},
                {type: "INPUT", input: unitInput, width: "COL_4"},
            ],
        },
        {
            id: BorderInputGroupMode.CUSTOM,
            title: labels.custom,
            inputs: [{type: "INPUT", input: customInput, width: "COL_12"}],
        },
    ];

    const readValues = (mode: BorderInputGroupMode): BorderInputGroupValue => {
        switch (mode) {
            case BorderInputGroupMode.SIZE:
                return {size: readComponentProp(sizeInput, "prop_selectValue")};
            case BorderInputGroupMode.NUMBER_UNIT:
                return {
                    value: readComponentProp(numberInput, "prop_inputValue"),
                    unit: readComponentProp(unitInput, "prop_selectValue"),
                };
            case BorderInputGroupMode.CUSTOM:
                return {custom: readComponentProp(customInput, "prop_inputValue")};
        }
    };

    const notifyChange = function(this: any): void {
        if (!config.onChange) return;
        const mode = this.get("prop_groupSelected") as BorderInputGroupMode;
        const state = {mode, values: readValues(mode)};
        config.onChange(ResolveBorderStyleValue(mode, state.values), state);
    };

    const inputGroupProps = config.inputGroupProps ?? {};
    return createComponent(
        components.InputGroup,
        {
            ...inputGroupProps,
            prop_name: inputGroupProps.prop_name ?? "borderWidth",
            prop_labelTitle: inputGroupProps.prop_labelTitle ?? labels.title,
            prop_groupSelected: config.groupSelected !== undefined
                ? config.groupSelected
                : inputGroupProps.prop_groupSelected ?? BorderInputGroupMode.SIZE,
            prop_inputs: groupDefinitions,
        },
        {
            INPUT_CHANGE: notifyChange,
            CHANGE_GROUP: notifyChange,
        },
    );
}

export const Border = Object.freeze({
    Mode: BorderInputGroupMode,
    createInputGroup: CreateBorderInputGroup,
    resolve: ResolveBorderStyleValue,
    parse: ParseBorderStyleValue,
});
