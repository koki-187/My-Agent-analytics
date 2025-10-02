import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { sendGAEvent } from './_app'
import DownloadPdfButton from '@/components/DownloadPdfButton'

export default function Home() {
  const { data: session } = useSession()
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'running' | 'completed'>('idle')
  const [analysisData, setAnalysisData] = useState<any>(null)

  useEffect(() => {
    // ページ読み込み時のイベント
    sendGAEvent('page_view', { page_title: 'Home' })
  }, [])

  const startAnalysis = async () => {
    setAnalysisStatus('running')
    sendGAEvent('analysis_started', { user: session?.user?.email })

    // ダミー分析処理（実際のAPIコールに置き換え）
    setTimeout(() => {
      const dummyData = {
        title: 'データ分析レポート',
        date: new Date().toLocaleDateString('ja-JP'),
        sections: [
          {
            title: '概要',
            content: 'このレポートは、エージェント分析システムによって生成されました。'
          },
          {
            title: '分析結果',
            content: '主要な指標と傾向が以下に示されています。'
          }
        ]
      }
      setAnalysisData(dummyData)
      setAnalysisStatus('completed')
      sendGAEvent('analysis_completed', { user: session?.user?.email })
    }, 2000)
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            My Agent Analytics
          </h1>
          <p className="text-center text-gray-600 mb-8">
            AIエージェントによるデータ分析プラットフォーム
          </p>
          <button
            onClick={() => signIn('google')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Googleでログイン
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Agent Analytics</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">こんにちは、{session.user?.name}さん</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">データ分析ダッシュボード</h2>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              エージェントを使用してデータ分析を開始します。完了後、PDFレポートとしてダウンロードできます。
            </p>

            {analysisStatus === 'idle' && (
              <button
                onClick={startAnalysis}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                分析を開始
              </button>
            )}

            {analysisStatus === 'running' && (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">分析中...</span>
              </div>
            )}

            {analysisStatus === 'completed' && analysisData && (
              <div id="report-content" className="mt-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{analysisData.title}</h3>
                  <p className="text-gray-600">作成日: {analysisData.date}</p>
                </div>

                {analysisData.sections.map((section: any, index: number) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{section.title}</h4>
                    <p className="text-gray-700">{section.content}</p>
                  </div>
                ))}

                <div className="mt-8 flex space-x-4">
                  <DownloadPdfButton elementId="report-content" filename={`report-${Date.now()}.pdf`} />
                  <button
                    onClick={() => {
                      setAnalysisStatus('idle')
                      setAnalysisData(null)
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                  >
                    新しい分析を開始
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">機能</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Google OAuth による安全な認証</li>
              <li>AIエージェントによる自動データ分析</li>
              <li>PDFレポート生成（日本語フォント対応）</li>
              <li>PWA対応（オフライン利用可能）</li>
              <li>Google Analytics 4 イベント追跡</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
