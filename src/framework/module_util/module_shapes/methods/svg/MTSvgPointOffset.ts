import type {TSvgPoint} from "../../types/svg/TSvgPoint";
export function MTSvgPointOffset(point: TSvgPoint, offsetX: number, offsetY: number): TSvgPoint {
    return {x: point.x + offsetX, y: point.y + offsetY};
}
