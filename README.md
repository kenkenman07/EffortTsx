# EffortTsx — Forest Camp Mode

> **コンセプト（一言）**：`<あなたの一言コンセプトをここに>`

[![Vercel - Main](https://img.shields.io/badge/Deploy-Main%20Branch-000?logo=vercel)](<あなたのメインURL>)
[![Vercel - Design](https://img.shields.io/badge/Deploy-Design%20Preview-000?logo=vercel)](<あなたのデザインURL>)

---

## 🌙 概要（What）

**EffortTsx** は、友だちのオンライン状況を見ながら、**「同じ焚火を囲むように」**集中時間を共有できる Web アプリです。  
「ライバルを具現化する」を合言葉に、**作業時間の可視化・軽いプレッシャー・温かい一体感**を UI で実現しています。

- ⏱ **タイマー**：Start / Stop / Reset のシンプル設計（夜キャンプ調の装飾）
- 🟢 **Presence**：オンライン中のフレンドが**一目で分かる**（パルス・炎アイコン）
- 🏕 **テーマ**：アプリ全体に**夜のキャンプ**を想起させるデザイン（薄く揺れる焚火の光）

---

## 🔗 本番 / デザイン用 URL

- **Main（本番）**：`<あなたのメインURL>`  
  例）https://efforttsx.vercel.app

- **Design（デザイン検証用プレビュー）**：`<あなたのデザインURL>`  
  例）https://feature-forest-mode-efforttsx.vercel.app

> ※Vercel の Preview 環境を**デザイン専用ブランチ**（例：`feature/design-forest`）に紐づけて運用する想定です。

---

## 🧠 背景（Why）

- 1人だと集中が切れがち ⇒ **「同時接続の仲間が見える」**だけで行動が変わる
- タイマーは味気ない ⇒ **世界観（夜キャンプ）**に没入できると続けやすい
- リアルタイムは難しい ⇒ **Supabase Realtime** を活用して**速く/簡潔に**実現

---

## 🧩 機能（Features）

- **Focus Timer**：作業時間を計測（視認性の高い夜キャンプUI）  
- **Friends Presence**：オンラインの友達を**Pingアニメ＋🔥アイコン**で可視化  
- **Forest Theme**：アプリ全体に薄く揺れる焚火の光（背景アニメ）  
- **安全な統合**：既存ファイルを**変更せず**に `src/design/` を追加するだけで導入可能

---

## 🛠 技術スタック（Tech Stack）

- **フロントエンド**：React 19, TypeScript, Vite
- **リアルタイム / 認証**：Supabase（Auth / Realtime / Postgres）
- **デザイン**：**ChatGPT**
- **デプロイ**：Vercel（Preview / Production）

> 補足：UI は `src/design/` に集約し、**既存のアプリロジックへ非侵入**で差し込めます。

---






## 🧪 今後のロードマップ（Roadmap）

- 

---

