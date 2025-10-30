# Forest Camp Design (src/design)

既存ファイルは一切変更せず、この `src/design` 以下を追加するだけで
「森林 × キャンプ × 温かい配色」のテーマを導入できます。依存追加なし（純 React+TS+CSS）。

## 使い方

### 1) ページ単位（TaskPage に導入）
```tsx
// 例: TaskPage.tsx などで
import { TaskDesign } from "@/design"; // エイリアスがない場合は相対 import
// ...
return <TaskDesign />;
```

### 2) アプリ全体に導入
```tsx
// 例: main.tsx または App.tsx のルートで
import { AppDesignProvider } from "@/design";

root.render(
  <AppDesignProvider>
    <App />
  </AppDesignProvider>
);
```

### 3) FriendsPanel をサイドバーで
```tsx
import { AppShell, FriendsPanel, type Friend } from "@/design";

const friends: Friend[] = [
  { id: "1", username: "Alice", status: "online" },
  { id: "2", username: "Bob", status: "offline" },
];

return (
  <AppShell
    header={<div className="container">🔥 Effort • Forest Mode</div>}
    sidebar={<FriendsPanel friends={friends} />}
  >
    <div className="container">Main content...</div>
  </AppShell>
);
```

## フォルダ構成
- `theme/` : CSS変数・配色、トークン
- `components/` : Campfire（焚火）、WarmClock（時計）、FriendsPanel（友達リスト）
- `pages/` : `TaskDesign`（中央に焚火＋時計）
- `app/` : アプリ全体に使える `AppShell` と `AppDesignProvider`
- `index.ts` : エクスポート集約

## メモ
- `TaskDesign` は body にテーマクラス (`design-forest`) を付与/除去します。
- 全体に適用したい場合は `AppDesignProvider` をルートで使用します。
- レイアウトは `AppShell` を使うと「ヘッダー＋サイドバー＋メイン」構成が簡単です。
