
///------------------------------
import {ClStyleValue as StyleValue }        from "../class/ClStyleValue";

export function MTStyleImportant(value: string | number): StyleValue {
    return {
        value,
        important: true
    };
}