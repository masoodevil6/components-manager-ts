import * as CoreEvent from "@/core_event";
import type {TStepDefinition} from "@/core_event";
import type {Empty_ComponentWorkflowDefinition, Interface_ComponentWorkflow} from "./Interface_ComponentWorkflow";

export function Define_ComponentWorkflow(): Interface_ComponentWorkflow<Empty_ComponentWorkflowDefinition>;
export function Define_ComponentWorkflow<TDefinition extends TStepDefinition>(
    definition: TDefinition,
): Interface_ComponentWorkflow<TDefinition>;
export function Define_ComponentWorkflow<TDefinition extends TStepDefinition>(
    definition?: TDefinition,
): Interface_ComponentWorkflow<TDefinition | Empty_ComponentWorkflowDefinition> {
    const StepRegister = definition === undefined
        ? CoreEvent.Step({})
        : CoreEvent.Step(definition);
    return StepRegister as Interface_ComponentWorkflow<TDefinition | Empty_ComponentWorkflowDefinition>;
}
