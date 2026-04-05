type Subscriber<T> = (value: T) => void;
type Mapping<T, U> = ((value: T) => U) | { [key: string]: U | Observable<U>; default?: U | Observable<U> };

export class Observable<T> {
    private _value: T;
    private _subscribers: Set<Subscriber<T>>;

    __isObservable = true;

    static isObservable(obj: any): obj is Observable<any>{
        return obj && obj.__isObservable;
    }


    constructor(value: T) {
        this._value = value;
        this._subscribers = new Set();
    }

    get(): T {
        return this._value;
    }

    set(value: T): void {
        if (this._value === value) return;
        this._value = value;
        this._notify();
    }

    subscribe(fn: Subscriber<T>): () => void {
        this._subscribers.add(fn);
        return () => this._subscribers.delete(fn);
    }

    map<U>(fn: (value: T) => U): Observable<U> {
        const derived = new Observable(fn(this._value));
        this.subscribe(v => derived.set(fn(v)));
        return derived;
    }

    mapBoolean<U>(trueValue: U, falseValue: U): Observable<U> {
        const derived = new Observable(this._value ? trueValue : falseValue);
        this.subscribe(v => derived.set(v ? trueValue : falseValue));
        return derived;
    }

    mapList<U>(mapping: Mapping<T, U>): Observable<U> {
        const initialMappedValue = this._mapValue(this._value, mapping);
        const derived = new Observable(initialMappedValue);

        this.subscribe(v => {
            const mappedValue = this._mapValue(v, mapping);
            derived.set(mappedValue);
        });

        return derived;
    }

    link(mapper) {
        const derived = new Observable(
            this.get().map(mapper)
        );

        this.subscribe(arr => {
            derived.set(arr.map(mapper));
        });

        return derived;
    }

    private _mapValue<U>(value: T, mapping: Mapping<T, U>): U {
        if (typeof mapping === 'function') {
            return mapping(value);
        } else if (typeof mapping === 'object' && mapping !== null) {
            if (value in mapping) {
                const mapped = mapping[value];
                return this._unwrapObservable(mapped);
            } else if ('default' in mapping) {
                return this._unwrapObservable(mapping.default!);
            }
        }
        return value as unknown as U;
    }

    private _unwrapObservable<U>(val: U | Observable<U>): U {
        return val instanceof Observable ? val.get() : val;
    }

    private _notify(): void {
        this._subscribers.forEach(fn => fn(this._value));
    }
}