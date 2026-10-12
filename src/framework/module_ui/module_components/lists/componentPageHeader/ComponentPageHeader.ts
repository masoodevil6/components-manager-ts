import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBreadcrumbShadow from "../componentBreadcrumbShadow";
import * as ComponentMenuMore from "../componentMenuMore";
import {ComponentPageHeaderBase} from "./ComponentPageHeaderBase";
import {Props, type PropsConfigType, type PropsType} from "./Props";
import {Schemas} from "./Schemas";
import {Methods, type MethodsConfigType} from "./Methods";
import {createPageHeaderStep} from "./Step";

type Child = {dispose?: () => void; disposeStep?: () => void};

export class ComponentPageHeader extends ComponentPageHeaderBase {
    private _CHILDREN: Child[] = [];
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentPageHeader>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createPageHeaderStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN = [];
        this.disposeStep();
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, children: [this.executeSchemaPart(Schemas.ROOT.part, {})]});
    }

    override renderManagerComponent(partName: string, attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrs, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrs, data);
            case Schemas.ROOT.part: return this.renderRoot(attrs);
            case Schemas.FORM.part: return this.renderForm(attrs, data);
            case Schemas.MAIN.part: return this.renderMain(attrs);
            case Schemas.OPTIONS.part: return this.renderOptions(attrs);
            default: return super.renderManagerComponent(partName, attrs, data, extra);
        }
    }

    private renderRoot(attrs: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrs},
            styles: {display: "block", width: "100%", minWidth: "0"},
            children: [this.executeSchemaPart(Schemas.FORM.part, {})],
        });
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const formClasses = data?.prop_formClass ?? bind.prop_formClass;
        const customStyles = data?.prop_formStyles ?? bind.prop_formStyles;
        const background = data?.prop_backgroundForm ?? bind.prop_backgroundForm;
        const styles = CoreObservable.App.computed((extra: Record<string, any>, backgroundColor: string) => ({
            display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%", minWidth: "0", height: "auto",
            backgroundColor, ...(extra ?? {}),
        }), [customStyles, background], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs},
            className: formClasses as any,
            stylesBind: styles as any,
            children: [this.executeSchemaPart(Schemas.MAIN.part, {}), this.executeSchemaPart(Schemas.OPTIONS.part, {})],
        });
    }

    private renderMain(attrs: PartAttrDefault): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const childProps: Record<string, any> = {
            prop_size: bind.prop_size,
            prop_pageTitle: bind.prop_pageTitle,
            prop_pageNav: bind.prop_pageNav,
            prop_colorNav: bind.prop_colorNav,
            prop_backgroundColorNav: bind.prop_backgroundColorNav,
            prop_colorHeader: bind.prop_colorHeader,
            prop_hasBtnBack: CoreObservable.App.computed((value: boolean | null, fallback: boolean) => value ?? fallback, [bind.prop_hasBtnBack, bind.prop_hasIconBack], this.getScope()),
            prop_hasDivider: CoreObservable.App.computed((value: boolean | null, fallback: boolean) => value ?? fallback, [bind.prop_hasDivider, bind.prop_hasIconBack], this.getScope()),
            prop_widthTitle: CoreObservable.App.computed((value: string | null) => value ?? "60%", [bind.prop_widthTitle], this.getScope()),
            prop_hideNavigationBelow: CoreObservable.App.computed((value: number | null) => value ?? 768, [bind.prop_hideNavigationBelow], this.getScope()),
            prop_backgroundColorRoot: CoreObservable.App.computed((value: string | null, fallback: string) => value ?? fallback, [bind.prop_backgroundColorRoot, bind.prop_backgroundForm], this.getScope()),
            prop_backIconPrimaryColor: CoreObservable.App.computed((value: string | null, fallback: string) => value ?? fallback, [bind.prop_backIconPrimaryColor, bind.prop_colorIcon_primary], this.getScope()),
            prop_backIconSecondaryColor: CoreObservable.App.computed((value: string | null, fallback: string) => value ?? fallback, [bind.prop_backIconSecondaryColor, bind.prop_colorIcon_secondary], this.getScope()),
        };
        const breadcrumb = new ComponentBreadcrumbShadow.Component(childProps as any, {
            BACK: (event) => this.executeMethod("BACK", event, {}),
            SELECT_ITEM: (event, args) => this.executeMethod("SELECT_NAV_ITEM", event, {NAME: args.NAME, ITEM: args.ITEM}),
        } as any);
        this._CHILDREN.push(breadcrumb as any);
        return CoreReactive.App.section({
            attrs: {...attrs},
            styles: {flex: "1 1 auto", width: "100%", minWidth: "0"},
            children: [breadcrumb.getReactiveElement() as unknown as CoreReactive.App],
        });
    }

    private renderOptions(attrs: PartAttrDefault): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const menuItems = CoreObservable.App.computed(
            (override: ComponentMenuMore.MenuMoreEntry[] | null, legacy: ComponentMenuMore.MenuMoreEntry[]) => override ?? legacy ?? [],
            [bind.prop_menuItems, bind.prop_optionsList],
            this.getScope(),
        );
        const menuBackground = CoreObservable.App.computed((value: string | null, fallback: string) => value ?? fallback, [bind.prop_menuBackgroundColor, bind.prop_backgroundForm], this.getScope());
        const menuIconColor = CoreObservable.App.computed((value: string | null, fallback: string) => value ?? fallback, [bind.prop_menuIconColor, bind.prop_colorIcon_primary], this.getScope());
        const menuIconSecondaryColor = CoreObservable.App.computed((value: string | null, fallback: string) => value ?? fallback, [bind.prop_menuIconSecondaryColor, bind.prop_colorIcon_secondary], this.getScope());
        const hoverBackground = CoreObservable.App.computed(
            (value: string | null) => value ?? UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
            [bind.prop_menuItemBackgroundColorHover], this.getScope(),
        );
        const menuStructureStyles = CoreObservable.App.computed(
            (sizeName: any) => ({padding: UtilStyle.Css_Padding(sizeName)}),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const menu = new ComponentMenuMore.Component({
            prop_orientation: bind.prop_menuOrientation,
            prop_direction: bind.prop_menuDirection,
            prop_items: menuItems,
            prop_structureStyles: menuStructureStyles,
            prop_menuBackgroundColor: menuBackground,
            prop_itemBackgroundColorHover: hoverBackground,
            prop_menuIconColor: menuIconColor,
            prop_menuIconSecondaryColor: menuIconSecondaryColor,
            prop_menuBorderRadius: bind.prop_menuBorderRadius,
            prop_menuBorderWidth: bind.prop_menuBorderWidth,
            prop_menuBorder: bind.prop_menuBorder,
            styles: {width: "fit-content", maxWidth: "100%"},
        } as any, {
            SELECT_ITEM: (event, args) => {
                const item = args.ITEM;
                this.executeMethod("SELECT_OPTION", event, {NAME: item.action ?? item.id, ITEM: item});
            },
        } as any);
        this._CHILDREN.push(menu as any);
        return CoreReactive.App.section({
            attrs: {...attrs},
            styles: {display: "flex", flex: "0 0 auto", alignItems: "stretch", width: "fit-content", maxWidth: "100%"},
            children: [menu.getReactiveElement() as unknown as CoreReactive.App],
        });
    }
}
