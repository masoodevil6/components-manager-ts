import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentCardViewBase} from "./ComponentCardViewBase";
import {PropsType, PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {createCardViewStep} from "./Step";
import * as ComponentBorder from "../componentBorder";

export class ComponentCardViewInfo extends ComponentCardViewBase {
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        _methods?: Record<string, never>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(createCardViewStep(), identity);
        this.renderComponent(config as any, _methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this._BORDER?.dispose();
        this._BORDER = null;
        this.disposeStep();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(
        _attrsDefault: PartAttrDefault,
        _data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.CARD.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        if (partName === ComponentStructureTrait.schemas.COMPONENT.part) {
            return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
        }
        if (partName === ComponentStructureTrait.schemas.STRUCTURE.part) {
            return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
        }
        if (partName === Schemas.CARD.part) {
            this._BORDER?.dispose();
            const title = data.prop_title ?? this._COMPONENT_PROPS_BIND.prop_title;
            const content = data.prop_content ?? this._COMPONENT_PROPS_BIND.prop_content;
            const cardContent = CoreReactive.App.section({
                className: ["card", "h-100"],
                // Framework cards clip overflowing descendants by default. Let
                // floating component menus escape the card bounds.
                styles: {overflow: "visible"},
                // Keep the wrapping border from treating clicks inside the info card as its own action.
                // Child controls still receive their click handlers before this bubbling handler runs.
                on: {click: (event: Event) => event.stopPropagation()},
                children: [
                    CoreObservable.App.conditionWhen(
                        [title],
                        (value: string) => !!value?.trim(),
                        () => CoreReactive.App.section({
                            className: ["card-header"],
                            styles: {
                                backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
                                color: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                            },
                            children: [title],
                        }),
                        () => null,
                        this.getScope(),
                    ) as any,
                    CoreReactive.App.section({className: ["card-body"], children: [content]}),
                ],
            });
            this._BORDER = new ComponentBorder.Component({
                prop_content: cardContent,
                prop_width: "100%",
                prop_borderClass: ["card", "h-100", "shadow-sm"],
                prop_borderStyles: {padding: "0", overflow: "visible"},
            });
            return CoreReactive.App.section({
                attrs: {...attrsDefault},
                className: ["w-100", "h-100"],
                children: [this._BORDER.getReactiveElement() as CoreReactive.App],
            });
        }
        return super.renderManagerComponent(partName, attrsDefault, data, extra);
    }
}
