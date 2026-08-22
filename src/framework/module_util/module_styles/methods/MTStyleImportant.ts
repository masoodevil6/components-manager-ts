
import * as UtilStyle from "@/util_styles";

export function MTStyleImportant(value: string | number): UtilStyle.Class.ClStyleValue {
    return {
        value,
        important: true
    };
}