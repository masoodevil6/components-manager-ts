import * as CoreReactive    from "@/core_reactive";
import * as CoreComponents  from "@/core_components";
// --------------------------------
import {Props as StructureProps} from "../../lists/componentStructure/Props";
import {ComponentStructure}      from "../../lists/componentStructure/ComponentStructure";


/**
 * ComponentStructureTrait
 *
 * Shared Capability برای Componentهایی که از ComponentStructure به‌عنوان
 * wrapper اصلی استفاده می‌کنند.
 *
 * Trait فقط دو چیز ارائه می‌دهد:
 *   1. props  — propهای پایه ComponentStructure (برای merge در _COMPONENT_PATTERN)
 *   2. renderContent — ساخت ComponentStructure با content اختصاصی
 *
 * قوانین (Plan 8.1.2):
 *   - Trait کلاس نیست
 *   - Trait State ندارد
 *   - Trait Event ندارد
 *   - Trait Lifecycle ندارد
 *   - Trait Registry ندارد
 *   - Trait از Public API استفاده می‌کند (getObservable)
 *   - Silent Failure ممنوع — Missing required prop باید throw کند
 *
 * قرارداد خروجی (Plan 8.1.3):
 *   - ComponentStructure.create() یک CoreReactive.App برمی‌گرداند
 *   - Trait wrapper اضافی ایجاد نمی‌کند — خروجی create() مستقیم برمی‌گردد
 *   - Trait مجاز نیست HTMLElement را خودش به Reactive App تبدیل یا wrap کند
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
     * ساخت ComponentStructure با content اختصاصی
     *
     * @param component — Component instance (this)
     * @param content   — callback محتوای اختصاصی Component
     * @returns CoreReactive.App — مستقیم ComponentStructure (بدون wrapper اضافی)
     *
     * استفاده:
     *   override renderContentComponent() {
     *       return ComponentStructureTrait.renderContent(this, () => this.renderIcon());
     *   }
     *
     * Error Contract:
     *   اگر propهای پایه در _COMPONENT_PATTERN ثبت نشده باشند،
     *   خطای صریح throw می‌شود — نه silent fallback.
     */
    renderContent(
        component: CoreComponents.App<any, any, any, any>,
        content:   () => CoreReactive.App,
    ): CoreReactive.App {

        const classList            = component.getObservable("classList");
        const styles               = component.getObservable("styles");
        const prop_show            = component.getObservable("prop_show");
        const prop_structureClass  = component.getObservable("prop_structureClass");
        const prop_structureStyles = component.getObservable("prop_structureStyles");

        // Error Contract — Missing required prop باید صریح باشد
        if (!classList) {
            throw new Error(
                "[ComponentStructureTrait] Missing required prop: classList — " +
                "Component must include ComponentStructureTrait.props in _COMPONENT_PATTERN",
            );
        }
        if (!styles) {
            throw new Error(
                "[ComponentStructureTrait] Missing required prop: styles — " +
                "Component must include ComponentStructureTrait.props in _COMPONENT_PATTERN",
            );
        }
        if (!prop_show) {
            throw new Error(
                "[ComponentStructureTrait] Missing required prop: prop_show — " +
                "Component must include ComponentStructureTrait.props in _COMPONENT_PATTERN",
            );
        }
        if (!prop_structureClass) {
            throw new Error(
                "[ComponentStructureTrait] Missing required prop: prop_structureClass — " +
                "Component must include ComponentStructureTrait.props in _COMPONENT_PATTERN",
            );
        }
        if (!prop_structureStyles) {
            throw new Error(
                "[ComponentStructureTrait] Missing required prop: prop_structureStyles — " +
                "Component must include ComponentStructureTrait.props in _COMPONENT_PATTERN",
            );
        }

        // ComponentStructure.create() طبق Output Contract یک CoreReactive.App برمی‌گرداند.
        // Trait فقط یک bridge/capability است — مالک خروجی نیست و wrapper ایجاد نمی‌کند.
        //
        // Observableها مستقیم پاس می‌شوند (نه .get()) تا reactive binding حفظ شود.
        // renderComponent در ClComponentBase تشخیص می‌دهد value یک Observable است و
        // مستقیم در _COMPONENT_PROPS_BIND قرار می‌دهد — نه اینکه در Observable جدید wrap کند.
        return ComponentStructure.create({
            classList:            classList,
            styles:               styles,
            prop_show:            prop_show,
            prop_structureClass:  prop_structureClass,
            prop_structureStyles: prop_structureStyles,
            content,
        });
    },

};
