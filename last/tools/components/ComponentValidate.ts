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
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType, SizeCalc,
    SIZES, SizesType, SizeUnit,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, UNITS
} from "../../utils/ToolsConsts";
import {TOOLS} from "../tools";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern, GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../core/component/SetupComponent";
import {ToolsIcons} from "../icons";
import {
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {ToolsValidator} from "../../utils/ToolsValidate";






export const ComponentValidateProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_listRules :                         "prop_listRules" ,
    prop_msgRules :                          "prop_msgRules" ,
    prop_reference :                         "prop_reference" ,
    prop_referenceComponent :                "prop_referenceComponent" ,
    prop_isAbsolute :                      "prop_isAbsolute" ,
    prop_title :                             "prop_title" ,
    prop_iconSuccess :                       "prop_iconSuccess" ,
    prop_iconError :                         "prop_iconError" ,
    prop_size :                              "prop_size" ,
    prop_value :                             "prop_value" ,
} as const;




export enum ComponentValidate_StatusTypes{
    SUCCESS=   "success",
    ERROR=     "error"
}



const ComponentValidateConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentValidateProps.prop_listRules] : {
            name:               ComponentValidateProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        } ,
        [ComponentValidateProps.prop_msgRules]: {
            name:               ComponentValidateProps.prop_msgRules,
            value:              GOG_SetValue<Record<string, string> | null>(null) ,
        } ,
        [ComponentValidateProps.prop_reference]: {
            name:               ComponentValidateProps.prop_reference,
            value:              GOG_SetValue<string>("") ,
        } ,
        [ComponentValidateProps.prop_referenceComponent]: {
            name:               ComponentValidateProps.prop_referenceComponent,
            value:              GOG_SetValue<any>(null) ,
        } ,
        [ComponentValidateProps.prop_isAbsolute]: {
            name:               ComponentValidateProps.prop_isAbsolute,
            value:              GOG_SetValue<boolean>(false) ,
        } ,
        [ComponentValidateProps.prop_title]: {
            name:               ComponentValidateProps.prop_title,
            value:              GOG_SetValue<string>("---") ,
        } ,
        [ComponentValidateProps.prop_iconSuccess]: {
            name:               ComponentValidateProps.prop_iconSuccess,
            value:              GOG_SetValue<IconsType | null>(null),
        } ,
        [ComponentValidateProps.prop_iconError]: {
            name:               ComponentValidateProps.prop_iconError,
            value:              GOG_SetValue<IconsType | null>(null),
        } ,
        [ComponentValidateProps.prop_size]: {
            name:               "prop_size",
            value:              GOG_SetValue<string>("m"),
        } ,
        [ComponentValidateProps.prop_value]: {
            name:               ComponentValidateProps.prop_value,
            value:              GOG_SetValue<Observable<string> | string>(""),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        FORM: {
            name:               "part_form"
        } ,
        RULES_HTML: {
            name:               "part_rules_html"
        } ,
        VALIDATES_DATA: {
            name:               "part_validates_data"
        } ,
        STATUS_ICON: {
            name:               "part_status_icon"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {
        CHANGE: {
            name:                      "fn_onChangeValidate" ,
            dataArgs: {
                IS_VALID: {
                    name:              "IS_VALID" ,
                    value:             GOG_SetValue<boolean>(false) ,
                } ,
                MESSAGES: {
                    name:              "MESSAGES" ,
                    value:             GOG_SetValue<string[]>([]) ,
                },
                VALUE: {
                    name:              "VALUE" ,
                    value:             GOG_SetValue<string>("") ,
                }
            },
            componentArgs: {}
        },
    }
} as const


export type ComponentValidatePropsType =             GOG_ExtractNameValue<typeof ComponentValidateConfigs.keys>
export type ComponentValidateSchemaType =            GOG_ExtractName<typeof ComponentValidateConfigs.schemas>
export type ComponentValidateTemplatesType =         GOG_ExtractName<typeof ComponentValidateConfigs.templates>

export type ComponentValidate_Methods_CHANGE_ComponentArgs =   GOG_ExtractName<typeof ComponentValidateConfigs.methods.CHANGE.componentArgs>
export type ComponentValidate_Methods_CHANGE_DataArgs =        GOG_ExtractNameValue<typeof ComponentValidateConfigs.methods.CHANGE.dataArgs>

export type ComponentValidateMethodsType = {
    [ComponentValidateConfigs.methods.CHANGE.name]: ComponentCallBackType<ComponentValidate_Methods_CHANGE_ComponentArgs , ComponentValidate_Methods_CHANGE_DataArgs>
}







export class ComponentValidateBase extends ComponentBase<
    ComponentValidatePropsType ,
    ComponentValidateSchemaType ,
    ComponentValidateTemplatesType ,
    ComponentValidateMethodsType
    >{



    /* ---------------------------------------------
    PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentValidatePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentValidateConfigs.keys.prop_listRules.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_listRules.name,
                default:                                          ComponentValidateConfigs.keys.prop_listRules.value,
                hasMultiTemplate:                                 false,
                title:                                            Language.translate("components.validate.props.prop_listRules.title"),
                description:                                      Language.translate("components.validate.props.prop_listRules.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_msgRules.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_msgRules.name,
                default:                                          ComponentValidateConfigs.keys.prop_msgRules.value,
                title:                                            Language.translate("components.validate.props.prop_msgRules.title"),
                description:                                      Language.translate("components.validate.props.prop_msgRules.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_reference.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_reference.name,
                default:                                          ComponentValidateConfigs.keys.prop_reference.value,
                title:                                            Language.translate("components.validate.props.prop_reference.title"),
                description:                                      Language.translate("components.validate.props.prop_reference.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_referenceComponent.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_referenceComponent.name,
                default:                                          ComponentValidateConfigs.keys.prop_referenceComponent.value,
                title:                                            Language.translate("components.validate.props.prop_referenceComponent.title"),
                description:                                      Language.translate("components.validate.props.prop_referenceComponent.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_isAbsolute.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_isAbsolute.name,
                default:                                          ComponentValidateConfigs.keys.prop_isAbsolute.value,
                title:                                            Language.translate("components.validate.props.prop_isAbsolute.title"),
                description:                                      Language.translate("components.validate.props.prop_isAbsolute.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_title.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_title.name,
                default:                                          ComponentValidateConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.validate.props.prop_title.title"),
                description:                                      Language.translate("components.validate.props.prop_title.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_iconSuccess.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_iconSuccess.name,
                default:                                          ComponentValidateConfigs.keys.prop_iconSuccess.value,
                title:                                            Language.translate("components.validate.props.prop_iconSuccess.title"),
                description:                                      Language.translate("components.validate.props.prop_iconSuccess.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_iconError.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_iconError.name,
                default:                                          ComponentValidateConfigs.keys.prop_iconError.value,
                title:                                            Language.translate("components.validate.props.prop_iconError.title"),
                description:                                      Language.translate("components.validate.props.prop_iconError.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_size.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_size.name,
                default:                                          ComponentValidateConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.validate.props.prop_size.title"),
                description:                                      Language.translate("components.validate.props.prop_size.description"),
            } ,
            [ComponentValidateConfigs.keys.prop_value.name]: {
                prop:                                             ComponentValidateConfigs.keys.prop_value.name,
                default:                                          ComponentValidateConfigs.keys.prop_value.value,
                title:                                            Language.translate("components.validate.props.prop_value.title"),
                description:                                      Language.translate("components.validate.props.prop_value.description"),
            } ,
        }
    );



    /* ---------------------------------------------
             PROPERTYs Props
      --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentValidateSchemaType  , ComponentValidatePropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        FORM: {
            part:               ComponentValidateConfigs.schemas.FORM.name ,
            title:              Language.translate("components.validate.schema.form.title") ,
            description:        Language.translate("components.validate.schema.form.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_listRules.name]  ,
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_isAbsolute.name]  ,
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_title.name]  ,
            ]
        } ,
        RULES_HTML: {
            part:               ComponentValidateConfigs.schemas.RULES_HTML.name ,
            title:              Language.translate("components.validate.schema.rules_html.title") ,
            description:        Language.translate("components.validate.schema.rules_html.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_reference.name]  ,
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_listRules.name]  ,
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_msgRules.name]  ,
            ]
        } ,
        VALIDATES_DATA: {
            part:               ComponentValidateConfigs.schemas.VALIDATES_DATA.name ,
            title:              Language.translate("components.validate.schema.validates_data.title") ,
            description:        Language.translate("components.validate.schema.validates_data.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_title.name]  ,
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_reference.name]  ,
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_referenceComponent.name]  ,
            ]
        } ,
        STATUS_ICON: {
            part:               ComponentValidateConfigs.schemas.STATUS_ICON.name ,
            title:              Language.translate("components.validate.schema.status_icon.title") ,
            description:        Language.translate("components.validate.schema.status_icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_iconSuccess.name]  ,
                this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_iconError.name]  ,
            ]
        } ,

    });


    /* ---------------------------------------------
        PROPERTYs template
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentValidateTemplatesType , ComponentValidatePropsType>({
        BODY: {
            title:                                            Language.translate("components.validate.template.body.title"),
            description:                                      Language.translate("components.validate.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentValidateConfigs.keys.prop_listRules.name]
        } ,
    });


    /* ---------------------------------------------
    PROPERTYs Methods
     --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentValidateMethodsType , ComponentValidatePropsType>({
        [ComponentValidateConfigs.methods.CHANGE.name]: {
            title:                                            Language.translate("components.validate.methods.fn_onChangeValidate.title"),
            description:                                      Language.translate("components.validate.methods.fn_onChangeValidate.description"),
            args: {}
        }
    });


    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const inputId = "component-validate-example-input";
        const valueObs = new Observable<string>("");

        const inputEl = ReactiveElement.input({
            attrs: {
                id: inputId,
                type: "text",
                placeholder: "Enter text..."
            },
            className: ["form-control"],
            on: {
                input: (event) => {
                    valueObs.set((event.target as HTMLInputElement).value);
                }
            }
        });

        const validateEl = new ComponentValidate(
            <ComponentValidatePropsType> {
                selector: null,
                append: false,
                classList: ["mt-2"],
                styles: {},
                prop_show : true,
                prop_structureClass: [],
                prop_structureStyles: {},
                prop_listRules: [
                    {rule: "_not_empty", description: "This field is required", params: {}},
                    {rule: "_text_length", description: "Minimum 3 characters required", params: {min: 3}}
                ] ,
                prop_msgRules: null,
                prop_referenceComponent: null,
                prop_isAbsolute: false,
                prop_title: "Validation",
                prop_size: "m",
                prop_reference: "",
                prop_value: valueObs,
                prop_iconSuccess: TOOLS.ICON.icon_tik({size: SIZES.S}),
                prop_iconError: TOOLS.ICON.icon_close({size: SIZES.S})
            } ,
            <ComponentValidateMethodsType>{
                fn_onChangeValidate: (event: Event, dataArgs: ComponentValidate_Methods_CHANGE_DataArgs, componentArgs: ComponentValidate_Methods_CHANGE_ComponentArgs) => {
                    console.log(event , dataArgs.IS_VALID , dataArgs.MESSAGES , dataArgs.VALUE)
                }
            }
        ).getElement();

        return ReactiveElement.div({
            className: ["col-md-3", "col-12", "border", "p-2"],
            children: [
                inputEl,
                validateEl
            ]
        }).element;
    }


}

export class ComponentValidate extends ComponentValidateBase{

    private var_htmlRules = new Observable<string>("");
    private var_validation_msg = new Observable<Record<string, any>>({});
    private var_isInputCorrect = new Observable<boolean>(false);

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentValidatePropsType ,
        methods: ComponentValidateMethodsType ,
        events = null
    ) {
        super("validate" , null);
        super.renderComponent(config , methods , events);
        setTimeout(() => this.fn_setupValueWatcher(), 0);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentValidateConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) : ReactiveElement {
        switch (partName){
            case ComponentValidateConfigs.schemas.FORM.name:
                return  this.template_render_form(attrsDefault , data , extra);
            case ComponentValidateConfigs.schemas.RULES_HTML.name:
                return  this.template_render_rulesHtml(attrsDefault , data , extra);
            case ComponentValidateConfigs.schemas.VALIDATES_DATA.name:
                return  this.template_render_validatesData(attrsDefault , data , extra);
            case ComponentValidateConfigs.schemas.STATUS_ICON.name:
                return  this.componentFn_render_statusIcon(attrsDefault , data , extra);
        }
        return ReactiveElement.part("section" , {attrs: {...attrsDefault}});
    }

    private template_render_form(attrsDefault , data , extra) : ReactiveElement {
        if (data != null){
            const prop_listRules = data[ComponentValidateConfigs.keys.prop_listRules.name];
            const prop_isAbsolute = data[ComponentValidateConfigs.keys.prop_isAbsolute.name];

            const formVisible = prop_listRules.map((list: any[]) => {
                return list && Array.isArray(list) && list.length > 0;
            });

            return ReactiveElement.div({
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-validate-position-form-rules-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-relative"],
                classBind: [formVisible.map(v => v ? "" : "d-none")],
                children: (el) => [
                    ReactiveElement.component("position-element" , {
                        attrs: {
                            "id": `component-input-validate-form-rules-${this._COMPONENT_RANDOM_ID}`,
                        },
                        children: [
                            ReactiveElement.component("body" , {
                                children: [
                                    this.executeSchemaPart(ComponentValidateConfigs.schemas.RULES_HTML.name),
                                    this.executeSchemaPart(ComponentValidateConfigs.schemas.VALIDATES_DATA.name),
                                ]
                            })
                        ]
                    })
                ]
            });
        }

        return ReactiveElement.part("section" , {attrs: {...attrsDefault}});
    }

    private template_render_rulesHtml(attrsDefault , data , extra) : ReactiveElement {
        if (data != null){
            const prop_listRules = data[ComponentValidateConfigs.keys.prop_listRules.name];

            return ReactiveElement.section({
                attrs: {
                    ...attrsDefault,
                    "id": `component-validate-list-${this._COMPONENT_RANDOM_ID}`,
                },
                children: this.var_htmlRules.map((html: string) => {
                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = html || "";
                    return wrapper;
                })
            });
        }

        return ReactiveElement.part("section" , {attrs: {...attrsDefault}});
    }

    private template_render_validatesData(attrsDefault , data , extra) : ReactiveElement {
        if (data != null){
            const prop_title = data[ComponentValidateConfigs.keys.prop_title.name];

            return ReactiveElement.section({
                attrs: {
                    ...attrsDefault,
                },
                children: this.var_validation_msg.map((msg: Record<string, any>) => {
                    const componentValidate = {
                        title: prop_title ? prop_title.get() : "",
                        validates: msg
                    };
                    const script = document.createElement("script");
                    script.type = "application/json";
                    script.className = "component-validate";
                    script.textContent = JSON.stringify(componentValidate);
                    return script;
                })
            });
        }

        return ReactiveElement.part("section" , {attrs: {...attrsDefault}});
    }

    private componentFn_render_statusIcon (attrsDefault , data , extra) : ReactiveElement {
        if (data != null){
            const prop_iconSuccess = data[ComponentValidateConfigs.keys.prop_iconSuccess.name];
            const prop_iconError = data[ComponentValidateConfigs.keys.prop_iconError.name];

            const elHeight = ToolsCss.getIconSize(AppConfig.get("sizeNameSmall"));

            return ReactiveElement.div({
                attrs: {...attrsDefault},
                styles: {
                    position: "absolute",
                    top: "5px",
                    insetInlineEnd: "5px",
                },
                children: this.var_isInputCorrect.map((isCorrect: boolean) => {
                    const iconProp = isCorrect ? prop_iconSuccess : prop_iconError;
                    const iconValue = iconProp ? iconProp.get() : null;

                    if (!iconValue) {
                        return ReactiveElement.span({}).element;
                    }

                    return new ToolsComponents.ComponentIcon(
                        <ComponentIconPropsType>{
                            classList: ["mx-2"],
                            prop_iconClass: ["mx-2"],
                            prop_icon: iconValue,
                        },
                        <ComponentIconMethodsType>{}
                    ).getReactiveElement();
                })
            });
        }

        return ReactiveElement.part("section" , {attrs: {...attrsDefault}});
    }


    /* ---------------------------------------------
      FUNCTIONs
     --------------------------------------------- */

    private fn_getFormRulesElement() : HTMLElement | null {
        const prop_isAbsolute = this.get(ComponentValidateConfigs.keys.prop_isAbsolute.name);
        if (prop_isAbsolute) {
            return document.querySelector(`#component-input-validate-form-rules-${this._COMPONENT_RANDOM_ID}`);
        }
        return null;
    }

    private fn_setStatusVisibleFormRulesElement(status = true) {
        const el = this.fn_getFormRulesElement();
        if (el != null) {
            if (status) {
                el.classList.remove("d-none");
            } else {
                el.classList.add("d-none");
            }
        }
    }

    private fn_getInputElementReferenceId() : string | null {
        return this.get(ComponentValidateConfigs.keys.prop_reference.name);
    }

    private fn_getInputAndValueReference() : [HTMLElement | null, string] {
        const prop_value = this.get(ComponentValidateConfigs.keys.prop_value.name);
        if (prop_value != null) {
            if (prop_value instanceof Observable) {
                return [null, prop_value.get() ?? ""];
            }
            return [null, String(prop_value)];
        }

        const refComponent = this.get(ComponentValidateConfigs.keys.prop_referenceComponent.name);
        if (refComponent != null) {
            const comp = refComponent;
            const value = comp?.get ? comp.get("prop_value", null) : null;
            return [comp?.getElement ? comp.getElement() : null, value ?? ""];
        }

        const refId = this.fn_getInputElementReferenceId();
        if (refId) {
            const inputEl = document.querySelector("#" + refId) as HTMLElement | null;
            let value = "";
            if (inputEl != null && "value" in inputEl) {
                value = (inputEl as HTMLInputElement).value;
            }
            return [inputEl, value];
        }

        return [null, ""];
    }

    private fn_connectToInputReference_onHandleInput = () => {
        this.fn_readyListRules();
    };

    private fn_connectToInputReference_onFormatValue = () => {
        this.fn_setStatusVisibleFormRulesElement(false);
        this.fn_readyListRules();
    };

    private fn_connectToInputReference_onUnFormatValue = () => {
        this.fn_setStatusVisibleFormRulesElement(true);
        this.fn_readyListRules();
    };

    private fn_setupValueWatcher() {
        const propValueObs = this.getObservable(ComponentValidateConfigs.keys.prop_value.name);
        if (propValueObs != null) {
            propValueObs.subscribe(() => this.fn_readyListRules());
            this.fn_readyListRules();
            return;
        }

        this.fn_connectToInputReference();
    }

    private fn_connectToInputReference() {
        const [inputEl] = this.fn_getInputAndValueReference();
        if (!inputEl) return;

        inputEl.removeEventListener("input", this.fn_connectToInputReference_onHandleInput);
        inputEl.removeEventListener("blur", this.fn_connectToInputReference_onFormatValue);
        inputEl.removeEventListener("focus", this.fn_connectToInputReference_onUnFormatValue);

        inputEl.addEventListener("input", this.fn_connectToInputReference_onHandleInput);
        inputEl.addEventListener("blur", this.fn_connectToInputReference_onFormatValue);
        inputEl.addEventListener("focus", this.fn_connectToInputReference_onUnFormatValue);

        this.fn_readyListRules();
    }

    private fn_readyListRules() {
        const prop_size = this.get(ComponentValidateConfigs.keys.prop_size.name);
        const prop_msgRules = this.get(ComponentValidateConfigs.keys.prop_msgRules.name);
        const prop_listRules = this.get(ComponentValidateConfigs.keys.prop_listRules.name);
        const directionRtl = AppConfig.get("directionRtl");

        const [inputEl, value] = this.fn_getInputAndValueReference();

        /*
                let messages: any[] = [];
                let messagesForm: any[] = [];
                let rulesHtml = "";
                let inputCorrect = false;

                /*const toolsValidator = (window as any).tools_validtor;
                if (toolsValidator && typeof toolsValidator.validtor_checkList === "function") {
                    [messages, messagesForm, rulesHtml, isInputCorrect] = toolsValidator.validtor_checkList(
                        value, prop_listRules, prop_msgRules, directionRtl, prop_size
                    );
                } else if (Array.isArray(prop_listRules) && prop_listRules.length > 0) {

                    const elIconHeight = ToolsCss.getIconSize(prop_size || "m");
                    const elfontSize = ToolsCss.getFontSize(prop_size || "m");
                    const iconColorError = "var(--errorColor1)";
                    const iconColorSuccess = "var(--successColor1)";

                    for (let i = 0; i < prop_listRules.length; i++) {
                        const itemRule = prop_listRules[i];
                        if (!itemRule || !itemRule.rule || !itemRule.description) continue;

                        let description = itemRule.description;
                        let isTrue = false;
                        const params = itemRule.params || {};

                        switch (itemRule.rule) {
                            case "_not_empty" :
                                isTrue = !!value && String(value).trim().length > 0;
                                break;
                            case "_text_length" :
                                if (value != null && value !== "") {
                                    const min = params.min ?? 3;
                                    isTrue = String(value).length >= min;
                                }
                                break;
                            case "_char_length" :
                                if (value != null && value !== "") {
                                    const min = params.min ?? 4;
                                    isTrue = String(value).trim().length >= min;
                                }
                                break;
                            case "_is_email" :
                                if (value != null && value !== "") {
                                    isTrue = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
                                }
                                break;
                            case "_is_number" :
                                if (value != null && value !== "") {
                                    isTrue = /^\d+$/.test(String(value).trim());
                                }
                                break;
                            case "_is_fa" :
                                if (value != null && value !== "") {
                                    isTrue = /^[\u0600-\u06FF\s]+$/.test(String(value).trim());
                                }
                                break;
                            case "_is_en" :
                                if (value != null && value !== "") {
                                    isTrue = /^[a-zA-Z\s]+$/.test(String(value).trim());
                                }
                                break;
                        }

                        if (!isTrue) {
                            isInputCorrect = false;
                            messages.push(description);
                            messagesForm.push(description);
                        }

                        const iconSvg = isTrue
                            ? `<svg width="${elIconHeight}" height="${elIconHeight}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="${iconColorSuccess}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                            : `<svg width="${elIconHeight}" height="${elIconHeight}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="${iconColorError}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

                        rulesHtml += `<div style="display:block;font-size:${elfontSize};color:${isTrue ? iconColorSuccess : iconColorError};direction:${directionRtl ? "rtl" : "ltr"}" class="item_country_code pt-1 ${i < prop_listRules.length - 1 ? "border-bottom" : ""} mx-1 line-height-30px"><span class="icon-rule ms-1">${iconSvg}</span><span class="ms-3"> - ${description}</span></div>`;
                    }
                }*/

        const [
            messages,
            messagesForm,
            rulesHtml,
            isInputCorrect
        ] = ToolsValidator.checkList(
            value,
            prop_listRules,
            prop_msgRules,
            directionRtl,
            prop_size
        );

        this.var_htmlRules.set(rulesHtml);
        this.var_validation_msg.set(messagesForm);
        this.var_isInputCorrect.set(isInputCorrect);

        if (inputEl) {
            inputEl.classList.remove("border-danger", "border-success");
            inputEl.classList.add(isInputCorrect ? "border-success" : "border-danger");
        }

        const params: ComponentValidate_Methods_CHANGE_DataArgs = {
            [ComponentValidateConfigs.methods.CHANGE.dataArgs.IS_VALID.name]: isInputCorrect,
            [ComponentValidateConfigs.methods.CHANGE.dataArgs.MESSAGES.name]: messages,
            [ComponentValidateConfigs.methods.CHANGE.dataArgs.VALUE.name]: value,
        };
        this.executeMethod(ComponentValidateConfigs.methods.CHANGE.name, new Event("validate"), params);
    }

}
