import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Noto Sans JP フォントをPDFに埋め込むための設定
// 注意: 実際の運用では、フォントファイルを public/fonts/ に配置し、
// jsPDFのaddFontメソッドを使用してフォントを埋め込む必要があります

export interface PdfOptions {
  filename?: string
  orientation?: 'portrait' | 'landscape'
  format?: 'a4' | 'letter'
  quality?: number
}

export async function generatePdfFromElement(
  elementId: string,
  options: PdfOptions = {}
): Promise<void> {
  const {
    filename = 'document.pdf',
    orientation = 'portrait',
    format = 'a4',
    quality = 0.95,
  } = options

  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`)
    }

    // html2canvasでHTML要素をキャプチャ
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    const imgData = canvas.toDataURL('image/png', quality)
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    // PDFサイズの計算
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: format === 'a4' ? [595.28, 841.89] : [612, 792],
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // 画像のアスペクト比を維持しながらPDFに収まるようにスケーリング
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const scaledWidth = imgWidth * ratio
    const scaledHeight = imgHeight * ratio

    // 複数ページに分割が必要な場合の処理
    let heightLeft = scaledHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, scaledWidth, scaledHeight)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - scaledHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, scaledWidth, scaledHeight)
      heightLeft -= pdfHeight
    }

    // PDFのダウンロード
    pdf.save(filename)

    // GA4イベント送信（グローバルスコープのsendGAEventを使用）
    if (typeof window !== 'undefined' && (window as any).sendGAEvent) {
      (window as any).sendGAEvent('pdf_downloaded', {
        filename,
        format,
        orientation,
      })
    }
  } catch (error) {
    console.error('PDF generation failed:', error)
    throw error
  }
}

// 将来的な拡張: Noto Sans JPフォントの埋め込み
// 以下のようにフォントファイルを追加する必要があります:
// 1. public/fonts/NotoSansJP-Regular.ttf を配置
// 2. base64エンコードされたフォントデータを取得
// 3. pdf.addFileToVFS と pdf.addFont を使用してフォントを追加
// 
// 例:
// import notoSansJPFont from '../public/fonts/NotoSansJP-Regular.ttf'
// pdf.addFileToVFS('NotoSansJP-Regular.ttf', notoSansJPFont)
// pdf.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal')
// pdf.setFont('NotoSansJP')
