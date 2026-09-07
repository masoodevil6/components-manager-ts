import { beforeAll, beforeEach, afterEach } from "vitest";
import { JSDOM } from "jsdom";

// Import framework bootstrap — triggers component registration + language init
import "@/framework";
import "@/ui_components/lists";

let dom: JSDOM;

beforeAll(() => {
    dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
        url: "http://localhost:5173",
        pretendToBeVisual: true,
    });

    globalThis.window    = dom.window as any;
    globalThis.document  = dom.window.document;
    globalThis.navigator = dom.window.navigator as any;
    globalThis.HTMLElement  = dom.window.HTMLElement as any;
    globalThis.Element      = dom.window.Element as any;
    globalThis.Event        = dom.window.Event as any;
    globalThis.MouseEvent   = dom.window.MouseEvent as any;
    globalThis.CustomEvent  = dom.window.CustomEvent as any;
    // Keep Node's native performance — jsdom's Performance.now() has a recursion bug
    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
        setTimeout(() => cb(performance.now()), 16)) as any;

    globalThis.document.addEventListener = dom.window.document.addEventListener.bind(dom.window.document);
    globalThis.document.removeEventListener = dom.window.document.removeEventListener.bind(dom.window.document);
    globalThis.window.addEventListener    = dom.window.addEventListener.bind(dom.window);
    globalThis.window.removeEventListener = dom.window.removeEventListener.bind(dom.window);
    globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
});

beforeEach(() => {
    dom.window.document.body.innerHTML = "";
});

afterEach(() => {
    dom.window.document.body.innerHTML = "";
    if (typeof (globalThis as any).gc === "function") (globalThis as any).gc();
});
