import React from 'react'

const Footer = (): JSX.Element => {
  // プライバシーポリシーを開く
  const handleClickPrivacyPolicy = () => {
    window.api.openPrivacyPolicy()
  }

  return (
    <>
      <span className="block mt-8 text-center text-xs text-luca">
        {`Developed by arrow2nd - v${process.env.VERSION}`}
      </span>
      <span
        className="block mt-4 text-center text-xs text-luca hover:text-rinze underline cursor-pointer"
        onClick={handleClickPrivacyPolicy}
      >
        プライバシーポリシー
      </span>
    </>
  )
}

export default Footer
