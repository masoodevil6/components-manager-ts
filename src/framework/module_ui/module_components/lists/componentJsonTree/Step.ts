import * as CoreEvent from "@/core_event";

export const createJsonTreeStep = () => CoreEvent.Step({
    children: {
        nodeToggle: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({path: "$", expanded: false, value: null as any})}),
        searchChange: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({query: ""})}),
        expandAll: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({count: 0})}),
        collapseAll: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({count: 0})}),
        copy: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({success: false, path: "$", value: null as any})}),
    },
});
