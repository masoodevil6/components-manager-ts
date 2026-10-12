import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentCardViewBase} from "./ComponentCardViewBase";
import {PropsType, PropsConfigType} from "./Props";
import {MethodsConfigType} from "./Methods";
import {Schemas} from "./Schemas";
import {createCardViewClicableStep} from "./Step";
import * as ComponentBorder from "../componentBorder";
import * as ComponentElementPosition from "../componentElementPosition";
import * as ComponentButton from "../componentButton";

export class ComponentCardViewClicable extends ComponentCardViewBase {
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _ACTION_POSITION: InstanceType<typeof ComponentElementPosition.Component> | null = null;
    private _ACTION_BUTTON: InstanceType<typeof ComponentButton.Component> | null = null;
    private readonly _HOVERED = new CoreObservable.App(false);

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentCardViewClicable>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(createCardViewClicableStep(), identity);
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this._BORDER?.dispose();
        this._BORDER = null;
        this._ACTION_POSITION?.dispose();
        this._ACTION_POSITION = null;
        this._ACTION_BUTTON?.dispose();
        this._ACTION_BUTTON = null;
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
            this._ACTION_POSITION?.dispose();
            this._ACTION_BUTTON?.dispose();
            const content = data.prop_content ?? this._COMPONENT_PROPS_BIND.prop_content;
            const bodyBackground = CoreObservable.App.computed(
                (hovered: boolean) => hovered
                    ? UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_5)
                    : UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                [this._HOVERED],
                this.getScope(),
            );
            const isRtl = CoreConfig.Settings.DirectionRtl.observable();
            const sizeName = CoreConfig.Settings.SizeName.observable();
            const margin = CoreObservable.App.computed((size: any) => UtilStyle.Css_Margin(size), [sizeName], this.getScope());
            const left = CoreObservable.App.computed((rtl: boolean, sideMargin: any) => rtl ? sideMargin : null, [isRtl, margin], this.getScope());
            const right = CoreObservable.App.computed((rtl: boolean, sideMargin: any) => rtl ? null : sideMargin, [isRtl, margin], this.getScope());
            this._ACTION_BUTTON = new ComponentButton.Component({prop_btnTitle: "View"});
            this._ACTION_POSITION = new ComponentElementPosition.Component({
                prop_positionWidth: "auto",
                prop_positionBottom: margin,
                prop_positionLeft: left,
                prop_positionRight: right,
                prop_positionStyles: {width: "auto"},
                prop_content: this._ACTION_BUTTON.getReactiveElement(),
            } as any);
            const cardContent = CoreReactive.App.section({
                attrs: {role: "button", tabindex: "0"},
                className: ["card", "h-100"],
                styles: {cursor: "pointer", transition: "transform 180ms ease, box-shadow 180ms ease"},
                on: {
                    mouseenter: (event: Event) => {
                        this._HOVERED.set(true);
                        const card = event.currentTarget as HTMLElement;
                        card.style.transform = "translateY(-3px)";
                        card.style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.16)";
                    },
                    mouseleave: (event: Event) => {
                        this._HOVERED.set(false);
                        const card = event.currentTarget as HTMLElement;
                        card.style.transform = "";
                        card.style.boxShadow = "";
                    },
                    keydown: (event: KeyboardEvent) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            this.executeMethod("CLICK", event, {});
                        }
                    },
                },
                children: [
                    this.executeSchemaPart(Schemas.CARD_TITLE.part, {}),
                    CoreReactive.App.section({
                        className: ["card-body", "pt-2"],
                        styles: {
                            position: "relative",
                            paddingBottom: "calc(var(--paddingMedium) + var(--heightMedium) + var(--paddingMedium))",
                            transition: "background-color 180ms ease",
                        },
                        stylesBind: {backgroundColor: bodyBackground},
                        children: [
                            CoreReactive.App.section({className: ["card-text", "mb-0"], children: [content]}),
                            this._ACTION_POSITION.getElement(),
                        ],
                    }),
                ],
            });
            this._BORDER = new ComponentBorder.Component({
                prop_content: cardContent,
                prop_width: "100%",
                prop_borderClass: ["card", "h-100", "overflow-hidden", "shadow-sm"],
                prop_borderStyles: {padding: "0", cursor: "pointer", transition: "transform 180ms ease, box-shadow 180ms ease"},
            }, {
                CLICK_BORDER: (event: Event) => this.executeMethod("CLICK", event, {}),
            });
            return CoreReactive.App.section({
                attrs: {...attrsDefault},
                className: ["w-100", "h-100"],
                children: [this._BORDER.getReactiveElement() as CoreReactive.App],
            });
        }
        if (partName === Schemas.CARD_TITLE.part) {
            const title = data.prop_title ?? this._COMPONENT_PROPS_BIND.prop_title;
            const imageSrc = data.prop_imageSrc ?? this._COMPONENT_PROPS_BIND.prop_imageSrc;
            const headerBackground = `linear-gradient(135deg, ${UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)}, ${UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1)})`;
            return CoreReactive.App.section({
                attrs: {...attrsDefault},
                className: ["w-100", "position-relative", "d-flex", "align-items-end", "overflow-hidden"],
                styles: {background: headerBackground},
                children: [
                    CoreObservable.App.conditionWhen(
                        [imageSrc],
                        (src: string) => !!src?.trim(),
                        () => CoreReactive.App.img({
                            attrsBind: {src: imageSrc, alt: title},
                            attrs: {loading: "lazy"},
                            className: ["position-absolute", "w-100", "h-100"],
                            styles: {inset: "0", objectFit: "cover"},
                        }),
                        () => null,
                        this.getScope(),
                    ) as any,
                    CoreObservable.App.conditionWhen(
                        [title],
                        (value: string) => !!value?.trim(),
                        () => CoreReactive.App.section({
                            className: ["position-relative", "w-100", "p-2"],
                            styles: {zIndex: "1"},
                            children: [CoreReactive.App.b({
                                className: ["d-block"],
                                styles: {color: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1)},
                                children: [title],
                            })],
                        }),
                        () => null,
                        this.getScope(),
                    ) as any,
                ],
            });
        }
        return super.renderManagerComponent(partName, attrsDefault, data, extra);
    }
}
