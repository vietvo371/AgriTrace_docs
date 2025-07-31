# AgriTrace Overview

<img src={require('../static/img/banner.jpg').default} alt="Banner" className="banner-image" />

> *"Empowering Vietnamese farmers with digital traceability"*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)
[![Open issues](https://img.shields.io/github/issues/vietvo371/AgriTrace.svg 'Open issues')](https://github.com/vietvo371/AgriTrace/issues)
[![Open Pull Requests](https://img.shields.io/github/issues-pr/vietvo371/AgriTrace.svg 'Open Pull Requests')](https://github.com/vietvo371/AgriTrace/pulls)
[![Commit activity](https://img.shields.io/github/commit-activity/m/vietvo371/AgriTrace.svg 'Commit activity')](https://github.com/vietvo371/AgriTrace/graphs)

## 📖 Introduction

**AgriTrace** is an innovative mobile and web platform designed to provide transparent agricultural product traceability for small farmers and cooperatives in Vietnam. Using QR code technology, we connect farmers directly with consumers, building trust through transparency and quality assurance.

## 🎯 Mission

- **Product Traceability**: Track agricultural products from farm to consumer using QR codes and blockchain
- **Farmer Empowerment**: Provide digital tools for small-scale Vietnamese farmers
- **Consumer Trust**: Build confidence through transparent and immutable product information
- **Market Access**: Connect farmers directly with consumers and markets
- **Technology Adoption**: Bridge traditional farming with modern Web3 traceability
- **Quality Assurance**: Ensure product quality and safety standards through blockchain verification
- **Decentralized Storage**: Secure and immutable data storage on IPFS

## 💡 Core Features

### 🌾 Product Traceability
- Create product batches with detailed information
- Generate unique QR codes for each batch
- Track harvest dates and cultivation methods
- Store farm location and GPS coordinates
- Upload high-quality product photos
- Blockchain-verified product authenticity

### 📱 QR Code System
- Generate QR codes for product identification
- Consumer scanning without app download required
- Real-time product information access
- Mobile-optimized experience
- Expiration-based security (6 months)
- Blockchain-backed QR verification

### 👥 User Management
- Farmer registration and verification system
- Consumer QR scanning and rating platform
- Admin dashboard for platform management
- Multi-language support (English/Vietnamese)
- Role-based access control
- Web3 wallet integration

### 📊 Analytics & Reporting
- Farmer performance tracking and metrics
- Consumer behavior analytics
- Product popularity and trend analysis
- Market insights and reporting
- Export capabilities for data analysis
- Blockchain transaction tracking

### 🔗 Blockchain Integration
- Smart contract-based product verification
- Decentralized file storage on IPFS
- MetaMask wallet integration
- Immutable product records
- Transparent supply chain tracking

## 🏗️ System Architecture

### Mobile App
- React Native with Expo
- Cross-platform (iOS/Android)
- Offline capability
- Camera integration for QR scanning

### Web Dashboard
- React.js with TypeScript
- Material-UI components
- Admin management interface
- Real-time analytics

### Backend API
- Node.js with Express.js
- RESTful API design
- JWT authentication
- Rate limiting and security

### Database & Storage
- MySQL/PostgreSQL for relational data
- Redis for caching and sessions
- File storage for images
- QR code generation service

### Web3 & Blockchain
- Web3.js for Ethereum integration
- MetaMask for wallet connections
- Solidity smart contracts
- IPFS for decentralized storage
- Filecoin for distributed storage
- Pinata for IPFS management

## 👥 Target Users

### 👨‍🌾 Farmers
- Create and manage product batches
- Generate QR codes for products
- Track consumer feedback and ratings
- Access market insights and analytics

### 🛒 Consumers
- Scan QR codes to view product information
- Rate and review products
- Learn about farming methods and locations
- Make informed purchasing decisions

### 👨‍💼 Administrators
- Manage platform users and content
- Monitor system performance
- Generate reports and analytics
- Provide customer support

### 🏢 Cooperatives
- Manage multiple farmer accounts
- Coordinate product distribution
- Access aggregated analytics
- Build brand reputation

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
| **Web3.js**  | >=1.8.0               |
| **MetaMask** | >=11.0.0              |
| **Solidity** | >=0.8.0               |

## 🔐 Security Features

- JWT token authentication
- Rate limiting and API protection
- Data encryption in transit and at rest
- Secure QR code generation with blockchain verification
- Input validation and sanitization
- Smart contract-based product verification
- Decentralized storage on IPFS for immutability
- MetaMask wallet integration for secure transactions

## 👥 Team Members

| Role      | Name                    | Email                                                                 |
| --------- | ----------------------- | --------------------------------------------------------------------- |
| Mentor    | **Le Thanh Truong**      | [thanhtruong23111999@gmail.com](mailto:thanhtruong23111999@gmail.com) |
| Member    | **Vo Van Viet**          | [vietvo371@gmail.com](mailto:vietvo371@gmail.com)                     |
| Member    | **Nguyễn Ngọc Duy Thái** | [kkdn011@gmail.com](mailto:kkdn011@gmail.com)                         |
| Member    | **Nguyễn Văn Nhân**      | [vannhan130504@gmail.com](mailto:vannhan130504@gmail.com)             |

## 🚀 Quick Start

### For Farmers
1. **Download the App**: Install AgriTrace from app stores
2. **Create Account**: Register with phone number and OTP
3. **Add Farm Information**: Enter location and contact details
4. **Create First Batch**: Add product details and generate QR code
5. **Print and Attach**: Print QR codes and attach to products

### For Consumers
1. **Scan QR Code**: Use phone camera to scan product QR codes
2. **View Information**: Read product details and farmer information
3. **Rate Products**: Leave ratings and reviews
4. **Share Experience**: Tell others about good products

### For Developers
```bash
# 1. Clone repository
git clone https://github.com/vietvo371/AgriTrace.git
cd AgriTrace

# 2. Install dependencies
yarn install

# 3. Setup environment
cp .env.example .env
# Edit .env with your settings

# 4. Start development
yarn dev
```

## 🤝 Contributing

```bash
# 1. Fork repository
git clone https://github.com/vietvo371/AgriTrace.git
cd AgriTrace

# 2. Create feature branch
git checkout -b feat/my-feature

# 3. Commit changes
git commit -m "feat: add new feature"

# 4. Create Pull Request
git push origin feat/my-feature
```

### Contribution Guidelines
- ✅ Follow [Conventional Commits](https://www.conventionalcommits.org/)
- ✅ Write tests for new code
- ✅ Update documentation
- ✅ Test on both mobile and web platforms

## 📱 Platform Benefits

### For Farmers
- **Market Access**: Reach more customers directly
- **Fair Pricing**: Get better prices for quality products
- **Brand Building**: Build trust and reputation
- **Customer Feedback**: Learn from consumer reviews

### For Consumers
- **Transparency**: Know exactly where food comes from
- **Quality Assurance**: Verify product quality and freshness
- **Support Farmers**: Direct support to local farmers
- **Better Choices**: Make informed purchasing decisions

### For the Community
- **Local Economy**: Support local agricultural economy
- **Food Security**: Promote sustainable farming
- **Quality Standards**: Improve overall food quality
- **Trust Building**: Build trust between farmers and consumers

## 🌟 Success Stories

### Farmer Success
- **Increased Sales**: 40% average increase in farmer earnings
- **Customer Trust**: 95% of consumers trust QR-scanned products
- **Market Expansion**: Farmers reaching new customer segments
- **Quality Improvement**: Better farming practices through feedback

### Consumer Benefits
- **Product Confidence**: 90% of consumers feel more confident about product quality
- **Local Support**: 85% prefer products with traceability
- **Health Awareness**: Better understanding of food origins
- **Community Connection**: Direct connection with food producers

## 📞 Support & Contact

### Technical Support
- **Email**: support@agritrace.vn
- **Phone**: +84 123 456 789
- **WhatsApp**: +84 123 456 789
- **Documentation**: https://docs.agritrace.vn

### Business Inquiries
- **Partnership**: partnerships@agritrace.vn
- **Investors**: investors@agritrace.vn
- **Media**: press@agritrace.vn

## 📝 License

Released under the MIT License – see [LICENSE](../LICENSE) file for details.

© 2024 AgriTrace – Empowering Vietnamese farmers with digital traceability technology.




