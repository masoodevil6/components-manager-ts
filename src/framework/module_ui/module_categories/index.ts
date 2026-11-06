// Re-export the factory before evaluating category definitions. Those definitions
// import this barrel to create their public category entries.
export {
    CreateCategoryIcon,
    CreateCategoryComponent
} from "./basic/methods"

export {
UI , Icons
} from "./lists"

export type {
    CategoryIconDefinition      as TCategoryIconDefinition ,
    CategoryComponentDefinition as TCategoryComponentDefinition ,
    CategoryComponentTotality   as TCategoryComponentTotality ,
    CategoryIconTotality        as TCategoryIconTotality
} from "./basic/types"

export {
    Fa   as CategoriesLanguageFa ,
    En   as CategoriesLanguageEn ,
    Keys as CategoriesLanguageKeys
} from "./languages"
