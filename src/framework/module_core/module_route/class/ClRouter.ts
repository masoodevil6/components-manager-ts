import * as CoreRoute from "@/core_route";

export class ClRouter {
    root:    HTMLElement
    routes:  CoreRoute.Types.Router

    constructor(root: HTMLElement, routes: CoreRoute.Types.Router){
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
        const route = this.routes[path]
        if(!route) return

        this.#renderPage(route);
    }







    #setTitlePage(route: CoreRoute.Types.RouteData){
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

    #renderPage(route: CoreRoute.Types.RouteData){
        this.root.innerHTML = ""

        const pageInstance = new route.template()

        const pageElement = pageInstance.render(this.#getParamsQuery() , route.data)
        this.root.appendChild(pageElement)

        pageInstance.onLoad(pageElement)


        this.#setTitlePage(route);
    }
}
