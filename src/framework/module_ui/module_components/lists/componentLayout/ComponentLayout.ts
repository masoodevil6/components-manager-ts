import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLayoutBase} from "./ComponentLayoutBase";
import {LayoutColumn, LayoutContentItem, PropsType, PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {createLayoutStep} from "./Step";
import type {MethodsConfigType} from "./Methods";

type LayoutContentRenderer = () => CoreReactive.App;

export type ComponentLayoutConfigType = StructurePropsType & PropsType & {
    content?: LayoutContentRenderer;
};

export class ComponentLayout extends ComponentLayoutBase {
    private _CONTENT_RENDERER: LayoutContentRenderer | null = null;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType> & {content?: LayoutContentRenderer},
        methods?: MethodsConfigType<ComponentLayout>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        const {content, ...props} = config ?? {};
        super(identity, createLayoutStep());
        this._CONTENT_RENDERER = typeof content === "function" ? content : null;
        this.renderComponent(props as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this.getScope().dispose();
        this.disposeStep();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.LAYOUT.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.LAYOUT.part:
                return this.renderLayout(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderLayout(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const col = data?.["prop_col"] ?? bind.prop_col;
        const layoutClass = data?.["prop_layoutClass"] ?? bind.prop_layoutClass;
        const layoutStyles = data?.["prop_layoutStyles"] ?? bind.prop_layoutStyles;
        const layoutContent = data?.["prop_layoutContent"] ?? bind.prop_layoutContent;
        const renderedContent = CoreObservable.App.computed(
            (value: LayoutContentItem[] | null, column: LayoutColumn) => {
                const content = value == null
                    ? this._CONTENT_RENDERER?.() ?? null
                    : value;
                return this.renderLayoutContent(content, column);
            },
            [layoutContent, col],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            classBind: [layoutClass],
            stylesBind: {styles: layoutStyles},
            children: [renderedContent as any],
        });
    }

    private renderLayoutContent(content: unknown, column: LayoutColumn): CoreReactive.App {
        const items = this.getLayoutItems(content);
        return CoreReactive.App.div({
            className: ["row"],
            children: items.map((item) => {
                const itemColumn = column === LayoutColumn.CUSTOM
                    ? item.col ?? null
                    : column;
                const columnClass = itemColumn && itemColumn !== LayoutColumn.CUSTOM
                    ? itemColumn.toLowerCase().replace("_", "-")
                    : null;
                const classes = [
                    ...(columnClass ? [columnClass] : []),
                    ...this.normalizeClasses(item.class),
                ];

                return CoreReactive.App.div({
                    className: classes,
                    styles: item.styles ?? {},
                    children: [this.normalizeContent(item.content)],
                });
            }),
        });
    }

    private getLayoutItems(content: unknown): LayoutContentItem[] {
        if (content == null || content === false) return [];
        if (Array.isArray(content) && content.every((item) =>
            item != null && typeof item === "object" && "content" in item
        )) {
            return content as LayoutContentItem[];
        }
        return [{content}];
    }

    private normalizeClasses(value: LayoutContentItem["class"]): string[] {
        if (Array.isArray(value)) return value.filter((className) => typeof className === "string");
        return typeof value === "string" && value.length > 0 ? value.split(/\s+/) : [];
    }

    private normalizeContent(content: any): any {
        if (content == null || content === false) return null;
        if (Array.isArray(content)) return content.map((item) => this.normalizeContent(item));
        if (typeof content === "string" || typeof content === "number") {
            return CoreReactive.App.span({props: {textContent: String(content)}});
        }
        if (typeof HTMLElement !== "undefined" && content instanceof HTMLElement) return content;
        if (content instanceof CoreReactive.App) return content;
        if (typeof content?.getReactiveElement === "function") return content.getReactiveElement();
        if (typeof content?.getElement === "function") return content.getElement();
        if (CoreObservable.App.isObservable(content)) {
            return content.map((value: any) => this.normalizeContent(value), this.getScope());
        }
        return null;
    }
}
