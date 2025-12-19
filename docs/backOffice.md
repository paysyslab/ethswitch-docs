# Back Office

## 1. Open Card Management System – Overview

The Open Card Management System (OpenCMS) Back Office is a comprehensive, centralized administrative platform that enables the seamless management of the entire card lifecycle. It serves as a pivotal tool for operational controls, customer servicing, product configuration, fee management, transaction monitoring, and audit tracking. 

With a robust role-based access control system, OpenCMS ensures that only authorized personnel such as Makers, Checkers, Administrators, and Support Teams can access sensitive operations. All user actions are fully auditable, providing complete transparency and traceability.

The system integrates all functions into a unified back-office interface, providing operational teams with real-time data and streamlined workflows to maintain efficiency and compliance.

![Back Office Overview](/img/BO1.jpg)

---

## 2. System Access & User Management

### 2.1 Login & Navigation

Upon logging into the system, users are presented with a unified, easy-to-navigate dashboard. The dashboard provides direct access to essential functional modules such as:
- **User Management**: For creating and managing internal users.
- **Batch Management**: For uploading and processing bulk files.
- **Customer Management**: To handle customer accounts and card details.
- **Product Management**: To configure and manage card products.
- **Fee Management**: For defining and applying card and transaction fees.
- **Audit Logging**: To track and monitor system-wide actions.

The dashboard is designed to provide quick visibility into system operations, making it easier for users to manage day-to-day tasks efficiently.

### 2.2 User & Role Management

The User & Role Management module allows administrators to create and manage internal users, define roles, and assign permissions to control access to different areas of the system.

Key capabilities include:
- **Role Creation**: Define roles based on operational requirements (e.g., Maker, Checker, Admin, Support).
- **Module-Level Permissions**: Control access to specific system modules, ensuring users can only access relevant functions.
- **User Activation/Deactivation**: Easily activate or deactivate users as needed.
- **Audit Trails**: Track and log all user actions, providing full accountability.

This module is essential for maintaining operational security, ensuring that only authorized personnel can access sensitive features.

![User Management](/img/BO2.jpg)

---

## 3. Dashboard & Analytics

### 3.1 Dashboard Overview

The Back Office Dashboard provides a bird's-eye view of all system activities. It consolidates data from various modules into an easy-to-read interface, offering insights into ongoing operations.

It is the primary landing page for operational users and allows them to monitor performance and make data-driven decisions based on real-time metrics.

The dashboard includes:
- **Operational Metrics**: Visualized statistics of card-related activities, such as issuance, expiration, and block statuses.
- **Navigation Shortcuts**: Quick access links to frequently used modules like Batch Management, Customer Management, and Transaction Monitoring.

![CMS Dashboard Overview](/img/BO3.jpg)

---

### 3.2 Card Analytics

The Card Analytics module provides a comprehensive view of card portfolio health, with real-time data on the status and activity of issued cards.

Metrics displayed include:
- **Total Cards Issued**: Overview of the total number of cards issued.
- **Active Cards**: Cards that are currently active and in use.
- **Blocked Cards**: Cards that have been blocked for security or operational reasons.
- **Fresh Cards**: Newly issued cards not yet activated.
- **Expiring Cards**: Cards that are about to expire within 30, 60, or 90 days.

This helps teams monitor card activity, plan for renewals, and take necessary actions to maintain portfolio health.

![Card Analytics](/img/BO4.jpg)

---

## 4. Batch Management

Batch Management is a critical feature for high-volume operations, allowing users to process multiple records in bulk. This significantly reduces manual effort and increases operational efficiency.

### 4.1 Batch File Upload

This module allows users to upload batch files for bulk card operations such as:
- **Customer Onboarding**: Adding new customers to the system.
- **Card Creation**: Mass creation of cards based on bulk data.
- **Card Updates**: Updating card details, such as limits or statuses.
- **Status Changes**: Processing requests to change the status of multiple cards (e.g., blocking or unblocking).

The system automatically validates the file format and structure before processing the records to ensure data consistency.

![Batch File Upload](/img/BO5.jpg)

---

### 4.2 Uploaded Batches (Batch Overview)

This screen displays a list of all uploaded batches along with their processing status. Key details include:
- **Batch ID**: A unique identifier for each batch.
- **File Name**: Name of the uploaded batch file.
- **Upload Date**: Timestamp when the batch was uploaded.
- **Total Records**: Total number of records in the batch.
- **Batch Status**: Current status of the batch (e.g., Processing, Completed, Failed).
- **Action Options**: Options for reviewing, reprocessing, or correcting batch issues.

This screen offers complete visibility into the status of all batch processes.

![Uploaded Batches](/img/BO6.jpg)

---

### 4.3 Batch Feedback

The Batch Feedback screen allows users to view detailed processing results for each batch. This includes:
- **Successful and Failed Records**: Count of successfully processed records and any records that failed.
- **Batch Status**: Current processing status (e.g., Validated, PAN Generated, Embossing Generated).
- **Metadata**: Information such as the upload date and total records processed.

Users can filter through batch records to focus on specific entries for review.

![Batch Feedback](/img/BO7.jpg)

---

### 4.4 Failed Records (Maker)

This module helps Makers efficiently handle records that failed during batch processing. It provides:
- **Error Details**: Specific reasons for failure (e.g., missing information or incorrect formatting).
- **Record Correction**: Allows Makers to edit and correct failed records directly in the system.
- **Resubmission**: After correction, only the failed records are resubmitted, saving time and resources.

This process ensures that errors are resolved quickly without needing to re-upload the entire batch.

![Failed Records Maker](/img/BO12.jpg)

---

### 4.5 Card Information Report

The Card Information Report provides a consolidated view of all card records stored in the system. It can be filtered by:
- **Batch Number**: Filter records by specific batch IDs.
- **Date/Time Range**: Allows users to search records within a specific time period.
- **Card Status**: Filter by the current status of the card (e.g., Active, Blocked, Expired).

This report is primarily used for reconciliation, audits, and customer service inquiries.

![Card Information Report](/img/BO11.jpg)

---

### 4.6 Card Renewal

The Card Renewal module helps manage cards that are expiring or already expired. It allows users to:
- **Search by Card Number**: Quickly find cards based on card number or customer details.
- **View Expiry Dates**: See which cards are expiring soon.
- **Initiate Renewal Requests**: Start the renewal process for expiring cards.
- **Track Status**: Monitor the renewal status to ensure uninterrupted service for cardholders.

This module is crucial for ensuring customers continue to have active, functional cards.

![Card Renewal](/img/BO13.jpg)

---

## 5. Customer Management

### 5.1 Customer & Card Details

This module provides detailed information on customers and their associated cards. Information includes:
- **Customer Details**: Personal information, account details, and card-related data.
- **Card Limits**: Information on the current limits of each card.
- **Card Block Rules**: Block criteria based on various factors like transaction type or merchant category.

Changes to this data are controlled via role-based permissions and fully logged for auditing purposes.

![Customer Card Details](/img/BO8.jpg)

---

## 6. Product Management

### 6.1 Transaction Setup

This screen defines the available transaction types for card products, allowing administrators to enable or disable specific transaction features for different card types.

Examples of transaction types:
- **Balance Inquiry**
- **Cash Withdrawal**
- **POS Purchase**
- **Online Purchase**

![Transaction Setup](/img/BO9.jpg)

---

### 6.2 Product Configuration

The Product Configuration module is used to create and manage card products. Parameters for configuration include:
- **Product Name and Description**
- **Card Type**: Physical or Virtual
- **Scheme**: PayPak, Visa, Mastercard, etc.
- **Currency**
- **Card Validity Period**
- **Replacement and Renewal Policies**
- **Embossing Formats**

![Create Product Configuration](/img/BO10.jpg)

---

### 6.3 Channel Management

Channel Management defines which transaction channels are available for use with each card product. This includes:
- **ATM Channels**: Both On-Us and Off-Us.
- **POS Channels**: For card-based point-of-sale transactions.
- **Online Transactions**: Both local and international online purchases.

Channels can be marked as local or international, and activated or deactivated as needed.

![Channel Management](/img/BO7.jpg)

---

## 7. Fee Management

### 7.1 Card Event Fee

This module allows administrators to define fees associated with specific card-related events. Examples include:
- **Card Issuance Fee**
- **Card Renewal Fee**
- **Card Replacement Fee**

These fees can be set based on the card type, event type, and other conditions.

![Create Card Event Fee](/img/BO6.jpg)

---

## 8. Audit Logging

The Audit Logging module is a critical feature for maintaining compliance and security. It logs all system actions, including:
- **Timestamp**: When the action was performed.
- **User**: Who performed the action.
- **Module Name**: The module in which the action occurred.
- **Action Performed**: Description of what was done.
- **Old and New Values**: Any changes made to the system.
- **IP Address**: Where the action originated.

This module helps ensure that the system remains fully traceable for audits and regulatory reviews.

---

## 9. System Summary

The OpenCMS Back Office provides a secure, scalable, and fully auditable administrative interface that centralizes:

- Card lifecycle management
- Batch processing
- Customer servicing
- Product and fee configuration
- Transaction monitoring
- Compliance and audit tracking

Designed for enterprise-level banking needs, it ensures efficient, transparent, and compliant operations.
