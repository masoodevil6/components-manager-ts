import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import type {TStepRef, TEmitHandler} from "@/core_event";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentMouseScroller} from "../componentMouseScroller/ComponentMouseScroller";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {Definition} from "./Definition";
import {Props, PropsType, PropsConfigType} from "./Props";
import {Schemas, SchemasType} from "./Schemas";

export class ComponentWorkflow extends CoreComponents.App<PropsType & Record<string, any>, SchemasType, any, Record<string, never>> {
    protected _COMPONENT_DEFINITION = Definition;
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    });
    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>(Schemas);
    protected _COMPONENT_METHODS = {};
    private _MOUSE_SCROLLER: ComponentMouseScroller | null = null;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: Record<string, never>,
        identity?: {unique?: TStepRef; emit?: TEmitHandler; events?: Record<string, any> | null},
    ) {
        super("workflow", null);
        this.renderComponent({
            ...config,
            styles: {width: "calc(100vw - 100px)", height: "calc(100dvh - 100px)", margin: "auto", ...config?.styles},
            prop_structureStyles: {height: "100%", ...config?.prop_structureStyles},
        } as any, methods, identity?.events ?? null, identity?.unique, identity?.emit);
    }

    dispose(): void {
        this.disposeMouseScroller();
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    private disposeMouseScroller(): void {
        this._MOUSE_SCROLLER?.dispose();
        this._MOUSE_SCROLLER?.getScope().dispose();
        this._MOUSE_SCROLLER = null;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.MOUSE_SCROLLER.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: CoreComponents.PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.MOUSE_SCROLLER.part:
                this.disposeMouseScroller();
                this._MOUSE_SCROLLER = new ComponentMouseScroller({
                    ...data,
                    styles: {height: "100%"},
                    prop_structureStyles: {height: "100%"},
                });
                return CoreReactive.App.section({
                    attrs: {...attrsDefault},
                    styles: {height: "100%"},
                    children: [this._MOUSE_SCROLLER.getElement()],
                });
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }
}
