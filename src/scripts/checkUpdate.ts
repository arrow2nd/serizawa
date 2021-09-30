import os from 'os'
import axios from 'axios'

/**
 * 更新チェック
 *
 * @returns ダウンロードページのURL
 */
export async function checkUpdate(): Promise<string | undefined> {
  const url = 'https://api.github.com/repos/arrow2nd/serizawa/releases/latest'

  const res = await axios.get(url)
  if (res.status !== 200) {
    console.error(res.statusText)
    return undefined
  }

  // 更新が無い
  if (res.data.tag_name === `v${process.env.npm_package_version}`) {
    return undefined
  }

  const osType = os.type().toString()
  const extList: { [index: string]: string } = {
    Darwin: 'dmg',
    Windows_NT: 'exe'
  }

  const assets = res.data.assets.find((e: { name: string }) =>
    e.name.includes(extList[osType])
  )

  // 見つからなかったらreleasesへのURLを返す
  return assets ? assets.browser_download_url : res.data.html_url
}
