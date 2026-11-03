import * as UiCategory from "@/ui_categories";
import * as Core from "@/core";
import * as CoreComponents from "@/core_components";
import * as CoreEvent from "@/core_event";
import * as CoreObservable from "@/core_observable";
import * as UiIcons from "@/ui_icons";
import {createHomeExamplesLayout} from "../../pages/home/ClHomePage";
import type {JsonValue} from "../../../module_components/lists/componentJsonTree/Types";
import type {Interface_PageV2} from "../types/Interface_PageV2";

let workflowTreeUnsubscribe: (() => void) | null = null;
let settingContentWidget: any = null;
let workflowData: CoreObservable.App<JsonValue> | null = null;

function serializeWorkflowComponent(step: CoreEvent.TStepRef): JsonValue {
    const componentStep = step as CoreEvent.ClStep;
    const metadata = CoreComponents.Tools.Workflow.Get_ComponentWorkflowMetadata(step);
    const localSteps = Object.fromEntries(
        componentStep.getChildEntries()
            .filter(([key]) => key !== CoreComponents.Tools.Workflow.COMPONENT_WORKFLOW_CHILDREN_KEY)
            .map(([key, child]) => [key, serializeWorkflowStep(child, key)]),
    );
    const children = Object.fromEntries(
        CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(step)
            .map(([key, child]) => [key, serializeWorkflowComponent(child)]),
    );
    return {
        component: metadata?.component ?? {name: componentStep.unique, id: componentStep.unique},
        workflow: {
            root: componentStep.unique,
            steps: localSteps,
            children,
        },
    };
}

function serializeWorkflowStep(step: CoreEvent.TStepRef, name: string): JsonValue {
    const stepInstance = step as CoreEvent.ClStep;
    const steps = Object.fromEntries(
        stepInstance.getChildEntries()
            .filter(([key]) => key !== CoreComponents.Tools.Workflow.COMPONENT_WORKFLOW_CHILDREN_KEY)
            .map(([key, child]) => [key, serializeWorkflowStep(child, key)]),
    );
    return {
        name,
        unique: stepInstance.unique,
        ...(Object.keys(steps).length > 0 ? {steps} : {}),
    };
}

export const PageV2Example: Interface_PageV2 = {
    dictionary: {},
    components: {
        page: {
            component: UiCategory.UI.Pages.Page as any,
            children: {
                prop_header: {
                    component: UiCategory.UI.Fetch.Widget as any,
                    props: {
                        prop_workflowChildName: Core.Dictionary.WorkflowNodeNames.header,
                        prop_widgetWidth: "100%",
                        prop_widgetStyles: {minHeight: "0"},
                        prop_controller: UiCategory.UI.Controllers.MyPage.Tools.headerPublic({
                            pageTitle: "Home",
                            hasIconBack: false,
                            pageNav: [],
                            workflowChildName: Core.Dictionary.WorkflowNodeNames.header,
                            optionsList: [
                                {
                                    id: "open-page-settings",
                                    title: "Settings",
                                    icon: UiIcons.Src.FileSetting.Definition,
                                    action: "open-page-settings",
                                },
                            ],
                            methods: {
                                SELECT_OPTION: function(this: any, _event: Event, args: {NAME?: string}) {
                                    if (args?.NAME !== "open-page-settings") return;

                                    const source = this.getComponentWorkflow() as CoreEvent.TStepRef;
                                    const settingMatch = CoreEvent.findWorkflowNodes(
                                        source,
                                        Core.Dictionary.WorkflowNodeNames.setting,
                                    ).find(({node}) =>
                                        CoreComponents.Tools.Workflow.Get_ComponentWorkflowMetadata(node)?.kind !== "component",
                                    );
                                    if (!settingMatch) return;

                                    const workflowRoot = settingMatch.root;
                                    workflowTreeUnsubscribe?.();
                                    const initialWorkflowData = serializeWorkflowComponent(workflowRoot);
                                    if (!workflowData) workflowData = new CoreObservable.App<JsonValue>(initialWorkflowData);
                                    else workflowData.set(initialWorkflowData);

                                    workflowTreeUnsubscribe = CoreComponents.Tools.Workflow.Subscribe_ComponentWorkflow(
                                        workflowRoot,
                                        () => workflowData?.set(serializeWorkflowComponent(workflowRoot)),
                                    );

                                    if (!settingContentWidget) {
                                        const workflowNodeEntries = Object.values(Core.Dictionary.WorkflowNodeDictionary).map((entry) => ({
                                            name: entry.name,
                                            title: entry.title,
                                        }));
                                        settingContentWidget = UiCategory.UI.Fetch.Widget({
                                            prop_widgetWidth: "100%",
                                            prop_widgetHeight: "100%",
                                            prop_widgetStyles: {height: "100%", minHeight: "0"},
                                            prop_controller: UiCategory.UI.Controllers.MyPage.Tools.pageSettings({
                                                workflowData,
                                                workflowNodeEntries,
                                                workflowNodeNames: {
                                                    tabs: Core.Dictionary.WorkflowNodeNames.tabs,
                                                    workflowEvent: Core.Dictionary.WorkflowNodeNames.workflowEvent,
                                                    dictionary: Core.Dictionary.WorkflowNodeNames.dictionary,
                                                },
                                            }),
                                        });
                                    }
                                    CoreEvent.App.request(
                                        CoreEvent.requestMap([[settingMatch.node, {content: settingContentWidget}]]),
                                        source,
                                    );
                                },
                            },
                        }),
                    },
                },
                prop_content: {
                    component: () => createHomeExamplesLayout(),
                },
            },
        },
    },
};
