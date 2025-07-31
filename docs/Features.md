---
id: Features
title: Features
sidebar_label: 📚 Features
---

# AgriTrace Features

AgriTrace provides a comprehensive set of features designed to meet the needs of Vietnamese farmers, consumers, and administrators. Our platform focuses on simplicity, reliability, and cost-effectiveness.

## 🔐 User Authentication & Management

### Secure Login System
AgriTrace implements a robust authentication system using JWT tokens for secure access.

```javascript
// Login API Example
const loginUser = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('authToken', data.token);
    return data.user;
  }
};
```

### Role-Based Access Control
- **Farmer**: Create and manage product batches
- **Consumer**: Scan QR codes and leave reviews
- **Admin**: Manage users, categories, and system settings

## 📦 Product Batch Management

### Create Product Batches
Farmers can easily create new product batches with detailed information:

```javascript
// Create Batch API Example
const createBatch = async (batchData) => {
  const response = await fetch('/api/batches/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      productName: 'Mango',
      weight: 20,
      unit: 'kg',
      plantingDate: '2024-01-15',
      harvestDate: '2024-06-20',
      cultivationMethod: 'organic',
      location: {
        latitude: 10.8231,
        longitude: 106.6297,
        address: 'Binh Duong Province'
      },
      description: 'Fresh organic mangoes'
    }),
  });
  
  return await response.json();
};
```

### Required Batch Information
- **Product Name**: Type of agricultural product
- **Weight**: Quantity with unit (kg, ton, etc.)
- **Dates**: Planting and harvest dates
- **Cultivation Method**: Organic, conventional, etc.
- **GPS Location**: Precise farm location
- **Photos**: Product and farm images
- **Description**: Additional details

## 🔍 QR Code Generation

### Dynamic QR Code Creation
Each batch gets a unique QR code with embedded product information:

```javascript
// QR Code Generation
const generateQRCode = async (batchId) => {
  const response = await fetch(`/api/qr/generate/${batchId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const qrData = await response.json();
  return {
    qrCode: qrData.qrCode,
    expirationDate: qrData.expirationDate,
    downloadUrl: qrData.downloadUrl
  };
};
```

### QR Code Features
- **Unique Identifier**: Each QR code is unique per batch
- **Expiration Date**: Codes expire to prevent reuse
- **Embedded Data**: Contains product details and verification URL
- **Printable Format**: High-resolution for printing
- **Offline Capability**: Works without internet connection

### QR Code Structure
```json
{
  "batchId": "BATCH_2024_001",
  "productName": "Mango",
  "farmerId": "FARMER_123",
  "harvestDate": "2024-06-20",
  "expirationDate": "2024-12-20",
  "verificationUrl": "https://agritrace.vn/verify/BATCH_2024_001"
}
```

## 📱 QR Code Scanning

### Consumer Scanning Experience
Consumers can scan QR codes using any smartphone camera:

```javascript
// QR Code Scanning Implementation
const scanQRCode = async (qrData) => {
  try {
    const response = await fetch('/api/qr/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qrData }),
    });
    
    const productInfo = await response.json();
    return {
      isValid: productInfo.isValid,
      productDetails: productInfo.details,
      farmerInfo: productInfo.farmer,
      reviews: productInfo.reviews
    };
  } catch (error) {
    console.error('QR scan failed:', error);
  }
};
```

### Scanning Features
- **No App Required**: Works with any QR scanner app
- **Instant Verification**: Real-time product validation
- **Rich Information**: Complete product and farmer details
- **Review System**: Rate and review products
- **Share Functionality**: Share product information

## ⭐ Review & Rating System

### Product Reviews
Consumers can leave detailed reviews for products:

```javascript
// Create Review API
const createReview = async (batchId, reviewData) => {
  const response = await fetch('/api/reviews/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      batchId,
      rating: 5,
      comment: 'Excellent quality mangoes!',
      photos: ['photo1.jpg', 'photo2.jpg']
    }),
  });
  
  return await response.json();
};
```

### Review Features
- **Star Rating**: 1-5 star rating system
- **Photo Reviews**: Upload product photos
- **Text Comments**: Detailed feedback
- **Anonymous Option**: Privacy protection
- **Moderation**: Admin review approval

## 🗄️ Database Management

### Relational Database Structure
AgriTrace uses a comprehensive database schema:

```sql
-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('farmer', 'consumer', 'admin') NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100)
);

-- Products Table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category_id INT,
  description TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Batches Table
CREATE TABLE batches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  farmer_id INT NOT NULL,
  product_id INT NOT NULL,
  batch_code VARCHAR(50) UNIQUE NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  planting_date DATE,
  harvest_date DATE,
  cultivation_method VARCHAR(100),
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  location_address TEXT,
  description TEXT,
  status ENUM('active', 'expired', 'deleted') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## 📊 Admin Dashboard

### Comprehensive Management Tools
Administrators have access to powerful management features:

```javascript
// Admin Dashboard Statistics
const getDashboardStats = async () => {
  const response = await fetch('/api/admin/dashboard/stats', {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
    },
  });
  
  return await response.json();
  // Returns: totalUsers, totalBatches, totalScans, recentActivity
};
```

### Admin Features
- **User Management**: Add, edit, delete users
- **Category Management**: Manage product categories
- **Batch Monitoring**: Track all product batches
- **Analytics Dashboard**: View system statistics
- **Permission Control**: Manage user access levels
- **System Settings**: Configure platform parameters

## 🌐 Multi-Language Support

### Vietnamese & English Interface
AgriTrace supports both Vietnamese and English languages:

```javascript
// Language Configuration
const languageConfig = {
  vi: {
    productName: 'Tên sản phẩm',
    weight: 'Trọng lượng',
    harvestDate: 'Ngày thu hoạch',
    createBatch: 'Tạo lô sản phẩm',
    scanQR: 'Quét mã QR'
  },
  en: {
    productName: 'Product Name',
    weight: 'Weight',
    harvestDate: 'Harvest Date',
    createBatch: 'Create Batch',
    scanQR: 'Scan QR Code'
  }
};
```

## 🔒 Security Features

### Data Protection
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for passwords
- **Input Validation**: Server-side data validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy headers

### QR Code Security
- **Expiration Dates**: Automatic code expiration
- **Unique Identifiers**: Non-reusable batch codes
- **Tamper Detection**: Digital signature verification
- **Access Logging**: Track all QR code scans

## 📱 Mobile-First Design

### React Native Implementation
AgriTrace's mobile app is built with React Native for cross-platform compatibility:

```javascript
// React Native Navigation Setup
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="CreateBatch" component={CreateBatchScreen} />
      <Stack.Screen name="QRGenerate" component={QRGenerateScreen} />
      <Stack.Screen name="QRScan" component={QRScanScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
```

### Mobile Features
- **Offline Capability**: Works without internet
- **Camera Integration**: Native QR code scanning
- **GPS Location**: Automatic location detection
- **Photo Upload**: Direct camera integration
- **Push Notifications**: Real-time updates

## 🚀 Performance Optimization

### Efficient Data Loading
- **Lazy Loading**: Load data on demand
- **Caching**: Redis cache for frequently accessed data
- **Image Optimization**: Compressed product images
- **CDN Integration**: Fast content delivery
- **Database Indexing**: Optimized query performance

---

*AgriTrace - Simplifying agricultural traceability for Vietnamese farmers* 