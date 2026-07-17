import type {IconOptions} from './index'
import {IconString} from "./index";
import {IconWebCode} from "./IconWebCode";

export function IconWebCode404(
    options: IconOptions = {}
): IconString {
    return IconWebCode({ ...options, code: "404" })
}
