import * as CoreReactive from "@/core_reactive";
import type {
    Interface_PageV2,
    Interface_PageV2ComponentNode,
    Interface_PageV2DictionaryReference,
} from "../types/Interface_PageV2";

export function MtRenderPageV2Components(definition: Interface_PageV2): HTMLElement {
    const roots = Object.entries(definition.components).map(([name, node]) => ({
        name,
        instance: renderNode(node, definition.dictionary),
    }));

    if (roots.length === 1) return toElement(roots[0].instance);

    return CoreReactive.App.section({
        className: ["row", "g-0", "w-100", "m-0"],
        children: roots.map(({name, instance}) => CoreReactive.App.section({
            className: ["col-12", "m-0", "p-0"],
            attrs: {"data-page-v2-component": name},
            children: [toReactiveChild(instance)],
        })),
    }).getElement();
}

function renderNode(node: Interface_PageV2ComponentNode, dictionary: Interface_PageV2["dictionary"]): any {
    const props = resolveValue(node.props ?? {}, dictionary) as Record<string, any>;
    const children = resolveValue(node.children ?? {}, dictionary) as Record<string, any>;
    return node.component({...props, ...children}, node.methods);
}

function resolveValue(value: any, dictionary: Interface_PageV2["dictionary"]): any {
    if (isComponentNode(value)) return renderNode(value, dictionary);
    if (Array.isArray(value)) return value.map((item) => resolveValue(item, dictionary));
    if (isDictionaryReference(value)) return resolveDictionaryReference(value, dictionary);
    if (isPlainObject(value)) {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveValue(item, dictionary)]));
    }
    return value;
}

function isComponentNode(value: unknown): value is Interface_PageV2ComponentNode {
    return isPlainObject(value) && typeof value.component === "function";
}

function isDictionaryReference(value: unknown): value is Interface_PageV2DictionaryReference {
    return isPlainObject(value)
        && typeof value.$dictionary === "string"
        && typeof value.id === "string";
}

function resolveDictionaryReference(
    reference: Interface_PageV2DictionaryReference,
    dictionary: Interface_PageV2["dictionary"],
): any {
    const entry = dictionary[reference.$dictionary]?.find((item: any) => item?.id === reference.id);
    if (!entry) {
        throw new Error(`Page v2 dictionary entry not found: ${reference.$dictionary}.${reference.id}`);
    }

    if (!reference.property) return entry;
    return reference.property.split(".").reduce((current: any, key) => current?.[key], entry);
}

function isPlainObject(value: unknown): value is Record<string, any> {
    if (value === null || typeof value !== "object") return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
}

function toReactiveChild(instance: any): any {
    if (instance && typeof instance.getReactiveElement === "function") return instance.getReactiveElement();
    if (instance && typeof instance.getElement === "function") return instance.getElement();
    return instance;
}

function toElement(instance: any): HTMLElement {
    if (typeof HTMLElement !== "undefined" && instance instanceof HTMLElement) return instance;
    if (instance && typeof instance.getElement === "function") return instance.getElement() as HTMLElement;
    const reactiveElement = instance?.getReactiveElement?.();
    if (reactiveElement && typeof reactiveElement.getElement === "function") {
        return reactiveElement.getElement() as HTMLElement;
    }
    throw new Error("A page v2 root component must provide getElement().");
}
