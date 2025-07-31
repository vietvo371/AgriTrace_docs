# 🚀 Quick Deploy Guide - AgriTrace Documentation

## 📋 Prerequisites
- Node.js 18+ installed
- Yarn package manager
- Git repository set up
- GitHub account

## ⚡ Quick Deploy Options

### Option 1: Automated Script (Recommended)
```bash
# Run the deployment script
./deploy.sh
```

### Option 2: Manual GitHub Pages
```bash
# 1. Build the documentation
yarn build

# 2. Deploy to GitHub Pages
yarn deploy

# 3. Your site will be available at:
# https://vietvo371.github.io/AgriTrace_docs/
```

### Option 3: Vercel (Fastest)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

### Option 4: Netlify
```bash
# 1. Build the project
yarn build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --dir=build --prod
```

## 🔧 Configuration

### GitHub Pages Setup
1. Go to your GitHub repository
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` (will be created automatically)
5. Folder: `/ (root)`

### Custom Domain (Optional)
1. Add CNAME file: `static/CNAME`
2. Content: `docs.agritrace.vn`
3. Configure DNS records

## 📊 Build Status
- ✅ Build successful
- ✅ All pages generated
- ✅ Multi-language support (EN/VI)
- ✅ API documentation included
- ✅ Search functionality ready

## 🌐 Live URLs
- **GitHub Pages**: https://vietvo371.github.io/AgriTrace_docs/
- **Custom Domain**: https://docs.agritrace.vn (when configured)

## 🚨 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
yarn cache clean
rm -rf node_modules
yarn install
yarn build
```

### Deployment Issues
```bash
# Check build output
ls -la build/

# Test locally
yarn serve
```

### Common Issues
- **Broken links**: Check `docusaurus.config.ts` configuration
- **MDX errors**: Fix syntax in markdown files
- **API routes**: Ensure `routeBasePath` is correct

## 📞 Support
- **Documentation**: Check `DEPLOYMENT_GUIDE.md` for detailed instructions
- **Issues**: Create GitHub issue
- **Team**: support@agritrace.vn

---

**Ready to deploy! Choose your preferred method above.** 🚀 