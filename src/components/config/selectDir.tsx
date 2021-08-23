import { AiOutlineFolderOpen } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'

type Props = {
  onChangeDir: () => void
}

const SelectDir = ({ onChangeDir }: Props): JSX.Element => {
  const [picDir, setPicDir] = useState('')

  useEffect(() => {
    window.api.getPicDir().then((dir) => setPicDir(dir))
  }, [])

  const handleClick = async () => {
    onChangeDir()
    setPicDir(await window.api.getPicDir())
  }

  return (
    <div className="w-full mt-6 text-sm">
      <span className="text-left">スクリーンショットの保存先</span>
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
