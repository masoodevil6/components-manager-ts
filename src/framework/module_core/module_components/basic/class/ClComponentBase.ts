import * as CoreConfigs                                                                      from "@/core_configs";
import * as CoreObservable                                                                   from "@/core_observable";
import * as CoreReactive                                                                     from "@/core_reactive";
import * as CoreEvent                                                                        from "@/core_event";
import {
    Attach_Current_ComponentWorkflowChild,
    Attach_ComponentWorkflow,
    Detach_ComponentWorkflow,
    Define_ComponentWorkflow,
    Get_ComponentWorkflowMetadata,
    Register_ComponentWorkflowElement,
    Set_ComponentWorkflowMetadata,
    With_ComponentWorkflowComposition,
}                                                                                           from "../../tools/workflow";
import type {Interface_ComponentWorkflow}                                                    from "../../tools/workflow";
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
    TMethods extends Record<string, MethodCallback<any , any>>,
    TWorkflow extends Interface_ComponentWorkflow<any> = Interface_ComponentWorkflow
    > extends ComponentConnector{

    protected _renderScope = new CoreObservable.Scope();
    private _resettingRenderScope = false;

    protected _COMPONENT_PATTERN! : { [K in    PropType<TProp>]?:            PropInterface<TProp[K]> }

    protected _COMPONENT_SCHEMA! :   { [K in   SchemaType<TSchemas>]:        SchemaInterface<TSchemas[K] , TProp> }

    protected _COMPONENT_METHODS! :   { [K in  MethodType<TMethods>]:        MethodInterface<TProp> }

    protected _COMPONENT_TEMPLATES! : { [K in  TemplateType<TTemplate>]?:    TemplateInterface<TProp> } ;

    _COMPONENT_PROPS_BIND: Record<string, CoreObservable.App<any>> = {};

    protected _COMPONENT_WORKFLOW: TWorkflow = Define_ComponentWorkflow() as TWorkflow;
    private _workflowChildComponents = new Map<string, {workflow: CoreEvent.TStepRef; component: any}>();
    private _workflowChildSlotNames = new Map<string, string>();
    private _activeWorkflowChildNames: Set<string> | null = null;
    private _workflowChildAutoNames = new WeakMap<object, string>();
    private _workflowChildNameCounters = new Map<string, number>();

    _COMPONENT_CONFIG!: Record<string, any>;


    _COMPONENT_RANDOM_ID: number = 0;
    _COMPONENT_ID: string | null = null;
    _COMPONENT_NAME: string;
    //_COMPONENT_SELECTOR: string | null = null;
    //_COMPONENT_ELEMENT: HTMLElement | null = null;
    _COMPONENT_CONTENT!: CoreReactive.App;
    //_COMPONENT_SLOTS: any[] = [];

    _unsubscribeDirection: any;

    _COMPONENT_UNIQUE: CoreEvent.TStepRef | null = null;
    _COMPONENT_EMIT: CoreEvent.TEmitHandler | null = null;

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

    renderComponent(config: TProp , methods: TMethods , events = null , unique: CoreEvent.TStepRef | null = null , emit: CoreEvent.TEmitHandler | null = null) {

        const componentStep = (this as any)._COMPONENT_STEP as CoreEvent.TStepRef | null | undefined;
        if (componentStep?.identity && componentStep.identity !== this._COMPONENT_WORKFLOW.identity) {
            this.setComponentWorkflow(componentStep as TWorkflow);
        }

        const definition = (this as any)._COMPONENT_DEFINITION;
        Set_ComponentWorkflowMetadata(this._COMPONENT_WORKFLOW, {
            kind: "component",
            component: {
                name: definition?.name ?? this._COMPONENT_NAME,
                id: definition?.id ?? this._COMPONENT_ID ?? this._COMPONENT_NAME,
            },
        });

        // اگر unique/emit پاس داده شد، override کن؛ وگرنه از مقادیر قبلی استفاده کن
        // (برای Componentهایی که identity را در constructor set می‌کنند)
        this._COMPONENT_UNIQUE = unique   ?? this._COMPONENT_UNIQUE;
        this._COMPONENT_EMIT   = emit     ?? this._COMPONENT_EMIT;

        // ثبت emit handler در CoreEvent dispatcher
        // auto-bind(this) → this در emit به این Component instance اشاره می‌کند
        // نکته: اگر مصرف‌کننده قبلاً .bind(parentInstance) کرده،
        // bind دوم اینجا تاثیری ندارد — bind اول باقی می‌ماند.
        // پس مصرف‌کننده می‌تواند با .bind(this) به Parent Component دسترسی داشته باشد.
        if (this._COMPONENT_UNIQUE && this._COMPONENT_EMIT) {
            CoreEvent.App.registerEmit(this._COMPONENT_UNIQUE, this._COMPONENT_EMIT.bind(this));
        }

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

    /** Replace the default empty StepRegister with this component's typed event workflow. */
    protected setComponentWorkflow<TNext extends CoreEvent.TStepRef>(workflow: TNext): TNext {
        if (workflow.identity === this._COMPONENT_WORKFLOW.identity) return workflow;
        this.disposeWorkflowIfRegistered(this._COMPONENT_WORKFLOW);
        this._COMPONENT_WORKFLOW = workflow as unknown as TWorkflow;
        return workflow;
    }

    getComponentWorkflow(): TWorkflow {
        return this._COMPONENT_WORKFLOW;
    }

    getComponentDefinition(): unknown {
        return (this as any)._COMPONENT_DEFINITION ?? null;
    }

    /** Attach a live child component and return its reactive element for rendering. */
    protected renderWorkflowChild(child: any, fallbackName?: string): any {
        if (child == null || typeof child.getComponentWorkflow !== "function") {
            if (child && typeof child.getReactiveElement === "function") return child.getReactiveElement();
            if (child && typeof child.getElement === "function") return child.getElement();
            return child;
        }

        const configuredName = typeof child.get === "function"
            ? child.get("prop_workflowChildName")
            : null;
        const childWorkflow = child.getComponentWorkflow() as CoreEvent.TStepRef;
        const childName = typeof configuredName === "string" && configuredName.trim().length > 0
            ? configuredName.trim()
            : fallbackName || this.createAutomaticWorkflowChildName(child, childWorkflow);
        this._activeWorkflowChildNames?.add(childName);
        const current = this._workflowChildComponents.get(childName);
        if (current && current.workflow.identity !== childWorkflow.identity) {
            this.removeWorkflowChild(childName);
        }

        const definition = typeof child.getComponentDefinition === "function"
            ? child.getComponentDefinition() as any
            : child._COMPONENT_DEFINITION;
        Attach_ComponentWorkflow(this._COMPONENT_WORKFLOW, childName, childWorkflow, {
            component: {
                name: definition?.name ?? child._COMPONENT_NAME ?? "component",
                id: definition?.id ?? child._COMPONENT_ID ?? child._COMPONENT_NAME ?? "component",
            },
        });
        this._workflowChildComponents.set(childName, {workflow: childWorkflow, component: child});

        if (typeof child.getReactiveElement === "function") return child.getReactiveElement();
        return typeof child.getElement === "function" ? child.getElement() : child;
    }

    /** Resolve a named slot and remove its old workflow when the slot stops holding a component. */
    protected renderWorkflowSlot(child: any, slotName?: string): any {
        if (child && typeof child.getComponentWorkflow === "function") {
            const configuredName = typeof child.get === "function"
                ? child.get("prop_workflowChildName")
                : null;
            const childName = configuredName || slotName;
            if (slotName && typeof childName === "string") {
                const previousName = this._workflowChildSlotNames.get(slotName);
                if (previousName && previousName !== childName) this.removeWorkflowChild(previousName);
            }
            const rendered = this.renderWorkflowChild(child, slotName);
            if (slotName && typeof childName === "string") this._workflowChildSlotNames.set(slotName, childName);
            return rendered;
        }
        if (slotName) this.clearWorkflowChildSlot(slotName);
        return this.renderWorkflowChild(child);
    }

    protected clearWorkflowChildSlot(slotName: string): void {
        const childName = this._workflowChildSlotNames.get(slotName) ?? slotName;
        this.removeWorkflowChild(childName);
        this._workflowChildSlotNames.delete(slotName);
    }

    protected beginWorkflowChildComposition(): Set<string> {
        const activeNames = new Set<string>();
        this._activeWorkflowChildNames = activeNames;
        this._workflowChildNameCounters.clear();
        return activeNames;
    }

    private createAutomaticWorkflowChildName(child: any, childWorkflow: CoreEvent.TStepRef): string {
        for (const [name, current] of this._workflowChildComponents) {
            if (current.workflow.identity === childWorkflow.identity) return name;
        }

        const cachedName = this._workflowChildAutoNames.get(child);
        const cachedCurrent = cachedName ? this._workflowChildComponents.get(cachedName) : null;
        if (cachedName && (!cachedCurrent || cachedCurrent.workflow.identity === childWorkflow.identity
            || (this._activeWorkflowChildNames && !this._activeWorkflowChildNames.has(cachedName)))) {
            this.reserveAutomaticWorkflowChildName(cachedName);
            return cachedName;
        }

        const definition = typeof child.getComponentDefinition === "function"
            ? child.getComponentDefinition() as any
            : child._COMPONENT_DEFINITION;
        const metadataName = Get_ComponentWorkflowMetadata(childWorkflow)?.component?.name;
        const rawName = definition?.name ?? metadataName ?? child._COMPONENT_NAME ?? "component";
        const baseName = String(rawName).replace(/^component[_-]?/i, "");
        const normalizedBase = baseName.length > 0
            ? `${baseName[0].toLowerCase()}${baseName.slice(1)}`
            : "component";

        let index = this._workflowChildNameCounters.get(normalizedBase) ?? 0;
        let candidate = index === 0 ? normalizedBase : `${normalizedBase}${index + 1}`;
        while (true) {
            const current = this._workflowChildComponents.get(candidate);
            const canReplacePreviousCompositionChild = this._activeWorkflowChildNames !== null
                && !this._activeWorkflowChildNames.has(candidate);
            if (!current || current.workflow.identity === childWorkflow.identity || canReplacePreviousCompositionChild) break;
            index++;
            candidate = `${normalizedBase}${index + 1}`;
        }

        this._workflowChildNameCounters.set(normalizedBase, index + 1);
        this._workflowChildAutoNames.set(child, candidate);
        return candidate;
    }

    private reserveAutomaticWorkflowChildName(name: string): void {
        const match = /^(.*?)(\d+)?$/.exec(name);
        if (!match) return;
        const baseName = match[1];
        const index = match[2] ? Number(match[2]) : 1;
        this._workflowChildNameCounters.set(
            baseName,
            Math.max(this._workflowChildNameCounters.get(baseName) ?? 0, index),
        );
    }

    protected endWorkflowChildComposition(activeNames: Set<string>): void {
        if (this._activeWorkflowChildNames === activeNames) this._activeWorkflowChildNames = null;
        for (const childName of this._workflowChildComponents.keys()) {
            if (!activeNames.has(childName)) this.removeWorkflowChild(childName);
        }
    }

    private removeWorkflowChild(childName: string): void {
        const child = this._workflowChildComponents.get(childName);
        if (!child) return;
        Detach_ComponentWorkflow(this._COMPONENT_WORKFLOW, childName, child.workflow);
        child.component?.dispose?.();
        this._workflowChildComponents.delete(childName);
        for (const [slotName, mappedName] of this._workflowChildSlotNames) {
            if (mappedName === childName) this._workflowChildSlotNames.delete(slotName);
        }
    }

    private disposeWorkflowChildren(): void {
        for (const [childName, child] of this._workflowChildComponents) {
            Detach_ComponentWorkflow(this._COMPONENT_WORKFLOW, childName, child.workflow);
            child.component?.dispose?.();
        }
        this._workflowChildComponents.clear();
        this._workflowChildSlotNames.clear();
        this._activeWorkflowChildNames = null;
    }

    private disposeComponentWorkflow(): void {
        this.disposeWorkflowChildren();
        this.disposeWorkflowIfRegistered(this._COMPONENT_WORKFLOW);
        const componentStep = (this as any)._COMPONENT_STEP as CoreEvent.TStepRef | null | undefined;
        if (componentStep?.identity === this._COMPONENT_WORKFLOW.identity) {
            (this as any)._COMPONENT_STEP = null;
        }
    }

    private disposeWorkflowIfRegistered(workflow: CoreEvent.TStepRef): void {
        if (CoreEvent.App.getRegistry().some((step) => step.identity === workflow.identity)) {
            CoreEvent.dispose(workflow);
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
        for (const semanticKey in methods) {
            const fn = methods[semanticKey];
            if (fn != null && typeof fn === "function") {
                const methodMeta = this._COMPONENT_METHODS[semanticKey];
                if (methodMeta) {
                    methodMeta.destination = fn;
                }
            }
        }
    }





    //--------------------------------------------------
    // create element
    //--------------------------------------------------

    protected createComponentElement(){
        this._resettingRenderScope = true;
        this._renderScope.dispose();
        this._renderScope = new CoreObservable.Scope();
        this._resettingRenderScope = false;

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

        this._renderScope.track(() => {
            if (!this._resettingRenderScope) this.disposeComponentWorkflow();
        });
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

                        result = With_ComponentWorkflowComposition(
                            (child, childName) => {
                                if (child !== this) this.renderWorkflowChild(child, childName);
                            },
                            () => {
                                if (itemPart.hasOwnProperty('method') && typeof itemPart.method == "function"){
                                    return itemPart.method.call(this , attrsDefault , data , extra);
                                }
                                return this.renderManagerComponent(partName , attrsDefault , data , extra);
                            },
                            this._COMPONENT_WORKFLOW,
                        );
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
        Attach_Current_ComponentWorkflowChild(this);
        if (this._COMPONENT_CONTENT?.getElement) {
            Register_ComponentWorkflowElement(this._COMPONENT_CONTENT.getElement(), this);
        }
        if (this._COMPONENT_CONTENT && typeof this._COMPONENT_CONTENT.getReactiveElement === 'function') {
            return this._COMPONENT_CONTENT.getReactiveElement();
        }
        return this._COMPONENT_CONTENT;
    }
    getElement() {
        Attach_Current_ComponentWorkflowChild(this);
        if (this._COMPONENT_CONTENT && typeof this._COMPONENT_CONTENT.getElement === 'function') {
            const element = this._COMPONENT_CONTENT.getElement();
            Register_ComponentWorkflowElement(element, this);
            return element;
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
