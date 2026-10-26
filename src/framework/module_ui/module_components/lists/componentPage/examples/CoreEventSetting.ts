import {DefineWorkflow} from "@/core_components";
import type {ComponentExample} from "@/core_components";
import * as CoreEvent from "@/core_event";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const CoreEventSettingExample: ComponentExample = {
    id: "page_core_event_setting",
    name: Keys.category.components.page.examples.coreEventSetting.name,
    description: Keys.category.components.page.examples.coreEventSetting.description,
    render: (): HTMLElement => {
        const pageWorkflow = DefineWorkflow({
            children: {
                openSettings: DefineWorkflow({
                    request: CoreEvent.Request(),
                    response: CoreEvent.Response(),
                }),
            },
        });
        let settingEndpoint: CoreEvent.TStepRef | null = null;
        const settingContent = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-2", "p-3"],
            children: [
                CoreReactive.App.h3({children: ["Workspace settings"]}),
                CoreReactive.App.p({children: ["This content was delivered through a CoreEvent request."]}),
            ],
        });
        const openSettingsButton = CoreReactive.App.button({
            className: ["btn", "primary", "align-self-start"],
            children: ["Open settings through CoreEvent"],
            unique: pageWorkflow.openSettings,
            on: {
                click: (_event, helper) => {
                    if (!settingEndpoint) return;
                    const target = settingEndpoint;
                    const response = helper.request(
                        CoreEvent.requestMap([[target, {content: settingContent}]]),
                        pageWorkflow.openSettings,
                    ).get(target);
                    console.log("[CoreEvent] page setting request", response);
                },
            },
        });
        const content = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-2", "p-3"],
            children: [
                CoreReactive.App.p({children: ["The page setting content is sent only after the request below."]}),
                openSettingsButton,
            ],
        });

        const page = UiCategory.UI.Pages.Page({
            prop_isFullHeight: false,
            prop_header: "CoreEvent page workflow",
            prop_navigation: "Page / Settings",
            prop_content: content,
        }, {}, {unique: pageWorkflow}).getElement() as HTMLElement;
        const pageStep = CoreEvent.getChild(pageWorkflow, "page");
        settingEndpoint = pageStep ? CoreEvent.getChild(pageStep, "setting") : null;
        if (!settingEndpoint) throw new Error("ComponentPage did not register its setting endpoint.");
        return page;
    },
};
