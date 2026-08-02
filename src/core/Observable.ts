type Subscriber<T> = (value: T) => void;
type Mapping<T, U> = ((value: T) => U) | { [key: string]: U | Observable<U>; default?: U | Observable<U> };
type DisposeFm = () => void;


type ChooseMap<TKey extends PropertyKey, TResult> = {
    [K in TKey]?: () => TResult;
} & {
    else?: () => TResult;
};

export class Scope {
    private disposables: (() => void)[] = [];
    private children: Scope[] = [];
    private isDispose = false;

    track(dispose: DisposeFm) {
        if (this.isDispose) {
            dispose();
            return;
        }
        this.disposables.push(dispose);
    }

    createChild(): Scope {
        const child = new Scope();
        this.children.push(child);
        return child;
    }

    dispose() {
        if (this.isDispose) return;
        this.isDispose = true;

        for (const child of this.children) {
            child.dispose();
        }
        this.children = [];

        for (const d of this.disposables) {
            try {
                d()
            }
            catch (e) {
                console.warn("Scope dispose error:", e);
            }
        }

        this.disposables = [];
    }
}

export class Observable<T> {
    private _value: T;
    private _subscribers: Set<Subscriber<T>>;

    __isObservable = true;
    private _isDispose = false

    static isObservable(obj: any): obj is Observable<any> {
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

    /*update(fn: (current: T, observable: Observable<T>) => T): void {
        this.set(fn(this._value, this));
    }*/

    update<TMap extends Record<string, Observable<any>>>(
        fn: (
            current: T,
            observable: Observable<T>,
            values: {
                [K in keyof TMap]: TMap[K] extends Observable<infer U> ? U : never;
            }
        ) => T,
        observables: TMap
    ): void {

        const values = {} as any;

        for (const key in observables) {
            values[key] = observables[key].get();
        }

        this.set(
            fn(this._value, this, values)
        );

    }

    /*duplicate(scope?: Scope): Observable<T> {
        const derived = new Observable(this.get());

        const unsub = this.subscribe(v => {
            derived.set(v);
        });

        this._bindToScope(unsub, scope);

        return derived;
    }*/

    subscribe(fn: Subscriber<T>, scope?: Scope): () => void {
        this._subscribers.add(fn);

        const unsubscribe = () => this._subscribers.delete(fn)

        if (scope) {
            scope.track(unsubscribe)
        }

        return unsubscribe
    }

    map<U>(fn: (value: T) => U, scope?: Scope): Observable<U> {
        const derived = new Observable(fn(this._value));

        const unsub = this.subscribe(v => derived.set(fn(v)))

        this._bindToScope(unsub, scope)

        return derived;
    }

    mapBoolean<U>(trueValue: U, falseValue: U, scope?: Scope): Observable<U> {
        const derived = new Observable(this._value ? trueValue : falseValue);
        const unsub = this.subscribe(v => derived.set(v ? trueValue : falseValue));

        this._bindToScope(unsub, scope)

        return derived;
    }

    mapList<U>(mapping: Mapping<T, U>, scope?: Scope): Observable<U> {
        const initialMappedValue = this._mapValue(this._value, mapping);
        const derived = new Observable(initialMappedValue);

        const unsub = this.subscribe(v => {
            const mappedValue = this._mapValue(v, mapping);
            derived.set(mappedValue);
        })

        this._bindToScope(unsub, scope)

        return derived;
    }

    mapArray<U, R>(
        mapper: (item: R, index: number) => U,
        scope?: Scope
    ): Observable<U[]> {
        const initial = (this.get() as R[]).map((item, index) => mapper(item, index));
        const derived = new Observable(initial);

        const unsub = this.subscribe(arr => {
            derived.set((arr as R[]).map((item, index) => mapper(item, index)))
        })

        this._bindToScope(unsub, scope)

        return derived;
    }

    static computed<T>(fn: (...args: any[]) => T, observables: Observable<any>[], scope?: Scope): Observable<T> {
        const getValues = () => observables.map(o => o.get());
        const derived = new Observable(fn(...getValues()));

        const update = () => {
            derived.set(fn(...getValues()));
        }

        const unsubscribes = observables.map(o => o.subscribe(update, scope));

        if (scope) {
            scope.track(() => {
                unsubscribes.forEach(u => u());
            });
        }

        return derived;
    }



    static conditionSwitch<TKey extends PropertyKey, TResult>(
        observable: Observable<TKey>,
        map: ChooseMap<TKey, TResult>,
        scope?: Scope
    ): Observable<TResult | null> {

        const evaluate = (): TResult | null => {

            const value = observable.get();

            if (value != null && value in map) {
                return map[value]!();
            }

            return map.else ? map.else() : null;
        };

        const derived = new Observable<TResult | null>(evaluate());

        const unsub = observable.subscribe(() => {
            derived.set(evaluate());
        });

        scope?.track(unsub);

        return derived;
    }



    static conditionWhen<TResult>(
        observableOrList: Observable<any> | Observable<any>[],
        condition: (...values: any[]) => boolean,
        onTrue: () => TResult,
        onFalse?: () => TResult,
        scope?: Scope
    ): Observable<TResult | null> {

        const observables = Array.isArray(observableOrList)
            ? observableOrList
            : [observableOrList];

        const getValues = () => observables.map(o => o.get());

        const evaluate = (): TResult | null => {

            const values = getValues();

            if (condition(...values)) {
                return onTrue();
            }

            return onFalse ? onFalse() : null;
        };

        const derived = new Observable<TResult | null>(evaluate());

        const update = () => derived.set(evaluate());

        const unsubs = observables.map(o => o.subscribe(update));

        scope?.track(() => {
            unsubs.forEach(u => u());
        });

        return derived;
    }


    static for<T, TResult>(
        source: Observable<T[]>,
        mapper: (
            item: T,
            index: number,
            context: Record<string, Observable<any>>
        ) => TResult,
        context: Record<string, Observable<any>> = {},
        scope?: Scope
    ): Observable<TResult[]> {

        const render = () =>
            source.get().map((item, index) =>
                mapper(item, index, context)
            );

        const derived = new Observable<TResult[]>(render());

        const unsub = source.subscribe(() => {
            derived.set(render());
        });

        scope?.track(unsub);

        return derived;
    }




    static forObject<
        TObject extends Record<string, any>,
        TResult
    >(
        source: Observable<TObject>,
        mapper: (
            key: keyof TObject,
            value: TObject[keyof TObject],
            index: number,
            context: Record<string, Observable<any>>
        ) => TResult,
        context: Record<string, Observable<any>> = {},
        scope?: Scope
    ): Observable<TResult[]> {

        const render = () =>
            Object.entries(source.get()).map(
                ([key, value], index) =>
                    mapper(
                        key as keyof TObject,
                        value as TObject[keyof TObject],
                        index,
                        context
                    )
            );


        const derived = new Observable<TResult[]>(render());


        const unsub = source.subscribe(() => {
            derived.set(render());
        });


        scope?.track(unsub);


        return derived;
    }





    private _mapValue<U>(value: T, mapping: Mapping<T, U>): U {
        if (typeof mapping === 'function') {
            return mapping(value);
        } else if (typeof mapping === 'object' && mapping !== null) {

            const hasKey = (value as string | number | symbol) in mapping;
            const mapped = hasKey ? mapping[value as string] : mapping.default;

            if (mapped === null || mapped === undefined) {
                return this._unwrapObservable(mapping.default as any);
            }

            return this._unwrapObservable(mapped)
        }
        return value as unknown as U;
    }


    private _bindToScope(unsub: () => void, scope?: Scope) {
        if (!scope) return;
        scope.track(unsub);
    }

    private _unwrapObservable<U>(val: U | Observable<U>): U {
        return val instanceof Observable ? val.get() : val;
    }

    private _notify(): void {
        if (this._isDispose) return;
        this._subscribers.forEach(fn => fn(this._value));
    }
}