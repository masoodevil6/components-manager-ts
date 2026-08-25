import * as CoreConfigs                                                                      from "@/core_configs";
import * as CoreObservable                                                                   from "@/core_observable";
import * as CoreReactive                                                                     from "@/core_reactive";
// --------------------------------
import {AbComponentConnector        as ComponentConnector}                                   from "../abstract/AbComponentConnector";
import {TPartAttrDefault            as PartAttrDefault}                                      from "../../basic/types/TPartAttrDefault";
import {Interface_ComponentMethod   as MethodInterface  }                                    from "../../tools/method/Interface_ComponentMethod";
import {Type_ComponentMethod        as MethodType  }                                         from "../../tools/method/Type_ComponentMethod";
import {Callback_ComponentMethod    as MethodCallback  }                                     from "../../tools/method/Callback_ComponentMethod";
import {Interface_ComponentProp     as PropInterface  }                                      from "../../tools/prop/Interface_ComponentProp";
import {Type_ComponentProp          as PropType  }                                           from "../../tools/prop/Type_ComponentProp";
import {Interface_ComponentSchema   as SchemaInterface  }                                    from "../../tools/schema/Interface_ComponentSchema";
import {Type_ComponentSchema        as SchemaType  }                                         from "../../tools/schema/Type_ComponentSchema";
import {Interface_ComponentTemplate as TemplateInterface  }                                  from "../../tools/template/Interface_ComponentTemplate";
import {Type_ComponentTemplate      as TemplateType  }                                       from "../../tools/template/Type_ComponentTemplate";


export class ClComponentBase<
    TProp extends Record<string, any> ,
    TSchemas ,
    TTemplate ,
    TMethods extends Record<string, MethodCallback<any , any>>
    > extends ComponentConnector{

    private _renderScope = new CoreObservable.Scope();

    _COMPONENT_PATTERN! : { [K in    PropType<TProp>]?:            PropInterface<TProp[K]> }

    _COMPONENT_SCHEMA! :   { [K in   SchemaType<TSchemas>]:        SchemaInterface<TSchemas[K] , TProp> }

    _COMPONENT_METHODS! :   { [K in  MethodType<TMethods>]:        MethodInterface<TProp> }

    _COMPONENT_TEMPLATES! : { [K in  TemplateType<TTemplate>]?:    TemplateInterface<TProp> } ;

    _COMPONENT_PROPS_BIND: Record<string, CoreObservable.App<any>> = {};

    _COMPONENT_CONFIG!: Record<string, any>;


    _COMPONENT_RANDOM_ID: number = 0;
    _COMPONENT_ID: string | null = null;
    _COMPONENT_NAME: string;
    //_COMPONENT_SELECTOR: string | null = null;
    //_COMPONENT_ELEMENT: HTMLElement | null = null;
    _COMPONENT_CONTENT!: CoreReactive.App;
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
        this._unsubscribeDirection =
            CoreObservable.App.computed(
                ( dir) => {
                    this.set("directionRtl", dir);
                    },
                [
                    CoreConfigs.App.state(CoreConfigs.States.DirectionRtl).observable()
                ],
                this.getScope());

    }

    #getReadyUserConfigAndDefaultConfig(config: Record<string, any>):   PropInterface<TProp>[] {
        const props = this._COMPONENT_PATTERN;
        if (config) {

            Object.keys(props).forEach(key => {
                const itemProp = props[key];
                if (itemProp && itemProp.hasOwnProperty("prop")) {
                    const propName = itemProp.prop;

                    let exist = false;
                    let value = null;
                    if (config.hasOwnProperty(propName)) {
                        value = config[itemProp.prop];
                        exist = true;
                    } else {
                        if (this._COMPONENT_TEMPLATES != null) {
                            Object.keys(this._COMPONENT_TEMPLATES).forEach(templateName => {
                                const data = this._COMPONENT_TEMPLATES[templateName as keyof typeof this._COMPONENT_TEMPLATES];
                                if (!data) return;
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

                    itemProp.value = value;
                    if (CoreObservable.App.isObservable(value)){
                        this._COMPONENT_PROPS_BIND[propName] = value;
                    }
                    else {
                        this._COMPONENT_PROPS_BIND[propName] = new CoreObservable.App(value);
                    }
                }
            })
        }
        return Object.values(props);
    }


    //--------------------------------------------------
    // GET Ready ==> _COMPONENT_METHODS
    //--------------------------------------------------
    #getReadyComponentMethods(methods: Record<string, MethodCallback<any , any>>) {
        for (const keyMethod in this._COMPONENT_METHODS){
            for (const methodName in  methods){
                const fn = methods[keyMethod];
                if (keyMethod == methodName && fn != null && typeof fn === "function"){
                    const itemMethod: MethodInterface<TProp> = this._COMPONENT_METHODS[keyMethod];
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
        this._renderScope = new CoreObservable.Scope();

        // اولین Part تعریف‌شده در Schema به عنوان بخش اصلی (Root) کامپوننت رندر می‌شود
        const firstSchema = Object.values(this._COMPONENT_SCHEMA)[0] as SchemaInterface<any, any> | undefined;
        const rootPartName: string | undefined = firstSchema?.part as string | undefined;
        this._COMPONENT_CONTENT = this.executeSchemaPart(rootPartName as string)!;

        const selector = this.get("selector");
        if (selector){
            const el = document.querySelector(selector)
            if (el){
                const append = this.get("append");
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
    executeSchemaPart(partName: string, extra: any = null) {
        let result = null;

        if (this._COMPONENT_SCHEMA ){
            Object.keys(this._COMPONENT_SCHEMA).forEach(key=> {
                const itemPart = this._COMPONENT_SCHEMA[key as keyof typeof this._COMPONENT_SCHEMA];
                if (itemPart && itemPart.hasOwnProperty("part") && itemPart.part == partName){
                    if (itemPart.hasOwnProperty("props")){
                        const props  = itemPart.props;
                        const data = this.getSchemaPropsInPart(props);

                        const attrsDefault : PartAttrDefault = {
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

    getSchemaPropsInPart(props: PropInterface<any>[]){
        let resultExp: Record<string, CoreObservable.App<any>>  = {};
        for (const param of props) {
            if (param != null && param.hasOwnProperty("prop")) {
                resultExp[param.prop] = this._COMPONENT_PROPS_BIND[param.prop];
            }
        }
        return resultExp;
    }


    getReactiveElement() {
        if (this._COMPONENT_CONTENT && typeof this._COMPONENT_CONTENT.getReactiveElement === 'function') {
            return this._COMPONENT_CONTENT.getReactiveElement();
        }
        return this._COMPONENT_CONTENT;
    }
    getElement() {
        if (this._COMPONENT_CONTENT && typeof this._COMPONENT_CONTENT.getElement === 'function') {
            return this._COMPONENT_CONTENT.getElement();
        }
        return this._COMPONENT_CONTENT;
    }

    //--------------------------------------------------
    // Prop
    //--------------------------------------------------
    set(propName: string, propValue: any) {
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

    getScope(): CoreObservable.Scope{
        return this._renderScope;
    }

    getPartId(partName: string) : string{
        return `__component-${this._COMPONENT_NAME}__${partName}__${this._COMPONENT_RANDOM_ID}`
    }


    //--------------------------------------------------
    // Template Reader
    //--------------------------------------------------
    executeMethod(methodName: string, event: Event , dataArgs: Record<string, any>|null = null) {
        const [fn, componentArgs] = this.#executeMethod_getMethodData(methodName);
        if (typeof fn === "function") {
            return fn.call(this, event, dataArgs , componentArgs);
        }
        return null;
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

    #executeMethod_getMethodData_getArgs(args: Record< string, PropInterface<TProp> >): Record<string, any> {
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