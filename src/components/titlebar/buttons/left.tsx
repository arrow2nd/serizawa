import React from 'react'
import { RiSettings3Line } from 'react-icons/ri'

import UIButton from '../button'

type Props = {
  onClick: () => void
}

const LeftButtons = ({ onClick }: Props): JSX.Element => (
  <div className="flex items-center overflow-hidden">
    <UIButton onClick={onClick}>
      <RiSettings3Line />
    </UIButton>
  </div>
)

export default LeftButtons
