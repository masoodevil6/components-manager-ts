import {ITemplate} from "@/core_route";
import * as Core from "@/core";
import * as UiCategory from "@/ui_categories";
import {executeHomeExample} from "@/ui_controller/module_requests/module_static/v1/MyPageHome";

// Keep these exports available for the v2 page example and the controller test page.
export {executeHomeExample} from "@/ui_controller/module_requests/module_static/v1/MyPageHome";
export {createHomeExamplesLayout} from "@/ui_controller/module_requests/module_static/v1/MyPageHomePage";

export class ClHomePage implements ITemplate {
    render(): HTMLElement {
        const response = UiCategory.UI.Controllers.MyPage.Home.homePage({
            run: executeHomeExample,
            workflowNodeNames: Core.Dictionary.WorkflowNodeNames,
        });
        const controller = UiCategory.UI.Controllers.MyPage.Tools.pageFormat({
            ...response.data,
            pageTitle: "Home",
            controllerSource: response.reference.source,
        });
        const widget = UiCategory.UI.Fetch.Widget({
            prop_widgetWidth: "100%",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: [],
            prop_componentBorderStyles: {
                border: "0",
                borderRadius: "0",
                boxShadow: "none",
                padding: "0",
                margin: "0",
                background: "transparent",
            },
            prop_controller: controller,
        } as any);

        return widget.getElement() as HTMLElement;
    }

    onLoad(_pageElement: HTMLElement): void {}
}
