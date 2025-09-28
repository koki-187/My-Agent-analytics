# 初回Gitセットアップ＆GitHubプッシュ自動化スクリプト
# プロジェクトルート：このスクリプトの親ディレクトリ
# リポジトリ：https://github.com/koki-187/My-Agent-analytics.git

$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/koki-187/My-Agent-analytics.git"
$branchName = "main"
$workDir = Resolve-Path "$PSScriptRoot\.."

# Gitインストール確認
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "エラー: Gitがインストールされていません。 https://git-scm.com/downloads からインストールしてください。" -ForegroundColor Red
    exit 1
}

Set-Location $workDir

# .git初期化
if (-not (Test-Path ".git")) {
    Write-Host "リポジトリを初期化します。"
    git init
}

# 既定ブランチをmainに統一
git branch | Select-String -Pattern "main" -Quiet | Out-Null
if ($LASTEXITCODE -ne 0) {
    git branch -M $branchName
}

# .gitignore生成
if (-not (Test-Path ".gitignore")) {
    Write-Host ".gitignoreが無いため新規作成します。"
    @"
# Node/Next.js向け標準
node_modules/
.next/
.env
.env.local
.env.production
.env.development
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.log
coverage/
out/
dist/
build/
*.tsbuildinfo
*.swp
.idea/
.vscode/
*.sublime-workspace
*.sublime-project
*.pid
*.seed
*.tgz
public/static/
public/icons/
"@ | Set-Content ".gitignore" -Encoding UTF8
}

# origin設定
$originSet = git remote | Select-String -Pattern "^origin$" -Quiet
if (-not $originSet) {
    Write-Host "originリモートを追加します。"
    git remote add origin $repoUrl
} else {
    Write-Host "originリモートは既に設定済みです。スキップします。"
}

# 変更確認＆コミット
$changes = git status --porcelain
if ($changes) {
    git add .
    git commit -m "chore: initial import"
    Write-Host "コミットしました。"
} else {
    Write-Host "コミット対象がありません。終了します。"
    exit 0
}

# プッシュ
Write-Host "GitHubへ初回プッシュします。"
git push -u origin $branchName

Write-Host "完了しました！"