import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilConst      from "@/util_consts";
import * as UtilStyle      from "@/util_styles";
// --------------------------------
import {ComponentLabelBase}     from "./ComponentLabelBase";
import {createLabelStep}        from "./Step";
import {Schemas}                from "./Schemas";
import {MethodsConfigType}      from "./Methods";
import {PropsType, LabelGroup}   from "./Props";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentTooltipTrait}  from "../../traits/componentTooltipTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as ComponentBorder from "../componentBorder";
import * as ComponentMenuMore from "../componentMenuMore";


/**
 * ComponentLabel â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ (Plan 13.1.0)
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentLabel HAS-A ComponentBorder (Ù†Ù‡ IS-A)
 *   ComponentBorder Ù…Ù‡Ø§Ø¬Ø±Øªâ€ŒØ´Ø¯Ù‡ Ø¯Ø± renderLabelBorder Ø§Ø² Ø·Ø±ÛŒÙ‚ Ù…Ø³ØªÙ‚ÛŒÙ…
 *   new ComponentBorder.Component Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯ â€” Ù†Ù‡ new Ù…Ø³ØªÙ‚ÛŒÙ….
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (CLICK)
 *   identity â€” { unique?, emit?, events? }
 *
 * Ø§Ù„Ú¯ÙˆÛŒ ØªÙ‚Ø³ÛŒÙ…â€ŒØ¨Ù†Ø¯ÛŒ Ù…ØªØ¯Ù‡Ø§ (Ù…Ø·Ø§Ø¨Ù‚ Plan 12.1):
 *   - Ù‡Ø± render method ÙÙ‚Ø· Ø³Ø§Ø®ØªØ§Ø± â€” ØªÙ…Ø§Ù… styleÙ‡Ø§ÛŒ computed Ø¯Ø± Ù…ØªØ¯Ù‡Ø§ÛŒ private
 *   - Tooltip: Ø±Ù†Ø¯Ø± Ø´Ø±Ø·ÛŒ Ø¨Ø§ conditionWhen + popup CSS-only (Ø¨Ø¯ÙˆÙ† listener JS)
 *   - renderContentComponent = executeSchemaPart(BORDER) â€” Ù‚Ø±Ø§Ø±Ø¯Ø§Ø¯ 11.2 Â§Û².Ûµ (Plan 13.1.1)
 *   - prop_labelShow Ø¯Ø± renderLabelBorder Ø§Ø¹Ù…Ø§Ù„ Ù…ÛŒâ€ŒØ´ÙˆØ¯ â€” Ù…Ø³ÛŒØ± Ø±Ù†Ø¯Ø± BORDER ÛŒÚ©ØªØ§Ø³Øª
 *     (ÙÙ‚Ø· renderManagerComponent("part-label-border")) â€” Plan 13.1.1
 *
 * Plan 13.1.2 â€” Ø±ÙØ¹ Ø¨Ø§Ú¯â€ŒÙ‡Ø§ÛŒ Ø¨Ø­Ø±Ø§Ù†ÛŒ:
 *   - Tooltip parameter mismatch (desc/icon Ø¬Ø§Ø¨Ø¬Ø§ + show Ø¨Ø¯ÙˆÙ† observable) Ø§ØµÙ„Ø§Ø­ Ø´Ø¯
 *   - Composition Ø¨Ø§ ComponentFloatMenu (Ù…Ø«Ù„ legacy) â€” popup Ú©Ø§Ù…Ù„ Ø¨Ø§ ComponentBorder
 *   - Composition: new ComponentBorder.Component (Ù…Ø³ØªÙ‚ÛŒÙ… â€” Ø¨Ø¯ÙˆÙ† UiCategory)
 *
 * Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Behavior Ø§Ø² Legacy:
 *   - label Ù‚Ø§Ø¨Ù„â€ŒÚ©Ù„ÛŒÚ© â†’ CLICK method Ø±ÙˆÛŒ Border composition
 *   - binding Ø¨Ù‡ input Ø¨Ø§ for â†’ attrsBind: {for}
 *   - tooltip Ø´Ø±Ø·ÛŒ â†’ conditionWhen(prop_labelTooltipDescription != null)
 *   - fontSize ÙˆØ§Ú©Ù†Ø´â€ŒÚ¯Ø±Ø§ â†’ computed Ø±ÙˆÛŒ CoreConfig.Settings.SizeName
 */
export class ComponentLabel extends ComponentLabelBase<ReturnType<typeof createLabelStep>>{
    private _MENU_MORE: ComponentMenuMore.Component | null = null;


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
       Plan 8.2.7 â€” Component Disposal
       Tooltip Ø¨Ø¯ÙˆÙ† listener JS Ø§Ø³Øª â€” ÙÙ‚Ø· Event Tree Ù¾Ø§Ú© Ù…ÛŒâ€ŒØ´ÙˆØ¯
    --------------------------------------------- */
    dispose(): void {
        this._MENU_MORE?.dispose();
        this._MENU_MORE = null;
        this.disposeStep();
    }


   /* ---------------------------------------------
      Plan 13.1.1 â€” Ù‚Ø±Ø§Ø±Ø¯Ø§Ø¯ Û±Û±.Û² Â§Û².Ûµ:
      renderContentComponent ÙÙ‚Ø· Schema Ø§Ø®ØªØµØ§ØµÛŒ Ø§ÙˆÙ„ Ø±Ø§ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
      Ù‡Ø± Ù…Ù†Ø·Ù‚ Ø´Ø±Ø·ÛŒ/ØªØ²Ø¦ÛŒÙ†ÛŒ Ø¨Ù‡ Ø®ÙˆØ¯Ù SchemaÙ‡Ø§ Ù…Ù†ØªÙ‚Ù„ Ù…ÛŒâ€ŒØ´ÙˆØ¯
      (prop_labelShow â†’ renderLabelBorder).
   --------------------------------------------- */
   override renderContentComponent(
       attrsDefault: PartAttrDefault,
       data:         Record<string, CoreObservable.App<any>>,
       extra?:       any,
   ): CoreReactive.App {
       return this.executeSchemaPart(Schemas.BORDER.part, {});
   }


    /* ---------------------------------------------
      renderManagerComponent â€” Routing
      Plan 11.2 â€” COMPONENT + STRUCTURE Ø§Ø² TraitØŒ Ø¨Ù‚ÛŒÙ‡ Ø§Ø®ØªØµØ§ØµÛŒ
      Plan 13.1.1 â€” Ù…Ø³ÛŒØ± Ø±Ù†Ø¯Ø± BORDER ÛŒÚ©ØªØ§ Ø´Ø¯: STRUCTURE (Trait) â†’
      renderContentComponent â†’ executeSchemaPart(BORDER) â†’ Ù‡Ù…ÛŒÙ† switch.
      Ù…Ø³ÛŒØ± Ù…Ø³ØªÙ‚ÛŒÙ… renderContentComponent â†’ renderLabelBorder Ø­Ø°Ù Ø´Ø¯.
   --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema Ù¾Ø§ÛŒÙ‡ ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema Ø§Ø®ØªØµØ§ØµÛŒ ---
            case Schemas.BORDER.part:
                return this.renderLabelBorder(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT.part:
                return this.renderLabelContent(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TITLE.part:
                return this.renderLabelTitle(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_MENU_MORE.part:
                return this.renderLabelMenuMore(attrsDefault, data);
            case Schemas.BORDER_CONTENT_TOOLTIP.part:
                return this.renderLabelTooltip(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
      renderLabelBorder â€” Ø±Ù†Ø¯Ø± Part BORDER
      Composition: new ComponentBorder.Component (Ù…Ø³ØªÙ‚ÛŒÙ… â€” Ù…Ù‡Ø§Ø¬Ø±Øªâ€ŒØ´Ø¯Ù‡ Plan 12.1)
      + click â†’ this.executeMethod("CLICK", ...)

      Plan 13.1.1 â€” Ù…Ù†Ø·Ù‚ show Ø§Ø² renderContentComponent Ø¨Ù‡ Ø§ÛŒÙ†Ø¬Ø§ Ù…Ù†ØªÙ‚Ù„ Ø´Ø¯:
      prop_labelShow=false â†’ null (Ø±ÙØªØ§Ø± Legacy Ø­ÙØ¸ Ù…ÛŒâ€ŒØ´ÙˆØ¯) Ùˆ
      Ù‡Ø± Ø¯Ùˆ Ù…Ø³ÛŒØ± Ø±Ø³ÛŒØ¯Ù† Ø¨Ù‡ Ø§ÛŒÙ† Ù…ØªØ¯ (STRUCTUREâ†’contentâ†’executeSchemaPart Ùˆ
      renderManagerComponent Ù…Ø³ØªÙ‚ÛŒÙ…) Ø¯Ù‚ÛŒÙ‚Ø§Ù‹ ÛŒÚ© Ø±ÙØªØ§Ø± Ø¯Ø§Ø±Ù†Ø¯.

      Plan 13.1.2 â€” wrapper span Ù„Ø§Ø²Ù… Ø§Ø³Øª Ú†ÙˆÙ† computed Ø®Ø±ÙˆØ¬ÛŒ ClObservable Ø§Ø³Øª
      (Ù†Ù‡ ClReactiveElement) â€” span observable Ø±Ø§ Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† children Ù…ÛŒØ²Ø¨Ø§Ù†ÛŒ Ù…ÛŒâ€ŒÚ©Ù†Ø¯.

      Ù†Ú©ØªÙ‡ prop_labelRadius: ComponentBorder Ø¬Ø¯ÛŒØ¯ radius Ø±Ø§ Ø§Ø² SizeName Ø³Ø±Ø§Ø³Ø±ÛŒ
      Ù…Ø­Ø§Ø³Ø¨Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯ (prop Ø±ÙˆØ´ radius Ù†Ø¯Ø§Ø±Ø¯) â€” Ù¾Ø³ radius Ø§Ø®ØªØµØ§ØµÛŒ Label Ø§Ø² Ø·Ø±ÛŒÙ‚
      prop_borderStyles computed ØªØ²Ø±ÛŒÙ‚ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
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
          const radiusCornerProps = [
              data?.["prop_labelBorderTopLeftRadiusHas"] ?? bind.prop_labelBorderTopLeftRadiusHas,
              data?.["prop_labelBorderTopRightRadiusHas"] ?? bind.prop_labelBorderTopRightRadiusHas,
              data?.["prop_labelBorderBottomLeftRadiusHas"] ?? bind.prop_labelBorderBottomLeftRadiusHas,
              data?.["prop_labelBorderBottomRightRadiusHas"] ?? bind.prop_labelBorderBottomRightRadiusHas,
          ];
          const prop_labelMinWidth    = data?.["prop_labelMinWidth"]    ?? bind.prop_labelMinWidth;

          console.log("[DEBUG renderLabelBorder]", {
              prop_labelShow_value: CoreObservable.App.isObservable(prop_labelShow) ? prop_labelShow.get() : prop_labelShow,
              hasData: !!data,
              dataKeys: data ? Object.keys(data) : [],
          });

          // Plan 13.1.2 â€” computed Ø®Ø±ÙˆØ¬ÛŒ ClObservable Ø§Ø³Øª Ù†Ù‡ ClReactiveElementØ›
          // wrapper span Ù„Ø§Ø²Ù… Ø§Ø³Øª ØªØ§ observable Ø±Ø§ Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† children Ù…ÛŒØ²Ø¨Ø§Ù†ÛŒ Ú©Ù†Ø¯.
          // prop_labelShow=false â†’ children: [null] (Ù…Ø­ØªÙˆØ§ÛŒ Ø®Ø§Ù„ÛŒ) â€” Ø±ÙØªØ§Ø± Legacy Ø­ÙØ¸
          const borderElement = CoreObservable.App.computed(
              (show) => {
                  console.log("[DEBUG borderElement computed]", { show, willRender: !!show });
                  return show ? this.buildBorderElement(data, {
                      labelBackground: prop_labelBackground,
                      labelRadius:     prop_labelRadius,
                      radiusCornerProps,
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
         Plan 13.1.1 â€” buildBorderElement (private)
         Ø³Ø§Ø®Øª Composition Border â€” Ú©Ø¯ Plan 13.1.0 Ø¹ÛŒÙ†Ø§Ù‹ Ù…Ù†ØªÙ‚Ù„ Ø´Ø¯Ù‡
         (Ø¨Ø¯ÙˆÙ† ØªØºÛŒÛŒØ± Ø±ÙØªØ§Ø±): computed prop_borderStylesØŒ cast Ø§Ù„Ú¯ÙˆÛŒ Ù¾Ø±ÙˆÚ˜Ù‡ØŒ
         CLICK_BORDER delegateØŒ identity step.
      --------------------------------------------- */
      private buildBorderElement(
          data?: Record<string, CoreObservable.App<any>>,
          label?: {
              labelBackground: CoreObservable.App<any>;
              labelRadius:     CoreObservable.App<any>;
              radiusCornerProps: CoreObservable.App<any>[];
              labelMinWidth:   CoreObservable.App<any>;
          },
      ): CoreReactive.App {
   
          if (!label) return null as any;
   
          // ØªØ²Ø±ÛŒÙ‚ radius Ø§Ø®ØªØµØ§ØµÛŒ Label Ø¨Ù‡ Border (Ù‚Ø§Ø¨Ù„â€ŒÚ¯Ø³ØªØ±Ø´ Ø¨Ù‡ Ø§Ø³ØªØ§ÛŒÙ„â€ŒÙ‡Ø§ÛŒ Ø¯ÛŒÚ¯Ø±)
          const prop_borderStyles = CoreObservable.App.computed(
              (radius, topLeft, topRight, bottomLeft, bottomRight, sizeName) => {
                  const zero = UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL);
                  const resolvedRadius = radius == null ? zero : UtilStyle.Css_BorderRadius(radius);
                  return {
                      display: "flow-root",
                      height: UtilStyle.Css_SizeCalc(
                          UtilStyle.Css_Padding(sizeName) as any,
                          UtilConst.Operation.ADD,
                          UtilStyle.Css_Height(sizeName) as any,
                          UtilConst.Operation.ADD,
                          UtilStyle.Css_Padding(sizeName) as any,
                      ),
                      borderTopLeftRadius: UtilStyle.Style_Important(topLeft ? resolvedRadius : zero),
                      borderTopRightRadius: UtilStyle.Style_Important(topRight ? resolvedRadius : zero),
                      borderBottomLeftRadius: UtilStyle.Style_Important(bottomLeft ? resolvedRadius : zero),
                      borderBottomRightRadius: UtilStyle.Style_Important(bottomRight ? resolvedRadius : zero),
                      border: null as any,
                      borderStyle: "none",
                  };
              },
              [label.labelRadius, ...label.radiusCornerProps, CoreConfig.Settings.SizeName.observable()],
              this.getScope(),
          );
   
         // ØªØ²Ø±ÛŒÙ‚ propÙ‡Ø§ÛŒ Observable Ø®ÙˆØ¯ Label Ø¨Ù‡ config Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øª Border â€”
         // Ø¯Ø± runtimeØŒ #getReadyUserConfigAndDefaultConfig Ø®ÙˆØ¯Ø´ Observable Ø±Ø§
         // ØªØ´Ø®ÛŒØµ Ù…ÛŒâ€ŒØ¯Ù‡Ø¯ Ùˆ Ù…Ø³ØªÙ‚ÛŒÙ… Ø°Ø®ÛŒØ±Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯ (Â«if Observable â†’ store directlyÂ»)
         // Ù…Ø³ØªÙ‚ÛŒÙ… Ø§Ø² ComponentBorder.Component â€” Ø¨Ø¯ÙˆÙ† ÙˆØ§Ø¨Ø³ØªÚ¯ÛŒ Ø¨Ù‡ UiCategory
         return new ComponentBorder.Component(
             {
                 prop_borderClass:            ["position-relative", "px-2"],
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
                 // Plan 8.2.7/9.1 â€” identity: Step Ø¯Ø§Ø®Ù„ÛŒ Label Ø¨Ø±Ø§ÛŒ click
                 unique: (this as any)._COMPONENT_STEP?.click ?? undefined,
             },
         ).getReactiveElement() as CoreReactive.App;
      }


    /* ---------------------------------------------
       renderLabelContent â€” Ø±Ù†Ø¯Ø± Part BORDER_CONTENT
       section.position-relative + cursor: pointer + children [TITLE, MENU_MORE, TOOLTIP]
       (Legacy: templateFn_render_borderContent)

       Plan 13.1.3 â€” Ø¨Ø§Ø²Ú¯Ø´Øª Ø¨Ù‡ layout legacy:
       tooltip Ù†Ø¨Ø§ÛŒØ¯ ÙˆØ§Ø±Ø¯ flow Ù…ØªÙ† Ø´ÙˆØ¯Ø› Ø®ÙˆØ¯ schema tooltip absolute Ù…ÛŒâ€ŒØ´ÙˆØ¯.
    --------------------------------------------- */
    protected renderLabelContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const sizeName = CoreConfig.Settings.SizeName.observable();
        const contentHeight = CoreObservable.App.computed(
            (size: UtilConst.Sizes) => UtilStyle.Css_SizeCalc(
                UtilStyle.Css_Padding(size) as any,
                UtilConst.Operation.ADD,
                UtilStyle.Css_Height(size) as any,
                UtilConst.Operation.ADD,
                UtilStyle.Css_Padding(size) as any,
            ),
            [sizeName],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            stylesBind: {
                height: contentHeight,
            },
            styles: {
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                width: "100%",
                minWidth: "0",
            },
            className: [
                "position-relative",
            ],
            children: [
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TITLE.part),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_MENU_MORE.part),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLTIP.part),
            ],
        });
    }


    protected renderLabelMenuMore(
        attrsDefault?: PartAttrDefault,
        data?: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const groups = data?.["prop_labelGroups"] ?? bind.prop_labelGroups;
        const selected = data?.["prop_labelGroupSelected"] ?? bind.prop_labelGroupSelected;
        const selectedGroupId = CoreObservable.App.computed(
            (groupList: LabelGroup[] | null, selectedId: string | null) => {
                const availableGroups = Array.isArray(groupList) ? groupList : [];
                if (availableGroups.length === 0) return null;
                if (availableGroups.some((group) => group.id === selectedId)) return selectedId;
                this.set("prop_labelGroupSelected", availableGroups[0].id);
                return availableGroups[0].id;
            },
            [groups, selected],
            this.getScope(),
        );
        const selectedGroupTitle = CoreObservable.App.computed(
            (groupList: LabelGroup[] | null, selectedId: string | null) => {
                const availableGroups = Array.isArray(groupList) ? groupList : [];
                const selectedGroup = availableGroups.find((group) => group.id === selectedId) ?? availableGroups[0];
                return selectedGroup?.title ?? "";
            },
            [groups, selectedGroupId],
            this.getScope(),
        );
        const displayItems = CoreObservable.App.computed(
            (groupList: LabelGroup[] | null) => {
                const availableGroups = Array.isArray(groupList) ? groupList : [];
                if (availableGroups.length === 0) return [];
                return [{
                    id: "label-group-selector",
                    // Keep the menu tree stable while selection changes. The title
                    // observable updates the existing trigger instead of rebuilding
                    // and disposing every floating menu in ComponentMenuMore.
                    title: selectedGroupTitle as any,
                    openOn: "click" as const,
                    children: availableGroups,
                }];
            },
            [groups],
            this.getScope(),
        );
        return CoreObservable.App.conditionWhen(
            [groups],
            (groupList: LabelGroup[] | null) => Array.isArray(groupList) && groupList.length > 0,
            () => {
                if (!this._MENU_MORE) {
                    this._MENU_MORE = new ComponentMenuMore.Component(
                        {
                            prop_orientation: ComponentMenuMore.MenuMoreOrientation.HORIZONTAL,
                            prop_isFullWidth: false,
                            prop_items: displayItems as any,
                            prop_menuBorder: false,
                            styles: {
                                display: "flex",
                                alignItems: "center",
                                width: "fit-content",
                                maxWidth: "100%",
                                minWidth: "0",
                                flex: "0 0 auto",
                            },
                        } as any,
                        {
                            SELECT_ITEM: (event, dataArgs) => {
                                event.stopPropagation();
                                const item = dataArgs?.ITEM as ComponentMenuMore.MenuMoreItem | undefined;
                                if (!item) return;
                                const availableGroups = groups.get() as LabelGroup[] | null;
                                const selectedGroup = availableGroups?.find((group) => group.id === item.id);
                                if (!selectedGroup) return;
                                const previousGroupId = selected.get() as string | null;
                                this.set("prop_labelGroupSelected", selectedGroup.id);
                                if (previousGroupId !== selectedGroup.id) {
                                    this.executeMethod("CHANGE_GROUP", event, { GROUP: selectedGroup });
                                }
                                this.executeMethod("SELECT_MENU_ITEM", event, {
                                    ITEM: selectedGroup,
                                    PARENT: dataArgs?.PARENT ?? null,
                                });
                            },
                        } as any,
                    );
                }

                return CoreReactive.App.section({
                    attrs: { ...attrsDefault },
                    styles: {
                        position: "absolute",
                        top: "50%",
                        transform: "translate(0px, -50%)",
                        right: "calc(var(--paddingMedium) + var(--heightMedium) + var(--paddingMedium) + 2.5%)",
                        zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_position)),
                    },
                    on: { click: (event: Event) => event.stopPropagation() },
                    children: [this._MENU_MORE.getReactiveElement() as CoreReactive.App],
                });
            },
            () => null,
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderLabelTitle â€” Ø±Ù†Ø¯Ø± Part BORDER_CONTENT_TITLE
       attrsBind: {for: prop_labelFor} â€” for-accessibility
       stylesBind: {...prop_labelStyle, color} + classBind
       ÙØ±Ø²Ù†Ø¯ <b> Ø¨Ø§ fontSize ÙˆØ§Ú©Ù†Ø´â€ŒÚ¯Ø±Ø§ Ø§Ø² SizeName Ø³Ø±Ø§Ø³Ø±ÛŒ
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

            // reactive merge â€” prop_labelStyle ÛŒÚ© Observable Ø§Ø² Record Ø§Ø³ØªØ›
            // spread Ú©Ø±Ø¯Ù† Ø¢Ù† ÙÙ„Ú¯ Ø¨Ø±Ù†Ø¯ Ø±Ø§ Ú©Ù¾ÛŒ Ù…ÛŒâ€ŒÚ©Ù†Ø¯ ÙˆÙ„ÛŒ Ù…ØªØ¯Ù‡Ø§ÛŒ get/subscribe
            // (Ø±ÙˆÛŒ prototype) Ø±Ø§ Ù†Ù‡ â†’ Â«observable.get is not a functionÂ».
            // Ø±Ø§Ù‡â€ŒØ­Ù„: merge Ø¯Ùˆ prop Ø¯Ø± ÛŒÚ© Observable ÙˆØ§Ø­Ø¯ Ø¨Ø§ computed.
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
       renderLabelTooltip â€” Ø±Ù†Ø¯Ø± Part BORDER_CONTENT_TOOLTIP
       Plan 13.1.5 â€” Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ø¨Ù‡ ComponentTooltipTrait
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
    ///  Ø§Ù„Ú¯ÙˆÛŒ Plan 12.1 Â§Û°.Û³ â€” Ù‡Ø± Ù…ØªØ¯ ÛŒÚ© CoreObservable.App.computed Ø¨Ø±Ù…ÛŒâ€ŒÚ¯Ø±Ø¯Ø§Ù†Ø¯
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
