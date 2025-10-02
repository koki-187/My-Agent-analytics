import Head from 'next/head';
import Link from 'next/link';

export default function Offline() {
  return (
    <>
      <Head>
        <title>オフライン - My Agent Analytics</title>
        <meta name="description" content="現在オフラインです" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="card max-w-md text-center">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            オフライン
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            現在、インターネット接続がありません。
            <br />
            キャッシュされたデータを表示しています。
          </p>
          
          <Link href="/" className="btn-primary inline-block">
            ホームに戻る
          </Link>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>接続が復旧したら、自動的に同期されます。</p>
          </div>
        </div>
      </main>
    </>
  );
}
