import { AiOutlineFolderOpen } from 'react-icons/ai'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

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
    <div className="w-full text-sm">
      <span className="block mt-4 text-left">スクリーンショットの保存先</span>
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
