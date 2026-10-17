import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as CoreComponents from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import * as CoreObservable from "@/core_observable";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UtilValidators from "@/util_validators";
import {CodeMirrorLanguage} from "../../../module_components/lists/componentCodeMirror/Props";
import type {CodeMirrorRunContext} from "../../../module_components/lists/componentCodeMirror/Props";

export class ClComponentDetailsPage implements ITemplate {
    render(): HTMLElement {
        const pathParts = location.pathname.split("/").filter(Boolean);
        const componentName = decodeURIComponent(pathParts[pathParts.length - 1] ?? "");
        const entry = CoreComponents.ComponentManager.list().find(({definition}) =>
            definition.name === componentName || definition.id === componentName,
        );

        if (!entry) {
            const header = UiCategory.UI.Pages.Header.PageHeader({
                prop_pageTitle: "Component not found",
                prop_hasIconBack: true,
                prop_pageNav: [
                    {name: "components", title: "Components"},
                ],
            }, {
                BACK: () => { window.location.href = "/components"; },
                SELECT_NAV_ITEM: (_event: Event, args: any) => {
                    if (args?.NAME === "components") window.location.href = "/components";
                },
            } as any).getElement();
            const page = UiCategory.UI.Pages.Page({
                prop_header: header,
            } as any);
            return page.getElement() as HTMLElement;
        }

        const descriptionSchema = Object.entries(entry.schemas ?? {}).find(([name, schema]: [string, any]) =>
            name !== "COMPONENT" && name !== "STRUCTURE" && (schema.description || schema.descriptionKey),
        )?.[1] as any;
        const descriptionKey = descriptionSchema?.description ?? descriptionSchema?.descriptionKey;
        const description = descriptionKey ? CoreLanguage.App.translate(descriptionKey).get() : "";
        const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);

        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: entry.definition.name,
            prop_hasIconBack: true,
            prop_pageNav: [
                {name: "components", title: "Components"},
            ],
        }, {
            BACK: () => { window.location.href = "/components"; },
            SELECT_NAV_ITEM: (_event: Event, args: any) => {
                if (args?.NAME === "components") window.location.href = "/components";
            },
        } as any).getElement();
        const navigation = CoreReactive.App.section({
            className: ["w-100"],
            children: [
                CoreReactive.App.p({className: ["text-muted", "mb-0"], children: [entry.definition.id, " | ", entry.definition.version]}),
                ...(description ? [CoreReactive.App.p({children: [description]})] : []),
            ],
        });
        const content = CoreReactive.App.section({
            className: ["w-100"],
            children: [
                CoreReactive.App.h3({className: ["mb-3"], children: ["Examples"]}),
                ...(examples.length
                    ? examples.map((example) => {
                        const source = formatExampleSource(example.render);
                        const codeMirrorComponent = UiCategory.UI.Tools.Code.CodeMirror({
                            classList: ["w-100", "mb-3"],
                            prop_title: "Example code",
                            prop_language: CodeMirrorLanguage.JAVASCRIPT,
                            prop_canRun: true,
                            prop_value: source,
                            prop_editorHeight: "280px",
                            prop_run: (editedSource: string, _language: CodeMirrorLanguage, context?: CodeMirrorRunContext) =>
                                executeExampleSource(example.render, source, editedSource, context),
                        } as any);
                        queueMicrotask(() => codeMirrorComponent.run());
                        const codeMirror = codeMirrorComponent.getElement();
                        return UiCategory.UI.Contents.CardViewInfo({
                            classList: ["mb-3"],
                            prop_title: CoreLanguage.App.translate(example.name).get(),
                            prop_content: CoreReactive.App.section({
                                children: [
                                    ...(example.description ? [CoreReactive.App.p({children: [CoreLanguage.App.translate(example.description).get()]})] : []),
                                    codeMirror,
                                ],
                            }).getElement(),
                        }).getElement();
                    })
                    : [CoreReactive.App.p({className: ["text-muted"], children: ["No examples are available."]})]),
            ],
        });
        const page = UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_navigation: navigation,
            prop_content: content,
        } as any);
        return page.getElement() as HTMLElement;
    }

    onLoad(_pageElement: HTMLElement): void {}
}

function formatExampleSource(render: () => HTMLElement): string {
    return render.toString().trim();
}

function executeExampleSource(
    render: () => HTMLElement,
    originalSource: string,
    editedSource: string,
    context?: CodeMirrorRunContext,
): HTMLElement | Node | void {
    if (editedSource.trim() === originalSource.trim()) {
        return render();
    }

    const evaluated = new Function(
        "UiCategory",
        "UiIcons",
        "CoreReactive",
        "CoreObservable",
        "CoreComponents",
        "CoreLanguage",
        "CodeMirrorLanguage",
        "console",
        "UtilValidators",
        "UtilConst",
        "UtilStyle",
        `"use strict"; return (${editedSource});`,
    )(
        UiCategory,
        UiIcons,
        CoreReactive,
        CoreObservable,
        CoreComponents,
        CoreLanguage,
        CodeMirrorLanguage,
        context?.console ?? console,
        UtilValidators,
        UtilConst,
        UtilStyle,
    );
    const result = typeof evaluated === "function" ? evaluated() : evaluated;
    if (result instanceof Node) return result;
    if (result && typeof result.getElement === "function") return result.getElement() as HTMLElement;
    if (result && typeof result.getReactiveElement === "function") return result.getReactiveElement().getElement() as HTMLElement;
    if (result == null) return;
    throw new Error("The example source must return an HTMLElement or a Component instance.");
}
