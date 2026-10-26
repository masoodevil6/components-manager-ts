import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
export function createInputAclStep() {
    const endpoint = () => DefineWorkflow({request:CoreEvent.Request(),response:CoreEvent.Response({value:null as any})});
    return DefineWorkflow({children:{open:endpoint(),accept:endpoint(),cancel:endpoint(),change:endpoint(),clear:endpoint()}});
}
