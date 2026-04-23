import {Observable, Scope} from "./Observable";
import {ReactiveElement} from "./ReactiveElement";
import {AppConfig} from "./AppConfig";
import {ComponentAttrsDefault, ConnectorComponent} from "./component/ConnectorComponent";
import {
    GOG_ComponentBasicConfigs_Component_parts, GOG_ComponentBasicProps_Component

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

    private _renderScope = new Scope();

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

    renderComponent(config: TProp , methods: TMethods , events = null) {

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

        if (events){
            Object.keys(events).forEach(key=> {
                this._COMPONENT_CONTENT.on(key , events[key])
            })
        }
    }

    connectedCallback() {
        this.set("directionRtl", AppConfig.get("directionRtl"));
        this._unsubscribeDirection =
            AppConfig.subscribe("directionRtl", (value: any) => {
                this.set("directionRtl", value);
            });
    }

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
        this._renderScope.dispose();
        this._renderScope = new Scope();

        this._COMPONENT_CONTENT = this.executeSchemaPart(GOG_ComponentBasicConfigs_Component_parts.Component.name);

        const selector = this.get(GOG_ComponentBasicProps_Component.selector);
        if (selector){
            const el = document.querySelector(selector)
            if (el){
                const append = this.get(GOG_ComponentBasicProps_Component.append);
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
        let result = null;

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
    getObservable(propName: string) {
        if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
            return this._COMPONENT_PROPS_BIND[propName];
        }
        return null;
    }

    getScope(): Scope{
        return this._renderScope;
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