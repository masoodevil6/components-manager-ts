import * as UtilTools from "@/util_tools"

export const MTGetJsonScript = function<T> (scriptJsonId: string):  T | null {
    const script = document.getElementById(scriptJsonId);
    if (!script) return null;
    const json = script.textContent;
    return UtilTools.Methods.Json.GetJsonParse<T>(json)
}