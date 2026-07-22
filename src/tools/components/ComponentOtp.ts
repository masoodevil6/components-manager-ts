import {
    ComponentBase,
    defineComponentMethods,
    defineComponentPatterns,
    defineComponentSchema,
    defineComponentTemplate,
    GOG_ExtractName,
    GOG_ExtractNameValue,
    GOG_SetValue,
    GOG_ValueOf
} from "../../core/ComponentBase";
import {ReactiveElement} from "../../core/ReactiveElement";
import {Observable} from "../../core/Observable";
import {ToolsCss} from "../../utils/ToolsCss";
import {ToolsComponents} from "./index";
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    SIZES, SizesType,
} from "../../utils/ToolsConsts";
import {TOOLS} from "../tools";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicConfigs_partDoseNotBody,
} from "../../core/component/SetupComponent";
import {
    ComponentLabelMethodsType,
    ComponentLabelPropsType,
} from "./ComponentLabel";
import {
    ComponentTimerDown,
    ComponentTimerDownMethodsType,
    ComponentTimerDownPropsType,
} from "./ComponentTimerDown";


export const ComponentOtpProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_size:          "prop_size",
    prop_name:          "prop_name",
    prop_input:         "prop_input",
    prop_langs:         "prop_langs",
    prop_length:        "prop_length",
} as const;


const ComponentOtpConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentOtpProps.prop_size]: {
            name:               ComponentOtpProps.prop_size,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentOtpProps.prop_name]: {
            name:               ComponentOtpProps.prop_name,
            value:              GOG_SetValue<string>("otp"),
        },
        [ComponentOtpProps.prop_input]: {
            name:               ComponentOtpProps.prop_input,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentOtpProps.prop_langs]: {
            name:               ComponentOtpProps.prop_langs,
            value:              GOG_SetValue<Record<string, any>>({
                _title_otp_description:   "کد برای شماره/ایمیل زیر ارسال شد",
                _tooltip_otp_description: null,
            }),
        },
        [ComponentOtpProps.prop_length]: {
            name:               ComponentOtpProps.prop_length,
            value:              GOG_SetValue<number>(6),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        ///----------------------
        STRUCTURE: {
            name:               "part_structure",
        },
        VALUE: {
            name:               "part_value",
        },
        ELEMENTS: {
            name:               "part_elements",
        },
        LABEL: {
            name:               "part_label",
        },
        INPUTS: {
            name:               "part_inputs",
        },
        TIMER_DOWN: {
            name:               "part_timerDown",
        },
    },
    templates: {
        BODY: {
            name:                "body",
        },
    },
    methods: {
        GET_NEW_TOKEN: {
            name:                      "fn_onGetNewToken",
            dataArgs: {},
            componentArgs: {}
        },
        FINISH_TOKEN: {
            name:                      "fn_onFinishToken",
            dataArgs: {},
            componentArgs: {}
        },
        CHANGE: {
            name:                      "fn_onChange",
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const;


export type ComponentOtpPropsType =                     GOG_ExtractNameValue<typeof ComponentOtpConfigs.keys>
export type ComponentOtpSchemaType =                    GOG_ExtractName<typeof ComponentOtpConfigs.schemas>
export type ComponentOtpTemplatesType =                 GOG_ExtractName<typeof ComponentOtpConfigs.templates>

export type ComponentOtp_Methods_GET_NEW_TOKEN_DataArgs =        GOG_ExtractNameValue<typeof ComponentOtpConfigs.methods.GET_NEW_TOKEN.dataArgs>
export type ComponentOtp_Methods_GET_NEW_TOKEN_ComponentArgs =   GOG_ExtractName<typeof ComponentOtpConfigs.methods.GET_NEW_TOKEN.componentArgs>
export type ComponentOtp_Methods_FINISH_TOKEN_DataArgs =         GOG_ExtractNameValue<typeof ComponentOtpConfigs.methods.FINISH_TOKEN.dataArgs>
export type ComponentOtp_Methods_FINISH_TOKEN_ComponentArgs =    GOG_ExtractName<typeof ComponentOtpConfigs.methods.FINISH_TOKEN.componentArgs>
export type ComponentOtp_Methods_CHANGE_DataArgs =               GOG_ExtractNameValue<typeof ComponentOtpConfigs.methods.CHANGE.dataArgs>
export type ComponentOtp_Methods_CHANGE_ComponentArgs =          GOG_ExtractName<typeof ComponentOtpConfigs.methods.CHANGE.componentArgs>

export type ComponentOtpMethodsType = {
    [ComponentOtpConfigs.methods.GET_NEW_TOKEN.name]: ComponentCallBackType<ComponentOtp_Methods_GET_NEW_TOKEN_ComponentArgs, ComponentOtp_Methods_GET_NEW_TOKEN_DataArgs>,
    [ComponentOtpConfigs.methods.FINISH_TOKEN.name]: ComponentCallBackType<ComponentOtp_Methods_FINISH_TOKEN_ComponentArgs, ComponentOtp_Methods_FINISH_TOKEN_DataArgs>,
    [ComponentOtpConfigs.methods.CHANGE.name]: ComponentCallBackType<ComponentOtp_Methods_CHANGE_ComponentArgs, ComponentOtp_Methods_CHANGE_DataArgs>,
}


export class ComponentOtpBase extends ComponentBase<
    ComponentOtpPropsType,
    ComponentOtpSchemaType,
    ComponentOtpTemplatesType,
    ComponentOtpMethodsType
>{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentOtpPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),

            [ComponentOtpConfigs.keys.prop_size.name]: {
                prop:                                             ComponentOtpConfigs.keys.prop_size.name,
                default:                                          ComponentOtpConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.otp.props.prop_size.title"),
                description:                                      Language.translate("components.otp.props.prop_size.description"),
            },
            [ComponentOtpConfigs.keys.prop_name.name]: {
                prop:                                             ComponentOtpConfigs.keys.prop_name.name,
                default:                                          ComponentOtpConfigs.keys.prop_name.value,
                title:                                            Language.translate("components.otp.props.prop_name.title"),
                description:                                      Language.translate("components.otp.props.prop_name.description"),
            },
            [ComponentOtpConfigs.keys.prop_input.name]: {
                prop:                                             ComponentOtpConfigs.keys.prop_input.name,
                default:                                          ComponentOtpConfigs.keys.prop_input.value,
                title:                                            Language.translate("components.otp.props.prop_input.title"),
                description:                                      Language.translate("components.otp.props.prop_input.description"),
            },
            [ComponentOtpConfigs.keys.prop_langs.name]: {
                prop:                                             ComponentOtpConfigs.keys.prop_langs.name,
                default:                                          ComponentOtpConfigs.keys.prop_langs.value,
                title:                                            Language.translate("components.otp.props.prop_langs.title"),
                description:                                      Language.translate("components.otp.props.prop_langs.description"),
            },
            [ComponentOtpConfigs.keys.prop_length.name]: {
                prop:                                             ComponentOtpConfigs.keys.prop_length.name,
                default:                                          ComponentOtpConfigs.keys.prop_length.value,
                title:                                            Language.translate("components.otp.props.prop_length.title"),
                description:                                      Language.translate("components.otp.props.prop_length.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentOtpSchemaType, ComponentOtpPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),

        STRUCTURE: {
            part:               ComponentOtpConfigs.schemas.STRUCTURE.name,
            title:              Language.translate("components.otp.schema.structure.title"),
            description:        Language.translate("components.otp.schema.structure.description"),
            props: []
        },
        VALUE: {
            part:               ComponentOtpConfigs.schemas.VALUE.name,
            title:              Language.translate("components.otp.schema.value.title"),
            description:        Language.translate("components.otp.schema.value.description"),
            props: []
        },
        ELEMENTS: {
            part:               ComponentOtpConfigs.schemas.ELEMENTS.name,
            title:              Language.translate("components.otp.schema.elements.title"),
            description:        Language.translate("components.otp.schema.elements.description"),
            props: []
        },
        LABEL: {
            part:               ComponentOtpConfigs.schemas.LABEL.name,
            title:              Language.translate("components.otp.schema.label.title"),
            description:        Language.translate("components.otp.schema.label.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_input.name],
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_langs.name],
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_size.name],
            ]
        },
        INPUTS: {
            part:               ComponentOtpConfigs.schemas.INPUTS.name,
            title:              Language.translate("components.otp.schema.inputs.title"),
            description:        Language.translate("components.otp.schema.inputs.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_length.name],
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_size.name],
            ]
        },
        TIMER_DOWN: {
            part:               ComponentOtpConfigs.schemas.TIMER_DOWN.name,
            title:              Language.translate("components.otp.schema.timerDown.title"),
            description:        Language.translate("components.otp.schema.timerDown.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_langs.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentOtpTemplatesType, ComponentOtpPropsType>({
        BODY: {
            title:                                            Language.translate("components.otp.template.body.title"),
            description:                                      Language.translate("components.otp.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentOtpConfigs.keys.prop_input.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentOtpMethodsType, ComponentOtpPropsType>({
        [ComponentOtpConfigs.methods.GET_NEW_TOKEN.name]: {
            title:                                            Language.translate("components.otp.methods.fn_onGetNewToken.title"),
            description:                                      Language.translate("components.otp.methods.fn_onGetNewToken.description"),
            args: {}
        },
        [ComponentOtpConfigs.methods.FINISH_TOKEN.name]: {
            title:                                            Language.translate("components.otp.methods.fn_onFinishToken.title"),
            description:                                      Language.translate("components.otp.methods.fn_onFinishToken.description"),
            args: {}
        },
        [ComponentOtpConfigs.methods.CHANGE.name]: {
            title:                                            Language.translate("components.otp.methods.fn_onChange.title"),
            description:                                      Language.translate("components.otp.methods.fn_onChange.description"),
            args: {}
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const otpComp = new ComponentOtp(
            {
                classList: ["col-md-3", "col-12", "border", "p-3", "m-2"],
                prop_input: "0912-345-6789",
                prop_length: 6,
                prop_size: SIZES.M,
                prop_langs: {
                    _title_otp_description:   "کد برای شماره زیر ارسال شد",
                    _tooltip_otp_description: "کد یکبار مصرف برای ورود به سیستم است",
                },
            } as any as ComponentOtpPropsType,
            <ComponentOtpMethodsType>{
                fn_onGetNewToken: (event) => {
                    console.log("get new token");
                    otpComp.call_startCountdown(2);
                },
                fn_onFinishToken: (event) => {
                    console.log("token finished");
                },
                fn_onChange: (event) => {
                    console.log("otp changed: ", otpComp.call_getValue());
                },
            }
        );

        setTimeout(() => {
            otpComp.call_startCountdown(2);
        }, 500);

        return otpComp.getElement() as HTMLElement;
    }
}


export class ComponentOtp extends ComponentOtpBase {

    private _OTP_VALUE = new Observable<string>("");
    private _OTP_TIMER: ComponentTimerDown | null = null;


    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentOtpPropsType,
        methods: ComponentOtpMethodsType,
        events = null
    ) {
        super("otp", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentOtpConfigs.schemas.STRUCTURE.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentOtpConfigs.schemas.STRUCTURE.name:
                return this.template_render_structure(attrsDefault, data, extra);
            case ComponentOtpConfigs.schemas.VALUE.name:
                return this.template_render_value(attrsDefault, data, extra);
            case ComponentOtpConfigs.schemas.ELEMENTS.name:
                return this.template_render_elements(attrsDefault, data, extra);
            case ComponentOtpConfigs.schemas.LABEL.name:
                return this.template_render_label(attrsDefault, data, extra);
            case ComponentOtpConfigs.schemas.INPUTS.name:
                return this.template_render_inputs(attrsDefault, data, extra);
            case ComponentOtpConfigs.schemas.TIMER_DOWN.name:
                return this.template_render_timerDown(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    /* ---------------------------------------------
        template_render_structure
    --------------------------------------------- */
    private template_render_structure(attrsDefault, data, extra): ReactiveElement {
        return ReactiveElement.part("section", {
            attrs: {
                ...attrsDefault,
                "id": `component-otp-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["position-relative"],
            children: [
                this.executeSchemaPart(ComponentOtpConfigs.schemas.VALUE.name),
                this.executeSchemaPart(ComponentOtpConfigs.schemas.ELEMENTS.name),
            ]
        });
    }


    /* ---------------------------------------------
        template_render_value
    --------------------------------------------- */
    private template_render_value(attrsDefault, data, extra): ReactiveElement {
        return ReactiveElement.input({
            attrs: {
                ...attrsDefault,
                "type": "hidden",
                "name": `otp_value_${this._COMPONENT_RANDOM_ID}`,
            },
            propsBind: {
                value: this._OTP_VALUE,
            },
        });
    }


    /* ---------------------------------------------
        template_render_elements
    --------------------------------------------- */
    private template_render_elements(attrsDefault, data, extra): ReactiveElement {
        return ReactiveElement.part("section", {
            attrs: {
                ...attrsDefault,
                "id": `component-otp-elements-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["component-element-structure", "mb-2"],
            children: [
                this.executeSchemaPart(ComponentOtpConfigs.schemas.LABEL.name),
                this.executeSchemaPart(ComponentOtpConfigs.schemas.INPUTS.name),
                this.executeSchemaPart(ComponentOtpConfigs.schemas.TIMER_DOWN.name),
            ]
        });
    }


    /* ---------------------------------------------
        template_render_label
    --------------------------------------------- */
    private template_render_label(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_name = data[ComponentOtpConfigs.keys.prop_name.name];
            const prop_input = data[ComponentOtpConfigs.keys.prop_input.name];
            const prop_langs = data[ComponentOtpConfigs.keys.prop_langs.name];

            const titleText = Observable.computed(
                (langs, input) => {
                    const desc = langs != null && langs.hasOwnProperty("_title_otp_description")
                        ? langs._title_otp_description
                        : "";
                    const inputVal = input != null ? input : "";
                    return `<p class="title-otp text-center mb-0 px-2">${desc}<b style="display:block; direction: ltr">${inputVal}</b></p>`;
                },
                [prop_langs, prop_input],
                this.getScope()
            );

            const labelEl = new ToolsComponents.ComponentLabel(
                {
                    classList: [],
                    styles: {},

                    prop_labelTitle: titleText,
                    prop_labelFor: `component-otp-inputs-${this._COMPONENT_RANDOM_ID}-${Observable.isObservable(prop_name) ? prop_name.get() : prop_name}0`,
                } as unknown as ComponentLabelPropsType,
                <ComponentLabelMethodsType>{}
            );

            return labelEl.getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_inputs
    --------------------------------------------- */
    private template_render_inputs(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_name = data[ComponentOtpConfigs.keys.prop_name.name];
            const prop_length = data[ComponentOtpConfigs.keys.prop_length.name];
            const prop_size = data[ComponentOtpConfigs.keys.prop_size.name];

            const sizeName = Observable.isObservable(prop_size) ? prop_size.get() : prop_size;
            const nameVal = Observable.isObservable(prop_name) ? prop_name.get() : prop_name;
            const lengthVal = Observable.isObservable(prop_length) ? prop_length.get() : prop_length;

            const elHeight = ToolsCss.getHeightSize(sizeName ?? SIZES.M);

            const inputElements: ReactiveElement[] = [];
            for (let num = 0; num < lengthVal; num++) {
                const inputId = `component-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${num}`;
                const nextInputId = num < lengthVal - 1
                    ? `component-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${num + 1}`
                    : null;
                const prevInputId = num > 0
                    ? `component-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${num - 1}`
                    : null;

                inputElements.push(ReactiveElement.input({
                    attrs: {
                        "id": inputId,
                        "type": "text",
                        "maxlength": "1",
                    },
                    className: ["input-otp", "my-1", "mx-2", "text-center", "form-control", "rounded-0", "border", "rounded", "shadow-sm", "font-10pt"],
                    styles: {
                        height: `${elHeight}px`,
                        lineHeight: `${elHeight}px`,
                    },
                    on: {
                        input: (event: Event) => this.fn_onMoveToNext(event, nextInputId),
                        keydown: (event: Event) => {
                            if (prevInputId) this.fn_onMoveToPrev(event, prevInputId);
                        },
                        focus: (event: Event) => this.fn_onFocus(event, inputId),
                    },
                }));
            }

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-otp-inputs-${this._COMPONENT_RANDOM_ID}`,
                },
                styles: {
                    direction: "ltr",
                },
                className: ["form-otp", "inputs", "d-flex", "flex-row", "justify-content-center"],
                children: inputElements,
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_timerDown
    --------------------------------------------- */
    private template_render_timerDown(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_langs = data[ComponentOtpConfigs.keys.prop_langs.name];

            const descObservable = Observable.computed(
                (langs) => {
                    return langs != null && langs.hasOwnProperty("_tooltip_otp_description")
                        ? langs._tooltip_otp_description
                        : null;
                },
                [prop_langs],
                this.getScope()
            );

            this._OTP_TIMER = new ToolsComponents.ComponentTimerDown(
                {
                    classList: [],
                    styles: {},

                    prop_description: descObservable,
                } as unknown as ComponentTimerDownPropsType,
                <ComponentTimerDownMethodsType>{
                    fn_onClickRetry: (event) => {
                        this.fn_onGetNewToken(event);
                    },
                    fn_onFinishTimer: (event) => {
                        this.fn_onFinishToken(event);
                    },
                }
            );

            return this._OTP_TIMER.getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        FUNCTIONs
    --------------------------------------------- */
    private fn_onMoveToNext(event: Event, nextFieldId: string | null) {
        const ke = event as KeyboardEvent;
        if (ke.key !== 'Backspace' && (event.target as HTMLInputElement).value !== '') {
            if (nextFieldId != null) {
                const el = document.getElementById(nextFieldId);
                if (el != null) {
                    el.focus();
                }
            }
        }
        this.fn_onGetValue();
    }

    private fn_onMoveToPrev(event: Event, prevFieldId: string) {
        const ke = event as KeyboardEvent;
        if (ke.key === 'Backspace' && (event.target as HTMLInputElement).value === '') {
            const el = document.getElementById(prevFieldId);
            if (el != null) {
                el.focus();
            }
        }
        this.fn_onGetValue();
    }

    private fn_onFocus(event: Event, myElId: string) {
        const el = document.getElementById(myElId) as HTMLInputElement;
        if (el != null) {
            el.value = "";
        }
        this.fn_onGetValue();
    }

    private fn_onGetValue() {
        let resultExp = "";

        const data = this._COMPONENT_CONFIG as any;
        if (data) {
            const prop_length = data[ComponentOtpConfigs.keys.prop_length.name];
            const prop_name = data[ComponentOtpConfigs.keys.prop_name.name];

            const lengthVal = Observable.isObservable(prop_length) ? prop_length.get() : prop_length;
            const nameVal = Observable.isObservable(prop_name) ? prop_name.get() : prop_name;

            for (let i = 0; i < lengthVal; i++) {
                const partEl = document.querySelector(`input#component-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${i}`) as HTMLInputElement;
                if (partEl) {
                    resultExp += partEl.value;
                }
            }
        }

        this._OTP_VALUE.set(resultExp);

        this.fn_onChange();

        return resultExp;
    }

    fn_onGetNewToken(event: Event) {
        const params: ComponentOtp_Methods_GET_NEW_TOKEN_DataArgs = {};
        this.executeMethod(ComponentOtpConfigs.methods.GET_NEW_TOKEN.name, event, params);
    }

    fn_onFinishToken(event?: Event) {
        const params: ComponentOtp_Methods_FINISH_TOKEN_DataArgs = {};
        this.executeMethod(ComponentOtpConfigs.methods.FINISH_TOKEN.name, event ?? new Event("finish"), params);
    }

    fn_onChange(event?: Event) {
        const params: ComponentOtp_Methods_CHANGE_DataArgs = {};
        this.executeMethod(ComponentOtpConfigs.methods.CHANGE.name, event ?? new Event("change"), params);
    }

    call_startCountdown(durationForEnd: number) {
        if (this._OTP_TIMER != null) {
            const now = new Date().getTime();
            this._OTP_TIMER.call_startCountdown(now + durationForEnd * 60 * 1000);
        }
    }

    call_getValue(): string {
        return this._OTP_VALUE.get();
    }
}
