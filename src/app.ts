
// styles
import './files/styles/bootstrap.css';
import './files/styles/app.css';
import './files/styles/main.css';

import * as Framework from "@/framework";
(window as any).Framework = Framework;

const router = new Framework.Route.App(
    document.getElementById("app")!,
    Framework.Pages.PageMap
)

router.resolve()