import { RiCloseLine } from 'react-icons/ri'
import React from 'react'
import LogoImg from '../../images/logo.png'
import Section from './section'
import SelectDir from './selectDir'

const Config = (): JSX.Element => (
  <div className="flex flex-col items-center px-6 py-8 fixed top-1/2 left-1/2 -transform-50 w-96 bg-white rounded-xl shadow-2xl">
    <button className="fixed top-3 right-3 text-xl text-gray-800">
      <RiCloseLine />
    </button>
    <img className="w-64 drag-none" src={LogoImg} alt="serizawa" />
    <SelectDir onChangeDir={window.api.openSelectDir} />
    <Section
      title="キャッシュを削除"
      btnText="削除"
      btnBg="bg-red-400"
      btnHoverBg="bg-red-600"
      onClick={window.api.removeCache}
    />
    <Section
      title="初期化（ログアウト）"
      btnText="初期化"
      btnBg="bg-red-400"
      btnHoverBg="bg-red-600"
      onClick={window.api.removeCookie}
    />
    <Section
      title="更新を確認"
      btnText="GitHubを開く"
      btnBg="bg-gray-600"
      btnHoverBg="bg-gray-800"
      onClick={window.api.openGitHub}
    />
  </div>
)

export default Config
