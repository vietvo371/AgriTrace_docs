---
id: Deployment
title: Deployment Guide
sidebar_label: 🚀 Deployment Guide
---

# AgriTrace Deployment Guide

This guide covers the complete deployment process for AgriTrace, including mobile app deployment, backend server setup, and production environment configuration.

## 📱 Mobile App Deployment

### React Native App Store Deployment

#### iOS App Store Deployment

1. **Prepare iOS Build**

```bash
# Navigate to project directory
cd agritrace-mobile

# Install dependencies
npm install

# Install iOS dependencies
cd ios && pod install && cd ..

# Build for production
npx react-native run-ios --configuration Release
```

2. **Configure App Store Connect**

```json
// ios/AgriTrace/Info.plist
{
  "CFBundleDisplayName": "AgriTrace",
  "CFBundleIdentifier": "com.agritrace.mobile",
  "CFBundleVersion": "1.0.0",
  "CFBundleShortVersionString": "1.0.0",
  "NSLocationWhenInUseUsageDescription": "AgriTrace needs location access to record farm coordinates",
  "NSCameraUsageDescription": "AgriTrace needs camera access to scan QR codes and take product photos"
}
```

3. **Archive and Upload**

```bash
# Open Xcode
open ios/AgriTrace.xcworkspace

# Select Generic iOS Device
# Product > Archive
# Upload to App Store Connect
```

#### Android Google Play Deployment

1. **Prepare Android Build**

```bash
# Generate keystore for signing
keytool -genkey -v -keystore agritrace-release-key.keystore -alias agritrace-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Configure gradle.properties
echo "MYAPP_RELEASE_STORE_FILE=agritrace-release-key.keystore" >> android/gradle.properties
echo "MYAPP_RELEASE_KEY_ALIAS=agritrace-key-alias" >> android/gradle.properties
echo "MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password" >> android/gradle.properties
echo "MYAPP_RELEASE_KEY_PASSWORD=your_key_password" >> android/gradle.properties
```

2. **Build Release APK**

```bash
# Generate release APK
cd android
./gradlew assembleRelease

# Generate AAB for Play Store
./gradlew bundleRelease
```

3. **Upload to Google Play Console**

```bash
# Upload AAB file to Google Play Console
# Follow Google Play Console setup instructions
```

### Environment Configuration

#### Development Environment

```javascript
// .env.development
API_BASE_URL=http://localhost:3000/api
ENVIRONMENT=development
DEBUG=true
```

#### Production Environment

```javascript
// .env.production
API_BASE_URL=https://api.agritrace.vn/api
ENVIRONMENT=production
DEBUG=false
```

## 🖥️ Backend Deployment

### Node.js/Express Server Deployment

#### Heroku Deployment

1. **Prepare for Heroku**

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Create app.json
cat > app.json << EOF
{
  "name": "agritrace-backend",
  "description": "AgriTrace Backend API",
  "repository": "https://github.com/vietvo371/AgriTrace",
  "keywords": ["node", "express", "agriculture", "traceability"],
  "env": {
    "NODE_ENV": "production",
    "DATABASE_URL": {
      "description": "PostgreSQL database URL",
      "required": true
    },
    "JWT_SECRET": {
      "description": "JWT secret key",
      "required": true,
      "generator": "secret"
    }
  },
  "addons": [
    "heroku-postgresql:hobby-dev"
  ]
}
EOF
```

2. **Deploy to Heroku**

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create agritrace-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret_here

# Deploy
git push heroku main
```

#### Vercel Deployment

1. **Configure Vercel**

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

2. **Deploy to Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Database Deployment

#### PostgreSQL Setup

1. **Local Development Database**

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb agritrace_dev

# Create user
sudo -u postgres createuser agritrace_user

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE agritrace_dev TO agritrace_user;"
```

2. **Production Database (AWS RDS)**

```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier agritrace-prod \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username agritrace_admin \
  --master-user-password your_password \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxxx
```

3. **Database Migration**

```javascript
// migrations/001_initial_schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'farmer',
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE batches (
  id SERIAL PRIMARY KEY,
  farmer_id INTEGER REFERENCES users(id),
  product_name VARCHAR(255) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  planting_date DATE,
  harvest_date DATE,
  cultivation_method VARCHAR(100),
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  location_address TEXT,
  description TEXT,
  qr_code VARCHAR(255) UNIQUE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Environment Variables

#### Production Environment

```bash
# .env.production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://agritrace.vn
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=agritrace-uploads
```

#### Development Environment

```bash
# .env.development
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://localhost:5432/agritrace_dev
JWT_SECRET=dev_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
REDIS_URL=redis://localhost:6379
```

## 🌐 Domain and SSL Setup

### Domain Configuration

1. **DNS Configuration**

```bash
# A Record for API
api.agritrace.vn -> Your server IP

# CNAME for www
www.agritrace.vn -> agritrace.vn

# A Record for main domain
agritrace.vn -> Your server IP
```

2. **SSL Certificate (Let's Encrypt)**

```bash
# Install Certbot
sudo apt-get install certbot

# Generate SSL certificate
sudo certbot certonly --standalone -d agritrace.vn -d www.agritrace.vn -d api.agritrace.vn

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/agritrace
server {
    listen 80;
    server_name agritrace.vn www.agritrace.vn;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name agritrace.vn www.agritrace.vn;

    ssl_certificate /etc/letsencrypt/live/agritrace.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/agritrace.vn/privkey.pem;

    root /var/www/agritrace;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Production Server Setup

### Ubuntu Server Configuration

1. **Initial Server Setup**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Redis
sudo apt install redis-server -y
```

2. **Firewall Configuration**

```bash
# Configure UFW
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw allow 3000
sudo ufw enable
```

3. **PM2 Process Management**

```bash
# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'agritrace-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📊 Monitoring and Logging

### Application Monitoring

1. **PM2 Monitoring**

```bash
# Monitor application
pm2 monit

# View logs
pm2 logs agritrace-api

# Restart application
pm2 restart agritrace-api
```

2. **Nginx Logs**

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Database Monitoring

```sql
-- Check database connections
SELECT count(*) FROM pg_stat_activity;

-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.4
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/agritrace
          git pull origin main
          npm install
          pm2 restart agritrace-api
```

## 🚀 Performance Optimization

### Database Optimization

```sql
-- Create indexes for better performance
CREATE INDEX idx_batches_farmer_id ON batches(farmer_id);
CREATE INDEX idx_batches_status ON batches(status);
CREATE INDEX idx_batches_created_at ON batches(created_at);
CREATE INDEX idx_reviews_batch_id ON reviews(batch_id);
```

### Caching Strategy

```javascript
// Redis caching implementation
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    client.get(key, (err, data) => {
      if (data) {
        return res.json(JSON.parse(data));
      }
      
      res.sendResponse = res.json;
      res.json = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    });
  };
};
```

## 🔒 Security Hardening

### Security Headers

```javascript
// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

### Environment Security

```bash
# Secure environment variables
export NODE_ENV=production
export JWT_SECRET=$(openssl rand -base64 32)
export DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require
```

---

*Follow this deployment guide to successfully deploy AgriTrace to production environments.* 