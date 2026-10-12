import type {TSvgPolygon} from "../../types/svg/TSvgPolygon";
export function MTSvgPolygonSliceClosed(points: TSvgPolygon, startIndex: number, count: number): TSvgPolygon {
    if (!Number.isInteger(startIndex) || !Number.isInteger(count) || count < 3 || startIndex < 0 || startIndex + count > points.length) return [];
    const result = points.slice(startIndex, startIndex + count);
    return [...result, result[0]];
}
