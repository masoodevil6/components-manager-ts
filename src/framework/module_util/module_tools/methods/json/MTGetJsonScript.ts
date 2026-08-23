
///------------------------------
import {MTGetJsonParse as GetJsonParse}    from "../../methods/json/MTGetJsonParse"

export const MTGetJsonScript = function<T> (scriptJsonId: string):  T | null {
    const script = document.getElementById(scriptJsonId);
    if (!script) return null;
    const json = script.textContent;
    return GetJsonParse<T>(json)
}