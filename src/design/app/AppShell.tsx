import React from "react";
import "../theme/Theme.css";
import "./GlobalStyles.css";
import "./AppShell.css";

type Props = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

// アプリ全体で使えるレイアウトシェル（森林テーマ前提）
const AppShell: React.FC<Props> = ({ header, sidebar, children }) => {
  return (
    <div className="app-shell tree-silhouette">
      <header className="app-header">{header}</header>
      <div className="app-body">
        {sidebar && <aside className="app-sidebar card">{sidebar}</aside>}
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
