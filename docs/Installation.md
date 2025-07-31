# AgriTrace Installation Guide

## ⚙️ System Requirements

| Software     | Minimum Version       |
| ------------ | --------------------- |
| **Node.js**  | >=18.0.0              |
| **Yarn**     | >=1.22.0              |
| **React Native** | 0.72.0              |
| **Expo CLI** | >=6.0.0               |
| **MySQL**    | 8.0                   |
| **PostgreSQL** | 14.0                 |
| **Redis**    | 6.0                   |

## 🏗️ System Architecture

| Layer | Main Technologies | Role | Highlights |
|-------|-------------------|------|-----------|
| **Mobile App** | React Native, Expo | Cross-platform mobile app for farmers | Offline support, camera integration |
| **Web Dashboard** | React.js, TypeScript | Admin dashboard and web interface | Responsive design, real-time updates |
| **Backend API** | Node.js, Express.js | RESTful API, authentication, business logic | JWT authentication, rate limiting |
| **Database** | MySQL/PostgreSQL | Relational data storage | ACID compliance, indexing |
| **Cache** | Redis | Session storage, caching | Fast response times |
| **QR Code System** | qrcode.js, camera API | QR generation and scanning | Native camera integration |
| **File Storage** | AWS S3 / Local | Photo and file storage | Scalable storage solution |
| **Deployment** | Docker, PM2 | Containerization and process management | Easy scaling and deployment |

## 🚀 Installation

### 🌐 Production Deployment

```bash
# 1. Clone source code
git clone https://github.com/vietvo371/AgriTrace.git
cd AgriTrace

# 2. Backend Setup
cd backend
cp .env.example .env
# ✏️ Fill in Database, Redis, JWT secret

# 3. Database Setup
mysql -u root -p
CREATE DATABASE agritrace;
CREATE USER 'agritrace_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON agritrace.* TO 'agritrace_user'@'localhost';
FLUSH PRIVILEGES;

# 4. Install Dependencies
yarn install

# 5. Run Migrations
yarn migrate

# 6. Seed Database
yarn seed

# 7. Start Production Server
yarn start:prod
```

### 💻 Local Development

#### Backend Setup
```bash
# 1. Install dependencies
yarn install

# 2. Setup environment
cp .env.example .env
# Edit .env with your local settings

# 3. Database setup
yarn db:migrate
yarn db:seed

# 4. Start development server
yarn dev
```

#### Mobile App Setup
```bash
# 1. Install Expo CLI
npm install -g @expo/cli

# 2. Navigate to mobile app
cd mobile

# 3. Install dependencies
yarn install

# 4. Start Expo development server
yarn start
# or
expo start
```

#### Web Dashboard Setup
```bash
# 1. Navigate to web dashboard
cd web

# 2. Install dependencies
yarn install

# 3. Start development server
yarn start
```

## 👥 Demo Accounts

### ADMIN
- Email: admin@agritrace.vn
- Password: admin123

### FARMER

**Account 1**
- Email: farmer1@agritrace.vn
- Password: farmer123

**Account 2**
- Email: farmer2@agritrace.vn
- Password: farmer123

### CONSUMER
- No account needed - QR scanning works without login

## 🔍 Installation Verification

### 1. Backend API
- Health check: http://localhost:3001/api/health
- API docs: http://localhost:3001/api/docs
- Test endpoints with Postman

### 2. Mobile App
- Install Expo Go on your phone
- Scan QR code from `expo start`
- Test login and batch creation

### 3. Web Dashboard
- Access: http://localhost:3000
- Test admin functions
- Verify user management

### 4. Database
- Check migrations: `yarn db:migrate:status`
- Verify seeded data
- Test connections

## 🐛 Troubleshooting Common Issues

### Node.js Issues
```bash
# Node version conflicts
nvm use 18
# or
nvm install 18

# Yarn issues
yarn cache clean
yarn install --force
```

### React Native Issues
```bash
# Metro bundler issues
npx react-native start --reset-cache

# Expo issues
expo doctor
expo install --fix

# iOS simulator issues
npx react-native run-ios --simulator="iPhone 14"
```

### Database Issues
```bash
# Connection issues
mysql -u root -p -e "SHOW DATABASES;"

# Migration issues
yarn db:migrate:rollback
yarn db:migrate

# Seeding issues
yarn db:seed --force
```

### QR Code Issues
```bash
# Camera permissions
# iOS: Add NSCameraUsageDescription to Info.plist
# Android: Add camera permission to AndroidManifest.xml

# QR generation issues
yarn add qrcode
yarn add react-native-qrcode-svg
```

## 🤝 Contributing

```bash
# 1. Fork the repository and clone to local
git clone https://github.com/vietvo371/AgriTrace.git
cd AgriTrace

# 2. Create a new branch for the feature
git checkout -b feat/my-awesome-feature

# 3. Commit following Conventional Commits
git add .
git commit -m "feat: add new awesome feature"

# 4. Push and create a Pull Request
git push origin feat/my-awesome-feature
# 🔀 Create a Pull Request on GitHub
```

### 📋 Contribution Guidelines
- ✅ Follow [Conventional Commits](https://www.conventionalcommits.org/)
- ✅ Write tests for new code
- ✅ Ensure code passes all CI/CD checks
- ✅ Update documentation if needed
- ✅ Test on both iOS and Android for mobile changes

## 📱 Mobile App Development

### React Native Setup
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init AgriTraceMobile

# Install essential dependencies
yarn add @react-navigation/native
yarn add @react-navigation/stack
yarn add @react-navigation/bottom-tabs
yarn add react-native-camera
yarn add react-native-qrcode-scanner
yarn add @react-native-async-storage/async-storage
yarn add axios
yarn add react-native-vector-icons
```

### Expo Setup
```bash
# Install Expo CLI
npm install -g @expo/cli

# Create new Expo project
npx create-expo-app AgriTraceMobile

# Install Expo dependencies
npx expo install expo-camera
npx expo install expo-barcode-scanner
npx expo install expo-file-system
npx expo install expo-image-picker
npx expo install expo-location
```

### Key Mobile Features
- **Camera Integration**: QR code scanning
- **Offline Support**: Local data storage
- **GPS Location**: Field location tracking
- **Photo Capture**: Product image upload
- **Push Notifications**: Real-time updates

## 🌐 Web Dashboard Development

### React.js Setup
```bash
# Create React app
npx create-react-app agritrace-web --template typescript

# Install dependencies
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material
yarn add react-router-dom
yarn add axios
yarn add recharts
yarn add @mui/x-data-grid
```

### Key Web Features
- **Admin Dashboard**: User management
- **Analytics**: Sales and performance metrics
- **QR Code Management**: Batch tracking
- **User Management**: Farmer and admin accounts
- **Reports**: Export data and analytics

## 📞 Contact

### Team Members
| Role      | Name                    | Email                                                                 |
| --------- | ----------------------- | --------------------------------------------------------------------- |
| Leader    | **Nguyen Quoc Long**     | [quoclongdng@gmail.com](mailto:quoclongdng@gmail.com)                 |
| Developer | **Le Thanh Truong**      | [thanhtruong23111999@gmail.com](mailto:thanhtruong23111999@gmail.com) |
| Developer | **Vo Van Viet**          | [vietvo371@gmail.com](mailto:vietvo371@gmail.com)                     |

### Support
- Email: support@agritrace.vn
- Hotline: +84 123 456 789
- Documentation: https://agritrace.vn/docs

## 📚 References

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Redis Documentation](https://redis.io/documentation)
- [QR Code Generation](https://github.com/soldair/node-qrcode)
- [React Navigation](https://reactnavigation.org/)

## 📝 License

Released under the MIT License – see LICENSE file for details.

© 2024 AgriTrace – Empowering Vietnamese farmers with digital traceability.
