import * as Core from "@/core";
import * as CoreEvent from "@/core_event";

type WorkflowComponent = {getComponentWorkflow?: () => CoreEvent.TStepRef};

/** Creates a page-local search endpoint that sidebar widgets can notify through CoreEvent. */
export function createPageSearchWorkflow(onSearch: (query: string) => void) {
    let activeSearchStep: CoreEvent.TStepRef | null = null;
    const stepsByPage = new WeakMap<object, CoreEvent.TStepRef>();
    const searchNodeName = Core.Dictionary.WorkflowNodeNames.pageSearch;

    const attach = (page: WorkflowComponent): void => {
        const pageWorkflow = page?.getComponentWorkflow?.();
        if (!pageWorkflow) return;

        let searchStep = stepsByPage.get(pageWorkflow as object);
        if (!searchStep) {
            const existing = CoreEvent.getChild(pageWorkflow, searchNodeName);
            if (existing) {
                searchStep = existing;
            } else {
                searchStep = CoreEvent.Step({
                    request: CoreEvent.Request(),
                    response: CoreEvent.Response({value: "" as string}),
                });
                CoreEvent.SubEvent(pageWorkflow, searchNodeName, searchStep);
            }
            // A reused page keeps its workflow step; replace the handler so it targets
            // the content controller currently mounted in the shared page shell.
            CoreEvent.App.registerEmit(searchStep, (request: CoreEvent.ClRequest) => {
                const query = String(request.payload?.value ?? "");
                onSearch(query);
                return {value: query};
            });
            stepsByPage.set(pageWorkflow as object, searchStep);
        }
        activeSearchStep = searchStep;
    };

    const notify = (source: CoreEvent.TStepRef, query: unknown): void => {
        if (!activeSearchStep) return;
        CoreEvent.App.request(
            CoreEvent.requestMap([[activeSearchStep, {value: String(query ?? "")}]]),
            source,
        );
    };

    return {attach, notify};
}
