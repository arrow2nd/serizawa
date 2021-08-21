import React from 'react'

type Props = {
  children: React.ReactNode
  onClick: () => void
}

const Button = ({ children, onClick }: Props): JSX.Element => (
  <button
    className="inline-flex px-3 p-6 border-0 rounded-none bg-transparent drag-none focus:outline-none hover:bg-shiny-dark transition-colors"
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
