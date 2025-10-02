# デプロイガイド

## Vercelへのデプロイ（推奨）

### 前提条件
- GitHub アカウント
- Vercel アカウント

### 手順

1. **Vercel にサインイン**
   - https://vercel.com にアクセス
   - GitHub アカウントで認証

2. **新しいプロジェクトをインポート**
   - 「New Project」をクリック
   - GitHub リポジトリを選択: `koki-187/My-Agent-analytics`
   - 「Import」をクリック

3. **環境変数を設定**
   - 「Environment Variables」セクションで以下を設定：
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=<openssl rand -base64 32で生成>
   GOOGLE_CLIENT_ID=<Google Cloud Consoleから取得>
   GOOGLE_CLIENT_SECRET=<Google Cloud Consoleから取得>
   NEXT_PUBLIC_GA_ID=<Google Analytics 4 ID>
   OPENAI_API_KEY=<OpenAI APIキー>
   ESTAT_API_KEY=<e-Stat APIキー>
   ```

4. **デプロイ設定**
   - Framework Preset: Next.js (自動検出)
   - Build Command: `npm run build` (デフォルト)
   - Output Directory: `.next` (デフォルト)
   - Install Command: `npm install` (デフォルト)

5. **Google OAuth リダイレクト URI を更新**
   - Google Cloud Consoleに戻る
   - 承認済みのリダイレクト URI に追加：
     `https://your-domain.vercel.app/api/auth/callback/google`

6. **デプロイ**
   - 「Deploy」をクリック
   - 数分でデプロイ完了

### 自動デプロイ
- main ブランチへのプッシュで自動的に本番環境にデプロイ
- プルリクエストごとにプレビュー環境を自動生成

## Netlify へのデプロイ

### 手順

1. **Netlify にサインイン**
   - https://netlify.com にアクセス

2. **新しいサイトを追加**
   - 「Add new site」→「Import an existing project」
   - GitHub リポジトリを接続

3. **ビルド設定**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **環境変数を設定**
   - Site settings → Environment variables
   - Vercel と同じ環境変数を設定

5. **デプロイ**
   - 「Deploy site」をクリック

## Docker でのデプロイ

### Dockerfile 作成

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### next.config.js に追加

```javascript
module.exports = {
  output: 'standalone',
  // ... 既存の設定
}
```

### ビルドと実行

```bash
docker build -t my-agent-analytics .
docker run -p 3000:3000 --env-file .env my-agent-analytics
```

## AWS Amplify へのデプロイ

1. AWS Amplify Console にアクセス
2. 「New app」→「Host web app」
3. GitHub リポジトリを接続
4. ビルド設定（自動検出）を確認
5. 環境変数を追加
6. デプロイ開始

## Google Cloud Run へのデプロイ

### 手順

1. **Cloud Build API を有効化**

2. **cloudbuild.yaml を作成**

```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-agent-analytics', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/my-agent-analytics']
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'my-agent-analytics'
      - '--image'
      - 'gcr.io/$PROJECT_ID/my-agent-analytics'
      - '--region'
      - 'asia-northeast1'
      - '--platform'
      - 'managed'
```

3. **デプロイ**

```bash
gcloud builds submit --config cloudbuild.yaml
```

## デプロイ後の確認事項

- [ ] アプリケーションが正常に起動
- [ ] Google OAuth ログインが動作
- [ ] PWA マニフェストが読み込まれる
- [ ] Service Worker が登録される
- [ ] PDF ダウンロードが動作
- [ ] Google Analytics イベントが送信される
- [ ] オフラインページが表示される

## トラブルシューティング

### ビルドエラー
- Node.js バージョンを確認（18.x 以上）
- 依存関係を再インストール: `npm ci`

### 環境変数エラー
- すべての必須環境変数が設定されているか確認
- 環境変数の値に特殊文字が含まれていないか確認

### OAuth エラー
- リダイレクト URI が正しく設定されているか確認
- NEXTAUTH_URL が本番環境の URL になっているか確認
- Google Cloud Console で OAuth クライアントが有効か確認

### PWA が動作しない
- HTTPS が有効か確認（本番環境）
- マニフェストとアイコンが正しくアクセスできるか確認
- Service Worker がブラウザでサポートされているか確認

## パフォーマンス最適化

### 推奨設定
- CDN を有効化
- 画像最適化を有効化
- キャッシュヘッダーを設定
- 圧縮を有効化（gzip/brotli）

### Vercel での最適化
- 自動的に最適化が適用される
- Edge Network 経由で配信
- 画像最適化が自動適用

## モニタリング

### Vercel Analytics（推奨）
- リアルタイムのパフォーマンス監視
- Core Web Vitals 追跡
- デプロイ履歴

### Google Analytics 4
- ユーザー行動分析
- カスタムイベント追跡
- コンバージョン測定

## バックアップとロールバック

### Vercel
- デプロイ履歴から過去のバージョンに即座にロールバック可能
- 自動的にデプロイメントが保存される

### Docker
- タグ付きイメージを保存
- 必要に応じて古いバージョンに戻す

## セキュリティ

### 推奨事項
- 環境変数を決してコミットしない
- NEXTAUTH_SECRET を定期的にローテーション
- HTTPS を強制
- セキュリティヘッダーを設定
- 依存関係を定期的に更新

### セキュリティヘッダー（next.config.js）

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ]
    }
  ]
}
```

## 継続的インテグレーション/デプロイメント（CI/CD）

GitHub Actions ワークフローが既に設定されています：
- Lighthouse CI: パフォーマンス測定
- Playwright: E2E テスト

これらは自動的に実行され、問題があれば通知されます。
