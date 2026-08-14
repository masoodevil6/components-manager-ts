export interface CategoryDefinition {
    id: string;
    name: string;
    children?: CategoryDefinition[];
}