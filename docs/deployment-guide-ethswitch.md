# EthSwitch Deployment Guide

**Version**: 2.0  
**Last Updated**: January 30, 2026  
**Provider**: PaySys Labs  
**Document Type**: Deployment and Installation Guide

---

## Table of Contents

1. [Pre-Deployment Requirements](#pre-deployment-requirements)
2. [System Architecture](#system-architecture)
3. [Installation Procedures](#installation-procedures)
4. [Configuration Setup](#configuration-setup)
5. [Database Initialization](#database-initialization)
6. [Security Configuration](#security-configuration)
7. [Network Configuration](#network-configuration)
8. [Testing and Validation](#testing-and-validation)
9. [Post-Deployment Steps](#post-deployment-steps)
10. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Requirements

### Hardware Requirements

| Component | Minimum | Recommended | Enterprise |
|-----------|---------|-------------|-----------|
| **CPU** | 4 cores | 8 cores | 16+ cores |
| **RAM** | 8 GB | 16 GB | 32+ GB |
| **Storage** | 100 GB | 500 GB | 2+ TB SSD |
| **Network** | 100 Mbps | 1 Gbps | 10 Gbps |

### Software Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| **Operating System** | Ubuntu 20.04 LTS / Windows Server 2019+ | Server OS |
| **Node.js** | 16.13.0 or higher | Runtime Environment |
| **PostgreSQL** | 12.0 or higher | Database Management |
| **Redis** | 6.0 or higher | Caching Layer |
| **Docker** | 20.10+ (Optional) | Containerization |
| **OpenSSL** | 1.1.1+ | Encryption/SSL/TLS |

### Network Requirements

- **Outbound Ports**: 443 (HTTPS), 25 (SMTP), 53 (DNS)
- **Inbound Ports**: 443 (Application), 5432 (PostgreSQL), 6379 (Redis)
- **SSL/TLS**: 1.2 or higher required
- **IP Whitelist**: Configure firewall rules as required
- **DNS Records**: Configure A records and MX records for email notifications

---

## System Architecture

### Deployment Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Load Balancer (Nginx)                    │
└──────────────┬──────────────────┬──────────────────┬─────────┘
               │                  │                  │
        ┌──────▼──────┐   ┌───────▼────────┐  ┌────▼────────┐
        │  App Node 1  │   │  App Node 2     │  │ App Node 3  │
        │  (Port 3000) │   │  (Port 3001)    │  │ (Port 3002) │
        └──────┬──────┘   └───────┬────────┘  └────┬────────┘
               │                  │                  │
        ┌──────▴──────────────────▴──────────────────▴─────────┐
        │          Shared Cache (Redis 6379)                   │
        └──────────────────────────────────────────────────────┘
               │
        ┌──────▴─────────────────────────────────────────────┐
        │  Database Cluster (PostgreSQL 5432)                │
        │  ├─ Primary (Read/Write)                           │
        │  └─ Replica (Read Only)                            │
        └───────────────────────────────────────────────────┘
```

### Component Description

- **Load Balancer**: Distributes traffic across application nodes
- **Application Nodes**: Independent Node.js instances for horizontal scaling
- **Cache Layer**: Redis for session management and data caching
- **Database Cluster**: PostgreSQL with replication for high availability

---

## Installation Procedures

### 1. Prepare the Environment

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install required dependencies
sudo apt install -y curl wget git build-essential

# Verify Node.js installation
node --version
npm --version
```

### 2. Install Node.js and npm

```bash
# Using NodeSource repository (Ubuntu)
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

### 3. Clone Application Repository

```bash
# Clone the EthSwitch repository
git clone https://github.com/paysyslabs/ethswitch.git
cd ethswitch

# Checkout production branch
git checkout production

# Install dependencies
npm install
```

### 4. Install PostgreSQL Database

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create application database
sudo -u postgres createdb ethswitch_db
sudo -u postgres createuser ethswitch_user --password
```

### 5. Install Redis Cache

```bash
# Install Redis
sudo apt install -y redis-server

# Start Redis service
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Verify Redis is running
redis-cli ping
```

---

## Configuration Setup

### Environment Variables (.env File)

Create `.env` file in application root directory:

```env
# Application Settings
NODE_ENV=production
PORT=3000
APP_NAME=EthSwitch
APP_URL=https://ethswitch.example.com

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ethswitch_db
DB_USER=ethswitch_user
DB_PASSWORD=secure_password_here
DB_SSL=true

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password
REDIS_DB=0

# Authentication Settings
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=24h
API_KEY_PREFIX=ETHSWITCH_

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASSWORD=email_password
SMTP_FROM=noreply@ethswitch.example.com

# Security Settings
ENCRYPTION_KEY=your_encryption_key_here
TLS_VERSION=1.2
CIPHER_SUITE=ECDHE-RSA-AES256-GCM-SHA384

# Logging Configuration
LOG_LEVEL=info
LOG_FORMAT=json
LOG_OUTPUT=file

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Configuration File (config.js)

```javascript
module.exports = {
  app: {
    name: process.env.APP_NAME,
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true'
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB
  },
  security: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRY,
    encryptionKey: process.env.ENCRYPTION_KEY
  }
};
```

---

## Database Initialization

### Create Database Schema

```bash
# Run database migrations
npm run migrate:latest

# Seed initial data
npm run seed:production

# Verify database connection
npm run db:validate
```

### Initialize Database Tables

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(18,8) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Security Configuration

### SSL/TLS Certificate Setup

```bash
# Generate self-signed certificate (development only)
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# For production, obtain certificate from Certificate Authority
# Example: Let's Encrypt with Certbot
sudo certbot certonly --standalone -d ethswitch.example.com
```

### Firewall Configuration

```bash
# Enable UFW (Ubuntu Firewall)
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Allow PostgreSQL (internal only)
sudo ufw allow from 10.0.0.0/8 to any port 5432

# Allow Redis (internal only)
sudo ufw allow from 10.0.0.0/8 to any port 6379
```

### Password Policy Configuration

| Policy | Requirement | Implementation |
|--------|-------------|-----------------|
| **Minimum Length** | 12 characters | Application validation |
| **Complexity** | Uppercase + lowercase + numbers + symbols | Application validation |
| **Expiration** | 90 days | Database trigger |
| **History** | Cannot reuse last 5 passwords | Password hash history |
| **Lockout** | 5 failed attempts = 30 min lockout | Cache-based tracking |

---

## Network Configuration

### Nginx Reverse Proxy Configuration

```nginx
upstream ethswitch_app {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name ethswitch.example.com;

    ssl_certificate /etc/letsencrypt/live/ethswitch.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ethswitch.example.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://ethswitch_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=general:10m rate=100r/s;
    limit_req zone=general burst=200 nodelay;
}

server {
    listen 80;
    server_name ethswitch.example.com;
    return 301 https://$server_name$request_uri;
}
```

### Load Balancer Configuration

| Setting | Value | Purpose |
|---------|-------|---------|
| **Algorithm** | Round Robin | Even distribution |
| **Health Check** | 10s interval | Monitor node health |
| **Timeout** | 30s | Connection timeout |
| **Persistence** | Cookie-based | Session stickiness |
| **Failover** | Automatic | High availability |

---

## Testing and Validation

### Health Check Testing

```bash
# Test application health
curl -X GET https://ethswitch.example.com/api/health

# Expected response:
# { "status": "healthy", "timestamp": "2026-01-30T14:35:22Z" }
```

### Database Connection Testing

```bash
# Verify database connectivity
psql -U ethswitch_user -d ethswitch_db -c "SELECT version();"

# Run migrations
npm run migrate:verify
```

### Redis Connection Testing

```bash
# Connect to Redis and test
redis-cli ping

# Should return: PONG
```

### API Testing Checklist

| Test | Command | Expected Result |
|------|---------|-----------------|
| **API Health** | `curl -X GET /api/health` | 200 OK |
| **Authentication** | `curl -X POST /api/auth/login` | 200 OK |
| **User Creation** | `POST /api/users` | 201 Created |
| **Transaction Create** | `POST /api/transactions` | 201 Created |
| **Data Retrieval** | `GET /api/transactions` | 200 OK |

---

## Post-Deployment Steps

### 1. Initialize Admin User

```bash
# Create initial administrator account
npm run create:admin --username=admin@ethswitch.com --password=TempPassword123!
```

### 2. Verify All Services

```bash
# Check application status
systemctl status nodejs

# Check database status
sudo systemctl status postgresql

# Check Redis status
sudo systemctl status redis-server

# Check Nginx status
sudo systemctl status nginx
```

### 3. Configure Backups

```bash
# Create backup directory
mkdir -p /backups/ethswitch

# Setup daily database backup
0 2 * * * pg_dump ethswitch_db > /backups/ethswitch/db-$(date +\%Y\%m\%d).sql

# Setup daily Redis backup
0 3 * * * redis-cli BGSAVE > /backups/ethswitch/redis-$(date +\%Y\%m\%d).log
```

### 4. Setup Monitoring and Alerts

```bash
# Install PM2 for process management
sudo npm install -g pm2

# Create PM2 configuration file
pm2 start ecosystem.config.js --env production

# Generate startup script
pm2 startup
pm2 save
```

### 5. Configure Logging

```bash
# Create log directory
mkdir -p /var/log/ethswitch

# Setup log rotation
cat > /etc/logrotate.d/ethswitch <<EOF
/var/log/ethswitch/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 ethswitch ethswitch
    sharedscripts
}
EOF
```

---

## Troubleshooting

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Port 3000 already in use** | Another process using port | `lsof -i :3000` and kill process |
| **Database connection failed** | Wrong credentials/host | Verify DB_* environment variables |
| **Redis connection timeout** | Redis not running | `sudo systemctl start redis-server` |
| **SSL certificate error** | Expired/invalid certificate | Renew certificate with certbot |
| **High memory usage** | Memory leak/insufficient RAM | Restart application and check logs |

### Log Files Location

| Component | Log Location | Command |
|-----------|--------------|---------|
| **Application** | `/var/log/ethswitch/app.log` | `tail -f /var/log/ethswitch/app.log` |
| **Database** | `/var/log/postgresql/` | `sudo tail -f /var/log/postgresql/postgresql.log` |
| **Redis** | `/var/log/redis/redis-server.log` | `sudo tail -f /var/log/redis/redis-server.log` |
| **Nginx** | `/var/log/nginx/access.log` | `tail -f /var/log/nginx/access.log` |

### Validation Commands

```bash
# Verify all services running
pm2 status

# Check system resources
top

# Monitor network connections
netstat -tlnp | grep :3000

# Verify database replication
psql -U ethswitch_user -d ethswitch_db -c "SELECT state FROM pg_stat_replication;"
```

---

**Deployment Support**
- **Documentation**: https://docs.ethswitch.example.com
- **Technical Support**: support@paysyslabs.com
- **Emergency Hotline**: +1-800-ETHSWITCH
- **Status Page**: https://status.ethswitch.example.com
