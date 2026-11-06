// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import * as CoreObservable from "@/core_observable";
import {ClRouter} from "../../src/framework/module_core/module_route/class/ClRouter";
import {Navigate, RouteRenderMode} from "../../src/framework/module_core/module_route";

const activeRouters: ClRouter[] = [];

class HomeTemplate {
    render(): HTMLElement {
        const element = document.createElement("main");
        element.textContent = "Home route";
        return element;
    }

    onLoad(): void {}
}

describe("router navigation", () => {
    afterEach(() => {
        for (const router of activeRouters.splice(0)) router.destroy();
        history.replaceState({}, "", "/");
        document.body.innerHTML = "";
        document.head.innerHTML = "<title></title>";
    });

    it("replaces the legacy v2 address with /home and renders the destination", () => {
        document.head.innerHTML = "<title></title>";
        const root = document.createElement("div");
        document.body.appendChild(root);
        const router = new ClRouter(root, {
            "/home": {
                template: HomeTemplate,
                headerTitle: new CoreObservable.App("Home"),
            },
            "/v2": {redirectTo: "/home"},
        });
        activeRouters.push(router);

        history.replaceState({}, "", "/v2");
        router.resolve();

        expect(location.pathname).toBe("/home");
        expect(root.textContent).toBe("Home route");
        expect(document.title).toBe("Home");
    });

    it("renders controller routes through the injected controller host", () => {
        document.head.innerHTML = "<title></title>";
        const root = document.createElement("div");
        document.body.appendChild(root);
        const controller = () => ({status: true});
        let renderedController: unknown = null;
        const router = new ClRouter(root, {
            "/home": {
                controller,
                widgetProps: {prop_widgetWidth: "100%"},
                headerTitle: new CoreObservable.App("Home"),
            },
        }, (route) => {
            renderedController = route.controller;
            const element = document.createElement("main");
            element.textContent = "Controller home";
            return element;
        });
        activeRouters.push(router);

        history.replaceState({}, "", "/home");
        router.resolve();

        expect(renderedController).toBe(controller);
        expect(root.textContent).toBe("Controller home");
        expect(document.title).toBe("Home");
    });

    it("navigates between routes and restores the previous view on browser Back", async () => {
        document.head.innerHTML = "<title></title>";
        const root = document.createElement("div");
        document.body.appendChild(root);
        const homeController = () => ({status: true});
        const componentsController = () => ({status: true});
        const router = new ClRouter(root, {
            "/v2/home": {
                controller: homeController,
                headerTitle: new CoreObservable.App("Home"),
            },
            "/v2/components": {
                controller: componentsController,
                headerTitle: new CoreObservable.App("Components"),
            },
        }, (route) => {
            const element = document.createElement("main");
            element.textContent = route.controller === componentsController ? "Components page" : "Home page";
            return element;
        });
        activeRouters.push(router);

        history.pushState({}, "", "/v2/home");
        router.resolve();
        Navigate("/v2/components");

        expect(location.pathname).toBe("/v2/components");
        expect(root.textContent).toBe("Components page");
        expect(document.title).toBe("Components");

        const popstate = new Promise<void>((resolve) => window.addEventListener("popstate", () => resolve(), {once: true}));
        history.back();
        await popstate;
        expect(location.pathname).toBe("/v2/home");
        expect(root.textContent).toBe("Home page");
        expect(document.title).toBe("Home");
    });

    it("intercepts same-origin links and leaves external or modified clicks to the browser", () => {
        const root = document.createElement("div");
        document.body.appendChild(root);
        const router = new ClRouter(root, {
            "/v2/home": {
                controller: () => ({status: true}),
                headerTitle: new CoreObservable.App("Home"),
            },
            "/v2/components": {
                controller: () => ({status: true}),
                headerTitle: new CoreObservable.App("Components"),
            },
        }, (route) => {
            const element = document.createElement("main");
            element.textContent = route.headerTitle.get();
            return element;
        });
        activeRouters.push(router);
        history.replaceState({}, "", "/v2/home");
        router.resolve();

        const link = document.createElement("a");
        link.href = "/v2/components";
        link.textContent = "Components";
        root.appendChild(link);
        const click = new MouseEvent("click", {bubbles: true, cancelable: true, button: 0});
        link.dispatchEvent(click);

        expect(click.defaultPrevented).toBe(true);
        expect(location.pathname).toBe("/v2/components");
        expect(root.querySelector("main")?.textContent).toBe("Components");
    });

    it("applies the configured route render mode after the initial page", () => {
        const root = document.createElement("div");
        document.body.appendChild(root);
        const originalAnimate = HTMLElement.prototype.animate;
        const animations: Array<{keyframes: Keyframe[]; options: number | KeyframeAnimationOptions}> = [];
        HTMLElement.prototype.animate = function(keyframes, options) {
            animations.push({keyframes: keyframes as Keyframe[], options: options ?? {}});
            return {} as Animation;
        };

        try {
            const router = new ClRouter(root, {
                "/plain": {
                    controller: () => ({status: true}),
                    headerTitle: new CoreObservable.App("Plain"),
                },
                "/animated": {
                    controller: () => ({status: true}),
                    headerTitle: new CoreObservable.App("Animated"),
                    renderMode: RouteRenderMode.SLIDE,
                    renderDuration: 425,
                },
            }, (route) => {
                const element = document.createElement("main");
                element.textContent = route.headerTitle.get();
                return element;
            });
            activeRouters.push(router);
            history.replaceState({}, "", "/plain");
            router.resolve();
            expect(animations).toHaveLength(0);

            Navigate("/animated");

            expect(animations).toHaveLength(1);
            expect(animations[0].options).toMatchObject({duration: 425});
            expect(animations[0].keyframes[0].transform).toContain("24px");
        } finally {
            if (originalAnimate) HTMLElement.prototype.animate = originalAnimate;
            else delete (HTMLElement.prototype as any).animate;
        }
    });

    it("runs route guards before changing history and follows guard redirects", () => {
        const root = document.createElement("div");
        document.body.appendChild(root);
        const router = new ClRouter(root, {
            "/home": {
                controller: () => ({status: true}),
                headerTitle: new CoreObservable.App("Home"),
            },
            "/private": {
                controller: () => ({status: true}),
                headerTitle: new CoreObservable.App("Private"),
                beforeEnter: () => false,
            },
            "/old": {
                controller: () => ({status: true}),
                headerTitle: new CoreObservable.App("Old"),
                beforeEnter: () => "/home",
            },
        }, (route) => {
            const element = document.createElement("main");
            element.textContent = route.headerTitle.get();
            return element;
        });
        activeRouters.push(router);
        history.replaceState({}, "", "/home");
        router.resolve();

        router.navigate("/private");
        expect(location.pathname).toBe("/home");
        expect(root.textContent).toBe("Home");

        router.navigate("/old");
        expect(location.pathname).toBe("/home");
        expect(root.textContent).toBe("Home");
    });

    it("ignores an outdated async guard after a newer navigation commits", async () => {
        const root = document.createElement("div");
        document.body.appendChild(root);
        let releaseSlowGuard!: (result: boolean) => void;
        const slowGuard = new Promise<boolean>((resolve) => { releaseSlowGuard = resolve; });
        const router = new ClRouter(root, {
            "/home": {controller: () => ({}), headerTitle: new CoreObservable.App("Home")},
            "/slow": {controller: () => ({}), headerTitle: new CoreObservable.App("Slow"), beforeEnter: () => slowGuard},
            "/fast": {controller: () => ({}), headerTitle: new CoreObservable.App("Fast")},
        }, (route) => {
            const element = document.createElement("main");
            element.textContent = route.headerTitle.get();
            return element;
        });
        activeRouters.push(router);
        history.replaceState({}, "", "/home");
        router.resolve();

        router.navigate("/slow");
        router.navigate("/fast");
        releaseSlowGuard(true);
        await Promise.resolve();
        await Promise.resolve();

        expect(location.pathname).toBe("/fast");
        expect(root.textContent).toBe("Fast");
    });

    it("keeps title subscriptions scoped to the active route and runs unload hooks", () => {
        const root = document.createElement("div");
        document.body.appendChild(root);
        const homeTitle = new CoreObservable.App("Home");
        let homeUnloads = 0;
        let nextUnloads = 0;
        const router = new ClRouter(root, {
            "/home": {
                controller: () => ({}),
                headerTitle: homeTitle,
                onUnload: () => { homeUnloads++; },
            },
            "/next": {
                controller: () => ({}),
                headerTitle: new CoreObservable.App("Next"),
                onUnload: () => { nextUnloads++; },
            },
        }, (route) => {
            const element = document.createElement("main");
            element.textContent = route.headerTitle.get();
            return element;
        });
        activeRouters.push(router);
        history.replaceState({}, "", "/home");
        router.resolve();
        homeTitle.set("Start page");
        expect(document.title).toBe("Start page");

        router.navigate("/next");
        homeTitle.set("Stale title");
        expect(document.title).toBe("Next");
        expect(homeUnloads).toBe(1);

        router.destroy();
        expect(nextUnloads).toBe(1);
    });
});
