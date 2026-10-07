import * as CoreEvent from "@/core_event";
export function createInputAclStep() {
    const endpoint = () => CoreEvent.Step({request:CoreEvent.Request(),response:CoreEvent.Response({value:null as any})});
    return CoreEvent.Step({children:{open:endpoint(),accept:endpoint(),cancel:endpoint(),change:endpoint(),clear:endpoint()}});
}
