import React, { useEffect, useState } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'

type Props = {
  onClick: () => void
}

const SelectDir = ({ onClick }: Props): JSX.Element => {
  const [picDir, setPicDir] = useState('')

  const setTruncateDir = (dir: string) => {
    if (dir.length > 35) {
      dir = dir.slice(0, 35) + '...'
    }
    setPicDir(dir)
  }

  // 初回のみ取得
  useEffect(() => {
    window.api.getPicDir().then((dir) => setTruncateDir(dir))
  }, [])

  const handleClick = async () => {
    onClick()
    setTruncateDir(await window.api.getPicDir())
  }

  return (
    <div className="text-sm">
      <span className="block text-left">スクリーンショットの保存先</span>
      <div
        className={`flex items-center justify-between w-full mt-2 px-4 py-1 text-center text-black border rounded-2xl shadow-md`}
      >
        <span>{picDir}</span>
        <button onClick={handleClick}>
          <AiOutlineFolderOpen />
        </button>
      </div>
    </div>
  )
}

export default SelectDir
