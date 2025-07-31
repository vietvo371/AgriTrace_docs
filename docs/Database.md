# Database Schema Documentation

## 📊 Overview

AgriTrace uses a **MySQL/PostgreSQL** relational database to store agricultural product traceability data. The database is designed to support QR code generation, batch management, user reviews, and access tracking for Vietnamese farmers and cooperatives.

## 🏗️ Database Architecture

### Core Tables
- **Users** - Farmer and cooperative management
- **Products** - Product catalog management  
- **Batches** - Product batch tracking with QR codes
- **Batch_Images** - Image management for batches
- **Reviews** - Consumer feedback system
- **QR_Access_Logs** - QR code scanning analytics

## 👥 Users Table

Manages farmer and cooperative information.

```sql
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    profile_image VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    role ENUM('farmer', 'cooperative') NOT NULL,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone_number),
    INDEX idx_role (role)
);
```

### Sample Data
```sql
INSERT INTO Users (full_name, phone_number, email, password_hash, address, role) VALUES
('Nguyen Van A', '0901234567', 'farmer@example.com', '$2b$10$...', 'Xa Tan Binh, Huyen Long An, Tinh Long An', 'farmer'),
('Hop Tac Xa Xoai Long An', '0909876543', 'coop@example.com', '$2b$10$...', 'Xa Tan Thanh, Huyen Long An, Tinh Long An', 'cooperative');
```

## 🍎 Products Table

Manages product catalog for traceability.

```sql
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    INDEX idx_name (name)
);
```

### Sample Data
```sql
INSERT INTO Products (name, description) VALUES
('Xoai Cat Chu', 'Xoai Cat Chu Long An - Giong ngon truyen thong'),
('Rau Cai Xanh', 'Rau cai xanh tuoi ngon'),
('Cam Sanh', 'Cam Sanh mien Tay - Ngot mat tu nhien');
```

## 📦 Batches Table

Core table for product batch management with QR codes.

```sql
CREATE TABLE Batches (
    batch_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    batch_code VARCHAR(50) UNIQUE NOT NULL,
    weight FLOAT NOT NULL,
    variety VARCHAR(255),
    planting_date DATE,
    harvest_date DATE,
    cultivation_method VARCHAR(100),
    location VARCHAR(500) NOT NULL,
    gps_coordinates VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    qr_code VARCHAR(500),
    qr_expiry DATETIME,
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
    
    INDEX idx_batch_code (batch_code),
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id),
    INDEX idx_harvest_date (harvest_date),
    INDEX idx_qr_expiry (qr_expiry)
);
```

### Sample Data
```sql
INSERT INTO Batches (user_id, product_id, batch_code, weight, variety, planting_date, harvest_date, cultivation_method, location, gps_coordinates, qr_code, qr_expiry) VALUES
(1, 1, 'BATCH20250722_001', 20.5, 'Cat Chu Long An', '2025-01-15', '2025-07-20', 'huu co', 'Xa Tan Binh, Huyen Long An, Tinh Long An', '10.123456,106.789012', 'qr_20250722_001.png', '2026-01-22 00:00:00'),
(1, 2, 'BATCH20250722_002', 5.0, 'Cai Xanh', '2025-02-01', '2025-07-18', 'truyen thong', 'Xa Tan Binh, Huyen Long An, Tinh Long An', '10.123457,106.789013', 'qr_20250722_002.png', '2026-01-22 00:00:00');
```

## 📸 Batch_Images Table

Manages images for product batches.

```sql
CREATE TABLE Batch_Images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_type ENUM('farm', 'product', 'farmer') NOT NULL,
    
    FOREIGN KEY (batch_id) REFERENCES Batches(batch_id) ON DELETE CASCADE,
    
    INDEX idx_batch_id (batch_id),
    INDEX idx_image_type (image_type)
);
```

### Sample Data
```sql
INSERT INTO Batch_Images (batch_id, image_url, image_type) VALUES
(1, '/uploads/farm_20250722_001.jpg', 'farm'),
(1, '/uploads/product_20250722_001.jpg', 'product'),
(1, '/uploads/farmer_20250722_001.jpg', 'farmer');
```

## ⭐ Reviews Table

Consumer feedback and rating system.

```sql
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    user_id INT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (batch_id) REFERENCES Batches(batch_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    
    INDEX idx_batch_id (batch_id),
    INDEX idx_user_id (user_id),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at)
);
```

### Sample Data
```sql
INSERT INTO Reviews (batch_id, user_id, rating, comment) VALUES
(1, NULL, 5, 'Xoai ngon qua! Rat tuoi va ngot'),
(1, NULL, 4, 'Chat luong tot, se mua lai'),
(1, NULL, 5, 'Nguon goc ro rang, an tam');
```

## 📊 QR_Access_Logs Table

Tracks QR code scanning analytics.

```sql
CREATE TABLE QR_Access_Logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT NOT NULL,
    access_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    device_info VARCHAR(500),
    
    FOREIGN KEY (batch_id) REFERENCES Batches(batch_id) ON DELETE CASCADE,
    
    INDEX idx_batch_id (batch_id),
    INDEX idx_access_time (access_time),
    INDEX idx_ip_address (ip_address)
);
```

### Sample Data
```sql
INSERT INTO QR_Access_Logs (batch_id, ip_address, device_info) VALUES
(1, '192.168.1.100', 'iPhone 14, iOS 17.0'),
(1, '192.168.1.101', 'Samsung Galaxy S23, Android 13'),
(1, '192.168.1.102', 'Desktop Chrome 120.0');
```

## 🔗 Database Relationships

| Table | Primary Key | Foreign Keys | Description |
|-------|-------------|--------------|-------------|
| **Users** | `user_id` | - | Core user management |
| **Products** | `product_id` | - | Product catalog |
| **Batches** | `batch_id` | `user_id`, `product_id` | Main traceability table |
| **Batch_Images** | `image_id` | `batch_id` | Image management |
| **Reviews** | `review_id` | `batch_id`, `user_id` | Consumer feedback |
| **QR_Access_Logs** | `log_id` | `batch_id` | Analytics tracking |

## 📈 Sample Queries

### Get Batch Details with User and Product Info
```sql
SELECT 
    b.batch_code,
    b.weight,
    b.variety,
    b.harvest_date,
    b.cultivation_method,
    b.location,
    u.full_name as farmer_name,
    p.name as product_name,
    AVG(r.rating) as avg_rating,
    COUNT(r.review_id) as review_count
FROM Batches b
JOIN Users u ON b.user_id = u.user_id
JOIN Products p ON b.product_id = p.product_id
LEFT JOIN Reviews r ON b.batch_id = r.batch_id
WHERE b.batch_id = 1
GROUP BY b.batch_id;
```

### Get QR Code Access Analytics
```sql
SELECT 
    b.batch_code,
    COUNT(qal.log_id) as scan_count,
    DATE(qal.access_time) as scan_date,
    COUNT(DISTINCT qal.ip_address) as unique_visitors
FROM Batches b
LEFT JOIN QR_Access_Logs qal ON b.batch_id = qal.batch_id
WHERE b.user_id = 1
GROUP BY b.batch_id, DATE(qal.access_time)
ORDER BY scan_date DESC;
```

### Get Farmer Performance Metrics
```sql
SELECT 
    u.full_name,
    COUNT(b.batch_id) as total_batches,
    SUM(b.weight) as total_weight,
    AVG(r.rating) as avg_rating,
    COUNT(DISTINCT qal.ip_address) as total_scans
FROM Users u
LEFT JOIN Batches b ON u.user_id = b.user_id
LEFT JOIN Reviews r ON b.batch_id = r.batch_id
LEFT JOIN QR_Access_Logs qal ON b.batch_id = qal.batch_id
WHERE u.role = 'farmer'
GROUP BY u.user_id;
```

## 🔒 Security Features

### Data Protection
- **Password Hashing**: All passwords are hashed using bcrypt
- **IP Anonymization**: IP addresses are partially masked for privacy
- **QR Expiration**: QR codes expire after 6 months for security
- **Input Validation**: All user inputs are validated and sanitized

### Access Control
- **Role-based Access**: Different permissions for farmers vs cooperatives
- **Session Management**: Secure session handling with JWT tokens
- **Rate Limiting**: API rate limiting to prevent abuse

## 📊 Performance Optimization

### Indexes
```sql
-- Composite indexes for common queries
CREATE INDEX idx_batches_user_date ON Batches(user_id, harvest_date);
CREATE INDEX idx_reviews_batch_rating ON Reviews(batch_id, rating);
CREATE INDEX idx_logs_batch_time ON QR_Access_Logs(batch_id, access_time);
```

### Query Optimization
- Use prepared statements for repeated queries
- Implement connection pooling
- Cache frequently accessed data
- Optimize image storage and delivery

## 🔄 Data Maintenance

### Backup Strategy
- **Daily Backups**: Automated daily database backups
- **Point-in-time Recovery**: Support for specific time recovery
- **Offsite Storage**: Secure cloud backup storage

### Cleanup Procedures
```sql
-- Clean expired QR codes (older than 6 months)
DELETE FROM Batches WHERE qr_expiry < NOW();

-- Archive old access logs (older than 1 year)
-- Move to archive table or delete based on policy
```

## 🚀 Migration Scripts

### Database Setup
```sql
-- Create database
CREATE DATABASE agritrace_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use database
USE agritrace_db;

-- Run all CREATE TABLE statements above
-- Insert sample data
-- Create indexes
```

### Version Control
- Use semantic versioning for schema changes
- Maintain migration scripts for each version
- Test migrations on staging environment first
- Document all schema changes 