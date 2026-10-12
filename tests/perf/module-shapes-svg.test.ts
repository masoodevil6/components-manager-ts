import {describe, expect, it} from "vitest";
import * as Svg from "@/util_shapes";

describe("UtilShape.Svg", () => {
    const points = [{x: 0, y: 0}, {x: 6, y: 0}, {x: 6, y: 3}, {x: 0, y: 3}];

    it("serializes polygon points for SVG attributes", () => {
        expect(Svg.Svg.PolygonPointsToString(points)).toBe("0,0 6,0 6,3 0,3");
        expect(Svg.Svg.PolygonPointsToString([])).toBe("");
    });

    it("returns the legacy vertex mean without mutating input", () => {
        expect(Svg.Svg.PolygonVertexMean(points)).toEqual({x: 3, y: 1.5});
        expect(Svg.Svg.PolygonVertexMean([])).toBeNull();
        expect(points).toHaveLength(4);
    });

    it("returns a closed slice and safely rejects invalid geometry", () => {
        expect(Svg.Svg.PolygonSliceClosed(points, 0, 3)).toEqual([points[0], points[1], points[2], points[0]]);
        expect(Svg.Svg.PolygonSliceClosed(points, 2, 3)).toEqual([]);
    });

    it("offsets a point without changing the source", () => {
        expect(Svg.Svg.PointOffset(points[1], 4, -2)).toEqual({x: 10, y: -2});
        expect(points[1]).toEqual({x: 6, y: 0});
    });
});
