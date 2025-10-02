# コントリビューションガイド

My Agent Analyticsへの貢献に興味を持っていただき、ありがとうございます！

## 開発環境のセットアップ

1. リポジトリをフォーク
2. フォークをクローン
```bash
git clone https://github.com/YOUR_USERNAME/My-Agent-analytics.git
cd My-Agent-analytics
```

3. 依存関係をインストール
```bash
npm install
```

4. 環境変数を設定
```bash
cp .env.example .env.local
# .env.localを編集して必要な環境変数を設定
```

5. 開発サーバーを起動
```bash
npm run dev
```

## ブランチ戦略

- `main`: 本番環境用の安定版
- `develop`: 開発中の機能を統合するブランチ
- `feature/*`: 新機能開発用
- `fix/*`: バグ修正用
- `docs/*`: ドキュメント更新用

## プルリクエストの流れ

1. **Issue を確認/作成**
   - 既存のIssueがあるか確認
   - なければ新しいIssueを作成して議論

2. **ブランチを作成**
```bash
git checkout -b feature/your-feature-name
```

3. **コードを書く**
   - 既存のコーディングスタイルに従う
   - TypeScript の型定義を適切に使用
   - コメントは日本語または英語で記述

4. **テストを実行**
```bash
npm run lint
npm run build
npm run test:e2e
```

5. **コミット**
```bash
git add .
git commit -m "feat: Add new feature description"
```

コミットメッセージの規約：
- `feat:` - 新機能
- `fix:` - バグ修正
- `docs:` - ドキュメント更新
- `style:` - コードスタイルの変更（機能に影響なし）
- `refactor:` - リファクタリング
- `test:` - テストの追加・修正
- `chore:` - ビルドプロセスやツールの変更

6. **プッシュ**
```bash
git push origin feature/your-feature-name
```

7. **プルリクエストを作成**
   - GitHubでプルリクエストを開く
   - テンプレートに従って記入
   - レビュワーを指定

## コーディング規約

### TypeScript
- 厳格な型チェックを使用（`strict: true`）
- `any` の使用は最小限に
- インターフェースと型エイリアスを適切に使用

### React/Next.js
- 関数コンポーネントを使用
- Hooks を適切に使用
- ページコンポーネントは `pages/` ディレクトリに
- 再利用可能なコンポーネントは `components/` ディレクトリに

### スタイリング
- Tailwind CSS のユーティリティクラスを使用
- カスタムクラスは `styles/globals.css` に定義
- レスポンシブデザインを考慮（モバイルファースト）

### ファイル命名規則
- コンポーネント: `PascalCase.tsx`
- ユーティリティ: `camelCase.ts`
- ページ: `kebab-case.tsx` または `index.tsx`
- 定数: `UPPER_SNAKE_CASE`

## テスト

### E2Eテスト（Playwright）
```bash
# 全テスト実行
npm run test:e2e

# 特定のテストのみ
npx playwright test tests/specific-test.spec.ts

# UIモード
npx playwright test --ui

# デバッグモード
npx playwright test --debug
```

### テスト作成のガイドライン
- ユーザーの視点でテストを書く
- 主要なユーザーフローをカバー
- エッジケースも考慮
- テストは独立して実行可能に

## ドキュメント

- README.md は日本語で記述
- コードコメントは英語または日本語
- 複雑なロジックには必ずコメントを付ける
- 新機能には使用方法を README.md に追加

## レビュープロセス

1. CI/CDチェックがすべてパス
2. 最低1人のレビュワーの承認
3. コンフリクトの解消
4. mainブランチへマージ

## リリースプロセス

1. `develop` ブランチで機能をテスト
2. バージョン番号を更新（セマンティックバージョニング）
3. CHANGELOGを更新
4. `main` ブランチへマージ
5. GitHubでリリースを作成
6. デプロイ

## 質問・サポート

- GitHub Issues で質問を投稿
- Discussion で一般的な議論
- 緊急の場合はメンテナーに直接連絡

## 行動規範

- 敬意を持った対応
- 建設的なフィードバック
- 多様性の尊重
- ハラスメントの禁止

## ライセンス

このプロジェクトに貢献することで、あなたのコントリビューションが MIT ライセンスの下で配布されることに同意したものとみなされます。

---

貢献していただき、ありがとうございます！ 🎉
