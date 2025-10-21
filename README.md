# EffortSharingSystemForTs

## 概要
- 努力共有サービス

## 開発環境・技術構成
- フロントエンド：React(TypeScript)
- バックエンド：Node.js(TypeScript)
- 通信：Socket.IO
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
effort-share/  
├─ frontend/                  # React(TypeScript)フロントエンド  
│  ├─ src/  
│  │  ├─ components/          # UIコンポーネント群
│  │  ├─ pages/               # ページ単位 (React Routerでルーティング)
│  │  ├─ hooks/               # カスタムフック(useTimerなど)
│  │  ├─ contexts/            # グローバル状態 (AuthContextなど)
│  │  ├─ services/            # API呼び出し・Supabase接続など
│  │  ├─ types/               # 型定義（共通で使う型）
│  │  ├─ assets/              # 画像・アイコン
│  │  ├─ styles/              # TailwindやCSS Modules
│  │  └─ main.tsx             # エントリーポイント
│  ├─ public/                 # index.html など静的ファイル
│  ├─ vite.config.ts
│  └─ tsconfig.json
```

### バックエンド→今のところいらない ↓見なくていい

```
├─ backend/                   # Node.js(TypeScript)バックエンド
│  ├─ src/
│  │  ├─ server.ts            # メインサーバー（Express or Fastify）
│  │  ├─ routes/              # 各APIルート (/auth, /timer, /friends)
│  │  ├─ controllers/         # ビジネスロジック層
│  │  ├─ services/            # Supabase操作や外部API連携
│  │  ├─ middlewares/         # 認証・ロギング・バリデーションなど
│  │  ├─ utils/               # 共通関数・ヘルパー
│  │  ├─ types/               # 型定義（共通で使うDTOなど）
│  │  └─ socket/              # Socket.IO関連のイベント処理
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ .env
│  └─ nodemon.json
│
├─ shared/                    # フロント＆バックで共有する型など
│  └─ types/
│     ├─ user.ts
│     ├─ friend.ts
│     ├─ timer.ts
│     └─ index.ts
│
├─ .gitignore
├─ package.json               # 全体管理用（npm workspace対応）
└─ README.md
```

