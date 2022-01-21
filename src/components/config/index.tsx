import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

import LogoImg from '../../images/logo.png'

import Section, { ConfigSection } from './section'
import SelectDir from './selectDir'

type Props = {
  onClickClose: () => void
}

const Config = ({ onClickClose }: Props): JSX.Element => {
  // 設定画面を閉じる
  const handleClickClose = () => {
    onClickClose()
    window.api.focusView()
  }

  // ディレクトリを選択
  const handleClickSelectDir = () => {
    window.api.showSelectDirDialog()
  }

  // 項目ボタン
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-50 drag">
      <button
        className="fixed top-0 right-0 p-4 text-xl text-neutral-900 drag-none"
        onClick={handleClickClose}
      >
        <RiCloseLine />
      </button>
      <div className="w-72 drag-none">
        <img src={LogoImg} alt="serizawa" />
        <div className="mt-6">
          <SelectDir onClick={handleClickSelectDir} />
          {sections.map((e) => (
            <Section key={e.title} {...e} />
          ))}
        </div>
        <span className="block mt-8 text-center text-xs text-gray-700">
          {`Developed by arrow2nd - v${process.env.VERSION}`}
        </span>
      </div>
    </div>
  )
}

export default Config
