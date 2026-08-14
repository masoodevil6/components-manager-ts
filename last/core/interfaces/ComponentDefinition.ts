import * as core from "@/core"

export interface ComponentDefinition {
    id: string;
    name: string;
    version: string;

    category: core.interfaces.CategoryDefinition
}