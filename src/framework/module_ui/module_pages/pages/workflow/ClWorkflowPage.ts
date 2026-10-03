import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";

export class ClWorkflowPage implements ITemplate {
    render(): HTMLElement {
        return CoreReactive.App.section({
            className: ["row", "p-0", "m-0"],
            children: [
                CoreReactive.App.section({
                    className: ["col-12", "p-2", "m-2"],
                    children: [
                        UiCategory.UI.Contents.Workflow().getElement(),
                    ],
                }),
            ],
        }).getElement();
    }

    onLoad(_pageElement: HTMLElement): void {
    }
}
