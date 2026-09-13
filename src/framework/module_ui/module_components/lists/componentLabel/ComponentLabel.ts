import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
// --------------------------------
import {ComponentLabelBase}     from "./ComponentLabelBase";
import {createLabelStep}        from "./Step";
import {Schemas}                from "./Schemas";
import {MethodsConfigType}      from "./Methods";
import {PropsType}              from "./Props";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentTooltipTrait}  from "../../traits/componentTooltipTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as ComponentBorder from "../componentBorder";


/**
 * ComponentLabel — کلاس نهایی (Plan 13.1.0)
 *
 * معماری Composition:
 *   ComponentLabel HAS-A ComponentBorder (نه IS-A)
 *   ComponentBorder مهاجرت‌شده در renderLabelBorder از طریق مستقیم
 *   new ComponentBorder.Component ساخته می‌شود — نه new مستقیم.
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
 * Plan 13.1.2 — رفع باگ‌های بحرانی:
 *   - Tooltip parameter mismatch (desc/icon جابجا + show بدون observable) اصلاح شد
 *   - Composition با ComponentFloatMenu (مثل legacy) — popup کامل با ComponentBorder
 *   - Composition: new ComponentBorder.Component (مستقیم — بدون UiCategory)
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
      Composition: new ComponentBorder.Component (مستقیم — مهاجرت‌شده Plan 12.1)
      + click → this.executeMethod("CLICK", ...)

      Plan 13.1.1 — منطق show از renderContentComponent به اینجا منتقل شد:
      prop_labelShow=false → null (رفتار Legacy حفظ می‌شود) و
      هر دو مسیر رسیدن به این متد (STRUCTURE→content→executeSchemaPart و
      renderManagerComponent مستقیم) دقیقاً یک رفتار دارند.

      Plan 13.1.2 — wrapper span لازم است چون computed خروجی ClObservable است
      (نه ClReactiveElement) — span observable را به‌عنوان children میزبانی می‌کند.

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

          console.log("[DEBUG renderLabelBorder]", {
              prop_labelShow_value: CoreObservable.App.isObservable(prop_labelShow) ? prop_labelShow.get() : prop_labelShow,
              hasData: !!data,
              dataKeys: data ? Object.keys(data) : [],
          });

          // Plan 13.1.2 — computed خروجی ClObservable است نه ClReactiveElement؛
          // wrapper span لازم است تا observable را به‌عنوان children میزبانی کند.
          // prop_labelShow=false → children: [null] (محتوای خالی) — رفتار Legacy حفظ
          const borderElement = CoreObservable.App.computed(
              (show) => {
                  console.log("[DEBUG borderElement computed]", { show, willRender: !!show });
                  return show ? this.buildBorderElement(data, {
                      labelBackground: prop_labelBackground,
                      labelRadius:     prop_labelRadius,
                      labelMinWidth:   prop_labelMinWidth,
                  }) : null;
              },
              [prop_labelShow],
              this.getScope(),
          );

          console.log("[DEBUG borderElement after creation]", {
              value: borderElement.get(),
              isReactiveElement: borderElement.get() && typeof borderElement.get().getReactiveElement === "function",
          });

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
         // مستقیم از ComponentBorder.Component — بدون وابستگی به UiCategory
         return new ComponentBorder.Component(
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
         ).getReactiveElement() as CoreReactive.App;
      }


    /* ---------------------------------------------
       renderLabelContent — رندر Part BORDER_CONTENT
       section.position-relative + cursor: pointer + children [TITLE, TOOLTIP]
       (Legacy: templateFn_render_borderContent)

       Plan 13.1.3 — بازگشت به layout legacy:
       tooltip نباید وارد flow متن شود؛ خود schema tooltip absolute می‌شود.
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

        console.log("[DEBUG renderLabelTitle]", {
            hasData: !!data,
            dataKeys: data ? Object.keys(data) : [],
            prop_labelTitle,
            isObservable: CoreObservable.App.isObservable(prop_labelTitle),
            value: CoreObservable.App.isObservable(prop_labelTitle) ? prop_labelTitle.get() : prop_labelTitle,
        });

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
       Plan 13.1.5 — استخراج به ComponentTooltipTrait
    --------------------------------------------- */
    protected renderLabelTooltip(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        return ComponentTooltipTrait.renderTooltip(this, attrsDefault as PartAttrDefault, {
            tooltipIcon:         data?.["prop_labelTooltipIcon"]        ?? bind.prop_labelTooltipIcon,
            tooltipDescription:  data?.["prop_labelTooltipDescription"] ?? bind.prop_labelTooltipDescription,
            tooltipBackground:   data?.["prop_labelTooltipBackground"]  ?? bind.prop_labelTooltipBackground,
            tooltipColor:        data?.["prop_labelTooltipColor"]       ?? bind.prop_labelTooltipColor,
            tooltipIconPosition: data?.["prop_labelTooltipPosition"]    ?? bind.prop_labelTooltipPosition,
            tooltipDirection:    data?.["prop_labelTooltipDirection"]   ?? bind.prop_labelTooltipDirection,
        });
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