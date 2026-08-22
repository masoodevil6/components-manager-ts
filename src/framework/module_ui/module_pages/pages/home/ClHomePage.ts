import {ITemplate} from "../../interfaces/ITemplate";

export class HomePage implements ITemplate{

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {
        const container = document.createElement("div")
        container.className = "page home"
        container.textContent = query?.message ??  "خوش آمدید!"

        return container
    }

    onLoad(pageElement: HTMLElement): void {
    }

}