export class ClTemplateEngine {
    static apply(root: HTMLElement, data: Record<string, any>){
        root.querySelectorAll("[data-text]").forEach(el => {
            const key = el.getAttribute("data-text")
            if(key && key in data){
                el.textContent = data[key]
            }
        })
    }
}