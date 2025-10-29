# 努力共有タイマー

## [ ライバルを具現化する ]
- ログインしているユーザを監視
- リアルタイムで作業時間を共有

## URL
https://effort-tsx.vercel.app/

## 開発環境・技術構成
- フロントエンド：React(TypeScript)
- データベース：Supabase(PostgreSQL + Auth)
- 開発ツール：Vite, npm, git
- デプロイ: Vercel
- デザイン: V0

## 機能要件
1 アカウント登録機能  
2 ログイン機能  
3 フレンド登録機能
4 ログインステータス管理機能  
5 タイマー機能  

## ディレクトリ構造
```
  
EffortTsx/                    
|  ├─ src/  
|  │  ├─ pages/               # ページ単位 
|  │  ├─ hooks/               # カスタムフック
|  │  ├─ services/            # API呼び出し・Supabase接続など
|  │  ├─ types/               # 型定義（共通で使う型）
|  │  └─ main.tsx             # エントリーポイント
|  ├─ public/                 # index.html など静的ファイル
```



