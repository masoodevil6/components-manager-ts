import type {TShapeTriangleOptions, TShapeTriangleCss} from "../../types/css/TShapeTriangle";

const cssValue = (value: string | number): string => typeof value === "number" ? String(value) + "px" : value;
const half = (value: string): string => "calc(" + value + " / 2)";

/** Build declarations for a CSS border triangle. DOM and selector ownership remain with the caller. */
export function MTCssTriangle(options: TShapeTriangleOptions): TShapeTriangleCss {
    const width = cssValue(options.width);
    const height = cssValue(options.height);
    const transparent = "transparent";
    let borderWidth: string;
    let borderColor: string;
    switch (options.direction) {
        case "up": borderWidth = "0 " + half(width) + " " + height + " " + half(width); borderColor = transparent + " " + transparent + " " + options.color + " " + transparent; break;
        case "right": borderWidth = half(height) + " 0 " + half(height) + " " + width; borderColor = transparent + " " + transparent + " " + transparent + " " + options.color; break;
        case "down": borderWidth = height + " " + half(width) + " 0 " + half(width); borderColor = options.color + " " + transparent + " " + transparent + " " + transparent; break;
        case "left": borderWidth = half(height) + " " + width + " " + half(height) + " 0"; borderColor = transparent + " " + options.color + " " + transparent + " " + transparent; break;
    }
    return {content: "''", position: "absolute", width: "0", height: "0", borderStyle: "solid", borderWidth, borderColor, ...(options.position ?? {})} as TShapeTriangleCss;
}
