import * as CoreLanguage from "@/core_languages"
import * as CoreConfig from "@/core_configs"

export const StateConfigLanguage : CoreConfig.Type.TConfigStateDefinition<CoreLanguage.Type.Const.TCLanguagesDefinition> = {
    name: "language" ,
    default: CoreLanguage.Definition.Fa,
}