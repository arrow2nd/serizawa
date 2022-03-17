/**
 * 許可されたURLかどうか
 * @param url URL
 * @return 結果
 */
export function isAllowedUrl(url: string): boolean {
  const safeList = [
    /^https:\/\/(portal|shinycolors)\.enza\.fun/,
    /^https:\/\/.*\.bandainamcoid\.com/,
    /^https:\/\/.*\.line\.me/,
    /^https:\/\/.*\.apple\.com/,
    /^https:\/\/.*\.facebook\.com/,
    /^https:\/\/.*\.twitter\.com/
  ]

  const result = safeList.find((patten) => patten.test(url))

  return typeof result !== 'undefined'
}

/**
 * URLかどうか
 * @param url URL
 * @returns 結果
 */
export function isUrl(url: string): boolean {
  return /^https?:\/\//.test(url)
}
