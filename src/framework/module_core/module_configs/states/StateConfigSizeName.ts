import * as Util                                             from "@/util";
///------------------------------
import {TConfigStateDefinition as ConfigStateDefinition}     from "../type/TConfigStateDefinition";

export const StateConfigSizeName : ConfigStateDefinition<Util.Styles.TCSizes> = {
    name: "SizeName" ,
    default: Util.Consts.Sizes.M,
}