import type {HttpStatusCode, UrlMethods} from "@/util_consts";
import type {RequestMethod} from "./RequestMethod";

export type RequestReferenceState = {
    source: string | null;
    method: UrlMethods | RequestMethod;
    respondedAt: Date;
};

export type RequestState = {
    state: HttpStatusCode | null;
    status: boolean;
    messages: string[];
    data: Record<string, any>;
    /** Optional source content associated with the response, such as source returned by a request. */
    source: string | null;
    /** Optional address or path of the source associated with the response. */
    sourceAddress: string | null;
    /** Optional UI widget configuration returned alongside the response data. */
    widget?: Record<string, any> | null | undefined;
    reference: RequestReferenceState;
};

export type RequestStateInput = Partial<Omit<RequestState, "reference">> & {
    reference?: Partial<RequestReferenceState>;
};

export type RequestStateKey = keyof RequestState;
export type RequestReferenceKey = keyof RequestReferenceState;
