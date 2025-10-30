import React, { useEffect } from "react";
import "../theme/Theme.css";
import "./GlobalStyles.css";
import "./forestScene.css"; // ← 新規ファイル（下で作成）

/**
 * 森林キャンプのような立体背景を全体に適用。
 * 木・星・月・焚き火などのオブジェクトを動かしつつ、
 * 既存のボタンやUIには一切干渉しない。
 */
const AppDesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
  document.body.classList.add("design-forest");
  const layer = document.createElement("div");
  layer.id = "forest-scene";

  // 木と焚き火を追加
  for (let i = 0; i < 6; i++) {
    const tree = document.createElement("div");
    tree.classList.add("forest-tree");
    layer.appendChild(tree);
  }

  const fire = document.createElement("div");
  fire.classList.add("forest-fire");
  layer.appendChild(fire);

  document.body.appendChild(layer);

  return () => {
    document.body.classList.remove("design-forest");
    document.getElementById("forest-scene")?.remove();
  };
}, []);

  return <>{children}</>;
};

export default AppDesignProvider;
