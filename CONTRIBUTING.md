# Contributing to My Agent Analytics

このプロジェクトへの貢献に興味を持っていただき、ありがとうございます！

## 開発環境のセットアップ

1. リポジトリをフォーク
2. フォークをクローン
3. 依存関係をインストール: `npm install`
4. `.env.example` をコピーして `.env` を作成し、必要な環境変数を設定
5. 開発サーバーを起動: `npm run dev`

## 開発ワークフロー

1. 新しいブランチを作成: `git checkout -b feature/your-feature-name`
2. 変更を加える
3. コードをフォーマット: `npm run lint`
4. ビルドをテスト: `npm run build`
5. テストを実行: `npm test`
6. 変更をコミット: `git commit -m "描述的なコミットメッセージ"`
7. プッシュ: `git push origin feature/your-feature-name`
8. プルリクエストを作成

## コーディング規約

- TypeScript を使用
- ESLint の警告に従う
- 意味のある変数名とコメント（必要な場合）
- Tailwind CSS でスタイリング
- コンポーネントは `components/` ディレクトリに配置
- ユーティリティ関数は `lib/` ディレクトリに配置

## コミットメッセージ

コミットメッセージは以下の形式に従ってください：

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント変更
- `style:` コードスタイル変更（機能に影響しない）
- `refactor:` リファクタリング
- `test:` テスト追加・修正
- `chore:` ビルドプロセスやツール変更

例: `feat: add user profile page`

## プルリクエストのガイドライン

- 明確な説明とタイトル
- 関連する issue にリンク
- スクリーンショット（UI変更の場合）
- テストが通ることを確認
- コードレビューに対応

## 質問やヘルプ

質問がある場合は、GitHub の Issue を作成してください。

ありがとうございます！
