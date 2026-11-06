import {describe, expect, it} from "vitest";
import * as FrameworkLang from "../../src/framework/Lang";
import {ControllerManager} from "../../src/framework/module_ui/module_controller/registry/ControllerManager";
import {RequestManager} from "../../src/framework/module_ui/module_controller/module_requests/class/RequestManager";

const keys = FrameworkLang.defineKeys("test.consumer-controller-registry", {
    root: "categories.root",
    levelTwo: "categories.levelTwo",
    levelThree: "categories.levelThree",
    levelFour: "categories.levelFour",
    levelFive: "categories.levelFive",
    controller: "controllers.profileCreate",
    layout: "workflow.layout",
    nameInput: "workflow.nameInput",
});

describe("consumer controller registry", () => {
    it("registers a nested category tree and a controller that returns composed content", () => {
        const categories = ControllerManager.registerCategories({
            namespace: "test.consumer-controller-registry",
            categories: [
                {
                    id: "root",
                    titleKey: keys.root,
                    children: [
                        {
                            id: "levelTwo",
                            titleKey: keys.levelTwo,
                            children: [
                                {
                                    id: "levelThree",
                                    titleKey: keys.levelThree,
                                    children: [
                                        {
                                            id: "levelFour",
                                            titleKey: keys.levelFour,
                                            children: [{id: "levelFive", titleKey: keys.levelFive}],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        const category = categories.get("levelFive");
        expect(category?.path).toEqual(["root", "levelTwo", "levelThree", "levelFour", "levelFive"]);

        const registered = ControllerManager.register({
            id: "test.consumer-controller-registry.profile-create",
            titleKey: keys.controller,
            category: category!,
            workflowNodes: {
                profileLayout: keys.layout,
                nameInput: keys.nameInput,
            },
            factory: ({params, workflowNodeNames}) => new RequestManager({
                status: true,
                data: {
                    params,
                    content: {
                        layoutName: workflowNodeNames.profileLayout,
                        inputName: workflowNodeNames.nameInput,
                    },
                },
                reference: {source: "test.consumer-controller-registry.profile-create"},
            }).get(),
        });

        expect(ControllerManager.listByCategory(category!)).toEqual([registered]);
        expect(ControllerManager.listWorkflowNodes(registered.id).map(({name}) => name)).toEqual([
            "profileLayout",
            "nameInput",
        ]);

        const response = ControllerManager.create(registered.id, {mode: "create"});
        expect(response).toMatchObject({
            status: true,
            data: {
                params: {mode: "create"},
                content: {layoutName: "profileLayout", inputName: "nameInput"},
            },
        });
    });

    it("rejects invalid categories and leaves a batch of controllers unregistered", () => {
        expect(() => ControllerManager.registerCategories(undefined as any)).toThrow(/expected an object/);
        expect(() => ControllerManager.registerCategories({
            namespace: "test.consumer-controller-invalid-categories",
            categories: [
                {id: "duplicate", titleKey: keys.root},
                {id: "duplicate", titleKey: keys.levelTwo},
            ],
        })).toThrow(/category id 'duplicate' is duplicated/);

        const categories = ControllerManager.registerCategories({
            namespace: "test.consumer-controller-atomic",
            categories: [{id: "valid", titleKey: keys.root}],
        });
        const category = categories.get("valid")!;
        const before = ControllerManager.list().length;

        expect(() => ControllerManager.registerMany([
            {
                id: "test.consumer-controller-atomic.valid",
                titleKey: keys.controller,
                category,
                factory: () => new RequestManager({status: true}).get(),
            },
            {
                id: "test.consumer-controller-atomic.invalid",
                titleKey: keys.controller,
                category: {namespace: "forged", id: "category", path: [], titleKey: keys.root, children: []},
                factory: () => new RequestManager({status: true}).get(),
            },
        ])).toThrow(/category reference returned by registerCategories/);

        expect(ControllerManager.has("test.consumer-controller-atomic.valid")).toBe(false);
        expect(ControllerManager.list()).toHaveLength(before);
    });
});

