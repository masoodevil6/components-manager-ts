import * as CoreEvent from "@/core_event";
import type {TStepRef} from "@/core_event";
import type {TComponentWorkflowNodeMetadata} from "./Interface_ComponentWorkflow";

/** Internal namespace separating composed components from a component's own event steps. */
export const COMPONENT_WORKFLOW_CHILDREN_KEY = "components";

const workflowNodeMetadata = new WeakMap<object, TComponentWorkflowNodeMetadata>();
const workflowChangeListeners = new WeakMap<object, Set<() => void>>();
export type WorkflowChildAttacher = (child: unknown, childName?: string) => void;
type WorkflowCompositionFrame = {
    attachChild: WorkflowChildAttacher;
    workflow?: TStepRef;
};
export type WorkflowCompositionContext = readonly WorkflowCompositionFrame[];
const workflowCompositionStack: WorkflowCompositionFrame[] = [];
let workflowCompositionSuspensionDepth = 0;
const workflowElementOwners = new WeakMap<Element, unknown>();

/** Run a component render part with its owner available to nested component elements. */
export function With_ComponentWorkflowComposition<T>(
    attachChildOrContext: WorkflowChildAttacher | WorkflowCompositionContext,
    render: () => T,
    workflow?: TStepRef,
): T {
    const frames = typeof attachChildOrContext === "function"
        ? [{attachChild: attachChildOrContext, workflow}]
        : attachChildOrContext.map((frame) => ({...frame}));
    if (workflow && frames.length > 0 && typeof attachChildOrContext !== "function") {
        frames[frames.length - 1] = {...frames[frames.length - 1], workflow};
    }
    const initialLength = workflowCompositionStack.length;
    workflowCompositionStack.push(...frames);
    try {
        return render();
    } finally {
        workflowCompositionStack.length = initialLength;
    }
}

/** Capture the complete owner chain for component children created reactively later. */
export function Capture_ComponentWorkflowComposition(): WorkflowCompositionContext | null {
    return workflowCompositionStack.length > 0
        ? workflowCompositionStack.map((frame) => ({...frame}))
        : null;
}

/** True while a nested component is being rendered inside an outer component's render call. */
function Is_Nested_ComponentWorkflowComposition(
    owner: CoreEvent.ClStep,
    nested: CoreEvent.ClStep,
): boolean {
    const nestedIndex = workflowCompositionStack.findIndex((frame) => frame.workflow?.identity === nested.identity);
    if (nestedIndex <= 0) return false;

    // Reactive children may run with only captured inner frames. An already
    // attached descendant of the old owner still establishes that the new
    // owner is being rendered within the same subtree.
    for (const frame of workflowCompositionStack.slice(0, nestedIndex)) {
        if (!frame.workflow) continue;
        let candidate: CoreEvent.ClStep | null = frame.workflow as CoreEvent.ClStep;
        while (candidate) {
            if (candidate.identity === owner.identity) return true;
            candidate = candidate.getParent();
        }
    }
    return false;
}

/** Associate a rendered component root with its live instance before it is placed in a parent. */
export function Register_ComponentWorkflowElement(element: Element, component: unknown): void {
    workflowElementOwners.set(element, component);
}

/** Recover a live component when a caller has already requested its root DOM element. */
export function Get_ComponentWorkflowElementOwner(element: Element): unknown {
    return workflowElementOwners.get(element) ?? null;
}

/** Find direct component roots embedded in a DOM fragment, stopping at each component boundary. */
export function Get_ComponentWorkflowElementDescendants(root: Element): unknown[] {
    const components: unknown[] = [];
    const visit = (element: Element) => {
        for (const child of Array.from(element.children)) {
            const component = workflowElementOwners.get(child);
            if (component) components.push(component);
            else visit(child);
        }
    };
    visit(root);
    return components;
}

/** Attach a component during parent rendering; the parent may derive a name when none was configured. */
export function Attach_Current_ComponentWorkflowChild(child: unknown): boolean {
    if (workflowCompositionSuspensionDepth > 0) return false;
    if (child == null || typeof child !== "object") return false;
    const childComponent = child as {
        getComponentWorkflow?: () => TStepRef;
        get?: (propName: string) => unknown;
    };
    if (typeof childComponent.getComponentWorkflow !== "function") return false;

    const childWorkflow = childComponent.getComponentWorkflow();
    const parentFrame = [...workflowCompositionStack].reverse().find((frame) =>
        !frame.workflow || frame.workflow.identity !== childWorkflow.identity,
    );
    const attachChild = parentFrame?.attachChild;
    if (!attachChild) return false;
    const configuredName = childComponent.get?.("prop_workflowChildName");
    const childName = typeof configuredName === "string" && configuredName.trim().length > 0
        ? configuredName.trim()
        : undefined;
    workflowCompositionSuspensionDepth += 1;
    try {
        attachChild(child, childName);
    } finally {
        workflowCompositionSuspensionDepth -= 1;
    }
    return true;
}

export function Set_ComponentWorkflowMetadata(
    workflow: TStepRef,
    metadata: TComponentWorkflowNodeMetadata,
): void {
    const current = workflowNodeMetadata.get(workflow as object) ?? {};
    workflowNodeMetadata.set(workflow as object, {...current, ...metadata});
}

export function Get_ComponentWorkflowMetadata(
    workflow: TStepRef,
): Readonly<TComponentWorkflowNodeMetadata> | null {
    return workflowNodeMetadata.get(workflow as object) ?? null;
}

/**
 * Subscribe to structural changes in a workflow subtree. Changes from descendants
 * bubble to this workflow, so a tree view can refresh from its owning component.
 */
export function Subscribe_ComponentWorkflow(
    workflow: TStepRef,
    listener: () => void,
): () => void {
    const key = workflow as object;
    let listeners = workflowChangeListeners.get(key);
    if (!listeners) {
        listeners = new Set();
        workflowChangeListeners.set(key, listeners);
    }
    listeners.add(listener);

    return () => {
        listeners?.delete(listener);
        if (listeners?.size === 0) workflowChangeListeners.delete(key);
    };
}

function notifyWorkflowChanged(workflow: TStepRef): void {
    let current: CoreEvent.ClStep | null = workflow as CoreEvent.ClStep;
    const visited = new Set<symbol>();
    const listeners = new Set<() => void>();

    while (current && !visited.has(current.identity)) {
        visited.add(current.identity);
        for (const listener of workflowChangeListeners.get(current) ?? []) listeners.add(listener);
        current = current.getParent();
    }

    for (const listener of listeners) listener();
}

function getComponentChildrenBranch(parent: TStepRef, create: boolean): TStepRef | null {
    const current = CoreEvent.getChild(parent, COMPONENT_WORKFLOW_CHILDREN_KEY);
    if (current) {
        if (Get_ComponentWorkflowMetadata(current)?.kind !== "children") {
            throw new Error(
                `[ComponentWorkflow] "${COMPONENT_WORKFLOW_CHILDREN_KEY}" is reserved for child component workflows.`,
            );
        }
        return current;
    }
    if (!create) return null;

    const branch = CoreEvent.Step({});
    Set_ComponentWorkflowMetadata(branch, {kind: "children"});
    CoreEvent.SubEvent(parent, COMPONENT_WORKFLOW_CHILDREN_KEY, branch);
    return branch;
}

/**
 * Attach a live component workflow under a stable child slot. The reserved internal
 * branch keeps component nodes distinct from local event steps with the same name.
 */
export function Attach_ComponentWorkflow(
    parent: TStepRef,
    childName: string,
    child: TStepRef,
    metadata: Omit<TComponentWorkflowNodeMetadata, "kind"> = {},
): TStepRef {
    if (typeof childName !== "string" || childName.trim().length === 0) {
        throw new TypeError("[ComponentWorkflow] A non-empty child name is required.");
    }

    const parentStep = parent as CoreEvent.ClStep;
    const childStep = child as CoreEvent.ClStep;
    if (parentStep.identity === childStep.identity) {
        throw new Error("[ComponentWorkflow] A workflow cannot contain itself.");
    }

    let ancestor: CoreEvent.ClStep | null = parentStep;
    while (ancestor) {
        if (ancestor.identity === childStep.identity) {
            throw new Error("[ComponentWorkflow] Attaching this child would create a workflow cycle.");
        }
        ancestor = ancestor.getParent();
    }

    const branch = getComponentChildrenBranch(parent, true)! as CoreEvent.ClStep;
    const existing = branch.getChild(childName);
    if (existing?.identity === childStep.identity) {
        Set_ComponentWorkflowMetadata(child, {...metadata, childName, kind: "component"});
        return child;
    }
    if (existing) {
        throw new Error(`[ComponentWorkflow] Child slot "${childName}" is already occupied.`);
    }

    let currentParent = childStep.getParent();
    if (currentParent && currentParent.identity !== branch.identity) {
        const currentParentMetadata = Get_ComponentWorkflowMetadata(currentParent);
        let canMoveWithinComposition = false;

        if (currentParentMetadata?.kind === "children") {
            // A component may first be discovered under an outer component,
            // then appear inside a nested component's DOM. Move it down to the
            // nested owner only when that owner is inside its current owner.
            const currentOwner = currentParent.getParent();
            let ancestor: CoreEvent.ClStep | null = parentStep;
            while (ancestor && ancestor.identity !== currentOwner?.identity) {
                ancestor = ancestor.getParent();
            }
            canMoveWithinComposition = !!currentOwner && (
                ancestor?.identity === currentOwner.identity
                || Is_Nested_ComponentWorkflowComposition(currentOwner, parentStep)
            );
        } else {
            // Some legacy components attach beneath an event step. Find the
            // component root owning that event step, then allow the move only
            // when the new owner is inside that component's composed subtree.
            let currentOwner: CoreEvent.ClStep | null = currentParent;
            while (currentOwner && Get_ComponentWorkflowMetadata(currentOwner)?.kind !== "component") {
                currentOwner = currentOwner.getParent();
            }

            if (currentOwner) {
                let ancestor: CoreEvent.ClStep | null = parentStep;
                while (ancestor && ancestor.identity !== currentOwner.identity) {
                    ancestor = ancestor.getParent();
                }
                canMoveWithinComposition = ancestor?.identity === currentOwner.identity
                    || Is_Nested_ComponentWorkflowComposition(currentOwner, parentStep);
            } else {
                // Support low-level workflow trees without component metadata.
                let ancestor: CoreEvent.ClStep | null = currentParent;
                while (ancestor && ancestor.identity !== parentStep.identity) {
                    ancestor = ancestor.getParent();
                }
                canMoveWithinComposition = ancestor?.identity === parentStep.identity;
            }
        }

        if (canMoveWithinComposition) {
            const currentParentKey = childStep.getParentKey();
            if (currentParentKey) {
                CoreEvent.DetachSubEvent(currentParent, currentParentKey, childStep);
                currentParent = childStep.getParent();
            }
        }

        if (currentParent && currentParent.identity !== branch.identity) {
            throw new Error("[ComponentWorkflow] This workflow is already attached to another parent.");
        }
    }
    if (currentParent?.identity === branch.identity && childStep.getParentKey() !== childName) {
        throw new Error("[ComponentWorkflow] This workflow is already attached under another child name.");
    }

    CoreEvent.SubEvent(branch, childName, child);
    Set_ComponentWorkflowMetadata(child, {...metadata, childName, kind: "component"});
    notifyWorkflowChanged(parent);
    return child;
}

/** Detach one child slot without disposing the child workflow or its emit handlers. */
export function Detach_ComponentWorkflow(
    parent: TStepRef,
    childName: string,
    expectedChild?: TStepRef,
): TStepRef | null {
    const branch = getComponentChildrenBranch(parent, false);
    if (!branch) return null;

    const child = CoreEvent.DetachSubEvent(branch, childName, expectedChild);
    if (child) {
        const metadata = Get_ComponentWorkflowMetadata(child);
        if (metadata?.childName === childName) {
            Set_ComponentWorkflowMetadata(child, {childName: undefined});
        }
        notifyWorkflowChanged(parent);
    }
    return child;
}

/** Read child component workflows without exposing the internal namespace node. */
export function Get_ComponentWorkflowChildren(
    parent: TStepRef,
): ReadonlyArray<readonly [string, TStepRef]> {
    const branch = getComponentChildrenBranch(parent, false) as CoreEvent.ClStep | null;
    return branch?.getChildEntries() ?? [];
}
