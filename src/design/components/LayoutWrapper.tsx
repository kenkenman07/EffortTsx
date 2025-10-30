import type { FC, ReactNode } from "react";
import "./LayoutWrapper.css";

type Props = {
  children: ReactNode;
};

export const LayoutWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-wrapper__inner">
        <h2 className="layout-wrapper__title">🔥 オンライン中のフレンド</h2>
        {children}
      </div>
    </div>
  );
};
