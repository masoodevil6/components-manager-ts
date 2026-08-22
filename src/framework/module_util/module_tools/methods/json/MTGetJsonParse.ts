
export const MTGetJsonParse = function<T> (json: string):  T | null {
    try {
        return JSON.parse(json) as T;
    } catch (e) {
        console.error("JSON parse error", e);
        return null;
    }
}