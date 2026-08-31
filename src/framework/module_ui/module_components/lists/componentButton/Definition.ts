import {ComponentButton as Component} from "./ComponentButton";
import type {ComponentButtonProps}       from "./Props";
import type {ComponentButtonSchema}      from "./Schemas";
import type {ComponentButtonMethods}     from "./Methods";
import type {ComponentDefinition}        from "@/core_components";


/**
 * Definition رسمی ComponentButton
 */
export const Definition: ComponentDefinition = {

    name: "ComponentButton",
    description: "دکمه تعاملی با State داخلی عنوان و Composition Point",
    component: Component,
    props:   null as unknown as ComponentButtonProps,
    schemas: null as unknown as ComponentButtonSchema,
    methods: null as unknown as ComponentButtonMethods,
    examples: {},
};