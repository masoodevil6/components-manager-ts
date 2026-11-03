import {ITemplate} from "@/core_route";
import {MtRenderPageV2Components} from "./methods/MtRenderPageV2Components";
import {PageV2Example} from "./examples/PageV2Example";
import type {Interface_PageV2} from "./types/Interface_PageV2";

export class ClPageV2 implements ITemplate {
    render(_query?: Record<string, string>, extra?: Record<string, any>): HTMLElement {
        const definition = isPageV2Definition(extra) ? extra : PageV2Example;
        return MtRenderPageV2Components(definition);
    }

    onLoad(_pageElement: HTMLElement): void {}
}

function isPageV2Definition(value: unknown): value is Interface_PageV2 {
    if (value === null || typeof value !== "object") return false;
    const candidate = value as Partial<Interface_PageV2>;
    return candidate.dictionary !== null
        && typeof candidate.dictionary === "object"
        && !Array.isArray(candidate.dictionary)
        && candidate.components !== null
        && typeof candidate.components === "object"
        && !Array.isArray(candidate.components);
}
