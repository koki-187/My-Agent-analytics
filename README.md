# My Agent Analytics

AIエージェントによるデータ分析・可視化プラットフォーム

## 概要

My Agent Analyticsは、Next.jsベースのプログレッシブウェブアプリケーション（PWA）で、AIエージェントを活用したデータ分析とレポート生成を提供します。Google OAuth認証、PDF出力機能、オフライン対応、Google Analytics 4連携など、モダンなWeb技術を統合しています。

## 主な機能

- 🔐 **Google OAuth認証**: 安全なユーザー認証システム
- 📊 **データ分析ダッシュボード**: AIエージェントによる自動分析
- 📄 **PDFレポート生成**: 日本語対応、Noto Sans JPフォント使用
- 📱 **PWA対応**: オフライン利用可能、ホーム画面へのインストール対応
- 📈 **GA4連携**: 主要イベントの自動追跡
- 🎨 **Tailwind CSS**: モダンでレスポンシブなUI
- ⚡ **TypeScript**: 型安全な開発環境

## 技術スタック

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **認証**: NextAuth.js (Google Provider)
- **PWA**: next-pwa
- **PDF生成**: html2canvas + jsPDF
- **テスト**: Playwright
- **CI/CD**: GitHub Actions

## セットアップ手順

### 必要要件

- Node.js 18.x 以上
- npm または yarn
- Google Cloud Platform アカウント（OAuth用）
- Google Analytics 4 アカウント（任意）

### インストール

1. **リポジトリをクローン**

```bash
git clone https://github.com/koki-187/My-Agent-analytics.git
cd My-Agent-analytics
```

2. **依存関係をインストール**

```bash
npm install
```

3. **環境変数を設定**

`.env.example` をコピーして `.env` を作成し、必要な値を設定します：

```bash
cp .env.example .env
```

必須の環境変数：

- `NEXTAUTH_URL`: アプリケーションのURL（開発時は `http://localhost:3000`）
- `NEXTAUTH_SECRET`: ランダムな文字列（`openssl rand -base64 32` で生成可能）
- `GOOGLE_CLIENT_ID`: Google Cloud Consoleで取得
- `GOOGLE_CLIENT_SECRET`: Google Cloud Consoleで取得
- `NEXT_PUBLIC_GA_ID`: Google Analytics 4のトラッキングID（任意）

### Google OAuth設定

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成または既存のプロジェクトを選択
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuthクライアントID」を選択
5. アプリケーションの種類は「ウェブアプリケーション」を選択
6. 承認済みのリダイレクトURIに以下を追加：
   - `http://localhost:3000/api/auth/callback/google` (開発環境)
   - `https://yourdomain.com/api/auth/callback/google` (本番環境)
7. クライアントIDとシークレットを `.env` に設定

### 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## ビルドとデプロイ

### 本番ビルド

```bash
npm run build
npm start
```

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)アカウントを作成
2. GitHubリポジトリを接続
3. 環境変数を設定（Vercelのダッシュボードから）
4. デプロイ

```bash
# Vercel CLIを使用する場合
npm i -g vercel
vercel
```

### その他のホスティング

Next.jsアプリケーションは以下のプラットフォームでもデプロイ可能です：

- Netlify
- AWS Amplify
- Google Cloud Run
- Docker コンテナ

## PWA機能

### インストール方法

1. アプリケーションをブラウザで開く
2. アドレスバーの「+」アイコンまたは「ホーム画面に追加」をクリック
3. デバイスにアプリがインストールされます

### オフライン対応

- Service Workerにより、オフライン時でも基本的な機能を利用可能
- キャッシュ戦略により、画像、フォント、スタイルシートなどが保存されます
- オフライン時は `/offline` ページが表示されます

### 注意点

- オフライン機能は本番ビルド時のみ有効（開発モードでは無効）
- 初回アクセス時はオンライン接続が必要
- 認証が必要な機能はオンライン接続が必須

## PDF出力機能

### 使用方法

1. 分析を実行して結果を表示
2. 「PDFをダウンロード」ボタンをクリック
3. 生成されたPDFがダウンロードされます

### 注意事項

- **日本語フォント**: Noto Sans JPフォントをWebフォントとして読み込んでいます
- **大きなコンテンツ**: 複数ページに自動分割されます
- **画像品質**: デフォルトで高品質（scale: 2）に設定
- **ブラウザ互換性**: モダンブラウザ（Chrome, Firefox, Safari, Edge）で動作確認済み

### カスタマイズ

`lib/pdfGenerator.ts` でPDF生成のオプションを変更できます：

```typescript
{
  filename: 'custom-report.pdf',
  orientation: 'landscape', // または 'portrait'
  format: 'a4', // または 'letter'
  quality: 0.95
}
```

## Google Analytics 4 イベント

以下のイベントが自動的に追跡されます：

- `page_view`: ページ閲覧
- `analysis_started`: 分析開始
- `analysis_completed`: 分析完了
- `pdf_generation_started`: PDF生成開始
- `pdf_generation_completed`: PDF生成完了
- `pdf_generation_error`: PDF生成エラー
- `pwa_install_prompt_shown`: PWAインストールプロンプト表示
- `pwa_installed`: PWAインストール完了

## テスト

### E2Eテスト（Playwright）

```bash
# テストを実行
npm test

# UIモードでテストを実行
npm run test:ui

# ブラウザを表示してテストを実行
npm run test:headed
```

### Lighthouse CI

パフォーマンス、アクセシビリティ、SEOのスコアを自動測定：

```bash
# GitHub Actionsで自動実行（プッシュ時）
# ローカルで手動実行する場合:
npm run build
npm start &
npx lighthouse http://localhost:3000 --view
```

## プロジェクト構成

```
My-Agent-analytics/
├── .github/
│   └── workflows/          # GitHub Actions
│       ├── lighthouse.yml  # Lighthouse CI
│       └── playwright.yml  # E2E テスト
├── components/             # Reactコンポーネント
│   └── DownloadPdfButton.tsx
├── lib/                    # ユーティリティ関数
│   └── pdfGenerator.ts
├── pages/                  # Next.jsページ
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth].ts  # NextAuth設定
│   ├── _app.tsx           # アプリケーションルート
│   ├── _document.tsx      # HTMLドキュメント
│   ├── index.tsx          # ホームページ
│   └── offline.tsx        # オフラインページ
├── public/                # 静的ファイル
│   ├── icons/             # PWAアイコン
│   └── manifest.json      # PWAマニフェスト
├── styles/                # スタイルシート
│   └── globals.css        # グローバルCSS
├── tests/                 # テストファイル
│   └── home.spec.ts
├── .env.example           # 環境変数テンプレート
├── .gitignore
├── next.config.js         # Next.js設定
├── package.json
├── playwright.config.ts   # Playwright設定
├── postcss.config.js      # PostCSS設定
├── tailwind.config.js     # Tailwind CSS設定
└── tsconfig.json          # TypeScript設定
```

## 環境変数一覧

| 変数名 | 説明 | 必須 | デフォルト |
|--------|------|------|------------|
| `NEXTAUTH_URL` | アプリケーションURL | ✅ | - |
| `NEXTAUTH_SECRET` | NextAuth暗号化キー | ✅ | - |
| `GOOGLE_CLIENT_ID` | Google OAuth クライアントID | ✅ | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth シークレット | ✅ | - |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | ❌ | - |
| `OPENAI_API_KEY` | OpenAI APIキー | ❌ | - |
| `ESTAT_API_KEY` | e-Stat APIキー | ❌ | - |

## トラブルシューティング

### PWAがインストールできない

- HTTPSが有効か確認（本番環境）
- Service Workerが正しく登録されているか確認
- ブラウザのキャッシュをクリア

### PDF生成でエラーが発生

- 生成対象の要素IDが正しいか確認
- コンソールエラーを確認
- ブラウザの互換性を確認

### 認証エラー

- `.env` ファイルの環境変数が正しく設定されているか確認
- Google Cloud ConsoleでOAuth設定を確認
- リダイレクトURIが正しいか確認

## 今後のタスク

- [ ] 実際のデータソース（Google Sheets、e-Stat API等）との統合
- [ ] OpenAI APIを使用した高度な分析機能の実装
- [ ] ダッシュボードUIの拡張（チャート、グラフ等）
- [ ] ユーザー設定・プロファイル管理
- [ ] データエクスポート機能（CSV、Excel等）
- [ ] マルチ言語対応
- [ ] ダークモード対応
- [ ] 通知機能（PWA Push通知）
- [ ] カスタムレポートテンプレート
- [ ] データ共有・コラボレーション機能

## 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev/)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## サポート

問題が発生した場合は、GitHubのIssueを作成してください。