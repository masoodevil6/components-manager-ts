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


export const ComponentInputOtpProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_size:          "prop_size",
    prop_name:          "prop_name",
    prop_input:         "prop_input",
    prop_langs:         "prop_langs",
    prop_length:        "prop_length",
} as const;


const ComponentInputOtpConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentInputOtpProps.prop_size]: {
            name:               ComponentInputOtpProps.prop_size,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputOtpProps.prop_name]: {
            name:               ComponentInputOtpProps.prop_name,
            value:              GOG_SetValue<string>("otp"),
        },
        [ComponentInputOtpProps.prop_input]: {
            name:               ComponentInputOtpProps.prop_input,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputOtpProps.prop_langs]: {
            name:               ComponentInputOtpProps.prop_langs,
            value:              GOG_SetValue<Record<string, any>>({
                _title_otp_description:   "کد برای شماره/ایمیل زیر ارسال شد",
                _tooltip_otp_description: null,
            }),
        },
        [ComponentInputOtpProps.prop_length]: {
            name:               ComponentInputOtpProps.prop_length,
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


export type ComponentInputOtpPropsType =                     GOG_ExtractNameValue<typeof ComponentInputOtpConfigs.keys>
export type ComponentInputOtpSchemaType =                    GOG_ExtractName<typeof ComponentInputOtpConfigs.schemas>
export type ComponentInputOtpTemplatesType =                 GOG_ExtractName<typeof ComponentInputOtpConfigs.templates>

export type ComponentInputOtp_Methods_GET_NEW_TOKEN_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputOtpConfigs.methods.GET_NEW_TOKEN.dataArgs>
export type ComponentInputOtp_Methods_GET_NEW_TOKEN_ComponentArgs =   GOG_ExtractName<typeof ComponentInputOtpConfigs.methods.GET_NEW_TOKEN.componentArgs>
export type ComponentInputOtp_Methods_FINISH_TOKEN_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputOtpConfigs.methods.FINISH_TOKEN.dataArgs>
export type ComponentInputOtp_Methods_FINISH_TOKEN_ComponentArgs =    GOG_ExtractName<typeof ComponentInputOtpConfigs.methods.FINISH_TOKEN.componentArgs>
export type ComponentInputOtp_Methods_CHANGE_DataArgs =               GOG_ExtractNameValue<typeof ComponentInputOtpConfigs.methods.CHANGE.dataArgs>
export type ComponentInputOtp_Methods_CHANGE_ComponentArgs =          GOG_ExtractName<typeof ComponentInputOtpConfigs.methods.CHANGE.componentArgs>

export type ComponentInputOtpMethodsType = {
    [ComponentInputOtpConfigs.methods.GET_NEW_TOKEN.name]: ComponentCallBackType<ComponentInputOtp_Methods_GET_NEW_TOKEN_ComponentArgs, ComponentInputOtp_Methods_GET_NEW_TOKEN_DataArgs>,
    [ComponentInputOtpConfigs.methods.FINISH_TOKEN.name]: ComponentCallBackType<ComponentInputOtp_Methods_FINISH_TOKEN_ComponentArgs, ComponentInputOtp_Methods_FINISH_TOKEN_DataArgs>,
    [ComponentInputOtpConfigs.methods.CHANGE.name]: ComponentCallBackType<ComponentInputOtp_Methods_CHANGE_ComponentArgs, ComponentInputOtp_Methods_CHANGE_DataArgs>,
}


export class ComponentInputOtpBase extends ComponentBase<
    ComponentInputOtpPropsType,
    ComponentInputOtpSchemaType,
    ComponentInputOtpTemplatesType,
    ComponentInputOtpMethodsType
>{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputOtpPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),

            [ComponentInputOtpConfigs.keys.prop_size.name]: {
                prop:                                             ComponentInputOtpConfigs.keys.prop_size.name,
                default:                                          ComponentInputOtpConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.input_otp.props.prop_size.title"),
                description:                                      Language.translate("components.input_otp.props.prop_size.description"),
            },
            [ComponentInputOtpConfigs.keys.prop_name.name]: {
                prop:                                             ComponentInputOtpConfigs.keys.prop_name.name,
                default:                                          ComponentInputOtpConfigs.keys.prop_name.value,
                title:                                            Language.translate("components.input_otp.props.prop_name.title"),
                description:                                      Language.translate("components.input_otp.props.prop_name.description"),
            },
            [ComponentInputOtpConfigs.keys.prop_input.name]: {
                prop:                                             ComponentInputOtpConfigs.keys.prop_input.name,
                default:                                          ComponentInputOtpConfigs.keys.prop_input.value,
                title:                                            Language.translate("components.input_otp.props.prop_input.title"),
                description:                                      Language.translate("components.input_otp.props.prop_input.description"),
            },
            [ComponentInputOtpConfigs.keys.prop_langs.name]: {
                prop:                                             ComponentInputOtpConfigs.keys.prop_langs.name,
                default:                                          ComponentInputOtpConfigs.keys.prop_langs.value,
                title:                                            Language.translate("components.input_otp.props.prop_langs.title"),
                description:                                      Language.translate("components.input_otp.props.prop_langs.description"),
            },
            [ComponentInputOtpConfigs.keys.prop_length.name]: {
                prop:                                             ComponentInputOtpConfigs.keys.prop_length.name,
                default:                                          ComponentInputOtpConfigs.keys.prop_length.value,
                title:                                            Language.translate("components.input_otp.props.prop_length.title"),
                description:                                      Language.translate("components.input_otp.props.prop_length.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputOtpSchemaType, ComponentInputOtpPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),

        STRUCTURE: {
            part:               ComponentInputOtpConfigs.schemas.STRUCTURE.name,
            title:              Language.translate("components.input_otp.schema.structure.title"),
            description:        Language.translate("components.input_otp.schema.structure.description"),
            props: []
        },
        VALUE: {
            part:               ComponentInputOtpConfigs.schemas.VALUE.name,
            title:              Language.translate("components.input_otp.schema.value.title"),
            description:        Language.translate("components.input_otp.schema.value.description"),
            props: []
        },
        ELEMENTS: {
            part:               ComponentInputOtpConfigs.schemas.ELEMENTS.name,
            title:              Language.translate("components.input_otp.schema.elements.title"),
            description:        Language.translate("components.input_otp.schema.elements.description"),
            props: []
        },
        LABEL: {
            part:               ComponentInputOtpConfigs.schemas.LABEL.name,
            title:              Language.translate("components.input_otp.schema.label.title"),
            description:        Language.translate("components.input_otp.schema.label.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_input.name],
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_langs.name],
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_size.name],
            ]
        },
        INPUTS: {
            part:               ComponentInputOtpConfigs.schemas.INPUTS.name,
            title:              Language.translate("components.input_otp.schema.inputs.title"),
            description:        Language.translate("components.input_otp.schema.inputs.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_length.name],
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_size.name],
            ]
        },
        TIMER_DOWN: {
            part:               ComponentInputOtpConfigs.schemas.TIMER_DOWN.name,
            title:              Language.translate("components.input_otp.schema.timerDown.title"),
            description:        Language.translate("components.input_otp.schema.timerDown.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_langs.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputOtpTemplatesType, ComponentInputOtpPropsType>({
        BODY: {
            title:                                            Language.translate("components.input_otp.template.body.title"),
            description:                                      Language.translate("components.input_otp.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentInputOtpConfigs.keys.prop_input.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputOtpMethodsType, ComponentInputOtpPropsType>({
        [ComponentInputOtpConfigs.methods.GET_NEW_TOKEN.name]: {
            title:                                            Language.translate("components.input_otp.methods.fn_onGetNewToken.title"),
            description:                                      Language.translate("components.input_otp.methods.fn_onGetNewToken.description"),
            args: {}
        },
        [ComponentInputOtpConfigs.methods.FINISH_TOKEN.name]: {
            title:                                            Language.translate("components.input_otp.methods.fn_onFinishToken.title"),
            description:                                      Language.translate("components.input_otp.methods.fn_onFinishToken.description"),
            args: {}
        },
        [ComponentInputOtpConfigs.methods.CHANGE.name]: {
            title:                                            Language.translate("components.input_otp.methods.fn_onChange.title"),
            description:                                      Language.translate("components.input_otp.methods.fn_onChange.description"),
            args: {}
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const otpComp = new ComponentInputOtp(
            {
                classList: ["col-md-3", "col-12", "border", "p-3"],
                prop_input: "0912-345-6789",
                prop_length: 6,
                prop_size: SIZES.M,
                prop_langs: {
                    _title_otp_description:   "کد برای شماره زیر ارسال شد",
                    _tooltip_otp_description: "کد یکبار مصرف برای ورود به سیستم است",
                },
            } as any as ComponentInputOtpPropsType,
            <ComponentInputOtpMethodsType>{
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


export class ComponentInputOtp extends ComponentInputOtpBase {

    private _OTP_VALUE = new Observable<string>("");
    private _OTP_TIMER: ComponentTimerDown | null = null;


    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputOtpPropsType,
        methods: ComponentInputOtpMethodsType,
        events = null
    ) {
        super("input-otp", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputOtpConfigs.schemas.STRUCTURE.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputOtpConfigs.schemas.STRUCTURE.name:
                return this.template_render_structure(attrsDefault, data, extra);
            case ComponentInputOtpConfigs.schemas.VALUE.name:
                return this.template_render_value(attrsDefault, data, extra);
            case ComponentInputOtpConfigs.schemas.ELEMENTS.name:
                return this.template_render_elements(attrsDefault, data, extra);
            case ComponentInputOtpConfigs.schemas.LABEL.name:
                return this.template_render_label(attrsDefault, data, extra);
            case ComponentInputOtpConfigs.schemas.INPUTS.name:
                return this.template_render_inputs(attrsDefault, data, extra);
            case ComponentInputOtpConfigs.schemas.TIMER_DOWN.name:
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
                "id": `component-input-otp-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["position-relative"],
            children: [
                this.executeSchemaPart(ComponentInputOtpConfigs.schemas.VALUE.name),
                this.executeSchemaPart(ComponentInputOtpConfigs.schemas.ELEMENTS.name),
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
                "name": `input_otp_value_${this._COMPONENT_RANDOM_ID}`,
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
                "id": `component-input-otp-elements-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["component-element-structure", "mb-2"],
            children: [
                this.executeSchemaPart(ComponentInputOtpConfigs.schemas.LABEL.name),
                this.executeSchemaPart(ComponentInputOtpConfigs.schemas.INPUTS.name),
                this.executeSchemaPart(ComponentInputOtpConfigs.schemas.TIMER_DOWN.name),
            ]
        });
    }


    /* ---------------------------------------------
        template_render_label
    --------------------------------------------- */
    private template_render_label(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_name = data[ComponentInputOtpConfigs.keys.prop_name.name];
            const prop_input = data[ComponentInputOtpConfigs.keys.prop_input.name];
            const prop_langs = data[ComponentInputOtpConfigs.keys.prop_langs.name];

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
                    prop_labelFor: `component-input-otp-inputs-${this._COMPONENT_RANDOM_ID}-${Observable.isObservable(prop_name) ? prop_name.get() : prop_name}0`,
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
            const prop_name = data[ComponentInputOtpConfigs.keys.prop_name.name];
            const prop_length = data[ComponentInputOtpConfigs.keys.prop_length.name];

            const nameVal = Observable.isObservable(prop_name) ? prop_name.get() : prop_name;
            const lengthVal = Observable.isObservable(prop_length) ? prop_length.get() : prop_length;

            const inputElements: ReactiveElement[] = [];
            for (let num = 0; num < lengthVal; num++) {
                const inputId = `component-input-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${num}`;
                const nextInputId = num < lengthVal - 1
                    ? `component-input-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${num + 1}`
                    : null;
                const prevInputId = num > 0
                    ? `component-input-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${num - 1}`
                    : null;

                inputElements.push(ReactiveElement.input({
                    attrs: {
                        "id": inputId,
                        "type": "text",
                        "maxlength": "1",
                    },
                    className: ["input-otp", "py-1" , "my-1", "mx-2", "text-center", "form-control", "rounded-0", "border", "rounded", "shadow-sm", "font-10pt"],
                    stylesBind:{
                        fontSize :Observable.computed(
                            ( sizeName) => {
                                return `${ToolsCss.getFontSize(sizeName)}px`;
                            },
                            [
                                AppConfig.observable("sizeName")
                            ],
                            this.getScope()) ,
                        height :Observable.computed(
                            ( sizeName) => {
                                return `${ToolsCss.getHeightSize(sizeName)}px`;
                            },
                            [
                                AppConfig.observable("sizeName")
                            ],
                            this.getScope()) ,
                        lineHeight :Observable.computed(
                            ( sizeName) => {
                                return `${ToolsCss.getLineHeightSize(sizeName)}px`;
                            },
                            [
                                AppConfig.observable("sizeName")
                            ],
                            this.getScope()) ,
                    } ,
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
                    "id": `component-input-otp-inputs-${this._COMPONENT_RANDOM_ID}`,
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
            const prop_langs = data[ComponentInputOtpConfigs.keys.prop_langs.name];

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
            const prop_length = data[ComponentInputOtpConfigs.keys.prop_length.name];
            const prop_name = data[ComponentInputOtpConfigs.keys.prop_name.name];

            const lengthVal = Observable.isObservable(prop_length) ? prop_length.get() : prop_length;
            const nameVal = Observable.isObservable(prop_name) ? prop_name.get() : prop_name;

            for (let i = 0; i < lengthVal; i++) {
                const partEl = document.querySelector(`input#component-input-otp-inputs-${this._COMPONENT_RANDOM_ID}-${nameVal}${i}`) as HTMLInputElement;
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
        const params: ComponentInputOtp_Methods_GET_NEW_TOKEN_DataArgs = {};
        this.executeMethod(ComponentInputOtpConfigs.methods.GET_NEW_TOKEN.name, event, params);
    }

    fn_onFinishToken(event?: Event) {
        const params: ComponentInputOtp_Methods_FINISH_TOKEN_DataArgs = {};
        this.executeMethod(ComponentInputOtpConfigs.methods.FINISH_TOKEN.name, event ?? new Event("finish"), params);
    }

    fn_onChange(event?: Event) {
        const params: ComponentInputOtp_Methods_CHANGE_DataArgs = {};
        this.executeMethod(ComponentInputOtpConfigs.methods.CHANGE.name, event ?? new Event("change"), params);
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
