import * as CoreObservable  from "@/core_observable";
import * as CoreReactive    from "@/core_reactive";
import * as CoreEvent       from "@/core_event";
import * as CoreComponents  from "@/core_components";
import * as CoreConfig      from "@/core_configs";
import * as UtilConst        from "@/util_consts";
import * as UtilStyle        from "@/util_styles";
import * as UiIcons          from "@/ui_icons";
// --------------------------------
import {ComponentTabsBase}      from "./ComponentTabsBase";
import {Schemas}                 from "./Schemas";
import {Props, type TabType, type TabsViewType, type PropsType} from "./Props";
import {createTabsStep}         from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PartAttrDefault}        from "@/core_components";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import type {MethodsConfigType}  from "./Methods";
// --------------------------------
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon   from "../componentIcon";


/**
 * ComponentTabs — کامپوننت تب‌ها (Plan 15.1.0 — بازیگیری کامل Behavior Legacy)
 *
 * معماری Composition:
 *   ComponentTabs HAS-A ComponentBorder (برای tab border و body border)
 *   ComponentTabs HAS-A ComponentIcon (برای آیکون هر tab)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (CLICK_TAB, CLICK_BODY)
 *   identity — { unique?, emit?, events? }
 *
 * بازیگیری Behavior از Legacy:
 *   - prop_tabsView: full_width → row + col-md-N / float → float-start
 *   - prop_tabSelected → تغییر رنگ background و color title
 *   - click روی tab border → set prop_tabSelected + executeMethod CLICK_TAB
 *   - click روی body border → executeMethod CLICK_BODY
 *   - body show/hide با mapBoolean(prop_tabSelected == itemTab.id)
 */
export class ComponentTabs extends ComponentTabsBase {

    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentTabs>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createTabsStep();

        super("tabs", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    dispose(): void {
        this.disposeStep();
    }


    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.FORM.part, {});
    }


    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.FORM.part:
                return this.renderForm(attrsDefault, data, extra);
            case Schemas.FORM_TABS.part:
                return this.renderFormTabs(attrsDefault, data, extra);
            case Schemas.FORM_TABS_BORDER.part:
                return this.renderFormTabsBorder(attrsDefault, data, extra);
            case Schemas.FORM_TABS_BORDER_CONTENT.part:
                return this.renderFormTabsBorderContent(attrsDefault, data, extra);
            case Schemas.FORM_TABS_BORDER_CONTENT_ICON.part:
                return this.renderFormTabsBorderContentIcon(attrsDefault, data, extra);
            case Schemas.FORM_TABS_BORDER_CONTENT_TITLE.part:
                return this.renderFormTabsBorderContentTitle(attrsDefault, data, extra);
            case Schemas.FORM_BODYS.part:
                return this.renderFormBodys(attrsDefault, data, extra);
            case Schemas.FORM_BODYS_BORDER.part:
                return this.renderFormBodysBorder(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderForm — ظرف اصلی: FORM_TABS + FORM_BODYS
    --------------------------------------------- */
    protected renderForm(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [
                this.executeSchemaPart(Schemas.FORM_TABS.part, {}),
                this.executeSchemaPart(Schemas.FORM_BODYS.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormTabs — لیست tab headers
       full_width → row + col-md-N (N بر اساس تعداد)
       float → float-start
    --------------------------------------------- */
    protected renderFormTabs(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tabs     = data?.["prop_tabs"]     ?? bind.prop_tabs;
        const prop_tabsView = data?.["prop_tabsView"] ?? bind.prop_tabsView;

        const tabsList = CoreObservable.App.computed(
            (tabs: TabType[]) => tabs ?? [],
            [prop_tabs],
            this.getScope(),
        );

        const containerClass = CoreObservable.App.computed(
            (view: TabsViewType) => {
                switch (view) {
                    case "full_width": return ["row", "m-0", "mb-1"];
                    case "float":      return ["pb-1"];
                    default:           return ["row", "m-0", "mb-1"];
                }
            },
            [prop_tabsView],
            this.getScope(),
        );

        const containerDisplay = CoreObservable.App.computed(
            (view: TabsViewType) => {
                if (view === "float") return "flow-root";
                return null;
            },
            [prop_tabsView],
            this.getScope(),
        );

        const childrenArr = CoreObservable.App.computed(
            (tabs: TabType[]) => {
                if (!tabs || !Array.isArray(tabs)) return [];
                return tabs.map((itemTab, i) => {
                    const tabColClass = CoreObservable.App.computed(
                        (view: TabsViewType) => {
                            switch (view) {
                                case "full_width":
                                    switch (tabs.length) {
                                        case 4: return "col-md-3";
                                        case 3: return "col-md-4";
                                        case 2: return "col-md-6";
                                        case 1: return "col-md-12";
                                        default: return "col-md-3";
                                    }
                                case "float":
                                    return "float-start";
                                default:
                                    return "col-md-12";
                            }
                        },
                        [prop_tabsView],
                        this.getScope(),
                    );

                    return CoreReactive.App.section({
                        styles: { cursor: "pointer" },
                        className: ["p-0"],
                        classBind: [tabColClass],
                        children: [
                            this.executeSchemaPart(
                                Schemas.FORM_TABS_BORDER.part,
                                { itemTab, tabIndex: i, tabLength: tabs.length },
                            ),
                        ],
                    });
                });
            },
            [tabsList],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            className: ["pt-0"],
            classBind: [containerClass],
            stylesBind: CoreObservable.App.computed(
                (display: string | null) => {
                    const s: Record<string, string> = {};
                    if (display) s.display = display;
                    return s;
                },
                [containerDisplay],
                this.getScope(),
            ),
            children: childrenArr as any,
        });
    }


    /* ---------------------------------------------
       renderFormTabsBorder — ComponentBorder برای هر tab
       click → set prop_tabSelected + executeMethod CLICK_TAB
    --------------------------------------------- */
    protected renderFormTabsBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        if (!extra?.hasOwnProperty("itemTab")) {
            return this.renderEmptyContent(attrsDefault);
        }

        const bind = this._COMPONENT_PROPS_BIND;
        const itemTab: TabType = extra.itemTab;
        const tabIndex: number = extra.tabIndex;
        const tabLength: number = extra.tabLength;

        const prop_tabSelected             = data?.["prop_tabSelected"]             ?? bind.prop_tabSelected;
        const prop_borderBackgroundSelected   = data?.["prop_borderBackgroundSelected"]   ?? bind.prop_borderBackgroundSelected;
        const prop_borderBackgroundUnselected = data?.["prop_borderBackgroundUnselected"] ?? bind.prop_borderBackgroundUnselected;
        const prop_borderClass             = data?.["prop_borderClass"]             ?? bind.prop_borderClass;
        const prop_borderStyles            = data?.["prop_borderStyles"]            ?? bind.prop_borderStyles;
        const prop_borderColor              = data?.["prop_borderColor"]              ?? bind.prop_borderColor;
        const prop_borderWidth              = data?.["prop_borderWidth"]              ?? bind.prop_borderWidth;
        const prop_borderRadius             = data?.["prop_borderRadius"]             ?? bind.prop_borderRadius;
        const prop_borderMinWidth           = data?.["prop_borderMinWidth"]           ?? bind.prop_borderMinWidth;

        const classMargin: string[] = [];
        if (tabIndex < tabLength - 1) classMargin.push("me-1");
        if (tabIndex > 0) classMargin.push("ms-1");

        const bgColor = CoreObservable.App.computed(
            (selected: string | number | null, bgSel: string | null, bgUnsel: string | null) => {
                if (selected == itemTab.id) return bgSel;
                return bgUnsel;
            },
            [prop_tabSelected, prop_borderBackgroundSelected, prop_borderBackgroundUnselected],
            this.getScope(),
        );

        const border = new ComponentBorder.Component(
            {
                prop_contentSize: UtilConst.Sizes.S,
                prop_content: this.executeSchemaPart(
                    Schemas.FORM_TABS_BORDER_CONTENT.part,
                    { itemTab },
                ),
                prop_borderRadius: prop_borderRadius as any,
                prop_borderWidth: prop_borderWidth as any,
                prop_minWidth: prop_borderMinWidth as any,
                prop_borderClass: [...classMargin, "px-2", "py-1", "position-relative"],
                prop_contentBackgroundColor: bgColor as any,
                prop_borderColor: prop_borderColor as any,
                classList: prop_borderClass as any,
                styles: prop_borderStyles as any,
            } as any,
            {
                CLICK_BORDER: (event: any, _dataArgs: any, _componentArgs: any) => {
                    const tabId = itemTab.id;
                    if (tabId != null) {
                        this.set("prop_tabSelected", tabId);
                    }
                    this.executeMethod("CLICK_TAB", event, {});
                },
            } as any,
        );

        return border.getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderFormTabsBorderContent — section.row + [TITLE, ICON]
    --------------------------------------------- */
    protected renderFormTabsBorderContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        if (!extra?.itemTab) {
            return this.renderEmptyContent(attrsDefault);
        }

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_borderBackgroundBefore = data?.["prop_borderBackgroundBefore"] ?? bind.prop_borderBackgroundBefore;
        const prop_borderBackgroundAfter  = data?.["prop_borderBackgroundAfter"]  ?? bind.prop_borderBackgroundAfter;

        const bgBefore = prop_borderBackgroundBefore?.get?.() ?? "";
        const bgAfter  = prop_borderBackgroundAfter?.get?.()  ?? "";

        const contentHeight = CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const stylesCustom = `
#${attrsDefault?.id}:before{
    content:             "";
    width:               calc(100% - 10px);
    height:              115%;
    display:             block;
    position:            absolute;
    top:                 0;
    left:                5px;
    background-color:    ${bgBefore};
    clip-path:           ellipse(75% 50% at 50% 0);
}
#${attrsDefault?.id}:after{
    background-color:    ${bgAfter} !important;
}
        `;

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesCustom,
            stylesBind: {
                height: contentHeight,
            },
            className: ["row"],
            children: [
                this.executeSchemaPart(
                    Schemas.FORM_TABS_BORDER_CONTENT_TITLE.part,
                    { itemTab: extra.itemTab },
                ),
                this.executeSchemaPart(
                    Schemas.FORM_TABS_BORDER_CONTENT_ICON.part,
                    { itemTab: extra.itemTab },
                ),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormTabsBorderContentIcon — ComponentIcon
    --------------------------------------------- */
    protected renderFormTabsBorderContentIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        if (!extra?.itemTab) {
            return this.renderEmptyContent(attrsDefault);
        }

        const bind = this._COMPONENT_PROPS_BIND;
        const itemTab: TabType = extra.itemTab;

        const prop_iconClass  = data?.["prop_iconClass"]  ?? bind.prop_iconClass;
        const prop_iconStyles = data?.["prop_iconStyles"] ?? bind.prop_iconStyles;

        if (itemTab.icon == null) {
            return this.renderEmptyContent(attrsDefault);
        }

        const icon = new ComponentIcon.Component(
            {
                prop_iconClass: prop_iconClass as any,
                prop_iconStyles: prop_iconStyles as any,
                prop_icon: UiIcons.CreateIcon(itemTab.icon as any),
                prop_iconTitle: itemTab.title as any,
            } as any,
            {} as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            className: ["text-center", "col-5", "px-0"],
            children: [
                icon.getReactiveElement(),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormTabsBorderContentTitle — <b> + color bind
    --------------------------------------------- */
    protected renderFormTabsBorderContentTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        if (!extra?.itemTab) {
            return this.renderEmptyContent(attrsDefault);
        }

        const bind = this._COMPONENT_PROPS_BIND;
        const itemTab: TabType = extra.itemTab;

        const prop_tabSelected          = data?.["prop_tabSelected"]          ?? bind.prop_tabSelected;
        const prop_titleStyles          = data?.["prop_titleStyles"]          ?? bind.prop_titleStyles;
        const prop_titleClass           = data?.["prop_titleClass"]           ?? bind.prop_titleClass;
        const prop_titleColorSelected   = data?.["prop_titleColorSelected"]   ?? bind.prop_titleColorSelected;
        const prop_titleColorUnselected = data?.["prop_titleColorUnselected"] ?? bind.prop_titleColorUnselected;

        const colorBind = CoreObservable.App.computed(
            (selected: string | number | null, colorSel: string | null, colorUnsel: string | null) => {
                if (selected == itemTab.id) return colorSel;
                return colorUnsel;
            },
            [prop_tabSelected, prop_titleColorSelected, prop_titleColorUnselected],
            this.getScope(),
        );

        const lineHeight = CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const fontSize = CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const stylesMerged = CoreObservable.App.computed(
            (titleStyles: Record<string, string> | null, color: string | null, lh: any, fs: any) => ({
                ...(titleStyles ?? {}),
                color: color ?? undefined,
                lineHeight: lh,
                fontSize:   fs,
            }),
            [prop_titleStyles, colorBind, lineHeight, fontSize],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: stylesMerged,
            classBind: [prop_titleClass as any],
            className: ["text-center", "col-7", "px-0"],
            children: [
                CoreReactive.App.b({
                    children: [itemTab.title as any],
                }),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormBodys — لیست body ها
    --------------------------------------------- */
    protected renderFormBodys(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tabs = data?.["prop_tabs"] ?? bind.prop_tabs;

        const tabsList = CoreObservable.App.computed(
            (tabs: TabType[]) => tabs ?? [],
            [prop_tabs],
            this.getScope(),
        );

        const childrenArr = CoreObservable.App.computed(
            (tabs: TabType[]) => {
                if (!tabs || !Array.isArray(tabs)) return [];
                return tabs.map((itemTab, i) => {
                    return CoreReactive.App.section({
                        children: [
                            this.executeSchemaPart(
                                Schemas.FORM_BODYS_BORDER.part,
                                { itemTab, tabIndex: i, tabLength: tabs.length },
                            ),
                        ],
                    });
                });
            },
            [tabsList],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: childrenArr as any,
        });
    }


    /* ---------------------------------------------
       renderFormBodysBorder — ComponentBorder برای body
       show/hide با prop_tabSelected == itemTab.id
       click → executeMethod CLICK_BODY
    --------------------------------------------- */
    protected renderFormBodysBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        if (!extra?.itemTab) {
            return this.renderEmptyContent(attrsDefault);
        }

        const bind = this._COMPONENT_PROPS_BIND;
        const itemTab: TabType = extra.itemTab;

        const prop_tabSelected        = data?.["prop_tabSelected"]        ?? bind.prop_tabSelected;
        const prop_bodyStyles         = data?.["prop_bodyStyles"]         ?? bind.prop_bodyStyles;
        const prop_bodyClass          = data?.["prop_bodyClass"]          ?? bind.prop_bodyClass;
        const prop_bodyBackgroundColor = data?.["prop_bodyBackgroundColor"] ?? bind.prop_bodyBackgroundColor;
        const prop_bodyBorderColor    = data?.["prop_bodyBorderColor"]    ?? bind.prop_bodyBorderColor;
        const prop_bodyBorderWidth    = data?.["prop_bodyBorderWidth"]    ?? bind.prop_bodyBorderWidth;
        const prop_bodyBorderRadius   = data?.["prop_bodyBorderRadius"]   ?? bind.prop_bodyBorderRadius;

        const showBind = CoreObservable.App.computed(
            (selected: string | number | null) => selected == itemTab.id,
            [prop_tabSelected],
            this.getScope(),
        );

        const border = new ComponentBorder.Component(
            {
                prop_show: showBind as any,
                prop_contentSize: UtilConst.Sizes.S,
                prop_content: itemTab.body as any,
                prop_borderRadius: prop_bodyBorderRadius as any,
                prop_borderWidth: prop_bodyBorderWidth as any,
                prop_borderClass: ["px-2", "py-1", "position-relative"],
                prop_contentBackgroundColor: prop_bodyBackgroundColor as any,
                prop_borderColor: prop_bodyBorderColor as any,
                classList: prop_bodyClass as any,
                styles: prop_bodyStyles as any,
            } as any,
            {
                CLICK_BORDER: (event: any, _dataArgs: any, _componentArgs: any) => {
                    this.executeMethod("CLICK_BODY", event, {});
                },
            } as any,
        );

        return border.getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderEmptyContent — fallback خالی
    --------------------------------------------- */
    public renderEmptyContent(
        attrsDefault?: PartAttrDefault,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
        });
    }

}
