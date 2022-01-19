import React, { useEffect, useState } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'

type Props = {
  onClick: () => void
}

const SelectDir = ({ onClick }: Props): JSX.Element => {
  const [picDir, setPicDir] = useState('')

  // 初回のみディレクトリパスを取得
  useEffect(() => {
    window.api.getPicDir().then((dir) => setPicDir(dir))
  }, [])

  const handleClick = async () => {
    onClick()
    setPicDir(await window.api.getPicDir())
  }

  return (
    <div className="text-sm">
      <span className="block text-left">スクリーンショットの保存先</span>
      <div
        className={`flex items-center justify-between w-full mt-2 px-4 py-1 text-center text-black border rounded-2xl shadow-md`}
      >
        <span className="truncate">{picDir}</span>
        <button onClick={handleClick}>
          <AiOutlineFolderOpen />
        </button>
      </div>
    </div>
  )
}

export default SelectDir
