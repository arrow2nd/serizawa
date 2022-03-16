import React from 'react'

import Section, { ConfigSection } from './section'
import SelectDir from './selectDir'

const Sections = (): JSX.Element => {
  // ディレクトリを選択
  const handleClickSelectDir = () => {
    window.api.showSelectDirDialog()
  }

  // 項目
  const sections: ConfigSection[] = [
    {
      title: 'キャッシュを削除',
      btnText: '削除',
      btnBg: 'bg-red-400',
      btnHoverBg: 'bg-red-600',
      onClick: () => window.api.removeCache()
    },
    {
      title: '初期化（ログアウト）',
      btnText: '初期化',
      btnBg: 'bg-red-400',
      btnHoverBg: 'bg-red-600',
      onClick: () => window.api.removeCookie()
    },
    {
      title: '更新を確認',
      btnText: '確認',
      btnBg: 'bg-gray-600',
      btnHoverBg: 'bg-gray-800',
      onClick: () => window.api.checkUpdate()
    }
  ]

  return (
    <div className="mt-6">
      <SelectDir onClick={handleClickSelectDir} />
      {sections.map((e) => (
        <Section key={e.title} {...e} />
      ))}
    </div>
  )
}

export default Sections
