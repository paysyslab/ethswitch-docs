# Functional Specification - Bulk Payments (EthSwitch)

**Version**: 2.0  
**Last Updated**: January 30, 2026  
**Provider**: PaySys Labs  
**Module**: Bulk Payment Processing System
**Document Type**: Feature-Specific Functional Specification

---

## Table of Contents

1. [Overview](#overview)
2. [Bulk Payment Workflow](#bulk-payment-workflow)
3. [File Format Specifications](#file-format-specifications)
4. [Processing Rules](#processing-rules)
5. [Validation Rules](#validation-rules)
6. [Error Handling](#error-handling)
7. [Reporting and Reconciliation](#reporting-and-reconciliation)
8. [Security and Compliance](#security-and-compliance)
9. [API Specifications](#api-specifications)
10. [Use Cases](#use-cases)

---

## Overview

### Purpose

The Bulk Payment module enables organizations to process multiple transactions in a single batch operation, providing efficient handling of payroll, vendor payments, refunds, and other mass payment scenarios.

### Key Features

- **Batch Upload**: Support for CSV, Excel, and JSON file uploads
- **Validation**: Comprehensive pre-processing validation
- **Processing**: Asynchronous batch processing with progress tracking
- **Approval Workflow**: Multi-level approval for compliance
- **Reporting**: Detailed success/failure reporting
- **Reconciliation**: Transaction-level reconciliation tools
- **Audit Trail**: Complete audit logging of all operations
- **Scheduling**: Schedule batch execution for off-peak hours

### Target Users

- Finance teams processing payroll
- Accounts payable departments
- Refund processors
- Settlement operations
- Compliance and audit personnel

---

## Bulk Payment Workflow

### Complete Processing Workflow

```
Step 1: File Upload
    ↓
┌──────────────────────────┐
│ Format Validation        │
│ ├─ File type check      │
│ ├─ Size validation      │
│ └─ Encoding validation  │
└────────┬─────────────────┘
         ↓
Step 2: Data Parsing
    ↓
┌──────────────────────────┐
│ Parse file contents      │
│ ├─ CSV parsing          │
│ ├─ Excel parsing        │
│ └─ JSON parsing         │
└────────┬─────────────────┘
         ↓
Step 3: Header Validation
    ↓
┌──────────────────────────┐
│ Verify required columns  │
│ ├─ Sender field         │
│ ├─ Recipient field      │
│ ├─ Amount field         │
│ └─ Currency field       │
└────────┬─────────────────┘
         ↓
Step 4: Row-by-Row Validation
    ↓
┌──────────────────────────┐
│ Validate each row        │
│ ├─ Data type check      │
│ ├─ Required fields      │
│ └─ Business rules       │
└────────┬─────────────────┘
         ↓
Step 5: Pre-Processing
    ↓
┌──────────────────────────┐
│ Calculate totals         │
│ ├─ Transaction count    │
│ ├─ Total amount         │
│ └─ By currency          │
└────────┬─────────────────┘
         ↓
Step 6: Approval Queue
    ↓
┌──────────────────────────┐
│ Route to approvers       │
│ ├─ Manager approval     │
│ ├─ Director approval    │
│ └─ Finance approval     │
└────────┬─────────────────┘
         ↓
Step 7: Batch Processing
    ↓
┌──────────────────────────┐
│ Process transactions     │
│ ├─ Parallel processing  │
│ ├─ Error handling       │
│ └─ Retry logic          │
└────────┬─────────────────┘
         ↓
Step 8: Reconciliation
    ↓
┌──────────────────────────┐
│ Reconcile results        │
│ ├─ Compare counts       │
│ ├─ Verify amounts       │
│ └─ Flag discrepancies   │
└────────┬─────────────────┘
         ↓
Step 9: Reporting
    ↓
┌──────────────────────────┐
│ Generate reports         │
│ ├─ Success report       │
│ ├─ Failure report       │
│ └─ Summary statistics   │
└────────┬─────────────────┘
         ↓
Step 10: Notification
    ↓
Send confirmation email
with attached reports
```

### Workflow States

| State | Duration | Action | Next State |
|-------|----------|--------|-----------|
| **Uploaded** | Immediate | File uploaded, awaiting validation | Validating |
| **Validating** | 1-5 minutes | Performing format and data validation | Validated |
| **Validated** | Until approved | Awaiting approvals from authorized users | Approved |
| **Approved** | Immediate | All approvals received | Processing |
| **Processing** | 1-60 minutes | Batch actively processing transactions | Completed |
| **Completed** | Permanent | Processing finished, results available | Archived |
| **Failed** | Until retry | Processing failed, may be retried | Processing |
| **Cancelled** | Permanent | User cancelled batch | Archived |

---

## File Format Specifications

### CSV Format

**File Extension**: `.csv`

**Encoding**: UTF-8

**Delimiter**: Comma (,)

**Required Columns**:
- `sender_id` or `sender_account`: Source account identifier
- `recipient_id` or `recipient_account`: Destination account identifier
- `amount`: Transaction amount
- `currency`: Currency code (USD, EUR, GBP, etc.)

**Optional Columns**:
- `description`: Transaction description/memo
- `reference_number`: External reference ID
- `due_date`: Payment due date (YYYY-MM-DD)
- `invoice_number`: Associated invoice number
- `department`: Cost center/department code
- `project_id`: Project or cost code

**Example CSV File**:
```csv
sender_id,recipient_id,amount,currency,description,reference_number
SENDER-001,RECIPIENT-001,1000.00,USD,Invoice payment,INV-001
SENDER-001,RECIPIENT-002,500.00,USD,Refund,REF-001
SENDER-001,RECIPIENT-003,2500.00,USD,Salary payment,SAL-001
```

**Constraints**:
- Maximum file size: 100 MB
- Maximum rows per file: 100,000
- No blank lines between records
- No special characters in field values unless quoted

### Excel Format

**File Extension**: `.xlsx` or `.xls`

**Sheet Name**: First sheet is processed

**Column Headers**: Required in first row

**Data Rows**: Start from row 2

**Example Structure**:
```
Row 1: Headers
Row 2-10001: Data rows (10,000 max)
```

**Supported Formats**:
- Excel 2007+ (.xlsx) - Recommended
- Excel 97-2003 (.xls) - Legacy support
- OpenDocument (.ods) - Supported

### JSON Format

**File Extension**: `.json`

**Root Element**: Array of transaction objects

**Structure**:
```json
[
  {
    "sender_id": "SENDER-001",
    "recipient_id": "RECIPIENT-001",
    "amount": "1000.00",
    "currency": "USD",
    "description": "Invoice payment",
    "reference_number": "INV-001"
  },
  {
    "sender_id": "SENDER-001",
    "recipient_id": "RECIPIENT-002",
    "amount": "500.00",
    "currency": "USD",
    "description": "Refund",
    "reference_number": "REF-001"
  }
]
```

---

## Processing Rules

### Transaction Processing Rules

| Rule | Description | Action |
|------|-------------|--------|
| **Sequential Processing** | Process transactions in file order | Maintain order |
| **Parallel Execution** | Process up to 10 transactions in parallel | Improve throughput |
| **Retry Logic** | Retry failed transactions up to 3 times | Exponential backoff |
| **Duplicate Detection** | Check for duplicate reference numbers | Skip duplicates |
| **Deduplication Window** | 24-hour window for duplicate detection | Compare hashes |
| **Daily Limit Checking** | Verify sender daily transaction limits | Reject if exceeded |
| **Balance Verification** | Check available balance before processing | Reject if insufficient |
| **Rate Limiting** | Apply per-second rate limits | Queue excess requests |

### Amount Processing Rules

| Rule | Implementation |
|------|-----------------|
| **Precision** | 8 decimal places (e.g., 1000.00000001) |
| **Rounding** | Round half up (ROUND_HALF_UP) |
| **Minimum Amount** | 0.01 in transaction currency |
| **Maximum Amount** | 999,999,999.99 per transaction |
| **Batch Total** | Maximum 10,000,000 total per batch |
| **Currency Conversion** | Use spot rate at processing time |
| **Fee Deduction** | Deduct from sender account |
| **Tax Calculation** | Apply configured tax rules |

### Time-Based Rules

| Rule | Specification |
|------|---------------|
| **Processing Hours** | 24/7 available, off-peak preferred |
| **Scheduling** | Allow scheduling for future dates |
| **Effective Date** | Apply specified effective date |
| **Cut-off Times** | Respect daily cut-off times |
| **Business Days** | Optional business day validation |
| **Holiday Handling** | Skip or adjust for holidays |
| **Expiration** | Batch expires 30 days from upload |

---

## Validation Rules

### File-Level Validation

| Check | Rule | Error Code |
|-------|------|-----------|
| **File Size** | ≤ 100 MB | FILE_TOO_LARGE |
| **File Type** | CSV, XLSX, XLS, JSON only | INVALID_FILE_TYPE |
| **Row Count** | ≤ 100,000 rows | TOO_MANY_ROWS |
| **Empty File** | At least 1 data row | EMPTY_FILE |
| **Encoding** | UTF-8 or convertible | ENCODING_ERROR |
| **Headers Present** | All required headers | MISSING_HEADERS |

### Row-Level Validation

| Field | Rules | Error Code |
|-------|-------|-----------|
| **Sender ID** | Non-empty, valid account | INVALID_SENDER |
| **Recipient ID** | Non-empty, valid account | INVALID_RECIPIENT |
| **Amount** | Positive number, ≤ 999,999,999.99 | INVALID_AMOUNT |
| **Currency** | Valid 3-letter code (ISO 4217) | INVALID_CURRENCY |
| **Description** | Optional, max 200 characters | DESCRIPTION_TOO_LONG |
| **Reference** | Optional, max 50 characters, unique | DUPLICATE_REFERENCE |
| **Date Fields** | Valid YYYY-MM-DD format | INVALID_DATE |

### Business Rule Validation

| Rule | Specification | Action |
|------|---------------|--------|
| **Account Status** | Both accounts must be active | Skip transaction |
| **Sender Permissions** | Must have bulk payment rights | Reject entire batch |
| **Recipient Verification** | Recipient account must exist | Flag for review |
| **Currency Matching** | Support account must support currency | Flag or convert |
| **Daily Limits** | Total must not exceed daily limit | Reject or queue |
| **Balance Sufficiency** | Sender must have sufficient balance | Reject transaction |
| **Fraud Detection** | Run anti-fraud checks | Flag suspicious |

### Validation Report

After validation, system generates report:

```json
{
  "batch_id": "BULK-20260130-001",
  "upload_time": "2026-01-30T14:35:22Z",
  "status": "validated",
  "file_validation": {
    "file_size_bytes": 45000,
    "row_count": 500,
    "valid_rows": 495,
    "invalid_rows": 5,
    "result": "PASS"
  },
  "row_validation": {
    "sender_errors": 2,
    "recipient_errors": 1,
    "amount_errors": 2,
    "currency_errors": 0
  },
  "business_validation": {
    "account_status_issues": 0,
    "permission_issues": 0,
    "balance_issues": 10,
    "limit_issues": 0
  },
  "summary": {
    "total_amount": "245000.00",
    "total_currency": "USD",
    "estimated_completion_time": "5 minutes"
  }
}
```

---

## Error Handling

### Error Categories

| Category | Examples | Recovery |
|----------|----------|----------|
| **File Errors** | Invalid format, encoding, size | Reject file, request correction |
| **Validation Errors** | Missing fields, invalid data types | Report errors, request resubmission |
| **Business Errors** | Insufficient balance, invalid accounts | Skip transaction, report in results |
| **Processing Errors** | Timeouts, database errors | Retry with backoff |
| **System Errors** | Out of memory, service unavailable | Fail batch, request retry later |

### Error Response Format

```json
{
  "success": false,
  "statusCode": 400,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "File validation failed",
    "details": [
      {
        "row": 5,
        "field": "amount",
        "error": "Amount must be greater than 0",
        "value": "-100.00"
      },
      {
        "row": 10,
        "field": "sender_id",
        "error": "Account not found",
        "value": "INVALID-001"
      }
    ],
    "statistics": {
      "total_errors": 2,
      "error_by_type": {
        "validation": 2,
        "business": 0
      }
    }
  }
}
```

### Retry Policy

| Scenario | Max Retries | Backoff | Total Time |
|----------|------------|---------|-----------|
| **Temporary Failure** | 3 | 2^n seconds | 7 seconds |
| **Database Timeout** | 5 | 1-60 seconds | 3 minutes |
| **API Timeout** | 3 | 5-30 seconds | 1 minute |
| **Transient Error** | 2 | 10-60 seconds | 90 seconds |

---

## Reporting and Reconciliation

### Processing Report

Generated after batch completion:

```
EthSwitch Bulk Payment Report
Generated: 2026-01-30 14:35:22 UTC
Batch ID: BULK-20260130-001

BATCH SUMMARY
─────────────────────────────────────────────────────
Total Transactions:           500
Successful:                   495 (99.0%)
Failed:                         5 (1.0%)
Total Amount Processed:   $245,000.00
Total Amount Failed:        $2,500.00
Processing Time:            4 minutes 23 seconds

PROCESSING STATUS
─────────────────────────────────────────────────────
Status Distribution:
├─ Completed:   495 transactions
├─ Failed:        3 transactions
├─ Rejected:      2 transactions
└─ Pending:       0 transactions

Amount Distribution by Currency:
├─ USD:   $245,000.00 (495 transactions)
└─ EUR:   $0.00 (0 transactions)

FAILED TRANSACTIONS SUMMARY
─────────────────────────────────────────────────────
Reason              Count    Amount
─────────────────────────────────────────────────────
Insufficient Balance  3      $1,500.00
Invalid Recipient     2      $1,000.00
─────────────────────────────────────────────────────
```

### Reconciliation Features

**Transaction-Level Reconciliation**:
- Compare batch summary with ledger entries
- Identify processing discrepancies
- Flag missing or duplicate transactions
- Verify amount accuracy

**Batch-Level Reconciliation**:
- Total transaction count verification
- Total amount verification by currency
- Successful vs failed transaction breakdown
- Compare against expected results

**Reconciliation Report**:
```json
{
  "batch_id": "BULK-20260130-001",
  "reconciliation_status": "RECONCILED",
  "checks": {
    "transaction_count": {
      "expected": 500,
      "actual": 500,
      "status": "MATCH"
    },
    "total_amount": {
      "expected": "245000.00",
      "actual": "245000.00",
      "currency": "USD",
      "status": "MATCH"
    },
    "successful_count": {
      "expected": 495,
      "actual": 495,
      "status": "MATCH"
    },
    "failed_count": {
      "expected": 5,
      "actual": 5,
      "status": "MATCH"
    }
  },
  "discrepancies": [],
  "reconciliation_time": "2 minutes 15 seconds"
}
```

---

## Security and Compliance

### Security Measures

| Measure | Implementation |
|---------|-----------------|
| **File Encryption** | AES-256 encryption during upload/storage |
| **Transport Security** | TLS 1.2+ for all file transfers |
| **Access Control** | Role-based access to bulk payment features |
| **Audit Logging** | Complete audit trail of all operations |
| **Data Validation** | Strict input validation to prevent injection |
| **Signature Verification** | HMAC-SHA256 for file integrity |

### Approval Workflow

**Multi-Level Approval**:

| Level | Role | Authority | Time Limit |
|-------|------|-----------|-----------|
| **Level 1** | Manager | Review batch details | 24 hours |
| **Level 2** | Director | Verify compliance | 24 hours |
| **Level 3** | Finance | Final authorization | 24 hours |
| **Max Batch Value** | $1,000,000 | Requires 3 approvals | N/A |

**Approval Status Flow**:
```
Submitted → Pending L1 → Pending L2 → Pending L3 → Approved → Processing
                ↓                          ↓              ↓
              Rejected                  Rejected       Rejected
```

### Compliance Reporting

**Regulatory Reports**:
- Transaction reports for AML/KYC compliance
- Audit trail for regulatory review
- Exception reports for suspicious activity
- Reconciliation reports for accounting
- User activity logs for internal audit

---

## API Specifications

### Upload Bulk Payment File

**Endpoint**: `POST /api/v1/bulk-payments/upload`

**Request**:
```bash
curl -X POST https://api.ethswitch.example.com/api/v1/bulk-payments/upload \
  -H "Authorization: Bearer {token}" \
  -F "file=@payments.csv" \
  -F "description=Payroll June 2026" \
  -F "scheduled_date=2026-02-01"
```

**Response** (201 Created):
```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "batch_id": "BULK-20260130-001",
    "status": "validating",
    "upload_timestamp": "2026-01-30T14:35:22Z",
    "estimated_completion": "2026-01-30T14:40:00Z"
  }
}
```

### Check Batch Status

**Endpoint**: `GET /api/v1/bulk-payments/{batch_id}/status`

**Response**:
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "batch_id": "BULK-20260130-001",
    "status": "processing",
    "progress": {
      "processed": 250,
      "total": 500,
      "percentage": 50
    },
    "timestamps": {
      "uploaded": "2026-01-30T14:35:22Z",
      "started": "2026-01-30T14:37:00Z",
      "estimated_completion": "2026-01-30T14:42:00Z"
    }
  }
}
```

### Download Report

**Endpoint**: `GET /api/v1/bulk-payments/{batch_id}/report`

**Query Parameters**:
- `format`: pdf, csv, json (default: pdf)
- `include`: detailed, summary (default: summary)

---

## Use Cases

### Use Case 1: Monthly Payroll Processing

**Scenario**: Finance team processes monthly payroll for 1,000 employees

**Steps**:
1. Prepare employee payment data in CSV format
2. Upload file via bulk payment interface
3. System validates 1,000 transactions (2 minutes)
4. Manager reviews and approves batch
5. System processes all transactions (8 minutes)
6. Finance team downloads reconciliation report
7. Payments settled to bank accounts

**Result**: 1,000 employees paid in single batch operation

### Use Case 2: Vendor Payment Batch

**Scenario**: Process 150 vendor invoices totaling $500,000

**Steps**:
1. Export vendor invoice data from AP system
2. Transform to compatible CSV format
3. Upload to bulk payment system
4. System validates and flags 3 issues
5. Finance team corrects issues and resubmits
6. Batch approved by Director
7. System processes successfully
8. Generates reconciliation report

**Result**: 150 vendor payments processed and reconciled

### Use Case 3: Refund Processing

**Scenario**: Process customer refunds from returns (500 refunds)

**Steps**:
1. Generate refund list from returns system
2. Create JSON file with refund details
3. Upload batch to system
4. System validates refund amounts and customers
5. Automatic approval (automated batch)
6. Processes 500 refunds in parallel
7. Sends notifications to customers
8. Archives report

**Result**: All customer refunds processed and confirmed

---

**Document Approval**

| Role | Signature | Date |
|------|-----------|------|
| **Product Manager** | [Signature] | 2026-01-30 |
| **Finance Director** | [Signature] | 2026-01-30 |
| **Compliance Officer** | [Signature] | 2026-01-30 |
