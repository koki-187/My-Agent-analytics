import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// GA4イベント送信関数
export const sendGAEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // GA4初期化
    const gaId = process.env.NEXT_PUBLIC_GA_ID
    if (gaId) {
      const script1 = document.createElement('script')
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      script1.async = true
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `
      document.head.appendChild(script2)
    }

    // PWAインストールイベント
    let deferredPrompt: any
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      sendGAEvent('pwa_install_prompt_shown')
    })

    window.addEventListener('appinstalled', () => {
      sendGAEvent('pwa_installed')
      deferredPrompt = null
    })

    // ルート変更イベント
    const handleRouteChange = (url: string) => {
      if ((window as any).gtag) {
        (window as any).gtag('config', gaId, {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="description" content="エージェント分析ツール - AI エージェントによるデータ分析と可視化" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <title>My Agent Analytics</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
