
// styles
import './files/styles/bootstrap.css';
import './files/styles/app.css';
import './files/styles/main.css';

import * as framework from "@/framework";

const router = new framework.Route.App(
    document.getElementById("app")!,
    framework.Pages.PageMap
)

router.resolve()