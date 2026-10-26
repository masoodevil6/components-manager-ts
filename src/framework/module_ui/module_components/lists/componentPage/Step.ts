import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createPageStep() {
    const setting = DefineWorkflow({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({value: null as {opened: boolean; closed?: boolean} | null}),
    });

    const workflow = DefineWorkflow({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({value: null as {opened: boolean} | null}),
    });

    return DefineWorkflow({children: {setting, workflow}});
}
