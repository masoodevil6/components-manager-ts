import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentIconBase}      from "./ComponentIconBase";
import {Schemas}                from "./Schemas";
import {MethodsType,
        MethodsConfigType}      from "./Methods";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as IconPropsConfigType} from "./Props";
import {createIconStep}                   from "./Step";


/**
 * ComponentIcon â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentIcon HAS-A ComponentStructure (Ù†Ù‡ IS-A)
 *   ComponentStructure Ø¯Ø± renderContentComponent Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ content Ø¢Ù† = renderIcon (Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ ComponentIcon)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ (classList, prop_show, ...) + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (prop_icon, ...)
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (CLICK, HOVER, BLUR)
 *   identity â€” { unique?, emit?, events? }
 *
* Ù‡Ø± prop Ø¯Ø± config Ù…ÛŒâ€ŒØªÙˆØ§Ù†Ø¯ Ù…Ù‚Ø¯Ø§Ø± Ø®Ø§Ù… ÛŒØ§ Observable Ø¨Ø§Ø´Ø¯ (PropsConfigType) â€”
* Ù…Ø¹Ù…Ø§Ø±ÛŒ renderComponent Ù‡Ø± Ø¯Ùˆ Ø±Ø§ Ù…ÛŒâ€ŒÙ¾Ø°ÛŒØ±Ø¯ (if Observable â†’ store directly).
* Ø§ÛŒÙ† Ø§Ù…Ú©Ø§Ù† Component ÙˆØ§Ù„Ø¯ (Ù…Ø«Ù„ ComponentButton) Ø±Ø§ Ù…ÛŒâ€ŒØ¯Ù‡Ø¯ propÙ‡Ø§ Ø±Ø§ Ø¨Ù‡â€ŒØµÙˆØ±Øª
* Observable Ø§Ø² _COMPONENT_PROPS_BIND Ø®ÙˆØ¯Ø´ Ø¨Ù‡â€ŒØ·ÙˆØ± reactive forward Ú©Ù†Ø¯.
*
 * Plan 8.2.7 â€” Step Ø¯Ø§Ø®Ù„ÛŒ Ø¯Ø± constructor Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯ (Ù†Ù‡ Ø¯Ø± render cycle).
 *   Ù‡Ø± Instance Step Ø®ÙˆØ¯Ø´ Ø±Ø§ Ø¯Ø§Ø±Ø¯ (createIconStep factory) â€” identity ÛŒÚ©ØªØ§ØŒ
 *   ØªØ¯Ø§Ø®Ù„ Ø¯Ø± registerEmit Ø±ÙØ¹ Ø´Ø¯.
 *   Base Ø¯Ø± constructor Ø§Ø² Ø·Ø±ÛŒÙ‚ CoreEvent.SubEvent Ø¢Ù† Ø±Ø§ Ø¨Ù‡ Parent Step Ù…ØªØµÙ„ Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
 *
 * Plan 9.1 â€” Event Scope Ownership:
 *   Ù‡Ø± ComponentIcon Ù…Ø§Ù„Ú© Step Instance Ø®ÙˆØ¯Ø´ Ø§Ø³Øª.
 *   disposal ÙÙ‚Ø· Event resources Ù…ØªØ¹Ù„Ù‚ Ø¨Ù‡ Ù‡Ù…ÛŒÙ† Component Ø±Ø§ Ø¢Ø²Ø§Ø¯ Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
 *
 * Plan 8.2.10 â€” renderContentComponent Ø§Ø² Trait Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯:
 *   ComponentStructureTrait.renderContent(this, () => this.renderIcon())
 *   Trait Ù†Ø§Ù… Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øª Ø±Ø§ Ø§Ø² this._COMPONENT_NAME Ù…ÛŒâ€ŒØ®ÙˆØ§Ù†Ø¯ Ùˆ Ø¨Ù‡
 *   ComponentStructure.create(componentName, ...) Ù¾Ø§Ø³ Ù…ÛŒâ€ŒØ¯Ù‡Ø¯.
 *   Ø®Ø±ÙˆØ¬ÛŒ: <component-icon><section>...</section></component-icon>
 */
 export class ComponentIcon extends ComponentIconBase<ReturnType<typeof createIconStep>>{

  constructor(
     config?:  Partial<StructurePropsType & IconPropsConfigType>,
      methods?: MethodsConfigType<ComponentIcon>,
      identity?: {
          unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createIconStep();
        super("icon", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }



    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ICON.part);
    }


    /* ---------------------------------------------
       renderManagerComponent â€” Routing
       Plan 11.2 â€” COMPONENT + STRUCTURE Ø§Ø² TraitØŒ Ø¨Ù‚ÛŒÙ‡ Ø§Ø®ØªØµØ§ØµÛŒ
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra:        any,
    ): CoreReactive.App {
        switch (partName) {
            // --- Plan 11.2: Schema Ù¾Ø§ÛŒÙ‡ ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema Ø§Ø®ØªØµØ§ØµÛŒ ---
            case Schemas.ICON.part:
                return this.renderIcon(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    protected renderIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const prop_icon       = data?.["prop_icon"]       ?? this._COMPONENT_PROPS_BIND.prop_icon;
        const prop_iconTitle  = data?.["prop_iconTitle"]  ?? this._COMPONENT_PROPS_BIND.prop_iconTitle;
        const prop_iconClass  = data?.["prop_iconClass"]  ?? this._COMPONENT_PROPS_BIND.prop_iconClass;
        const prop_iconStyles = data?.["prop_iconStyles"] ?? this._COMPONENT_PROPS_BIND.prop_iconStyles;

        return CoreReactive.App.i({
            attrs: {
                ...attrsDefault,
            },
            attrsBind: {
                title: prop_iconTitle,
            },
            styles: {
                outline: "none",
            },
            stylesBind: prop_iconStyles,
            classBind: [
                prop_iconClass,
            ],
            unique: this._COMPONENT_STEP?.click,
            emit: (request) => {
                return { value: prop_icon.get(), valid: true };
            },
            on: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("CLICK", event, {});
                },
                // hover/blur: DOM â†’ Method API (Ø¨Ø¯ÙˆÙ† Event Engine routing)
                mouseenter: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("HOVER", event, {});
                },
                mouseleave: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("BLUR", event, {});
                },
            },
            children: [
                prop_icon,
            ],
        });
    }

}
