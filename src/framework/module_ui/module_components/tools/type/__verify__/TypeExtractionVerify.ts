// tools/type/__verify__/TypeExtractionVerify.ts
//
// DEVELOPMENT ONLY — نباید از type/index.ts export شود
//
// ساختار واحد Verification:
// ├── A. Generic extraction equivalence (مثال‌های مصنوعی)
// ├── B. Optional args behavior
// ├── C. ComponentStructure (Props, Schemas, Methods)
// ├── D. ComponentButton (Props, PropsConfig, Schemas, Methods)
// ├── E. ComponentIcon (Props, PropsConfig, Schemas, Methods)
// └── F. ComponentMessages (Props, PropsConfig, Schemas, Methods)
//
// لاحم نیست همه را از روز اول پر کنی، ولی محل Verification واحد باشد.

import type {TObservableValue} from "@/core_observable";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
    ExtractSchemasType,
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../TypeHelpers";

import {Props as StructureProps, Schemas as StructureSchemas, Methods as StructureMethods} from "../../../lists/componentStructure";
import {Props as ButtonProps, Schemas as ButtonSchemas, Methods as ButtonMethods} from "../../../lists/componentButton";
import {Props as IconProps, Schemas as IconSchemas, Methods as IconMethods} from "../../../lists/componentIcon";
import {Props as MessagesProps, Schemas as MessagesSchemas, Methods as MessagesMethods} from "../../../lists/componentMessages";

// ─── IsEqual + Assert utilities ───
type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends
    (<T>() => T extends B ? 1 : 2)
        ? true
        : false;

type Assert<T extends true> = T;

// ─── Legacy Implementations (مرجع) ───
type LegacyPropsType<TProps extends Record<string, { default: any }>> = {
    [K in keyof TProps]: TProps[K]["default"]
};

type LegacyPropsConfigType<TProps extends Record<string, { default: any }>> = {
    [K in keyof TProps]: TObservableValue<TProps[K]["default"]>
};

type LegacySchemasType<TSchemas extends Record<string, { part: any }>> = {
    [K in keyof TSchemas]: TSchemas[K]["part"]
};

type LegacyMethodsType<TMethods extends Record<string, { name: string }>> = {
    [K in keyof TMethods]: (event: Event, dataArgs: any, componentArgs: any) => void
};

type LegacyMethodsComponentArgs<TMethods extends Record<string, any>> = {
    [K in keyof TMethods]: {
        [ArgKey in keyof TMethods[K]["args"]]:
            TMethods[K]["args"][ArgKey] extends { default: infer T }
                ? T
                : any;
    };
};

type LegacyMethodsDataArgs<TMethods extends Record<string, { dataArgs: any }>> = {
    [K in keyof TMethods]: TMethods[K]["dataArgs"];
};

type LegacyMethodsConfigType<
    TMethods extends Record<string, { name: string; dataArgs: any }>,
    TThis = any,
> = {
    [K in keyof TMethods]?: (
        this: TThis,
        event: Event,
        dataArgs: LegacyMethodsDataArgs<TMethods>[K] | null,
        componentArgs: LegacyMethodsComponentArgs<TMethods>[K] | null,
    ) => void;
};

// ═══════════════════════════════════════════
// A. Generic extraction equivalence
// ═══════════════════════════════════════════

type _PropsEquivalence<TProps extends Record<string, { default: any }>> =
    Assert<IsEqual<
        LegacyPropsType<TProps>,
        ExtractPropsType<TProps>
    >>;

type _PropsConfigEquivalence<TProps extends Record<string, { default: any }>> =
    Assert<IsEqual<
        LegacyPropsConfigType<TProps>,
        ExtractPropsConfigType<TProps>
    >>;

type _SchemasEquivalence<TSchemas extends Record<string, { part: any }>> =
    Assert<IsEqual<
        LegacySchemasType<TSchemas>,
        ExtractSchemasType<TSchemas>
    >>;

type _MethodsEquivalence<TMethods extends Record<string, { name: string }>> =
    Assert<IsEqual<
        LegacyMethodsType<TMethods>,
        ExtractMethodsType<TMethods>
    >>;

type _MethodsArgsEquivalence<TMethods extends Record<string, any>> =
    IsEqual<
        LegacyMethodsComponentArgs<TMethods>,
        ExtractMethodsComponentArgs<TMethods>
    >;

type _MethodsDataArgsEquivalence<TMethods extends Record<string, { dataArgs: any }>> =
    Assert<IsEqual<
        LegacyMethodsDataArgs<TMethods>,
        ExtractMethodsDataArgs<TMethods>
    >>;

type _MethodsConfigEquivalence<
    TMethods extends Record<string, { name: string; dataArgs: any }>,
    TThis = any,
> = IsEqual<
    LegacyMethodsConfigType<TMethods, TThis>,
    ExtractMethodsConfigType<TMethods, TThis>
>;

// ═══════════════════════════════════════════
// B. Optional args behavior
// ═══════════════════════════════════════════

type _MethodsNoArgsCheck = Assert<
    IsEqual<
        ExtractMethodsComponentArgs<{ CLICK: { name: "fn", dataArgs: {} } }>,
        { CLICK: {} }
    >
>;

// ═══════════════════════════════════════════
// C. ComponentStructure — Real Definition Verification
// ═══════════════════════════════════════════

type _StructurePropsCheck = Assert<
    IsEqual<
        LegacyPropsType<typeof StructureProps>,
        ExtractPropsType<typeof StructureProps>
    >
>;

type _StructureSchemasCheck = Assert<
    IsEqual<
        LegacySchemasType<typeof StructureSchemas>,
        ExtractSchemasType<typeof StructureSchemas>
    >
>;

type _StructureMethodsCheck = Assert<
    IsEqual<
        LegacyMethodsType<typeof StructureMethods>,
        ExtractMethodsType<typeof StructureMethods>
    >
>;

// ═══════════════════════════════════════════
// D. ComponentButton — Real Definition Verification
// ═══════════════════════════════════════════

type _ButtonPropsCheck = Assert<
    IsEqual<
        LegacyPropsType<typeof ButtonProps>,
        ExtractPropsType<typeof ButtonProps>
    >
>;

type _ButtonPropsConfigCheck = Assert<
    IsEqual<
        LegacyPropsConfigType<typeof ButtonProps>,
        ExtractPropsConfigType<typeof ButtonProps>
    >
>;

type _ButtonSchemasCheck = Assert<
    IsEqual<
        LegacySchemasType<typeof ButtonSchemas>,
        ExtractSchemasType<typeof ButtonSchemas>
    >
>;

type _ButtonMethodsCheck = Assert<
    IsEqual<
        LegacyMethodsType<typeof ButtonMethods>,
        ExtractMethodsType<typeof ButtonMethods>
    >
>;

type _ButtonMethodsArgsCheck = Assert<
    IsEqual<
        LegacyMethodsComponentArgs<typeof ButtonMethods>,
        ExtractMethodsComponentArgs<typeof ButtonMethods>
    >
>;

type _ButtonMethodsDataArgsCheck = Assert<
    IsEqual<
        LegacyMethodsDataArgs<typeof ButtonMethods>,
        ExtractMethodsDataArgs<typeof ButtonMethods>
    >
>;

type _ButtonMethodsConfigCheck = Assert<
    IsEqual<
        LegacyMethodsConfigType<typeof ButtonMethods>,
        ExtractMethodsConfigType<typeof ButtonMethods>
    >
>;

// ═══════════════════════════════════════════
// E. ComponentIcon — Real Definition Verification
// ═══════════════════════════════════════════

type _IconPropsCheck = Assert<
    IsEqual<
        LegacyPropsType<typeof IconProps>,
        ExtractPropsType<typeof IconProps>
    >
>;

type _IconPropsConfigCheck = Assert<
    IsEqual<
        LegacyPropsConfigType<typeof IconProps>,
        ExtractPropsConfigType<typeof IconProps>
    >
>;

type _IconSchemasCheck = Assert<
    IsEqual<
        LegacySchemasType<typeof IconSchemas>,
        ExtractSchemasType<typeof IconSchemas>
    >
>;

type _IconMethodsCheck = Assert<
    IsEqual<
        LegacyMethodsType<typeof IconMethods>,
        ExtractMethodsType<typeof IconMethods>
    >
>;

// ═══════════════════════════════════════════
// F. ComponentMessages — Real Definition Verification
// ═══════════════════════════════════════════

type _MessagesPropsCheck = Assert<
    IsEqual<
        LegacyPropsType<typeof MessagesProps>,
        ExtractPropsType<typeof MessagesProps>
    >
>;

type _MessagesPropsConfigCheck = Assert<
    IsEqual<
        LegacyPropsConfigType<typeof MessagesProps>,
        ExtractPropsConfigType<typeof MessagesProps>
    >
>;

type _MessagesSchemasCheck = Assert<
    IsEqual<
        LegacySchemasType<typeof MessagesSchemas>,
        ExtractSchemasType<typeof MessagesSchemas>
    >
>;

type _MessagesMethodsCheck = Assert<
    IsEqual<
        LegacyMethodsType<typeof MessagesMethods>,
        ExtractMethodsType<typeof MessagesMethods>
    >
>;

type _MessagesMethodsArgsCheck = Assert<
    IsEqual<
        LegacyMethodsComponentArgs<typeof MessagesMethods>,
        ExtractMethodsComponentArgs<typeof MessagesMethods>
    >
>;

type _MessagesMethodsDataArgsCheck = Assert<
    IsEqual<
        LegacyMethodsDataArgs<typeof MessagesMethods>,
        ExtractMethodsDataArgs<typeof MessagesMethods>
    >
>;

type _MessagesMethodsConfigCheck = Assert<
    IsEqual<
        LegacyMethodsConfigType<typeof MessagesMethods>,
        ExtractMethodsConfigType<typeof MessagesMethods>
    >
>;
