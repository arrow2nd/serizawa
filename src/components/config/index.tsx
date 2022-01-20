import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

import LogoImg from '../../images/logo.png'

import Section, { ConfigSection } from './section'
import SelectDir from './selectDir'

type Props = {
  onClickClose: () => void
}

const Config = ({ onClickClose }: Props): JSX.Element => {
  // 設定ウィンドウを閉じる
  const handleClickClose = () => {
    onClickClose()
    window.api.focus()
  }

  // ディレクトリを選択
  const handleClickSelectDir = () => {
    window.api.showSelectDirDialog()
    window.api.focus()
  }

  // 設定項目ボタン
  const sections: ConfigSection[] = [
    {
      title: 'キャッシュを削除',
      btnText: '削除',
      btnBg: 'bg-red-400',
      btnHoverBg: 'bg-red-600',
      onClick: () => {
        window.api.removeCache()
        window.api.focus()
      }
    },
    {
      title: '初期化（ログアウト）',
      btnText: '初期化',
      btnBg: 'bg-red-400',
      btnHoverBg: 'bg-red-600',
      onClick: () => {
        window.api.removeCookie()
        window.api.focus()
      }
    },
    {
      title: '更新を確認',
      btnText: '確認',
      btnBg: 'bg-gray-600',
      btnHoverBg: 'bg-gray-800',
      onClick: () => {
        window.api.checkUpdate()
        window.api.focus()
      }
    }
  ]

  return (
    <div className="flex flex-col items-center px-7 py-8 fixed top-1/2 left-1/2 -transform-50 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl">
      <button
        className="fixed top-3 right-3 text-xl text-gray-800"
        onClick={handleClickClose}
      >
        <RiCloseLine />
      </button>
      <img className="w-64 drag-none" src={LogoImg} alt="serizawa" />
      <div className="w-full mt-6">
        <SelectDir onClick={handleClickSelectDir} />
        {sections.map((e) => (
          <Section key={e.title} {...e} />
        ))}
      </div>
      <span className="block mt-8 text-xs text-gray-700">
        {`Developed by arrow2nd - v${process.env.VERSION}`}
      </span>
    </div>
  )
}

export default Config
