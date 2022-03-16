import React from 'react'

export type Button = {
  title: string
  children: React.ReactNode
  onClick: () => void
}

const UIButton = ({ title, children, onClick }: Button): JSX.Element => {
  const handleClick = () => {
    onClick()
    window.api.focusView()
  }

  return (
    <button
      className="inline-flex px-3 p-6 border-0 rounded-none bg-transparent drag-none focus:outline-none hover:bg-shiny-dark transition-colors"
      title={title}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default UIButton
