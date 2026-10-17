import * as CoreEvent from "@/core_event";

export const createConsoleStep = () => CoreEvent.Step({
    children: {
        clear: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({count: 0 as number})}),
        entry: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({entry: null as any, level: "log"})}),
        filterChange: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({level: "all"})}),
    },
});
