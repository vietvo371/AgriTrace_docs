---
id: Contributing
title: Contributing to AgriTrace
sidebar_label: 🤝 Contributing
---

# Contributing to AgriTrace

Thank you for your interest in contributing to AgriTrace! This guide will help you get started with development and understand our contribution process.

## 🌟 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **🐛 Bug Reports**: Help us identify and fix issues
- **✨ Feature Requests**: Suggest new features and improvements
- **📝 Documentation**: Improve our documentation
- **💻 Code Contributions**: Submit pull requests with code changes
- **🎨 UI/UX Improvements**: Enhance the user interface
- **🌐 Localization**: Help translate to Vietnamese or other languages
- **🧪 Testing**: Write tests and improve test coverage

## 🚀 Development Setup

### Prerequisites

Before you start contributing, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **PostgreSQL** (for database)
- **React Native CLI** (for mobile development)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Local Development Environment

1. **Clone the Repository**

```bash
# Clone the main repository
git clone https://github.com/vietvo371/AgriTraceApp.git
cd AgriTrace

# Fork the repository on GitHub first, then clone your fork
git clone https://github.com/YOUR_USERNAME/AgriTrace.git
cd AgriTrace
```

2. **Install Dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Install mobile app dependencies
cd ../mobile
npm install

# Install web dashboard dependencies
cd ../web
npm install
```

3. **Database Setup**

```bash
# Create database
createdb agritrace_dev

# Run migrations
cd backend
npm run migrate

# Seed database with sample data
npm run seed
```

4. **Environment Configuration**

```bash
# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Mobile app environment
cp mobile/.env.example mobile/.env
# Edit mobile/.env with your configuration

# Web dashboard environment
cp web/.env.example web/.env
# Edit web/.env with your configuration
```

5. **Start Development Servers**

```bash
# Start backend server
cd backend
npm run dev

# Start mobile app (in new terminal)
cd mobile
npx react-native run-android  # or run-ios

# Start web dashboard (in new terminal)
cd web
npm start
```

## 📋 Development Guidelines

### Code Style and Standards

#### JavaScript/TypeScript

We use ESLint and Prettier for code formatting:

```bash
# Install development dependencies
npm install --save-dev eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

#### Code Style Rules

```javascript
// Use meaningful variable names
const productBatch = await createBatch(batchData); // ✅ Good
const pb = await createBatch(batchData); // ❌ Bad

// Use async/await instead of promises
const result = await api.getData(); // ✅ Good
api.getData().then(result => {}); // ❌ Bad

// Use TypeScript interfaces
interface BatchData {
  productName: string;
  weight: number;
  unit: string;
  harvestDate: Date;
}

// Use proper error handling
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  throw new Error('Failed to perform operation');
}
```

#### React Native Guidelines

```javascript
// Use functional components with hooks
import React, { useState, useEffect } from 'react';

const BatchListScreen = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      setLoading(true);
      const data = await api.getBatches();
      setBatches(data);
    } catch (error) {
      console.error('Failed to load batches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={batches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BatchItem batch={item} />}
        />
      )}
    </View>
  );
};
```

#### Database Guidelines

```sql
-- Use meaningful table and column names
CREATE TABLE product_batches (
  id SERIAL PRIMARY KEY,
  farmer_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  harvest_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add proper indexes
CREATE INDEX idx_product_batches_farmer_id ON product_batches(farmer_id);
CREATE INDEX idx_product_batches_created_at ON product_batches(created_at);

-- Use foreign key constraints
ALTER TABLE product_batches 
ADD CONSTRAINT fk_product_batches_farmer 
FOREIGN KEY (farmer_id) REFERENCES users(id);
```

### Git Workflow

#### Branch Naming Convention

```bash
# Feature branches
git checkout -b feature/qr-code-generation
git checkout -b feature/user-authentication

# Bug fix branches
git checkout -b fix/login-validation-error
git checkout -b fix/qr-scan-crash

# Documentation branches
git checkout -b docs/api-documentation
git checkout -b docs/installation-guide
```

#### Commit Message Format

```bash
# Use conventional commit format
git commit -m "feat: add QR code generation functionality"
git commit -m "fix: resolve login validation issue"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for batch creation"
git commit -m "refactor: improve error handling in API"

# Commit types:
# feat: new feature
# fix: bug fix
# docs: documentation changes
# style: formatting changes
# refactor: code refactoring
# test: adding tests
# chore: maintenance tasks
```

#### Pull Request Process

1. **Create a Feature Branch**

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

2. **Make Your Changes**

```bash
# Make your code changes
# Write tests for new functionality
# Update documentation if needed
```

3. **Test Your Changes**

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build
```

4. **Commit Your Changes**

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

5. **Create Pull Request**

- Go to GitHub and create a pull request
- Fill out the pull request template
- Request reviews from maintainers
- Address any feedback and make changes

### Pull Request Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] I have read the [Contributing Guidelines](CONTRIBUTING.md)
- [ ] My code follows the project's coding standards
- [ ] I have tested my changes thoroughly
- [ ] I have updated the documentation accordingly
```

## 🧪 Testing Guidelines

### Unit Testing

```javascript
// Example test for batch creation
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateBatchScreen from '../CreateBatchScreen';

describe('CreateBatchScreen', () => {
  it('should create a new batch successfully', async () => {
    const mockCreateBatch = jest.fn().mockResolvedValue({ id: 1 });
    
    const { getByPlaceholderText, getByText } = render(
      <CreateBatchScreen createBatch={mockCreateBatch} />
    );

    fireEvent.changeText(getByPlaceholderText('Product Name'), 'Mango');
    fireEvent.changeText(getByPlaceholderText('Weight'), '20');
    fireEvent.press(getByText('Create Batch'));

    await waitFor(() => {
      expect(mockCreateBatch).toHaveBeenCalledWith({
        productName: 'Mango',
        weight: 20
      });
    });
  });
});
```

### Integration Testing

```javascript
// Example API integration test
describe('Batch API', () => {
  it('should create a batch via API', async () => {
    const batchData = {
      productName: 'Mango',
      weight: 20,
      unit: 'kg',
      harvestDate: '2024-06-20'
    };

    const response = await request(app)
      .post('/api/batches')
      .send(batchData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.productName).toBe('Mango');
  });
});
```

### End-to-End Testing

```javascript
// Example E2E test with Detox
describe('Batch Creation Flow', () => {
  it('should create a batch and generate QR code', async () => {
    await device.launchApp();
    
    // Login
    await element(by.id('email-input')).typeText('farmer@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    // Navigate to create batch
    await element(by.id('create-batch-tab')).tap();
    
    // Fill batch form
    await element(by.id('product-name-input')).typeText('Mango');
    await element(by.id('weight-input')).typeText('20');
    await element(by.id('create-batch-button')).tap();
    
    // Verify QR code generation
    await expect(element(by.id('qr-code-image'))).toBeVisible();
  });
});
```

## 📚 Documentation Standards

### Code Documentation

```javascript
/**
 * Creates a new product batch for a farmer
 * @param {Object} batchData - The batch data
 * @param {string} batchData.productName - Name of the product
 * @param {number} batchData.weight - Weight of the batch
 * @param {string} batchData.unit - Unit of measurement (kg, ton, etc.)
 * @param {Date} batchData.harvestDate - Date of harvest
 * @param {string} batchData.cultivationMethod - Method of cultivation
 * @param {Object} batchData.location - GPS coordinates
 * @param {number} batchData.location.latitude - Latitude
 * @param {number} batchData.location.longitude - Longitude
 * @returns {Promise<Object>} The created batch with QR code
 * @throws {Error} If batch creation fails
 */
const createBatch = async (batchData) => {
  // Implementation
};
```

### API Documentation

```javascript
/**
 * @api {post} /api/batches Create Batch
 * @apiName CreateBatch
 * @apiGroup Batches
 * @apiVersion 1.0.0
 *
 * @apiParam {String} productName Product name
 * @apiParam {Number} weight Weight of the batch
 * @apiParam {String} unit Unit of measurement
 * @apiParam {Date} harvestDate Harvest date
 * @apiParam {String} cultivationMethod Cultivation method
 * @apiParam {Object} location GPS coordinates
 * @apiParam {Number} location.latitude Latitude
 * @apiParam {Number} location.longitude Longitude
 *
 * @apiSuccess {Number} id Batch ID
 * @apiSuccess {String} qrCode QR code data
 * @apiSuccess {Date} createdAt Creation timestamp
 *
 * @apiError {Object} 400 Bad Request
 * @apiError {Object} 401 Unauthorized
 * @apiError {Object} 500 Internal Server Error
 */
```

## 🌐 Localization Guidelines

### Vietnamese Translation

```javascript
// Translation file structure
const viTranslations = {
  common: {
    save: 'Lưu',
    cancel: 'Hủy',
    delete: 'Xóa',
    edit: 'Sửa',
    create: 'Tạo mới'
  },
  batches: {
    create: 'Tạo lô sản phẩm',
    productName: 'Tên sản phẩm',
    weight: 'Trọng lượng',
    harvestDate: 'Ngày thu hoạch',
    cultivationMethod: 'Phương pháp canh tác'
  },
  qr: {
    scan: 'Quét mã QR',
    generate: 'Tạo mã QR',
    download: 'Tải xuống'
  }
};
```

### Adding New Languages

1. Create translation files in `src/locales/`
2. Add language to the language selector
3. Update the i18n configuration
4. Test all translations thoroughly

## 🔒 Security Guidelines

### Input Validation

```javascript
// Always validate user input
const validateBatchData = (data) => {
  const errors = [];
  
  if (!data.productName || data.productName.trim().length === 0) {
    errors.push('Product name is required');
  }
  
  if (!data.weight || data.weight <= 0) {
    errors.push('Weight must be greater than 0');
  }
  
  if (!data.harvestDate) {
    errors.push('Harvest date is required');
  }
  
  return errors;
};
```

### Authentication & Authorization

```javascript
// Always verify user permissions
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and discussions
- **Email**: vietvo371@gmail.com for direct contact
- **Vietnamese Support**: Support available in Vietnamese

### Before Asking for Help

1. **Check the Documentation**: Read through the docs first
2. **Search Existing Issues**: Check if your question has been answered
3. **Provide Context**: Include relevant code, error messages, and environment details
4. **Be Specific**: Describe exactly what you're trying to do and what's not working

### Issue Templates

#### Bug Report Template

```markdown
## Bug Description
Clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g. iOS, Android, Windows]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 22]

## Additional Context
Add any other context about the problem here.
```

## 🎉 Recognition

### Contributors Hall of Fame

We recognize and appreciate all contributors:

- **Code Contributors**: Listed in GitHub contributors
- **Documentation Contributors**: Help improve our docs
- **Bug Reporters**: Help identify and fix issues
- **Feature Requesters**: Help shape the product direction

### Getting Your Name Added

- Make a significant contribution (code, docs, or testing)
- Follow the contribution guidelines
- Maintain a positive and collaborative attitude
- Help other contributors

---

*Thank you for contributing to AgriTrace! Your contributions help make agricultural traceability accessible to Vietnamese farmers.* 