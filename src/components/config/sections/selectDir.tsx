import React, { useEffect, useState } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'

type Props = {
  onClick: () => void
}

const SelectDir = ({ onClick }: Props): JSX.Element => {
  const [pictureDir, setPictureDir] = useState('')

  // 初回のみディレクトリパスを取得
  useEffect(() => {
    window.api.getPictureDir().then((dir) => setPictureDir(dir))
  }, [])

  const handleClick = async () => {
    onClick()
    setPictureDir(await window.api.getPictureDir())
  }

  return (
    <div className="text-sm">
      <span className="block text-left">スクリーンショットの保存先</span>
      <div
        className={`flex items-center justify-between w-full mt-2 px-4 py-1 text-center text-luca border rounded-2xl shadow-md`}
      >
        <span className="truncate">{pictureDir}</span>
        <button onClick={handleClick}>
          <AiOutlineFolderOpen />
        </button>
      </div>
    </div>
  )
}

export default SelectDir
