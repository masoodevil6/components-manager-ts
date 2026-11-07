import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages/keys/components/tableResponsible";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    CONTENT: {
        part: "part-table-responsible-content",
        props: Object.values(Props),
        name: Keys.category.components.tableResponsible.schemas.content.name,
        description: Keys.category.components.tableResponsible.schemas.content.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
