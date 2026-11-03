import type {ComponentExample} from "@/core_components";
import * as CoreEvent from "@/core_event";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as Core from "@/core";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {LayoutColumn} from "../../componentLayout/Props";

export const WorkflowCompositionExample: ComponentExample = {
    id: "page_workflow_composition",
    name: Keys.category.components.page.examples.workflowComposition.name,
    description: Keys.category.components.page.examples.workflowComposition.description,
    render: (): HTMLElement => {
        const status = new CoreObservable.App("Edit the secondary input to send an event to its nearest layout.");
        let page: any = null;

        const createInputChangeHandler = (sourceNodeName: string) => function(
            this: any,
            _event: Event,
            _dataArgs: unknown,
            componentArgs: {VALUE?: string} | null,
        ): void {
            if (!page) return;

            const nearestLayouts = CoreEvent.findWorkflowNodes(
                sourceNodeName,
                Core.Dictionary.WorkflowNodeNames.layout,
                page.getComponentWorkflow(),
            );
            const layoutNode = nearestLayouts[0]?.node;
            if (!layoutNode) {
                status.set("No layout workflow node was found.");
                return;
            }

            const showPopup = CoreEvent.getChild(layoutNode, Core.Dictionary.WorkflowNodeNames.showPopup);
            if (!showPopup) {
                status.set("The selected layout has no showPopup event.");
                return;
            }

            const value = componentArgs?.VALUE ?? "";
            const sourceStep = this.getComponentWorkflow().inputChange;
            const response = CoreEvent.App.request(
                CoreEvent.requestMap([[showPopup, {message: `Layout received: ${value || "(empty)"}`}]]),
                sourceStep,
            ).get(showPopup);
            status.set(response?.value?.message ?? `Layout event completed (${response?.status ?? "no response"}).`);
        };

        const primaryInput = UiCategory.UI.Inputs.Input({
            prop_name: "primaryInput",
            prop_labelTitle: "Primary input",
            prop_placeholder: "This input is not wired to the demo event",
            prop_value: "",
            prop_workflowChildName: Core.Dictionary.WorkflowNodeNames.primaryInput,
        });

        const secondaryInput = UiCategory.UI.Inputs.Input({
            prop_name: "secondaryInput",
            prop_labelTitle: "Secondary input",
            prop_placeholder: "Type to send an event to Layout",
            prop_value: "",
            prop_workflowChildName: Core.Dictionary.WorkflowNodeNames.secondaryInput,
        }, {
            INPUT_CHANGE: createInputChangeHandler(Core.Dictionary.WorkflowNodeNames.secondaryInput),
        });

        const workflowButton = CoreReactive.App.button({
            className: ["btn", "primary", "align-self-start"],
            children: ["Show workflow tree"],
            on: {
                click: () => {
                    if (!page) return;
                    const workflowStep = page.getComponentWorkflow().workflow;
                    CoreEvent.App.request(
                        CoreEvent.requestMap([[workflowStep, {}]]),
                        workflowStep,
                    );
                },
            },
        });
        const statusText = CoreReactive.App.span({
            propsBind: {textContent: status},
        });
        const actionPanel = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-2", "p-2"],
            children: [workflowButton, statusText],
        });

        const layout = UiCategory.UI.Basic.Layout({
            prop_workflowChildName: Core.Dictionary.WorkflowNodeNames.layout,
            prop_col: LayoutColumn.CUSTOM,
            prop_layoutContent: [
                {content: primaryInput, col: LayoutColumn.COL_6},
                {content: secondaryInput, col: LayoutColumn.COL_6},
                {content: actionPanel, col: LayoutColumn.COL_12},
            ],
        });

        CoreEvent.App.registerEmit(layout.getComponentWorkflow().showPopup, (request) => {
            const message = String(request.payload.message ?? "Layout received an event.");
            status.set(message);
            return {message};
        });

        page = UiCategory.UI.Pages.Page({
            prop_isFullHeight: false,
            prop_header: "Page → Layout → Input workflow composition",
            prop_content: layout,
        });

        return page.getElement() as HTMLElement;
    },
};
