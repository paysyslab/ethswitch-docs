# EthBridge Enterprise Portal - Back Office

**Document Version:** 2.0  
**Last Updated:** January 30, 2026  
**Status:** Published

---

## Table of Contents

1. [Overview](#overview)
2. [Management](#management)
3. [Configurations](#configurations)
4. [System Administration](#system-administration)
5. [Best Practices](#best-practices)

---

## Overview

The back office module provides comprehensive administrative and operational capabilities for managing the EthBridge Enterprise Portal infrastructure, including user management, role-based access control, participant administration, and system-wide configurations. This guide details all administrative functions and best practices for institutional operations.

## Management

The Management section provides centralized administrative control over system users, roles, and institutional participants. This section encompasses all user and organizational management functions.

### Role Management

Role Management enables administrators to define, configure, and maintain user roles with granular permission assignments throughout the system. This feature allows organizations to establish custom roles that align with their specific operational requirements and security policies.

#### Available Roles

The following table describes the predefined roles available within the system:

| Role | Description | Permissions |
|------|-------------|-------------|
| **Administrator** | Full system access | Dashboard View, Transactions View, Transactions Manage, +8 more |
| **Manager** | Manage users and view reports | Dashboard View, Transactions View, Users View, +4 more |
| **Operator** | Limited operational functions | Dashboard View, Transactions View, Reports View |
| **Auditor** | View-only access for audit purposes | Dashboard View, Transactions View, Reports View, +1 more |

#### Role Management Interface

The Role Management interface provides a centralized location for administering all system roles:

![Role Management Interface](./img/EEP-RoleManagement.png)

*Figure 1: Role Management Interface showing all available roles with their associated permissions and status indicators*

#### Role Management Capabilities

- **Search and Filtering**: Locate roles using advanced search and filtering mechanisms
- **Role Creation**: Establish new roles with custom permission sets tailored to organizational requirements
- **Permission Management**: Update and modify role permissions to align with operational changes
- **Audit Tracking**: Monitor role creation and modification timestamps for compliance documentation
- **Status Management**: Maintain role status indicators (Active/Inactive) for operational control

### User Management

Manage system users with comprehensive control over user provisioning, authentication, and lifecycle management. The User Management module enables administrators to create, modify, and maintain user accounts with role-based access control enforcement.

#### User Attributes

Each user account maintains the following key attributes:

- **Name**: Full user name for identification purposes
- **Email**: User contact email address for communications and password recovery
- **Role**: Assigned system role (Administrator, Manager, Operator, Auditor)
- **Status**: Active/Inactive status indicator for account management
- **Phone**: User contact number for administrative purposes
- **Last Login**: Timestamp of most recent system access for activity monitoring
- **Actions**: Edit or delete user records with administrative controls

#### User Management Interface

The comprehensive User Management interface provides tools for user administration and lifecycle management:

![User Management Interface](./img/EEP-UserManagement.png)

*Figure 2: User Management Interface displaying active users with their roles, status, and administrative controls*

#### User Management Capabilities

- **User Provisioning**: Add new users to the system with initial role assignments
- **User Administration**: Modify user information, role assignments, and contact details
- **Account Management**: Deactivate or lock user accounts to maintain system security
- **Search and Discovery**: Locate users using advanced search and filtering by multiple criteria
- **Activity Monitoring**: Track user access patterns through last login information
- **Bulk Operations**: Execute bulk user management operations for efficient administration

#### Key User Information Fields

| Field | Description | Importance |
|-------|-------------|-----------|
| **Name** | Complete user identification | Critical for audit trails |
| **Email** | Primary communication channel | Essential for notifications |
| **Role** | Access level and permissions | Core security parameter |
| **Status** | Active/Inactive/Locked account state | Operational control |
| **Last Login** | Most recent system access timestamp | Security monitoring |
| **Actions** | Edit and delete administrative controls | Lifecycle management |

### Participants Management

Manage financial institutions and participants within the EthBridge network. The Participants Management section provides tools for onboarding, maintaining, and monitoring financial institutions and service providers connected to the platform.

#### Participant Details

Each participant record contains the following critical information:

- **Participant Code**: Unique system identifier for quick reference (e.g., P001, P002, P003)
- **Name**: Official institution name for formal identification
- **Short Name**: Abbreviated designation for display purposes
- **BIC**: Bank Identifier Code (SWIFT code) for international transactions
- **Type**: Institution classification (Bank, MSP, Aggregator)
- **Status**: Active/Inactive operational status
- **Activation Date**: Date when the participant officially joined the network

#### Participant Classification

Participants are categorized into three primary types based on their operational role:

- **Banks**: Traditional banking institutions providing payment and settlement services
- **MSP**: Mobile Service Providers offering payment services through mobile channels
- **Aggregators**: Third-party service aggregators facilitating multi-institution connectivity

#### Participants Management Interface

The Participants Management interface enables comprehensive administration of all network participants:

![Participants Management Interface](./img/EEP-ParticipantList.png)

*Figure 3: Participants Management Interface showing the complete list of participating institutions with their details, BIC codes, and operational status*

#### Participant Search and Filtering

The interface provides advanced search and filtering capabilities:

- **Search Functionality**: Search by participant code, name, BIC code, or short name
- **Status Filtering**: Filter participants by Active, Inactive, or all status indicators
- **Type Filtering**: Filter by Bank, MSP, or Aggregator classification
- **Activation Date**: Sort and filter by participant activation date
- **Bulk Actions**: Select multiple participants for batch operations

#### Participant Operations

- **Participant Onboarding**: Add new financial institutions to the network with complete information
- **Information Management**: Update and maintain accurate participant details and credentials
- **Status Control**: Activate or deactivate participant accounts based on operational requirements
- **Filtering and Discovery**: Locate participants using status and type filters
- **Audit History**: Maintain complete activation and modification history for compliance

## Configurations

The Configurations section provides comprehensive system-level settings that control operational parameters, security policies, and authentication mechanisms across the entire platform. This centralized configuration management enables administrators to enforce institutional security policies and optimize system performance.

### System Timeouts

Configure timeout parameters to control system operation timing and user session management:

| Setting | Current Value | Description |
|---------|---------------|-------------|
| **Read Time Out** | 30 Seconds | Maximum duration for API read operations before timeout |
| **Idle Time Out** | 15 Minutes | Duration of inactivity before automatic user session termination |

**Configuration Impact**: These timeout values directly affect system responsiveness and security. Shorter timeouts enhance security but may impact usability for long-running operations.

### Security Settings

Implement organizational security policies across the system:

| Setting | Current Value | Description |
|---------|---------------|-------------|
| **Invalid Password Attempts** | 3 | Number of failed login attempts before account lockout (1:10 lockout ratio) |
| **Password Expires After (Days)** | 90 | Maximum age of password before mandatory change (configurable range: 30-365 days) |

**Security Policy**: These settings enforce password security standards and account protection measures in compliance with institutional security requirements.

#### Authentication Configuration

Configure authentication mechanisms and multi-factor authentication settings:

| Setting | Status | Impact |
|---------|--------|--------|
| **Enable Two-Factor Authentication (2FA)** | No | Currently disabled across all user accounts |

**Critical Note**: When Two-Factor Authentication is enabled, all users will be required to configure 2FA during their next system login. This includes setting up authenticator apps or receiving SMS-based verification codes.

#### System Configuration Interface

The System Configuration interface provides centralized access to all operational and security settings:

![System Configuration Interface](./img/EEP-Configurations.png)

*Figure 4: System Configuration Interface displaying all timeout, security, and authentication settings with current values and configuration options*
#### Configuration Sections Overview

| Section | Purpose | Impact Level |
|---------|---------|---------------|
| **System Timeouts** | Control API operation timing and session management | High - Affects system performance and security |
| **Security Settings** | Enforce password policies and account protection | Critical - Directly impacts system security |
| **Authentication** | Configure multi-factor authentication and login methods | Critical - Essential for access control |
### Configuration Management Actions

- **Change Persistence**: Save all configuration modifications with validation
- **Reset Functionality**: Restore default configuration values when necessary
- **Change Audit**: Maintain complete history of all configuration modifications for compliance

## System Administration

### Activity Monitoring and Oversight

Administrators must maintain comprehensive oversight and vigilant monitoring of all system activities. This section outlines essential monitoring practices and oversight procedures:

- **Continuous Monitoring**: Actively monitor all administrative actions and system modifications in real-time
- **Audit Trail Review**: Regularly review configuration changes with detailed audit trail analysis
- **Pattern Analysis**: Conduct regular analysis of user access patterns to identify potential anomalies or suspicious behavior
- **Proactive Security**: Maintain proactive identification and mitigation of emerging security concerns

#### Administration Dashboard

The Back Office Dashboard provides comprehensive visibility into system administration activities and operational metrics:

![Back Office Dashboard Overview](./img/EEP-BackOfficeDashboard.png)

*Figure 5: Back Office Administration Dashboard displaying key administrative metrics, recent activities, and system health indicators*

#### Dashboard Components

The administrative dashboard includes the following key components:

| Component | Function | Purpose |
|-----------|----------|---------|
| **User Activity Log** | Real-time user action tracking | Monitor administrative activities and changes |
| **Configuration Changes** | System modification history | Audit all configuration adjustments and policy updates |
| **Security Alerts** | Failed login and access alerts | Identify potential security incidents or unauthorized access attempts |
| **System Health** | Performance and availability metrics | Monitor system stability and operational status |
| **Recent Operations** | Latest administrative actions | Quick reference for recently performed administrative tasks |
| **Transaction Metrics** | Real-time transaction counts and values | Monitor financial transaction flow and performance |
| **Participant Status** | Active participant and institution information | View network connectivity and operational status |

#### Monitoring Best Practices

- **Regular Reviews**: Check dashboard metrics daily during operational hours
- **Alert Response**: Investigate and respond to security alerts immediately
- **Trend Analysis**: Monitor patterns in user activity and transaction volumes
- **Performance Optimization**: Use metrics to identify system bottlenecks and optimization opportunities

---

## Audit and Reporting Interfaces

### API Audit Log Interface

The API Audit Log provides comprehensive logging of all API-level transactions for compliance and technical auditing purposes:

![API Audit Log Interface](./img/EEP-APIAuditLog.png)

*Figure 6: API Audit Log Interface showing API audit search filters and transaction logging parameters*

#### API Audit Log Features

- **From Date/To Date**: Specify audit period for transaction filtering
- **API Method Filter**: Select specific APIs or view all API calls
- **Channel Filter**: Filter by communication channel (All Channels)
- **Search and Export**: Query audit logs and export results for compliance review

### User Activity Audit Log Interface

The User Activity Audit Log monitors all user actions within the system:

![User Activity Audit Log Interface](./img/EEP-UserActivityAuditLog.png)

*Figure 7: User Activity Audit Log Interface displaying user action tracking and audit filtering options*

---

## Reports and Analytics Interfaces

### Transaction Monitoring Interface

Real-time transaction monitoring with live status updates:

![Transaction Monitoring Interface](./img/EEP-TransactionMonitoring.png)

*Figure 8: Transaction Monitoring Interface showing live transaction data with sender, receiver, and amount information*

#### Transaction Monitoring Features

| Feature | Description |
|---------|-------------|
| **Live Status Badge** | Real-time indicator showing active transaction monitoring |
| **Time Filters** | View transactions from last 15 minutes, 1 hour, or custom range |
| **Bank Filtering** | Filter transactions by sender or receiver institution |
| **Status Filtering** | Filter by transaction status (Live/Completed) |
| **Export Function** | Download transaction data for external analysis |
| **Pagination** | Navigate through transaction records efficiently |

### Transaction Report Interface

Detailed transaction-level reporting with advanced filtering capabilities:

![Transaction Report Interface](./img/EEP-TransactionReport.png)

*Figure 9: Transaction Report Interface showing report generation filters and parameters*

#### Report Generation Options

- **Date Range Selection**: Specify from date and to date for report period
- **Bank Filtering**: Filter by sender bank or receiver bank
- **Account Filtering**: Filter by specific account numbers
- **Status Selection**: Filter by All, Success, or Failed transactions
- **Report Generation**: Generate on-demand reports with selected parameters

### Transaction Search Interface

Advanced search functionality for locating specific transactions:

![Transaction Search Interface](./img/EEP-TransactionSearch.png)

*Figure 10: Transaction Search Interface providing multi-parameter transaction search capabilities*

#### Search Capabilities

| Search Parameter | Format | Purpose |
|------------------|--------|---------|
| **From Date** | mm/dd/yyyy | Query start date |
| **To Date** | mm/dd/yyyy | Query end date |
| **Sender Bank** | Dropdown | Filter by sending institution |
| **Receiver Bank** | Dropdown | Filter by receiving institution |
| **Sender Account** | Text input | Search by sender account |
| **Receiver Account** | Text input | Search by receiver account |
| **Status** | Dropdown | Filter by transaction status |

### Transaction Summary Report Interface

Executive-level overview of transaction activities:

![Transaction Summary Report Interface](./img/EEP-TransactionSummaryReport.png)

*Figure 11: Transaction Summary Report Interface showing aggregated transaction metrics and summary parameters*

#### Summary Report Options

- **Date Range**: Select summary period (From Date to To Date)
- **Bank Selection**: Choose specific bank or all banks for aggregation
- **Generate Summary**: Create executive summary with key metrics
- **Export Results**: Download summary report for presentations or archival

### User List Report Interface

User management and audit reporting interface:

![User List Report Interface](./img/EEP-UserListReport.png)

*Figure 12: User List Report Interface displaying user management reporting options and filters*

#### Report Types Available

| Report Type | Scope | Purpose |
|-------------|-------|---------|
| **Users Created** | New user records | Track newly added users |
| **Users Modified** | Updated user records | Monitor user changes |
| **Users Deactivated** | Removed users | Track user lifecycle |

---

## Additional Administrative Features

### Role Management with Permissions

The Role Management interface displays comprehensive permission assignments:

**Key Information**:
- Each role displays associated permissions with expandable details
- Permission categories include Dashboard, Transactions, Reports, and Audit functions
- Status indicators show Active/Inactive role state
- Last Updated timestamp tracks modification history
- Edit and Delete actions available for role management

### Participant Management with Classification

Participants are categorized and managed by institutional type:

**Participant Types**:
- **Banks** (e.g., NBE, CBE, DB): Traditional banking institutions
- **MSP** (e.g., TB): Mobile Service Providers
- **Aggregators** (e.g., AM): Third-party service aggregators

**Activation Tracking**:
- Each participant has an activation date tracking network entry
- Status (Active/Inactive) indicates operational availability
- BIC codes enable international transaction routing

---

| Component | Function | Purpose |
|-----------|----------|---------|
| **User Activity Log** | Real-time user action tracking | Monitor administrative activities and changes |
| **Configuration Changes** | System modification history | Audit all configuration adjustments and policy updates |
| **Security Alerts** | Failed login and access alerts | Identify potential security incidents or unauthorized access attempts |
| **System Health** | Performance and availability metrics | Monitor system stability and operational status |
| **Recent Operations** | Latest administrative actions | Quick reference for recently performed administrative tasks |

## Best Practices

This section outlines industry best practices and recommendations for optimal back office administration and system management.

### User Management Best Practices

Implement comprehensive user management procedures to maintain system security and operational efficiency:

- **Access Review**: Conduct quarterly reviews of active users and access permissions to ensure continued alignment with organizational roles
- **Account Lifecycle**: Promptly deactivate accounts for terminated or transferred employees within 24 hours of separation
- **Role Assignment**: Assign roles strictly according to job function and operational requirements using the principle of least privilege
- **Principle of Least Privilege**: Grant only the minimum necessary permissions required for role-specific functions
- **Documentation**: Maintain detailed records of user creation, modification, and deletion with business justification
- **Compliance Verification**: Ensure user access aligns with organizational compliance and regulatory requirements

### Security Best Practices

Establish and maintain robust security practices across the administration infrastructure:

- **Password Policy**: Enforce strong password requirements (minimum 12 characters with complexity) and require changes every 90 days
- **Multi-Factor Authentication**: Enable 2FA for all administrative and sensitive roles to prevent unauthorized access
- **Login Monitoring**: Review failed login attempts regularly and investigate suspicious access patterns
- **Session Management**: Monitor active sessions and enforce appropriate timeout values to prevent unauthorized access from unattended sessions
- **Credential Protection**: Never share administrative credentials and disable accounts immediately when security is compromised
- **Audit Logging**: Maintain comprehensive audit logs for all administrative activities for compliance and forensic analysis

### Participant Management Best Practices

Ensure proper management of financial institution participants and network connections:

- **Onboarding Verification**: Conduct thorough verification of participant information, legal documents, and credentials during initial network entry
- **Data Accuracy**: Maintain precise and current BIC codes, routing numbers, and institutional identifiers for transaction processing
- **Status Tracking**: Document all participant status changes with dates, reasons, and approving administrator details for audit purposes
- **Compliance Verification**: Ensure all participants maintain current regulatory compliance certifications and licenses
- **Regular Audits**: Conduct periodic audits of participant information to identify and correct outdated or inaccurate data
- **Performance Monitoring**: Monitor participant transaction patterns for anomalies indicating system issues or fraud

### Configuration Management Best Practices

Establish disciplined configuration management procedures to ensure system stability and security:

- **Change Documentation**: Document all configuration changes with detailed business justification, approval authority, and implementation dates
- **Regular Review**: Conduct quarterly reviews of timeout and security settings to ensure continued alignment with organizational policies
- **Policy Updates**: Update security policies proactively to address emerging threats and compliance requirement changes
- **Testing**: Test all configuration changes in non-production environments before deployment to production systems
- **Rollback Planning**: Maintain documented rollback procedures for configuration changes to quickly restore service if issues occur
- **Change Control**: Implement formal change control procedures requiring approval from authorized administrators before implementation
- **Version Control**: Maintain version history of all configuration changes for audit trail and recovery purposes

---

**Document Information**

- **Product**: EthBridge Enterprise Portal - Back Office Management v2
- **Last Revision**: January 30, 2026
- **Classification**: Internal Administrative Documentation
