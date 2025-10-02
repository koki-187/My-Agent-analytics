import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';
import DownloadPdfButton from '@/components/DownloadPdfButton';
import * as gtag from '@/lib/gtag';

export default function Home() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    gtag.event({
      action: 'login_attempt',
      category: 'auth',
      label: 'Google OAuth',
    });
    signIn('google');
  };

  const handleSignOut = () => {
    gtag.event({
      action: 'logout',
      category: 'auth',
      label: 'User Logout',
    });
    signOut();
  };

  return (
    <>
      <Head>
        <title>My Agent Analytics - PWA Dashboard</title>
        <meta name="description" content="エージェント分析ダッシュボード - PWA対応でオフラインでも利用可能" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Agent Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              エージェント分析ダッシュボード - PWA対応
            </p>
          </header>

          {/* Authentication Status */}
          <div className="card mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  認証ステータス
                </h2>
                {status === 'loading' ? (
                  <p className="text-gray-600 dark:text-gray-300">読み込み中...</p>
                ) : session ? (
                  <div>
                    <p className="text-gray-700 dark:text-gray-200 mb-2">
                      ようこそ、{session.user?.name || session.user?.email}さん
                    </p>
                    {session.user?.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    ログインしていません
                  </p>
                )}
              </div>
              <div>
                {session ? (
                  <button onClick={handleSignOut} className="btn-secondary">
                    ログアウト
                  </button>
                ) : (
                  <button onClick={handleSignIn} className="btn-primary">
                    Googleでログイン
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                統計情報
              </h3>
              <div className="text-3xl font-bold text-primary-600">1,234</div>
              <p className="text-gray-600 dark:text-gray-300">総ユーザー数</p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                アクティブセッション
              </h3>
              <div className="text-3xl font-bold text-green-600">567</div>
              <p className="text-gray-600 dark:text-gray-300">現在のセッション</p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                エラー率
              </h3>
              <div className="text-3xl font-bold text-red-600">0.5%</div>
              <p className="text-gray-600 dark:text-gray-300">過去24時間</p>
            </div>
          </div>

          {/* PDF Export */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              レポート出力
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              現在のダッシュボードをPDFとしてエクスポートできます。
              日本語フォント（Noto Sans JP）が埋め込まれています。
            </p>
            <DownloadPdfButton />
          </div>

          {/* PWA Info */}
          <div className="card mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              PWA機能
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2">
              <li>オフラインで利用可能</li>
              <li>ホーム画面に追加可能</li>
              <li>プッシュ通知対応（準備中）</li>
              <li>高速な読み込み</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
