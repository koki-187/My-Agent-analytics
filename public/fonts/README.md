# Fonts Directory

## Noto Sans JP Font

このディレクトリには、PDF出力時に日本語を正しく表示するためのフォントファイルが必要です。

### 必要なファイル
- `NotoSansJP-Regular.ttf` - Noto Sans JP レギュラーウェイト

### フォントのダウンロード方法

1. **Google Fontsから直接ダウンロード:**
   - https://fonts.google.com/noto/specimen/Noto+Sans+JP
   - "Download family" ボタンをクリック
   - ZIPファイルを解凍し、`NotoSansJP-Regular.ttf` をこのディレクトリに配置

2. **Google Fonts GitHubリポジトリから:**
   ```bash
   curl -L "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf" -o NotoSansJP-Regular.ttf
   ```

3. **npm経由でインストール:**
   ```bash
   npm install @fontsource/noto-sans-jp
   # インストール後、node_modules/@fontsource/noto-sans-jp/files/ から .ttf ファイルをコピー
   ```

### 注意事項
- フォントファイルはライセンスに基づき使用してください（Noto Sans JPはSIL Open Font Licenseです）
- フォントファイルは約2-4MBのサイズがあります
- .gitignoreに含まれていないことを確認してください（通常、フォントファイルはリポジトリに含めます）

### ライセンス
Noto Sans JP: SIL Open Font License 1.1
詳細: https://scripts.sil.org/OFL
