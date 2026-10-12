
///------------------------------
import {TRouteData as RouteData}     from "../types/TRouteData";
import {TRouter    as Router }       from "../types/TRouter";

export class ClRouter {
    root:    HTMLElement
    routes:  Router

    constructor(root: HTMLElement, routes: Router){
        this.root = root
        this.routes = routes
        window.addEventListener("popstate", () => this.resolve())
    }

    navigate(path: string){
        history.pushState({}, "", path)
        this.resolve()
    }

    resolve(){
        const path = location.pathname
        const route = this.routes[path] ?? this.#matchRoute(path)
        if(!route) return

        this.#renderPage(route);
    }

    #matchRoute(path: string): RouteData | undefined {
        const pathParts = path.split("/").filter(Boolean);
        for (const [pattern, route] of Object.entries(this.routes)) {
            const patternParts = pattern.split("/").filter(Boolean);
            if (patternParts.length !== pathParts.length) continue;
            if (patternParts.every((part, index) => part.startsWith(":") || part === pathParts[index])) return route;
        }
        return undefined;
    }







    #setTitlePage(route: RouteData){
        if(route.headerTitle){
            const headerTitle = document.querySelector("head title") as HTMLElement
            headerTitle.textContent = route.headerTitle.get()
        }
    }

    #getParamsQuery(){
        const urlParams = new URLSearchParams(window.location.search)
        const query: Record<string,string> = {}
        urlParams.forEach((value, key) => query[key] = value)
        return query;
    }

    #renderPage(route: RouteData){
        this.root.innerHTML = ""

        const pageInstance = new route.template()

        const pageElement = pageInstance.render(this.#getParamsQuery() , route.data)
        this.root.appendChild(pageElement)

        pageInstance.onLoad(pageElement)


        this.#setTitlePage(route);
    }
}
