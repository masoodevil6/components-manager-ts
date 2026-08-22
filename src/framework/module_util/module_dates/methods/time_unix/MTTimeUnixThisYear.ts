import { toJalaali, toGregorian } from 'jalaali-js'

export const MTTimeUnixThisYear = function (isSamci = true): number {
      if (isSamci) {

            const now = new Date();
            const j = toJalaali(now);
            const g = toGregorian(j.jy, 1, 1);

            return Math.floor(
                new Date(g.gy, g.gm - 1, g.gd).getTime() / 1000
            );
        }

        const year = new Date().getFullYear();

        return Math.floor(
            new Date(year, 0, 1).getTime() / 1000
        );
}