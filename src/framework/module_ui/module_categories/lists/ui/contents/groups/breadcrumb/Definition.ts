import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {Breadcrumb, BreadcrumbWithArrow, BreadcrumbShadow} from "../../../breadcrumb";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "breadcrumb",
    name: Keys.category.components.contents.breadcrumb.name,
    description: Keys.category.components.contents.breadcrumb.description,
    components: [Breadcrumb, BreadcrumbWithArrow, BreadcrumbShadow] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};
