import * as CoreComponents from "@/core_components";
// --------------------------------
import {Component as ComponentIconClass}      from "./componentIcon";
import {Definition as IconDefinition}        from "./componentIcon/Definition";
import {Props      as IconProps}             from "./componentIcon/Props";
import {Schemas    as IconSchemas}           from "./componentIcon/Schemas";
import {Methods    as IconMethods}           from "./componentIcon/Methods";
import {Examples   as IconExamples}          from "./componentIcon/examples";
// --------------------------------
import {Component as ComponentButtonClass}      from "./componentButton";
import {Definition as ButtonDefinition}        from "./componentButton/Definition";
import {Props      as ButtonProps}             from "./componentButton/Props";
import {Schemas    as ButtonSchemas}           from "./componentButton/Schemas";
import {Methods    as ButtonMethods}           from "./componentButton/Methods";
import {Examples   as ButtonExamples}          from "./componentButton/examples";
// --------------------------------
import {Component as ComponentStructureClass}      from "./componentStructure";
import {Definition as StructureDefinition}        from "./componentStructure/Definition";
import {Props      as StructureProps}             from "./componentStructure/Props";
import {Schemas    as StructureSchemas}           from "./componentStructure/Schemas";
import {Methods    as StructureMethods}           from "./componentStructure/Methods";
import {Examples   as StructureExamples}          from "./componentStructure/examples";
// --------------------------------
import {Component as ComponentMessagesClass}      from "./componentMessages";
import {Definition as MessagesDefinition}        from "./componentMessages/Definition";
import {Props      as MessagesProps}             from "./componentMessages/Props";
import {Schemas    as MessagesSchemas}           from "./componentMessages/Schemas";
import {Methods    as MessagesMethods}           from "./componentMessages/Methods";
import {Examples   as MessagesExamples}          from "./componentMessages/examples";
// --------------------------------
import {Component as ComponentBorderClass}       from "./componentBorder";
import {Definition as BorderDefinition}         from "./componentBorder/Definition";
import {Props      as BorderProps}              from "./componentBorder/Props";
import {Schemas    as BorderSchemas}            from "./componentBorder/Schemas";
import {Methods    as BorderMethods}            from "./componentBorder/Methods";
import {Examples   as BorderExamples}           from "./componentBorder/examples";
// --------------------------------
import {Component as ComponentLabelClass}        from "./componentLabel";
import {Definition as LabelDefinition}          from "./componentLabel/Definition";
import {Props      as LabelProps}               from "./componentLabel/Props";
import {Schemas    as LabelSchemas}             from "./componentLabel/Schemas";
import {Methods    as LabelMethods}             from "./componentLabel/Methods";
import {Examples   as LabelExamples}            from "./componentLabel/examples";
// --------------------------------
import {Component as ComponentFloatMenuClass}     from "./componentFloatMenu";
import {Definition as FloatMenuDefinition}      from "./componentFloatMenu/Definition";
import {Props      as FloatMenuProps}           from "./componentFloatMenu/Props";
import {Schemas    as FloatMenuSchemas}         from "./componentFloatMenu/Schemas";
import {Methods    as FloatMenuMethods}         from "./componentFloatMenu/Methods";
import {Examples   as FloatMenuExamples}        from "./componentFloatMenu/examples";
// --------------------------------
import {Component as ComponentPositionMenuClass}   from "./componentPositionMenu";
import {Definition as PositionMenuDefinition}    from "./componentPositionMenu/Definition";
import {Props      as PositionMenuProps}         from "./componentPositionMenu/Props";
import {Schemas    as PositionMenuSchemas}       from "./componentPositionMenu/Schemas";
import {Methods    as PositionMenuMethods}       from "./componentPositionMenu/Methods";
import {Examples   as PositionMenuExamples}      from "./componentPositionMenu/examples";


// ثبت ComponentIcon در Component Manager
CoreComponents.ComponentManager.register({
    definition:  IconDefinition,
    props:       IconProps,
    schemas:     IconSchemas,
    methods:     IconMethods,
    examples:    IconExamples,
    constructor: ComponentIconClass as any,
});


// ثبت ComponentButton در Component Manager
CoreComponents.ComponentManager.register({
    definition:  ButtonDefinition,
    props:       ButtonProps,
    schemas:     ButtonSchemas,
    methods:     ButtonMethods,
    examples:    ButtonExamples,
    constructor: ComponentButtonClass as any,
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


// ثبت ComponentMessages در Component Manager
CoreComponents.ComponentManager.register({
    definition:  MessagesDefinition,
    props:       MessagesProps,
    schemas:     MessagesSchemas,
    methods:     MessagesMethods,
    examples:    MessagesExamples,
    constructor: ComponentMessagesClass as any,
});


// ثبت ComponentBorder در Component Manager
CoreComponents.ComponentManager.register({
    definition:  BorderDefinition,
    props:       BorderProps,
    schemas:     BorderSchemas,
    methods:     BorderMethods,
    examples:    BorderExamples,
    constructor: ComponentBorderClass as any,
});


// ثبت ComponentLabel در Component Manager (Plan 13.1.0)
CoreComponents.ComponentManager.register({
    definition:  LabelDefinition,
    props:       LabelProps,
    schemas:     LabelSchemas,
    methods:     LabelMethods,
    examples:    LabelExamples,
    constructor: ComponentLabelClass as any,
});


// ثبت ComponentFloatMenu در Component Manager
CoreComponents.ComponentManager.register({
    definition:  FloatMenuDefinition,
    props:       FloatMenuProps,
    schemas:     FloatMenuSchemas,
    methods:     FloatMenuMethods,
    examples:    FloatMenuExamples,
    constructor: ComponentFloatMenuClass as any,
});


// ثبت ComponentPositionMenu در Component Manager
CoreComponents.ComponentManager.register({
    definition:  PositionMenuDefinition,
    props:       PositionMenuProps,
    schemas:     PositionMenuSchemas,
    methods:     PositionMenuMethods,
    examples:    PositionMenuExamples,
    constructor: ComponentPositionMenuClass as any,
});


export * as ComponentStructure   from "./componentStructure";
export * as ComponentIcon        from "./componentIcon";
export * as ComponentButton      from "./componentButton";
export * as ComponentMessages    from "./componentMessages";
export * as ComponentBorder      from "./componentBorder";
export * as ComponentLabel       from "./componentLabel";
export * as ComponentFloatMenu   from "./componentFloatMenu";
export * as ComponentPositionMenu from "./componentPositionMenu";
