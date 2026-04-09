import './icons.css';

import {ITemplate} from "../../interfaces/ITemplate";
import {TOOLS} from "../../../tools/tools";

export class IconPage implements ITemplate{

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        const container = document.createElement("div")

        Object.keys(TOOLS.ICON).forEach(key=>{
            let iconSvg = TOOLS.ICON[key]({
                size : 100
            })

            const itemHeaderMethod = document.createElement("b")
            itemHeaderMethod.className = "item-icon-method-name";
            itemHeaderMethod.textContent = key

            const itemHeader = document.createElement("span")
            itemHeader.className = "bg-dark text-white d-block text-center";
            itemHeader.textContent = "TOOLS.ICON."
            itemHeader.appendChild(itemHeaderMethod)

            const item = document.createElement("div")
            item.className = "item-icon-form-method-name item-icon border  float-end";
            item.appendChild(itemHeader)
            item.innerHTML += iconSvg

            container.appendChild(item)
        })

        return container
    }

    onLoad(pageElement: HTMLElement): void {
    }

}