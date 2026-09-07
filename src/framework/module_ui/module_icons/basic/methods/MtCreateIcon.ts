import * as CoreReactive    from "@/core_reactive";
import * as CoreObservable  from "@/core_observable";
import * as CoreConfig      from "@/core_configs";
import * as CoreLanguage    from "@/core_languages";
import * as UtilStyle       from "@/util_styles";
import * as UtilConst       from "@/util_consts";
import * as UtilBrands      from "@/util_brands";
///------------------------------
import {IconDefinition , IconOptions} from "../interface";
import {IconVariant} from "../enums";


type CreationMode = "static" | "reactive";


interface CachedTemplate {
    svgElement: SVGSVGElement;
}

const templateCache = new WeakMap<IconDefinition, Map<string, CachedTemplate>>();
const defaultTemplateCache = new WeakMap<IconDefinition, CachedTemplate>();

function isDefaultOptions(options: IconOptions): boolean {
    return options.size === undefined &&
           options.primaryColor === undefined &&
           options.secondaryColor === undefined &&
           options.strokeWidth === undefined &&
           options.variant === undefined &&
           options.scope === undefined;
}

function computeCacheKey(
    sizeName: string | number,
    primaryColor: string,
    secondaryColor: string,
    strokeWidth: any,
    variant: any
): string {
    return `${sizeName}|${primaryColor}|${secondaryColor}|${strokeWidth}|${variant}`;
}


function buildStaticSvg(
    definition: IconDefinition,
    sizeName: string | number,
    primaryColor: string,
    secondaryColor: string,
    strokeWidth: any,
    variant: any
): SVGSVGElement {
    const ariaLabel = CoreLanguage.App.translate(definition.title).get();
    const viewBox   = `0 0 ${definition.viewBoxX} ${definition.viewBoxY}`;
    const size      = UtilStyle.Css_IconSize(sizeName);

    const content = definition.render({
        sizeName,
        primaryColor,
        secondaryColor,
        strokeWidth,
        variant,
    } as any);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-label", ariaLabel);
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);

    for (const child of content) {
        if (child && child.getElement) {
            svg.appendChild(child.getElement());
        }
    }

    return svg;
}


function resolveIconCreationMode(
    definition: IconDefinition | CoreObservable.App<IconDefinition>,
    options:    IconOptions
): CreationMode {

    if (CoreObservable.App.isObservable(definition)) return "reactive";

    if (options.scope) return "reactive";

    if (options.size           !== undefined && CoreObservable.App.isObservable(options.size))           return "reactive";
    if (options.primaryColor   !== undefined && CoreObservable.App.isObservable(options.primaryColor))   return "reactive";
    if (options.secondaryColor !== undefined && CoreObservable.App.isObservable(options.secondaryColor)) return "reactive";
    if (options.strokeWidth    !== undefined && CoreObservable.App.isObservable(options.strokeWidth))    return "reactive";
    if (options.variant        !== undefined && CoreObservable.App.isObservable(options.variant))        return "reactive";

    return "static";
}


function createStaticIcon(
    definition: IconDefinition,
    options:    IconOptions
): UtilBrands.Icons {

    if (isDefaultOptions(options)) {
        const cachedDefault = defaultTemplateCache.get(definition);
        if (cachedDefault) {
            const cloned = cachedDefault.svgElement.cloneNode(true) as SVGSVGElement;
            return CoreReactive.App.svg({ existingElement: cloned }) as UtilBrands.Icons;
        }
    }

    const sizeName =
        options.size !== undefined
            ? (options.size as string | number)
            : CoreConfig.Settings.SizeName.get();

    const primaryColor =
        options.primaryColor !== undefined
            ? (options.primaryColor as string)
            : UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);

    const secondaryColor =
        options.secondaryColor !== undefined
            ? (options.secondaryColor as string)
            : UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);

    const borderWidth =
        options.strokeWidth !== undefined
            ? (options.strokeWidth as number)
            : UtilStyle.Css_BorderWidth(sizeName);

    const strokeWidth =
        UtilStyle.Css_IconStrokeWidth(borderWidth as any, definition.viewBoxX, definition.viewBoxY);

    const variant =
        options.variant !== undefined
            ? (options.variant as IconVariant)
            : IconVariant.DEFAULT;

    const cacheKey = computeCacheKey(sizeName, primaryColor, secondaryColor, strokeWidth, variant);

    let defCache = templateCache.get(definition);
    if (!defCache) {
        defCache = new Map();
        templateCache.set(definition, defCache);
    }

    let cached = defCache.get(cacheKey);

    if (!cached) {
        const svgElement = buildStaticSvg(definition, sizeName, primaryColor, secondaryColor, strokeWidth, variant);
        cached = { svgElement };
        defCache.set(cacheKey, cached);
        if (isDefaultOptions(options)) {
            defaultTemplateCache.set(definition, cached);
        }
    }

    const cloned = cached.svgElement.cloneNode(true) as SVGSVGElement;

    const wrapper = CoreReactive.App.svg({
        existingElement: cloned,
    });

    return wrapper as UtilBrands.Icons;
}


function createReactiveIcon(
    definition: IconDefinition | CoreObservable.App<IconDefinition>,
    options:    IconOptions
): UtilBrands.Icons {

    const scope = new CoreObservable.Scope()

    const sizeName =
        options.size ??
        CoreConfig.Settings.SizeName.observable();

    const primaryColor =
        options.primaryColor ??
        UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);

    const secondaryColor =
        options.secondaryColor ??
        UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);

    const borderWidth =
        options.strokeWidth ??
        CoreObservable.App.computed(
            (sizeName) => {
                return UtilStyle.Css_BorderWidth(sizeName)
            } ,
            [
                sizeName
            ],
            scope
        );

    const strokeWidth =
        CoreObservable.App.computed(
            (borderWidth, definition) => {
                return UtilStyle.Css_IconStrokeWidth(borderWidth , definition.viewBoxX  , definition.viewBoxY)
            } ,
            [borderWidth , definition] ,
            scope
        )

    const variant =
        options.variant ??
        IconVariant.DEFAULT;

    const content =
        CoreObservable.App.computed(
            (definition) => {
                return definition.render({
                    sizeName,
                    primaryColor,
                    secondaryColor,
                    strokeWidth,
                    variant,
                    scope
                });
            },
            [
                definition,
                sizeName,
                primaryColor,
                secondaryColor,
                strokeWidth,
                variant
            ],
            scope
        );


    return CoreReactive.App.svg({
        attrs: {
            "xmlns" :       "http://www.w3.org/2000/svg" ,
            "role" :        "img" ,
            "fill" :        "none"
        } ,
        attrsBind: {
            "aria-label"  :      CoreObservable.App.computed(
                (definition)=> {
                    return  CoreLanguage.App.translate(definition.title)
                },
                [
                    definition ,
                ] ,
                scope
            ),
            "viewBox" :      CoreObservable.App.computed(
                (definition)=> {
                    return `0 0 ${definition.viewBoxX} ${definition.viewBoxY}`
                },
                [
                    definition ,
                ] ,
                scope
            ),
            width:           CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                scope
            ),
            height:          CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                scope
            ),
        } ,
        children: content
    }) as UtilBrands.Icons;
}


export function MtCreateIcon(
    definition: IconDefinition | CoreObservable.App<IconDefinition> ,
    options:    IconOptions = {}
): UtilBrands.Icons {

    if (isDefaultOptions(options) && !CoreObservable.App.isObservable(definition)) {
        return createStaticIcon(definition as IconDefinition, options);
    }

    const mode = resolveIconCreationMode(definition, options);

    if (mode === "static") {
        return createStaticIcon(definition as IconDefinition, options);
    }

    return createReactiveIcon(definition, options);
}


