import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

import LogoImg from '../../images/logo.png'

import Footer from './footer'
import Sections from './sections'

type Props = {
  onClickClose: () => void
}

const Config = ({ onClickClose }: Props): JSX.Element => {
  // 設定画面を閉じる
  const handleClickClose = () => {
    onClickClose()
    window.api.focusView()
  }

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
        <Sections />
        <Footer />
      </div>
    </div>
  )
}

export default Config
