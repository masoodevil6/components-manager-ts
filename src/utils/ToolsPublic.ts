export interface FormItem {
    name: string;
    value: unknown;
}


export class ToolsPublic {



    static getScriptJson<T = unknown>(
        scriptJsonId: string
    ): T | null {

        const script = document.getElementById(scriptJsonId);

        if (!script)
            return null;

        try {

            return JSON.parse(script.textContent ?? "") as T;

        } catch (e) {

            console.error("JSON parse error", scriptJsonId, e);

            return null;
        }
    }





    static parseJson<T = unknown>(
        json: string
    ): T | null {

        try {

            return JSON.parse(json) as T;

        } catch (e) {

            console.error("JSON parse error", e);

            return null;
        }
    }





    static async copyText(text: string): Promise<void> {
        await navigator.clipboard.writeText(text);
    }






    static renderListClass(
        data?: string | string[] | null
    ): string {

        if (Array.isArray(data))
            return data.join(" ");

        return data ?? "";
    }

    static renderListStyle(
        data?: string | Record<string, string | number> | null
    ): string {

        if (!data)
            return "";

        if (typeof data === "string")
            return data;

        return Object.entries(data)
            .map(([key, value]) => `${key}:${value};`)
            .join("");
    }







    static mergeFormArray(
        base: FormItem[],
        incoming: FormItem[]
    ): FormItem[] {

        const map = new Map<string, unknown>(
            base.map(item => [item.name, item.value])
        );

        incoming.forEach(item => {
            map.set(item.name, item.value);
        });

        return Array.from(
            map,
            ([name, value]) => ({ name, value })
        );
    }




}