
// styles
import './styles/main.css';
import './styles/bootstrap.css';

import {Router} from "./router/core/router";
import {ROUTES_MAP} from "./router/core/routes";


const router = new Router(
    document.getElementById("app")!,
    ROUTES_MAP
)

router.resolve()