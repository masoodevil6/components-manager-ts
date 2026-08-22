// ایمپورت مستقیم از ماژول‌های منبع برای جلوگیری از Circular Dependency
// (ایمپورت از "@/framework" باعث وابستگی دایره‌ای می‌شود)
import { ClHomePage as HomePage }  from "../pages/home";
import { ClIconPage as IconPage }  from "../pages/icons";
import { ClTestsPage as TestsPage } from "../pages/tests";

import type { TRouter } from "@/core_route_public";
import { App as LanguageApp }     from "@/core_languages_public";

export const CtPageMaps: TRouter = {

    "/": {
        template:      HomePage,
        data:          { } ,
        headerTitle:   LanguageApp.translate("pages.home")
    },

    "/icons": {
        template:      IconPage,
        data:          { } ,
        headerTitle:   LanguageApp.translate("pages.icons")
    },

    "/tests": {
        template:      TestsPage,
        data:          { } ,
        headerTitle:   LanguageApp.translate("pages.tests")
    },

}
