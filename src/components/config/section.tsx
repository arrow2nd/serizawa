import React from 'react'

type Props = {
  title: string
  btnText: string
  btnBg: string
  btnHoverBg: string
  onClick: () => void
}

const Section = ({
  title,
  btnText,
  btnBg,
  btnHoverBg,
  onClick
}: Props): JSX.Element => (
  <div className="w-full mt-4 text-sm">
    <span className="text-left">{title}</span>
    <button
      className={`w-full mt-2 p-1 text-center text-white ${btnBg} hover:${btnHoverBg} transition-colors rounded-2xl shadow-md`}
      onClick={onClick}
    >
      {btnText}
    </button>
  </div>
)

export default Section
