import {describe, expect, it} from "vitest";
import * as FrameworkLang from "../../src/framework/Lang";
import * as Consumer from "../../src/framework/Consumer";
import {RequestManager} from "../../src/framework/module_ui/module_controller/module_requests/class/RequestManager";

describe("consumer application facade", () => {
    it("registers scoped language, controllers, layouts and route slot overrides, then disposes them", async () => {
        const app = Consumer.create({id: "test.consumer-app-facade"});
        const keys = app.language.defineKeys("ui", {
            category: "categories.pages",
            title: "pages.title",
            controller: "controllers.part",
            layout: "workflow.layout",
            header: "workflow.header",
            footer: "workflow.footer",
            content: "workflow.content",
        });
        app.language.registerLocale(app.language.Locale.EN_US);
        app.language.registerPack({
            id: "ui.en",
            locale: app.language.Locale.EN_US,
            entries: [[keys.title, "Page title"]],
        });
        const categoryTree = app.controllers.registerCategories({
            namespace: "page-parts",
            categories: [{id: "parts", titleKey: keys.category}],
        });
        const category = categoryTree.get("parts")!;
        const contentByName = (name: string) => ({
            status: true,
            messages: [],
            data: {content: {name}},
            reference: {source: `test.consumer-app-facade.controllers.${name}`},
        });
        const entries = app.controllers.registerMany([
            {id: "header", titleKey: keys.controller, category, factory: () => new RequestManager(contentByName("header")).get()},
            {id: "header-alt", titleKey: keys.controller, category, factory: () => new RequestManager(contentByName("header-alt")).get()},
            {id: "footer", titleKey: keys.controller, category, factory: () => new RequestManager(contentByName("footer")).get()},
            {id: "alpha", titleKey: keys.controller, category, factory: () => new RequestManager(contentByName("alpha")).get()},
            {id: "beta", titleKey: keys.controller, category, factory: () => new RequestManager(contentByName("beta")).get()},
        ]);
        const rendered: Array<{path: string; slots: Record<string, unknown>}> = [];
        app.pages.registerLayout({
            id: "shell",
            slots: {header: "header", footer: "footer"},
            requiredSlots: ["header", "footer", "content"],
            reuse: true,
            render: (context, slots) => {
                const component = {layout: "shell"};
                const snapshot = (path: string, currentSlots: Record<string, unknown>) => {
                    rendered.push({path, slots: {...currentSlots}});
                };
                snapshot(context.path, slots);
                return {
                    component,
                    update: (nextContext, nextSlots) => snapshot(nextContext.path, nextSlots),
                };
            },
        });
        const pages = app.pages.registerMany([
            {id: "alpha", path: "/alpha", titleKey: keys.title, layout: "shell", slots: {content: "alpha"}},
            {id: "beta", path: "/beta", titleKey: keys.title, layout: "shell", slots: {header: "header-alt", content: "beta"}},
        ]);

        const routes = app.pages.createRoutes();
        const alphaResponse = await (routes["/alpha"] as any).controller();
        const betaResponse = await (routes["/beta"] as any).controller();

        expect(entries).toHaveLength(5);
        expect(pages.map(({id}) => id)).toEqual([
            "test.consumer-app-facade.pages.alpha",
            "test.consumer-app-facade.pages.beta",
        ]);
        expect(alphaResponse.data.slots).toMatchObject({
            header: {name: "header"},
            footer: {name: "footer"},
            content: {name: "alpha"},
        });
        expect(betaResponse.data.slots).toMatchObject({
            header: {name: "header-alt"},
            footer: {name: "footer"},
            content: {name: "beta"},
        });
        expect(rendered.map(({path}) => path)).toEqual(["/alpha", "/beta"]);
        expect(app.language.t(keys.title)).toBe("Page title");

        app.dispose();
        expect(app.controllers.has("header")).toBe(false);
        expect(app.pages.has("alpha")).toBe(false);
        expect(FrameworkLang.getKeyMetadata(keys.title)).toBeNull();
        expect(() => app.language.defineKeys("after-dispose", {key: "key"})).toThrow(/has been disposed/);
    });
});
