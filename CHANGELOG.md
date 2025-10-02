# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Next.js 14 with TypeScript setup
- PWA support with next-pwa
  - Service Worker for offline functionality
  - Manifest.json for installable app
  - PWA icons (180px, 192px, 384px, 512px)
  - Offline page
- PDF export functionality
  - html2canvas for page capture
  - jsPDF for PDF generation
  - Noto Sans JP font support for Japanese text
- Google OAuth authentication via NextAuth.js
- Google Analytics 4 integration
  - Page view tracking
  - Event tracking (login, logout, PDF download, errors)
- Tailwind CSS for styling
  - Responsive design (mobile, tablet, desktop)
  - Dark mode support
  - Custom utility classes
- Playwright E2E tests
  - Homepage tests
  - Authentication flow tests
  - PWA feature tests
  - Responsive design tests
  - Accessibility tests
- CI/CD workflows
  - Lighthouse CI for performance monitoring
  - Playwright E2E tests automation
- Comprehensive documentation
  - README.md with setup instructions
  - CONTRIBUTING.md with development guidelines
  - Environment variables documentation (.env.example)

### Infrastructure
- ESLint configuration for code quality
- TypeScript strict mode enabled
- Git ignore configuration for Next.js projects
- Package.json with all necessary dependencies

## [0.1.0] - 2024-10-02

### Initial Release
- Project structure setup
- Basic repository configuration
