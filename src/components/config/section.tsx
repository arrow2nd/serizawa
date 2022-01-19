import React from 'react'

import { ConfigSection } from '../../types/config'

const Section = ({
  title,
  btnText,
  btnBg,
  btnHoverBg,
  onClick
}: ConfigSection): JSX.Element => (
  <div className="mt-4 text-sm">
    <span className="block text-left">{title}</span>
    <button
      className={`w-full mt-2 p-1 text-center text-white ${btnBg} hover:${btnHoverBg} transition-colors rounded-2xl shadow-md`}
      onClick={onClick}
    >
      {btnText}
    </button>
  </div>
)

export default Section
