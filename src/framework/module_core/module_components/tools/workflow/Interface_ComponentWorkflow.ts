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

/** A live component instance that can contribute its workflow to a parent. */
export type Interface_ComponentWorkflowChild<
    TWorkflow extends CoreEvent.TStepRef = CoreEvent.TStepRef,
> = {
    getComponentWorkflow(): TWorkflow;
    get(propName: string): unknown;
    getReactiveElement?(): unknown;
    getElement?(): unknown;
    dispose?(): void;
    _COMPONENT_NAME?: string;
};

export type TComponentWorkflowNodeMetadata = {
    component?: {name: string; id: string};
    childName?: string;
    kind?: "component" | "children";
};
