import { test, expect } from '@playwright/test';

/**
 * E2E Tests for My Agent Analytics
 * 主要な機能とユーザーフローをテスト
 */

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // ページタイトルの確認
    await expect(page).toHaveTitle(/My Agent Analytics/);
    
    // メインヘッダーの表示確認
    const heading = page.locator('h1');
    await expect(heading).toContainText('My Agent Analytics');
  });

  test('should display authentication section', async ({ page }) => {
    await page.goto('/');
    
    // 認証ステータスセクションの確認
    const authSection = page.locator('text=認証ステータス');
    await expect(authSection).toBeVisible();
  });

  test('should display dashboard cards', async ({ page }) => {
    await page.goto('/');
    
    // 統計情報カードの確認
    await expect(page.locator('text=統計情報')).toBeVisible();
    await expect(page.locator('text=アクティブセッション')).toBeVisible();
    await expect(page.locator('text=エラー率')).toBeVisible();
  });

  test('should display PDF export section', async ({ page }) => {
    await page.goto('/');
    
    // レポート出力セクションの確認
    await expect(page.locator('text=レポート出力')).toBeVisible();
    
    // PDFダウンロードボタンの確認
    const downloadButton = page.locator('button:has-text("PDFダウンロード")');
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toBeEnabled();
  });

  test('should display PWA information', async ({ page }) => {
    await page.goto('/');
    
    // PWA機能セクションの確認
    await expect(page.locator('text=PWA機能')).toBeVisible();
    await expect(page.locator('text=オフラインで利用可能')).toBeVisible();
  });
});

test.describe('Authentication Flow', () => {
  test('should show login button when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    // ログインボタンの確認
    const loginButton = page.locator('button:has-text("Googleでログイン")');
    await expect(loginButton).toBeVisible();
  });

  test('should have correct auth provider setup', async ({ page }) => {
    // NextAuth.jsのエンドポイントが正しく設定されているか確認
    const response = await page.goto('/api/auth/providers');
    expect(response?.status()).toBe(200);
    
    const providers = await response?.json();
    expect(providers).toBeTruthy();
  });
});

test.describe('PWA Features', () => {
  test('should have manifest.json', async ({ page }) => {
    const response = await page.goto('/manifest.json');
    expect(response?.status()).toBe(200);
    
    const manifest = await response?.json();
    expect(manifest.name).toBe('My Agent Analytics');
    expect(manifest.short_name).toBe('AgentAnalytics');
  });

  test('should have PWA icons', async ({ page }) => {
    // アイコンファイルの存在確認
    const icons = [
      '/icons/icon-192.png',
      '/icons/icon-384.png',
      '/icons/icon-512.png',
      '/icons/icon-180.png',
    ];

    for (const icon of icons) {
      const response = await page.goto(icon);
      expect(response?.status()).toBe(200);
    }
  });

  test('should load offline page', async ({ page }) => {
    await page.goto('/offline');
    
    await expect(page.locator('h1')).toContainText('オフライン');
    await expect(page.locator('text=インターネット接続がありません')).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // モバイルビューでもコンテンツが表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=統計情報')).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // タブレットビューでもコンテンツが表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=統計情報')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    const h2 = page.locator('h2');
    await expect(h2.first()).toBeVisible();
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    
    // ユーザーがログインしている場合のプロフィール画像をチェック
    // （実際の認証は不要なので、要素の存在のみ確認）
    const images = page.locator('img');
    const count = await images.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });
});

test.describe('Performance', () => {
  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // 5秒以内に読み込まれることを確認
    expect(loadTime).toBeLessThan(5000);
  });
});
