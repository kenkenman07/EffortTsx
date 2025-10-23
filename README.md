# EffortSharingSystemForTs

## 概要
- 努力共有サービス

## 開発環境・技術構成
- フロントエンド：React(TypeScript)
- バックエンド：Node.js(TypeScript)
- データベース：Supabase(PostgreSQL + Auth)
- 開発ツール：Vite, npm, git

## 機能要件
1 アカウント登録機能  
2 ログイン機能  
3 フレンド登録機能  
4 タイマー機能  

## ディレクトリ構造
### フロントエンド+Supabase→今のところこれでいい  
- supabase = BaaS(Backend as a Service)  

```
  
EffortTsx/                  # React(TypeScript)フロントエンド  
|  ├─ src/  
|  │  ├─ components/          # UIコンポーネント群
|  │  ├─ pages/               # ページ単位 (React Routerでルーティング)
|  │  ├─ hooks/               # カスタムフック(useTimerなど)
|  │  ├─ contexts/            # グローバル状態 (AuthContextなど)
|  │  ├─ services/            # API呼び出し・Supabase接続など
|  │  ├─ types/               # 型定義（共通で使う型）
|  │  ├─ assets/              # 画像・アイコン
|  │  ├─ styles/              # TailwindやCSS Modules
|  │  └─ main.tsx             # エントリーポイント
|  ├─ public/                 # index.html など静的ファイル
|  ├─ vite.config.ts
|  └─ tsconfig.json
└─
```



