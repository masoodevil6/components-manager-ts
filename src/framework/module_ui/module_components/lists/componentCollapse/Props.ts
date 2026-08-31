import type {ComponentPropConfig} from "@/core_components";

export type ComponentCollapseProps = ComponentPropConfig & {

    /** open — وضعیت اولیه باز بودن (رشته یا Observable) */
    open?: boolean | null;

    /** headerTitle — عنوان بخش هدر */
    headerTitle?: string;

    /** content — Composition Point — محتوای بدنه Collapse */
    content?: (() => any) | null;

};