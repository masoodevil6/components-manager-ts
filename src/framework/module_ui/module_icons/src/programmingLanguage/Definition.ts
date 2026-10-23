import * as CoreReactive from "@/core_reactive";
import {IconDefinition} from "../../basic/interface";
import {Keys} from "../../languages";

function createMonogram(
    title: IconDefinition["title"],
    description: IconDefinition["description"],
    mark: string,
    fontSize = 10,
): IconDefinition {
    return {
        title,
        description,
        viewBoxX: 24,
        viewBoxY: 24,
        render(context) {
            return [
                CoreReactive.App.svgText({
                    attrs: {
                        x: "12", y: "16", "text-anchor": "middle", "font-size": String(fontSize),
                        "font-weight": "700", "font-family": "Arial, sans-serif",
                    },
                    attrsBind: {fill: context.primaryColor},
                    children: [mark],
                }),
            ];
        },
    };
}

export const Html: IconDefinition = createMonogram(Keys.icons.markupHtml.name, Keys.icons.markupHtml.description, "</>", 10);
export const Css: IconDefinition = createMonogram(Keys.icons.programmingCss.name, Keys.icons.programmingCss.description, "CSS", 7);
export const JavaScript: IconDefinition = createMonogram(Keys.icons.programmingJavascript.name, Keys.icons.programmingJavascript.description, "JS", 9);
export const TypeScript: IconDefinition = createMonogram(Keys.icons.programmingTypescript.name, Keys.icons.programmingTypescript.description, "TS", 9);

export const Python: IconDefinition = {
    title: Keys.icons.programmingPython.name,
    description: Keys.icons.programmingPython.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgPath({attrs: {d: "M12 2.5c-4.9 0-5.5 2.1-5.5 4.2v3.1h7v1.4H4.8c-2.3 0-3.8 1.5-3.8 4.1s1.6 4.2 4.1 4.2h2.4v-3c0-2.4 1.5-4.1 4-4.1h4.2c1.7 0 2.8-1.2 2.8-2.9V6.7c0-2.6-2.1-4.2-6.5-4.2Z"}, attrsBind: {fill: context.secondaryColor}}),
            CoreReactive.App.svgPath({attrs: {d: "M12 21.5c4.9 0 5.5-2.1 5.5-4.2v-3.1h-7v-1.4h8.7c2.3 0 3.8-1.5 3.8-4.1S21.4 4.5 18.9 4.5h-2.4v3c0 2.4-1.5 4.1-4 4.1H8.3c-1.7 0-2.8 1.2-2.8 2.9v2.8c0 2.6 2.1 4.2 6.5 4.2Z"}, attrsBind: {fill: context.primaryColor}}),
            CoreReactive.App.svgCircle({attrs: {cx: "9", cy: "5.5", r: "0.8"}, attrsBind: {fill: context.primaryColor}}),
            CoreReactive.App.svgCircle({attrs: {cx: "15", cy: "18.5", r: "0.8"}, attrsBind: {fill: context.secondaryColor}}),
        ];
    },
};

export const Java: IconDefinition = {
    title: Keys.icons.programmingJava.name,
    description: Keys.icons.programmingJava.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgPath({attrs: {d: "M8 8c-2 1.5 3 1.8 0 3.3M12 6.5c-2.4 1.8 3.4 2.2 0 4M16 8c-2 1.5 3 1.8 0 3.3", fill: "none", "stroke-linecap": "round"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth}}),
            CoreReactive.App.svgPath({attrs: {d: "M5 13h14l-1.7 6H6.7L5 13Z"}, attrsBind: {fill: context.secondaryColor, stroke: context.primaryColor, "stroke-width": context.strokeWidth}}),
            CoreReactive.App.svgPath({attrs: {d: "M19 14h1.2a1.8 1.8 0 0 1 0 3.6h-2" , fill: "none", "stroke-linecap": "round"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth}}),
            CoreReactive.App.svgPath({attrs: {d: "M4 21h16", fill: "none", "stroke-linecap": "round"}, attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth}}),
        ];
    },
};

export const CSharp: IconDefinition = createMonogram(Keys.icons.programmingCSharp.name, Keys.icons.programmingCSharp.description, "C#", 8);
export const Php: IconDefinition = createMonogram(Keys.icons.programmingPhp.name, Keys.icons.programmingPhp.description, "php", 7);
export const Go: IconDefinition = createMonogram(Keys.icons.programmingGo.name, Keys.icons.programmingGo.description, "Go", 10);
export const Rust: IconDefinition = createMonogram(Keys.icons.programmingRust.name, Keys.icons.programmingRust.description, "R", 12);
export const Cpp: IconDefinition = createMonogram(Keys.icons.programmingCpp.name, Keys.icons.programmingCpp.description, "C++", 7);

export const Ruby: IconDefinition = {
    title: Keys.icons.programmingRuby.name,
    description: Keys.icons.programmingRuby.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgPolygon({attrs: {points: "5,4 19,4 22,9 12,21 2,9"}, attrsBind: {fill: context.secondaryColor, stroke: context.primaryColor, "stroke-width": context.strokeWidth}}),
            CoreReactive.App.svgPolygon({attrs: {points: "5,4 9,9 2,9"}, attrsBind: {fill: context.primaryColor}}),
            CoreReactive.App.svgPolygon({attrs: {points: "19,4 15,9 22,9"}, attrsBind: {fill: context.primaryColor}}),
            CoreReactive.App.svgPolygon({attrs: {points: "9,9 15,9 12,21"}, attrsBind: {fill: context.primaryColor}}),
        ];
    },
};
