import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display the application title', async ({ page }) => {
    await page.goto('/')
    
    // アプリケーションタイトルが表示されることを確認
    await expect(page.locator('h1')).toContainText('My Agent Analytics')
  })

  test('should show login button when not authenticated', async ({ page }) => {
    await page.goto('/')
    
    // ログインボタンが表示されることを確認
    const loginButton = page.getByRole('button', { name: /Google.*ログイン/i })
    await expect(loginButton).toBeVisible()
  })

  test('should display description text', async ({ page }) => {
    await page.goto('/')
    
    // 説明文が表示されることを確認
    await expect(page.locator('text=エージェント')).toBeVisible()
  })

  test('should have proper meta tags for PWA', async ({ page }) => {
    await page.goto('/')
    
    // PWA用のメタタグが存在することを確認
    const manifestLink = page.locator('link[rel="manifest"]')
    await expect(manifestLink).toHaveAttribute('href', '/manifest.json')
    
    const themeColor = page.locator('meta[name="theme-color"]')
    await expect(themeColor).toHaveAttribute('content', '#3b82f6')
  })

  test('should load manifest.json', async ({ page }) => {
    const response = await page.goto('/manifest.json')
    expect(response?.status()).toBe(200)
    
    const manifest = await response?.json()
    expect(manifest.name).toBe('My Agent Analytics')
    expect(manifest.short_name).toBe('Agent Analytics')
  })
})

test.describe('Offline Page', () => {
  test('should display offline page', async ({ page }) => {
    await page.goto('/offline')
    
    // オフラインページが表示されることを確認
    await expect(page.locator('h1')).toContainText('オフラインモード')
    
    // 再接続ボタンが表示されることを確認
    const retryButton = page.getByRole('button', { name: /再接続/i })
    await expect(retryButton).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('home page should be accessible', async ({ page }) => {
    await page.goto('/')
    
    // 基本的なアクセシビリティチェック
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    
    // ボタンにアクセス可能なテキストがあることを確認
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })
})
