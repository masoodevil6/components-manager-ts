// Phase 4 post-migration: Real extraction test on migrated ButtonProps
// Run: tsc --noEmit (full project compile)

import {Props as ButtonProps, ButtonSemantic, ButtonAction} from "../../../lists/componentButton/Props";
import type {ExtractPropsType} from "../TypeHelpers";
import * as UiIcons from "@/ui_icons";

type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

type ButtonPropsType = ExtractPropsType<typeof ButtonProps>;

type _RealEnum      = Assert<IsEqual<ButtonPropsType["prop_btnSemantic"], ButtonSemantic>>;
type _RealEnum2     = Assert<IsEqual<ButtonPropsType["prop_btnType"], ButtonAction>>;
type _RealNullable   = Assert<IsEqual<ButtonPropsType["prop_btnWidth"], string | null>>;
type _RealArray      = Assert<IsEqual<ButtonPropsType["prop_btnClass"], string[]>>;
type _RealRecord     = Assert<IsEqual<ButtonPropsType["prop_btnStyles"], Record<string, string>>>;
type _RealBoolean    = Assert<IsEqual<ButtonPropsType["prop_btnDisabled"], boolean>>;

// prop_btnIcon nullable fix (independent semantic correction)
type _BtnIconNullable = Assert<
    IsEqual<ButtonPropsType["prop_btnIcon"], UiIcons.IIconDefinition | null>
>;

// Negative proof: enum must NOT narrow to literal
type _SemanticIsNotSubmit = Assert<
    IsEqual<IsEqual<ButtonPropsType["prop_btnSemantic"], ButtonSemantic.SUBMIT>, false>
>;
