import type {TCTriangleDirection} from "./const/TCTriangleDirection";
export type TShapeCssValue = string | number;
export type TShapeTrianglePosition = Partial<Record<"top" | "right" | "bottom" | "left" | "insetInlineStart" | "insetInlineEnd", TShapeCssValue>>;
export type TShapeTriangleOptions = {direction: TCTriangleDirection; width: TShapeCssValue; height: TShapeCssValue; color: string; position?: TShapeTrianglePosition};
export type TShapeTriangleCss = Record<string, string>;
