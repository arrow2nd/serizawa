import React from "react";

import Section, { ConfigSection } from "./section";
import SelectDir from "./selectDir";

type Props = {
  toggleProgress: () => void;
};

const Sections = ({ toggleProgress }: Props): JSX.Element => {
  // ディレクトリを選択
  const handleClickSelectDir = () => {
    window.api.showSelectDirDialog();
  };

  // 項目
  const sections: ConfigSection[] = [
    {
      title: "キャッシュを削除",
      btnText: "削除",
      btnBg: "bg-red-400",
      btnHoverBg: "bg-red-600",
      onClick: () => {
        toggleProgress();
        window.api.removeCache().then(toggleProgress);
      }
    },
    {
      title: "初期化（ログアウト）",
      btnText: "初期化",
      btnBg: "bg-red-400",
      btnHoverBg: "bg-red-600",
      onClick: () => {
        toggleProgress();
        window.api.removeCookie().then(toggleProgress);
      }
    },
    {
      title: "更新を確認",
      btnText: "確認",
      btnBg: "bg-gray-600",
      btnHoverBg: "bg-gray-800",
      onClick: () => {
        toggleProgress();
        window.api.checkUpdate().then(toggleProgress);
      }
    }
  ];

  return (
    <div className="mt-6">
      <SelectDir onClick={handleClickSelectDir} />
      {sections.map((e) => (
        <Section key={e.title} {...e} />
      ))}
    </div>
  );
};

export default Sections;
