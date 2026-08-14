import {HomePage} from "../pages/home/HomePage";
import {ITemplate} from "../interfaces/ITemplate";
import {IconPage} from "../pages/icons/IconPage";
import {Language} from "../../core/Language";
import {Observable} from "../../core/Observable";
import {TestsPage} from "../pages/tests/TestsPage";

export const ROUTES_MAP: Record<string,{template:new () => ITemplate ,data?:any , headerTitle: Observable<string>}> = {

    "/": {
        template: HomePage,
        data:  { } ,
        headerTitle: Language.translate("pages.home")
    },

    "/icons": {
        template: IconPage,
        data:  { } ,
        headerTitle: Language.translate("pages.icons")
    },

    "/tests": {
        template: TestsPage,
        data:  { } ,
        headerTitle: Language.translate("pages.tests")
    },

}