import { describe, it, expect } from "vitest";
import "./setup";
import * as UiIcons from "@/ui_icons";
import * as CoreObservable from "@/core_observable";
import { IconVariant } from "@/ui_icons";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";


const testDefinitions: { name: string; def: UiIcons.IIconDefinition }[] = [
    { name: "userPhone",         def: UiIcons.Src.UserPhone.Definition },
    { name: "userAccountAdd",    def: UiIcons.Src.UserAccountAdd.Definition },
    { name: "arrowUp",           def: UiIcons.Src.ArrowUp.Definition },
    { name: "statusIsTrue",      def: UiIcons.Src.StatusIsTrue.Definition },
    { name: "calcPlus",          def: UiIcons.Src.CalcPlus.Definition },
    { name: "webCode404",        def: UiIcons.Src.WebCode404.Definition },
    { name: "loadingOrbit",      def: UiIcons.Src.LoadingOrbit.Definition },
    { name: "paymentCash",       def: UiIcons.Src.PaymentCash.Definition },
];

function normalizeSvg(element: Element): string {
    return element.outerHTML
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/aria-label="[^"]*"/g, 'aria-label=""')
        .replace(/wcode_\d+/g, "wcode_N")
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><")
        .trim();
}

function getSvgElement(element: Element): Element {
    return element.tagName.toLowerCase() === "svg" ? element : element.querySelector("svg")!;
}

function getSvgStructure(element: Element): {
    tagName: string;
    attrs: Record<string, string>;
    children: { tag: string; attrs: Record<string, string> }[];
} {
    const svg = getSvgElement(element);
    const attrs: Record<string, string> = {};
    for (const attr of Array.from(svg.attributes)) {
        if (attr.name === "aria-label") continue;
        attrs[attr.name] = attr.value;
    }
    const children: { tag: string; attrs: Record<string, string> }[] = [];
    for (const child of Array.from(svg.children)) {
        const childAttrs: Record<string, string> = {};
        for (const attr of Array.from(child.attributes)) {
            childAttrs[attr.name] = attr.value.replace(/wcode_\d+/g, "wcode_N");
        }
        children.push({ tag: child.tagName, attrs: childAttrs });
    }
    return { tagName: svg.tagName, attrs, children };
}

describe("Behavioral Equivalence — Static vs Reactive", () => {

    for (const { name, def } of testDefinitions) {

        it(`${name} — static ≡ reactive (SVG structure + children)`, () => {
            const defaultPrimary = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
            const staticIcon = UiIcons.CreateIcon(def, {});
            const reactiveIcon = UiIcons.CreateIcon(def, {
                primaryColor: new CoreObservable.App(defaultPrimary),
            });

            const staticStruct = getSvgStructure(staticIcon.getElement());
            const reactiveStruct = getSvgStructure(reactiveIcon.getElement());

            expect(staticStruct.tagName).toBe(reactiveStruct.tagName);
            expect(staticStruct.attrs).toEqual(reactiveStruct.attrs);
            expect(staticStruct.children).toEqual(reactiveStruct.children);
        });

        it(`${name} — static ≡ reactive (normalized outerHTML, excluding aria-label)`, () => {
            const defaultPrimary = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
            const staticIcon = UiIcons.CreateIcon(def, {});
            const reactiveIcon = UiIcons.CreateIcon(def, {
                primaryColor: new CoreObservable.App(defaultPrimary),
            });

            const staticHtml = normalizeSvg(staticIcon.getElement());
            const reactiveHtml = normalizeSvg(reactiveIcon.getElement());

            expect(staticHtml).toBe(reactiveHtml);
        });
    }

    it("Static path with explicit plain options ≡ reactive with same values", () => {
        const def = UiIcons.Src.UserPhone.Definition;
        const sizeVal = CoreConfig.Settings.SizeName.get();

        const staticIcon = UiIcons.CreateIcon(def, {
            size: sizeVal as any,
            primaryColor: "#ff0000",
            secondaryColor: "#00ff00",
            strokeWidth: 3,
            variant: IconVariant.LARGE,
        });

        const reactiveIcon = UiIcons.CreateIcon(def, {
            size: new CoreObservable.App(sizeVal as any),
            primaryColor: new CoreObservable.App("#ff0000"),
            secondaryColor: new CoreObservable.App("#00ff00"),
            strokeWidth: new CoreObservable.App(3),
            variant: new CoreObservable.App(IconVariant.LARGE),
        });

        const staticStruct = getSvgStructure(staticIcon.getElement());
        const reactiveStruct = getSvgStructure(reactiveIcon.getElement());

        expect(staticStruct.children).toEqual(reactiveStruct.children);
        expect(staticStruct.attrs).toEqual(reactiveStruct.attrs);
    });

    it("Static path invariants — NO Scope, NO computed, plain attrs", () => {
        const def = UiIcons.Src.UserPhone.Definition;
        const staticIcon = UiIcons.CreateIcon(def, {});
        const svg = getSvgElement(staticIcon.getElement());

        expect(svg).toBeDefined();
        expect(svg.tagName.toLowerCase()).toBe("svg");

        expect(svg.getAttribute("xmlns")).toBe("http://www.w3.org/2000/svg");
        expect(svg.getAttribute("role")).toBe("img");
        expect(svg.getAttribute("fill")).toBe("none");
        expect(svg.getAttribute("viewBox")).toBeTruthy();
        expect(svg.getAttribute("width")).toBeTruthy();
        expect(svg.getAttribute("height")).toBeTruthy();
    });

    it("Static path produces correct aria-label (bug fix vs reactive [object Object])", () => {
        const def = UiIcons.Src.UserPhone.Definition;
        const staticIcon = UiIcons.CreateIcon(def, {});
        const svg = getSvgElement(staticIcon.getElement());

        const ariaLabel = svg.getAttribute("aria-label");
        expect(ariaLabel).not.toBe("[object Object]");
        expect(ariaLabel).not.toBe(null);
    });

    it("Reactive path still works with observable options", () => {
        const def = UiIcons.Src.UserPhone.Definition;
        const sizeObs = new CoreObservable.App(CoreConfig.Settings.SizeName.get() as any);

        const reactiveIcon = UiIcons.CreateIcon(def, {
            size: sizeObs,
        });

        const svg = getSvgElement(reactiveIcon.getElement());
        expect(svg).toBeDefined();

        const initialWidth = svg.getAttribute("width");
        expect(initialWidth).toBeTruthy();

        sizeObs.set("Large" as any);
        const updatedWidth = svg.getAttribute("width");
        expect(updatedWidth).toBeTruthy();
        expect(updatedWidth).not.toBe(initialWidth);
    });

    it("resolveIconCreationMode — observable definition → reactive", () => {
        const def = UiIcons.Src.UserPhone.Definition;
        const defObs = new CoreObservable.App(def);

        const icon = UiIcons.CreateIcon(defObs, {});
        const svg = getSvgElement(icon.getElement());
        expect(svg).toBeDefined();
        expect(svg.tagName.toLowerCase()).toBe("svg");
    });

    it("resolveIconCreationMode — scope option → reactive", () => {
        const def = UiIcons.Src.UserPhone.Definition;
        const scope = new CoreObservable.Scope();

        const icon = UiIcons.CreateIcon(def, { scope });
        const svg = getSvgElement(icon.getElement());
        expect(svg).toBeDefined();
    });
});
