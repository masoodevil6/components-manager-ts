// Phase 6: Verify Methods impact — source reference + extracted result
// Run: tsc --noEmit (full project compile)

// A. Source reference: confirmed in Methods.ts:
//    SEMANTIC: ButtonProps.prop_btnSemantic  (line 26, direct reference)
//    No intermediate type annotation, as const, or transformation.

import {Props as ButtonProps, ButtonSemantic} from "../../../lists/componentButton/Props";
import {Methods as ButtonMethods} from "../../../lists/componentButton/Methods";
import type {ExtractMethodsComponentArgs} from "../TypeHelpers";

type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// B. Extracted result verification
type ButtonMethodsArgs = ExtractMethodsComponentArgs<typeof ButtonMethods>;
type SemanticArg = ButtonMethodsArgs["CLICK"]["SEMANTIC"];
type _SemanticArg = Assert<IsEqual<SemanticArg, ButtonSemantic>>;

// Also verify VARIANT and TITLE for completeness
type VariantArg = ButtonMethodsArgs["CLICK"]["VARIANT"];
type _VariantArg = Assert<IsEqual<VariantArg, typeof ButtonProps.prop_btnVariant.default>>;
