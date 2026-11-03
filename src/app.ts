
// styles
import './files/styles/bootstrap.css';

import * as Framework from "@/framework";
import * as UiCategory from "@/ui_categories";
(window as any).Framework = Framework;

const router = new Framework.Route.App(
    document.getElementById("app")!,
    Framework.Pages.ApplicationPageMap,
    (route) => UiCategory.UI.Fetch.Widget({
        ...(route.widgetProps ?? {}),
        prop_controller: route.controller as any,
    } as any).getElement() as HTMLElement,
)

router.resolve()
