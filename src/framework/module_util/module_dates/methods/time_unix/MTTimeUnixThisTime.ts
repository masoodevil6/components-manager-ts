export const MTTimeUnixThisTime = function (withTomorrow = true): number {
     return Math.floor(Date.now() / 1000) + (withTomorrow ? 86400 : 0);
}