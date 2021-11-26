import React from 'react'
import Section from './section'
import SelectDir from './selectDir'
import LogoImg from '../../images/logo.png'
import { RiCloseLine } from 'react-icons/ri'

type Props = {
  focusIframe: () => void
  onClickClose: () => void
}

const Config = ({ focusIframe, onClickClose }: Props): JSX.Element => {
  const handleClickClose = () => {
    onClickClose()
    focusIframe()
  }

  const handleClickSelectDir = () => {
    window.api.openSelectDir()
    focusIframe()
  }

  const handleClickRemoveCache = () => {
    window.api.removeCache()
    focusIframe()
  }

  const handleClickRemoveCookie = () => {
    window.api.removeCookie()
    focusIframe()
  }

  const handleClickCheckUpdate = () => {
    window.api.checkUpdate()
    focusIframe()
  }

  return (
    <div className="flex flex-col items-center px-7 py-8 fixed top-1/2 left-1/2 -transform-50 w-96 bg-white border border-gray-400 rounded-xl shadow-2xl">
      <button
        className="fixed top-3 right-3 text-xl text-gray-800"
        onClick={handleClickClose}
      >
        <RiCloseLine />
      </button>
      <img className="w-64 drag-none" src={LogoImg} alt="serizawa" />
      <div className="w-full mt-6">
        <SelectDir onClick={handleClickSelectDir} />
        <Section
          title="キャッシュを削除"
          btnText="削除"
          btnBg="bg-red-400"
          btnHoverBg="bg-red-600"
          onClick={handleClickRemoveCache}
        />
        <Section
          title="初期化（ログアウト）"
          btnText="初期化"
          btnBg="bg-red-400"
          btnHoverBg="bg-red-600"
          onClick={handleClickRemoveCookie}
        />
        <Section
          title="更新を確認"
          btnText="確認"
          btnBg="bg-gray-600"
          btnHoverBg="bg-gray-800"
          onClick={handleClickCheckUpdate}
        />
      </div>
      <span className="block mt-8 text-xs text-gray-700">
        {`Developed by arrow2nd - v${process.env.VERSION}`}
      </span>
    </div>
  )
}

export default Config
