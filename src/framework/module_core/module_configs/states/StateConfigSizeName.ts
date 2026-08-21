import * as Util from "@/util";
import * as CoreConfig from "@/core_configs";

export const StateConfigSizeName : CoreConfig.Type.TConfigStateDefinition<Util.Styles.Types.Const.Sizes> = {
    name: "SizeName" ,
    default: Util.Consts.Sizes.M,
}