import * as CoreObservable from "@/core_observable";
import * as Utils from "@/utils";



type ClassValue = string | string[];
type StyleMap = Record<string, string>;
type AttrMap = Record<string, string | boolean | null | undefined>;

type EventMap = Record<string, (e: Event) => void>;

type Options = {
    props?: any;
    propsBind?: any;
    children?: any;
    className?: ClassValue;
    classBind?: any;
    styles?: StyleMap;
    stylesCustom?: string;
    stylesBind?: any;
    attrs?: AttrMap;
    attrsBind?: Record<string, CoreObservable.Observable<any>>;
    on?: EventMap;
};

type EventListenerRecord = {
    event: string;
    handler: EventListener;
};



export class ReactiveElement {

    static version: string = "1.0.0-beta";

    tagName: string;
    element: HTMLElement;

    private _options: Options;
    private _eventListeners: EventListenerRecord[] = [];
    private _states: Set<string> = new Set();
    private _children: any[] = [];
    private _hoverHandlers: Record<string, any> = {};
    private _bindings: (() => void)[] = [];

    hover: CoreObservable.Observable<boolean>;
    focus: CoreObservable.Observable<boolean>;
    active: CoreObservable.Observable<boolean>;

    constructor(tagName: string, options: Options = {}) {

        this.tagName = tagName;
        this._options = options;

        this.element = document.createElement(tagName);

        this.hover = new CoreObservable.Observable(false);
        this.element.addEventListener("mouseenter", () => this.hover.set(true));
        this.element.addEventListener("mouseleave", () => this.hover.set(false));

        this.focus = new CoreObservable.Observable(false);
        this.element.addEventListener("focus", () => this.focus.set(true), true);
        this.element.addEventListener("blur", () => this.focus.set(false), true);

        this.active = new CoreObservable.Observable(false);
        this.element.addEventListener("mousedown", () => this.active.set(true));
        this.element.addEventListener("mouseup", () => this.active.set(false));
        this.element.addEventListener("mouseleave", () => this.active.set(false));

        this._applyOptions();
    }

    private _bindObservable<T>(observable: CoreObservable.Observable<T>, callback: (v: T) => void) {
        callback(observable.get());
        const unsub = observable.subscribe(callback);
        this._bindings.push(unsub);
    }

    // props
    _applyProps(props) {
        if (!props) return;

        Object.entries(props).forEach(([key, value]) => {
            this.element[key] = value;
        });
    }

    _applyPropsBind<T>(propsBind: T) {
        if (!propsBind) return;

        Object.entries(propsBind).forEach(([key, observable]) => {
            this._bindObservable(observable, value => {
                this.element[key] = value;
            });
        });
    }

    // className
    private _applyClassName(className?: ClassValue) {

        if (!className) return;

        if (typeof className === "string") {
            this.element.className = className;
        }
        else if (Array.isArray(className)) {
            this.element.className = className.join(" ");
        }
    }

    private _applyClassBind(classBind: CoreObservable.Observable<any>[]) {

        if (!classBind) return;

        classBind.forEach(observable => {

            let prev: string[] = [];

            this._bindObservable(observable, value => {

                if (prev.length) {
                    this.element.classList.remove(...prev);
                }

                let next: string[] = [];

                if (Array.isArray(value)) {
                    next = value.filter(Boolean);
                }
                else if (typeof value === "string") {
                    next = [value];
                }

                if (next.length) {
                    this.element.classList.add(...next.filter(Boolean));
                }

                prev = next;

            });

        });

    }



    private _toCssPropertyName(name: string): string {
        return name.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    }

    private _setStyle(key: string, value: any) {

        if (key.startsWith("--")) {

            if (value == null) {
                this.element.style.removeProperty(key);
                return;
            }

            if (
                value &&
                typeof value === "object" &&
                value.important
            ) {
                this.element.style.setProperty(
                    key,
                    String(value.value),
                    "important"
                );
            } else {
                this.element.style.setProperty(
                    key,
                    String(value)
                );
            }

            return;
        }

        //console.log(" ---------------------- SET " , value , value instanceof StyleValue);

        if (
            value &&
            typeof value === "object" &&
            value.important
        ) {

            this.element.style.setProperty(
                this._toCssPropertyName(key),
                String(value.value),
                "important"
            );

            return;
        }

        (this.element.style as any)[key] = value;
    }


    // styles
    private _applyStyles(styles?: StyleMap) {

        if (!styles) return;

        Object.entries(styles).forEach(([key, value]) => {
            this._setStyle(key, value);
        });

    }

    private _applyStylesBind(
        stylesBind: Record<string, CoreObservable.Observable<any>> | CoreObservable.Observable<Record<string, any>>
    ) {

        if (!stylesBind) return;

        if (CoreObservable.Observable.isObservable(stylesBind)) {

            this._bindObservable(stylesBind, value => {
                if (value && typeof value === "object") {
                    Object.entries(value).forEach(([styleKey, styleValue]) => {
                        this._setStyle(styleKey, styleValue);
                    });
                }
            });

            return;
        }

        Object.entries(stylesBind).forEach(([key, observable]) => {


            if (!CoreObservable.Observable.isObservable(observable)) {
                return;
            }

            this._bindObservable(observable, value => {

                if (value instanceof Utils.Styles.Class.ClStyleValue) {
                    this._setStyle(key, value);
                    return;
                }

                if (value && typeof value === "object") {

                    Object.entries(value).forEach(([styleKey, styleValue]) => {
                        this._setStyle(styleKey, styleValue);
                    });

                } else {

                    this._setStyle(key, value);

                }

            });

        });

    }

    private _applyCustomStyle(css?: string) {

        if (!css) return;

        const style = document.createElement("style");
        style.textContent = css;

        this.element.prepend(style);
    }

    // attrs
    private _applyAttrs(attrs?: AttrMap) {

        if (!attrs) return;

        Object.entries(attrs).forEach(([key, value]) => {

            if (value !== false && value != null) {
                this.element.setAttribute(key, String(value));
            }

        });
    }

    private _applyAttrsBind(attrsBind?: Record<string, CoreObservable.Observable<any>>) {

        if (!attrsBind) return;

        Object.entries(attrsBind).forEach(([key, observable]) => {

            this._bindObservable(observable, value => {

                if (value === false || value == null) {
                    this.element.removeAttribute(key);
                }
                else {
                    this.element.setAttribute(key, String(value));
                }

            });

        });
    }

    // children
    private _setChildren(children: any) {
       // this.element.textContent = "";
        this._children = [];

        // اگر function است اجرا کن
        if (typeof children === "function") {
            children = children(this);
        }

        const append = (child: any) => {
            if (child === null || child === undefined || child === false || child === true) return;

            if (Array.isArray(child)) {
                child.forEach(append);
                return;
            }

            if (child instanceof CoreObservable.Observable) {
                const start = document.createComment("obs-start");
                const end = document.createComment("obs-end");

                this.element.appendChild(start);
                this.element.appendChild(end);

                const render = (value: any) => {
                    // پاک کردن فقط محدوده خود observable
                    let node = start.nextSibling;
                    while (node && node !== end) {
                        const next = node.nextSibling;
                        node.remove();
                        node = next;
                    }

                    // 👇 این مهمه
                    const insert = (v: any) => {
                        if (v === null || v === undefined || v === false || v === true) return;

                        if (Array.isArray(v)) {
                            v.forEach(insert);
                            return;
                        }

                        if (v instanceof ReactiveElement) {
                            end.before(v.element);
                            return;
                        }

                        if (v instanceof HTMLElement) {
                            end.before(v);
                            return;
                        }

                        if (typeof v === "string" && v.trim().startsWith("<")) {
                            const template = document.createElement("template");
                            template.innerHTML = v;
                            end.before(template.content.cloneNode(true));
                            return;
                        }

                        const textNode = document.createTextNode(String(v));
                        end.before(textNode);
                    };

                    insert(value);
                };

                render(child.get());
                const unsub = child.subscribe(render);
                this._bindings.push(unsub);

                return;
            }

            if (child instanceof ReactiveElement) {
                this._children.push(child);
                this.element.appendChild(child.element);
                return;
            }

            if (child instanceof HTMLElement) {
                this._children.push(child);
                this.element.appendChild(child);
                return;
            }

            if (typeof child === "string" && child.trim().startsWith("<")) {
                const template = document.createElement("template");
                template.innerHTML = child;
                this.element.appendChild(template.content.cloneNode(true));
                return;
            }

            const textNode = document.createTextNode(String(child));
            this.element.appendChild(textNode);
        };

        append(children);
    }

    // events
    private _setEvents() {

        this._eventListeners.forEach(({ event, handler }) => {
            this.element.removeEventListener(event, handler);
        });

        this._eventListeners = [];

        const events = this._options.on;
        if (!events) return;

        Object.entries(events).forEach(([event, handler]) => {

            const wrapped: EventListener = (e) => {

                if (this._states.has("disabled") && event !== "mouseenter" && event !== "mouseleave") {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                handler(e);

            };

            this.element.addEventListener(event, wrapped);
            this._eventListeners.push({ event, handler: wrapped });

        });
    }

    _addEvent(event: string, handler: (e: Event) => void){
        const wrappedHandler = (e: Event) => {
            if (this._states.has("disabled") && event !== "mouseenter" && event !== "mouseleave"){
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            handler?.call(this , e);
        }

        this.element.addEventListener(event , wrappedHandler);
        this._eventListeners.push({event , handler: wrappedHandler});

        return this;
    }

    _removeEvent(event: string, handler: EventListener | null = null){
        this._eventListeners = this._eventListeners.filter(item=>{
            if (item.event !== event) return true;
            if (handler && item.handler !== handler) return true;
            this.element.removeEventListener(item.event , item.handler);
            return false;
        })
        return this;
    }

    on(event: string, handler: (e: Event) => void){
        return this._addEvent(event , handler);
    }

    off(event: string, handler: EventListener | null = null){
        return this._removeEvent(event , handler);
    }



    private _applyOptions() {

        const o = this._options;

        if (o.children != null) this._setChildren(o.children);

        if (o.props) this._applyProps(o.props);
        if (o.propsBind) this._applyPropsBind(o.propsBind);

        if (o.attrs) this._applyAttrs(o.attrs);
        if (o.attrsBind) this._applyAttrsBind(o.attrsBind);

        if (o.className) this._applyClassName(o.className);
        if (o.classBind) {

            if (typeof o.classBind === "function") {
                this._applyClassBind(o.classBind(this));
            }
            else {
                this._applyClassBind(o.classBind);
            }

        }

        if (o.styles) this._applyStyles(o.styles);
        if (o.stylesCustom) this._applyCustomStyle(o.stylesCustom);
        if (o.stylesBind) {

            if (typeof o.stylesBind === "function") {
                this._applyStylesBind(o.stylesBind(this));
            }
            else {
                this._applyStylesBind(o.stylesBind);
            }

        }

        if (o.on) this._setEvents();
    }

    getReactiveElement(): ReactiveElement {
        return this;
    }

    getElement(): HTMLElement {
        return this.element;
    }

    remove() {
        this.element?.remove?.();
    }

    static create(tagName: string, options?: Options) {
        return new ReactiveElement(tagName, options);
    }

    static component(componentName: string ,o?: Options) { return new ReactiveElement(`component-${componentName}`, o) }
    static part(el: string = "section" ,o?: Options) {
        /*const className = ["position-relative"]
        if (o == null){
            o = {
                className: className
            }
        }
        else{
            if (o.hasOwnProperty("className")){
                o["className"] = [...className , ...o.className];
            }
            else {
                o["className"] = className;
            }
        }*/

        return new ReactiveElement(el, o)
    }



    ///---------------------------------
    ///
    ///---------------------------------
    focusFn(options?: FocusOptions) : ReactiveElement {
        this.getElement().focus(options);
        return this;
    }
    blurFn() : ReactiveElement {
        this.getElement().blur();
        return this;
    }


    ///---------------------------------
    ///
    ///---------------------------------
    static div(o?: Options) { return new ReactiveElement("div", o) }
    static button(o?: Options) { return new ReactiveElement("button", o) }
    static b(o?: Options) { return new ReactiveElement("b", o) }
    static span(o?: Options) { return new ReactiveElement("span", o) }
    static section(o?: Options) { return new ReactiveElement("section", o) }
    static a(o?: Options) { return new ReactiveElement("a", o) }
    static label(o?: Options) { return new ReactiveElement("label", o) }
    static input(o?: Options) { return new ReactiveElement("input", o) }
    static h1(o?: Options) { return new ReactiveElement("h1", o) }
    static h2(o?: Options) { return new ReactiveElement("h2", o) }
    static h3(o?: Options) { return new ReactiveElement("h3", o) }
    static p(o?: Options) { return new ReactiveElement("p", o) }
    static ul(o?: Options) { return new ReactiveElement("ul", o) }
    static li(o?: Options) { return new ReactiveElement("li", o) }
    static img(o?: Options) { return new ReactiveElement("img", o) }
    static i(o?: Options) { return new ReactiveElement("i", o) }
    static style(o?: Options) { return new ReactiveElement("style", o) }
    static select(o?: Options) { return new ReactiveElement("select", o) }
    static option(o?: Options) { return new ReactiveElement("option", o) }
}