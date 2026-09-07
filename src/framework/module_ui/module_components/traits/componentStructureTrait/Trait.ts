import * as CoreReactive    from "@/core_reactive";
import * as CoreObservable  from "@/core_observable";
import * as CoreConfigs     from "@/core_configs";
import * as CoreComponents  from "@/core_components";
// --------------------------------
import {Props   as StructureProps}   from "../../lists/componentStructure/Props";
import {Schemas as StructureSchemas} from "../../lists/componentStructure/Schemas";
import {PartAttrDefault}             from "@/core_components";


/**
 * ComponentStructureTrait
 *
 * Shared Capability برای Componentهایی که از ComponentStructure به‌عنوان
 * wrapper اصلی استفاده می‌کنند.
 *
 * Trait چهار چیز ارائه می‌دهد:
 *   1. props   — propهای پایه ComponentStructure (برای merge در _COMPONENT_PATTERN)
 *   2. schemas — schemaهای پایه COMPONENT + STRUCTURE (برای merge در _COMPONENT_SCHEMA)
 *   3. renderComponentSchema — رندر لایه خارجی <component-{name}>
 *   4. renderStructureSchema — رندر لایه داخلی <section> با show/hide
 *
 * Plan 11.2 — renderContent منسوخ شد. به‌جای آن، Componentها از schemas +
 * renderComponentSchema + renderStructureSchema استفاده می‌کنند.
 *
 * قوانین (Plan 8.1.2):
 *   - Trait کلاس نیست
 *   - Trait State ندارد
 *   - Trait Event ندارد
 *   - Trait Lifecycle ندارد
 *   - Trait Registry ندارد
 *   - Trait از Public API استفاده می‌کند (getObservable)
 *   - Silent Failure ممنوع — Missing required prop باید throw کند
 */
export const ComponentStructureTrait = {

    /**
     * Props پایه ComponentStructure
     * برای merge در _COMPONENT_PATTERN کامپوننت مصرف‌کننده:
     *
     *   protected _COMPONENT_PATTERN = CoreComponents.DefineProp({
     *       ...ComponentStructureTrait.props,
     *       ...Props,
     *   } as any);
     */
    props: StructureProps,


    /**
     * Schemaهای پایه ComponentStructure (COMPONENT + STRUCTURE)
     * برای merge در _COMPONENT_SCHEMA کامپوننت مصرف‌کننده:
     *
     *   protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema({
     *       ...ComponentStructureTrait.schemas,   // ← COMPONENT + STRUCTURE (اول)
     *       ...Schemas,                           // ← schemaهای اختصاصی (بعد)
     *   } as any);
     *
     * Plan 11.2 — ترتیب Object Keys مهم است:
     *   COMPONENT و STRUCTURE باید قبل از schemaهای اختصاصی باشند
     *   تا ClComponentBase.createComponentElement() آن‌ها را به‌عنوان Root رندر کند.
     */
    schemas: StructureSchemas,


    /**
     * رندر لایه خارجی <component-{name}> با RTL + classList + styles
     * children: STRUCTURE
     *
     * @param component    — Component instance (this)
     * @param attrsDefault — attributeهای پیش‌فرض از executeSchemaPart
     * @param data         — observableهای این part
     * @returns CoreReactive.App
     *
     * استفاده در renderManagerComponent:
     *   case ComponentStructureTrait.schemas.COMPONENT.part:
     *       return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
     */
    renderComponentSchema(
        component:    CoreComponents.App<any, any, any, any>,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {

        const rtl =
            CoreConfigs.Settings.DirectionRtl.observable();

        const classList =
            data?.classList ??
            new CoreObservable.App([]);

        const styles =
            data?.styles ??
            new CoreObservable.App({});

        const componentName = (component as any)._COMPONENT_NAME;

        return CoreReactive.App.component(
            componentName,
            {
                attrs: {
                    ...attrsDefault,
                },
                classBind: [
                    classList,
                ],
                stylesBind: {
                    direction: rtl.mapBoolean("rtl", "ltr"),
                    styles:    styles,
                },
                children: [
                    component.executeSchemaPart(
                        StructureSchemas.STRUCTURE.part,
                    ),
                ],
            }
        );
    },


    /**
     * رندر لایه داخلی <section> با show/hide + structureClass + structureStyles
     * children: renderContentComponent()
     *
     * @param component    — Component instance (this)
     * @param attrsDefault — attributeهای پیش‌فرض از executeSchemaPart
     * @param data         — observableهای این part
     * @returns CoreReactive.App
     *
     * استفاده در renderManagerComponent:
     *   case ComponentStructureTrait.schemas.STRUCTURE.part:
     *       return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
     */
    renderStructureSchema(
        component:    CoreComponents.App<any, any, any, any>,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {

        const prop_show =
            data?.prop_show ??
            new CoreObservable.App(true);

        const prop_structureClass =
            data?.prop_structureClass ??
            new CoreObservable.App([]);

        const prop_structureStyles =
            data?.prop_structureStyles ??
            new CoreObservable.App({});

        return CoreReactive.App.component(
            "structure",
            {
                classBind: [
                    prop_structureClass,
                    prop_show.mapBoolean("show", "d-none"),
                ],
                attrs: {
                    ...attrsDefault,
                },
                stylesBind: {
                    prop_structureStyles,
                },
                children: [
                    (component as any).renderContentComponent(undefined as any, undefined as any, undefined as any),
                ],
            }
        );
    },

};
