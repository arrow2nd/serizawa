import React from 'react'

type Props = {
  children: React.ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: Props): JSX.Element => (
  <button className="icon" onClick={onClick}>
    {children}
  </button>
)

export default Button
