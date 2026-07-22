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
    IconsType,
    SIZES, SizesType, SizeUnit, UNITS,
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
import {ToolsIcons} from "../icons";
import {
    ComponentButton_ButtonTypes, ComponentButton_Types,
    ComponentButtonMethodsType,
    ComponentButtonPropsType,
} from "./ComponentButton";
import {
    ComponentTooltipDescriptionMethodsType,
    ComponentTooltipDescriptionPropsType,
} from "./ComponentTooltipDescription";
import {ComponentMouseScroller_lightTypes} from "./ComponentMouseScroller";


export const ComponentTimerDownProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_size:                             "prop_size",
    prop_backgroundColor_body:             "prop_backgroundColor_body",
    prop_backgroundColor_timer:            "prop_backgroundColor_timer",
    prop_backgroundColor_timerEffect:      "prop_backgroundColor_timerEffect",
    prop_color_timer:                      "prop_color_timer",
    prop_color_description:                "prop_color_description",
    prop_description:                      "prop_description",
    prop_show_options:                     "prop_show_options",
    prop_tooltipIcon:                      "prop_tooltipIcon",
    prop_langSelected:                     "prop_langSelected",
    prop_langs:                            "prop_langs",
} as const;


const ComponentTimerDownConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentTimerDownProps.prop_size]: {
            name:               ComponentTimerDownProps.prop_size,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentTimerDownProps.prop_backgroundColor_body]: {
            name:               ComponentTimerDownProps.prop_backgroundColor_body,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)) ,
        },
        [ComponentTimerDownProps.prop_backgroundColor_timer]: {
            name:               ComponentTimerDownProps.prop_backgroundColor_timer,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
        },
        [ComponentTimerDownProps.prop_backgroundColor_timerEffect]: {
            name:               ComponentTimerDownProps.prop_backgroundColor_timerEffect,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)) ,
        },
        [ComponentTimerDownProps.prop_color_timer]: {
            name:               ComponentTimerDownProps.prop_color_timer,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)) ,
        },
        [ComponentTimerDownProps.prop_color_description]: {
            name:               ComponentTimerDownProps.prop_color_description,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.DARK , COLORS_GRAD.GRADE_1)) ,
        },
        [ComponentTimerDownProps.prop_description]: {
            name:               ComponentTimerDownProps.prop_description,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentTimerDownProps.prop_show_options]: {
            name:               ComponentTimerDownProps.prop_show_options,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentTimerDownProps.prop_tooltipIcon]: {
            name:               ComponentTimerDownProps.prop_tooltipIcon,
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_exclamation_square()),
        },
        [ComponentTimerDownProps.prop_langSelected]: {
            name:               ComponentTimerDownProps.prop_langSelected,
            value:              GOG_SetValue<string>(AppConfig.get("directionRtl") ? "fa" : "en"),
        },
        [ComponentTimerDownProps.prop_langs]: {
            name:               ComponentTimerDownProps.prop_langs,
            value:              GOG_SetValue<Record<string, any>>({
                fa: {
                    on_progress_duration:  "تا ارسال مجدد کد",
                    on_end_duration:       "کد منقضی شده است",
                    btn_resend:            "ارسال مجدد",
                },
                en: {
                    on_progress_duration:  "Until resend code",
                    on_end_duration:       "The code has been deprecated",
                    btn_resend:            "Retry",
                },
            }),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        ///----------------------
        FORM: {
            name:               "part_form"
        },
        TOOLTIP: {
            name:               "part_tooltip"
        },
        TIMER: {
            name:               "part_timer"
        },
        TEXT: {
            name:               "part_text"
        },
        TEXT_BUTTON: {
            name:               "part_text_button"
        },
    },
    templates: {
        BODY: {
            name:                "body"
        },
    },
    methods: {
        CLICK_RETRY: {
            name:                      "fn_onClickRetry",
            dataArgs: {},
            componentArgs: {}
        },
        FINISH_TIMER: {
            name:                      "fn_onFinishTimer",
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const;


export type ComponentTimerDownPropsType =                     GOG_ExtractNameValue<typeof ComponentTimerDownConfigs.keys>
export type ComponentTimerDownSchemaType =                    GOG_ExtractName<typeof ComponentTimerDownConfigs.schemas>
export type ComponentTimerDownTemplatesType =                 GOG_ExtractName<typeof ComponentTimerDownConfigs.templates>

export type ComponentTimerDown_Methods_CLICK_RETRY_DataArgs =        GOG_ExtractNameValue<typeof ComponentTimerDownConfigs.methods.CLICK_RETRY.dataArgs>
export type ComponentTimerDown_Methods_CLICK_RETRY_ComponentArgs =   GOG_ExtractName<typeof ComponentTimerDownConfigs.methods.CLICK_RETRY.componentArgs>
export type ComponentTimerDown_Methods_FINISH_TIMER_DataArgs =       GOG_ExtractNameValue<typeof ComponentTimerDownConfigs.methods.FINISH_TIMER.dataArgs>
export type ComponentTimerDown_Methods_FINISH_TIMER_ComponentArgs =  GOG_ExtractName<typeof ComponentTimerDownConfigs.methods.FINISH_TIMER.componentArgs>

export type ComponentTimerDownMethodsType = {
    [ComponentTimerDownConfigs.methods.CLICK_RETRY.name]: ComponentCallBackType<ComponentTimerDown_Methods_CLICK_RETRY_ComponentArgs, ComponentTimerDown_Methods_CLICK_RETRY_DataArgs>,
    [ComponentTimerDownConfigs.methods.FINISH_TIMER.name]: ComponentCallBackType<ComponentTimerDown_Methods_FINISH_TIMER_ComponentArgs, ComponentTimerDown_Methods_FINISH_TIMER_DataArgs>,
}


export class ComponentTimerDownBase extends ComponentBase<
    ComponentTimerDownPropsType,
    ComponentTimerDownSchemaType,
    ComponentTimerDownTemplatesType,
    ComponentTimerDownMethodsType
>{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentTimerDownPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),

            [ComponentTimerDownConfigs.keys.prop_size.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_size.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.timer_down.props.prop_size.title"),
                description:                                      Language.translate("components.timer_down.props.prop_size.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_backgroundColor_body.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_backgroundColor_body.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_backgroundColor_body.value,
                title:                                            Language.translate("components.timer_down.props.prop_backgroundColor_body.title"),
                description:                                      Language.translate("components.timer_down.props.prop_backgroundColor_body.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_backgroundColor_timer.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_backgroundColor_timer.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_backgroundColor_timer.value,
                title:                                            Language.translate("components.timer_down.props.prop_backgroundColor_timer.title"),
                description:                                      Language.translate("components.timer_down.props.prop_backgroundColor_timer.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_backgroundColor_timerEffect.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_backgroundColor_timerEffect.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_backgroundColor_timerEffect.value,
                title:                                            Language.translate("components.timer_down.props.prop_backgroundColor_timerEffect.title"),
                description:                                      Language.translate("components.timer_down.props.prop_backgroundColor_timerEffect.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_color_timer.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_color_timer.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_color_timer.value,
                title:                                            Language.translate("components.timer_down.props.prop_color_timer.title"),
                description:                                      Language.translate("components.timer_down.props.prop_color_timer.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_color_description.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_color_description.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_color_description.value,
                title:                                            Language.translate("components.timer_down.props.prop_color_description.title"),
                description:                                      Language.translate("components.timer_down.props.prop_color_description.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_description.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_description.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_description.value,
                title:                                            Language.translate("components.timer_down.props.prop_description.title"),
                description:                                      Language.translate("components.timer_down.props.prop_description.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_show_options.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_show_options.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_show_options.value,
                title:                                            Language.translate("components.timer_down.props.prop_show_options.title"),
                description:                                      Language.translate("components.timer_down.props.prop_show_options.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_tooltipIcon.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_tooltipIcon.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_tooltipIcon.value,
                title:                                            Language.translate("components.timer_down.props.prop_tooltipIcon.title"),
                description:                                      Language.translate("components.timer_down.props.prop_tooltipIcon.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_langSelected.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_langSelected.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_langSelected.value,
                title:                                            Language.translate("components.timer_down.props.prop_langSelected.title"),
                description:                                      Language.translate("components.timer_down.props.prop_langSelected.description"),
            },
            [ComponentTimerDownConfigs.keys.prop_langs.name]: {
                prop:                                             ComponentTimerDownConfigs.keys.prop_langs.name,
                default:                                          ComponentTimerDownConfigs.keys.prop_langs.value,
                title:                                            Language.translate("components.timer_down.props.prop_langs.title"),
                description:                                      Language.translate("components.timer_down.props.prop_langs.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentTimerDownSchemaType, ComponentTimerDownPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),

        FORM: {
            part:               ComponentTimerDownConfigs.schemas.FORM.name,
            title:              Language.translate("components.timer_down.schema.form.title"),
            description:        Language.translate("components.timer_down.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_backgroundColor_body.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_size.name],
            ]
        },
        TOOLTIP: {
            part:               ComponentTimerDownConfigs.schemas.TOOLTIP.name,
            title:              Language.translate("components.timer_down.schema.tooltip.title"),
            description:        Language.translate("components.timer_down.schema.tooltip.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_tooltipIcon.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_description.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_backgroundColor_body.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_size.name],
            ]
        },
        TIMER: {
            part:               ComponentTimerDownConfigs.schemas.TIMER.name,
            title:              Language.translate("components.timer_down.schema.timer.title"),
            description:        Language.translate("components.timer_down.schema.timer.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_backgroundColor_timer.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_backgroundColor_timerEffect.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_color_timer.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_show_options.name],
            ]
        },
        TEXT: {
            part:               ComponentTimerDownConfigs.schemas.TEXT.name,
            title:              Language.translate("components.timer_down.schema.text.title"),
            description:        Language.translate("components.timer_down.schema.text.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_color_description.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_langSelected.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_langs.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_show_options.name],
            ]
        },
        TEXT_BUTTON: {
            part:               ComponentTimerDownConfigs.schemas.TEXT_BUTTON.name,
            title:              Language.translate("components.timer_down.schema.text_button.title"),
            description:        Language.translate("components.timer_down.schema.text_button.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_langSelected.name],
                this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_langs.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentTimerDownTemplatesType, ComponentTimerDownPropsType>({
        BODY: {
            title:                                            Language.translate("components.timer_down.template.body.title"),
            description:                                      Language.translate("components.timer_down.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentTimerDownConfigs.keys.prop_description.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentTimerDownMethodsType, ComponentTimerDownPropsType>({
        [ComponentTimerDownConfigs.methods.CLICK_RETRY.name]: {
            title:                                            Language.translate("components.timer_down.methods.fn_onClickRetry.title"),
            description:                                      Language.translate("components.timer_down.methods.fn_onClickRetry.description"),
            args: {}
        },
        [ComponentTimerDownConfigs.methods.FINISH_TIMER.name]: {
            title:                                            Language.translate("components.timer_down.methods.fn_onFinishTimer.title"),
            description:                                      Language.translate("components.timer_down.methods.fn_onFinishTimer.description"),
            args: {}
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const timerComp = new ComponentTimerDown(
            {
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_description: "This is a countdown timer example",
                prop_size: SIZES.M,
                prop_show_options: true,

            } as any as ComponentTimerDownPropsType,
            <ComponentTimerDownMethodsType>{
                fn_onClickRetry: (event, dataArgs, componentArgs) => {
                    console.log("retry clicked");
                    timerComp.call_startCountdown(Date.now() + 60000);
                },
                fn_onFinishTimer: (event, dataArgs, componentArgs) => {
                    console.log("timer finished");
                },
            }
        );

        setTimeout(() => {
            timerComp.call_startCountdown(Date.now() + 60000);
        }, 500);

        return timerComp.getElement() as HTMLElement;
    }
}


export class ComponentTimerDown extends ComponentTimerDownBase {


    private _FINISH_TIMER_INTERVAL : ReturnType<typeof setInterval> | null = null;
    private _TIMER_DOWN_MINUTE_ONE= new Observable<string>("-");
    private _TIMER_DOWN_MINUTE_TWO= new Observable<string>("-");
    private _TIMER_DOWN_SECOND_ONE= new Observable<string>("-");
    private _TIMER_DOWN_SECOND_TWO= new Observable<string>("-");
    private _TIMER_DOWN_FINISH =  new Observable<boolean>(false);
    private _TIMER_DOWN_TEXT =      new Observable<string>("");


    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentTimerDownPropsType,
        methods: ComponentTimerDownMethodsType,
        events = null
    ) {
        super("timer-down", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentTimerDownConfigs.schemas.FORM.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentTimerDownConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentTimerDownConfigs.schemas.TOOLTIP.name:
                return this.template_render_tooltip(attrsDefault, data, extra);
            case ComponentTimerDownConfigs.schemas.TIMER.name:
                return this.template_render_timer(attrsDefault, data, extra);
            case ComponentTimerDownConfigs.schemas.TEXT.name:
                return this.template_render_text(attrsDefault, data, extra);
            case ComponentTimerDownConfigs.schemas.TEXT_BUTTON.name:
                return this.template_render_text_button(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    /* ---------------------------------------------
        template_render_form
    --------------------------------------------- */
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColor_body = data[ComponentTimerDownConfigs.keys.prop_backgroundColor_body.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-timer-down-form-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["row", "p-0", "m-0", "rounded", "shadow-sm", "position-relative" ],
                stylesBind: {
                    backgroundColor: prop_backgroundColor_body,
                    direction :Observable.computed(
                        ( dir) => {
                            return dir ? "ltr" : "rtl";
                        },
                        [
                            AppConfig.observable("directionRtl")
                        ],
                        this.getScope()) ,
                } ,
                children: [
                    this.executeSchemaPart(ComponentTimerDownConfigs.schemas.TOOLTIP.name),
                    this.executeSchemaPart(ComponentTimerDownConfigs.schemas.TIMER.name),
                    this.executeSchemaPart(ComponentTimerDownConfigs.schemas.TEXT.name),
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_tooltip
    --------------------------------------------- */
    private template_render_tooltip(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_description          = data[ComponentTimerDownConfigs.keys.prop_description.name];
            const prop_tooltipIcon          = data[ComponentTimerDownConfigs.keys.prop_tooltipIcon.name];
            const prop_backgroundColor_body = data[ComponentTimerDownConfigs.keys.prop_backgroundColor_body.name];
            const prop_size                 = data[ComponentTimerDownConfigs.keys.prop_size.name];


            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["col-md-1", "col-12", "position-relative" ,  "py-1" /*, "w-100"*/],
                children: Observable.computed(
                    (desc: string | null, icon: any, bgBody: any, size: any) => {
                        if (desc == null) return null;

                        return  new ToolsComponents.ComponentTooltipDescription(
                            <ComponentTooltipDescriptionPropsType>
                                {
                                    classList:             ["position-absolute"] ,
                                    styles: Observable.computed(
                                        ( dir) => {
                                            return {
                                                "top" :      "5px" ,
                                                [dir ? "left" : "right"] :     "5px" ,
                                            }
                                        },
                                        [
                                            AppConfig.observable("directionRtl")
                                        ],
                                        this.getScope())  ,

                                    prop_description:      desc ,
                                    prop_icon:             icon ,
                                    prop_iconClass:        [] ,
                                    prop_iconStyles:       {} ,
                                },
                            <ComponentTooltipDescriptionMethodsType>
                                {

                                }
                        ).getReactiveElement();
                    },
                    [prop_description, prop_tooltipIcon, prop_backgroundColor_body, prop_size],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_timer
    --------------------------------------------- */
    private template_render_timer(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColor_timer = data[ComponentTimerDownConfigs.keys.prop_backgroundColor_timer.name];
            const prop_backgroundColor_timerEffect = data[ComponentTimerDownConfigs.keys.prop_backgroundColor_timerEffect.name];
            const prop_color_timer = data[ComponentTimerDownConfigs.keys.prop_color_timer.name];
            const prop_size = data[ComponentTimerDownConfigs.keys.prop_size.name];
            const prop_show_options = data[ComponentTimerDownConfigs.keys.prop_show_options.name];

            const sizeName = (prop_size instanceof Observable ? prop_size.get() : prop_size) ?? SIZES.M;
            const elFontSize = ToolsCss.getFontSize(sizeName);
            const elLineHeight = ToolsCss.getLineHeightSize(sizeName);
            const animName = `myTimerDownAnimation-${this._COMPONENT_RANDOM_ID}`;
            const showOptions = prop_show_options instanceof Observable ? prop_show_options.get() : prop_show_options;

            const timerId = `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}`;

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": timerId,
                },
                className: [
                    showOptions ? "col-md-4" : "", "col-12" ,
                    "py-1"
                ],
                children: [
                    ReactiveElement.part("div", {
                        styles: {
                            "direction" : "ltr" ,
                        },
                        children:[
                            Observable.conditionWhen(
                                this._TIMER_DOWN_FINISH,
                                (show: boolean) => !show,
                                () => {
                                    return ReactiveElement.style({
                                        children: [
                                            ` @keyframes ${animName} {
                                                 0% { opacity: 0; height: 0; width: 0; }
                                                 65% { opacity: 1; height: 100%; width: 100%; }
                                                 100% { opacity: 0; height: 0; width: 0; }
                                             }` ,

                                            `#${timerId}-part-minute-one::after,
                                             #${timerId}-part-minute-two::after,
                                             #${timerId}-part-second-one::after,
                                             #${timerId}-part-second-two::after {
                                                 content: "";
                                                 position: absolute;
                                                 left: 50%;
                                                 top: 50%;
                                                 transform: translate(-50%, -50%);
                                                 width: 100%;
                                                 height: 0%;
                                                 background-color: ${prop_backgroundColor_timerEffect.get()};
                                               
                                                 animation: ${animName} 1000ms infinite;
                                             }`
                                        ]
                                    })
                                },
                                () => null,
                                this.getScope()
                            ),
                            ReactiveElement.div({
                                attrs: {
                                    "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-parts`,
                                },
                                className: ["row", "p-0"],
                                styles: {
                                    direction:  "ltr !important",
                                    width:      "100px",
                                    margin:     "0 auto !important",
                                },
                                children: [
                                    ReactiveElement.div({
                                        attrs: {
                                            "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-part-minute`,
                                        },
                                        className: ["col-5", "m-0", "p-0", "row"],
                                        children: [
                                            ReactiveElement.part("b", {
                                                attrs: {
                                                    "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-part-minute-one`,
                                                },
                                                className: ["col-6", "border", "px-1", "text-center", "border-white"],
                                                stylesBind: {
                                                    backgroundColor: prop_backgroundColor_timer,
                                                    color: prop_color_timer,
                                                },
                                                styles: {
                                                    fontSize: `${elFontSize}px`,
                                                    lineHeight: `${elLineHeight}px`,
                                                    position: "relative",
                                                } ,
                                                children: this._TIMER_DOWN_MINUTE_ONE,
                                            }),
                                            ReactiveElement.part("b", {
                                                attrs: {
                                                    "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-part-minute-two`,
                                                },
                                                className: ["col-6", "border", "px-1", "text-center", "border-white"],
                                                stylesBind: {
                                                    backgroundColor: prop_backgroundColor_timer,
                                                    color: prop_color_timer,
                                                },
                                                styles: {
                                                    fontSize: `${elFontSize}px`,
                                                    lineHeight: `${elLineHeight}px`,
                                                    position: "relative",
                                                } ,
                                                children: this._TIMER_DOWN_MINUTE_TWO,
                                            }),
                                        ]
                                    }),
                                    ReactiveElement.part("b", {
                                        attrs: {
                                            "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-part-dot`,
                                        },
                                        className: ["col-2", "m-0", "p-0", "text-center"],
                                        stylesBind: {
                                            color:       prop_color_timer,
                                        },
                                        styles: {
                                            fontSize:    `${elFontSize}px`,
                                            lineHeight:  `${elLineHeight}px`,
                                        } ,
                                        children: ":",
                                    }),
                                    ReactiveElement.div({
                                        attrs: {
                                            "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-part-second`,
                                        },
                                        className: ["col-5", "m-0", "p-0", "row"],
                                        children: [
                                            ReactiveElement.part("b", {
                                                attrs: {
                                                    "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-part-second-one`,
                                                },
                                                className: ["col-6", "border", "px-1", "text-center", "border-white"],
                                                stylesBind: {
                                                    backgroundColor: prop_backgroundColor_timer,
                                                    color: prop_color_timer,
                                                },
                                                styles: {
                                                    fontSize:   `${elFontSize}px`,
                                                    lineHeight: `${elLineHeight}px`,
                                                    position:   "relative",
                                                } ,
                                                children: this._TIMER_DOWN_SECOND_ONE,
                                            }),
                                            ReactiveElement.part("b", {
                                                attrs: {
                                                    "id": `component-timer-down-form-timer-${this._COMPONENT_RANDOM_ID}-part-second-two`,
                                                },
                                                className: ["col-6", "border", "px-1", "text-center", "border-white"],
                                                stylesBind: {
                                                    backgroundColor: prop_backgroundColor_timer,
                                                    color: prop_color_timer,
                                                },
                                                styles: {
                                                    fontSize:   `${elFontSize}px`,
                                                    lineHeight: `${elLineHeight}px`,
                                                    position:   "relative",
                                                } ,
                                                children: this._TIMER_DOWN_SECOND_TWO,
                                            }),
                                        ]
                                    }),
                                ]
                            }),
                        ]
                    })
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_text
    --------------------------------------------- */
    private template_render_text(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_color_description = data[ComponentTimerDownConfigs.keys.prop_color_description.name];
            const prop_show_options = data[ComponentTimerDownConfigs.keys.prop_show_options.name];

            const showOptions = prop_show_options instanceof Observable ? prop_show_options.get() : prop_show_options;

            if (!showOptions) {
                return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
            }

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-timer-down-form-text-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["col-md-4", "col-12", "py-1"],
                stylesBind: () => ({
                    direction :Observable.computed(
                        ( dir) => {
                            return dir ? "ltr" : "rtl";
                        },
                        [
                            AppConfig.observable("directionRtl")
                        ],
                        this.getScope()) ,
                    color: prop_color_description,
                }),
                children: [
                    ReactiveElement.part("b", {
                        stylesBind: {
                            float :Observable.computed(
                                ( dir) => {
                                    return dir ? "left" : "right";
                                },
                                [
                                    AppConfig.observable("directionRtl")
                                ],
                                this.getScope()) ,
                        } ,
                        children: this._TIMER_DOWN_TEXT,
                    }),
                    ReactiveElement.span({
                        className: ["px-2"],
                        stylesBind: {
                            float :Observable.computed(
                                ( dir) => {
                                    return dir ? "left" : "right";
                                },
                                [
                                    AppConfig.observable("directionRtl")
                                ],
                                this.getScope()) ,
                        } ,
                        children: "|",
                    }),
                    Observable.conditionWhen(
                        this._TIMER_DOWN_FINISH,
                        (show: boolean) => show,
                        () => this.executeSchemaPart(ComponentTimerDownConfigs.schemas.TEXT_BUTTON.name),
                        () => null,
                        this.getScope()
                    ),
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_text_button
    --------------------------------------------- */
    private template_render_text_button(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_langSelected = data[ComponentTimerDownConfigs.keys.prop_langSelected.name];
            const prop_langs = data[ComponentTimerDownConfigs.keys.prop_langs.name];

            const langSelected = prop_langSelected instanceof Observable ? prop_langSelected.get() : prop_langSelected;
            const langs = prop_langs instanceof Observable ? prop_langs.get() : prop_langs;

            let btnResend = "";
            if (langs != null && langSelected != null && langs.hasOwnProperty(langSelected)) {
                btnResend = langs[langSelected]?.btn_resend ?? "";
            }

            const btnEl = new ToolsComponents.ComponentButton(
                {
                    classList: [],
                    stylesBind: {
                        float :Observable.computed(
                            ( dir) => {
                                return dir ? "left" : "right";
                            },
                            [
                                AppConfig.get_directionRtl()
                            ],
                            this.getScope()) ,
                    } ,
                    prop_btnClass:   ["px-2", "py-1"],
                    prop_type:       ComponentButton_Types.BACK ,
                    prop_btnTitle:   btnResend,
                } as unknown as ComponentButtonPropsType,
                <ComponentButtonMethodsType>{
                    fn_onClickButton: (event, dataArgs, componentArgs) => {
                        this.fn_onClickRetry(event);
                    },
                }
            );

            return btnEl.getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        FUNCTIONs
    --------------------------------------------- */
    private fn_calculateTimer(timeUnixEnd: number): number {
        return timeUnixEnd - Date.now();
    }

    call_startCountdown(timeUnixEnd: number) {
        if (this._FINISH_TIMER_INTERVAL != null) {
            clearInterval(this._FINISH_TIMER_INTERVAL);
        }

        this._TIMER_DOWN_FINISH.set(false);

        this.fn_progressTimerProgress(this.fn_calculateTimer(timeUnixEnd));

        this._FINISH_TIMER_INTERVAL = setInterval(() => {
            const distance = this.fn_calculateTimer(timeUnixEnd);

            if (distance < 0) {
                if (this._FINISH_TIMER_INTERVAL != null) {
                    clearInterval(this._FINISH_TIMER_INTERVAL);
                    this._FINISH_TIMER_INTERVAL = null;
                }
                this.fn_endTimerProgress();
                this.fn_onFinishTimer();
                return;
            }

            this.fn_progressTimerProgress(distance);
        }, 1000);
    }

    private fn_progressTimerProgress(timer: number) {
        const data = this._COMPONENT_CONFIG as any;
        const prop_langSelected_raw = data?.[ComponentTimerDownConfigs.keys.prop_langSelected.name];
        const prop_langs_raw = data?.[ComponentTimerDownConfigs.keys.prop_langs.name];

        const prop_langSelected = prop_langSelected_raw instanceof Observable ? prop_langSelected_raw.get() : prop_langSelected_raw;
        const prop_langs = prop_langs_raw instanceof Observable ? prop_langs_raw.get() : prop_langs_raw;

        let on_progress_duration = "";
        if (prop_langs != null && prop_langSelected != null && prop_langs.hasOwnProperty(prop_langSelected)) {
            on_progress_duration = prop_langs[prop_langSelected]?.on_progress_duration ?? "";
        }

        this._TIMER_DOWN_TEXT.set(on_progress_duration);

        const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
        const minutes_digitOne = Math.floor(minutes / 10);
        const minutes_digitTwo = minutes - (minutes_digitOne * 10);

        this._TIMER_DOWN_MINUTE_ONE.set(String(minutes_digitOne));
        this._TIMER_DOWN_MINUTE_TWO.set(String(minutes_digitTwo));

        const seconds = Math.floor((timer % (1000 * 60)) / 1000);
        const seconds_digitOne = Math.floor(seconds / 10);
        const seconds_digitTwo = seconds - (seconds_digitOne * 10);

        this._TIMER_DOWN_SECOND_ONE.set(String(seconds_digitOne));
        this._TIMER_DOWN_SECOND_TWO.set(String(seconds_digitTwo));
    }

    private fn_endTimerProgress() {
        const data = this._COMPONENT_CONFIG as any;
        const prop_langSelected_raw = data?.[ComponentTimerDownConfigs.keys.prop_langSelected.name];
        const prop_langs_raw = data?.[ComponentTimerDownConfigs.keys.prop_langs.name];

        const prop_langSelected = prop_langSelected_raw instanceof Observable ? prop_langSelected_raw.get() : prop_langSelected_raw;
        const prop_langs = prop_langs_raw instanceof Observable ? prop_langs_raw.get() : prop_langs_raw;

        let on_end_duration = "";
        if (prop_langs != null && prop_langSelected != null && prop_langs.hasOwnProperty(prop_langSelected)) {
            on_end_duration = prop_langs[prop_langSelected]?.on_end_duration ?? "";
        }

        this._TIMER_DOWN_TEXT.set(on_end_duration);
        this._TIMER_DOWN_FINISH.set(true);

        this._TIMER_DOWN_MINUTE_ONE.set("-");
        this._TIMER_DOWN_MINUTE_TWO.set("-");
        this._TIMER_DOWN_SECOND_ONE.set("-");
        this._TIMER_DOWN_SECOND_TWO.set("-");
    }

    fn_onClickRetry(event: Event) {
        const params: ComponentTimerDown_Methods_CLICK_RETRY_DataArgs = {};
        this.executeMethod(ComponentTimerDownConfigs.methods.CLICK_RETRY.name, event, params);
    }

    fn_onFinishTimer(event?: Event) {
        const params: ComponentTimerDown_Methods_FINISH_TIMER_DataArgs = {};
        this.executeMethod(ComponentTimerDownConfigs.methods.FINISH_TIMER.name, event ?? new Event("finish"), params);
    }

}
