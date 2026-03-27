import {Observable} from "./Observable";
import {ReactiveElement} from "./ReactiveElement";
import {AppConfig} from "./AppConfig";
import {Language} from "./Language";


export type GOG_TypeOf<T> = T;
export type GOG_ValueOf<T> = T[keyof T]
export function GOG_SetValue<T>(value: T): GOG_TypeOf<T>{
    return value as any
}


export type GOG_ExtractNameValue<T> = {
    [k in keyof T as T[k]["name"]] : T[k]["value"] extends GOG_TypeOf<infer U> ? U : never
}
export type GOG_ExtractName<T> = {
    [k in keyof T] : T[k]["name"]
}




/*export function extractPropNames<
    T extends Record<string, { readonly name:string}>
    >(keys: T){
    const result = {} as {
        [K in keyof T as T[K]["name"]]: T[K]["name"]
    };
    for (const k in keys){
        const name = keys[k]["name"];
        (result as any)[name] = name;
    }
    return result
}*/
export function extractPropNames<
    T extends Record<string, any>
    >(keys: T){
    const result = {} as {
        [K in keyof T as T[K] extends {name: infer N}
            ? N extends string
                ? N
                : never
            : never]: T[K] extends {name: infer N}
            ? N extends string
                ?N
                :never
            :never;
    };
    for (const k in keys){
        const name = keys[k]["name"];
        (result as any)[name] = name;
    }
    return result
}






/// ----------------------------------------------------
/// COMPONENT BASIC PROP
/// ----------------------------------------------------
export const GOG_ComponentConfigBasicProps = {
    prop_show:             "prop_show" ,

    classList:             "classList" ,
    styles:                "styles" ,

    prop_structureClass:   "prop_structureClass" ,
    prop_structureStyles:  "prop_structureStyles" ,
} as const


export const GOG_ComponentConfigBasicKey = {
    [GOG_ComponentConfigBasicProps.prop_show]:{
        name:                     GOG_ComponentConfigBasicProps.prop_show  ,
        value:                    GOG_SetValue<boolean>(true),
    },

    [GOG_ComponentConfigBasicProps.classList]:{
        name:                     GOG_ComponentConfigBasicProps.classList  ,
        value:                    GOG_SetValue<string[]>([]),
    } ,
    [GOG_ComponentConfigBasicProps.styles]:{
        name:                     GOG_ComponentConfigBasicProps.styles  ,
        value:                    GOG_SetValue<Record<string, string>>({}),
    } ,

    [GOG_ComponentConfigBasicProps.prop_structureClass]:{
        name:                     GOG_ComponentConfigBasicProps.prop_structureClass  ,
        value:                    GOG_SetValue<string[]>([]),
    } ,
    [GOG_ComponentConfigBasicProps.prop_structureStyles]:{
        name:                     GOG_ComponentConfigBasicProps.prop_structureStyles  ,
        value:                    GOG_SetValue<Record<string, string>>({}),
    } ,
} as const

export type GOG_ComponentConfigBasicType =  GOG_ExtractNameValue<typeof GOG_ComponentConfigBasicKey>

export const GOG_ComponentConfigBasicPattern = {

    [GOG_ComponentConfigBasicKey.prop_show.name]: {
        prop:                                             GOG_ComponentConfigBasicKey.prop_show.name,
        default:                                          GOG_ComponentConfigBasicKey.prop_show.value,
        title:                                            Language.translate("components.public.prop_show.title"),
        description:                                      Language.translate("components.public.prop_show.description"),
    } ,

    [GOG_ComponentConfigBasicKey.classList.name]: {
        prop:                                             GOG_ComponentConfigBasicKey.classList.name,
        default:                                          GOG_ComponentConfigBasicKey.classList.value,
        title:                                            Language.translate("components.public.classList.title"),
        description:                                      Language.translate("components.public.classList.description"),
    } ,
    [GOG_ComponentConfigBasicKey.styles.name]: {
        prop:                                             GOG_ComponentConfigBasicKey.styles.name,
        default:                                          GOG_ComponentConfigBasicKey.styles.value,
        title:                                            Language.translate("components.public.styles.title"),
        description:                                      Language.translate("components.public.styles.description"),
    } ,

    [GOG_ComponentConfigBasicKey.prop_structureClass.name]: {
        prop:                                             GOG_ComponentConfigBasicKey.prop_structureClass.name,
        default:                                          GOG_ComponentConfigBasicKey.prop_structureClass.value,
        title:                                            Language.translate("components.public.prop_structureClass.title"),
        description:                                      Language.translate("components.public.prop_structureClass.description"),
    } ,
    [GOG_ComponentConfigBasicKey.prop_structureStyles.name]: {
        prop:                                             GOG_ComponentConfigBasicKey.prop_structureStyles.name,
        default:                                          GOG_ComponentConfigBasicKey.prop_structureStyles.value,
        title:                                            Language.translate("components.public.prop_structureStyles.title"),
        description:                                      Language.translate("components.public.prop_structureStyles.description"),
    } ,
};













/// ----------------------------------------------------
/// COMPONENT PATTERN
/// ----------------------------------------------------
type ComponentPropKeys<TPropTypes> = keyof TPropTypes
export interface IComponentProp<TPropTypes> {
    prop:              string;
    default:           TPropTypes;
    hasMultiTemplate?: boolean;
    title?:            Observable<string> ,
    description?:      Observable<string> ,
}
export function defineComponentPatterns<TPropTypes>(patterns: { [K in ComponentPropKeys<TPropTypes>]: IComponentProp<TPropTypes[K]> } ) : { [K in ComponentPropKeys<TPropTypes>]: IComponentProp<TPropTypes[K]> } {
    return patterns;
}





/// ----------------------------------------------------
/// COMPONENT SCHEMA
/// ----------------------------------------------------
type ComponentSchemaKeys<TSchema> = TSchema[keyof TSchema]
export function defineComponentProps<TSchema , TPropTypes>(props: { [K in  ComponentSchemaKeys<TSchema>]: IComponentProp<TPropTypes[keyof TPropTypes]>[] }) :  { [K in  ComponentSchemaKeys<TSchema>]: IComponentProp<TPropTypes[keyof TPropTypes]>[] }{
    return props ;
}






/// ----------------------------------------------------
/// COMPONENT METHODS
/// ----------------------------------------------------
type ComponentMethodKeys<TMethod> = keyof TMethod
export interface ComponentMethodType<TPropTypes> {
    args?:             Record<string, IComponentProp<TPropTypes[keyof TPropTypes]>> ;
    title?:            Observable<string> ,
    description?:      Observable<string> ,
    destination?:      ComponentCallBackType<any , any> // (...args: any[]) => void;
}
export type ComponentCallBackType<TComponentArgs , TDataArgs> = (
    event:            Event ,
    dataArgs:         TDataArgs | null  ,
    componentArgs:    TComponentArgs| null ,
) => void ;

export function defineComponentMethods<TMethod , TPropTypes>(methods: { [K in ComponentMethodKeys<TMethod>]: ComponentMethodType<TPropTypes> } ) : { [K in ComponentMethodKeys<TMethod>]: ComponentMethodType<TPropTypes> } {
    return methods;
}







/// ----------------------------------------------------
/// COMPONENT TEMPLATE
/// ----------------------------------------------------
type ComponentTemplateKeys<TSchema> = TSchema[keyof TSchema]
export type ComponentTemplateType<TPropTypes> = {
    reference:         IComponentProp<TPropTypes[keyof TPropTypes]>;
    html?:             string;
    attrs?:            Record<string, string>;
    value?:            any;
    title?:            Observable<string> ,
    description?:      Observable<string> ,
};
export function defineComponentTemplate<TTemplatesTypes , TPropTypes>(templates: { [K in  ComponentTemplateKeys<TTemplatesTypes>]: ComponentTemplateType<TPropTypes> }):  { [K in  ComponentTemplateKeys<TTemplatesTypes>]: ComponentTemplateType<TPropTypes> }{
    return templates;
}




























export class ComponentBase<
    TProp ,
    TSchemas ,
    TTemplate ,
    TMethods
    > {

    _COMPONENT_PATTERN : { [K in  ComponentPropKeys<TProp>]?:           IComponentProp<TProp[K]> }

    _COMPONENT_PROPS:    { [K in  ComponentSchemaKeys<TSchemas>]:       IComponentProp<TProp[keyof TProp]>[] }

    _COMPONENT_METHODS:   { [K in ComponentMethodKeys<TMethods>]:       ComponentMethodType<TProp> }

    _COMPONENT_TEMPLATES: { [K in  ComponentTemplateKeys<TTemplate>]?:  ComponentTemplateType<TProp> } ;

    _COMPONENT_PROPS_BIND: Record<string, Observable<any>> = {};

    _COMPONENT_CONFIG;


    _COMPONENT_RANDOM_ID: number = 0;
    _COMPONENT_ID: string | null = null;
    _COMPONENT_NAME: string | null = null;
    _COMPONENT_SELECTOR: string | null = null;
    _COMPONENT_ELEMENT: HTMLElement | null = null;
    _COMPONENT_CONTENT: any = "";
    _COMPONENT_SLOTS: any[] = [];

    _unsubscribeDirection: any;

    //--------------------------------------------------
    // construct
    //--------------------------------------------------
    constructor(
        //componentConfig: Record<string, any> ,
        componentName:   string,
        elId:            string|null
    ) {
       // this._COMPONENT_CONFIG = componentConfig;
        this._COMPONENT_NAME = componentName;
        this._COMPONENT_ID = elId;

        this._COMPONENT_RANDOM_ID = Math.floor(Math.random() * 10000);
        this._COMPONENT_SELECTOR = this._COMPONENT_NAME + "#" + this._COMPONENT_ID;
        this._COMPONENT_ELEMENT = this.#getComponentElement();
    }

    renderComponent(config: TProp , methods: TMethods) {

        this.connectedCallback();

        // GET Ready ==> _COMPONENT_TEMPLATES
        //this.#getReadyTemplates();

        // GET Ready ==> _COMPONENT_PROPS_BIND
        this.#getReadyComponentParamsWithDefault();

        let realConfig = this.#getReadyRealProps();
        realConfig = this.#getReadyUserConfigAndDefaultConfig(config, realConfig);
        this.#getReadyParamsBinding(realConfig);


        // GET Ready ==> _COMPONENT_METHODS
        this.#getReadyComponentMethods(methods);


        // GET Ready ==> _COMPONENT_ELEMENT
        return this.#getReadyTemplateSchema();
    }

    connectedCallback() {
        this.set("directionRtl", AppConfig.get("directionRtl"));
        this._unsubscribeDirection =
            AppConfig.subscribe("directionRtl", (value: any) => {
                this.set("directionRtl", value);
            });
    }

    //--------------------------------------------------
    // GET Ready ==> _COMPONENT_TEMPLATES
    //--------------------------------------------------
    /*#getReadyTemplates() {
        const listTemplates = this.#getListTemplates();
        if (this._COMPONENT_TEMPLATES != null) {
            Object.keys(this._COMPONENT_TEMPLATES).forEach(templateName => {
                const value = this.#getReadyTemplateValueSelected(listTemplates, templateName, this._COMPONENT_TEMPLATES[templateName]);
                if (value != null) {
                    this._COMPONENT_TEMPLATES[templateName].value = value;
                }
            });
        }
    }

    #getListTemplates(): Record<string, ComponentTemplateType<TProp>[]> {
        const resultExp: Record<string, ComponentTemplateType<TProp>[]> = {};
        const component = this.#getComponentElement();

        if (!component) return resultExp;

        let children = component.children;
        let childReal: Element[] = Array.from(children);
        let hasTemplate = children.length > 0 && children[0].tagName === "TEMPLATE";

        if (hasTemplate) {
            childReal = Array.from((children[0] as HTMLTemplateElement).content.children);
        }

        const componentSlotNames = Object.values(
            childReal
                .filter(el => (el as HTMLElement).tagName.toLowerCase().startsWith('component-'))
                .reduce((acc, el) => {
                    const tag = (el as HTMLElement).tagName.toLowerCase();
                    if (!acc[tag]) acc[tag] = { el, list: [] };
                    acc[tag].list.push(el);
                    return acc;
                }, {} as Record<string, { el: Element, list: Element[] }>)
        );

        if (hasTemplate) {
            (children[0] as HTMLTemplateElement).remove();
        }

        if (Array.isArray(componentSlotNames)) {
            for (const componentTag of componentSlotNames) {
                if (componentTag.hasOwnProperty("list") && componentTag.hasOwnProperty("el")) {
                    const list = componentTag.list;
                    if (Array.isArray(list)) {
                        const listExp: ComponentTemplateType<TProp>[] = [];
                        for (const itemComponent of list) {
                            listExp.push(this.#getListTemplates_templateData(itemComponent));
                        }
                        resultExp[componentTag.el.tagName.toLowerCase().replace(/^component-/, '')] = listExp;
                    }
                }
            }
        }

        return resultExp;
    }

    #getListTemplates_templateData(el: Element): ComponentTemplateType<TProp> {
        return {
            reference:   "" ,
            html:        el.innerHTML,
            attrs:       Object.fromEntries([...el.attributes].map(a => [a.name, a.value]))
        };
    }

    #getReadyTemplateValueSelected(listTemplates: Record<string, ComponentTemplateType<TProp>[]>, templateName: string, templateData: any) {
        let resultExp: any = null;
        if (listTemplates != null) {
            Object.keys(listTemplates).forEach(temp => {
                if (temp === templateName) {
                    const itemTemplate = listTemplates[templateName];
                    const reference = templateData.reference;
                    const isMulti = this.#getReadyTemplateValueSelected_hasMultiTemplate(reference);

                    if (isMulti) {
                        resultExp = itemTemplate;
                    } else {
                        if (itemTemplate.length > 0 && itemTemplate[0] != null && itemTemplate[0].hasOwnProperty("html")) {
                            resultExp = itemTemplate[0].html;
                        }
                    }
                }
            });
        }
        return resultExp;
    }

    #getReadyTemplateValueSelected_hasMultiTemplate(reference: any): boolean {
        let resultExp = false;
        if (this._COMPONENT_PATTERN != null) {
            Object.keys(this._COMPONENT_PATTERN).forEach(key => {
                if (key === reference) {
                    const refData = this._COMPONENT_PATTERN[key];
                    resultExp = refData.hasOwnProperty("hasMultiTemplate") ? refData.hasMultiTemplate : false;
                }
            });
        }
        return resultExp;
    }*/



    //--------------------------------------------------
    // GET Ready ==> _COMPONENT_PROPS_BIND
    //--------------------------------------------------
    #getReadyComponentParamsWithDefault() {

        if (this._COMPONENT_PROPS.hasOwnProperty("part_component")) {
            if (this._COMPONENT_PATTERN.hasOwnProperty("classList")){
                this._COMPONENT_PROPS["part_component"].push(this._COMPONENT_PATTERN["classList"]);
            }
            if (this._COMPONENT_PATTERN.hasOwnProperty("styles")){
                this._COMPONENT_PROPS["part_component"].push(this._COMPONENT_PATTERN["styles"]);
            }
        }

        if (this._COMPONENT_PROPS.hasOwnProperty("part_structure")) {
            if (this._COMPONENT_PATTERN.hasOwnProperty("prop_show")){
                this._COMPONENT_PROPS["part_structure"].push(this._COMPONENT_PATTERN["prop_show"]);
            }
            if (this._COMPONENT_PATTERN.hasOwnProperty("prop_structureClass")){
                this._COMPONENT_PROPS["part_structure"].push(this._COMPONENT_PATTERN["prop_structureClass"]);
            }
            if (this._COMPONENT_PATTERN.hasOwnProperty("prop_structureStyles")){
                this._COMPONENT_PROPS["part_structure"].push(this._COMPONENT_PATTERN["prop_structureStyles"]);
            }
        }


        /*if (this._COMPONENT_PROPS.hasOwnProperty("part_label")) {
            const labelProps = [
                { prop: "prop_title",                     default: null },
                { prop: "prop_labelShow",                 default: true },
                { prop: "prop_labelTooltipDescription",   default: null },
                { prop: "prop_labelClass",                default: ["shadow-sm", "px-2", "d-block", "rounded"] },
                { prop: "prop_labelStyles",               default: { "font-size": "10pt" } },
                { prop: "prop_labelHoverStyles",          default: null },
                //{ prop: "prop_labelSize",                 default: tools_css.standardSizes.m.name }
            ];

            labelProps.forEach(p => {
                if (this._COMPONENT_PROPS &&!this._COMPONENT_PROPS.part_label.hasOwnProperty(p.prop)) {
                    this._COMPONENT_PROPS["part_label"].push(p);
                }
            });
        }*/
    }

    #getReadyRealProps(): IComponentProp<TProp>[] {
        const props: ComponentPropKeys<TProp>[] = [];
        //const props: ComponentPartitionType[] = [];
        if (!this._COMPONENT_PROPS) return props;

        Object.entries(this._COMPONENT_PROPS).forEach(([partName, partParams]) => {
            for (const param of partParams) {
                if (param != null) props.push(param);
            }
        });

        return props;
    }

    #getReadyUserConfigAndDefaultConfig(config: Record<string, any>, props: IComponentProp<TProp>[]): IComponentProp<TProp>[] {
        if (props != null && config != null) {

            for (let i = 0; i < props.length; i++) {
                const itemProp = props[i];
                if (itemProp.hasOwnProperty("prop")) {
                    const propName = itemProp.prop;
                    if (config.hasOwnProperty(propName)) {
                        props[i].default = config[itemProp.prop];
                    } else {
                        if (this._COMPONENT_TEMPLATES != null) {
                            Object.keys(this._COMPONENT_TEMPLATES).forEach(templateName => {
                                const data = this._COMPONENT_TEMPLATES[templateName];
                                const reference = data.reference;
                                if (reference?.prop == propName && data.hasOwnProperty("value")) {
                                    props[i].default = data.value;
                                }
                            });
                        }
                    }
                }
            }
        }

        return props;
    }

    #getReadyParamsBinding(props: IComponentProp<TProp>[]) {
        for (const param of props) {
            if (param != null && param.hasOwnProperty("prop")) {
                const defaultValue = param?.default ?? null;
                this._COMPONENT_PROPS_BIND[param.prop] = new Observable(defaultValue);
            }
        }
    }





    //--------------------------------------------------
    // GET Ready ==> _COMPONENT_ELEMENT
    //--------------------------------------------------
    #getReadyTemplateSchema() {
        this._COMPONENT_CONTENT = this.templateBasic_render();

        if (this._COMPONENT_ELEMENT != null) {
            const classList = this.get("classList");
            const styles = this.get("styles");
            //this._COMPONENT_ELEMENT.className = tools_public.renderListClass(classList);
            //Object.assign(this._COMPONENT_ELEMENT.style, tools_public.renderListStyle(styles));
            this._COMPONENT_ELEMENT.appendChild(this.getSchema());
        }
    }




    //--------------------------------------------------
    // GET Ready ==> _COMPONENT_SELECTOR
    //--------------------------------------------------
    #getComponentElement(): HTMLElement | null {
        return document.querySelector(this._COMPONENT_SELECTOR!);
    }




    //--------------------------------------------------
    // GET Ready ==> _COMPONENT_METHODS
    //--------------------------------------------------
    #getReadyComponentMethods(methods: Record<string, ComponentCallBackType<any , any>>) {
        for (const keyMethod: ComponentMethodKeys<TMethods> in this._COMPONENT_METHODS){
            for (const methodName in  methods){
                const fn = methods[keyMethod];
                if (keyMethod == methodName && fn != null && typeof fn === "function"){
                    const itemMethod: ComponentMethodType<TProp> = this._COMPONENT_METHODS[keyMethod];
                    itemMethod.destination = fn;
                }
            }
        }
    }




    //--------------------------------------------------
    // Template Reader
    //--------------------------------------------------
    templateBasic_render(moreClass: string[] = ["mb-1"]) {
        const partName = "part_component";
        const data = this.getPartProps(partName);

        if (data != null) {

            const rtl = AppConfig.observable("directionRtl")
            let classList: Observable<any> | any[] = [];
            let styles: Record<string, any> = {};
            if (this._COMPONENT_ELEMENT == null) {
                classList = data?.classList ?? [];
                styles = data?.styles ?? {};
            }

            return ReactiveElement.section({
                className: [
                    ...moreClass ,
                    "component-element-structure",
                ],
                classBind: [
                   classList
                ] ,
                styles: {

                },
                stylesBind: {
                    direction: rtl.mapBoolean("rtl" , "ltr") ,
                    styles
                },
                children: [
                    this.template_render_structure()
                ]
            });
        }

        return ReactiveElement.section({
            className: [
                "component-element-structure"
            ]
        });
    }

    templateBasic_render_structure(content: any = null, moreClass: string = "") {
        const partName = "part_structure";
        const data = this.getPartProps(partName);

        if (data != null) {
            const prop_show = data.prop_show;
            const prop_structureClass = data.prop_structureClass;
            const prop_structureStyles = data.prop_structureStyles;

            return ReactiveElement.section({
                className: [
                    "position-relative",
                ],
                classBind: [
                    prop_structureClass ,
                    prop_show.mapBoolean("show" , "d-none")
                ],
                attrs: {
                    "data-part-name":  partName,
                    "id":              `component-${this._COMPONENT_NAME}-structure-${this._COMPONENT_RANDOM_ID}`,
                },
                styles: {},
                stylesBind: {
                    prop_structureStyles
                },
                children: [
                    content
                ]
            });
        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name": partName,
            },
        });
    }



    //--------------------------------------------------
    // part Props
    //--------------------------------------------------
    getPartProps(partName: string): Record<string, Observable<any>> | null {
        let resultExp: Record<string, Observable<any>> | null = null;
        if (this._COMPONENT_PROPS != null) {
            Object.keys(this._COMPONENT_PROPS).forEach(key => {
                if (key === partName) {
                    resultExp = {};
                    if (this._COMPONENT_PROPS) {
                        const props = this._COMPONENT_PROPS[key];
                        for (const param of props) {
                            if (param != null && param.hasOwnProperty("prop")) {
                                resultExp[param.prop] = this._COMPONENT_PROPS_BIND[param.prop];
                            }
                        }
                    }
                }
            });
        }
        return resultExp;
    }

    getSchema() {
        return this._COMPONENT_CONTENT.getElement();
    }

    //--------------------------------------------------
    // Prop
    //--------------------------------------------------
    set(propName: TProp, propValue: any) {
        //console.log(propName)
        if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
            this._COMPONENT_PROPS_BIND[propName].set(propValue);
        }
    }
    get(propName: TProp) {
        if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
            return this._COMPONENT_PROPS_BIND[propName].get();
        }
        return null;
    }


    //--------------------------------------------------
    // Template Reader
    //--------------------------------------------------
    executeMethod(methodName: string, event: Event , dataArgs: Record<string, any>|null = null) {
        const [fn, componentArgs] = this.#executeMethod_getMethodData(methodName);
        if (typeof fn === "function") {
            fn.call(this, event, dataArgs , componentArgs);
        }
    }

    #executeMethod_getMethodData(methodName: string): [Function | null, Record<string, any>] {
        let fn: Function | null = null;
        let argsObject: Record<string, any> = {};
        if (this._COMPONENT_METHODS != null) {
            Object.keys(this._COMPONENT_METHODS).forEach(key => {
                const methodData = this._COMPONENT_METHODS[key];
                if (key === methodName && typeof methodData.destination === "function") {
                    fn = methodData.destination;
                    argsObject = this.#executeMethod_getMethodData_getArgs(methodData.args || {});
                }
            });
        }
        return [fn, argsObject];
    }

    #executeMethod_getMethodData_getArgs(args: Record< string,   IComponentProp<TProp> >): Record<string, any> {
    //#executeMethod_getMethodData_getArgs(args: Record< string, ComponentPartitionType >): Record<string, any> {
        const argsExp: Record<string, any> = {};
        Object.keys(args).forEach(keyArg => {
            const argProp   = args[keyArg];
            if (argProp != null && this._COMPONENT_PROPS_BIND.hasOwnProperty(argProp.prop)) {
                argsExp[keyArg] = this._COMPONENT_PROPS_BIND[argProp.prop].get();
            }
        });
        return argsExp;
    }

    template_render_structure():  ReactiveElement {
        return ReactiveElement.section({
            children: [
                `<div class="not-exist-body"></div>`
            ]
        });
    }
}