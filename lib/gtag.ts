/**
 * Google Analytics 4 (GA4) tracking utilities
 * 主要なイベントトラッキングとページビュー計測を提供
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (!GA_TRACKING_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// 主要なイベントトラッキング関数

export const trackLogin = (method: string) => {
  event({
    action: 'login',
    category: 'auth',
    label: method,
  });
};

export const trackLogout = () => {
  event({
    action: 'logout',
    category: 'auth',
    label: 'user_logout',
  });
};

export const trackPdfDownload = (reportType: string) => {
  event({
    action: 'download',
    category: 'export',
    label: `pdf_${reportType}`,
  });
};

export const trackError = (errorType: string, errorMessage: string) => {
  event({
    action: 'error',
    category: 'error',
    label: `${errorType}: ${errorMessage}`,
  });
};

export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
  });
};

export const trackShare = (method: string, contentType: string) => {
  event({
    action: 'share',
    category: 'engagement',
    label: `${method}_${contentType}`,
  });
};

// TypeScript type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export default {
  GA_TRACKING_ID,
  pageview,
  event,
  trackLogin,
  trackLogout,
  trackPdfDownload,
  trackError,
  trackSearch,
  trackShare,
};
