import type {RequestReferenceState, RequestState, RequestStateInput, RequestStateKey} from "../types/RequestState";
import {RequestReference} from "./RequestReference";

const createDefaultState = (): RequestState => ({
    state: null,
    status: false,
    messages: [],
    data: {},
    source: null,
    sourceAddress: null,
    widget: undefined,
    reference: new RequestReference().get(),
});

export class RequestManager {
    private _state: RequestState;

    constructor(initialState: RequestStateInput = {}) {
        const defaultState = createDefaultState();
        this._state = {...defaultState, ...initialState, reference: defaultState.reference};
        this._state.messages = [...(initialState.messages ?? [])];
        this._state.data = {...(initialState.data ?? {})};
        this._state.reference = new RequestReference(initialState.reference).get();
    }

    get(): RequestState;
    get<TKey extends RequestStateKey>(key: TKey): RequestState[TKey];
    get<TKey extends RequestStateKey>(key?: TKey): RequestState | RequestState[TKey] {
        if (key === undefined) return this.copyState();
        return this.copyValue(key);
    }

    set(key: "reference", value: Partial<RequestReferenceState>): this;
    set<TKey extends Exclude<RequestStateKey, "reference">>(key: TKey, value: RequestState[TKey]): this;
    set(values: RequestStateInput): this;
    set<TKey extends RequestStateKey>(keyOrValues: TKey | RequestStateInput, value?: RequestState[TKey] | Partial<RequestReferenceState>): this {
        if (typeof keyOrValues === "string") {
            this.assignValue(keyOrValues as TKey, value as RequestState[TKey]);
            return this;
        }

        const values = keyOrValues as RequestStateInput;
        (Object.keys(createDefaultState()) as RequestStateKey[]).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(values, key) && values[key] !== undefined) {
                this.assignValue(key, values[key] as RequestState[typeof key]);
            }
        });
        return this;
    }

    private copyState(): RequestState {
        return {
            ...this._state,
            messages: [...this._state.messages],
            data: {...this._state.data},
            reference: new RequestReference(this._state.reference).get(),
        };
    }

    private copyValue<TKey extends RequestStateKey>(key: TKey): RequestState[TKey] {
        const value = this._state[key];
        if (key === "messages") return [...(value as string[])] as RequestState[TKey];
        if (key === "data") return {...(value as Record<string, any>)} as RequestState[TKey];
        if (key === "reference") return new RequestReference(value as RequestState["reference"]).get() as RequestState[TKey];
        return value;
    }

    private assignValue<TKey extends RequestStateKey>(key: TKey, value: RequestState[TKey]): void {
        if (key === "messages") {
            this._state.messages = [...(value as string[])];
            return;
        }
        if (key === "data") {
            this._state.data = {...(value as Record<string, any>)};
            return;
        }
        if (key === "reference") {
            this._state.reference = new RequestReference({
                ...this._state.reference,
                ...(value as Partial<RequestReferenceState>),
            }).get();
            return;
        }
        this._state[key] = value as RequestState[TKey];
    }
}
