import * as CoreComponents from "@/core_components";
// --------------------------------
import {Component as ComponentIconClass}      from "./componentIcon";
import {Definition as IconDefinition}        from "./componentIcon/Definition";
import {Props      as IconProps}             from "./componentIcon/Props";
import {Schemas    as IconSchemas}           from "./componentIcon/Schemas";
import {Methods    as IconMethods}           from "./componentIcon/Methods";
import {Examples   as IconExamples}          from "./componentIcon/examples";
// --------------------------------
import {Component as ComponentStructureClass}      from "./componentStructure";
import {Definition as StructureDefinition}        from "./componentStructure/Definition";
import {Props      as StructureProps}             from "./componentStructure/Props";
import {Schemas    as StructureSchemas}           from "./componentStructure/Schemas";
import {Methods    as StructureMethods}           from "./componentStructure/Methods";
import {Examples   as StructureExamples}          from "./componentStructure/examples";


// ثبت ComponentIcon در Component Manager
CoreComponents.ComponentManager.register({
    definition:  IconDefinition,
    props:       IconProps,
    schemas:     IconSchemas,
    methods:     IconMethods,
    examples:    IconExamples,
    constructor: ComponentIconClass as any,
});


// ثبت ComponentStructure در Component Manager
CoreComponents.ComponentManager.register({
    definition:  StructureDefinition,
    props:       StructureProps,
    schemas:     StructureSchemas,
    methods:     StructureMethods,
    examples:    StructureExamples,
    constructor: ComponentStructureClass as any,
});


export * as ComponentStructure from "./componentStructure";
export * as ComponentIcon      from "./componentIcon";
