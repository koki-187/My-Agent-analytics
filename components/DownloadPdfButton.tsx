import { useState } from 'react';
import { generatePdf } from './pdfGenerator';
import * as gtag from '@/lib/gtag';

export default function DownloadPdfButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      gtag.event({
        action: 'pdf_download_start',
        category: 'export',
        label: 'Dashboard PDF',
      });

      await generatePdf({
        filename: `analytics-report-${new Date().toISOString().split('T')[0]}.pdf`,
      });

      gtag.event({
        action: 'pdf_download_success',
        category: 'export',
        label: 'Dashboard PDF',
      });

      alert('PDFのダウンロードが完了しました！');
    } catch (error) {
      console.error('PDF生成エラー:', error);
      
      gtag.event({
        action: 'pdf_download_error',
        category: 'export',
        label: error instanceof Error ? error.message : 'Unknown error',
      });

      alert('PDFの生成に失敗しました。もう一度お試しください。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`btn-primary ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isGenerating ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          PDF生成中...
        </span>
      ) : (
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          PDFダウンロード
        </span>
      )}
    </button>
  );
}
