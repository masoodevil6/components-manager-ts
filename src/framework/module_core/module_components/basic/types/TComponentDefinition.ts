import * as UI from "@/ui"

export interface TComponentDefinition {
    id:       string;
    name:     string;
    version:  string;
    category: UI.Category.Basic.Types.CategoryComponentDefinition
}