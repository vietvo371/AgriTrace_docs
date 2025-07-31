#!/bin/bash

# AgriTrace Documentation Setup Script
# This script helps you set up the AgriTrace documentation locally

echo "🌾 Welcome to AgriTrace Documentation Setup!"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to v18 or higher."
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Check if yarn is available, prefer yarn over npm
if command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
    echo "✅ Yarn detected - using Yarn for package management"
elif command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
    echo "⚠️  Yarn not found, using NPM instead"
    echo "   Consider installing Yarn: npm install -g yarn"
else
    echo "❌ Neither yarn nor npm is installed. Please install one of them."
    echo "   Recommended: npm install -g yarn"
    exit 1
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies with $PACKAGE_MANAGER..."
$PACKAGE_MANAGER install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create necessary directories if they don't exist
echo ""
echo "📁 Creating necessary directories..."
mkdir -p api
mkdir -p docs/Guides
mkdir -p static/img

echo "✅ Directories created"

# Check if configuration files exist
echo ""
echo "🔧 Checking configuration files..."

if [ ! -f "docusaurus.config.ts" ]; then
    echo "❌ docusaurus.config.ts not found"
    exit 1
fi

if [ ! -f "sidebars.ts" ]; then
    echo "❌ sidebars.ts not found"
    exit 1
fi

echo "✅ Configuration files found"

# Start the development server
echo ""
echo "🚀 Starting development server with $PACKAGE_MANAGER..."
echo "   The documentation will be available at: http://localhost:3000"
echo "   Press Ctrl+C to stop the server"
echo ""

$PACKAGE_MANAGER start 