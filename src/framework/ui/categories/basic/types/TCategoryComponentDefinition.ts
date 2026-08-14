
export type TCategoryComponentDefinition = {
    id: string;
    name: string;
    children?: TCategoryComponentDefinition[];
}