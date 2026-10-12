import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    CARD: {
        part: "part-card-view-clicable-card",
        titleKey: Keys.category.components.cardViewClicable.schemas.card.name,
        descriptionKey: Keys.category.components.cardViewClicable.schemas.card.description,
        props: Object.values(Props),
    },
    CARD_TITLE: {
        part: "part-card-view-clicable-card-title",
        titleKey: Keys.category.components.cardViewClicable.schemas.cardTitle.name,
        descriptionKey: Keys.category.components.cardViewClicable.schemas.cardTitle.description,
        props: [Props.prop_title, Props.prop_imageSrc],
    },
} as const;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
