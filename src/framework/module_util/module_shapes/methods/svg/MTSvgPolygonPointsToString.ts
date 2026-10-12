import type {TSvgPolygon} from "../../types/svg/TSvgPolygon";
export function MTSvgPolygonPointsToString(points: TSvgPolygon): string {
    return points.map(({x, y}) => String(x) + "," + String(y)).join(" ");
}
