import * as CoreComponents from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys}              from "../../../module_categories/languages";
import {TSizeExp} from "@/util_styles";
import type {ExtractPropsType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Props اختصاصی ComponentMessages
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export enum MessageTypes {
    CUSTOM  = "custom",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR   = "error",
}


/**
 * MessageItem — ساختار داخلی هر پیام
 *
 * id   — شناسه یکتا (random) — برای حذف صحیح بعد از re-render
 * text — محتوای پیام
 *
 * مصرف‌کننده می‌تواند string[] یا MessageItem[] پاس دهد.
 * Component داخلی string را به MessageItem (با id random) تبدیل می‌کند.
 */
export interface MessageItem {
    id:   string;
    text: string;
}

export const Props = {

    prop_type: {
        prop:         "prop_type",
        default:      MessageTypes.SUCCESS as MessageTypes,
        name:         Keys.category.components.messages.props.type.name,
        description:  Keys.category.components.messages.props.type.description,
    },

    prop_messages: {
        prop:         "prop_messages",
        default:      [] as (string | MessageItem)[],
        name:         Keys.category.components.messages.props.messages.name,
        description:  Keys.category.components.messages.props.messages.description,
    },

    prop_borderWidth: {
        prop:         "prop_borderWidth",
        default:      UtilConst.Sizes.M as UtilStyle.TSizeExp ,
        name:         Keys.category.components.messages.props.borderWidth.name,
        description:  Keys.category.components.messages.props.borderWidth.description,
    },

    prop_iconColor: {
        prop:         "prop_iconColor",
        default:      null as string | null,
        name:         Keys.category.components.messages.props.iconColor.name,
        description:  Keys.category.components.messages.props.iconColor.description,
    },

    prop_borderColor: {
        prop:         "prop_borderColor",
        default:      null as string | null,
        name:         Keys.category.components.messages.props.borderColor.name,
        description:  Keys.category.components.messages.props.borderColor.description,
    },

    prop_backgroundColor: {
        prop:         "prop_backgroundColor",
        default:      null as string | null,
        name:         Keys.category.components.messages.props.backgroundColor.name,
        description:  Keys.category.components.messages.props.backgroundColor.description,
    },

    prop_textColor: {
        prop:         "prop_textColor",
        default:      null as string | null,
        name:         Keys.category.components.messages.props.textColor.name,
        description:  Keys.category.components.messages.props.textColor.description,
    },

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentMessages — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;
