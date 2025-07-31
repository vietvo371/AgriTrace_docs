---
id: login
title: Login
sidebar_label: Login
---

# Login

Authenticate a user and receive an access token.

## Endpoint

```
POST /auth/login
```

## Description

This endpoint allows users to authenticate with their email and password. Upon successful authentication, a JWT token is returned that should be included in subsequent API requests.

## Request

### Headers

| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |

### Body

```json
{
  "email": "farmer@example.com",
  "password": "your_password"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's email address |
| password | string | Yes | User's password |

## Response

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZmFybWVyQGV4YW1wbGUuY29tIiwicm9sZSI6ImZhcm1lciIsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxNjQxMDgxNjAwfQ.signature",
    "user": {
      "id": 1,
      "email": "farmer@example.com",
      "fullName": "Nguyen Van A",
      "role": "farmer",
      "phone": "+84123456789",
      "address": "Binh Duong Province, Vietnam",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  },
  "message": "Login successful"
}
```

### Error Responses

#### Invalid Credentials (401)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

#### Validation Error (422)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "password",
        "message": "Password must be at least 6 characters"
      }
    ]
  }
}
```

#### Account Suspended (403)

```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_SUSPENDED",
    "message": "Your account has been suspended. Please contact support."
  }
}
```

## Examples

### cURL

```bash
curl -X POST https://api.agritrace.vn/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123"
  }'
```

### JavaScript

```javascript
const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://api.agritrace.vn/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token for future requests
      localStorage.setItem('authToken', data.data.token);
      return data.data.user;
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Usage
loginUser('farmer@example.com', 'password123')
  .then(user => {
    console.log('Logged in user:', user);
  })
  .catch(error => {
    console.error('Login error:', error);
  });
```

### React Native

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://api.agritrace.vn/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token securely
      await AsyncStorage.setItem('authToken', data.data.token);
      return data.data.user;
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

## Notes

- The JWT token expires after 7 days
- Store the token securely (localStorage for web, AsyncStorage for mobile)
- Include the token in the Authorization header for subsequent requests
- The token contains user information and permissions
- Rate limiting: 10 requests per minute per IP address

## Related Endpoints

- [Register](/api/auth/register) - Create a new account
- [Refresh Token](/api/auth/refresh) - Refresh expired token
- [Logout](/api/auth/logout) - Invalidate current token 