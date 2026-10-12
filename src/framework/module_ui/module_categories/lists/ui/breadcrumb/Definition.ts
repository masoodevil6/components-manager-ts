import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import {Breadcrumb} from "./componentBreadcrumb";
import {BreadcrumbWithArrow} from "./componentBreadcrumbWithArrow/Definition";
import {BreadcrumbShadow} from "./componentBreadcrumbShadow/Definition";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "breadcrumb",
    name: Keys.category.components.breadcrumb.name,
    description: Keys.category.components.breadcrumb.description,
    components: [Breadcrumb, BreadcrumbWithArrow, BreadcrumbShadow],
};
