import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractMethodsType,ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    CHANGE: {name:"fn_onChange", description:Keys.category.components.inputAcl.methods.change.description, args:{VALUE:Props.prop_value}, dataArgs:{} as const},
    OPEN: {name:"fn_onOpen", description:Keys.category.components.inputAcl.methods.open.description, args:{}, dataArgs:{} as const},
    ACCEPT: {name:"fn_onAccept", description:Keys.category.components.inputAcl.methods.accept.description, args:{VALUE:Props.prop_value}, dataArgs:{} as const},
    CANCEL: {name:"fn_onCancel", description:Keys.category.components.inputAcl.methods.cancel.description, args:{}, dataArgs:{} as const},
    CLEAR: {name:"fn_onClear", description:Keys.category.components.inputAcl.methods.clear.description, args:{}, dataArgs:{} as const},
} as const;
export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods,TThis>;
