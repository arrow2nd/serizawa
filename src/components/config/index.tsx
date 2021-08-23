import { RiCloseLine } from 'react-icons/ri'
import React from 'react'
import Section from './section'
import SelectDir from './selectDir'
import LogoImg from '../../images/logo.png'

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

  const handleClickOpenGitHub = () => {
    window.api.openGitHub()
    focusIframe()
  }

  return (
    <div className="flex flex-col items-center px-6 py-8 fixed top-1/2 left-1/2 -transform-50 w-96 bg-white rounded-xl shadow-2xl">
      <button
        className="fixed top-3 right-3 text-xl text-gray-800"
        onClick={handleClickClose}
      >
        <RiCloseLine />
      </button>
      <img className="w-64 drag-none" src={LogoImg} alt="serizawa" />
      <div className="mt-6">
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
          btnText="GitHubを開く"
          btnBg="bg-gray-600"
          btnHoverBg="bg-gray-800"
          onClick={handleClickOpenGitHub}
        />
      </div>
      <span className="block mt-8 text-xs text-gray-700">
        {`Developed by arrow2nd - v${process.env.VERSION}`}
      </span>
    </div>
  )
}

export default Config
