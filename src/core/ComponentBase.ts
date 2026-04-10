import {Observable} from "./Observable";
import {ReactiveElement} from "./ReactiveElement";
import {AppConfig} from "./AppConfig";
import {ComponentAttrsDefault, ConnectorComponent} from "./component/ConnectorComponent";
import {
    GOG_ComponentBasicConfigs_component_parts, GOG_ComponentBasicConfigs_structure_parts,
    GOG_ComponentBasicConfigs_structure_Schema,
    GOG_ComponentBasicProps_component
} from "./component/SetupComponent";

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







/// ----------------------------------------------------
/// COMPONENT PATTERN
/// ----------------------------------------------------
type ComponentPropKeys<TPropTypes> = keyof TPropTypes
export interface IComponentProp<TPropTypes> {
    prop:              string;
    default:           TPropTypes;
    value?:             null;
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
export interface IComponentSchema<TSchema , TPropTypes> {
    part:              TSchema ,
    method?:           (attrsDefault:  ComponentAttrsDefault , data: Record<string, Observable<any>> , extra: Record<string, any>) => ReactiveElement,
    props?:            IComponentProp<TPropTypes[keyof TPropTypes]>[] ,
    title?:            Observable<string> ,
    description?:      Observable<string> ,
}
export function defineComponentSchema<TSchema , TPropTypes>(props: { [K in  ComponentSchemaKeys<TSchema>]: IComponentSchema<TSchema[K] , TPropTypes[K]> }) :  { [K in  ComponentSchemaKeys<TSchema>]: IComponentSchema<TSchema[K] , TPropTypes[K]> } {
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
    > extends ConnectorComponent{

    _COMPONENT_PATTERN : { [K in  ComponentPropKeys<TProp>]?:           IComponentProp<TProp[K]> }

    _COMPONENT_SCHEMA:   { [K in  ComponentSchemaKeys<TSchemas>]: IComponentSchema<TSchemas[K] , TProp[K]> }

    _COMPONENT_METHODS:   { [K in ComponentMethodKeys<TMethods>]:       ComponentMethodType<TProp> }

    _COMPONENT_TEMPLATES: { [K in  ComponentTemplateKeys<TTemplate>]?:  ComponentTemplateType<TProp> } ;

    _COMPONENT_PROPS_BIND: Record<string, Observable<any>> = {};

    _COMPONENT_CONFIG;


    _COMPONENT_RANDOM_ID: number = 0;
    _COMPONENT_ID: string | null = null;
    _COMPONENT_NAME: string;
    //_COMPONENT_SELECTOR: string | null = null;
    //_COMPONENT_ELEMENT: HTMLElement | null = null;
    _COMPONENT_CONTENT: ReactiveElement;
    //_COMPONENT_SLOTS: any[] = [];

    _unsubscribeDirection: any;

    //--------------------------------------------------
    // construct
    //--------------------------------------------------
    constructor(
        //componentConfig: Record<string, any> ,
        componentName:   string,
        elId:            string|null
    ) {
        super();

        // this._COMPONENT_CONFIG = componentConfig;
        this._COMPONENT_NAME = componentName;
        this._COMPONENT_ID = elId;

        this._COMPONENT_RANDOM_ID = Math.floor(Math.random() * 10000);
        //this._COMPONENT_SELECTOR = this._COMPONENT_NAME + "#" + this._COMPONENT_ID;
        //this._COMPONENT_ELEMENT = this.#getComponentElement();
    }

    renderComponent(config: TProp , methods: TMethods) {

        this.connectedCallback();

        // GET Ready ==> _COMPONENT_TEMPLATES
        //this.#getReadyTemplates();

        // GET Ready ==> _COMPONENT_PROPS_BIND
        //this.#getReadyComponentParamsWithDefault();


        //let realConfig = this._COMPONENT_PATTERN;

        //let realConfig = this.#getReadyRealProps();
        this.#getReadyUserConfigAndDefaultConfig(config);
        //this.#getReadyParamsBinding(realConfig);


        // GET Ready ==> _COMPONENT_METHODS
        this.#getReadyComponentMethods(methods);


        // GET Ready ==> _COMPONENT_ELEMENT
        this.createComponentElement();
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
   /* #getReadyComponentParamsWithDefault() {

      /!*  if (this._COMPONENT_SCHEMA.hasOwnProperty("part_component")) {
            if (this._COMPONENT_PATTERN.hasOwnProperty("classList")){
                this._COMPONENT_SCHEMA["part_component"].props.push(this._COMPONENT_PATTERN["classList"]);
            }
            if (this._COMPONENT_PATTERN.hasOwnProperty("styles")){
                this._COMPONENT_SCHEMA["part_component"].props.push(this._COMPONENT_PATTERN["styles"]);
            }
        }

        if (this._COMPONENT_SCHEMA.hasOwnProperty("part_structure")) {
            if (this._COMPONENT_PATTERN.hasOwnProperty("prop_show")){
                this._COMPONENT_SCHEMA["part_structure"].props.push(this._COMPONENT_PATTERN["prop_show"]);
            }
            if (this._COMPONENT_PATTERN.hasOwnProperty("prop_structureClass")){
                this._COMPONENT_SCHEMA["part_structure"].props.push(this._COMPONENT_PATTERN["prop_structureClass"]);
            }
            if (this._COMPONENT_PATTERN.hasOwnProperty("prop_structureStyles")){
                this._COMPONENT_SCHEMA["part_structure"].props.push(this._COMPONENT_PATTERN["prop_structureStyles"]);
            }
        }
*!/

        /!*if (this._COMPONENT_PROPS.hasOwnProperty("part_label")) {
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
        }*!/
    }*/

    /*#getReadyRealProps(): IComponentProp<TProp>[] {
        const props: ComponentPropKeys<TProp>[] = [];
        //const props: ComponentPartitionType[] = [];



        Object.entries(this._COMPONENT_PATTERN).forEach(([partName, partParams]) => {


            for (const param of partParams) {
                if (param != null) props.push(param);
            }
        });

        return props;
    }*/

    #getReadyUserConfigAndDefaultConfig(config: Record<string, any>): IComponentProp<TProp>[] {
        const props = this._COMPONENT_PATTERN;
        if (config) {

            Object.keys(props).forEach(key => {
                const itemProp = props[key];
                if (itemProp.hasOwnProperty("prop")) {
                    const propName = itemProp.prop;

                    let exist = false;
                    let value = null;
                    if (config.hasOwnProperty(propName)) {
                        value = config[itemProp.prop];
                        exist = true;
                    } else {
                        if (this._COMPONENT_TEMPLATES != null) {
                            Object.keys(this._COMPONENT_TEMPLATES).forEach(templateName => {
                                const data = this._COMPONENT_TEMPLATES[templateName];
                                const reference = data.reference;
                                if (reference?.prop == propName && data.hasOwnProperty("value")) {
                                    value = data.value;
                                    exist = true;
                                }
                            });
                        }
                    }

                    if (!exist && itemProp.hasOwnProperty("default")){
                        value = itemProp.default;
                    }

                    props[key].value = value;
                    if (Observable.isObservable(value)){
                        this._COMPONENT_PROPS_BIND[propName] = value;
                    }
                    else {
                        this._COMPONENT_PROPS_BIND[propName] = new Observable(value);
                    }
                }
            })
        }
        return props;
    }

    /*#getReadyParamsBinding(props: IComponentProp<TProp>[]) {

        for (const param of props) {
            if (param != null && param.hasOwnProperty("prop")) {
                const defaultValue = param?.value ?? null;
                if (Observable.isObservable(defaultValue)){
                    this._COMPONENT_PROPS_BIND[param.prop] = defaultValue;
                }
                else {
                    this._COMPONENT_PROPS_BIND[param.prop] = new Observable(defaultValue);
                }

            }
        }

    }*/




    /*//--------------------------------------------------
    // GET Ready ==> _COMPONENT_ELEMENT
    //--------------------------------------------------
    #getReadyTemplateSchema() {
        this._COMPONENT_CONTENT = this.executeSchemaPart("part_component");
        if (this._COMPONENT_ELEMENT != null) {
            this._COMPONENT_ELEMENT.appendChild(this.getSchema());
        }
    }*/




    /*//--------------------------------------------------
    // GET Ready ==> _COMPONENT_SELECTOR
    //--------------------------------------------------
    #getComponentElement(): HTMLElement | null {
        return document.querySelector(this._COMPONENT_SELECTOR!);
    }*/




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
    // create element
    //--------------------------------------------------

    private createComponentElement(){
        this._COMPONENT_CONTENT = this.executeSchemaPart(GOG_ComponentBasicConfigs_component_parts.COMPONENT.name);

        const selector = this.get(GOG_ComponentBasicProps_component.selector);
        if (selector){
            const el = document.querySelector(selector)
            if (el){
                const append = this.get(GOG_ComponentBasicProps_component.append);
                if (append){
                    el.append(this._COMPONENT_CONTENT.getElement())
                }
                else {
                    el.replaceChildren(this._COMPONENT_CONTENT.getElement())
                }
            }
        }
    }





    //--------------------------------------------------
    // Template Reader
    //--------------------------------------------------
    executeSchemaPart(partName , extra=null) {
        let result;

        if (this._COMPONENT_SCHEMA ){
            Object.keys(this._COMPONENT_SCHEMA).forEach(key=> {
                const itemPart = this._COMPONENT_SCHEMA[key];
                if (itemPart && itemPart.hasOwnProperty("part") && itemPart.part == partName){
                    if (itemPart.hasOwnProperty("props")){
                        const props  = itemPart.props;
                        const data = this.getSchemaPropsInPart(props);

                        const attrsDefault : ComponentAttrsDefault = {
                            "data-part-name":     partName,
                            "id":                 this.getPartId(partName),
                        }

                        if (itemPart.hasOwnProperty('method') && typeof itemPart.method == "function"){
                            result = itemPart.method.call(this , attrsDefault , data , extra);
                        }
                        else {
                            result = this.renderManagerComponent(partName , attrsDefault , data , extra);
                        }
                    }
                }
            })
        }



        return result;
    }

    getSchemaPropsInPart(props){
        let resultExp: Record<string, Observable<any>>  = {};
        for (const param of props) {
            if (param != null && param.hasOwnProperty("prop")) {
                resultExp[param.prop] = this._COMPONENT_PROPS_BIND[param.prop];
            }
        }
        return resultExp;
    }




    //--------------------------------------------------
    // template parts
    //--------------------------------------------------
    templateBasic_render(
        attrsDefault ,
        data ,
        extra
        //moreClass: string[] = ["mb-1"]
    ) :ReactiveElement {
        //const partName = "part_component";
        //const data = this.getPartProps(partName);

        if (data != null) {

            const rtl = AppConfig.observable("directionRtl")
            let classList =  data?.classList ?? [];
            let styles = data?.styles ?? {};
            /*if (this._COMPONENT_ELEMENT == null) {
                classList = data?.classList ?? [];
                styles = data?.styles ?? {};
            }*/

             return  ReactiveElement.component( this._COMPONENT_NAME ,{
                attrs: {
                    ...attrsDefault
                },
                className: [
                    //...moreClass ,
                    //"position-relative" ,
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
                    this.executeSchemaPart(GOG_ComponentBasicConfigs_structure_parts.STRUCTURE.name) ,
                ]
            })
        }

        return  ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    templateBasic_render_structure(
        attrsDefault ,
        data ,
        extra
    ) : ReactiveElement {

        if (data != null) {
            const prop_show = data.prop_show;
            const prop_structureClass = data.prop_structureClass;
            const prop_structureStyles = data.prop_structureStyles;

            return  ReactiveElement.part(  "section" ,{
                className: [
                    //...moreClass ,
                    //"position-relative",
                ],
                classBind: [
                    prop_structureClass ,
                    prop_show.mapBoolean("show" , "d-none")
                ],
                attrs: {
                    ...attrsDefault
                },
                styles: {},
                stylesBind: {
                    prop_structureStyles
                },
                children: [
                    this.renderContentComponent()

                ]
            });
        }

        return  ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            },
        });
    }



    //--------------------------------------------------
    // part Props
    //--------------------------------------------------
    /*getPartProps(partName: string): Record<string, Observable<any>> | null {
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
    }*/

    getReactiveElement() {
        return this._COMPONENT_CONTENT.getReactiveElement();
    }
    getElement() {
        return this._COMPONENT_CONTENT.getElement();
    }

    //--------------------------------------------------
    // Prop
    //--------------------------------------------------
    set(propName: string, propValue: any) {
        //console.log(propName)
        if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
            this._COMPONENT_PROPS_BIND[propName].set(propValue);
        }
    }
    get(propName: string) {
        if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
            return this._COMPONENT_PROPS_BIND[propName].get();
        }
        return null;
    }

    getPartId(partName) : string{
        return `__component-${this._COMPONENT_NAME}__${partName}__${this._COMPONENT_RANDOM_ID}`
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
        const argsExp: Record<string, any> = {};
        Object.keys(args).forEach(keyArg => {
            const argProp   = args[keyArg];
            if (argProp != null && this._COMPONENT_PROPS_BIND.hasOwnProperty(argProp.prop)) {
                argsExp[keyArg] = this._COMPONENT_PROPS_BIND[argProp.prop].get();
            }
        });
        return argsExp;
    }




}