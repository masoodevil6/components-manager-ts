import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ValidatorRule} from "@/util_validators";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type AclItem = {id: string | number; name: string};

export const Props = {
    prop_name: Define_ComponentProp<string>({prop:"prop_name", default:"", name:Keys.category.components.inputAcl.props.name.name, description:Keys.category.components.inputAcl.props.name.description}),
    prop_value: Define_ComponentProp<AclItem[] | CoreObservable.App<AclItem[]>>({prop:"prop_value", default:[], name:Keys.category.components.inputAcl.props.value.name, description:Keys.category.components.inputAcl.props.value.description}),
    prop_title: Define_ComponentProp<string>({prop:"prop_title", default:"", name:Keys.category.components.inputAcl.props.title.name, description:Keys.category.components.inputAcl.props.title.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop:"prop_isDisable", default:false, name:Keys.category.components.inputAcl.props.isDisable.name, description:Keys.category.components.inputAcl.props.isDisable.description}),
    prop_requestUrl: Define_ComponentProp<string>({prop:"prop_requestUrl", default:"", name:Keys.category.components.inputAcl.props.requestUrl.name, description:Keys.category.components.inputAcl.props.requestUrl.description}),
    prop_requestCount: Define_ComponentProp<number>({prop:"prop_requestCount", default:100, name:Keys.category.components.inputAcl.props.requestCount.name, description:Keys.category.components.inputAcl.props.requestCount.description}),
    prop_requestTimout: Define_ComponentProp<number>({prop:"prop_requestTimout", default:400, name:Keys.category.components.inputAcl.props.requestTimout.name, description:Keys.category.components.inputAcl.props.requestTimout.description}),
    prop_bodyHeight: Define_ComponentProp<number>({prop:"prop_bodyHeight", default:300, name:Keys.category.components.inputAcl.props.bodyHeight.name, description:Keys.category.components.inputAcl.props.bodyHeight.description}),
    prop_bodyTop: Define_ComponentProp<number>({prop:"prop_bodyTop", default:5, name:Keys.category.components.inputAcl.props.bodyTop.name, description:Keys.category.components.inputAcl.props.bodyTop.description}),
    prop_icon: Define_ComponentProp<any>({prop:"prop_icon", default:null, name:Keys.category.components.inputAcl.props.icon.name, description:Keys.category.components.inputAcl.props.icon.description}),
    prop_backgroundColorHeaderList: Define_ComponentProp<string | null>({prop:"prop_backgroundColorHeaderList", default:null, name:Keys.category.components.inputAcl.props.backgroundColorHeaderList.name, description:Keys.category.components.inputAcl.props.backgroundColorHeaderList.description}),
    prop_backgroundColorBodyHeader: Define_ComponentProp<string | null>({prop:"prop_backgroundColorBodyHeader", default:null, name:Keys.category.components.inputAcl.props.backgroundColorBodyHeader.name, description:Keys.category.components.inputAcl.props.backgroundColorBodyHeader.description}),
    prop_backgroundColorBodyFoter: Define_ComponentProp<string | null>({prop:"prop_backgroundColorBodyFoter", default:null, name:Keys.category.components.inputAcl.props.backgroundColorBodyFoter.name, description:Keys.category.components.inputAcl.props.backgroundColorBodyFoter.description}),
    prop_borderColorSelector: Define_ComponentProp<string | null>({prop:"prop_borderColorSelector", default:null, name:Keys.category.components.inputAcl.props.borderColorSelector.name, description:Keys.category.components.inputAcl.props.borderColorSelector.description}),
    prop_btnColor: Define_ComponentProp<string | null>({prop:"prop_btnColor", default:null, name:Keys.category.components.inputAcl.props.btnColor.name, description:Keys.category.components.inputAcl.props.btnColor.description}),
    prop_itemAclColorUnSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclColorUnSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclColorUnSelected.name, description:Keys.category.components.inputAcl.props.itemAclColorUnSelected.description}),
    prop_itemAclIconColorUnSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclIconColorUnSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclIconColorUnSelected.name, description:Keys.category.components.inputAcl.props.itemAclIconColorUnSelected.description}),
    prop_itemAclBorderColorUnSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclBorderColorUnSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclBorderColorUnSelected.name, description:Keys.category.components.inputAcl.props.itemAclBorderColorUnSelected.description}),
    prop_itemAclBackgroundColorUnSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclBackgroundColorUnSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclBackgroundColorUnSelected.name, description:Keys.category.components.inputAcl.props.itemAclBackgroundColorUnSelected.description}),
    prop_itemAclColorUnSelectedHover: Define_ComponentProp<string | null>({prop:"prop_itemAclColorUnSelectedHover", default:null, name:Keys.category.components.inputAcl.props.itemAclColorUnSelectedHover.name, description:Keys.category.components.inputAcl.props.itemAclColorUnSelectedHover.description}),
    prop_itemAclBackgroundColorUnSelectedHover: Define_ComponentProp<string | null>({prop:"prop_itemAclBackgroundColorUnSelectedHover", default:null, name:Keys.category.components.inputAcl.props.itemAclBackgroundColorUnSelectedHover.name, description:Keys.category.components.inputAcl.props.itemAclBackgroundColorUnSelectedHover.description}),
    prop_itemAclColorSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclColorSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclColorSelected.name, description:Keys.category.components.inputAcl.props.itemAclColorSelected.description}),
    prop_itemAclIconColorSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclIconColorSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclIconColorSelected.name, description:Keys.category.components.inputAcl.props.itemAclIconColorSelected.description}),
    prop_itemAclBorderColorSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclBorderColorSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclBorderColorSelected.name, description:Keys.category.components.inputAcl.props.itemAclBorderColorSelected.description}),
    prop_itemAclBackgroundColorSelected: Define_ComponentProp<string | null>({prop:"prop_itemAclBackgroundColorSelected", default:null, name:Keys.category.components.inputAcl.props.itemAclBackgroundColorSelected.name, description:Keys.category.components.inputAcl.props.itemAclBackgroundColorSelected.description}),
    prop_itemAclColorSelectedHover: Define_ComponentProp<string | null>({prop:"prop_itemAclColorSelectedHover", default:null, name:Keys.category.components.inputAcl.props.itemAclColorSelectedHover.name, description:Keys.category.components.inputAcl.props.itemAclColorSelectedHover.description}),
    prop_itemAclBackgroundColorSelectedHover: Define_ComponentProp<string | null>({prop:"prop_itemAclBackgroundColorSelectedHover", default:null, name:Keys.category.components.inputAcl.props.itemAclBackgroundColorSelectedHover.name, description:Keys.category.components.inputAcl.props.itemAclBackgroundColorSelectedHover.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop:"prop_hasRules", default:false, name:Keys.category.components.inputAcl.props.hasRules.name, description:Keys.category.components.inputAcl.props.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop:"prop_isAbsoluteRule", default:false, name:Keys.category.components.inputAcl.props.isAbsoluteRule.name, description:Keys.category.components.inputAcl.props.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop:"prop_listRules", default:[], name:Keys.category.components.inputAcl.props.listRules.name, description:Keys.category.components.inputAcl.props.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string,string>>({prop:"prop_msgRules", default:{}, name:Keys.category.components.inputAcl.props.msgRules.name, description:Keys.category.components.inputAcl.props.msgRules.description}),
    ...ComponentLabelTrait.props,
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;
