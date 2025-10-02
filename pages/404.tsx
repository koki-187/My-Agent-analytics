import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - ページが見つかりません | My Agent Analytics</title>
        <meta name="description" content="お探しのページが見つかりませんでした" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="card max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary-600 mb-2">404</div>
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ページが見つかりません
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
          
          <Link href="/" className="btn-primary inline-block">
            ホームに戻る
          </Link>
        </div>
      </main>
    </>
  );
}
