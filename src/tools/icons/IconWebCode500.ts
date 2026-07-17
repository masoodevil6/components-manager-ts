import type {IconOptions} from './index'
import {IconString} from "./index";
import {IconWebCode} from "./IconWebCode";

export function IconWebCode500(
    options: IconOptions = {}
): IconString {
    return IconWebCode({ ...options, code: "500" })
}
