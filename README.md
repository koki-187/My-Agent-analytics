# My Agent Analytics

エージェント分析ダッシュボード - PWA対応の次世代アナリティクスプラットフォーム

## 概要

My Agent Analyticsは、エージェントの活動データを分析・可視化するためのWebアプリケーションです。Progressive Web App (PWA) として実装されており、オフライン環境でも利用可能です。

### 主な機能

- ✅ **PWA対応**: ホーム画面への追加、オフライン動作、プッシュ通知（準備中）
- ✅ **PDF出力**: 日本語フォント（Noto Sans JP）埋め込みによる高品質なレポート生成
- ✅ **Google OAuth認証**: NextAuth.jsによる安全なログイン機能
- ✅ **Google Analytics 4連携**: 詳細なユーザー行動トラッキング
- ✅ **レスポンシブデザイン**: モバイル、タブレット、デスクトップに対応
- ✅ **CI/CD**: Lighthouse CI と Playwright によるE2Eテスト
- ✅ **TypeScript**: 型安全な開発環境
- ✅ **Tailwind CSS**: モダンで保守性の高いスタイリング

## 技術スタック

- **フレームワーク**: Next.js 14 (React 18)
- **言語**: TypeScript 5
- **スタイリング**: Tailwind CSS 3
- **認証**: NextAuth.js 4
- **PWA**: next-pwa 5
- **PDF生成**: html2canvas + jsPDF
- **アナリティクス**: Google Analytics 4
- **テスト**: Playwright
- **CI/CD**: GitHub Actions (Lighthouse CI, Playwright E2E)

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn
- Git

### インストール手順

#### 方法1: クイックスタート（推奨）

```bash
git clone https://github.com/koki-187/My-Agent-analytics.git
cd My-Agent-analytics
./scripts/quick-start.sh
```

クイックスタートスクリプトは以下を自動実行します：
- 依存関係のインストール
- .env.localの作成
- ビルドテスト

#### 方法2: 手動セットアップ

1. **リポジトリのクローン**

```bash
git clone https://github.com/koki-187/My-Agent-analytics.git
cd My-Agent-analytics
```

2. **依存関係のインストール**

```bash
npm install
```

3. **環境変数の設定**

`.env.example` をコピーして `.env.local` を作成します。

```bash
cp .env.example .env.local
```

`.env.local` を編集して必要な環境変数を設定してください：

```env
# 必須項目
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<openssl rand -base64 32で生成>
GOOGLE_CLIENT_ID=<Google Cloud Consoleで取得>
GOOGLE_CLIENT_SECRET=<Google Cloud Consoleで取得>

# オプション
NEXT_PUBLIC_GA_ID=<Google Analytics測定ID>
OPENAI_API_KEY=<OpenAI APIキー>
ESTAT_API_KEY=<e-Stat APIキー>
```

4. **フォントファイルの配置**

PDF出力に日本語フォントが必要です。

```bash
# Google Fontsから直接ダウンロード
cd public/fonts
curl -L "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf" -o NotoSansJP-Regular.ttf
```

または、[Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP)からダウンロードして `public/fonts/NotoSansJP-Regular.ttf` に配置してください。

5. **開発サーバーの起動**

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## Google OAuth設定

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuthクライアントID」を選択
5. アプリケーションの種類：「ウェブアプリケーション」
6. 承認済みのリダイレクトURI:
   - 開発環境: `http://localhost:3000/api/auth/callback/google`
   - 本番環境: `https://yourdomain.com/api/auth/callback/google`
7. クライアントIDとシークレットを `.env.local` に設定

## ビルドとデプロイ

### プロダクションビルド

```bash
npm run build
npm run start
```

### Vercelへのデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/koki-187/My-Agent-analytics)

1. Vercelアカウントにログイン
2. リポジトリをインポート
3. 環境変数を設定（`.env.example`を参照）
4. デプロイ

### その他のプラットフォーム

- **Netlify**: `npm run build && npm run export`
- **AWS Amplify**: 自動ビルド設定
- **Azure Static Web Apps**: GitHub Actions連携

## PWA機能

### ホーム画面への追加

#### iOS (Safari)
1. Safari でサイトを開く
2. 共有ボタンをタップ
3. 「ホーム画面に追加」を選択

#### Android (Chrome)
1. Chrome でサイトを開く
2. メニュー（⋮）をタップ
3. 「ホーム画面に追加」を選択

### オフライン動作

- キャッシュされたページはオフラインでも表示可能
- ネットワーク接続が回復すると自動的に同期
- オフライン時は `/offline` ページを表示

### Service Worker

Service Workerは本番環境でのみ有効化されます。開発環境では無効です。

## PDF出力の注意事項

### 日本語フォント

PDF出力には日本語フォント（Noto Sans JP）の埋め込みが必要です。

- フォントファイルがない場合、PDFは生成されますがデフォルトフォント（日本語非対応）が使用されます
- フォントファイルは約2-4MBのサイズがあります
- ライセンス: SIL Open Font License 1.1

### ブラウザ互換性

- Chrome/Edge: ✅ 完全対応
- Firefox: ✅ 完全対応
- Safari: ✅ 対応（一部制限あり）
- Mobile Safari: ✅ 対応

### パフォーマンス

- 大きなページのPDF生成には時間がかかる場合があります
- ブラウザによっては一時的にフリーズする可能性があります

## テスト

### E2Eテスト（Playwright）

```bash
# インストール
npx playwright install

# テスト実行
npm run test:e2e

# UIモードで実行
npx playwright test --ui

# 特定のテストのみ実行
npx playwright test tests/e2e.spec.ts
```

### Lighthouse CI

Lighthouse CIはGitHub Actionsで自動実行されます。ローカルで実行する場合：

```bash
# ビルド
npm run build
npm run start

# 別ターミナルでLighthouse実行
npx lighthouse http://localhost:3000 --view
```

## スクリプト

```bash
npm run dev         # 開発サーバー起動
npm run build       # プロダクションビルド
npm run start       # プロダクションサーバー起動
npm run lint        # ESLint実行
npm run test:e2e    # Playwrightテスト実行
```

## 環境変数一覧

| 変数名 | 必須 | 説明 | 例 |
|--------|------|------|-----|
| `NEXTAUTH_URL` | ✅ | アプリケーションのURL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ✅ | NextAuth.jsのシークレット | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | ✅ | Google OAuthクライアントID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | ✅ | Google OAuthシークレット | `GOCSPX-xxx` |
| `NEXT_PUBLIC_GA_ID` | ❌ | Google Analytics測定ID | `G-XXXXXXXXXX` |
| `OPENAI_API_KEY` | ❌ | OpenAI APIキー | `sk-xxx` |
| `ESTAT_API_KEY` | ❌ | e-Stat APIキー | `xxx` |

## ディレクトリ構成

```
My-Agent-analytics/
├── .github/
│   └── workflows/          # GitHub Actions設定
│       ├── lighthouse.yml  # Lighthouse CI
│       └── playwright.yml  # E2Eテスト
├── components/             # Reactコンポーネント
│   ├── DownloadPdfButton.tsx
│   └── pdfGenerator.ts
├── lib/                    # ユーティリティライブラリ
│   └── gtag.ts            # Google Analytics
├── pages/                  # Next.jsページ
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth].ts
│   ├── _app.tsx
│   ├── index.tsx
│   └── offline.tsx
├── public/                 # 静的ファイル
│   ├── fonts/             # フォントファイル
│   │   └── NotoSansJP-Regular.ttf
│   ├── icons/             # PWAアイコン
│   │   ├── icon-180.png
│   │   ├── icon-192.png
│   │   ├── icon-384.png
│   │   └── icon-512.png
│   └── manifest.json      # PWAマニフェスト
├── styles/                # スタイルシート
│   └── globals.css
├── tests/                 # テストファイル
│   └── e2e.spec.ts
├── .env.example           # 環境変数テンプレート
├── .eslintrc.json        # ESLint設定
├── .gitignore            # Git除外設定
├── next.config.js        # Next.js設定
├── playwright.config.ts  # Playwright設定
├── postcss.config.js     # PostCSS設定
├── tailwind.config.js    # Tailwind CSS設定
└── tsconfig.json         # TypeScript設定
```

## トラブルシューティング

### ビルドエラー

**問題**: `Module not found: Can't resolve '@/...'`

**解決策**: `tsconfig.json` のパス設定を確認してください。

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### PWAが動作しない

**問題**: Service Workerが登録されない

**解決策**:
- 開発環境では Service Worker は無効です（`NODE_ENV=development`）
- プロダクションビルド（`npm run build && npm run start`）で確認してください
- HTTPSまたはlocalhostでのみ動作します

### PDF生成エラー

**問題**: 日本語が正しく表示されない

**解決策**:
- `public/fonts/NotoSansJP-Regular.ttf` が存在するか確認
- ファイルサイズが0バイトでないか確認
- ブラウザのコンソールでエラーメッセージを確認

## 今後のタスク・改善予定

### 短期（1-2週間）

- [ ] ダッシュボードのデータ可視化強化（Chart.js/Recharts導入）
- [ ] リアルタイムデータ更新機能（WebSocket/SWR）
- [ ] ユーザー設定画面の実装
- [ ] ダークモード完全対応

### 中期（1-2ヶ月）

- [ ] データベース統合（PostgreSQL/Prisma）
- [ ] APIエンドポイントの拡充
- [ ] e-Stat API連携による政府統計データ取得
- [ ] OpenAI API連携による分析レポート自動生成
- [ ] プッシュ通知機能の実装
- [ ] データエクスポート機能拡張（Excel, CSV）

### 長期（3ヶ月以上）

- [ ] マルチテナント対応
- [ ] 高度な分析機能（機械学習予測）
- [ ] カスタムダッシュボード作成機能
- [ ] APIレート制限・監視機能
- [ ] 監査ログ機能
- [ ] 国際化対応（i18n）

## 設計資料

プロジェクトの設計書、業務引継ぎメモ、開発チャットログ等の詳細資料は以下に管理されています：

- **Google Drive設計書**: プロジェクトの全体設計、アーキテクチャ図
- **業務引継ぎメモ**: 開発の経緯、意思決定の記録
- **チャットログ**: 技術的議論、課題解決の履歴

主要な設計方針：
- **PWAファースト**: オフライン対応を最優先
- **セキュリティ**: OAuth認証、環境変数による秘密情報管理
- **パフォーマンス**: Lighthouse スコア 90+ を目標
- **アクセシビリティ**: WCAG 2.1 AA準拠
- **保守性**: TypeScript、ESLint、適切なディレクトリ構成

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 貢献

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

## サポート

問題が発生した場合は、[GitHub Issues](https://github.com/koki-187/My-Agent-analytics/issues) でお知らせください。

## 作者

- **koki-187** - [GitHub](https://github.com/koki-187)

## 謝辞

- Next.js チーム
- Vercel
- すべてのオープンソースコントリビューター

---

**Made with ❤️ using Next.js and TypeScript**