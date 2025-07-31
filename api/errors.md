---
id: errors
title: Error Codes
sidebar_label: ⚠️ Error Codes
---

# API Error Codes

This document describes all error codes that can be returned by the AgriTrace API.

## 🔍 Error Response Format

All error responses follow this standard format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details (optional)
    }
  }
}
```

## 📋 HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## 🔐 Authentication Errors

### UNAUTHORIZED (401)

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

**Causes:**
- Missing Authorization header
- Invalid JWT token format
- Expired JWT token

**Solution:**
- Include valid Authorization header: `Authorization: Bearer <token>`
- Re-authenticate to get a new token

### INVALID_CREDENTIALS (401)

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

**Causes:**
- Incorrect email/password combination
- Account doesn't exist

**Solution:**
- Verify email and password
- Check if account exists
- Use password reset if needed

### TOKEN_EXPIRED (401)

```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access token has expired"
  }
}
```

**Causes:**
- JWT token has passed expiration time
- Token was issued too long ago

**Solution:**
- Re-authenticate to get a new token
- Use refresh token if available

## 🔒 Authorization Errors

### INSUFFICIENT_PERMISSIONS (403)

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to perform this action"
  }
}
```

**Causes:**
- User role doesn't have required permissions
- Trying to access admin-only endpoints
- Account suspended

**Solution:**
- Contact administrator for permission upgrade
- Check account status
- Use appropriate user role

### ACCOUNT_SUSPENDED (403)

```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_SUSPENDED",
    "message": "Your account has been suspended. Please contact support."
  }
}
```

**Causes:**
- Account suspended by administrator
- Violation of terms of service
- Suspicious activity detected

**Solution:**
- Contact support team
- Review account activity
- Appeal suspension if appropriate

## 📝 Validation Errors

### VALIDATION_ERROR (422)

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

**Common Validation Errors:**

#### Email Validation
- `"Email is required"`
- `"Invalid email format"`
- `"Email already exists"`

#### Password Validation
- `"Password is required"`
- `"Password must be at least 6 characters"`
- `"Password must contain at least one letter and one number"`

#### Product Validation
- `"Product name is required"`
- `"Weight must be greater than 0"`
- `"Harvest date must be in the past"`
- `"Location coordinates are required"`

#### QR Code Validation
- `"QR code is required"`
- `"Invalid QR code format"`
- `"QR code has expired"`

## 🔍 Resource Errors

### NOT_FOUND (404)

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

**Causes:**
- Batch ID doesn't exist
- User ID not found
- QR code not found
- API endpoint doesn't exist

**Solution:**
- Verify resource ID exists
- Check API endpoint URL
- Ensure resource hasn't been deleted

### RESOURCE_DELETED (404)

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_DELETED",
    "message": "This resource has been deleted"
  }
}
```

**Causes:**
- Batch was deleted by farmer
- User account was deleted
- QR code was invalidated

**Solution:**
- Contact resource owner
- Check if resource can be restored
- Create new resource if needed

## ⚡ Rate Limiting Errors

### RATE_LIMIT_EXCEEDED (429)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "retryAfter": 60
    }
  }
}
```

**Causes:**
- Too many API requests in short time
- Exceeded rate limit for specific endpoint
- IP address rate limited

**Solution:**
- Wait for rate limit to reset
- Implement exponential backoff
- Reduce request frequency
- Check rate limit headers

## 🗄️ Database Errors

### DATABASE_ERROR (500)

```json
{
  "success": false,
  "error": {
    "code": "DATABASE_ERROR",
    "message": "Database operation failed"
  }
}
```

**Causes:**
- Database connection issues
- Query timeout
- Database maintenance
- Constraint violations

**Solution:**
- Retry request after delay
- Contact support if persistent
- Check database status

### DUPLICATE_ENTRY (422)

```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_ENTRY",
    "message": "Resource already exists"
  }
}
```

**Causes:**
- Email already registered
- Batch code already exists
- QR code already generated

**Solution:**
- Use different unique identifier
- Check if resource can be updated instead
- Verify uniqueness requirements

## 🌐 Network Errors

### NETWORK_ERROR (500)

```json
{
  "success": false,
  "error": {
    "code": "NETWORK_ERROR",
    "message": "Network connection failed"
  }
}
```

**Causes:**
- Internet connection issues
- DNS resolution problems
- Server connectivity issues

**Solution:**
- Check internet connection
- Verify server status
- Retry request
- Contact support if persistent

## 🔧 Client-Side Error Handling

### JavaScript Example

```javascript
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        if (data.error.code === 'TOKEN_EXPIRED') {
          // Redirect to login
          redirectToLogin();
        } else {
          // Show authentication error
          showError('Please log in to continue');
        }
        break;
        
      case 403:
        showError('You don\'t have permission for this action');
        break;
        
      case 422:
        // Handle validation errors
        const details = data.error.details;
        details.forEach(detail => {
          showFieldError(detail.field, detail.message);
        });
        break;
        
      case 429:
        // Handle rate limiting
        const retryAfter = data.error.details?.retryAfter || 60;
        showError(`Too many requests. Please wait ${retryAfter} seconds.`);
        break;
        
      default:
        showError(data.error.message || 'An error occurred');
    }
  } else {
    // Network error
    showError('Network error. Please check your connection.');
  }
};
```

### React Native Example

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleApiError = async (error) => {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        // Clear stored token
        await AsyncStorage.removeItem('authToken');
        // Navigate to login
        navigation.navigate('Login');
        break;
        
      case 403:
        Alert.alert('Permission Denied', 'You don\'t have permission for this action');
        break;
        
      case 422:
        // Show validation errors
        const details = data.error.details;
        details.forEach(detail => {
          Alert.alert('Validation Error', `${detail.field}: ${detail.message}`);
        });
        break;
        
      case 429:
        Alert.alert('Rate Limited', 'Too many requests. Please wait a moment.');
        break;
        
      default:
        Alert.alert('Error', data.error.message || 'An error occurred');
    }
  } else {
    Alert.alert('Network Error', 'Please check your internet connection');
  }
};
```

## 📞 Getting Help

### For Developers
- **Check Error Code**: Use the error code to identify the issue
- **Review Error Details**: Additional information in the `details` field
- **Implement Proper Handling**: Use the examples above for error handling
- **Contact Support**: For persistent or unclear errors

### For Users
- **Clear Error Messages**: Human-readable error descriptions
- **Actionable Solutions**: Clear steps to resolve issues
- **Support Contact**: Direct contact information for help
- **Vietnamese Support**: Local language support available

## 🔄 Error Recovery

### Automatic Recovery
- **Token Refresh**: Automatic token renewal when possible
- **Retry Logic**: Exponential backoff for transient errors
- **Graceful Degradation**: Fallback options for non-critical errors

### Manual Recovery
- **User Guidance**: Clear instructions for manual recovery
- **Support Escalation**: When automatic recovery fails
- **Account Recovery**: Password reset and account restoration

---

*AgriTrace API Error Codes - Comprehensive error handling for reliable agricultural traceability platform.* 