#!/bin/bash

# AgriTrace Documentation Deployment Script
echo "🚀 Starting AgriTrace Documentation Deployment..."

# Check if we're in the right directory
if [ ! -f "docusaurus.config.ts" ]; then
    echo "❌ Error: Not in AgriTrace documentation directory"
    exit 1
fi

# Build the documentation
echo "📦 Building documentation..."
yarn build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if we want to deploy
read -p "Do you want to deploy to GitHub Pages? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to GitHub Pages..."
    yarn deploy
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployment successful!"
        echo "🌐 Your documentation is now live at: https://vietvo371.github.io/AgriTrace_docs/"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "📁 Build files are ready in the 'build' directory"
    echo "You can manually deploy them to your preferred platform"
fi

echo "🎉 Deployment process completed!" 