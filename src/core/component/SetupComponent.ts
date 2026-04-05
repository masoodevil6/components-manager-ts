import {GOG_SetValue} from "../ComponentBase";
import {Language} from "../Language";






/// ----------------------------------------------------
/// PART: Component
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_component = {
    classList:                                                "classList" ,
    styles:                                                   "styles"
} as const

export const GOG_ComponentBasicConfigs_component_keys = {
    [GOG_ComponentBasicProps_component.classList]:{
        name:                                                 GOG_ComponentBasicProps_component.classList  ,
        value:                                                GOG_SetValue<string[]>([]),
    } ,
    [GOG_ComponentBasicProps_component.styles]:{
        name:                                                 GOG_ComponentBasicProps_component.styles  ,
        value:                                                GOG_SetValue<Record<string, string>>({}),
    } ,
} as const

export const GOG_ComponentBasicConfigs_component_parts = {
    COMPONENT: {
        name:                                                 "part_component"
    } ,
} as const

export function GOG_ComponentBasicConfigs_component_Pattern(ctx){
    return {
        [GOG_ComponentBasicConfigs_component_keys.classList.name]: {
            prop:                                             GOG_ComponentBasicConfigs_component_keys.classList.name,
            default:                                          GOG_ComponentBasicConfigs_component_keys.classList.value,
            title:                                            Language.translate("components.public.props.classList.title"),
            description:                                      Language.translate("components.public.props.classList.description"),
        } ,
        [GOG_ComponentBasicConfigs_component_keys.styles.name]: {
            prop:                                             GOG_ComponentBasicConfigs_component_keys.styles.name,
            default:                                          GOG_ComponentBasicConfigs_component_keys.styles.value,
            title:                                            Language.translate("components.public.props.styles.title"),
            description:                                      Language.translate("components.public.props.styles.description"),
        } ,
    }
};

export function GOG_ComponentBasicConfigs_component_Schema(ctx){
    return {
        [GOG_ComponentBasicConfigs_component_parts.COMPONENT.name]: {
            part:                                             GOG_ComponentBasicConfigs_component_parts.COMPONENT.name ,
            method:                                           ctx.templateBasic_render,
            title:                                            Language.translate("components.public.schema.part_component.title"),
            description:                                      Language.translate("components.public.schema.part_component.description"),
            props:                                            [
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_component_keys.classList.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_component_keys.styles.name] ,
            ] ,
        } ,
    }
}








/// ----------------------------------------------------
/// PART: Structure
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_structure = {
    prop_show:             "prop_show" ,
    prop_structureClass:   "prop_structureClass" ,
    prop_structureStyles:  "prop_structureStyles"
} as const

export const GOG_ComponentBasicConfigs_structure_keys = {
    [GOG_ComponentBasicProps_structure.prop_show]:{
        name:                     GOG_ComponentBasicProps_structure.prop_show  ,
        value:                    GOG_SetValue<boolean>(true),
    },
    [GOG_ComponentBasicProps_structure.prop_structureClass]:{
        name:                     GOG_ComponentBasicProps_structure.prop_structureClass  ,
        value:                    GOG_SetValue<string[]>([]),
    } ,
    [GOG_ComponentBasicProps_structure.prop_structureStyles]:{
        name:                     GOG_ComponentBasicProps_structure.prop_structureStyles  ,
        value:                    GOG_SetValue<Record<string, string>>({}),
    }
} as const

export const GOG_ComponentBasicConfigs_structure_parts = {
    STRUCTURE: {
        name:               "part_structure"
    } ,
} as const

export function GOG_ComponentBasicConfigs_structure_Pattern(ctx){
    return {
        [GOG_ComponentBasicConfigs_structure_keys.prop_structureClass.name]: {
            prop:                                             GOG_ComponentBasicConfigs_structure_keys.prop_structureClass.name,
            default:                                          GOG_ComponentBasicConfigs_structure_keys.prop_structureClass.value,
            title:                                            Language.translate("components.public.props.prop_structureClass.title"),
            description:                                      Language.translate("components.public.props.prop_structureClass.description"),
        } ,
        [GOG_ComponentBasicConfigs_structure_keys.prop_structureStyles.name]: {
            prop:                                             GOG_ComponentBasicConfigs_structure_keys.prop_structureStyles.name,
            default:                                          GOG_ComponentBasicConfigs_structure_keys.prop_structureStyles.value,
            title:                                            Language.translate("components.public.props.prop_structureStyles.title"),
            description:                                      Language.translate("components.public.props.prop_structureStyles.description"),
        } ,
        [GOG_ComponentBasicConfigs_structure_keys.prop_show.name]: {
            prop:                                             GOG_ComponentBasicConfigs_structure_keys.prop_show.name,
            default:                                          GOG_ComponentBasicConfigs_structure_keys.prop_show.value,
            title:                                            Language.translate("components.public.props.prop_show.title"),
            description:                                      Language.translate("components.public.props.prop_show.description"),
        }
    }
};

export function GOG_ComponentBasicConfigs_structure_Schema(ctx){
    return {
        [GOG_ComponentBasicConfigs_structure_parts.STRUCTURE.name]: {
            part:                                             GOG_ComponentBasicConfigs_structure_parts.STRUCTURE.name ,
            method:                                           ctx.templateBasic_render_structure,
            title:                                            Language.translate("components.public.schema.part_structure.title"),
            description:                                      Language.translate("components.public.schema.part_structure.description"),
            props:                                            [
                 ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_structure_keys.prop_structureClass.name] ,
                 ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_structure_keys.prop_structureStyles.name] ,
                 ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_structure_keys.prop_show.name] ,
            ] ,
        }
    }
}