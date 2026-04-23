type Subscriber<T> = (value: T) => void;
type Mapping<T, U> = ((value: T) => U) | { [key: string]: U | Observable<U>; default?: U | Observable<U> };

export class Scope{
    private disposables: (() => void)[] = [];
    private children: Scope[] = [];
    private isDispose = false;

    track(dispose: DisposeFm){
        if (this.isDispose){
            dispose();
            return;
        }
        this.disposables.push(dispose);
    }

    createChild(): Scope{
        const child = new Scope();
        this.children.push(child);
        return child;
    }

    dispose(){
        if (this.isDispose) return;
        this.isDispose = true;

        for (const child of this.children){
            child.dispose();
        }
        this.children = [];

        for (const d of this.disposables){
            try {
                d()
            }
            catch (e){
                console.warn("Scope dispose error:" , e);
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

    subscribe(fn: Subscriber<T> , scope?: Scope): () => void {
        this._subscribers.add(fn);

        const unsubscribe = () => this._subscribers.delete(fn)

        if (scope){
            scope.track(unsubscribe)
        }

        return  unsubscribe
    }

    map<U>(fn: (value: T) => U , scope?: Scope): Observable<U> {
        const derived = new Observable(fn(this._value));

        const unsub = this.subscribe(v => derived.set(fn(v)))

        this._bindToScope(unsub , scope)

        return derived;
    }

    mapBoolean<U>(trueValue: U, falseValue: U, scope?: Scope): Observable<U> {
        const derived = new Observable(this._value ? trueValue : falseValue);
        const unsub = this.subscribe(v => derived.set(v ? trueValue : falseValue));

        this._bindToScope(unsub , scope)

        return derived;
    }

    mapList<U>(mapping: Mapping<T, U>, scope?: Scope): Observable<U> {
        const initialMappedValue = this._mapValue(this._value, mapping);
        const derived = new Observable(initialMappedValue);

        const unsub = this.subscribe(v => {
            const mappedValue = this._mapValue(v, mapping);
            derived.set(mappedValue);
        })

        this._bindToScope(unsub , scope)

        return derived;
    }

    mapArray<U>(
        mapper: (
            item: T extends (infer R)[] ? R : never ,
            index: number
        ) => U ,
        scope?: Scope
    ): Observable<U[]>{

        const initial = (this.get() as any[]).map((item , index) => mapper(item , index));
        const derived = new Observable(initial);

        const unsub = this.subscribe(arr => {
            derived.set(arr.map( (item , index) => mapper(item, index)))
        })

        this._bindToScope(unsub , scope)

        return derived;
    }

    static computed(fn , observables , scope?: Scope){
        const getValues = () => observables.map(o => o.get());
        const derived = new Observable(fn(...getValues()));

        const update = () => {
            derived.set(fn(...getValues()));
        }

        const unsubscribes = observables.map(o=> o.subscribe(update , scope));

        if (scope){
            scope.track(()=> {
                unsubscribes.forEach(u => u());
            });
        }

        return derived;
    }

    private _mapValue<U>(value: T, mapping: Mapping<T, U>): U {
        if (typeof mapping === 'function') {
            return mapping(value);
        } else if (typeof mapping === 'object' && mapping !== null) {

            const hasKey = value in mapping;
            const mapped = hasKey ? mapping[value] : mapping.default;

            if (mapped === null || mapped === undefined){
                return this._unwrapObservable(mapping.default as any);
            }

            return this._unwrapObservable(mapped)
        }
        return value as unknown as U;
    }


    private _bindToScope(unsub: ()=> void  , scope?:Scope){
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