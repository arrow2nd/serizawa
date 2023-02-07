import React from "react";

const Footer = (): JSX.Element => {
  const linkClassName = "hover:text-rinze underline cursor-pointer";

  const handleClickPrivacyPolicy = () => {
    window.api.openPrivacyPolicy();
  };

  const handleClickGitHub = () => {
    window.api.openGitHub();
  };

  return (
    <>
      <span className="block mt-8 text-center text-xs text-luca">
        {`Developed by arrow2nd - v${process.env.VERSION}`}
      </span>
      <div className="mt-4 text-center text-xs text-luca">
        <span className={linkClassName} onClick={handleClickPrivacyPolicy}>
          プライバシーポリシー
        </span>
        {" / "}
        <span className={linkClassName} onClick={handleClickGitHub}>
          {"配布ページ (GitHub)"}
        </span>
      </div>
    </>
  );
};

export default Footer;
