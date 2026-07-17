

export class ToolsTemplate {

    static replaceInTextWithPatternParams(
        template: string,
        params: Record<string, unknown> = {}
    ): string {

        return template.replace(/{{(.*?)}}/g, (_, key) => {

            const value = params[key.trim()];

            return value == null
                ? `{{${key.trim()}}}`
                : String(value);

        });
    }

}