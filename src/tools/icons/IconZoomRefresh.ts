import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconZoomRefresh(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName");

    const size = ToolsCss.getIconSize(sizeName, sizeName);

    const strokeWidth = options.strokeWidth ?? 2;

    const variant: IconVariant = options.variant ?? "default";

    const primaryColor =
        (options.primaryColor instanceof Observable
            ? options.primaryColor.get()
            : options.primaryColor)
        ?? Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1);

    const secondaryColor =
        (options.secondaryColor instanceof Observable
            ? options.secondaryColor.get()
            : options.secondaryColor)
        ?? Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1);

    return `
<svg xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="zoom-refresh"
    width="${size}"
    height="${size}"
    viewBox="0 0 24 24"
    fill="none">

    <title>zoom-refresh</title>

    <!-- Lens -->
    <circle
        cx="11"
        cy="11"
        r="7"
        stroke="${primaryColor}"
        stroke-width="${strokeWidth}"
        fill="${secondaryColor}"
        stroke-linecap="round"
        stroke-linejoin="round"/>

    <!-- Handle -->
    <line
        x1="16.65"
        y1="16.65"
        x2="21"
        y2="21"
        stroke="${primaryColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"/>

    <!-- Resize -->
    <path
        d="
            M10 8H8v2
            M12 8h2v2
            M8 12v2h2
            M14 12v2h-2
        "
        stroke="${primaryColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"/>

</svg>` as IconString;
}