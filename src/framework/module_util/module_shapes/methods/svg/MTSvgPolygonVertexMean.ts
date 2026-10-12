import type {TSvgPoint} from "../../types/svg/TSvgPoint";
import type {TSvgPolygon} from "../../types/svg/TSvgPolygon";
export function MTSvgPolygonVertexMean(points: TSvgPolygon): TSvgPoint | null {
    if (!points.length) return null;
    const sum = points.reduce((result, point) => ({x: result.x + point.x, y: result.y + point.y}), {x: 0, y: 0});
    return {x: sum.x / points.length, y: sum.y / points.length};
}
