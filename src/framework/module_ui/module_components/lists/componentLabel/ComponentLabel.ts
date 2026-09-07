import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
// --------------------------------
import {ComponentLabelBase}     from "./ComponentLabelBase";
import {createLabelStep}        from "./Step";
import {Schemas}                from "./Schemas";
import {MethodsConfigType}      from "./Methods";
import {TooltipDirectionTypes}  from "./Props";
import {PropsType}              from "./Props";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as UiCategory from "@/ui_categories";
import * as UiIcons    from "@/ui_icons";


/**
 * ComponentLabel — کلاس نهایی (Plan 13.1.0)
 *
 * معماری Composition:
 *   ComponentLabel HAS-A ComponentBorder (نه IS-A)
 *   ComponentBorder مهاجرت‌شده در renderLabelBorder از طریق Category callable
 *   (UiCategory.UI.Simples.Border) ساخته می‌شود — نه new مستقیم.
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (CLICK)
 *   identity — { unique?, emit?, events? }
 *
 * الگوی تقسیم‌بندی متدها (مطابق Plan 12.1):
 *   - هر render method فقط ساختار — تمام styleهای computed در متدهای private
 *   - Tooltip: رندر شرطی با conditionWhen + popup CSS-only (بدون listener JS)
 *   - renderContentComponent = executeSchemaPart(BORDER) — قرارداد 11.2 §۲.۵ (Plan 13.1.1)
 *   - prop_labelShow در renderLabelBorder اعمال می‌شود — مسیر رندر BORDER یکتاست
 *     (فقط renderManagerComponent("part-label-border")) — Plan 13.1.1
 *
 * بازیابی Behavior از Legacy:
 *   - label قابل‌کلیک → CLICK method روی Border composition
 *   - binding به input با for → attrsBind: {for}
 *   - tooltip شرطی → conditionWhen(prop_labelTooltipDescription != null)
 *   - fontSize واکنش‌گرا → computed روی CoreConfig.Settings.SizeName
 */
export class ComponentLabel extends ComponentLabelBase {


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentLabel>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createLabelStep();

        super("label", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 8.2.7 — Component Disposal
       Tooltip بدون listener JS است — فقط Event Tree پاک می‌شود
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


   /* ---------------------------------------------
      Plan 13.1.1 — قرارداد ۱۱.۲ §۲.۵:
      renderContentComponent فقط Schema اختصاصی اول را رندر می‌کند.
      هر منطق شرطی/تزئینی به خودِ Schemaها منتقل می‌شود
      (prop_labelShow → renderLabelBorder).
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
      Plan 13.1.1 — مسیر رندر BORDER یکتا شد: STRUCTURE (Trait) →
      renderContentComponent → executeSchemaPart(BORDER) → همین switch.
      مسیر مستقیم renderContentComponent → renderLabelBorder حذف شد.
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
                return this.renderLabelBorder(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT.part:
                return this.renderLabelContent(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TITLE.part:
                return this.renderLabelTitle(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLTIP.part:
                return this.renderLabelTooltip(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
      renderLabelBorder — رندر Part BORDER
      Composition: UiCategory.UI.Contents.Border (مهاجرت‌شده — Plan 12.1)
      + click → this.executeMethod("CLICK", ...)
   
      Plan 13.1.1 — منطق show از renderContentComponent به اینجا منتقل شد:
      prop_labelShow=false → borderElement=null (رفتار Legacy حفظ می‌شود) و
      هر دو مسیر رسیدن به این متد (STRUCTURE→content→executeSchemaPart و
      renderManagerComponent مستقیم) دقیقاً یک رفتار دارند.
   
      نکته prop_labelRadius: ComponentBorder جدید radius را از SizeName سراسری
      محاسبه می‌کند (prop روش radius ندارد) — پس radius اختصاصی Label از طریق
      prop_borderStyles computed تزریق می‌شود.
   --------------------------------------------- */
      protected renderLabelBorder(
          attrsDefault?: PartAttrDefault,
          data?:         Record<string, CoreObservable.App<any>>,
          extra?:        any,
      ): CoreReactive.App {
   
          const bind = this._COMPONENT_PROPS_BIND;
   
          const prop_labelShow        = data?.["prop_labelShow"]        ?? bind.prop_labelShow;
          const prop_labelBackground  = data?.["prop_labelBackground"]  ?? bind.prop_labelBackground;
          const prop_labelRadius      = data?.["prop_labelRadius"]      ?? bind.prop_labelRadius;
          const prop_labelMinWidth    = data?.["prop_labelMinWidth"]    ?? bind.prop_labelMinWidth;
   
          // Plan 13.1.1 — شرط show در نقطه رندر BORDER (بدون تغییر رفتار Legacy)
          const borderElement = CoreObservable.App.computed(
              (show) => show ? this.buildBorderElement(data, {
                  labelBackground: prop_labelBackground,
                  labelRadius:     prop_labelRadius,
                  labelMinWidth:   prop_labelMinWidth,
              }) : null,
              [prop_labelShow],
              this.getScope(),
          );
   
          return CoreReactive.App.span({
              children: [borderElement],
          });
      }
   
   
      /* ---------------------------------------------
         Plan 13.1.1 — buildBorderElement (private)
         ساخت Composition Border — کد Plan 13.1.0 عیناً منتقل شده
         (بدون تغییر رفتار): computed prop_borderStyles، cast الگوی پروژه،
         CLICK_BORDER delegate، identity step.
      --------------------------------------------- */
      private buildBorderElement(
          data?: Record<string, CoreObservable.App<any>>,
          label?: {
              labelBackground: CoreObservable.App<any>;
              labelRadius:     CoreObservable.App<any>;
              labelMinWidth:   CoreObservable.App<any>;
          },
      ): CoreReactive.App {
   
          if (!label) return null as any;
   
          // تزریق radius اختصاصی Label به Border (قابل‌گسترش به استایل‌های دیگر)
          const prop_borderStyles = CoreObservable.App.computed(
              (radius) => UtilStyle.Style_Important(`border-radius: ${UtilStyle.Css_BorderRadius(radius)}`),
              [label.labelRadius],
              this.getScope(),
          );
   
         // تزریق propهای Observable خود Label به config کامپوننت Border —
         // در runtime، #getReadyUserConfigAndDefaultConfig خودش Observable را
         // تشخیص می‌دهد و مستقیم ذخیره می‌کند («if Observable → store directly»)
         // type-level: TConfig خروجی CreateCategoryComponent فقط مقدار خام را
         // تعریف می‌کند — cast الگوی پروژه (مثل Legacy templateFn_render_border)
         return UiCategory.UI.Contents.Border(
             {
                 prop_borderClass:            ["position-relative", "py-0", "px-2"],
                 prop_borderStyles:           prop_borderStyles,
                 prop_content:                this.executeSchemaPart(Schemas.BORDER_CONTENT.part),
                 prop_contentBackgroundColor: label.labelBackground,
                 prop_minWidth:               label.labelMinWidth,
             } as any,
             {
                 CLICK_BORDER: (event: Event) => {
                     this.executeMethod("CLICK", event, { IS_DISABLE: false });
                 },
             },
             {
                 // Plan 8.2.7/9.1 — identity: Step داخلی Label برای click
                 unique: (this as any)._COMPONENT_STEP?.click ?? undefined,
             },
         ).getElement();
      }


    /* ---------------------------------------------
       renderLabelContent — رندر Part BORDER_CONTENT
       section.position-relative + cursor: pointer + children [TITLE, TOOLTIP]
       (Legacy: templateFn_render_borderContent)
    --------------------------------------------- */
    protected renderLabelContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            styles: {
                cursor: "pointer",
            },
            className: [
                "position-relative",
            ],
            children: [
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TITLE.part),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLTIP.part),
            ],
        });
    }


    /* ---------------------------------------------
       renderLabelTitle — رندر Part BORDER_CONTENT_TITLE
       attrsBind: {for: prop_labelFor} — for-accessibility
       stylesBind: {...prop_labelStyle, color} + classBind
       فرزند <b> با fontSize واکنش‌گرا از SizeName سراسری
       (Legacy: templateFn_render_borderContentLabel)
    --------------------------------------------- */
    protected renderLabelTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_labelTitle = data?.["prop_labelTitle"] ?? bind.prop_labelTitle;
        const prop_labelFor   = data?.["prop_labelFor"]   ?? bind.prop_labelFor;
        const prop_labelStyle = data?.["prop_labelStyle"] ?? bind.prop_labelStyle;
        const prop_labelClass = data?.["prop_labelClass"] ?? bind.prop_labelClass;
        const prop_labelColor = data?.["prop_labelColor"] ?? bind.prop_labelColor;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            attrsBind: {
                for: prop_labelFor,
            },

            // reactive merge — prop_labelStyle یک Observable از Record است؛
            // spread کردن آن فلگ برند را کپی می‌کند ولی متدهای get/subscribe
            // (روی prototype) را نه → «observable.get is not a function».
            // راه‌حل: merge دو prop در یک Observable واحد با computed.
            stylesBind: CoreObservable.App.computed(
                (styleMap, color) => ({
                    ...(styleMap ?? {}),
                    ...(color != null ? { color } : {}),
                }),
                [prop_labelStyle, prop_labelColor],
                this.getScope(),
            ),
            classBind: [
                prop_labelClass,
            ],
            children: [
                CoreReactive.App.b({
                    stylesBind: {
                        fontSize: this.getStyleTitleFontSize(),
                    },
                    children: [
                        prop_labelTitle,
                    ],
                }),
            ],
        });
    }


    /* ---------------------------------------------
       renderLabelTooltip — رندر Part BORDER_CONTENT_TOOLTIP
       رندر شرطی: conditionWhen(prop_labelTooltipDescription != null)
       wrapper span (position از prop) با آیکون + popup CSS-only (:hover)
       (Legacy: templateFn_render_borderContentTooltip — بدون ComponentTooltipDescription)
    --------------------------------------------- */
    protected renderLabelTooltip(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_labelTooltipIcon        = data?.["prop_labelTooltipIcon"]        ?? bind.prop_labelTooltipIcon;
        const prop_labelTooltipDescription = data?.["prop_labelTooltipDescription"] ?? bind.prop_labelTooltipDescription;
        const prop_labelTooltipBackground  = data?.["prop_labelTooltipBackground"]  ?? bind.prop_labelTooltipBackground;
        const prop_labelTooltipColor       = data?.["prop_labelTooltipColor"]       ?? bind.prop_labelTooltipColor;
        const prop_labelTooltipPosition    = data?.["prop_labelTooltipPosition"]    ?? bind.prop_labelTooltipPosition;
        const prop_labelTooltipDirection   = data?.["prop_labelTooltipDirection"]   ?? bind.prop_labelTooltipDirection;

        // رندر شرطی — Legacy: if (desc == null) return null
        const tooltip = CoreObservable.App.computed(
            (desc, icon, bg, color, pos, dir, show) => {
                if (!show || desc == null) return null;

                // آیکون — data-only descriptor → widget
                const iconElement = UiCategory.UI.Simples.Icon(
                    {
                        prop_icon:       UiIcons.CreateIcon(icon ?? UiIcons.Src.SymbolExclumationSquare.Definition),
                        prop_iconStyles: { "top": "0" },
                    },
                    {},
                    {},
                ).getElement();

               // popup CSS-only — :hover روی wrapper (کلاس component-label-tooltip)
               // styleها مستقیم از مقدار فعلی propها (closure) — بدون API ناموجود observable
               const popup = CoreReactive.App.span({
                   className: ["component-label-tooltip-popup", dir === TooltipDirectionTypes.TOP ? "top" : "bottom"],
                   styles: {
                       "background-color": bg,
                       "color":            color,
                   },
                   children: [desc],
               });

               return CoreReactive.App.span({
                   className: ["component-label-tooltip"],
                   styles: {
                       // آفست عمودی آیکون — legacy: prop_iconPosition
                       "top": pos,
                   },
                   children: [iconElement, popup],
               });
           },
           [
               prop_labelTooltipIcon,
               prop_labelTooltipDescription,
               prop_labelTooltipBackground,
               prop_labelTooltipColor,
               prop_labelTooltipPosition,
               prop_labelTooltipDirection,
           ],
           this.getScope(),
       );

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [tooltip],
        });
    }


    /* ---------------------------------------------
       Tooltip CSS — popup CSS-only
       :hover روی wrapper → نمایش popup (بدون state/listener JS)
       RTL-safe: inset-inline-start (logical property) — نه left/right خام
    --------------------------------------------- */
    protected getTooltipCssCustom(elementId?: string): string {
        const selector = elementId ?? this.getPartId(Schemas.BORDER_CONTENT_TOOLTIP.part);
        return `
#${selector} .component-label-tooltip{
    position:      absolute;
    display:       inline-flex;
    inset-inline-end: 5px;
}
#${selector} .component-label-tooltip-popup{
    display:       none;
    position:      absolute;
    padding:       5px 8px;
    border-radius: 5px;
    white-space:   nowrap;
    z-index:       10;
}
#${selector} .component-label-tooltip-popup.bottom{
    top: 100%;
    inset-inline-start: 0;
}
#${selector} .component-label-tooltip-popup.top{
    bottom: 100%;
    inset-inline-start: 0;
}
#${selector} .component-label-tooltip:hover .component-label-tooltip-popup{
    display: inline-block;
}`;
    }


    /// ---------------------
    ///  Private Style Getters
    ///  الگوی Plan 12.1 §۰.۳ — هر متد یک CoreObservable.App.computed برمی‌گرداند
    /// ---------------------

    private getStyleTitleFontSize() {
        return CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }
}

export default ComponentLabel;