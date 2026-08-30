/**
 * نگاشت خروجی Step → Response (قابل نسبت دادن با requestId)
 * کلید: هر شناسه Step دارای identity
 */
export type TResponseMap = Map<{readonly identity: symbol; readonly unique: string}, any>;