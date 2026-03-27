import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";


export function IconAmount(
    options: IconOptions = {}
): string {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 10

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Amount"
    width="${size}" height="${size}" viewBox="0 0 250 270" fill="none">
    <title>Amount</title>
<path fill="${primaryColor}" d="M230.92,139.53c0-0.11,0-0.22,0-0.34c0-0.8-0.01-1.61-0.03-2.41c-0.01-0.25-0.02-0.5-0.03-0.74 c-0.02-0.7-0.05-1.39-0.08-2.08c-0.01-0.14-0.02-0.28-0.02-0.43c-2.77-52.57-41.54-95.46-91.8-103.86V9.29c0-2.76-2.24-5-5-5h-22.08 c-2.76,0-5,2.24-5,5v19.8C54.62,35.83,13.83,79.67,11.07,133.7c0,0.06-0.01,0.13-0.01,0.19c-0.04,0.72-0.06,1.45-0.08,2.17 c-0.01,0.23-0.02,0.45-0.02,0.68c-0.02,0.76-0.03,1.53-0.03,2.29c0,0.16-0.01,0.32-0.01,0.49c0,0.01,0,0.01,0,0.02 c0,0.01,0,0.01,0,0.02c0,55.45,40.02,101.43,92.41,109.96v19.35c0,3.31,2.69,6,6,6h19.98c3.31,0,6-2.69,6-6v-18.88 c53.95-7.14,95.61-53.85,95.61-110.42c0-0.01,0-0.01,0-0.02C230.92,139.54,230.92,139.53,230.92,139.53z M128.84,217.63v44.71 c0,2.72-2.24,4.92-5,4.92h-9.71c-2.76,0-5-2.2-5-4.92v-43.32c-13.3-0.74-25.43-4.65-34.12-10.37l6.26-21.33 c7.4,5.41,20.5,11.14,33.03,11.14c18.22,0,26.76-10.19,26.76-22.92c0-13.37-7.12-20.7-25.62-28.34 c-24.77-9.87-36.44-25.15-36.44-43.62c0-20.79,12.58-38.46,34.06-43.65V18.34c0-2.72,2.24-4.92,5-4.92h9.71c2.76,0,5,2.2,5,4.92 v40.34c11.34,1.07,21.14,4.92,27.66,9.25l-6.26,20.38c-5.41-3.82-15.37-8.92-28.19-8.92c-14.8,0-23.06,9.55-23.06,21.01c0,12.74,8.26,18.47,26.19,26.11c23.92,10.19,36.16,23.56,36.16,46.49C165.27,195.57,152.19,212.6,128.84,217.63z"/>
</svg>`;

}
