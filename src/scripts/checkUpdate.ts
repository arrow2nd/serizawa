import axios from 'axios'
import { app } from 'electron'
import os from 'os'

interface IGitHubAPIResponse {
  tag_name: string
  html_url: string
  assets: {
    name: string
    browser_download_url: string
  }[]
}

const url = 'https://api.github.com/repos/arrow2nd/serizawa/releases/latest'

/**
 * 更新チェック
 *
 * @returns ダウンロードページのURL
 */
export async function checkUpdate(): Promise<string | undefined> {
  const res = await axios.get<IGitHubAPIResponse>(url)
  if (res.status !== 200) {
    console.error(res.statusText)
    return undefined
  }

  // 更新が無い
  if (res.data.tag_name === `v${app.getVersion()}`) {
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
