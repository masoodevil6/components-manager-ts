import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconWalletAdd(
    options: IconOptions = {}
): string {


    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 5

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    if (variant === 'small') {
        return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet_add"
    width="${size}" height="${size}" viewBox="0 0 216 200"  fill="none">
  <title>Wallet Add</title>
<g id="Layer_1">
	<path opacity="0.4" fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M161.56,83.22c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L161.56,83.22z"/>
	<path opacity="0.2" fill="${primaryColor}"  d="M33.35,67.84v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20V27.21c0-11.05-8.95-20-20-20H53.35 c-11.05,0-20,8.95-20,20v24.72"/>
	<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M33.35,67.84v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20V27.21c0-11.05-8.95-20-20-20H53.35c-11.05,0-20,8.95-20,20v24.72"/>
	<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="36.35" y1="29.19" x2="202.71" y2="29.19"/>
	<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="36.35" y1="94.75" x2="202.71" y2="94.75"/>
	<path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M161.56,78.36c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L161.56,78.36z"/>
	<circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" cx="168.47" cy="62.48" r="7.77"/>
</g>
<g id="Layer_2">
	<path fill="${secondaryColor}" d="M5.74,71.38c1.65,4.59,11.06,18.67,26.83,18.59C47.19,89.9,61.22,77.7,61.22,61.33 c0-15.82-12.83-28.65-28.65-28.65c-12.93,0-23.43,9.34-27.1,19.33"/>
	<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth/2}"  d="M5.73,71.39C9.8,82.26,20.28,90,32.57,90c15.82,0,28.65-12.83,28.65-28.65S48.39,32.71,32.57,32.71 c-12.55,0-23.21,8.07-27.09,19.3"/>
	<path fill="${primaryColor}" d="M18.87,67.42h27.89c2.76,0,5-2.24,5-5v-2.18c0-2.76-2.24-5-5-5H18.87c-2.76,0-5,2.24-5,5v2.18 C13.87,65.18,16.11,67.42,18.87,67.42z"/>
	<path fill="${primaryColor}" d="M26.73,47.97v27.89c0,2.76,2.24,5,5,5h2.18c2.76,0,5-2.24,5-5V47.97c0-2.76-2.24-5-5-5h-2.18 C28.96,42.97,26.73,45.21,26.73,47.97z"/>
</g>
</svg>`
    }

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet_add"
    width="${size}" height="${size}" viewBox="0 0 216 200"  fill="none">
  <title>Wallet Add</title>
<g id="Layer_1">
	<path opacity="0.4" fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M164.39,156.99c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L164.39,156.99z"/>
	<path opacity="0.2" fill="${primaryColor}"  d="M36.18,141.61v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H56.18 c-11.05,0-20,8.95-20,20v24.72"/>
	<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M36.18,141.61v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H56.18 c-11.05,0-20,8.95-20,20v24.72"/>
	<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="39.18" y1="102.96" x2="205.54" y2="102.96"/>
	<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="39.18" y1="168.51" x2="205.54" y2="168.51"/>
	<path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M164.39,152.12c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L164.39,152.12z"/>
	<circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth/2}" cx="171.31" cy="136.25" r="7.77"/>
</g>
<g id="Layer_2">
	<path fill="${secondaryColor}" class="st5" d="M8.57,145.15c1.65,4.59,11.06,18.67,26.83,18.59c14.61-0.08,28.65-12.28,28.65-28.65 c0-15.82-12.83-28.65-28.65-28.65c-12.93,0-23.43,9.34-27.1,19.33"/>
	<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth/2}" d="M8.56,145.15c4.07,10.87,14.55,18.61,26.84,18.61c15.82,0,28.65-12.83,28.65-28.65s-12.83-28.65-28.65-28.65 c-12.55,0-23.21,8.07-27.09,19.3"/>
	<path fill="${primaryColor}" d="M21.7,141.18H49.6c2.76,0,5-2.24,5-5V134c0-2.76-2.24-5-5-5H21.7c-2.76,0-5,2.24-5,5v2.18 C16.7,138.94,18.94,141.18,21.7,141.18z"/>
	<path fill="${primaryColor}" d="M29.56,121.74v27.89c0,2.76,2.24,5,5,5h2.18c2.76,0,5-2.24,5-5v-27.89c0-2.76-2.24-5-5-5h-2.18 C31.8,116.74,29.56,118.98,29.56,121.74z"/>
</g>
<g id="Layer_3">
	<path opacity="0.2" fill="${primaryColor}" d="M170.55,77.01c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07L137.49,9.42 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C102.83,76.75,170.55,77.01,170.55,77.01z"/>
	<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M170.55,79.06c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07l-44.68-36.68 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C102.83,78.8,170.55,79.06,170.55,79.06z"/>
	<path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M151.39,79.07L162,66.69c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C108.79,77.76,151.39,79.07,151.39,79.07z" />
	<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth/2}"  d="M110.6,74.61c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75s-5.26-11.75-11.75-11.75 S110.6,68.12,110.6,74.61z"/>
</g>
</svg>`
}