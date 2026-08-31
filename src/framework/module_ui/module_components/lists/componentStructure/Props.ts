import type {ComponentPropConfig} from "@/core_components";

/**
 * Props اختصاصی ComponentStructure
 *
 * این Props به مستندات و Registry اختصاص دارد،
 * ولی کلاس ComponentStructure در فایل اصلی تعریف می‌شود.
 */
export type ComponentStructureProps = ComponentPropConfig & {

    /** classList — کلاس‌های Reactive لایه خارجی */
    classList?: string[] | null;

    /** styles — استایل‌های Reactive لایه خارجی */
    styles?: Record<string, string> | null;

    /** structureClass — کلاس‌های Reactive لایه Structure */
    structureClass?: string[] | null;

    /** structureStyles — استایل‌های Reactive لایه Structure */
    structureStyles?: Record<string, string> | null;

    /** content — Composition Point — محتوای داخل Structure */
    content?: (() => any) | null;

};