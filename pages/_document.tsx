import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta charSet="utf-8" />
        <meta name="application-name" content="My Agent Analytics" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Agent Analytics" />
        <meta name="description" content="エージェント分析ダッシュボード - PWA対応" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* PWA Meta Tags */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="384x384" href="/icons/icon-384.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My Agent Analytics" />
        <meta property="og:description" content="エージェント分析ダッシュボード - PWA対応でオフラインでも利用可能" />
        <meta property="og:site_name" content="My Agent Analytics" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Agent Analytics" />
        <meta name="twitter:description" content="エージェント分析ダッシュボード - PWA対応" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
