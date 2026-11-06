import type { TRouter }                from "@/core_route";
import { App as LanguageApp }          from "@/core_languages";
///------------------------------
import {ClHomePage   as HomePage}      from "../pages/home/ClHomePage";
import {ClIconPage   as IconPage}      from "../pages/icons/ClIconPage";
import {ClTestsPage  as TestsPage}     from "../pages/tests/ClTestsPage";
import {ClWorkflowPage as WorkflowPage} from "../pages/workflow/ClWorkflowPage";
import {ClComponentsPage as ComponentsPage} from "../pages/components/ClComponentsPage";
import {ClComponentDetailsPage as ComponentDetailsPage} from "../pages/components/ClComponentDetailsPage";
import {ClPageV2 as PageV2} from "../v2/ClPageV2";
import {PageV2Example} from "../v2/examples/PageV2Example";
import * as CoreObservable from "@/core_observable";



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
        redirectTo: "/v2/performance",
    },

    "/workflow": {
        template:      WorkflowPage,
        data:          { },
        headerTitle:   new CoreObservable.App("Workflow"),
    },

    "/components": {
        template:      ComponentsPage,
        data:          { },
        headerTitle:   new CoreObservable.App("Components"),
    },

    "/components/:componentName": {
        template:      ComponentDetailsPage,
        data:          { },
        headerTitle:   new CoreObservable.App("Component"),
    },

    "/home": {
        template:      PageV2,
        data:          PageV2Example,
        headerTitle:   new CoreObservable.App("Home"),
    },

    "/v2": {
        redirectTo: "/home",
    },

}
