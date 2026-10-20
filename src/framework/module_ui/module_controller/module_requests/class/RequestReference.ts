import {UrlMethods} from "@/util_consts";
import type {RequestReferenceKey, RequestReferenceState} from "../types/RequestState";

const createDefaultReference = (): RequestReferenceState => ({
    source: null,
    method: UrlMethods.GET,
    respondedAt: new Date(),
});

export class RequestReference {
    private _reference: RequestReferenceState;

    constructor(initialReference: Partial<RequestReferenceState> = {}) {
        this._reference = {...createDefaultReference(), ...initialReference};
        this._reference.respondedAt = initialReference.respondedAt
            ? new Date(initialReference.respondedAt.getTime())
            : new Date(this._reference.respondedAt.getTime());
    }

    get(): RequestReferenceState;
    get<TKey extends RequestReferenceKey>(key: TKey): RequestReferenceState[TKey];
    get<TKey extends RequestReferenceKey>(key?: TKey): RequestReferenceState | RequestReferenceState[TKey] {
        if (key === undefined) return this.copyReference();
        return this.copyValue(key);
    }

    set<TKey extends RequestReferenceKey>(key: TKey, value: RequestReferenceState[TKey]): this;
    set(values: Partial<RequestReferenceState>): this;
    set<TKey extends RequestReferenceKey>(keyOrValues: TKey | Partial<RequestReferenceState>, value?: RequestReferenceState[TKey]): this {
        if (typeof keyOrValues === "string") {
            this.assignValue(keyOrValues as TKey, value as RequestReferenceState[TKey]);
            return this;
        }

        (Object.keys(createDefaultReference()) as RequestReferenceKey[]).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(keyOrValues, key) && keyOrValues[key] !== undefined) {
                this.assignValue(key, keyOrValues[key] as RequestReferenceState[typeof key]);
            }
        });
        return this;
    }

    private copyReference(): RequestReferenceState {
        return {...this._reference, respondedAt: new Date(this._reference.respondedAt.getTime())};
    }

    private copyValue<TKey extends RequestReferenceKey>(key: TKey): RequestReferenceState[TKey] {
        const value = this._reference[key];
        if (key === "respondedAt") return new Date((value as Date).getTime()) as RequestReferenceState[TKey];
        return value;
    }

    private assignValue<TKey extends RequestReferenceKey>(key: TKey, value: RequestReferenceState[TKey]): void {
        if (key === "respondedAt") {
            this._reference.respondedAt = value == null ? new Date() : new Date((value as Date).getTime());
            return;
        }
        this._reference[key] = value as RequestReferenceState[TKey];
    }
}
