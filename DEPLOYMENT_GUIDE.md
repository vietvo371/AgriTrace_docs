# AgriTrace Documentation Deployment Guide

## 🚀 Deployment Options

### 1. GitHub Pages (Recommended)

#### Setup GitHub Pages
```bash
# 1. Push code to GitHub
git add .
git commit -m "feat: complete AgriTrace documentation"
git push origin main

# 2. Configure GitHub Pages
# Go to Settings > Pages > Source: Deploy from a branch
# Select: main branch, / (root) folder

# 3. Build and deploy
yarn build
yarn deploy
```

#### GitHub Actions (Automated)
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'yarn'
    
    - name: Install dependencies
      run: yarn install
    
    - name: Build
      run: yarn build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

### 2. Vercel (Fast & Easy)

#### Manual Deployment
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Follow prompts:
# - Project name: agritrace-docs
# - Build command: yarn build
# - Output directory: build
# - Install command: yarn install
```

#### Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "yarn build",
  "outputDirectory": "build",
  "installCommand": "yarn install",
  "framework": "docusaurus"
}
```

### 3. Netlify (Popular Choice)

#### Manual Deployment
```bash
# 1. Build the project
yarn build

# 2. Drag and drop build folder to Netlify
# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --dir=build --prod
```

#### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 4. AWS S3 + CloudFront

#### Setup AWS
```bash
# 1. Install AWS CLI
pip install awscli

# 2. Configure AWS
aws configure

# 3. Create S3 bucket
aws s3 mb s3://agritrace-docs

# 4. Build and upload
yarn build
aws s3 sync build/ s3://agritrace-docs --delete

# 5. Configure CloudFront for CDN
```

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All MDX syntax errors fixed
- [ ] No broken links
- [ ] Images optimized
- [ ] Meta tags updated
- [ ] SEO optimized

### ✅ Configuration
- [ ] `docusaurus.config.ts` updated
- [ ] `baseUrl` set correctly
- [ ] `projectName` configured
- [ ] Analytics enabled (if needed)
- [ ] Custom domain configured (if needed)

### ✅ Testing
- [ ] Local build successful: `yarn build`
- [ ] Local serve works: `yarn serve`
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] Search functionality works

## 🔧 Build Commands

### Development
```bash
# Start development server
yarn start

# Build for production
yarn build

# Serve production build
yarn serve
```

### Production Build
```bash
# Clean build
yarn clean
yarn build

# Check build output
ls -la build/

# Test build locally
yarn serve
```

## 🌐 Domain Configuration

### Custom Domain Setup
```bash
# 1. Add custom domain to docusaurus.config.ts
const config = {
  url: 'https://docs.agritrace.vn',
  baseUrl: '/',
  // ... other config
}

# 2. Create CNAME file in static/
echo "docs.agritrace.vn" > static/CNAME

# 3. Configure DNS
# Add CNAME record: docs.agritrace.vn -> your-deployment-url
```

### SSL Certificate
- **GitHub Pages**: Automatic SSL
- **Vercel**: Automatic SSL
- **Netlify**: Automatic SSL
- **AWS**: Configure in CloudFront

## 📊 Analytics & Monitoring

### Google Analytics
```typescript
// docusaurus.config.ts
const config = {
  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'G-XXXXXXXXXX',
      },
    ],
  ],
}
```

### Search Engine
```typescript
// docusaurus.config.ts
const config = {
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'vi'],
      },
    ],
  ],
}
```

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache
yarn cache clean
rm -rf node_modules
yarn install

# Rebuild
yarn build
```

#### MDX Errors
```bash
# Check for syntax errors
yarn start

# Fix common issues:
# - Remove < > characters in tables
# - Replace Mermaid diagrams with tables
# - Check for unclosed tags
```

#### Deployment Issues
```bash
# Check build output
yarn build
ls -la build/

# Test locally
yarn serve

# Check logs
# - GitHub Actions logs
# - Vercel deployment logs
# - Netlify build logs
```

## 📈 Performance Optimization

### Build Optimization
```bash
# Enable compression
yarn add compression-webpack-plugin

# Optimize images
yarn add imagemin-webpack-plugin

# Enable caching
# Configure in docusaurus.config.ts
```

### CDN Configuration
- **GitHub Pages**: Global CDN included
- **Vercel**: Edge network
- **Netlify**: Global CDN
- **AWS CloudFront**: Custom CDN setup

## 🔄 Continuous Deployment

### GitHub Actions Workflow
```yaml
name: Deploy Documentation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'yarn'
    - run: yarn install
    - run: yarn build
    - run: yarn serve &
    - run: sleep 10
    - run: curl -f http://localhost:3000

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'yarn'
    - run: yarn install
    - run: yarn build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## 📞 Support

### Deployment Help
- **GitHub Pages**: [Documentation](https://pages.github.com/)
- **Vercel**: [Documentation](https://vercel.com/docs)
- **Netlify**: [Documentation](https://docs.netlify.com/)
- **AWS**: [S3 Documentation](https://docs.aws.amazon.com/s3/)

### AgriTrace Team
- **Email**: support@agritrace.vn
- **GitHub**: https://github.com/vietvo371/AgriTrace
- **Documentation**: https://docs.agritrace.vn

---

**Ready to deploy! Choose your preferred platform and follow the steps above.** 🚀 