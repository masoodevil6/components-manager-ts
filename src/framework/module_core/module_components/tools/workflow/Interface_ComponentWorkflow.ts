import type * as CoreEvent from "@/core_event";

export type Empty_ComponentWorkflowDefinition = {children: {}};

/** Typed CoreEvent step tree owned by a component instance. */
export type Interface_ComponentWorkflow<
    TDefinition extends CoreEvent.TStepDefinition = Empty_ComponentWorkflowDefinition,
> = CoreEvent.TStepInstance<TDefinition> & {
    getParent(): CoreEvent.TStepRef | null;
    getParentKey(): string | null;
    getChild(key: string): CoreEvent.TStepRef | undefined;
    getChildEntries(): ReadonlyArray<readonly [string, CoreEvent.TStepRef]>;
};
