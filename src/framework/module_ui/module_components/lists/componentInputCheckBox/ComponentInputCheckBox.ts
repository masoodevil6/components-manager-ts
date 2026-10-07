import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentInputCheckBoxBase} from "./ComponentInputCheckBoxBase";
import {Schemas}                   from "./Schemas";
import {MethodsType,
        MethodsConfigType}        from "./Methods";
import {PropsConfigType}           from "./Props";
import {createInputCheckBoxStep}   from "./Step";
import {PartAttrDefault}           from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
import {ComponentLabelTrait}      from "../../traits/componentLabelTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as ComponentBorder  from "../componentBorder";
import * as ComponentIcon    from "../componentIcon";
import * as ComponentValidate from "../componentValidate";
import * as ComponentElementPosition from "../componentElementPosition";
import {createCheckBoxControl} from "./Control";


/**
 * ComponentInputCheckBox — کلاس نهایی
 *
 * Composition:
 *   ComponentInputCheckBox HAS-A ComponentBorder (for the checkbox box)
 *   ComponentBorder content → ComponentIcon (for the tick icon)
 *
 * Constructor: (config, methods, identity?)
 *
 * Rendering:
 *   <component-input-checkbox>
 *     <section>
 *       <ComponentLabel> (label with title, tooltip, border)
 *       <ComponentBorder> (checkbox box with conditional colors)
 *         <div position-absolute centered>
 *           <ComponentIcon> (tick icon, shown when value is truthy)
 *         </div>
 *       </ComponentBorder>
 *       <b>{title}</b>
 *     </section>
 *   </component-input-checkbox>
 */
export class ComponentInputCheckBox extends ComponentInputCheckBoxBase {

    constructor(
        config?:  Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentInputCheckBox>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createInputCheckBoxStep();

        super("input-checkbox", null, identity, step);

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
        return this.executeSchemaPart(Schemas.MAIN.part, {});
    }


    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.LABEL.part:
                return this.renderLabel(attrsDefault, data, extra);
            case Schemas.MAIN.part:
                return this.renderMain(attrsDefault, data, extra);
            case Schemas.MAIN_ICON.part:
                return this.renderMainIcon(attrsDefault, data, extra);
            case Schemas.MAIN_ICON_POSITION.part:
                return this.renderMainIconPosition(attrsDefault, data, extra);
            case Schemas.MAIN_ICON_CHECKBOX.part:
                return this.renderMainIconCheckbox(attrsDefault, data, extra);
            case Schemas.MAIN_TITLE.part:
                return this.renderMainTitle(attrsDefault, data, extra);
            case Schemas.VALIDATE.part:
                return this.renderValidate(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderMain — container section
    --------------------------------------------- */
    protected renderMain(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.part("section", {
            attrs: { ...attrsDefault },
            className: ["p-0", "m-0"],
            styles: {
                display: "flow-root",
            },
            children: [
                this.executeSchemaPart(Schemas.LABEL.part, {}),
                this.executeSchemaPart(Schemas.MAIN_ICON.part, {}),
                this.executeSchemaPart(Schemas.MAIN_TITLE.part, {}),
                this.executeSchemaPart(Schemas.VALIDATE.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderLabel — label via ComponentLabel composition
       Renders the label section with title, tooltip, border, and background.
    --------------------------------------------- */
    protected renderLabel(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const labelProps: Record<string, any> = {};
        for (const propName of Object.keys(ComponentLabelTrait.props)) {
            labelProps[propName] = data?.[propName] ?? bind[propName];
        }
        const label = ComponentLabelTrait.createLabel(labelProps, {
            CLICK: (event: Event) => this.pr_setChangeValue(event),
        }, {
            unique: (this as any)._COMPONENT_STEP?.label?.click ?? undefined,
        });
        return label.getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderMainIcon — checkbox box via ComponentBorder composition
       Legacy: template_render_main_icon
    --------------------------------------------- */
    protected renderMainIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_value                             = data?.["prop_value"]                             ?? bind.prop_value;
        const prop_isDisable                         = data?.["prop_isDisable"]                         ?? bind.prop_isDisable;
        const prop_borderIconClass                   = data?.["prop_borderIconClass"]                   ?? bind.prop_borderIconClass;
        const prop_borderIconStyles                  = data?.["prop_borderIconStyles"]                  ?? bind.prop_borderIconStyles;
        const prop_borderIconColor_selected          = data?.["prop_borderIconColor_selected"]          ?? bind.prop_borderIconColor_selected;
        const prop_borderIconColor_unSelected        = data?.["prop_borderIconColor_unSelected"]        ?? bind.prop_borderIconColor_unSelected;
        const prop_borderIconColor_disable           = data?.["prop_borderIconColor_disable"]           ?? bind.prop_borderIconColor_disable;
        const prop_borderIconWidth                   = data?.["prop_borderIconWidth"]                   ?? bind.prop_borderIconWidth;
        const prop_borderIconRadius                  = data?.["prop_borderIconRadius"]                  ?? bind.prop_borderIconRadius;
        const prop_borderIconOpacity                 = data?.["prop_borderIconOpacity"]                 ?? bind.prop_borderIconOpacity;
        const prop_borderIconBackground_selected     = data?.["prop_borderIconBackground_selected"]     ?? bind.prop_borderIconBackground_selected;
        const prop_borderIconBackground_unSelected   = data?.["prop_borderIconBackground_unSelected"]   ?? bind.prop_borderIconBackground_unSelected;
        const prop_borderIconBackground_disable      = data?.["prop_borderIconBackground_disable"]       ?? bind.prop_borderIconBackground_disable;

        const control = createCheckBoxControl({
            value: prop_value,
            isDisable: prop_isDisable,
            borderIconClass: prop_borderIconClass,
            borderIconStyles: prop_borderIconStyles,
            borderIconColorSelected: prop_borderIconColor_selected,
            borderIconColorUnSelected: prop_borderIconColor_unSelected,
            borderIconColorDisable: prop_borderIconColor_disable,
            borderIconWidth: prop_borderIconWidth,
            borderIconRadius: prop_borderIconRadius,
            borderIconOpacity: prop_borderIconOpacity,
            borderIconBackgroundSelected: prop_borderIconBackground_selected,
            borderIconBackgroundUnSelected: prop_borderIconBackground_unSelected,
            borderIconBackgroundDisable: prop_borderIconBackground_disable,
            icon: bind.prop_icon,
            iconClass: bind.prop_iconClass,
            iconStyles: bind.prop_iconStyles,
            scope: this.getScope(),
            onClick: (event) => this.pr_setChangeValue(event),
            unique: (this as any)._COMPONENT_STEP?.click ?? undefined,
        });
        const element = control.getElement() as HTMLElement;
        if (attrsDefault?.["data-part-name"]) element.setAttribute("data-part-name", attrsDefault["data-part-name"]);
        if (attrsDefault?.id) element.id = attrsDefault.id;
        return element as any as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderMainIconPosition — centered positioning wrapper
       Legacy: template_render_main_icon_position (ComponentElementPosition)
    --------------------------------------------- */
    protected renderMainIconPosition(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const position = new ComponentElementPosition.Component({
            prop_positionClass: ["d-block"],
            prop_positionStyles: {
                width: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                height: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
            },
            prop_positionTop: UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
            prop_positionLeft: UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
            prop_positionTranslate: UtilStyle.Css_Transform(
                UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT),
                UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT),
            ),
            prop_positionHeight: null,
            prop_content: this.executeSchemaPart(Schemas.MAIN_ICON_CHECKBOX.part, {}),
        });

        const element = position.getElement() as HTMLElement;
        element.setAttribute("data-part-name", attrsDefault?.["data-part-name"] ?? Schemas.MAIN_ICON_POSITION.part);
        if (attrsDefault?.id) element.id = attrsDefault.id;
        return element as any as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderMainIconCheckbox — tick icon via ComponentIcon composition
       Legacy: template_render_main_icon_position_checkBox
    --------------------------------------------- */
    protected renderMainIconCheckbox(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_value      = data?.["prop_value"]      ?? bind.prop_value;
        const prop_icon       = data?.["prop_icon"]       ?? bind.prop_icon;
        const prop_iconClass  = data?.["prop_iconClass"]  ?? bind.prop_iconClass;
        const prop_iconStyles = data?.["prop_iconStyles"] ?? bind.prop_iconStyles;

        // --- Resolve icon: use provided or create default tick ---
        const iconInstance = CoreObservable.App.computed(
            (value, icon) => {
                if (!this.isTruthy(value)) return null;
                if (icon != null) return icon;
                // Default tick icon: fileStatusComplete
                return UiIcons.CreateIcon(
                    UiIcons.Src.StatusIsTrue.Definition,
                    {
                        size:    25,
                        primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
                    },
                );
            },
            [prop_value, prop_icon],
            this.getScope(),
        );

        return new ComponentIcon.Component(
            {
                prop_structureClass:  ["position-absolute"],
                prop_structureStyles: CoreObservable.App.computed(
                    (padding) => ({
                        top:        UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
                        left:       UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
                        transform:  UtilStyle.Css_Transform(
                            UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT),
                            UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT),
                        ),
                        padding:    padding,
                    }),
                    [this.getIconPadding()],
                    this.getScope(),
                ),
                prop_iconClass:   prop_iconClass,
                prop_iconStyles:  prop_iconStyles,
                prop_icon:        iconInstance,
            } as any,
            {},
        ).getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderMainTitle — title text
       Legacy: template_render_main_title
    --------------------------------------------- */
    protected renderMainTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_value                 = data?.["prop_value"]                 ?? bind.prop_value;
        const prop_isDisable             = data?.["prop_isDisable"]             ?? bind.prop_isDisable;
        const prop_title                 = data?.["prop_title"]                 ?? bind.prop_title;
        const prop_titleShow             = data?.["prop_titleShow"]             ?? bind.prop_titleShow;
        const prop_titleClass            = data?.["prop_titleClass"]            ?? bind.prop_titleClass;
        const prop_titleStyles           = data?.["prop_titleStyles"]           ?? bind.prop_titleStyles;
        const prop_titleColor_selected   = data?.["prop_titleColor_selected"]   ?? bind.prop_titleColor_selected;
        const prop_titleColor_unSelected = data?.["prop_titleColor_unSelected"] ?? bind.prop_titleColor_unSelected;
        const prop_titleColor_disable    = data?.["prop_titleColor_disable"]    ?? bind.prop_titleColor_disable;

        const borderSize  = this.getIconBorderSize();
        const iconOuterWidth = this.getIconOuterWidth();

        // --- Computed title color (supports number/string/boolean value) ---


        return CoreReactive.App.b({
            attrs: { ...attrsDefault },
            className: [] ,
            classBind: [
                prop_titleShow.mapBoolean("show", "d-none"),
                prop_titleClass,
            ],
            styles: {
                cursor:    "pointer",
            },
            stylesBind: {
                prop_titleStyles,
                marginTop: CoreObservable.App.computed(
                    (sizeName) => UtilStyle.Css_Margin(sizeName),
                    [
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
                color: CoreObservable.App.computed(
                    (value, isDisable, cSel, cUnsel, cDis) => {
                        if (isDisable) return cDis;
                        if (typeof value == "number") {
                            return value == 0 ? cUnsel : cSel;
                        }
                        if (typeof value == "boolean" || typeof value == "string") {
                            return value ? cSel : cUnsel;
                        }
                        return null;
                    },
                    [prop_value, prop_isDisable, prop_titleColor_selected, prop_titleColor_unSelected, prop_titleColor_disable],
                    this.getScope(),
                ),
                float:    CoreObservable.App.computed(
                    (dir) => {
                        return dir ? "right" : "left"
                    },
                    [
                        CoreConfig.Settings.DirectionRtl.observable()
                    ],
                    this.getScope(),
                ),
                paddingTop:    CoreObservable.App.computed(
                    (sizeName) => {
                        return UtilStyle.Css_Padding(sizeName)
                    },
                    [
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
                paddingBottom:    CoreObservable.App.computed(
                    (sizeName) => {
                        return UtilStyle.Css_Padding(sizeName)
                    },
                    [
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
                lineHeight:    CoreObservable.App.computed(
                    (sizeName) => {
                        return UtilStyle.Css_Height(sizeName)
                    },
                    [
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
                fontSize: CoreObservable.App.computed(
                    (sizeName) => UtilStyle.Css_FontSize(sizeName),
                    [
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
                marginLeft: CoreObservable.App.computed(
                    (sizeName) => UtilStyle.Css_Margin(sizeName),
                    [
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
                marginRight: CoreObservable.App.computed(
                    (sizeName) => UtilStyle.Css_Margin(sizeName),
                    [
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
                width: CoreObservable.App.computed(
                    (outerWidth, sizeName) => UtilStyle.Css_SizeCalc(
                        UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                        UtilConst.Operation.MINUS,
                        outerWidth,
                        UtilConst.Operation.MINUS,
                        UtilStyle.Css_Margin(sizeName) as any,
                        UtilConst.Operation.MINUS,
                        UtilStyle.Css_Margin(sizeName) as any,
                    ),
                    [
                        iconOuterWidth ,
                        CoreConfig.Settings.SizeName.observable()
                    ],
                    this.getScope(),
                ),
            },
            children: [
                prop_title,
            ],
            on: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.pr_setChangeValue(event);
                },
            },
        });
    }


    /* ---------------------------------------------
       renderValidate — optional ComponentValidate composition
       Renders a ComponentValidate when prop_listRules is non-empty.
    --------------------------------------------- */
    protected renderValidate(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_listRules    = data?.["prop_listRules"]    ?? bind.prop_listRules;
        const prop_msgRules     = data?.["prop_msgRules"]     ?? bind.prop_msgRules;
        const prop_validateSize  = data?.["prop_validateSize"]  ?? bind.prop_validateSize;
        const prop_iconSuccess  = data?.["prop_iconSuccess"]  ?? bind.prop_iconSuccess;
        const prop_iconError    = data?.["prop_iconError"]    ?? bind.prop_iconError;
        const prop_value        = data?.["prop_value"]        ?? bind.prop_value;

        const hasRules = CoreObservable.App.computed(
            (rules: any[]) => Array.isArray(rules) && rules.length > 0,
            [prop_listRules],
            this.getScope(),
        );

        return CoreReactive.App.div({
            attrs: { ...attrsDefault },
            classBind: [hasRules.mapBoolean("", "d-none")],
            children: [
                new ComponentValidate.Component(
                    {
                        prop_listRules:   prop_listRules,
                        prop_msgRules:    prop_msgRules,
                        prop_size:        prop_validateSize,
                        prop_value:       prop_value,
                        prop_iconSuccess: prop_iconSuccess,
                        prop_iconError:   prop_iconError,
                    } as any,
                    {
                        CHANGE: (event: Event, dataArgs: any) => {
                        },
                    } as any,
                ).getReactiveElement() as CoreReactive.App,
            ],
        });
    }


    /// ---------------------
    ///  Private Style Getters
    ///  الگوی Plan 12.1 §۰.۳ — هر متد یک CoreObservable.App.computed برمی‌گرداند
    /// ---------------------

    private getIconBorderSize() {
        return CoreObservable.App.computed(
            (sizeName: any) => {
                const iconSize = UtilStyle.Css_IconSize(sizeName) as any;
                const padding  = UtilStyle.Css_Padding(sizeName) as any;
                return UtilStyle.Css_SizeCalc(iconSize, UtilConst.Operation.ADD, padding, UtilConst.Operation.ADD, padding);
            },
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getIconMargin() {
        return CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_Margin(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getIconPadding() {
        return CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_Padding(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getIconOuterWidth() {
        return CoreObservable.App.computed(
            (sizeName: any) => {
                const iconSize = UtilStyle.Css_IconSize(sizeName) as any;
                const padding  = UtilStyle.Css_Padding(sizeName) as any;
                const margin   = UtilStyle.Css_Margin(sizeName) as any;
                return UtilStyle.Css_SizeCalc(
                    iconSize,
                    UtilConst.Operation.ADD, padding, UtilConst.Operation.ADD, padding,
                    UtilConst.Operation.ADD, margin, UtilConst.Operation.ADD, margin,
                );
            },
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }


    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */
    private isTruthy(value: any): boolean {
        if (typeof value == "number") return value != 0;
        if (typeof value == "boolean") return value;
        if (typeof value == "string") return !!value;
        return !!value;
    }

    private pr_setChangeValue(event: Event): void {
        event.preventDefault();
        const prop_isDisable = this.get("prop_isDisable") as boolean;

        if (prop_isDisable) {
            this.executeMethod("CLICK", event, {});
        } else {
            const prop_value = this.get("prop_value");
            this.set("prop_value", !this.isTruthy(prop_value));
            this.executeMethod("CLICK", event, {});
        }
    }

}
