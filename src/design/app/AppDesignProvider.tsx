import React from "react";
import "../theme/Theme.css";
import "./GlobalStyles.css";

/**
 * アプリ全体に森林キャンプのテーマを適用したい場合にルートで包む。
 * ページ単位での適用は TaskDesign が body.classList を付与するため、こちらは「全体」用。
 */
const AppDesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    document.body.classList.add("design-forest");
    return () => document.body.classList.remove("design-forest");
  }, []);
  return <>{children}</>;
};

export default AppDesignProvider;
