import * as UiComponents   from "@/ui_components";
import * as CoreComponents from "@/core_components";
// --------------------------------
import {ComponentExampleDefinition} from "@/core_components";
import {TComponentDefinition as ComponentDefinition} from "../../basic/types/TComponentDefinition";


/**
 * Component Manager — ثبت، کشف و مدیریت Componentها بدون instantiate کردن
 *
 * مسئولیت:
 *   - ثبت Component Definition (Metadata)
 *   - ثبت Examples هر Component
 *   - کشف Componentها بر اساس id / name / category
 *   - دسترسی به Props / Schemas / Methods / Examples بدون اجرای Runtime
 *
 * Component Manager خودش Component را render نمی‌کند.
 * برای render از ExampleRenderer استفاده می‌کند.
 *
 * @example
 *   ComponentManager.register({
 *       definition: ButtonDefinition,
 *       props:      ButtonProps,
 *       schemas:    ButtonSchemas,
 *       methods:    ButtonMethods,
 *       examples:   ButtonExamples,
 *       constructor: ComponentButton,
 *   });
 *
 *   ComponentManager.get("component_button");           // → RegistryEntry
 *   ComponentManager.getExamples("component_button");   // → Example[]
 *   ComponentManager.list();                            // → RegistryEntry[]
 */
export const ComponentManager = {

    /** Registry داخلی — Map از id به RegistryEntry */
    _registry: new Map<string, ComponentRegistryEntry>(),


    /**
     * ثبت یک Component در Registry
     *
     * @param entry - شامل Definition, Props, Schemas, Methods, Examples, Constructor
     */
    register(entry: ComponentRegistryEntry): void {
        if (this._registry.has(entry.definition.id)) {
            console.warn(
                `[ComponentManager] Component "${entry.definition.id}" already registered — overwriting`
            );
        }
        this._registry.set(entry.definition.id, entry);
    },


    /**
     * دریافت Registry Entry بر اساس Component id
     *
     * @param id - شناسه Component (مثلاً "component_button")
     * @returns RegistryEntry یا undefined
     */
    get(id: string): ComponentRegistryEntry | undefined {
        return this._registry.get(id);
    },


    /**
     * بررسی وجود Component در Registry
     */
    has(id: string): boolean {
        return this._registry.has(id);
    },


    /**
     * لیست تمام Componentهای ثبت‌شده
     */
    list(): ComponentRegistryEntry[] {
        return Array.from(this._registry.values());
    },


    /**
     * دریافت Examples یک Component
     *
     * @param id - شناسه Component
     * @returns آرایه Example Definitions یا []
     */
    getExamples(id: string): ComponentExampleDefinition[] {
        const entry = this._registry.get(id);
        if (!entry?.examples) return [];
        return Object.values(entry.examples);
    },


    /**
     * دریافت یک Example خاص از یک Component
     *
     * @param id          - شناسه Component
     * @param exampleId   - شناسه Example
     * @returns Example Definition یا undefined
     */
    getExample(id: string, exampleId: string): ComponentExampleDefinition | undefined {
        const entry = this._registry.get(id);
        if (!entry?.examples) return undefined;
        return entry.examples[exampleId];
    },


    /**
     * پاک کردن Registry (برای تست)
     */
    clear(): void {
        this._registry.clear();
    },


    /**
     * تعداد Componentهای ثبت‌شده
     */
    get size(): number {
        return this._registry.size;
    },

};


/**
 * Registry Entry — تمام Metadata یک Component
 *
 * این Entry بدون instantiate کردن Component قابل خواندن است.
 * Component Manager از این Entry برای نمایش اطلاعات Component استفاده می‌کند.
 */
export interface ComponentRegistryEntry {

    /** شناسنامه Component — id, name, version, category */
    definition:  ComponentDefinition;

    /** Props تعریفی Component (declarative — بدون Runtime) */
    props?:      Record<string, any>;

    /** Schemas تعریفی Component (declarative — part + props) */
    schemas?:    Record<string, any>;

    /** Methods تعریفی Component (declarative) */
    methods?:    Record<string, any>;

    /** Examples تعریفی Component (declarative — بدون Runtime) */
    examples?:   Record<string, ComponentExampleDefinition>;

    /** Constructor کلاس Component (برای render با ExampleRenderer) */
    constructor?: CoreComponents.ExampleRendererComponentConstructor;

}
