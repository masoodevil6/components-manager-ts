import {ComponentStructure as Component} from "./ComponentStructure";
import type {ComponentStructureProps}       from "./Props";
import type {ComponentStructureSchema}      from "./Schemas";
import type {ComponentStructureMethods}     from "./Methods";
import {Examples}                           from "./examples";
import type {ComponentDefinition}        from "@/core_components";


/**
 * Definition رسمی ComponentStructure
 *
 * این فایل شناسنامه Metadata Component است و توسط ComponentManager
 * یا ابزارهای اسکن استفاده می‌شود.
 */
export const Definition: ComponentDefinition = {

    /** نام فنی Component */
    name: "ComponentStructure",

    /** توضیحات Component */
    description: "Structure عمومی با قابلیت Visibility و Composition Point",

    /** ارجاع به کلاس Component */
    component: Component,

    /** نوع Props (برای اسکن تایپ) */
    props: null as unknown as ComponentStructureProps,

    /** نوع Schema (برای اسکن تایپ) */
    schemas: null as unknown as ComponentStructureSchema,

    /** نوع Methods (برای اسکن تایپ) */
    methods: null as unknown as ComponentStructureMethods,

    /** Exampleهای ثبت‌شده */
    examples: Examples,

};