import React from 'react'
import UIButton from '../button'
import { RiSettings3Line } from 'react-icons/ri'

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
