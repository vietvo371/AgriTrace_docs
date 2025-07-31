---
id: index
title: API Reference
sidebar_label: 📚 API Overview
---

# AgriTrace API Reference

Welcome to the AgriTrace API documentation. This API provides comprehensive endpoints for managing agricultural product traceability, QR code generation, and user management.

## 🔗 Base URL

```
Production: https://api.agritrace.vn/api
Development: http://localhost:3000/api
```

## 🔐 Authentication

AgriTrace API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

```bash
curl -X POST https://api.agritrace.vn/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "your_password"
  }'
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "farmer@example.com",
    "role": "farmer",
    "fullName": "Nguyen Van A"
  }
}
```

## 📊 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "productName",
      "message": "Product name is required"
    }
  }
}
```

## 📋 HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

## 🔄 Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Authentication endpoints**: 10 requests per minute
- **General endpoints**: 100 requests per minute
- **QR code generation**: 50 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 📱 Mobile App Integration

### React Native Example

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.agritrace.vn/api',
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      AsyncStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);
```

## 🌐 Web Dashboard Integration

### JavaScript Example

```javascript
class AgriTraceAPI {
  constructor(baseURL = 'https://api.agritrace.vn/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.token = response.data.token;
    localStorage.setItem('authToken', this.token);
    return response;
  }

  async createBatch(batchData) {
    return await this.request('/batches/create', {
      method: 'POST',
      body: JSON.stringify(batchData),
    });
  }
}
```

## 🔍 API Endpoints Overview

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `DELETE /users/profile` - Delete user account

### Products & Batches
- `POST /batches/create` - Create new batch
- `GET /batches` - List user batches
- `GET /batches/:id` - Get batch details
- `PUT /batches/:id` - Update batch
- `DELETE /batches/:id` - Delete batch
- `GET /products/categories` - Get product categories

### QR Codes
- `POST /qr/generate/:batchId` - Generate QR code
- `POST /qr/scan` - Scan QR code
- `GET /qr/validate/:code` - Validate QR code

### Reviews
- `POST /reviews/create` - Create review
- `GET /reviews/batch/:batchId` - Get batch reviews
- `PUT /reviews/:id` - Update review

### Admin (Admin only)
- `GET /admin/dashboard` - Admin dashboard stats
- `GET /admin/users` - List all users
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user
- `GET /admin/categories` - Manage categories
- `GET /admin/permissions` - Manage permissions

## 🧪 Testing the API

### Using cURL

```bash
# Login
curl -X POST https://api.agritrace.vn/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "farmer@example.com", "password": "password123"}'

# Create batch (with token)
curl -X POST https://api.agritrace.vn/api/batches/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productName": "Mango",
    "weight": 20,
    "unit": "kg",
    "harvestDate": "2024-06-20",
    "cultivationMethod": "organic"
  }'
```

### Using Postman

1. Import the AgriTrace API collection
2. Set the base URL: `https://api.agritrace.vn/api`
3. Use the login endpoint to get a token
4. Set the Authorization header with the token
5. Test other endpoints

## 📞 Support

For API support and questions:

- **Email**: api-support@agritrace.vn
- **Documentation**: [GitHub Wiki](https://github.com/vietvo371/AgriTrace/wiki)
- **Issues**: [GitHub Issues](https://github.com/vietvo371/AgriTrace/issues)

---

*AgriTrace API - Empowering agricultural traceability through simple, secure, and scalable endpoints.* 