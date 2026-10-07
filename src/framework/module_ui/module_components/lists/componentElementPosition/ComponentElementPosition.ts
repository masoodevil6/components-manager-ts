import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import {PartAttrDefault} from "@/core_components";
import type {ClStyleValue} from "@/util_styles";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType, PropsConfigType} from "./Props";
import type {MethodsConfigType} from "./Methods";
import {Schemas} from "./Schemas";
import {ElementPositionTypes} from "./Props";
import {createElementPositionStep} from "./Step";
import {ComponentElementPositionBase} from "./ComponentElementPositionBase";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";

export class ComponentElementPosition extends ComponentElementPositionBase {
    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentElementPosition>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super("element-position", identity, createElementPositionStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this.disposeStep();
        this.getScope().dispose();
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.POSITION.part, {});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.POSITION.part:
                return this.renderPosition(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderPosition(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = (name: keyof PropsType) => data?.[name as string] ?? bind[name as keyof typeof bind];
        const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
        const left = CoreObservable.App.computed((physicalLeft, logicalStart, logicalEnd, isRtl) => physicalLeft ?? (isRtl ? logicalEnd : logicalStart) ?? null,
            [value("prop_positionLeft"), value("prop_positionStart"), value("prop_positionEnd"), directionRtl], this.getScope());
        const right = CoreObservable.App.computed((physicalRight, logicalStart, logicalEnd, isRtl) => physicalRight ?? (isRtl ? logicalStart : logicalEnd) ?? null,
            [value("prop_positionRight"), value("prop_positionStart"), value("prop_positionEnd"), directionRtl], this.getScope());
        const position = CoreObservable.App.computed((type) => type === ElementPositionTypes.FIX ? "fixed" : type,
            [value("prop_positionType")], this.getScope());
        const customStylesValue = value("prop_positionStyles");
        const customStyles = CoreObservable.App.isObservable(customStylesValue) ? customStylesValue.get() : customStylesValue;
        const styles: Record<string, CoreObservable.App<any> | ClStyleValue | any> = {
            width: value("prop_positionWidth"),
            height: value("prop_positionHeight"),
            position,
            top: value("prop_positionTop"),
            bottom: value("prop_positionBottom"),
            left,
            right,
            transform: value("prop_positionTranslate"),
            zIndex: value("prop_positionZIndex"),
            backgroundColor: value("prop_positionBackgroundColor"),
        };
        for (const [key, styleValue] of Object.entries(customStyles ?? {})) {
            styles[key] = CoreObservable.App.isObservable(styleValue) ? styleValue : new CoreObservable.App(styleValue);
        }

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            classBind: [value("prop_positionClass")],
            stylesBind: styles,
            children: [value("prop_content")],
            on: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("CLICK", event, {});
                },
            },
        });
    }
}
