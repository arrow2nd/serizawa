/**
 * 2桁で0埋めする
 * @param num 数値
 * @returns 0埋め後の文字列
 */
export function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

/**
 * Dateオブジェクトから文字列を作成
 * @param date Dateオブジェクト
 * @returns YYYYMMDD_hhmmsss形式の文字列
 */
export function date2String(date: Date): string {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}
