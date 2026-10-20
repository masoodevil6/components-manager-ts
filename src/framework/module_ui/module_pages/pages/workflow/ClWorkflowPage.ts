import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";

export class ClWorkflowPage implements ITemplate {
    render(): HTMLElement {
        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Workflow",
            prop_hasIconBack: true,
            prop_pageNav: [
                {name: "home", title: "Home"},
            ],
        }, {
            BACK: () => { window.location.href = "/"; },
            SELECT_NAV_ITEM: (_event: Event, args: any) => {
                if (args?.NAME === "home") window.location.href = "/";
            },
        } as any).getElement();
        const content = CoreReactive.App.section({
            className: ["row", "p-0", "m-0"],
            children: [
                CoreReactive.App.section({
                    className: ["col-12", "p-2", "m-2"],
                    children: [
                        UiCategory.UI.Contents.Workflow().getElement(),
                    ],
                }),
            ],
        });
        return UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_content: content.getElement(),
        } as any).getElement() as HTMLElement;
    }

    onLoad(_pageElement: HTMLElement): void {
    }
}
