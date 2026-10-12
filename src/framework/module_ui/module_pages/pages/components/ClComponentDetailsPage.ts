import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as CoreComponents from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import * as UiCategory from "@/ui_categories";

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
                    ? examples.map((example) => UiCategory.UI.Contents.CardViewInfo({
                        classList: ["mb-3"],
                        prop_title: CoreLanguage.App.translate(example.name).get(),
                        prop_content: CoreReactive.App.section({
                            children: [
                                ...(example.description ? [CoreReactive.App.p({children: [CoreLanguage.App.translate(example.description).get()]})] : []),
                                example.render(),
                            ],
                        }).getElement(),
                    }).getElement())
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
