import {describe, expect, it} from "vitest";
import * as FrameworkLang from "../../src/framework/Lang";
import {RouteRenderMode, type ControllerRouteData} from "../../src/framework/module_core/module_route";
import {ControllerManager} from "../../src/framework/module_ui/module_controller/registry/ControllerManager";
import {RequestManager} from "../../src/framework/module_ui/module_controller/module_requests/class/RequestManager";
import {PageManager} from "../../src/framework/module_ui/module_pages/registry/PageManager";

const keys = FrameworkLang.defineKeys("test.consumer-page-registry", {
    category: "categories.pages",
    pageTitle: "pages.account",
    controller: "controllers.pagePart",
});

describe("consumer page registry", () => {
    it("composes registered controllers into a shared page route and resolves route params", async () => {
        const categories = ControllerManager.registerCategories({
            namespace: "test.consumer-page-registry",
            categories: [{id: "pages", titleKey: keys.category}],
        });
        const category = categories.get("pages")!;
        const contentKind = "content-component";
        const sidebar = {kind: "sidebar-component"};
        ControllerManager.registerMany([
            {
                id: "test.consumer-page-registry.content",
                titleKey: keys.controller,
                category,
                factory: ({params}) => new RequestManager({
                    status: true,
                    data: {content: {kind: contentKind, params}, params},
                    reference: {source: "test.consumer-page-registry.content"},
                }).get(),
            },
            {
                id: "test.consumer-page-registry.sidebar",
                titleKey: keys.controller,
                category,
                factory: ({params}) => new RequestManager({
                    status: true,
                    data: {content: sidebar, params},
                    reference: {source: "test.consumer-page-registry.sidebar"},
                }).get(),
            },
        ]);

        PageManager.register({
            id: "test.consumer-page-registry.account",
            path: "/accounts/:accountId",
            titleKey: keys.pageTitle,
            controllers: {
                content: {
                    id: "test.consumer-page-registry.content",
                    params: ({pathParams, query}) => ({accountId: pathParams.accountId, filter: query.filter}),
                },
                sidebar: {
                    id: "test.consumer-page-registry.sidebar",
                    params: ({pathParams}) => ({accountId: pathParams.accountId}),
                },
            },
            renderMode: RouteRenderMode.SLIDE,
        });

        const routeMap = PageManager.createRoutes({"/existing": {redirectTo: "/accounts/1"}});
        const route = routeMap["/accounts/:accountId"] as ControllerRouteData;
        expect(routeMap["/existing"]).toEqual({redirectTo: "/accounts/1"});
        expect(route.renderMode).toBe(RouteRenderMode.SLIDE);

        const oldLocation = Object.getOwnPropertyDescriptor(globalThis, "location");
        Object.defineProperty(globalThis, "location", {
            configurable: true,
            value: {pathname: "/accounts/42", search: "?filter=active"},
        });
        try {
            const pageResponse = await (route.controller as () => Promise<any>)();
            expect(pageResponse).toMatchObject({
                status: true,
                data: {
                    pageTitle: expect.any(String),
                    content: {
                        kind: contentKind,
                        params: {accountId: "42", filter: "active"},
                    },
                },
            });
            expect(pageResponse.data.sidebar).toBeTypeOf("function");
            expect(pageResponse.data.sessionKey).toBe("consumer-page:test.consumer-page-registry.account");

            const sidebarResponse = await pageResponse.data.sidebar();
            expect(sidebarResponse.data.content).toBe(sidebar);
            expect(sidebarResponse.data.params).toEqual({accountId: "42"});
        } finally {
            if (oldLocation) Object.defineProperty(globalThis, "location", oldLocation);
            else delete (globalThis as any).location;
        }
    });

    it("rejects unknown controllers, duplicate route patterns, and route-map collisions", () => {
        const before = PageManager.list().length;
        expect(() => PageManager.register({
            id: "test.consumer-page-registry.missing-controller",
            path: "/missing-controller",
            titleKey: keys.pageTitle,
            controllers: {content: "test.consumer-page-registry.unknown"},
        })).toThrow(/is not registered/);
        expect(PageManager.list()).toHaveLength(before);

        expect(() => PageManager.register({
            id: "test.consumer-page-registry.account-duplicate-pattern",
            path: "/accounts/:otherId",
            titleKey: keys.pageTitle,
            controllers: {content: "test.consumer-page-registry.content"},
        })).toThrow(/already registered/);

        expect(() => PageManager.createRoutes({"/accounts/:id": {redirectTo: "/"}})).toThrow(/route already exists/);
    });
});
