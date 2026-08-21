import * as UtilPublics from "@/util_publics";

export const MTGetJsonScript = function<T> (scriptJsonId: string):  T | null {
    const script = document.getElementById(scriptJsonId);
    if (!script) return null;
    const json = script.textContent;
    return UtilPublics.Methods.Json.GetJsonParse<T>(json)
}