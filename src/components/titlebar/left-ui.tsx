import { RiSettings3Line } from 'react-icons/ri'
import React from 'react'
import Button from './button'

type Props = {
  onClick: () => void
}

const LeftUI = ({ onClick }: Props): JSX.Element => (
  <div className="flex items-center overflow-hidden">
    <Button onClick={onClick}>
      <RiSettings3Line />
    </Button>
  </div>
)

export default LeftUI
