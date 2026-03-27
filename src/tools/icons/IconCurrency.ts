import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconCurrency(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Currency"
    width="${size}" height="${size}" viewBox="0 0 145 57" fill="none">
    <title>Currency</title>
<path fill="${primaryColor}"  d="M140.96,43.23c0,2.01-3.81,5.38-10.87,5.38c-4.75,0-6.65,0-114.63,0c0,0-6.32-2.08-6.32-4.73v4.2 c0,2.66,7.32,4.73,7.32,4.73c107.98,0,108.87,0,113.63,0c7.06,0,10.87-2.52,10.87-4.53V43.23z"/>
<path fill="${primaryColor}"  d="M140.72,35.89c0,2.01-3.81,5.38-10.87,5.38c-4.75,0-6.65,0-114.63,0c0,0-6.32-2.08-6.32-4.73v4.2 c0,2.66,7.32,4.73,7.32,4.73c107.98,0,108.87,0,113.63,0c7.06,0,10.87-2.52,10.87-4.53V35.89z"/>
<path fill="${primaryColor}" stroke="${primaryColor}" stroke-width="2"  d="M125.16,5.95c4.12,0.01,6.07,0.01,8.24,2.61c2.17,2.6,5.19,19.52,5.85,21.84c0.84,2.95-4.17,6.91-9.16,6.91 c-4.98,0-108.52,0.02-112.86,0.02c-7.57,0-8.07-6.32-7.39-8.1c1.94-5.05,5.71-17.17,6.94-19.27c1.15-1.96,1.95-4.24,6.46-4.28 C48.87,5.43,121.69,5.94,125.16,5.95z"/>
<path opacity="0.2" fill="${primaryColor}" d="M125.16,5.77c4.12,0.01,6.07,0.01,8.24,2.61c2.17,2.6,5.19,19.52,5.85,21.84c0.84,2.95-4.17,6.91-9.16,6.91 c-4.98,0-108.52,0.02-112.86,0.02c-7.57,0-8.07-6.32-7.39-8.1c1.94-5.05,5.71-17.17,6.94-19.27c1.15-1.96,1.95-4.24,6.46-4.28 C48.87,5.25,121.69,5.77,125.16,5.77z"/>
<path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="2" d="M119.34,9.61c1.82,0,1.16,3,2.29,3.25c1.13,0.25,5.04-0.27,6,0.71c1.92,1.96,3.6,12.69,4.18,14.44 c0.4,1.2-3.7-0.39-5.49,0.66c-1.53,0.9,0.42,4.54-1.61,4.54c-4.41,0-96.04,0.01-99.88,0.01c-3.17,0,1.07-4.06,0.14-5.32 c-1.03-1.41-7-0.07-6.68-0.78c1.71-3.8,4.05-11.92,5.14-13.51c0.7-1.02,4.26-0.15,5.85-0.77c0.71-0.27,1.63-3.45,2.86-3.46 C54.82,9.22,116.26,9.6,119.34,9.61z"/>
<path opacity="0.75" fill="${secondaryColor}"  d="M66.22,4.63L47.87,35.25c-0.17,0.33-0.27,0.7-0.27,1.08l5.39,15.35c0,1.18,0.87,2.13,1.94,2.13l37.75,0.01 c1.07,0,1.94-0.95,1.94-2.13l3.59-15.44c0-0.19-0.02-0.38-0.07-0.56L83,5.15c-0.23-0.92-0.98-1.56-1.84-1.57l-13.24,0 C67.21,3.57,66.57,3.97,66.22,4.63z"/>
<ellipse fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="2" cx="73.77" cy="22.86" rx="14.38" ry="9.64"/>
<path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="2"  d="M76.85,21.36c0,0,3.31-2.87-1.11-3.63c-1.89-0.32-4.24,0.52-4.54,1.9c-0.3,1.35-0.04,2.36,2.55,2.82 c2.27,0.41,2.28,0.31,3.36,1.05c1.88,1.29,0.65,3.03-1.52,3.51c-2.17,0.48-3.78,0.27-5.29-0.82c-1.84-1.31,0.14-2.66,0.14-2.66"/>
<line fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="2" x1="74.83" y1="15.43" x2="74.79" y2="17.16"/>
<line fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="2"  x1="73.35" y1="27.76" x2="73.31" y2="29.49"/>
<ellipse fill="${primaryColor}"  cx="37.21" cy="20.15" rx="6" ry="3.48"/>
<ellipse fill="${primaryColor}"  cx="114.19" cy="20.15" rx="6" ry="3.48"/>
</svg>`;

}
