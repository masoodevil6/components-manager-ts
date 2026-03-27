export interface ITemplate {

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement

}