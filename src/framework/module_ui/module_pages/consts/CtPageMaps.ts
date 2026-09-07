import type { TRouter }                from "@/core_route";
import { App as LanguageApp }          from "@/core_languages";
///------------------------------
import {ClHomePage   as HomePage}      from "../pages/home/ClHomePage";
import {ClIconPage   as IconPage}      from "../pages/icons/ClIconPage";
import {ClTestsPage  as TestsPage}     from "../pages/tests/ClTestsPage";
import {ClPerformancePage as PerformancePage} from "../pages/performance/ClPerformancePage";



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

    "/performance": {
        template:      PerformancePage,
        data:          { } ,
        headerTitle:   LanguageApp.translate("pages.performance")
    },

}
