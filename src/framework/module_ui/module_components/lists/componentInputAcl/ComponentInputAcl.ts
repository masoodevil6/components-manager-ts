import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import {PartAttrDefault} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentInputAclBase} from "./ComponentInputAclBase";
import {PropsConfigType, PropsType, AclItem} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputAclStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentListSelectedScroller from "../componentListSelectedScroller";
import * as ComponentValidate from "../componentValidate";
import * as ComponentFloatMenu from "../componentFloatMenu";
import * as ComponentIcon from "../componentIcon";
import * as UiIcons from "@/ui_icons";

type Child = {dispose?:()=>void; disposeStep?:()=>void};

/** Remote ACL selector. Selection is staged until the position menu is accepted. */
export class ComponentInputAcl extends ComponentInputAclBase {
    private readonly _AVAILABLE = new CoreObservable.App<AclItem[]>([]);
    private readonly _STAGED = new CoreObservable.App<AclItem[]>([]);
    private readonly _COMMITTED = new CoreObservable.App<AclItem[]>([]);
    private readonly _SEARCH = new CoreObservable.App<string | null>(null);
    private readonly _LOADING = new CoreObservable.App(false);
    private readonly _ERROR = new CoreObservable.App<string | null>(null);
    private readonly _MENU_OPEN = new CoreObservable.App(false);
    private readonly _CHILDREN: Child[] = [];
    private _SOURCE: any = null;
    private _SOURCE_UNSUBSCRIBE: (()=>void) | null = null;
    private _DEBOUNCE: ReturnType<typeof setTimeout> | null = null;
    private _CONTROLLER: AbortController | null = null;
    private _PAGE = 1;
    private _FINISHED = false;
    private _REQUEST_ID = 0;
    private _DISPOSED = false;
    private _FLOAT_MENU: ComponentFloatMenu.Component | null = null;
    private _SEARCH_INPUT: ComponentInputSimple.Component | null = null;
    private _MENU_SESSION_ACTIVE = false;
    private _MENU_COMMITTING = false;
    private _SELECTED_SCROLLER: ComponentListSelectedScroller.Component | null = null;

    constructor(config?:Partial<PropsType & PropsConfigType>, methods?:MethodsConfigType<ComponentInputAcl>, identity?:{unique?:any;emit?:any;events?:Record<string,any>|null}) {
        super(identity, createInputAclStep());
        this._MENU_OPEN.subscribe((isOpen:boolean)=>this.onFloatMenuVisibilityChanged(isOpen), this.getScope());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        if (this._DEBOUNCE) clearTimeout(this._DEBOUNCE);
        this._CONTROLLER?.abort();
        this._SOURCE_UNSUBSCRIBE?.();
        this._CHILDREN.forEach(child => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this._SELECTED_SCROLLER = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrs:PartAttrDefault, _data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        return CoreReactive.App.section({attrs:{...attrs},className:["d-block","w-100"],children:[
            this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part,{}),
            this.executeSchemaPart(Schemas.MAIN.part,{}),
            this.executeSchemaPart(Schemas.VALIDATE.part,{}),
        ]});
    }

    override renderManagerComponent(partName:string, attrs:PartAttrDefault, data:Record<string,CoreObservable.App<any>>, extra?:any):CoreReactive.App {
        switch(partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this,attrs,data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this,attrs,data);
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(attrs,data);
            case Schemas.MAIN.part: return this.renderMain(attrs,data);
            case Schemas.MENU.part: return this.renderMenu(attrs,data);
            case Schemas.SEARCH.part: return this.renderSearch(attrs,data);
            case Schemas.AVAILABLE_LIST.part: return this.renderAvailable(attrs,data);
            case Schemas.SELECTED_LIST.part: return this.renderSelected(attrs,data);
            case Schemas.VALIDATE.part: return this.renderValidate(attrs,data);
            default: return super.renderManagerComponent(partName,attrs,data,extra);
        }
    }

    private renderLabel(_attrs:PartAttrDefault,data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        const bind=this._COMPONENT_PROPS_BIND;
        const label=data?.prop_labelTitle??bind.prop_labelTitle;
        const tooltip=data?.prop_labelTooltipDescription??bind.prop_labelTooltipDescription;
        const show=data?.prop_labelShow??bind.prop_labelShow;
        return CoreObservable.App.conditionWhen([show,label,tooltip],(visible,title,description)=>!!visible&&((title!=null&&title!=="")||(description!=null&&description!=="")),()=>{
            const props:any={};
            for(const key of Object.keys(ComponentLabelTrait.props)) props[key]=data?.[key]??bind[key];
            props.classList=["d-block"];
            props.styles={marginBlockEnd:UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get())};
        const child=ComponentLabelTrait.createLabel(props,{CLICK:()=>{
            this._FLOAT_MENU?.setShow(true);
            requestAnimationFrame(()=>((this._SEARCH_INPUT?.getElement() as HTMLElement | undefined)?.querySelector("input") as HTMLInputElement | null)?.focus());
        }} as any);
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        },()=>null,this.getScope()) as any;
    }

    private renderMain(attrs:PartAttrDefault,data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        this.connectValue(data?.prop_value??this._COMPONENT_PROPS_BIND.prop_value);
        const name=data?.prop_name??this._COMPONENT_PROPS_BIND.prop_name;
        const hidden=CoreReactive.App.input({attrs:{type:"hidden",name:name.get()},attrsBind:{value:this._COMMITTED.map((items:AclItem[])=>JSON.stringify(items),this.getScope()) as any}});
        return CoreReactive.App.section({attrs:{...attrs},className:["d-block","w-100"],children:[this.executeSchemaPart(Schemas.MENU.part,{}),hidden]});
    }

    private renderMenu(attrs:PartAttrDefault,data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        const bind=this._COMPONENT_PROPS_BIND;
        const disabled=data?.prop_isDisable??bind.prop_isDisable;
        const sizeName=CoreConfig.Settings.SizeName.observable();
        const controlSize=CoreObservable.App.computed((size:any)=>UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(size) as any,UtilConst.Operation.ADD,UtilStyle.Css_Height(size) as any,UtilConst.Operation.ADD,UtilStyle.Css_Padding(size) as any),[sizeName],this.getScope());
        const iconSource=(data?.prop_icon??bind.prop_icon).get()??UiIcons.Src.FileSearch.Definition;
        const icon=new ComponentIcon.Component({
            prop_icon:UiIcons.CreateIcon(iconSource,{size:sizeName} as any),
            prop_iconClass:["d-block"],
            prop_iconStyles:CoreObservable.App.computed((box:string)=>({cursor:"pointer",margin:"auto",width:box,height:box,lineHeight:box}),[controlSize],this.getScope()) as any,
            styles:CoreObservable.App.computed((box:string)=>({width:box,height:box,flex:"0 0 auto",textAlign:"center"}),[controlSize],this.getScope()) as any,
            prop_structureStyles:{height:"100%"},
        } as any,{CLICK:()=>this._FLOAT_MENU?.setShow(true)} as any);
        const displayValue=CoreObservable.App.computed((items:AclItem[])=>items.map(item=>item.name).join(", "),[this._STAGED],this.getScope());
        const rtl=CoreConfig.Settings.DirectionRtl.observable();
        const headerBgForInput=data?.prop_backgroundColorHeaderList??bind.prop_backgroundColorHeaderList;
        const headerInputStyles=CoreObservable.App.computed((background:string|null)=>({
            backgroundColor:background??UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,UtilConst.ColorGrad.GRADE_1),
            color:UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY,UtilConst.ColorGrad.GRADE_1),
            opacity:"1",
        }),[headerBgForInput],this.getScope());
        const headerInput=new ComponentInputSimple.Component({
            prop_inputValue:displayValue as any,
            prop_inputDisable:true,
            prop_inputClass:["form-control"],
            prop_inputStyles:headerInputStyles as any,
            styles:{flex:"1 1 auto",minWidth:"0"},
            prop_structureStyles:{width:"100%",minWidth:"0"},
            prop_inputBorderTopLeftRadiusHas:rtl as any,
            prop_inputBorderBottomLeftRadiusHas:rtl as any,
            prop_inputBorderTopRightRadiusHas:rtl.map((isRtl:boolean)=>!isRtl,this.getScope()) as any,
            prop_inputBorderBottomRightRadiusHas:rtl.map((isRtl:boolean)=>!isRtl,this.getScope()) as any,
        } as any);
        const headerBackground=data?.prop_backgroundColorHeaderList??bind.prop_backgroundColorHeaderList;
        const headerStyles=CoreObservable.App.computed((background:string|null,size:any)=>({
            display:"flex",flexDirection:"row",alignItems:"stretch",
            backgroundColor:background??UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,UtilConst.ColorGrad.GRADE_1),
            borderRadius:UtilStyle.Css_BorderRadius(size),
        }),[headerBackground,sizeName],this.getScope());
        const header=CoreReactive.App.section({
            className:["w-100"],
            attrsBind:{"aria-disabled":disabled.map((value:boolean)=>value?"true":"false",this.getScope()) as any},
            stylesBind:headerStyles as any,
            children:[icon.getReactiveElement(),headerInput.getReactiveElement()],
        });
        this._FLOAT_MENU=new ComponentFloatMenu.Component({
            classList:["position-relative","d-block","w-100"],
            prop_selectorContent:header,
            prop_selectorClass:["d-block","w-100"],
            prop_selectorShowType:ComponentFloatMenu.ShowTypes.CLICK,
            prop_floatContent:this.executeSchemaPart(Schemas.SEARCH.part,{}),
            prop_floatDirectionType:ComponentFloatMenu.DirectionTypes.BOTTOM,
            prop_floatArrowWidth:0,
            prop_floatDistance:Number(data?.prop_bodyTop?.get?.()??bind.prop_bodyTop.get()),
            prop_floatWidth:"min(420px, 90vw)",
            prop_floatMinWidth:"min(350px, 90vw)",
            prop_floatBackground:(data?.prop_backgroundColorBodyHeader??bind.prop_backgroundColorBodyHeader).get()??UtilStyle.Css_Color(UtilConst.ColorMain.SHAN,UtilConst.ColorGrad.GRADE_1),
            prop_floatBorderColor:data?.prop_borderColorSelector??bind.prop_borderColorSelector,
            prop_floatShowControlWithSelf:true,
            prop_floatIsShow:this._MENU_OPEN,
        } as any);
        this._CHILDREN.push(icon as any,headerInput as any,this._FLOAT_MENU as any);
        return CoreReactive.App.part("section",{attrs:{...attrs},className:["position-relative","w-100"],stylesBind:{opacity:disabled.map((value:boolean)=>value?"0.6":"1",this.getScope()) as any},children:[this._FLOAT_MENU.getReactiveElement()]});
    }

    private renderSearch(attrs:PartAttrDefault,_data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        const search=new ComponentInputSimple.Component({
            prop_inputValue:this._SEARCH,
            prop_inputPlaceholder:CoreLanguage.App.translate(Keys.category.components.inputAcl.texts.search).get(),
            prop_inputDisable:this._COMPONENT_PROPS_BIND.prop_isDisable as any,
            prop_inputClass:["form-control"],
            prop_inputType:ComponentInputSimple.InputSimpleTypes.SEARCH,
            prop_structureStyles:{width:"100%",minWidth:"0"},
        } as any,{
            INPUT_CHANGE:(_event:Event,_dataArgs:any,componentArgs:any)=>this.onSearch(componentArgs?.VALUE??""),
            INPUT_FOCUS:()=>this._FLOAT_MENU?.setShow(true),
        } as any);
        this._SEARCH_INPUT=search;
        this._CHILDREN.push(search as any);
        const footer=CoreReactive.App.section({className:["d-flex","justify-content-end","gap-2","p-2"],styles:{backgroundColor:this._COMPONENT_PROPS_BIND.prop_backgroundColorBodyFoter.get()??""},children:[
            CoreReactive.App.button({attrs:{type:"button"},styles:{color:this._COMPONENT_PROPS_BIND.prop_btnColor.get()??""},on:{click:(event:Event)=>{event.preventDefault();event.stopPropagation();this.cancel(event);}},children:[CoreLanguage.App.translate(Keys.category.components.inputAcl.texts.cancel)]}),
            CoreReactive.App.button({attrs:{type:"button"},styles:{color:this._COMPONENT_PROPS_BIND.prop_btnColor.get()??""},on:{click:(event:Event)=>{event.preventDefault();event.stopPropagation();this.accept(event);}},children:[CoreLanguage.App.translate(Keys.category.components.inputAcl.texts.accept)]}),
        ]});
        return CoreReactive.App.section({attrs:{...attrs},className:["d-flex","flex-column","gap-2","p-2"],styles:{maxHeight:`${Number(this._COMPONENT_PROPS_BIND.prop_bodyHeight.get())||300}px`,overflowY:"auto"},children:[
            search.getReactiveElement(),
            CoreReactive.App.section({className:["d-flex","justify-content-between","gap-2"],children:[
                CoreReactive.App.button({attrs:{type:"button"},on:{click:(event:Event)=>{event.preventDefault();this._STAGED.set([...this._STAGED.get(),...this._AVAILABLE.get().filter(item=>!this.has(this._STAGED.get(),item.id))]);}},children:[CoreLanguage.App.translate(Keys.category.components.inputAcl.texts.selectAll)]}),
                CoreReactive.App.button({attrs:{type:"button"},on:{click:(event:Event)=>{event.preventDefault();this._STAGED.set([]);}},children:[CoreLanguage.App.translate(Keys.category.components.inputAcl.texts.clearAll)]}),
            ]}),
            this.executeSchemaPart(Schemas.AVAILABLE_LIST.part,{}),
            this.executeSchemaPart(Schemas.SELECTED_LIST.part,{}),
            CoreObservable.App.conditionWhen([this._ERROR],(error)=>!!error,()=>CoreReactive.App.div({styles:{color:UtilStyle.Css_Color(UtilConst.ColorMain.ERROR,UtilConst.ColorGrad.GRADE_1)},children:[this._ERROR]}),()=>null,this.getScope()),
            footer,
        ]});
    }

    private renderAvailable(attrs:PartAttrDefault,_data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        return CoreReactive.App.section({attrs:{...attrs},className:["overflow-auto","w-100"],styles:{maxHeight:"220px"},on:{scroll:(event:Event)=>{const el=event.currentTarget as HTMLElement;if(el.scrollTop+el.clientHeight+50>=el.scrollHeight)this.fetchPage(false);}},children:CoreObservable.App.computed((items:AclItem[],selected:AclItem[],loading:boolean)=>[
            ...items.map(item=>{
                const isSelected=this.has(selected,item.id);const bind=this._COMPONENT_PROPS_BIND;
                const color=(isSelected?bind.prop_itemAclColorSelected:bind.prop_itemAclColorUnSelected).get()??UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY,UtilConst.ColorGrad.GRADE_1);
                const background=(isSelected?bind.prop_itemAclBackgroundColorSelected:bind.prop_itemAclBackgroundColorUnSelected).get()??UtilStyle.Css_Color(UtilConst.ColorMain.SHAN,UtilConst.ColorGrad.GRADE_1);
                const border=(isSelected?bind.prop_itemAclBorderColorSelected:bind.prop_itemAclBorderColorUnSelected).get()??UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,UtilConst.ColorGrad.GRADE_1);
                return CoreReactive.App.section({className:["d-flex","align-items-center","p-2","cursor-pointer"],styles:{cursor:"pointer",color,backgroundColor:background,borderBottom:`1px solid ${border}`},on:{click:()=>this.toggle(item),mouseenter:(event:Event)=>{const el=event.currentTarget as HTMLElement;el.style.backgroundColor=(isSelected?bind.prop_itemAclBackgroundColorSelectedHover:bind.prop_itemAclBackgroundColorUnSelectedHover).get()??background;el.style.color=(isSelected?bind.prop_itemAclColorSelectedHover:bind.prop_itemAclColorUnSelectedHover).get()??color;},mouseleave:(event:Event)=>{const el=event.currentTarget as HTMLElement;el.style.backgroundColor=background;el.style.color=color;}},children:[CoreReactive.App.span({styles:{color:(isSelected?bind.prop_itemAclIconColorSelected:bind.prop_itemAclIconColorUnSelected).get()??color},children:[isSelected?"✓":"□"]}),CoreReactive.App.span({className:["ms-2"],children:[item.name]})]});
            }),
            ...(loading?[CoreReactive.App.div({className:["text-center","p-2"],children:[CoreLanguage.App.translate(Keys.category.components.inputAcl.texts.loading)]})]:[]),
        ],[this._AVAILABLE,this._STAGED,this._LOADING],this.getScope())});
    }

    private renderSelected(attrs:PartAttrDefault,_data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        return CoreObservable.App.computed((items:AclItem[])=>{
            const ids=items.map(i=>i.id);
            if(!this._SELECTED_SCROLLER){
                this._SELECTED_SCROLLER=new ComponentListSelectedScroller.Component({prop_list:items.map(i=>({id:i.id,title:i.name,canDelete:true})),prop_value:ids} as any,{
                    DELETE_ITEM:(_event:Event,args:any)=>this._STAGED.set(this._STAGED.get().filter(item=>item.id!==args?.ID)),
                } as any);
                this._CHILDREN.push(this._SELECTED_SCROLLER as any);
            } else {
                this._SELECTED_SCROLLER.set("prop_list",items.map(i=>({id:i.id,title:i.name,canDelete:true})));
                this._SELECTED_SCROLLER.set("prop_value",ids);
            }
            return CoreReactive.App.section({attrs:{...attrs},className:["w-100"],children:[this._SELECTED_SCROLLER.getReactiveElement()]});
        },[this._STAGED],this.getScope()) as any;
    }

    private renderValidate(_attrs:PartAttrDefault,data:Record<string,CoreObservable.App<any>>):CoreReactive.App {
        const bind=this._COMPONENT_PROPS_BIND;
        const enabled=data?.prop_hasRules??bind.prop_hasRules;
        const rules=data?.prop_listRules??bind.prop_listRules;
        return CoreObservable.App.conditionWhen([enabled,rules],(status,list)=>!!status&&Array.isArray(list)&&list.length>0,()=>{
            const validator=new ComponentValidate.Component({prop_listRules:rules as any,prop_msgRules:(data?.prop_msgRules??bind.prop_msgRules) as any,prop_isAbsolute:(data?.prop_isAbsoluteRule??bind.prop_isAbsoluteRule) as any,prop_title:(data?.prop_title??bind.prop_title) as any,prop_value:this._COMMITTED as any} as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        },()=>null,this.getScope()) as any;
    }

    private connectValue(source:any):void {
        if(source===this._SOURCE)return;
        this._SOURCE_UNSUBSCRIBE?.();this._SOURCE=source;
        const current=CoreObservable.App.isObservable(source)?source.get():source;
        const initial=Array.isArray(current)?current.filter(isAclItem):[];
        this._COMMITTED.set(initial.map(item=>({...item})));
        this._STAGED.set(initial.map(item=>({...item})));
        if(CoreObservable.App.isObservable(source))this._SOURCE_UNSUBSCRIBE=source.subscribe((value:any)=>{if(Array.isArray(value)){const items=value.filter(isAclItem).map(item=>({...item}));this._COMMITTED.set(items);if(!this._MENU_OPEN.get())this._STAGED.set(items);}},this.getScope());
    }
    private onFloatMenuVisibilityChanged(isOpen:boolean):void {
        if(this._DISPOSED)return;
        if(isOpen){
            if(this._MENU_SESSION_ACTIVE)return;
            this._MENU_SESSION_ACTIVE=true;
            this._STAGED.set(this._COMMITTED.get().map(item=>({...item})));
            this._AVAILABLE.set([]);this._PAGE=1;this._FINISHED=false;this._ERROR.set(null);
            this._CONTROLLER?.abort();this._REQUEST_ID++;this._LOADING.set(false);
            this.fetchPage(true);
            this.executeMethod("OPEN",new Event("click"),{});
            return;
        }
        // The float menu toggles on selector clicks. Re-open it when the search input
        // itself was clicked; only roll back after the visibility change settles.
        setTimeout(()=>{
            if(this._MENU_OPEN.get()||!this._MENU_SESSION_ACTIVE||this._MENU_COMMITTING)return;
            this._STAGED.set(this._COMMITTED.get().map(item=>({...item})));
            this._MENU_SESSION_ACTIVE=false;
            this.executeMethod("CANCEL",new Event("click"),{});
        },0);
    }
    private accept(event:Event):void {
        const next=this._STAGED.get().map(item=>({...item}));
        this._MENU_COMMITTING=true;this._MENU_SESSION_ACTIVE=false;
        this._COMMITTED.set(next);this.set("prop_value",next);
        if(CoreObservable.App.isObservable(this._SOURCE))this._SOURCE.set(next);else this._SOURCE=next;
        this._FLOAT_MENU?.setShow(false);this._MENU_OPEN.set(false);this._MENU_COMMITTING=false;
        this.executeMethod("CHANGE",event,{VALUE:next});this.executeMethod("ACCEPT",event,{VALUE:next});
    }
    private cancel(event:Event):void {
        this._MENU_COMMITTING=true;this._MENU_SESSION_ACTIVE=false;
        this._STAGED.set(this._COMMITTED.get().map(item=>({...item})));
        this._FLOAT_MENU?.setShow(false);this._MENU_OPEN.set(false);this._MENU_COMMITTING=false;
        this.executeMethod("CANCEL",event,{});
    }
    private clear(event:Event):void {if(this._COMPONENT_PROPS_BIND.prop_isDisable.get())return;this._COMMITTED.set([]);this._STAGED.set([]);this.set("prop_value",[]);if(CoreObservable.App.isObservable(this._SOURCE))this._SOURCE.set([]);else this._SOURCE=[];this.executeMethod("CLEAR",event,{});this.executeMethod("CHANGE",event,{VALUE:[]});}
    private readCommitted():AclItem[]{return this._COMMITTED.get();}
    private toggle(item:AclItem):void {const items=this._STAGED.get();this._STAGED.set(this.has(items,item.id)?items.filter(value=>value.id!==item.id):[...items,{...item}]);}
    private has(items:AclItem[],id:string|number):boolean{return items.some(item=>item.id===id);}
    private onSearch(value:string):void {this._SEARCH.set(value||null);this._CONTROLLER?.abort();this._REQUEST_ID++;this._LOADING.set(false);if(this._DEBOUNCE)clearTimeout(this._DEBOUNCE);this._DEBOUNCE=setTimeout(()=>{this._PAGE=1;this._FINISHED=false;this._AVAILABLE.set([]);this.fetchPage(true);},Math.max(0,Number(this._COMPONENT_PROPS_BIND.prop_requestTimout.get())||400));}
    private async fetchPage(reset:boolean):Promise<void> {
        const url=this._COMPONENT_PROPS_BIND.prop_requestUrl.get();
        if(!url||this._LOADING.get()||this._FINISHED||this._DISPOSED)return;
        this._CONTROLLER?.abort();const controller=new AbortController();this._CONTROLLER=controller;
        const requestId=++this._REQUEST_ID;this._LOADING.set(true);this._ERROR.set(null);
        try {
            // Legacy sends JSON fields count/search/page via its submit helper; preserve those field names.
            const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({count:this._COMPONENT_PROPS_BIND.prop_requestCount.get(),search:this._SEARCH.get()??"",page:this._PAGE}),signal:controller.signal});
            if(!response.ok)throw new Error(`Request failed (${response.status})`);
            const payload=await response.json();
            if(requestId!==this._REQUEST_ID||this._DISPOSED)return;
            if(!Array.isArray(payload))throw new Error("Expected an array response containing {id, name} items");
            const items=payload.filter(isAclItem);
            const merged=reset?[]:[...this._AVAILABLE.get()];const seen=new Set(merged.map(item=>item.id));
            for(const item of items)if(!seen.has(item.id)){seen.add(item.id);merged.push({id:item.id,name:item.name});}
            this._AVAILABLE.set(merged);this._FINISHED=items.length===0; if(items.length>0)this._PAGE++;
        } catch(error:any) {if(error?.name!=="AbortError"&&requestId===this._REQUEST_ID)this._ERROR.set(error?.message??"Request failed");}
        finally {if(requestId===this._REQUEST_ID)this._LOADING.set(false);}
    }
}

function isAclItem(value:any):value is AclItem{return value!=null&&(typeof value.id==="string"||typeof value.id==="number")&&typeof value.name==="string";}
