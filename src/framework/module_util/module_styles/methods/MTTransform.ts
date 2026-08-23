
///------------------------------
import {TVSizeUnit  as SizeUnit}          from "../types/var/TVSizeUnit";
import {TVTransform as Transform}         from "../types/var/TVTransform";

export const MTTransform = (transitionX: SizeUnit, transitionY: SizeUnit) : Transform=> {
    return `translate(${transitionX} , ${transitionY})` as Transform
}