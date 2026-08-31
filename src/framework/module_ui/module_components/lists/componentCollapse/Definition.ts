import {ComponentCollapse as Component} from "./ComponentCollapse";
import type {ComponentCollapseProps}       from "./Props";
import type {ComponentCollapseSchema}      from "./Schemas";
import type {ComponentCollapseMethods}     from "./Methods";
import type {ComponentDefinition}        from "@/core_components";


/**
 * Definition رسمی ComponentCollapse
 */
export const Definition: ComponentDefinition = {

    name: "ComponentCollapse",
    description: "آکاردئون باز/بسته شونده با State داخلی و Composition Point",
    component: Component,
    props:   null as unknown as ComponentCollapseProps,
    schemas: null as unknown as ComponentCollapseSchema,
    methods: null as unknown as ComponentCollapseMethods,
    examples: {},
};