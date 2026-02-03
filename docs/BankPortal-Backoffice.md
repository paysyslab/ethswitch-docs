# EthBridge Bank Portal - Back Office 

## Overview

The EthBridge Bank Portal Back Office is a comprehensive administrative interface designed for managing transactions, users, certificates, and system configurations. This documentation covers all features and functionality available in the back office portal.

---

## Table of Contents

1. [Dashboard](#dashboard)
2. [User Management](#user-management)
3. [Role Management](#role-management)
4. [Transaction Services](#transaction-services)
5. [Batch Payments](#batch-payments)
6. [Reports & Analytics](#reports--analytics)
7. [Security & Compliance](#security--compliance)
8. [Configurations](#configurations)

---

## Dashboard

### Overview

The Dashboard provides a comprehensive overview of your banking operations and transactions with real-time metrics and visual analytics.

![Dashboard Interface](./img/EBP-Dashboard.png)

### Dashboard Data

The dashboard displays updated information with the timestamp showing "Dashboard data last updated at 12:45:57 PM"

### Key Metrics

#### Transaction Types

**1. P2P Transfers**
- **Count**: 1,243 transactions
- **Volume**: ETB 4,258,900
- **Status**: Shows Success and Failed counts
- **Change**: ↑ 12% (green indicator)

**2. P2M Payments**
- **Count**: 965 transactions
- **Volume**: ETB 1,236,800
- **Status**: Shows Success and Failed counts
- **Change**: ↑ 8% (green indicator)

**3. QRC Payments**
- **Count**: 892 transactions
- **Volume**: ETB 2,134,500
- **Status**: Shows Success and Failed counts
- **Change**: ↑ 8% (green indicator)

**4. RTP Payments**
- **Count**: 567 transactions
- **Volume**: ETB 1,876,300
- **Status**: Shows Success and Failed counts
- **Change**: ↓ 5% (red indicator)

**5. Bulk Payments**
- **Count**: 124 transactions
- **Volume**: ETB 5,432,100
- **Status**: Shows Success and Failed counts
- **Change**: ↑ 5% (green indicator)

**6. Bulk Receiving**
- **Count**: 98 transactions
- **Volume**: ETB 4,321,000
- **Status**: Shows Success and Failed counts
- **Change**: ↓ 5% (red indicator)

**7. AUAS Registered**
- **Count**: 432 transactions
- **Volume**: Varies
- **Status**: Shows Success and Failed counts
- **Change**: ↑ 24% (green indicator)

### Analytics Visualizations

#### Transaction Count Graph
- Time-series graph showing transaction volume trends
- Color-coded by transaction type (P2P, P2M, QRC, RTP)
- Displays hourly transaction counts throughout the day (00:00 - 20:00)
- Peak transaction volume visible during business hours

#### Transaction Distribution Pie Chart
- Visual breakdown of transactions by type
- Color-coded segments:
  - **P2P**: Dark blue (largest segment)
  - **P2M**: Orange
  - **QRC**: Light blue
  - **RTP**: Gray

#### Transaction Value Bar Chart
- Shows monetary transaction values over time periods
- Displays values in ETB (Ethiopian Birr)
- Grouped by transaction type
- Time periods from 00:00 to 20:00

#### System Status Indicators
- **Core Banking**: Operational (green)
- **Payment Gateway**: Operational (green)
- **Mobile Banking**: Operational (green)
- **ATM Network**: Degraded (orange/yellow)

### Recent Transactions Table

| Date & Time | Sender Bank | Receiver Bank | Amount | Type | Status |
|-------------|-------------|---------------|--------|------|--------|
| 2023-05-10 14:30:22 | AMHRETAA (Amhara Bank S.C.) | CBEETAA (Commercial Bank of Ethiopia) | ETB 5,000 | P2P | Success ✓ |
| 2023-05-10 14:26:15 | AMHRETAA (Amhara Bank S.C.) | DASHETAA (Dashen Bank S.C.) | ETB 3,500 | P2M | Failed ✗ |
| 2023-05-10 14:25:47 | BUNAETAA (Bunna International Bank S.C.) | AMHRETAA (Amhara Bank S.C.) | ETB 2,800 | P2P | Success ✓ |
| 2023-05-10 14:20:33 | NIBIIETAA (NIB International Bank S.C. (NIB)) | AMHRETAA (Amhara Bank S.C.) | ETB 4,000 | P2M | Success ✓ |
| 2023-05-10 14:15:19 | AMHRETAA (Amhara Bank S.C.) | WEGAETAA (Wegagen Bank S.C.) | ETB 1,500 | P2P | Failed ✗ |

---

## User Management

### Overview

The User Management module provides comprehensive user administration capabilities including user creation, modification, deletion, and status management.

![User Management Interface](./img/EBP-UserManagement.png)

### Features

#### Create New User
- **Button**: "+ Add New User" (orange button)
- Allows administrators to create new user accounts
- Assigns roles and permissions during user creation
- Sets initial passwords and account status

#### Search Users
- **Search Bar**: "Search users..."
- Quick search by:
  - User name
  - Email address
  - Phone number

#### User Listing Table

| Column | Description |
|--------|-------------|
| **Name** | User's full name and phone number |
| **Email** | User's email address |
| **Role** | Assigned role (Administrator, Manager, Operator, Auditor) |
| **Status** | Account status indicator (Active, Inactive, Locked) |
| **Last Login** | Timestamp of last successful login |
| **Actions** | Edit, Reset Password, Delete |

### Sample Users

#### 1. John Doe
- **Phone**: +1234567890
- **Email**: john.doe@example.com
- **Role**: Administrator
- **Status**: Active (green)
- **Last Login**: 2023-05-10 09:45:22
- **Actions**: Edit, Reset Password, Delete

#### 2. Jane Smith
- **Phone**: +1987654321
- **Email**: jane.smith@example.com
- **Role**: Manager
- **Status**: Active (green)
- **Last Login**: 2023-05-09 14:30:10
- **Actions**: Edit, Reset Password, Delete

#### 3. Michael Johnson
- **Phone**: +1122334455
- **Email**: michael.johnson@example.com
- **Role**: Operator
- **Status**: Inactive (gray)
- **Last Login**: 2023-04-25 11:15:45
- **Actions**: Edit, Reset Password, Delete

#### 4. Sarah Williams
- **Phone**: +1555666777
- **Email**: sarah.williams@example.com
- **Role**: Auditor
- **Status**: Locked (red)
- **Last Login**: 2023-04-15 16:20:30
- **Actions**: Edit, Reset Password, Delete

### User Status Indicators

- **Active** (Green): User can access the system
- **Inactive** (Gray): User account is disabled
- **Locked** (Red): Account locked due to security violations

---

## Role Management

### Overview

The Role Management module allows administrators to define and manage user roles with granular permission control.

![Role Management Interface](./img/EBP-RoleManagement.png)

### Features

#### Create New Role
- **Button**: "+ Add New Role" (orange button)
- Define custom roles with specific permissions
- Add descriptions for role purposes
- Assign permissions individually

#### Search Roles
- **Search Bar**: "Search roles..."
- Filter roles by name or description

#### Role Listing Table

| Column | Description |
|--------|-------------|
| **Role Name** | Name of the role |
| **Description** | Purpose and scope of the role |
| **Permissions** | List of assigned permissions (expandable) |
| **Status** | Active or Inactive |
| **Last Updated** | Modification timestamp |
| **Actions** | Edit, Delete |

### Pre-defined Roles

#### 1. Administrator
- **Description**: Full system access
- **Permissions**:
  - Dashboard View
  - Transactions View
  - Transactions Manage
  - Users View
  - Users Manage
  - Reports View
  - Reports Generate
  - Configuration Manage
  - +8 more permissions
- **Status**: Active (green)
- **Last Updated**: 2023-03-20

#### 2. Manager
- **Description**: Access to manage users and view reports
- **Permissions**:
  - Dashboard View
  - Transactions View
  - Users View
  - Users Manage (limited)
  - Reports View
  - Reports Generate (limited)
  - +4 more permissions
- **Status**: Active (green)
- **Last Updated**: 2023-02-10

#### 3. Operator
- **Description**: Limited access to operational functions
- **Permissions**:
  - Dashboard View
  - Transactions View
  - Reports View
- **Status**: Active (green)
- **Last Updated**: 2023-02-05

#### 4. Auditor
- **Description**: View-only access for audit purposes
- **Permissions**:
  - Dashboard View
  - Transactions View
  - Reports View
  - Audit Log View
  - +1 more permission
- **Status**: Inactive (red)
- **Last Updated**: 2023-04-15

### Permission Types

Permissions are organized by resource and action:

- **Dashboard**: View, Manage
- **Transactions**: View, Create, Update, Delete, Reverse
- **Users**: View, Create, Update, Delete
- **Roles**: View, Create, Update, Delete
- **Reports**: View, Generate, Export, Schedule
- **Certificates**: View, Upload, Modify, Deactivate
- **Configuration**: View, Modify, Save
- **Audit Logs**: View, Export

---

## Transaction Services

### Transaction Monitoring

![Transaction Monitoring Interface](./img/EBP-TransactionMonitoring.png)

#### Features

**Live Update Mode**
- Toggle between Live (15m, 1h intervals) and Historical data
- Status buttons: All Status, Success, Failed
- Type filters: All Types, P2P, P2M
- Search functionality across transaction fields
- Export data capability

#### Transaction Monitoring Table

| Column | Description |
|--------|-------------|
| **Date Time** | Transaction timestamp |
| **Sender Bank BIC** | Sender's bank code |
| **Sender Bank Name** | Full name of sender's bank |
| **Sender Account** | Sender's account number |
| **Receiver Bank BIC** | Receiver's bank code |
| **Receiver Bank Name** | Full name of receiver's bank |
| **Receiver Account** | Receiver's account number |
| **Status** | Success or Failed indicator |

#### Sample Transactions (Live)

| Date & Time | Sender Bank | Sender Bank Name | Sender Account | Receiver Bank | Receiver Bank Name | Receiver Account | Status |
|------------|-------------|-----------------|----------------|----------------|------------------|-----------------|--------|
| 2023-05-10 14:30:22 | AMHRETAA | Amhara Bank S.C. | 1000123456789 | CBEETAA | Commercial Bank of Ethiopia (CBE) | 2000876543... | Success |
| 2023-05-10 14:28:15 | AMHRETAA | Amhara Bank S.C. | 1000123456789 | DASHETAA | Dashen Bank S.C. | 2000876543... | Success |
| 2023-05-10 14:25:47 | BUNAETAA | Bunna International Bank S.C. | 1000234567890 | AMHRETAA | Amhara Bank S.C. | 2000876543... | Success |
| 2023-05-10 14:20:33 | NIBIIETAA | NIB International Bank S.C. (NIB) | 1000434567890 | AMHRETAA | Amhara Bank S.C. | 2000876543... | Success |
| 2023-05-10 14:15:19 | AMHRETAA | Amhara Bank S.C. | 1000534567890 | WEGAETAA | Wegagen Bank S.C. | 2000876543... | Success |
| 2026-01-30 12:50:40 | AMHRETAA | Amhara Bank S.C. | 1000789076551 | AWINETAA | Awash Bank S.C. | 2000143523... | Success |
| 2026-01-30 12:50:40 | AMHRETAA | Amhara Bank S.C. | 1000789076551 | AWINETAA | Awash Bank S.C. | 2000143523... | Success |
| 2026-01-30 12:50:40 | CBEETAA | Cooperative Bank of Oromia S.C. (COOP) | 1000640480449 | AMHRETAA | Amhara Bank S.C. | 2000871254... | Success |
| 2026-01-30 12:50:40 | AMHRETAA | Amhara Bank S.C. | 1000556583397 | BUNAETAA | Bunna International Bank S.C. | 2000165950... | Success |
| 2026-01-30 12:50:40 | AMHRETAA | Amhara Bank S.C. | 1000633062320 | BUNAETAA | Bunna International Bank S.C. | 2000590024... | Success |

**Pagination**: Showing 1-10 of 1001 transactions, 10 per page

### Transaction Search

![Transaction Search Interface](./img/EBP-TransactionSearch.png)

Advanced search functionality for finding specific transactions.

#### Search Filters

- **From Date**: mm/dd/yyyy date picker
- **To Date**: mm/dd/yyyy date picker
- **Sender Bank**: Dropdown selection
- **Receiver Bank**: Dropdown selection
- **Sender Account**: Text input field
- **Receiver Account**: Text input field
- **Status**: Radio buttons (All, Success, Failed)

#### Actions

- **Search**: Execute search with applied filters (orange button)
- **Reset**: Clear all filters and reset to default

---

## Batch Payments

### Bulk Sending

![Bulk Sending Interface](./img/EBP-BulkSending.png)

The Bulk Sending feature allows users to upload and process batch payment files.

#### Features

- **File Upload**: Drag-and-drop or browse interface
- **Batch Tracking**: Unique ID for each batch
- **Status Monitoring**: Real-time processing status
- **Success Tracking**: Success and failure counts

#### Payment History Table

| Column | Description |
|--------|-------------|
| **Batch ID** | Unique identifier |
| **Type** | Payment type/category |
| **Date & Time** | Upload timestamp |
| **File Name** | Original filename |
| **Records** | Total records in batch |
| **Status** | Pending, In Progress, Completed |
| **Success** | Successful transactions |
| **Failed** | Failed transactions |
| **Success Rate** | Success percentage |
| **Sender Bank** | Originating bank |
| **Receiver Bank** | Destination bank |
| **Actions** | View details, Download report |

#### Filter Options

- **Today** dropdown (Today, Yesterday, Last 7 days, etc.)
- **Status** filter (All Status, Pending, In Progress, Completed)
- **Search** functionality

#### Current Status

Currently: "No batch payments found matching your criteria"

### Bulk Receiving

![Bulk Receiving Interface](./img/EBP-BulkReceiving.png)

Monitor and manage incoming bulk payments from other banks.

#### Features

- View all received bulk payment batches
- Track processing status in real-time
- Monitor success and failure rates
- Download processing reports

#### Bulk Receiving Payment History

| Batch ID | Type | Date & Time | File Name | Records | Status | Success | Failed | Success Rate | Sender Bank |
|----------|------|------------|-----------|---------|--------|---------|--------|--------------|-------------|
| BR-20260130-009 | Utility Collections | 2026-01-30 12:06:03 | Subscription_Payments_June2023.xlsx | 510 | Completed | 505 | 5 | 99% | BUNAETAA |

#### Filtering Options

- **Today** dropdown for date range
- **All Status** filter (All Status, Pending, In Progress, Completed)
- **Search** by batch ID or filename

---

## Reports & Analytics

### Transaction Report

![Transaction Report Interface](./img/EBP-TransactionReport.png)

Generate comprehensive transaction reports with customizable filters.

#### Report Filters

- **From Date**: mm/dd/yyyy
- **To Date**: mm/dd/yyyy
- **Sender Bank**: Dropdown selection
- **Receiver Bank**: Dropdown selection
- **Sender Account**: Text input
- **Receiver Account**: Text input
- **Status**: Radio buttons (All, Success, Failed)
- **Transaction Type**: Radio buttons (All, P2P, P2M)

#### Actions

- **Generate Report**: Create report with applied filters (orange button)
- **Reset**: Clear all filters

#### Export Formats

- PDF (formatted report)
- Excel (XLSX with data tables)
- CSV (raw data export)

### Transaction Summary Report

![Transaction Summary Report Interface](./img/EBP-TransactionSummaryReport.png)

Generate aggregate transaction statistics.

#### Configuration

- **From Date**: mm/dd/yyyy
- **To Date**: mm/dd/yyyy
- **Transaction Type**: Tabs (All Types, P2P, P2M)

#### Summary Data Includes

- Total transaction count
- Total transaction value
- Average transaction value
- Success rate percentage
- Peak transaction periods
- Trend analysis

#### Actions

- **Generate Summary**: Create summary report (orange button)
- **Reset**: Clear date selections

### User List Report

![User List Report Interface](./img/EBP-UserListReport.png)

Generate reports on user accounts and activity.

#### Report Configuration

- **Report Type**: Dropdown
  - Users Created
  - Active Users
  - Inactive Users
  - Locked Users
- **From Date**: mm/dd/yyyy
- **To Date**: mm/dd/yyyy
- **Role**: Dropdown (All Roles, Administrator, Manager, Operator, Auditor)

#### Actions

- **Generate Report**: Create report (orange button)
- **Reset**: Clear selections

#### Report Contents

- User name, email, phone
- Role assignments
- Account status
- Creation/modification dates
- Last login information

### User Activity Audit Log

![User Activity Audit Log Interface](./img/EBP-UserActivityAuditLog.png)

Track all user actions within the system.

#### Audit Filters

- **From Date**: mm/dd/yyyy date picker
- **To Date**: mm/dd/yyyy date picker
- **User**: Dropdown (All Users or specific user)
- **Activity**: Dropdown (All Activities or specific action type)

#### Tracked Activities

- Login/Logout events
- User created/modified/deleted
- Role changed
- Transaction created/modified
- Report generated
- Configuration changed
- Batch uploaded/processed
- Password reset
- Account locked/unlocked

#### Actions

- **Generate Report**: Execute audit report (orange button)
- **Reset**: Clear all filters

#### Audit Log Information

- Timestamp
- Username
- Action performed
- Resource affected
- IP address
- Result (Success/Failed)

---

## Security & Compliance

### API Audit Log

![API Audit Log Interface](./img/EBP-APIAuditLog.png)

Comprehensive tracking of all API activity for security monitoring and compliance.

#### API Audit Filters

- **From Date**: mm/dd/yyyy date picker
- **To Date**: mm/dd/yyyy date picker
- **API Method**: Dropdown (All APIs, specific endpoints)
- **Channel**: Dropdown (All Channels, Web, Mobile, API)

#### Actions

- **Search**: Execute search with filters (orange button)
- **Reset**: Clear all selections

#### Logged Information

- API endpoint accessed
- HTTP method (GET, POST, PUT, DELETE)
- Request timestamp
- Response status code
- Response time (milliseconds)
- User/client identifier
- Request parameters
- IP address
- User agent string

#### Use Cases

- Security auditing and threat detection
- Compliance reporting
- Performance monitoring
- Troubleshooting API issues
- Usage analytics

### Certificate Management

![Certificate Management Interface](./img/EBP-CertificateManagement.png)

Manage SSL/TLS certificates for secure communication between system participants.

#### Features

- **Add Certificate**: "+ Add Certificate" button (blue)
- **Search**: Search certificates by participant name, BIC, or serial
- **Filter**: Filter certificate list
- **Reset**: Clear filters

#### Certificate List Table

| Column | Description |
|--------|-------------|
| **Participant** | Bank/Institution name |
| **BIC** | Banking Identification Code |
| **Status** | Active, Inactive, Expired, Revoked |
| **Valid From** | Certificate start date |
| **Valid To** | Certificate expiration date |
| **Serial No** | Unique certificate serial number |
| **Last Updated** | Modification timestamp |
| **Actions** | Modify, Deactivate, Download |

#### Sample Certificates

##### EthSwitch
- **BIC**: ETSWETAA
- **Status**: Active (green checkmark)
- **Valid From**: 2023-01-15
- **Valid To**: 2024-01-15
- **Serial No**: 12:AB:CD:34:FF:56
- **Last Updated**: 2023-01-15 09:30:45
- **Actions**: Modify, Deactivate, Download

##### Amhara Bank
- **BIC**: AMHRETAA
- **Status**: Active (green checkmark)
- **Valid From**: 2023-10-15
- **Valid To**: 2024-10-15
- **Serial No**: 78:9A:BC:DF:F0:12
- **Last Updated**: 2023-10-15 08:55:30
- **Actions**: Modify, Deactivate, Download

**Pagination**: Showing 1 to 2 of 2 certificates

#### Certificate Management Features

- **Modify**: Update certificate details
- **Deactivate**: Disable certificate without deletion
- **Download**: Download certificate file
- **Automatic Alerts**: Expiration notifications (30, 7, 1 days)

---

## Configurations

### System Settings

![System Configurations Interface](./img/EBP-Configurations.png)

Manage system-wide configuration for security, timeouts, and authentication.

#### System Timeouts

**Read Time Out**
- **Value**: 30 seconds
- **Unit**: Seconds (dropdown selector)
- **Description**: Maximum time allowed for API read operations
- **Range**: 10-120 seconds

**Idle Time Out**
- **Value**: 15 minutes
- **Unit**: Minutes (dropdown selector)
- **Description**: Time before inactive users are automatically logged out
- **Range**: 5-60 minutes

#### Security Settings

**Invalid Password Attempts**
- **Value**: 3 attempts
- **Description**: Number of failed attempts before account lockout (1-10)
- **Range**: 1-10 attempts
- **Lockout Duration**: 15 minutes (configurable)

**Password Expires After (Days)**
- **Value**: 90 days
- **Description**: Days until users must change their password (90-365 days)
- **Range**: 90-365 days
- **Password History**: Last 5 passwords cannot be reused

#### Authentication

**Enable Two-Factor Authentication (2FA) for All Users**
- **Options**: Yes (radio button), No (radio button)
- **Current Setting**: No (selected)
- **Description**: When enabled, all users will be required to set up two-factor authentication during their next login
- **Method**: TOTP (Time-based One-Time Password)

#### Configuration Actions

**Save Configuration**
- **Button**: "Save Configuration" (orange button)
- **Function**: Apply all configuration changes
- **Confirmation**: Displays confirmation message on successful save
- **Validation**: Validates settings before applying changes

#### Configuration Impact

- Changes apply immediately after saving
- Users currently logged in remain active until next session
- New security settings enforce on next login
- Changes are logged in audit trail

---

## Navigation Menu

The left sidebar provides easy navigation to all back office features:

### Main Navigation Items

- **Dashboard**: Overview of banking operations
- **User Management**: Manage system users
  - Role Management
  - User Management
- **Transaction Services**: Handle transactions
  - Transaction Monitoring
  - Transaction Search
- **Batch Payments**: Manage batch processing
  - Bulk Sending
  - Bulk Receiving
- **Reports & Analytics**: Generate reports
  - Transaction Report
  - Transaction Summary
  - Users List
  - User Activity Audit
- **Security & Compliance**: Security features
  - Audit Log
  - Certificate Management
- **Configurations**: System settings

---

## Contact & Support

### Support Information

- **Email**: support@paysyslabs.com
- **Phone**: +92-313-2370605
- **Website**: www.paysyslabs.com

### Operating Hours

- **24/7 Support**: Round-the-clock technical support available
- **Response Time**: Critical issues within 1 hour
- **SLA**: 99.9% uptime guarantee

---

© 2026 EthBridge Bank Portal by PaysYs Labs. All rights reserved.  
Made with ❤️ in Ethiopia
