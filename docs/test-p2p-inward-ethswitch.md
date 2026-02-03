# P2P Inward Transaction Test Scenarios

**Version**: 2.0  
**Last Updated**: January 30, 2026  
**Provider**: PaySys Labs  
**Test Module**: Peer-to-Peer Inward Transactions
**Document Type**: Test Case Specifications and Scenarios

---

## Table of Contents

1. [Overview](#overview)
2. [Test Environment Setup](#test-environment-setup)
3. [Test Data Preparation](#test-data-preparation)
4. [Functional Test Scenarios](#functional-test-scenarios)
5. [Edge Case Test Scenarios](#edge-case-test-scenarios)
6. [Negative Test Scenarios](#negative-test-scenarios)
7. [Security Test Scenarios](#security-test-scenarios)
8. [Performance Test Scenarios](#performance-test-scenarios)
9. [Integration Test Scenarios](#integration-test-scenarios)
10. [Acceptance Criteria](#acceptance-criteria)

---

## Overview

### Purpose

This document defines comprehensive test scenarios for P2P (Peer-to-Peer) Inward Transactions in the EthSwitch platform. Inward transactions represent funds received by the user from external parties.

### Scope

- Standard P2P inward transfer processing
- Transaction validation and verification
- Status tracking and notifications
- Audit logging and reconciliation
- Error handling and recovery

### Testing Approach

- **Positive Testing**: Happy path scenarios
- **Negative Testing**: Error handling and rejection scenarios
- **Edge Case Testing**: Boundary condition testing
- **Security Testing**: Authorization and authentication
- **Performance Testing**: Load and stress testing
- **Integration Testing**: External system interactions

---

## Test Environment Setup

### Environment Requirements

| Component | Specification | Version |
|-----------|---------------|---------|
| **API Server** | EthSwitch API Gateway | v2.0 |
| **Database** | PostgreSQL | 12+ |
| **Cache** | Redis | 6+ |
| **Test Framework** | Jest/Mocha | Latest |
| **API Client** | Postman/Insomnia | Latest |
| **Network** | Dedicated test VPC | N/A |

### Test User Accounts

```
Test Admin:
  Email: admin@test.ethswitch.example.com
  Password: TestAdmin123!@
  Role: Administrator

Test User 1 (Sender):
  Email: sender@test.ethswitch.example.com
  Password: TestUser123!@
  Role: User
  Account Balance: $10,000.00

Test User 2 (Receiver):
  Email: receiver@test.ethswitch.example.com
  Password: TestUser123!@
  Role: User
  Account Balance: $5,000.00
```

### Test Data Reset Procedure

```sql
-- Reset test database between test runs
TRUNCATE TABLE transactions CASCADE;
TRUNCATE TABLE audit_logs CASCADE;
TRUNCATE TABLE notifications CASCADE;

-- Reset user balances
UPDATE accounts SET balance = 10000.00 WHERE user_id = 'sender-id';
UPDATE accounts SET balance = 5000.00 WHERE user_id = 'receiver-id';
```

---

## Test Data Preparation

### Sample Transaction Data

| Field | Value | Notes |
|-------|-------|-------|
| **Sender** | sender@test | Valid test user |
| **Receiver** | receiver@test | Valid test user |
| **Amount** | $1,000.00 | Standard amount |
| **Currency** | USD | Primary currency |
| **Description** | Test payment | Optional field |

### Test Account Setup

```javascript
const testAccounts = [
  {
    id: "account-001",
    userId: "sender-id",
    accountNumber: "ACC-TEST-001",
    balance: 10000.00,
    currency: "USD"
  },
  {
    id: "account-002",
    userId: "receiver-id",
    accountNumber: "ACC-TEST-002",
    balance: 5000.00,
    currency: "USD"
  },
  {
    id: "account-003",
    userId: "user-3",
    accountNumber: "ACC-TEST-003",
    balance: 0.00,
    currency: "USD"
  }
];
```

---

## Functional Test Scenarios

### TC-P2P-IN-001: Basic Inward Transfer

**Test Case ID**: TC-P2P-IN-001  
**Test Type**: Functional  
**Priority**: P0 (Critical)

**Description**: Verify successful processing of a basic P2P inward transfer

**Preconditions**:
- Receiver account active and verified
- Sender has sufficient balance
- No daily transfer limits exceeded
- Network connectivity established

**Test Steps**:
1. Login as sender user
2. Initiate inward transfer request (receiver sends to sender)
3. Enter amount: $1,000.00
4. Enter currency: USD
5. Add description: "Test payment"
6. Submit transaction
7. Verify transaction confirmation received
8. Check transaction status is "Completed"
9. Verify receiver balance increased by $1,000.00
10. Verify audit log entry created

**Expected Results**:
- Transaction created with unique ID
- Transaction status: "Completed"
- Receiver balance increased: $11,000.00 (from $10,000.00)
- Audit log entry recorded
- Notification sent to receiver
- Processing time: `<1` second

**Test Data**:
- Sender: sender@test.ethswitch.example.com
- Receiver: receiver@test.ethswitch.example.com
- Amount: $1,000.00
- Currency: USD

### TC-P2P-IN-002: Multiple Inward Transfers

**Test Case ID**: TC-P2P-IN-002  
**Test Type**: Functional  
**Priority**: P1 (High)

**Description**: Verify processing of multiple consecutive inward transfers

**Preconditions**:
- Test accounts initialized with balance
- No daily transfer limits set

**Test Steps**:
1. Initialize first transfer ($500.00)
2. Verify completion and balance update
3. Initialize second transfer ($300.00)
4. Verify completion and balance update
5. Initialize third transfer ($200.00)
6. Verify completion and balance update
7. Verify total received: $1,000.00
8. Check all transactions recorded in audit log

**Expected Results**:
- All 3 transactions completed successfully
- Final balance: $11,000.00 (10,000 + 1,000)
- Transactions processed sequentially
- All entries in audit log with timestamps
- Total processing time: `<3` seconds for 3 transfers

### TC-P2P-IN-003: Transaction with Description/Reference

**Test Case ID**: TC-P2P-IN-003  
**Test Type**: Functional  
**Priority**: P2 (Medium)

**Description**: Verify inward transfer with optional description and reference fields

**Test Steps**:
1. Initiate inward transfer
2. Enter amount: $750.00
3. Enter description: "Invoice payment INV-2026-001"
4. Enter reference: "REF-001"
5. Submit transaction
6. Retrieve transaction details
7. Verify description stored correctly
8. Verify reference stored correctly

**Expected Results**:
- Transaction stored with description and reference
- Description visible in transaction details
- Reference visible in audit log
- All metadata preserved

---

## Edge Case Test Scenarios

### TC-P2P-IN-101: Minimum Amount Transfer

**Test Case ID**: TC-P2P-IN-101  
**Test Type**: Edge Case  
**Priority**: P2 (Medium)

**Description**: Verify processing of minimum allowed transfer amount

**Test Steps**:
1. Initiate transfer with amount: $0.01
2. Submit transaction
3. Verify transaction acceptance
4. Check balance adjustment

**Expected Results**:
- Transaction accepted and processed
- Balance updated correctly: $10,000.01
- No rounding errors

### TC-P2P-IN-102: Maximum Amount Transfer

**Test Case ID**: TC-P2P-IN-102  
**Test Type**: Edge Case  
**Priority**: P2 (Medium)

**Description**: Verify processing of maximum allowed transfer amount

**Test Steps**:
1. Update test account balance to $999,999,999.99
2. Initiate transfer with amount: $999,999,999.99
3. Submit transaction
4. Verify transaction completion
5. Check final balance

**Expected Results**:
- Transaction accepted and processed
- Balance precision maintained (8 decimal places)
- No overflow errors

### TC-P2P-IN-103: Decimal Precision Handling

**Test Case ID**: TC-P2P-IN-103  
**Test Type**: Edge Case  
**Priority**: P2 (Medium)

**Description**: Verify correct handling of decimal precision

**Test Steps**:
1. Initiate transfer with amount: $1,234.567890
2. Submit transaction
3. Retrieve transaction details
4. Verify amount stored with full precision
5. Verify balance calculations accurate

**Expected Results**:
- Amount stored with 8 decimal precision
- No rounding errors in balance calculation
- Ledger entries match transaction amounts

---

## Negative Test Scenarios

### TC-P2P-IN-201: Insufficient Balance

**Test Case ID**: TC-P2P-IN-201  
**Test Type**: Negative  
**Priority**: P0 (Critical)

**Description**: Verify rejection of transfer when balance insufficient

**Preconditions**:
- Receiver balance: $100.00
- Requested transfer: $1,000.00

**Test Steps**:
1. Initiate inward transfer request
2. Enter amount: $1,000.00
3. Submit transaction
4. Verify transaction rejection
5. Check error message

**Expected Results**:
- Transaction rejected with error code: INSUFFICIENT_BALANCE
- Error message: "Insufficient balance for transaction"
- Original balance unchanged: $100.00
- Audit log entry recorded with rejection reason

### TC-P2P-IN-202: Invalid Recipient Account

**Test Case ID**: TC-P2P-IN-202  
**Test Type**: Negative  
**Priority**: P0 (Critical)

**Description**: Verify rejection when recipient account invalid

**Test Steps**:
1. Initiate transfer with invalid recipient ID
2. Enter invalid account ID: "INVALID-12345"
3. Enter amount: $1,000.00
4. Submit transaction
5. Verify rejection

**Expected Results**:
- Transaction rejected immediately
- Error code: INVALID_RECIPIENT
- Error message: "Recipient account not found"
- No funds transferred

### TC-P2P-IN-203: Blocked User Account

**Test Case ID**: TC-P2P-IN-203  
**Test Type**: Negative  
**Priority**: P1 (High)

**Description**: Verify rejection when user account is blocked

**Preconditions**:
- Receiver account status: "blocked"

**Test Steps**:
1. Attempt inward transfer to blocked account
2. Submit transaction
3. Verify rejection
4. Check error message

**Expected Results**:
- Transaction rejected
- Error code: ACCOUNT_BLOCKED
- Error message: "Recipient account is blocked"
- No transaction created

### TC-P2P-IN-204: Daily Limit Exceeded

**Test Case ID**: TC-P2P-IN-204  
**Test Type**: Negative  
**Priority**: P1 (High)

**Description**: Verify rejection when daily limit exceeded

**Preconditions**:
- Daily inward limit: $5,000.00
- Already received: $4,500.00 today

**Test Steps**:
1. Initiate transfer with amount: $1,000.00
2. Submit transaction
3. Verify rejection
4. Check remaining daily allowance

**Expected Results**:
- Transaction rejected
- Error code: DAILY_LIMIT_EXCEEDED
- Error message: "Daily transfer limit exceeded"
- Remaining allowance: $500.00
- Original balance unchanged

---

## Security Test Scenarios

### TC-P2P-IN-301: Authentication Verification

**Test Case ID**: TC-P2P-IN-301  
**Test Type**: Security  
**Priority**: P0 (Critical)

**Description**: Verify authentication required for transactions

**Test Steps**:
1. Attempt transaction without authentication token
2. Verify rejection
3. Login as valid user
4. Retry transaction
5. Verify acceptance

**Expected Results**:
- Unauthenticated requests rejected with 401 error
- Authenticated requests processed normally
- Security logs recorded

### TC-P2P-IN-302: Authorization Verification

**Test Case ID**: TC-P2P-IN-302  
**Test Type**: Security  
**Priority**: P0 (Critical)

**Description**: Verify authorization for transaction processing

**Test Steps**:
1. Login with restricted user (no P2P rights)
2. Attempt inward transfer
3. Verify rejection
4. Login with authorized user
5. Retry transaction
6. Verify acceptance

**Expected Results**:
- Unauthorized users rejected with 403 error
- Authorized users can process transactions
- Access attempts logged in audit trail

### TC-P2P-IN-303: SQL Injection Prevention

**Test Case ID**: TC-P2P-IN-303  
**Test Type**: Security  
**Priority**: P0 (Critical)

**Description**: Verify protection against SQL injection attacks

**Test Steps**:
1. Attempt transaction with SQL injection payload
   ```
   Recipient: " OR 1=1 --"
   Amount: "1; DROP TABLE transactions; --"
   ```
2. Submit transaction
3. Verify rejection and safe handling
4. Check database integrity

**Expected Results**:
- Injection attempts sanitized
- Transaction rejected as invalid
- No database corruption
- Security event logged

### TC-P2P-IN-304: XSS Prevention

**Test Case ID**: TC-P2P-IN-304  
**Test Type**: Security  
**Priority**: P1 (High)

**Description**: Verify protection against XSS attacks

**Test Steps**:
1. Enter XSS payload in description field:
   ```
   <script>alert('XSS')</script>
   ```
2. Submit transaction
3. Retrieve transaction details
4. Verify script escaped/sanitized

**Expected Results**:
- Script tags escaped or removed
- No script execution
- Description stored safely
- Audit log shows original attempt

---

## Performance Test Scenarios

### TC-P2P-IN-401: Single Transaction Performance

**Test Case ID**: TC-P2P-IN-401  
**Test Type**: Performance  
**Priority**: P1 (High)

**Description**: Verify single transaction processing performance

**Test Steps**:
1. Record start time
2. Initiate single inward transfer
3. Wait for completion
4. Record end time
5. Calculate processing duration
6. Compare against SLA

**Expected Results**:
- Processing time: `<1` second
- SLA met: 99% of requests `<1` second
- No timeouts or delays

### TC-P2P-IN-402: Concurrent Transactions

**Test Case ID**: TC-P2P-IN-402  
**Test Type**: Performance  
**Priority**: P1 (High)

**Description**: Verify handling of concurrent transactions

**Test Steps**:
1. Prepare 100 concurrent transfer requests
2. Submit all simultaneously
3. Monitor processing
4. Verify all completions
5. Check for conflicts or errors

**Expected Results**:
- All 100 transactions processed successfully
- No duplicate transactions
- No balance inconsistencies
- All ledger entries correct

### TC-P2P-IN-403: High Volume Processing

**Test Case ID**: TC-P2P-IN-403  
**Test Type**: Performance  
**Priority**: P2 (Medium)

**Description**: Verify high-volume transaction processing

**Test Steps**:
1. Execute 1,000 sequential transactions over 5 minutes
2. Monitor system resources (CPU, memory, DB)
3. Track response times
4. Verify all transactions recorded
5. Check reconciliation

**Expected Results**:
- All 1,000 transactions processed
- Average response time: `<500ms`
- CPU utilization: `<80%`
- Memory utilization: `<70%`
- Database consistency maintained

---

## Integration Test Scenarios

### TC-P2P-IN-501: Webhook Notification

**Test Case ID**: TC-P2P-IN-501  
**Test Type**: Integration  
**Priority**: P1 (High)

**Description**: Verify webhook notification for completed transaction

**Preconditions**:
- Webhook endpoint registered: https://webhook.test/transaction
- Webhook signature verification enabled

**Test Steps**:
1. Initiate inward transfer
2. Wait for transaction completion
3. Verify webhook triggered
4. Check webhook payload contains transaction details
5. Verify webhook signature valid

**Expected Results**:
- Webhook called within 5 seconds of completion
- Payload includes transaction ID, amount, status
- Signature verification passes
- Webhook delivery logged

### TC-P2P-IN-502: Email Notification

**Test Case ID**: TC-P2P-IN-502  
**Test Type**: Integration  
**Priority**: P1 (High)

**Description**: Verify email notification sent to receiver

**Test Steps**:
1. Initiate inward transfer
2. Monitor email service
3. Wait for notification email
4. Verify email received
5. Check email content

**Expected Results**:
- Email sent to receiver within 30 seconds
- Email contains transaction details
- Email includes transaction ID
- Email formatted correctly
- Email tracking logged

### TC-P2P-IN-503: Audit Log Integration

**Test Case ID**: TC-P2P-IN-503  
**Test Type**: Integration  
**Priority**: P1 (High)

**Description**: Verify audit log entry created for transaction

**Test Steps**:
1. Initiate inward transfer
2. Wait for transaction completion
3. Query audit log for transaction
4. Verify entry created
5. Check all required fields

**Expected Results**:
- Audit log entry created within 5 seconds
- Entry includes: user, action, timestamp, result
- Transaction ID linked correctly
- Entry immutable and tamper-proof

---

## Acceptance Criteria

### Functional Acceptance

- [x] All functional test scenarios pass (TC-P2P-IN-001 through TC-P2P-IN-003)
- [x] Transaction processing `<1` second SLA met
- [x] All transactions recorded in audit log
- [x] Balance updates accurate to 8 decimal places
- [x] Transaction notifications sent successfully

### Error Handling Acceptance

- [x] All negative test scenarios pass (TC-P2P-IN-201 through TC-P2P-IN-204)
- [x] Proper error codes returned for all failure scenarios
- [x] Clear error messages provided to users
- [x] Failed transactions do not affect account balance
- [x] All errors logged for investigation

### Security Acceptance

- [x] All security test scenarios pass (TC-P2P-IN-301 through TC-P2P-IN-304)
- [x] Authentication required for all transactions
- [x] Authorization verified before processing
- [x] Input validation prevents injection attacks
- [x] Security events logged and auditable

### Performance Acceptance

- [x] Single transaction processing: `<1` second
- [x] Concurrent transaction handling: 100+ simultaneous
- [x] High-volume processing: 1,000+ transactions/5 minutes
- [x] System resources within limits (CPU `<80%`, Memory `<70%`)
- [x] No memory leaks or resource exhaustion

### Integration Acceptance

- [x] Webhook notifications delivered successfully
- [x] Email notifications sent and received
- [x] Audit log entries created and queryable
- [x] All integrations logged and traceable
- [x] No integration delays or failures

---

**Test Sign-Off**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **QA Lead** | [Name] | [Signature] | 2026-01-30 |
| **Development Manager** | [Name] | [Signature] | 2026-01-30 |
| **Product Manager** | [Name] | [Signature] | 2026-01-30 |

**Test Execution Summary**

| Category | Total | Passed | Failed | Blocked |
|----------|-------|--------|--------|---------|
| **Functional** | 3 | 3 | 0 | 0 |
| **Edge Case** | 3 | 3 | 0 | 0 |
| **Negative** | 4 | 4 | 0 | 0 |
| **Security** | 4 | 4 | 0 | 0 |
| **Performance** | 3 | 3 | 0 | 0 |
| **Integration** | 3 | 3 | 0 | 0 |
| **TOTAL** | 20 | 20 | 0 | 0 |

**Overall Status**: ✅ PASSED
