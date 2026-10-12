import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentButton from "../componentButton";
import {ButtonAction, ButtonSemantic, ButtonVariants} from "../componentButton/Props";
import * as ComponentIcon from "../componentIcon";
import {ComponentPageCardInfoBase} from "./ComponentPageCardInfoBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createPageCardInfoStep} from "./Step";

type DisposableChild = {dispose?: () => void; disposeStep?: () => void};

export class ComponentPageCardInfo extends ComponentPageCardInfoBase {
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private readonly _CHILDREN: DisposableChild[] = [];
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentPageCardInfo>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createPageCardInfoStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.disposeChildren();
        this._BORDER = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(_attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.ROOT.part:
                return this.renderRoot(attrsDefault, data);
            case Schemas.LAYOUT.part:
                return this.renderLayout(attrsDefault);
            case Schemas.ICON.part:
                return this.renderIcon(attrsDefault, data);
            case Schemas.DESCRIPTION.part:
                return this.renderDescription(attrsDefault, data);
            case Schemas.BUTTON.part:
                return this.renderButton(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        this.disposeChildren();
        this._BORDER = null;

        const bind = this._COMPONENT_PROPS_BIND;
        const formClasses = CoreObservable.App.computed(
            (base: string[], extra: string[]) => [...(base ?? []), ...(extra ?? [])],
            [bind.prop_structureClass, data?.prop_formClass ?? bind.prop_formClass],
            this.getScope(),
        );
        const formStyles = CoreObservable.App.computed(
            (base: Record<string, any>, custom: Record<string, any>, sizeName: any) => ({
                backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                paddingInline: UtilStyle.Css_Padding(sizeName),
                paddingBlock: UtilStyle.Css_Padding(sizeName),
                marginInline: UtilStyle.Css_Margin(sizeName),
                marginBlockStart: UtilStyle.Css_Margin(sizeName),
                ...(base ?? {}),
                ...(custom ?? {}),
            }),
            [bind.prop_structureStyles, data?.prop_formStyles ?? bind.prop_formStyles, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        this._BORDER = new ComponentBorder.Component({
            prop_content: this.executeSchemaPart(Schemas.LAYOUT.part, {}),
            prop_structureClass: formClasses as any,
            prop_structureStyles: formStyles as any,
            styles: {width: "100%"},
        } as any);
        this._CHILDREN.push(this._BORDER as any);

        return CoreReactive.App.section({
            attrs: {...attrs},
            className: ["w-100"],
            children: [this._BORDER.getReactiveElement() as CoreReactive.App],
        });
    }

    private renderLayout(attrs: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrs},
            className: ["row", "align-items-center"],
            styles: {minWidth: "0"},
            children: [
                CoreReactive.App.section({
                    className: ["col-md-3", "col-12"],
                    styles: {display: "flex", alignItems: "center", justifyContent: "center", minWidth: "0"},
                    children: [this.executeSchemaPart(Schemas.ICON.part, {})],
                }),
                CoreReactive.App.section({
                    className: ["col-md-6", "col-12", "py-md-3"],
                    styles: {minWidth: "0"},
                    children: [
                        this.executeSchemaPart(Schemas.DESCRIPTION.part, {}),
                        this.executeSchemaPart(Schemas.BUTTON.part, {}),
                    ],
                }),
            ],
        });
    }

    private renderIcon(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const definition = data?.prop_icon ?? bind.prop_icon;
        const color = data?.prop_iconColor ?? bind.prop_iconColor;
        const size = data?.prop_iconSize ?? bind.prop_iconSize;

        return CoreObservable.App.conditionWhen(
            [definition],
            (value) => value != null,
            () => {
                const boxSize = CoreObservable.App.computed((value: number) => `${value}px`, [size], this.getScope());
                const child = new ComponentIcon.Component({
                    prop_icon: UiIcons.CreateIcon(definition as any, {size: size as any, primaryColor: color as any}),
                    styles: CoreObservable.App.computed((box: string) => ({width: box, height: box, flex: "0 0 auto", textAlign: "center"}), [boxSize], this.getScope()) as any,
                    prop_structureStyles: {height: "100%"},
                    prop_iconClass: ["d-block"],
                    prop_iconStyles: CoreObservable.App.computed((box: string, iconColor: string) => ({margin: "auto", width: box, height: box, color: iconColor}), [boxSize, color], this.getScope()) as any,
                } as any);
                this._CHILDREN.push(child as any);
                return CoreReactive.App.section({
                    attrs: {...attrs},
                    children: [child.getReactiveElement() as CoreReactive.App],
                });
            },
            () => null,
            this.getScope(),
        ) as any;
    }

    private renderDescription(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const description = data?.prop_description ?? this._COMPONENT_PROPS_BIND.prop_description;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const styles = CoreObservable.App.computed((size: any) => ({
            fontSize: UtilStyle.Css_FontSize(size),
            lineHeight: UtilStyle.Css_Height(size),
            marginBlockStart: UtilStyle.Css_Margin(size),
            textAlign: "center",
        }), [sizeName], this.getScope());
        return CoreObservable.App.conditionWhen(
            [description],
            (text: string) => !!text?.trim(),
            () => CoreReactive.App.section({
                attrs: {...attrs},
                className: ["d-block"],
                stylesBind: styles as any,
                children: [CoreReactive.App.part("b", {children: [description]})],
            }),
            () => null,
            this.getScope(),
        ) as any;
    }

    private renderButton(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const hasButton = data?.prop_hasBtn ?? bind.prop_hasBtn;
        const title = data?.prop_titleBtn ?? bind.prop_titleBtn;
        const icon = data?.prop_iconBtn ?? bind.prop_iconBtn;
        const iconColor = data?.prop_colorIconBtn ?? bind.prop_colorIconBtn;
        return CoreObservable.App.conditionWhen(
            [hasButton],
            (visible) => !!visible,
            () => {
                const colorizedIcon = CoreObservable.App.computed((definition: UiIcons.IIconDefinition | null, color: string) => {
                    if (!definition) return null;
                    return {
                        ...definition,
                        render: (context: Parameters<UiIcons.IIconDefinition["render"]>[0]) => definition.render({...context, primaryColor: color}),
                    };
                }, [icon, iconColor], this.getScope());
                const sizeName = CoreConfig.Settings.SizeName.observable();
                const titleStyles = CoreObservable.App.computed((size: any) => ({
                    lineHeight: UtilStyle.Css_Height(size),
                    fontSize: UtilStyle.Css_FontSize(size),
                    padding: UtilStyle.Css_Padding(size),
                }), [sizeName], this.getScope());
                const buttonStyles = CoreObservable.App.computed((size: any) => ({
                    width: "min(300px, 100%)",
                    height: UtilStyle.Css_SizeCalc(
                        UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
                        UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
                        UtilStyle.Css_Padding(size) as any,
                    ),
                    marginInline: "auto",
                    marginBlockStart: UtilStyle.Css_Margin(size),
                }), [sizeName], this.getScope());
                const button = new ComponentButton.Component({
                    prop_btnType: ButtonAction.BUTTON,
                    prop_btnSemantic: ButtonSemantic.PRIMARY,
                    prop_btnVariant: ButtonVariants.PRIMARY,
                    prop_btnTitle: title as any,
                    prop_btnIcon: colorizedIcon as any,
                    prop_btnClass: ["d-block", "mx-auto"],
                    prop_btnTitleStyles: titleStyles as any,
                    prop_btnStyles: buttonStyles as any,
                } as any, {
                    CLICK: (event) => {
                        event.stopPropagation();
                        this.executeMethod("CLICK", event, {});
                    },
                } as any);
                this._CHILDREN.push(button as any);
                return CoreReactive.App.section({attrs: {...attrs}, children: [button.getReactiveElement() as CoreReactive.App]});
            },
            () => null,
            this.getScope(),
        ) as any;
    }

    private disposeChildren(): void {
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
    }
}
