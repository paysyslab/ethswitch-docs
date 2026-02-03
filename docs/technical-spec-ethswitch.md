# Technical Specification Document

**Version**: 2.0  
**Last Updated**: January 30, 2026  
**Provider**: PaySys Labs  
**Document Type**: Technical Architecture and Implementation Specification

---

## Table of Contents

1. [Technical Overview](#technical-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [API Architecture](#api-architecture)
6. [Security Architecture](#security-architecture)
7. [Performance Architecture](#performance-architecture)
8. [Integration Architecture](#integration-architecture)
9. [Deployment Architecture](#deployment-architecture)
10. [Disaster Recovery](#disaster-recovery)

---

## Technical Overview

### Design Principles

| Principle | Implementation | Benefit |
|-----------|----------------|---------|
| **Scalability** | Horizontal scaling with stateless services | Handle growth without redesign |
| **Reliability** | Redundancy and failover mechanisms | 99.9% uptime SLA |
| **Security** | Defense-in-depth approach | Multiple security layers |
| **Maintainability** | Clean architecture with separation of concerns | Easy updates and debugging |
| **Performance** | Caching and optimization strategies | `<200ms` API response time |

### Core Technologies

- **Runtime**: Node.js 16+ with Express.js framework
- **Database**: PostgreSQL 12+ with replication
- **Caching**: Redis 6+ for session and data caching
- **Message Queue**: RabbitMQ for asynchronous processing
- **Reverse Proxy**: Nginx for load balancing
- **Containerization**: Docker for deployment
- **Monitoring**: Prometheus + Grafana for metrics
- **Logging**: ELK Stack for centralized logging

---

## System Architecture

### Microservices Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway / Load Balancer              │
│                      (Nginx / Kong)                          │
└──────────┬─────────┬────────────┬─────────┬──────────────────┘
           │         │            │         │
    ┌──────▼──┐ ┌───▼────┐ ┌──────▼──┐ ┌──▼──────────┐
    │Transaction│ │User    │ │Reporting│ │Audit       │
    │Service    │ │Service │ │Service  │ │Service     │
    └──────┬──┘ └───┬────┘ └──────┬──┘ └──┬──────────┘
           │        │            │       │
      ┌────▼────────▼────────────▼───────▼─────┐
      │      Shared Services                   │
      │  ├─ Authentication Service             │
      │  ├─ Authorization Service              │
      │  └─ Notification Service               │
      └────┬─────────────────────────────────┬─┘
           │                                 │
      ┌────▼──────┐               ┌──────────▼────┐
      │Database   │               │Cache          │
      │(PostgreSQL)│               │(Redis)        │
      └───────────┘               └───────────────┘
```

### Service Components

| Service | Responsibility | Language | Dependencies |
|---------|-----------------|----------|--------------|
| **Transaction Service** | Transaction processing, validation | Node.js | Database, Cache |
| **User Service** | User management, authentication | Node.js | Database, Cache |
| **Reporting Service** | Report generation, analytics | Node.js | Database, Cache |
| **Audit Service** | Audit logging, compliance | Node.js | Database |
| **Notification Service** | Email, SMS, webhook notifications | Node.js | Message Queue |
| **Integration Service** | External integrations | Node.js | Database |

---

## Technology Stack

### Backend Stack

```
Language: JavaScript/TypeScript (Node.js 16+)
Framework: Express.js 4.x
Runtime: Node.js 16.13.0+
Package Manager: npm 8.x

Core Dependencies:
├── express (Web framework)
├── sequelize (ORM)
├── redis (Caching client)
├── amqplib (Message queue client)
├── jsonwebtoken (JWT authentication)
├── bcryptjs (Password hashing)
├── joi (Data validation)
├── winston (Logging)
├── dotenv (Environment configuration)
└── axios (HTTP client)
```

### Database Stack

```
Primary: PostgreSQL 12+
├── Query Language: SQL
├── Connection Pooling: PgBouncer
├── Replication: Streaming replication
├── Backup: pg_dump + WAL archiving
└── Optimization: EXPLAIN ANALYZE

Extensions:
├── uuid-ossp (UUID generation)
├── pgcrypto (Cryptographic functions)
└── pg_trgm (Full-text search)
```

### Caching Stack

```
Primary: Redis 6+
├── Data Structures: Strings, Lists, Hashes, Sets
├── Expiration: TTL-based eviction
├── Persistence: RDB + AOF
└── Clustering: Redis Cluster for HA

Use Cases:
├── Session Management
├── Database Query Caching
├── Rate Limiting Counters
├── Real-time Metrics
└── Pub/Sub for Events
```

### Infrastructure Stack

```
Reverse Proxy: Nginx
├── Load Balancing: Round-robin, least connections
├── SSL/TLS Termination: TLS 1.2+
├── Compression: gzip, brotli
└── Caching: Proxy caching

Message Queue: RabbitMQ
├── Pattern: AMQP protocol
├── Guarantees: At-least-once delivery
├── Features: Dead-letter queues, TTL
└── Clustering: High availability setup

Container Platform: Docker
├── Registry: Docker Hub / Private registry
├── Orchestration: Docker Compose (dev), Kubernetes (prod)
└── Networking: Bridge networks with service discovery
```

---

## Database Design

### Database Schema Overview

```sql
-- Users table
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

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  amount DECIMAL(18,8) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  processed_at TIMESTAMP,
  completed_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_transactions_status (status),
  INDEX idx_transactions_sender (sender_id),
  INDEX idx_transactions_date (created_at)
);

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  resource_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_user (user_id),
  INDEX idx_audit_date (created_at)
);

-- Accounts table
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  account_number VARCHAR(255) UNIQUE NOT NULL,
  balance DECIMAL(18,8) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Performance Optimization

| Strategy | Implementation | Impact |
|----------|-----------------|--------|
| **Indexing** | B-tree indexes on frequently queried columns | 10-100x faster queries |
| **Partitioning** | Partition large tables by date/status | Reduced scan time |
| **Connection Pooling** | PgBouncer with 100+ connections | Better concurrency |
| **Query Optimization** | EXPLAIN ANALYZE, rewrite slow queries | 50% reduction in query time |
| **Caching** | Redis for frequently accessed data | 1000x faster for cache hits |

---

## API Architecture

### RESTful API Design

**Base URL**: `https://api.ethswitch.example.com/api/v1`

**Authentication**: Bearer token in Authorization header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Endpoint Categories

#### Transaction Endpoints

```
POST   /transactions              - Create transaction
GET    /transactions              - List transactions
GET    /transactions/{id}         - Get transaction details
PUT    /transactions/{id}/approve - Approve transaction
PUT    /transactions/{id}/reject  - Reject transaction
POST   /transactions/bulk         - Process bulk transactions
GET    /transactions/{id}/status  - Get transaction status
```

#### User Endpoints

```
POST   /users                      - Create user
GET    /users                      - List users
GET    /users/{id}                 - Get user details
PUT    /users/{id}                 - Update user
DELETE /users/{id}                 - Delete user
PUT    /users/{id}/roles           - Assign roles
POST   /users/{id}/password/reset  - Reset password
```

#### Report Endpoints

```
GET    /reports                    - List available reports
POST   /reports                    - Generate report
GET    /reports/{id}               - Get report
GET    /reports/{id}/download      - Download report
DELETE /reports/{id}               - Delete report
POST   /reports/schedule           - Schedule report
```

### API Response Format

**Success Response (200 OK)**:
```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... },
  "timestamp": "2026-01-30T14:35:22.847Z",
  "requestId": "REQ-12345"
}
```

**Error Response (400+ errors)**:
```json
{
  "success": false,
  "statusCode": 400,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be greater than 0"
      }
    ]
  },
  "timestamp": "2026-01-30T14:35:22.847Z",
  "requestId": "REQ-12345"
}
```

---

## Security Architecture

### Authentication Flow

```
User Request
    ↓
┌─────────────────────┐
│ Extract credentials │ (Username + Password)
└────────┬────────────┘
         ↓
┌─────────────────────┐
│ Verify credentials  │ (Hash comparison)
└────────┬────────────┘
         ↓
┌─────────────────────┐
│ Generate JWT token  │ (HS256, 24h expiry)
└────────┬────────────┘
         ↓
┌─────────────────────┐
│ Return token to     │ (Bearer token in response)
│ client              │
└─────────────────────┘
```

### Authorization Matrix

| Role | Transactions | Users | Reports | Audit | Admin |
|------|-------------|-------|---------|-------|-------|
| **Admin** | RW | RW | RW | RW | RW |
| **Manager** | RW | R | RW | R | - |
| **Operator** | RW | - | R | R | - |
| **Analyst** | R | - | R | R | - |
| **Support** | R | R | R | R | - |

### Encryption Standards

| Data Type | Algorithm | Standard |
|-----------|-----------|----------|
| **At Rest** | AES-256-GCM | NIST approved |
| **In Transit** | TLS 1.2+ | Industry standard |
| **Password** | bcrypt with salt | OWASP standard |
| **API Keys** | HMAC-SHA256 | JWT standard |
| **Database** | pg_crypto | PostgreSQL extension |

---

## Performance Architecture

### Caching Strategy

```
User Request
    ↓
┌─────────────────────────────┐
│ Check Redis cache           │
└────────┬────────────────────┘
         ├─ Cache HIT (80%)     → Return immediately
         │
         └─ Cache MISS (20%)
                ↓
         ┌──────────────────────┐
         │ Query Database       │
         └────────┬─────────────┘
                  ↓
         ┌──────────────────────┐
         │ Store in Redis (TTL) │
         └────────┬─────────────┘
                  ↓
         Return to client
```

### Cache Configuration

| Data Type | TTL | Eviction | Use Case |
|-----------|-----|----------|----------|
| **Sessions** | 24 hours | LRU | User authentication |
| **User Data** | 1 hour | LRU | User profiles |
| **Transaction Details** | 10 minutes | FIFO | Transaction lookups |
| **Reports** | 30 minutes | LRU | Report results |
| **System Config** | 24 hours | LRU | Configuration data |

### Database Query Optimization

**Example: Transaction Listing Query Optimization**

```javascript
// BEFORE: N+1 query problem
const transactions = await Transaction.findAll();
for (let trans of transactions) {
  trans.sender = await User.findById(trans.sender_id);  // N queries
  trans.recipient = await User.findById(trans.recipient_id);
}

// AFTER: Optimized with JOIN and eager loading
const transactions = await Transaction.findAll({
  include: [
    { model: User, as: 'sender' },
    { model: User, as: 'recipient' }
  ],
  limit: 20,
  order: [['created_at', 'DESC']]
});
```

---

## Integration Architecture

### Event-Driven Architecture

**Event Flow**:
```
Transaction Created
    ↓
┌─────────────────────────────┐
│ Emit to Message Queue       │ (transaction.created)
└────────┬────────────────────┘
         ├─ Audit Service
         ├─ Notification Service
         ├─ Reporting Service
         └─ Webhook Service

Each service processes independently
└─ No blocking, asynchronous
└─ Retry on failure with backoff
└─ Dead letter queue for failures
```

### Webhook Delivery

**Webhook Configuration**:
```javascript
{
  "id": "webhook-123",
  "url": "https://external-system.com/webhooks/transactions",
  "events": ["transaction.created", "transaction.completed"],
  "headers": { "Authorization": "Bearer..." },
  "retryPolicy": {
    "maxAttempts": 5,
    "backoffMultiplier": 2,
    "initialDelay": 1000
  }
}
```

**Delivery Guarantee**: At-least-once with exponential backoff retry

---

## Deployment Architecture

### Container Structure

```
ethswitch-api/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
└── helm/ (Kubernetes manifests)
    ├── deployment.yaml
    ├── service.yaml
    ├── configmap.yaml
    └── secret.yaml
```

### Multi-Environment Deployment

| Environment | Resources | Replicas | Backup | Monitoring |
|-------------|-----------|----------|--------|-----------|
| **Development** | 2 CPU, 2GB RAM | 1 | Daily | Basic |
| **Staging** | 4 CPU, 4GB RAM | 2 | Daily | Full |
| **Production** | 8 CPU, 8GB RAM | 3+ | Hourly | Premium |

---

## Disaster Recovery

### Backup Strategy

**Database Backups**:
```
Full Backup: Weekly (Sunday 2 AM)
Incremental Backup: Daily (2 AM UTC)
WAL Archiving: Continuous
Retention: 90 days full backups, 30 days incremental

Recovery Time Objective (RTO): 1 hour
Recovery Point Objective (RPO): 15 minutes
```

**Backup Verification**:
- Weekly restore test on staging database
- Monthly full disaster recovery drill
- Backup integrity verification daily

### High Availability Setup

**Database HA**:
```
Primary (Active)    Replica (Standby)
    ├─ Write         ├─ Read-only
    ├─ Master        ├─ Hot standby
    └─ Streaming     └─ Auto-promote
        replication       on failure
```

**Application HA**:
- Multiple application instances behind load balancer
- Health checks every 10 seconds
- Automatic failover on instance failure
- Zero-downtime deployments with rolling updates

---

**Technical Review Approval**

| Role | Signature | Date |
|------|-----------|------|
| **Architect** | [Signature] | 2026-01-30 |
| **Security Lead** | [Signature] | 2026-01-30 |
| **DBA** | [Signature] | 2026-01-30 |
