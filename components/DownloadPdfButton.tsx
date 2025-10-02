import { useState } from 'react'
import { generatePdfFromElement } from '@/lib/pdfGenerator'
import { sendGAEvent } from '@/pages/_app'

interface DownloadPdfButtonProps {
  elementId: string
  filename?: string
  orientation?: 'portrait' | 'landscape'
  className?: string
}

export default function DownloadPdfButton({
  elementId,
  filename = 'report.pdf',
  orientation = 'portrait',
  className = '',
}: DownloadPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    try {
      setIsGenerating(true)
      sendGAEvent('pdf_generation_started', { filename })

      await generatePdfFromElement(elementId, {
        filename,
        orientation,
        format: 'a4',
      })

      sendGAEvent('pdf_generation_completed', { filename })
    } catch (error) {
      console.error('PDF generation error:', error)
      sendGAEvent('pdf_generation_error', {
        filename,
        error: (error as Error).message,
      })
      alert('PDF生成中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`
        bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg
        transition duration-200 ease-in-out transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center space-x-2
        ${className}
      `}
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>PDF生成中...</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>PDFをダウンロード</span>
        </>
      )}
    </button>
  )
}
