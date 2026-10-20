import {ITemplate} from "@/core_route";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Component as ComponentWidget} from "../../../module_components/lists/componentWidget";
import {Component as ComponentEffectChange, EffectChangeMode} from "../../../module_components/lists/componentEffectChange";

type PagerView = "overview" | "components" | "icons";

const viewContent = (view: PagerView): ComponentWidget => {
    const content: Record<PagerView, {title: string; description: string; details: string}> = {
        overview: {
            title: "Pager overview",
            description: "This is a persistent page shell with an animated content area.",
            details: "Use the controls above to switch views. The URL stays at /pager while the content changes.",
        },
        components: {
            title: "Components view",
            description: "This view stands in for the component catalog route.",
            details: "The header and navigation remain mounted; only the main content is replaced.",
        },
        icons: {
            title: "Icons view",
            description: "This view stands in for the icon catalog route.",
            details: "Change the transition mode, then switch views to compare the animation.",
        },
    };
    const current = content[view];
    const responseText = new CoreObservable.App("Waiting for the controller response…");

    return new ComponentWidget({
        prop_layoutContent: CoreReactive.App.section({
            className: ["w-100"],
            children: [
                CoreReactive.App.h2({children: [current.title]}),
                CoreReactive.App.p({children: [current.description]}),
                CoreReactive.App.p({children: [current.details]}),
                CoreReactive.App.section({
                    className: ["mt-3", "p-2", "rounded"],
                    styles: {backgroundColor: "var(--secondaryColor1)"},
                    children: [
                        CoreReactive.App.b({children: ["Controller response"]}),
                        CoreReactive.App.p({className: ["mb-0", "mt-1"], children: [responseText]}),
                    ],
                }),
            ],
        }),
        prop_controller: () => UiCategory.UI.Controllers.Tests.testConnect({page: view}),
        prop_widgetWidth: "100%",
        prop_widgetHeight: "auto",
        prop_widgetMinHeight: "160px",
        prop_widgetStyles: {minHeight: "160px", padding: "var(--paddingMedium)"},
        prop_componentBorderClass: ["shadow-sm", "position-relative"],
    } as any, {
        RESPONSE: (_event, dataArgs) => {
            const response = dataArgs.RESPONSE as {
                messages?: string[];
                reference?: {source?: string | null; respondedAt?: Date};
            };
            const message = response?.messages?.join(" ") ?? "Controller response received.";
            const source = response?.reference?.source ?? "internal controller";
            responseText.set(`${message} Source: ${source}`);
        },
    } as any);
};

export class ClPagerPage implements ITemplate {
    render(): HTMLElement {
        const currentView = new CoreObservable.App<PagerView>("overview");
        const pageContent = new CoreObservable.App<ComponentWidget>(viewContent("overview"));
        const effectMode = new CoreObservable.App(EffectChangeMode.SLIDE);
        const contentEffect = new ComponentEffectChange({
            prop_content: pageContent,
            prop_mode: effectMode,
        } as any);

        const selectView = (view: PagerView) => {
            if (currentView.get() === view) return;
            currentView.set(view);
            pageContent.set(viewContent(view));
        };

        const viewControls = CoreReactive.App.section({
            className: ["d-flex", "flex-wrap", "gap-2", "mb-3"],
            children: [
                this.createButton("Overview", () => selectView("overview")),
                this.createButton("Components", () => selectView("components")),
                this.createButton("Icons", () => selectView("icons")),
            ],
        });

        const modeControls = CoreReactive.App.section({
            className: ["d-flex", "flex-wrap", "align-items-center", "gap-2"],
            children: [
                CoreReactive.App.b({children: ["Transition:"]}),
                ...([
                    [EffectChangeMode.NONE, "None"],
                    [EffectChangeMode.FADE, "Fade"],
                    [EffectChangeMode.SLIDE, "Slide"],
                    [EffectChangeMode.SCALE, "Scale"],
                ] as const).map(([mode, label]) => this.createButton(label, () => effectMode.set(mode))),
                CoreReactive.App.span({
                    className: ["small", "text-muted"],
                    children: ["Selected: ", effectMode],
                }),
            ],
        });

        const navigation = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "w-100"],
            children: [
                CoreReactive.App.p({
                    className: ["mb-2"],
                    children: ["Switch the view without leaving this route; the page shell remains in place."],
                }),
                viewControls,
                modeControls,
                CoreReactive.App.p({
                    className: ["small", "text-muted", "mt-2", "mb-0"],
                    children: ["Current view: ", currentView],
                }),
            ],
        });

        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Pager",
            prop_hasIconBack: true,
            prop_pageNav: [{name: "home", title: "Home"}],
        }, {
            BACK: () => { window.location.href = "/"; },
            SELECT_NAV_ITEM: (_event: Event, args: any) => {
                if (args?.NAME === "home") window.location.href = "/";
            },
        } as any).getElement();

        return UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_navigation: navigation.getElement(),
            prop_content: contentEffect.getReactiveElement(),
            prop_isFullHeight: false,
        } as any).getElement() as HTMLElement;
    }

    private createButton(title: string, onClick: () => void): CoreReactive.App {
        return CoreReactive.App.button({
            className: ["btn", "primary"],
            attrs: {type: "button"},
            children: [title],
            on: {click: onClick},
        });
    }

    onLoad(_pageElement: HTMLElement): void {}
}
