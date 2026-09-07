import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
// --------------------------------
import {ComponentBorderBase}    from "./ComponentBorderBase";
import {createBorderStep}       from "./Step";
import {Schemas}                from "./Schemas";
import {MethodsConfigType}      from "./Methods";
import {ArrowTypes} from "./Props";
import {PropsType}              from "./Props";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";


/**
 * ComponentBorder — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentBorder HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderBorder (محتوای اختصاصی ComponentBorder)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (CLICK_BORDER, MOUSE_UP_BORDER, ...)
 *   identity — { unique?, emit?, events? }
 *
 * الگوی تقسیم‌بندی متدها (مطابق ComponentButton):
 *   - renderBorder() فقط ساختار کلی — تمام style‌ها در متدهای private
 *   - هر style یک متد private مستقل با CoreObservable.App.computed
 *   - _HOVER_STATE جایگزین el.hover قدیمی
 */
export class ComponentBorder extends ComponentBorderBase {

    /* ---------------------------------------------
       Hover State — معادل el.hover قدیمی
       Observable داخلی کلاس — توسط on: {mouseenter/mouseleave} تغذیه می‌شود
    --------------------------------------------- */
    private readonly _HOVER_STATE = new CoreObservable.App<boolean>(false);


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentBorder>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createBorderStep();

        super("border", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 8.2.7 — Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
       لایه ساختار از طریق Schema پایه رندر می‌شود.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.BORDER.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       Plan 11.2 — COMPONENT + STRUCTURE از Trait، بقیه اختصاصی
    --------------------------------------------- */
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
            case Schemas.BORDER.part:
                return this.renderBorder(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderBorder — رندر Part BORDER اصلی
       فقط ساختار کلی — تمام style‌های computed در متدهای private
    --------------------------------------------- */
    protected renderBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_content                      = data?.["prop_content"]                      ?? bind.prop_content;
        const prop_borderClass                  = data?.["prop_borderClass"]                  ?? bind.prop_borderClass;
        const prop_borderStyles                 = data?.["prop_borderStyles"]                 ?? bind.prop_borderStyles;
        const prop_borderArrowPosition          = data?.["prop_borderArrowPosition"]          ?? bind.prop_borderArrowPosition;
        const prop_borderOpacity                = data?.["prop_borderOpacity"]                ?? bind.prop_borderOpacity;
        const prop_borderType                   = data?.["prop_borderType"]                   ?? bind.prop_borderType;
        const prop_borderArrowType              = data?.["prop_borderArrowType"]              ?? bind.prop_borderArrowType;
        const prop_borderArrowWidth             = data?.["prop_borderArrowWidth"]             ?? bind.prop_borderArrowWidth;
        const prop_width                        = data?.["prop_width"]                        ?? bind.prop_width;
        const prop_minWidth                     = data?.["prop_minWidth"]                     ?? bind.prop_minWidth;
        const prop_contentColor                 = data?.["prop_contentColor"]                 ?? bind.prop_contentColor;
        const prop_contentColor_hover           = data?.["prop_contentColor_hover"]           ?? bind.prop_contentColor_hover;
        const prop_contentBackgroundColor       = data?.["prop_contentBackgroundColor"]       ?? bind.prop_contentBackgroundColor;
        const prop_contentBackgroundColor_hover = data?.["prop_contentBackgroundColor_hover"] ?? bind.prop_contentBackgroundColor_hover;
        const prop_borderColor                  = data?.["prop_borderColor"]                  ?? bind.prop_borderColor;
        const prop_borderColor_hover            = data?.["prop_borderColor_hover"]            ?? bind.prop_borderColor_hover;
        const prop_borderTopLeftRadiusHas       = data?.["prop_borderTopLeftRadiusHas"]       ?? bind.prop_borderTopLeftRadiusHas;
        const prop_borderTopRightRadiusHas      = data?.["prop_borderTopRightRadiusHas"]      ?? bind.prop_borderTopRightRadiusHas;
        const prop_borderBottomLeftRadiusHas    = data?.["prop_borderBottomLeftRadiusHas"]    ?? bind.prop_borderBottomLeftRadiusHas;
        const prop_borderBottomRightRadiusHas   = data?.["prop_borderBottomRightRadiusHas"]   ?? bind.prop_borderBottomRightRadiusHas;
        const prop_borderTopHas                 = data?.["prop_borderTopHas"]                 ?? bind.prop_borderTopHas;
        const prop_borderRightHas               = data?.["prop_borderRightHas"]               ?? bind.prop_borderRightHas;
        const prop_borderBottomHas              = data?.["prop_borderBottomHas"]              ?? bind.prop_borderBottomHas;
        const prop_borderLeftHas                = data?.["prop_borderLeftHas"]                ?? bind.prop_borderLeftHas;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            stylesCustom: this.getArrowCssCustom(attrsDefault?.id),
            styles: {
                "transition": "background-color 1000ms ease, color 1000ms ease, border-color 1000ms ease",
            },
            stylesBind: {
                prop_borderStyles,

                // --- public ---
                "min-width":                   prop_minWidth,
                "width":                       prop_width,
                "opacity":                     this.getStyleOpacity(prop_borderOpacity),

                // --- borderRadius ---
                "border-top-left-radius":      this.getStyleBorderTopLeftRadius(prop_borderTopLeftRadiusHas),
                "border-top-right-radius":     this.getStyleBorderTopRightRadius(prop_borderTopRightRadiusHas),
                "border-bottom-left-radius":   this.getStyleBorderBottomLeftRadius(prop_borderBottomLeftRadiusHas),
                "border-bottom-right-radius":  this.getStyleBorderBottomRightRadius(prop_borderBottomRightRadiusHas),

                // --- borderWidth ---
                "border-top-width":            this.getStyleBorderTopWidth(prop_borderTopHas),
                "border-right-width":          this.getStyleBorderRightWidth(prop_borderRightHas),
                "border-bottom-width":         this.getStyleBorderBottomWidth(prop_borderBottomHas),
                "border-left-width":           this.getStyleBorderLeftWidth(prop_borderLeftHas),

                // --- border + content colors ---
                "border-style":                this.getStyleBorderStyle(prop_borderType, prop_borderColor),
                "border-color":                this.getStyleBorderColor(prop_borderColor, prop_borderColor_hover),
                "color":                       this.getStyleContentColor(prop_contentColor, prop_contentColor_hover),
                "background-color":            this.getStyleContentBackgroundColor(prop_contentBackgroundColor, prop_contentBackgroundColor_hover),

                // --- arrow CSS variables ---
                "--arrow-content":             this.getStyleArrowContent(prop_borderArrowType),
                "--arrow-left":                this.getStyleArrowLeft(prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth),
                "--arrow-right":               this.getStyleArrowRight(prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth),
                "--arrow-top":                 this.getStyleArrowTop(prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth),
                "--arrow-bottom":              this.getStyleArrowBottom(prop_borderArrowType, prop_borderArrowWidth),
                "--arrow-border-width":        this.getStyleArrowBorderWidth(prop_borderArrowType, prop_borderArrowWidth),
                "--arrow-transform":           this.getStyleArrowTransform(prop_borderArrowType),
                "--arrow-border-color":        this.getStyleArrowBorderColor(prop_borderArrowType, prop_borderColor, prop_borderColor_hover),
            },
            classBind: [
                prop_borderClass,
            ],
            unique: this._COMPONENT_STEP?.click,
            emit: (request) => {
                return { value: prop_content.get(), valid: true };
            },
            on: {
                click: (event: Event) => {
                    event.stopPropagation();
                    this.executeMethod("CLICK_BORDER", event, {});
                },
                mousemove: (event: Event) => {
                    event.stopPropagation();
                    this.executeMethod("MOUSE_MOVE_BORDER", event, {});
                },
                mousedown: (event: Event) => {
                    event.stopPropagation();
                    this.executeMethod("MOUSE_DOWN_BORDER", event, {});
                },
                mouseup: (event: Event) => {
                    event.stopPropagation();
                    this.executeMethod("MOUSE_UP_BORDER", event, {});
                },
                mouseenter: () => {
                    this._HOVER_STATE.set(true);
                },
                mouseleave: () => {
                    this._HOVER_STATE.set(false);
                },
            },
            children: [
                prop_content,
            ],
        });
    }


    /* ---------------------------------------------
       Arrow CSS — استایل ثابت :after
    --------------------------------------------- */
    private getArrowCssCustom(elementId?: string): string {
        const selector = elementId ?? this.getPartId(Schemas.BORDER.part);
        return `
#${selector}:after{
    content:       var(--arrow-content);
    position:      absolute;
    width:         0px;
    height:        0px;
    border-style:  solid;
    left:          var(--arrow-left);
    right:         var(--arrow-right);
    top:           var(--arrow-top);
    bottom:        var(--arrow-bottom);
    border-width:  var(--arrow-border-width);
    border-color:  var(--arrow-border-color);
    transform:     var(--arrow-transform);
}`;
    }


    /// ---------------------
    ///  Private Style Getters
    ///  هر متد یک CoreObservable.App.computed برمی‌گرداند
    ///  توسعه‌پذیر: هر style منطق مستقل دارد
    /// ---------------------

    private getStyleOpacity(prop_borderOpacity) {
        return CoreObservable.App.computed(
            (opacity) => opacity != null ? opacity / 100 : null,
            [prop_borderOpacity],
            this.getScope(),
        );
    }

    private getStyleBorderTopLeftRadius(prop_borderTopLeftRadiusHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Css_BorderRadius(sizeName) : UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL),
            [CoreConfig.Settings.SizeName.observable(), prop_borderTopLeftRadiusHas],
            this.getScope(),
        );
    }

    private getStyleBorderTopRightRadius(prop_borderTopRightRadiusHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Css_BorderRadius(sizeName) : UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL),
            [CoreConfig.Settings.SizeName.observable(), prop_borderTopRightRadiusHas],
            this.getScope(),
        );
    }

    private getStyleBorderBottomLeftRadius(prop_borderBottomLeftRadiusHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Css_BorderRadius(sizeName) : UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL),
            [CoreConfig.Settings.SizeName.observable(), prop_borderBottomLeftRadiusHas],
            this.getScope(),
        );
    }

    private getStyleBorderBottomRightRadius(prop_borderBottomRightRadiusHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Css_BorderRadius(sizeName) : UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL),
            [CoreConfig.Settings.SizeName.observable(), prop_borderBottomRightRadiusHas],
            this.getScope(),
        );
    }

    private getStyleBorderTopWidth(prop_borderTopHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Style_Important(UtilStyle.Css_BorderWidth(sizeName)) : UtilStyle.Style_Important(UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL)),
            [CoreConfig.Settings.SizeName.observable(), prop_borderTopHas],
            this.getScope(),
        );
    }

    private getStyleBorderRightWidth(prop_borderRightHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Style_Important(UtilStyle.Css_BorderWidth(sizeName)) : UtilStyle.Style_Important(UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL)),
            [CoreConfig.Settings.SizeName.observable(), prop_borderRightHas],
            this.getScope(),
        );
    }

    private getStyleBorderBottomWidth(prop_borderBottomHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Style_Important(UtilStyle.Css_BorderWidth(sizeName)) : UtilStyle.Style_Important(UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL)),
            [CoreConfig.Settings.SizeName.observable(), prop_borderBottomHas],
            this.getScope(),
        );
    }

    private getStyleBorderLeftWidth(prop_borderLeftHas) {
        return CoreObservable.App.computed(
            (sizeName, has) => has ? UtilStyle.Style_Important(UtilStyle.Css_BorderWidth(sizeName)) : UtilStyle.Style_Important(UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL)),
            [CoreConfig.Settings.SizeName.observable(), prop_borderLeftHas],
            this.getScope(),
        );
    }

    private getStyleBorderStyle(prop_borderType, prop_borderColor) {
        return CoreObservable.App.computed(
            (borderType, borderColor) => borderColor != null ? borderType : null,
            [prop_borderType, prop_borderColor],
            this.getScope(),
        );
    }

    private getStyleBorderColor(prop_borderColor, prop_borderColor_hover) {
        return CoreObservable.App.computed(
            (color, colorHover, hovered) => {
                if (colorHover) return hovered ? colorHover : color;
                return color;
            },
            [prop_borderColor, prop_borderColor_hover, this._HOVER_STATE],
            this.getScope(),
        );
    }

    private getStyleContentColor(prop_contentColor, prop_contentColor_hover) {
        return CoreObservable.App.computed(
            (color, colorHover, hovered) => {
                if (colorHover) return hovered ? colorHover : color;
                return color;
            },
            [prop_contentColor, prop_contentColor_hover, this._HOVER_STATE],
            this.getScope(),
        );
    }

    private getStyleContentBackgroundColor(prop_contentBackgroundColor, prop_contentBackgroundColor_hover) {
        return CoreObservable.App.computed(
            (color, colorHover, hovered) => {
                if (colorHover) return hovered ? colorHover : color;
                return color;
            },
            [prop_contentBackgroundColor, prop_contentBackgroundColor_hover, this._HOVER_STATE],
            this.getScope(),
        );
    }


    /// ---------------------
    ///  Arrow Style Getters
    /// ---------------------

    private getStyleArrowContent(prop_borderArrowType) {
        return CoreObservable.App.computed(
            (arrowType) => arrowType != null ? "''" : null,
            [prop_borderArrowType],
            this.getScope(),
        );
    }

    private getStyleArrowLeft(prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth) {
        return CoreObservable.App.computed(
            (type, arrowPosition, arrowWidth, dir) => {
                if (!dir && (type == ArrowTypes.TOP || type == ArrowTypes.BOTTOM)) return arrowPosition;
                if (dir && type == ArrowTypes.LEFT) return UtilStyle.Css_SizeUnit(-arrowWidth, UtilConst.Units.PEXEL);
                if (!dir && type == ArrowTypes.LEFT) return UtilStyle.Css_SizeUnit(-arrowWidth, UtilConst.Units.PEXEL);
                return null;
            },
            [prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth, CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
    }

    private getStyleArrowRight(prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth) {
        return CoreObservable.App.computed(
            (type, arrowPosition, arrowWidth, dir) => {
                if (dir && (type == ArrowTypes.TOP || type == ArrowTypes.BOTTOM)) return arrowPosition;
                if (!dir && type == ArrowTypes.RIGHT) return UtilStyle.Css_SizeUnit(-arrowWidth, UtilConst.Units.PEXEL);
                if (dir && type == ArrowTypes.RIGHT) return UtilStyle.Css_SizeUnit(-arrowWidth, UtilConst.Units.PEXEL);
                return null;
            },
            [prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth, CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
    }

    private getStyleArrowTop(prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth) {
        return CoreObservable.App.computed(
            (type, arrowPosition, arrowWidth) => {
                if (type == ArrowTypes.TOP) return UtilStyle.Css_SizeUnit(-arrowWidth, UtilConst.Units.PEXEL);
                if (type == ArrowTypes.LEFT) return arrowPosition;
                if (type == ArrowTypes.RIGHT) return arrowPosition;
                return null;
            },
            [prop_borderArrowType, prop_borderArrowPosition, prop_borderArrowWidth],
            this.getScope(),
        );
    }

    private getStyleArrowBottom(prop_borderArrowType, prop_borderArrowWidth) {
        return CoreObservable.App.computed(
            (type, arrowWidth) => {
                if (type == ArrowTypes.BOTTOM) return UtilStyle.Css_SizeUnit(-arrowWidth, UtilConst.Units.PEXEL);
                return null;
            },
            [prop_borderArrowType, prop_borderArrowWidth],
            this.getScope(),
        );
    }

    private getStyleArrowBorderWidth(prop_borderArrowType, prop_borderArrowWidth) {
        return CoreObservable.App.computed(
            (type, arrowWidth, dir) => {
                if (type == ArrowTypes.TOP || type == ArrowTypes.BOTTOM)
                    return `${UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL)} ${UtilStyle.Css_SizeUnit(arrowWidth*(2/3), UtilConst.Units.PEXEL)} 0 ${UtilStyle.Css_SizeUnit(arrowWidth*(2/3), UtilConst.Units.PEXEL)}`;
                if ((dir && type == ArrowTypes.LEFT) || (!dir && type == ArrowTypes.RIGHT))
                    return `${UtilStyle.Css_SizeUnit(arrowWidth*(2/3), UtilConst.Units.PEXEL)} 0 ${UtilStyle.Css_SizeUnit(arrowWidth*(2/3), UtilConst.Units.PEXEL)} ${UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL)}`;
                if ((dir && type == ArrowTypes.RIGHT) || (!dir && type == ArrowTypes.LEFT))
                    return `${UtilStyle.Css_SizeUnit(arrowWidth*(2/3), UtilConst.Units.PEXEL)} ${UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL)} ${UtilStyle.Css_SizeUnit(arrowWidth*(2/3), UtilConst.Units.PEXEL)} 0`;
                return null;
            },
            [prop_borderArrowType, prop_borderArrowWidth, CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
    }

    private getStyleArrowTransform(prop_borderArrowType) {
        return CoreObservable.App.computed(
            (type, dir) => {
                if (type == ArrowTypes.TOP) return `translate(${dir ? "50%" : "-50%"}, 0) rotate(180deg)`;
                if (type == ArrowTypes.BOTTOM) return `translate(${dir ? "50%" : "-50%"}, 0) rotate(0deg)`;
                if ((dir && type == ArrowTypes.LEFT) || (!dir && type == ArrowTypes.RIGHT))
                    return `translate(0, -50%) ${dir ? "rotate(180deg)" : ""}`;
                if ((dir && type == ArrowTypes.RIGHT) || (!dir && type == ArrowTypes.LEFT))
                    return `translate(0, -50%) ${dir ? "rotate(180deg)" : ""}`;
                return null;
            },
            [prop_borderArrowType, CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
    }

    private getStyleArrowBorderColor(prop_borderArrowType, prop_borderColor, prop_borderColor_hover) {
        return CoreObservable.App.computed(
            (type, borderColor, borderColorHover, hovered) => {
                const color = hovered ? (borderColorHover ?? borderColor) : borderColor;
                if (type == ArrowTypes.TOP || type == ArrowTypes.BOTTOM)
                    return `${color} transparent transparent transparent`;
                if (type == ArrowTypes.LEFT)
                    return `transparent transparent transparent ${color}`;
                if (type == ArrowTypes.RIGHT)
                    return `transparent ${color} transparent transparent`;
                return null;
            },
            [prop_borderArrowType, prop_borderColor, prop_borderColor_hover, this._HOVER_STATE],
            this.getScope(),
        );
    }
}
