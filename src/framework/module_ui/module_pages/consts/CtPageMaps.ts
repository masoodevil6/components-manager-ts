
import * as Framework   from "@/framework";

export const PageMaps: Framework.Route.TRouter = {

    "/": {
        template: HomePage,
        data:  { } ,
        headerTitle: Framework.Language.App.translate("pages.home")
    },

    "/icons": {
        template: IconPage,
        data:  { } ,
        headerTitle:  Framework.Language.App.translate("pages.icons")
    },

    "/tests": {
        template: TestsPage,
        data:  { } ,
        headerTitle:  Framework.Language.App.translate("pages.tests")
    },

}