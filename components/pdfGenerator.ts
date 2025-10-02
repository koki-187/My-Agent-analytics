import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * PDF生成ユーティリティ
 * html2canvasとjsPDFを使用してページをPDF化
 * Noto Sans JPフォントを埋め込み、日本語表示に対応
 */

// Base64エンコードされたNoto Sans JPフォントを読み込む関数
async function loadNotoSansJPFont(): Promise<string> {
  try {
    const response = await fetch('/fonts/NotoSansJP-Regular.ttf');
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8Array.byteLength; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
  } catch (error) {
    console.error('フォントの読み込みに失敗しました:', error);
    return '';
  }
}

interface GeneratePdfOptions {
  filename?: string;
  elementId?: string;
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'letter';
}

export async function generatePdf(options: GeneratePdfOptions = {}) {
  const {
    filename = 'my-agent-analytics.pdf',
    elementId = 'pdf-content',
    orientation = 'portrait',
    format = 'a4',
  } = options;

  try {
    // PDFに変換する要素を取得
    const element = elementId === 'pdf-content' 
      ? document.body 
      : document.getElementById(elementId);

    if (!element) {
      throw new Error(`要素が見つかりません: ${elementId}`);
    }

    // html2canvasでキャプチャ
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    
    // PDFドキュメントを作成
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    // Noto Sans JPフォントを埋め込み
    const fontBase64 = await loadNotoSansJPFont();
    if (fontBase64) {
      try {
        pdf.addFileToVFS('NotoSansJP-Regular.ttf', fontBase64);
        pdf.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');
        pdf.setFont('NotoSansJP');
      } catch (fontError) {
        console.warn('フォントの埋め込みに失敗しました。デフォルトフォントを使用します。', fontError);
      }
    }

    // ページサイズの計算
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
    const imgWidth = canvasWidth * ratio;
    const imgHeight = canvasHeight * ratio;

    // 複数ページに分割
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // PDFを保存
    pdf.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error('PDF生成エラー:', error);
    throw error;
  }
}

export default generatePdf;
