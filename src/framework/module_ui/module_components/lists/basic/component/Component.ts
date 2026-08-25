import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
// --------------------------------
import {Define_ComponentProp    as DefineProp}    from "../../../../../module_core/module_components/tools/prop/Define_ComponentProp";
import {Define_ComponentSchema  as DefineSchema}  from "../../../../../module_core/module_components/tools/schema/Define_ComponentSchema";
import {Define_ComponentMethod  as DefineMethod}  from "../../../../../module_core/module_components/tools/method/Define_ComponentMethod";
import {Interface_ComponentProp as PropInterface} from "../../../../../module_core/module_components/tools/prop/Interface_ComponentProp";


/**
 * کامپوننت پایه «لیست ساده» پیاده‌سازی‌شده بر پایه ClComponentBase
 * با استفاده از ابزارهای رسمی تعریف (DefineProp / DefineSchema / DefineMethod)
 */

// 1. تعریف تایپ‌های ویژگی (Props)
export type ComponentProps = {
    prop_text:     string;
    prop_color:    string;
    prop_fontSize: number;
};

// 2. تعریف الگوی Props (Pattern) — با ابزار رسمی پروژه
const ComponentPattern = DefineProp<ComponentProps>({
    prop_text: {
        prop:    "prop_text",
        default: "",
    },
    prop_color: {
        prop:    "prop_color",
        default: "#000000",
    },
    prop_fontSize: {
        prop:    "prop_fontSize",
        default: 14,
    },
});

// 3. تعریف ساختار بخش‌ها (Schema)
type ComponentSchemas = {
    container: { part: "container" };
    content:   { part: "content" };
};

const ComponentSchema = DefineSchema<ComponentSchemas, ComponentProps>({
    container: {
        part: "container",
    },
    content: {
        part:  "content",
        props: [
            { prop: "prop_text" },
            { prop: "prop_color" },
            { prop: "prop_fontSize" },
        ] as PropInterface<any>[],
    },
});

// 4. تعریف متدها (Methods)
type ComponentMethodsType = {
    reset: { name: "reset" };
};

const ComponentMethodsDef = DefineMethod<ComponentMethodsType, ComponentProps>({
    reset: {},
});

// 5. تعریف قالب‌ها (Templates)
const ComponentTemplates = {};


/**
 * پیاده‌سازی کلاس کامپوننت با ارث‌بری از App (ClComponentBase)
 */
export class Component extends CoreComponents.App<
    ComponentProps,
    ComponentSchemas,
    typeof ComponentTemplates,
    { reset: (e: Event, dataArgs: Record<string, any> | null, componentArgs: Record<string, any>) => void }
> {

    _COMPONENT_PATTERN   = ComponentPattern;
    _COMPONENT_SCHEMA    = ComponentSchema;
    _COMPONENT_METHODS   = ComponentMethodsDef as any;
    _COMPONENT_TEMPLATES = ComponentTemplates as any;

    constructor(config: ComponentProps, methods: Record<string, any>) {
        super("component", null);
        super.renderComponent(config, methods as any);
    }

    /**
     * مدیریت رندرینگ بخش‌های مختلف بر اساس Schema
     */
    renderManagerComponent(partName: string, attrsDefault: any, data: any, extra: any): CoreReactive.App {
        switch (partName) {
            case "container":
                return this.template_render_container(attrsDefault, data);
            case "content":
                return this.template_render_content(attrsDefault, data);
            default:
                return CoreReactive.App.part("span", { attrs: attrsDefault });
        }
    }

    private template_render_container(attrsDefault: any, data: any): CoreReactive.App {
        return CoreReactive.App.part("div", {
            attrs:     attrsDefault,
            className: ["component-container"],
            children:  [this.executeSchemaPart("content")],
        });
    }

    private template_render_content(attrsDefault: any, data: any): CoreReactive.App {
        const fontSize = data["prop_fontSize"]?.get() ?? 14;

        return CoreReactive.App.part("span", {
            attrs:    attrsDefault,
            styles:   {
                fontSize: `${fontSize}px`,
            },
            children: [
                data["prop_text"],
                data["prop_color"],
            ],
        });
    }
}