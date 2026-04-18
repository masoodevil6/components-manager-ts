
// styles
import './styles/app.css';
import './styles/bootstrap.css';
import './styles/main.css';

import {Router} from "./router/core/router";
import {ROUTES_MAP} from "./router/core/routes";


const router = new Router(
    document.getElementById("app")!,
    ROUTES_MAP
)

router.resolve()