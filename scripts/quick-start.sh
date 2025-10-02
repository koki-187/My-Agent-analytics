#!/bin/bash

# Quick Start Script for My Agent Analytics
# This script helps set up the development environment quickly

set -e

echo "🚀 My Agent Analytics - Quick Start Setup"
echo "=========================================="
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "⚠️  .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your actual credentials:"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - GOOGLE_CLIENT_ID"
    echo "   - GOOGLE_CLIENT_SECRET"
    echo "   - NEXT_PUBLIC_GA_ID (optional)"
    echo ""
else
    echo "✅ .env.local already exists"
fi

# Check for font file
echo ""
if [ ! -f public/fonts/NotoSansJP-Regular.ttf ]; then
    echo "⚠️  Noto Sans JP font not found. PDF export will use default font."
    echo "   To add Japanese font support, run:"
    echo "   cd public/fonts"
    echo "   curl -L \"https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf\" -o NotoSansJP-Regular.ttf"
    echo ""
else
    echo "✅ Noto Sans JP font found"
fi

# Run build to verify everything works
echo ""
echo "🔨 Building application to verify setup..."
npm run build

echo ""
echo "=========================================="
echo "✨ Setup complete! You can now:"
echo ""
echo "  npm run dev     # Start development server (http://localhost:3000)"
echo "  npm run build   # Build for production"
echo "  npm run start   # Start production server"
echo "  npm run lint    # Run ESLint"
echo "  npm run test:e2e # Run E2E tests (requires build)"
echo ""
echo "📚 See README.md for detailed documentation"
echo "=========================================="
