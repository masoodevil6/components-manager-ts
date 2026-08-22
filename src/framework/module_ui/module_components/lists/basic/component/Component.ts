import { Core, UI } from "../../../../../public";
import { ComponentBase } from "../../../../../../ccomponentBasic/components/ComponentBase";

/**
 * یک کامپوننت بهینه‌شده و استاندارد بر اساس معماری جدید.
 * تمامی Importها با استفاده از Namespaceهای تعریف شده در tsconfig اصلاح شدند.
 */

// 1. تعریف تایپ‌های ویژگی (Props)
export type ComponentProps = {
    prop_text: string;
    prop_color: string;
    prop_fontSize: number;
};

// 2. تعریف الگوی معماری (Pattern)
const ComponentPattern = {
    [UI.Tools.Prop.Type<ComponentProps>.prop_text]: {
        prop: "prop_text",
        default: "",
        title: "Text Content",
    },
    [UI.Tools.Prop.Type<ComponentProps>.prop_color]: {
        prop: "prop_color",
        default: "#000000",
        title: "Text Color",
    },
    [UI.Tools.Prop.Type<ComponentProps>.prop_fontSize]: {
        prop: "prop_fontSize",
        default: 14,
        title: "Font Size (px)",
    },
};

// 3. تعریف ساختار کامپوننت (Schema)
const ComponentSchema = {
    [UI.Tools.Schema.Type<any>.part_container]: {
        part: "container",
        props: [
            { prop: "prop_color" }
        ]
    },
    [UI.Tools.Schema.Type<any>.part_content]: {
        part: "content",
        props: [
            { prop: "prop_text" },
            { prop: "prop_fontSize" }
        ]
    }
};

// 4. تعریف قالب‌ها (Templates)
const ComponentTemplates = {
    BODY: { name: "body" }
};

// 5. تعریف متدها (Methods)
const ComponentMethods = {
    RESET: { name: "fn_reset", args: {} }
};

/**
 * پیاده‌سازی کلاس کامپوننت با ارث‌بری صحیح از ComponentBase.
 */
export class Component extends ComponentBase<
    ComponentProps,
    any, 
    typeof ComponentTemplates,
    { fn_reset: (e: Event) => void }
> {

    constructor(config: ComponentProps, methods: any) {
        super("div", null); 
        super.renderComponent(config, methods);
    }

    /**
     * مدیریت رندرینگ بخش‌های مختلف بر اساس Schema
     */
    override renderManagerComponent(partName: string, attrsDefault: any, data: any, extra: any): Core.Reactive.ReactiveElement {
        switch (partName) {
            case "container":
                return this.template_render_container(attrsDefault, data);
            case "content":
                return this.template_render_content(attrsDefault, data);
            default:
                return Core.Reactive.ReactiveElement.part("span", { attrs: attrsDefault });
        }
    }

    private template_render_container(attrsDefault: any, data: any): Core.Reactive.ReactiveElement {
        return Core.Reactive.ReactiveElement.part("div", {
            attrs: attrsDefault,
            className: ["component-container"],
            children: [this.executeSchemaPart("content")]
        });
    }

    private template_render_content(attrsDefault: any, data: any): Core.Reactive.ReactiveElement {
        const text = data["prop_text"] || "";
        const color = data["prop_color"] || "#000";
        const fontSize = data["prop_fontSize"] || 14;

        return Core.Reactive.ReactiveElement.part("span", {
            attrs: attrsDefault,
            styles: {
                color: color,
                fontSize: `${fontSize}px`
            },
            children: [text]
        });
    }

    override renderContentComponent() {
        return this.executeSchemaPart("container");
    }

    fn_reset(e: Event) {
        console.log("Component reset triggered");
    }
}

/**
 * کارخانه تولید کامپوننت (Factory)
 */
export class ComponentFactory {
    static create(config: ComponentProps): Component {
        return new Component(config, {
            fn_reset: (e) => console.log("Reset")
        });
    }
}
</