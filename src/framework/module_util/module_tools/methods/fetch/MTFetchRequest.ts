export type TFetchField = {
    name: string;
    value: unknown;
    type?: string;
};

export type TFetchRequestData = {
    type?: unknown;
    data?: unknown;
    formData?: HTMLFormElement | FormData | TFetchField[] | null;
    method?: string;
    contentType?: "auto" | "json" | "html" | "text" | "application/json" | "text/html";
};

export type TFetchRequestResult<TResponse = unknown, TResult = unknown> = {
    resultExp: TResult;
    response: TResponse;
    data: unknown;
    formData: FormData;
};

export type TFetchRequestOptions = {
    /** Optional request data bundle matching the former tools_submit.fetcth data shape. */
    request?: TFetchRequestData;
    method?: string;
    /** Additional fields appended to the request body. */
    data?: unknown;
    type?: unknown;
    formData?: HTMLFormElement | FormData | TFetchField[] | null;
    contentType?: TFetchRequestData["contentType"];
    onLoading?: (loading: boolean) => void | Promise<void>;
    onNotFound?: (response: Response) => void | Promise<void>;
    onMessages?: (messages: unknown[], type: "success" | "error" | "warning", response: unknown) => void | Promise<void>;
    onResponse?: (resultExp: unknown, response: unknown, data: unknown) => void | Promise<void>;
    onError?: (error: unknown) => void | Promise<void>;
};

/**
 * Runs a form-data request and exposes lifecycle callbacks so UI components can
 * connect their own loading, not-found, message, and response behavior.
 */
export const MTFetchRequest = async function <TResponse = unknown, TResult = unknown>(
    url: string,
    options: TFetchRequestOptions = {},
): Promise<TFetchRequestResult<TResponse, TResult> | null> {
    try {
        await options.onLoading?.(true);
        const requestData = options.request;
        const type = options.type ?? requestData?.type;
        const requestForm = options.formData ?? requestData?.formData;
        const body = createFormData(type, requestData?.data, options.data, requestForm);
        const response = await fetch(url, {
            method: options.method ?? requestData?.method ?? "POST",
            body,
        });

        if (response.status === 404) {
            await options.onNotFound?.(response);
            return null;
        }

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}.`);
        }

        const contentType = options.contentType ?? requestData?.contentType ?? (options.request ? "json" : "auto");
        const parsed = await parseResponse(response, contentType);
        const resultExp = parsed && typeof parsed === "object" && "resultExp" in parsed
            ? (parsed as {resultExp: unknown}).resultExp
            : parsed;
        const messages = parsed && typeof parsed === "object" && Array.isArray((parsed as {messages?: unknown}).messages)
            ? (parsed as {messages: unknown[]}).messages
            : [];
        const messageType = parsed && typeof parsed === "object" && "status" in parsed
            ? ((parsed as {status: unknown}).status ? "success" : "error")
            : "warning";

        await options.onMessages?.(messages, messageType, parsed);
        const requestValue = options.request ?? options.data;
        await options.onResponse?.(resultExp, parsed, requestValue);

        return {
            resultExp: resultExp as TResult,
            response: parsed as TResponse,
            data: requestValue,
            formData: body,
        };
    } catch (error) {
        await options.onError?.(error);
        return null;
    } finally {
        await options.onLoading?.(false);
    }
};

async function parseResponse(response: Response, contentType: TFetchRequestData["contentType"]): Promise<unknown> {
    if (contentType === "json" || contentType === "application/json") return response.json();
    if (contentType === "html" || contentType === "text" || contentType === "text/html") return response.text();

    const responseType = response.headers.get("content-type") ?? "";
    return responseType.includes("json") ? response.json() : response.text();
}

function createFormData(type: unknown, ...sources: unknown[]): FormData {
    const result = new FormData();
    if (type != null) result.append("type", String(type));
    sources.forEach((source) => appendData(result, source));
    return result;
}

function appendData(target: FormData, source: unknown): void {
    if (source == null) return;

    if (source instanceof FormData) {
        source.forEach((value, key) => target.append(key, value));
        return;
    }

    if (typeof HTMLFormElement !== "undefined" && source instanceof HTMLFormElement) {
        new FormData(source).forEach((value, key) => target.append(key, value));
        return;
    }

    if (Array.isArray(source)) {
        source.forEach((field) => {
            if (!field || typeof field.name !== "string" || field.value == null) return;
            appendFieldValue(target, field.name, field.value, field.type);
        });
        return;
    }

    if (typeof source === "object") {
        Object.entries(source).forEach(([key, value]) => {
            if (value == null) return;
            const values = Array.isArray(value) ? value : [value];
            values.forEach((item) => appendFieldValue(target, key, item));
        });
    }
}

function appendFieldValue(target: FormData, name: string, value: unknown, type?: string): void {
    if (value == null) return;

    if (type === "file" && typeof FileList !== "undefined" && value instanceof FileList) {
        Array.from(value).forEach((file) => target.append(name, file, file.name));
        return;
    }

    if (Array.isArray(value)) {
        value.forEach((item) => appendFieldValue(target, name, item, type));
        return;
    }

    if (typeof Blob !== "undefined" && value instanceof Blob) {
        if (typeof File !== "undefined" && value instanceof File) target.append(name, value, value.name);
        else target.append(name, value);
        return;
    }

    target.append(name, typeof value === "string" ? value : String(value));
}
