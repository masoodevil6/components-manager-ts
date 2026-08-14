import * as Categories from "src/categories"

export type TComponentDefinition ={
    id:       string;
    name:     string;
    version:  string;
    category: Categories.Types.TCategoryDefinition
}