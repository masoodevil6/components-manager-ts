import type {ComponentPropConfig} from "@/core_components";

export type ComponentButtonProps = ComponentPropConfig & {

    /** btnTitle — متن دکمه (رشته یا Observable) */
    btnTitle?: string | null;

    /** type — نوع دکمه (button / submit / reset) */
    type?:     "button" | "submit" | "reset";

    /** variant — استایل بوت‌استرپ (primary / secondary / ...) */
    variant?:  string;

    /** content — Composition Point — محتوای داخل دکمه (مثلاً Icon) */
    content?: (() => any) | null;

};