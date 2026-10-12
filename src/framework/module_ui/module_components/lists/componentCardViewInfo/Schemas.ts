import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    CARD: {
        part: "part-card-view-info",
        titleKey: Keys.category.components.cardViewInfo.schemas.card.name,
        descriptionKey: Keys.category.components.cardViewInfo.schemas.card.description,
        props: Object.values(Props),
    },
} as const;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
