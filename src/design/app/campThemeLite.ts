// src/design/app/campThemeLite.ts
// ❶ CSSを読み込む（副作用）
import "./campThemeLite.css";

// ❷ 背景レイヤーを body 直下に追加（最背面 / クリック無効）
(function mountCampBackdrop() {
  const id = "camp-theme-lite-backdrop";
  if (document.getElementById(id)) return;
  const layer = document.createElement("div");
  layer.id = id;
  document.body.appendChild(layer);
})();

// ❸ Presenceの <p> にだけクラスをふる（テキストはそのまま／ボタン非接触）
(function tagPresenceLines() {
  const apply = () => {
    const ps = document.querySelectorAll("p");
    ps.forEach((p) => {
      // 既存クラスをクリア
      p.classList.remove("presence-self", "presence-friend");
      const t = (p.textContent || "").trim();
      if (!t) return;
      // “(あなた)” の表記があるものを自分扱い
      if (t.includes("（あなた）") || t.includes("(あなた)")) {
        p.classList.add("presence-self");
      } else {
        // それ以外は友だち候補（presence行だけ後述CSSで装飾）
        p.classList.add("presence-friend");
      }
    });
  };

  // 初回＆DOM変化に追従（レンダー更新対応）
  const mo = new MutationObserver(apply);
  mo.observe(document.body, { childList: true, subtree: true });
  apply();

  // ページ離脱時に停止
  window.addEventListener("beforeunload", () => mo.disconnect());
})();
