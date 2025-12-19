# Data Type References

This section provides a complete reference for all data types, enumerations, and validation rules used across OpenCMS APIs.  
It ensures data consistency and compatibility between Authentication, Card Lifecycle, Inquiry, and Limit & Preferences APIs.

---

# Overview

- OpenCMS APIs use **JSON** for all requests and responses.  
- Each field follows a strict data type definition to ensure schema validation, API security, and predictable integration.

---

# Standard Data Types

| Type | Description | Example | Allowed Format / Range | Common Fields |
|------|-------------|---------|------------------------|----------------|
| **string** | Text or alphanumeric data | `"OpenCMS"` | Up to 64 characters | CardId, UserName, Status |
| **integer** | Whole number without decimals | `1001` | 0–999999999 | Amount, CustomerId |
| **long** | Large numeric identifier | `23132313131313` | 13–20 digits | RRN, TransactionId |
| **boolean** | True/false values | `true` | Boolean literal | IsActive, IsVerified |
| **date** | ISO 8601 date | `"2025-04-15"` | YYYY-MM-DD | CardExpiryDate, DOB |
| **dateTime** | Date + time with timezone | `"2025-04-15T10:45:30Z"` | YYYY-MM-DDThh:mm:ssZ | CreatedAt, UpdatedAt |
| **decimal** | Decimal number (2 digits) | `2500.75` | 0–99999999.99 | Amount, Fee |
| **enum** | Predefined value set | `"Active"` | See enum section | CardStatus, TxnType |
| **object** | Key-value structure | `{ "cardId": "123" }` | JSON object | Customer, Data |
| **array** | List of values or objects | `["ATM","POS","Ecom"]` | JSON array | AllowedChannels |

---

# Enumerations

## Card Status Enumeration

| Value | Description |
|--------|-------------|
| **Fresh** | Card generated but not activated |
| **Active** | Card is active for transactions |
| **Warm** | Temporarily blocked / under review |
| **Hot** | Permanently blocked / fraud flagged |
| **Expired** | Card validity ended |
| **Replaced** | Card replaced with new one |

---

## Transaction Type Enumeration

| Value | Description |
|--------|-------------|
| **Credit** | Adds funds |
| **Debit** | Deducts funds |
| **Reversal** | Reverses a transaction |
| **Adjustment** | Manual debit/credit by back office |

---

## Identification Type Enumeration

| Value | Description |
|--------|-------------|
| **CNIC** | Pakistan National ID |
| **Passport** | Passport number |
| **NTN** | Business tax number |
| **EmployeeID** | Internal staff identifier |

---

# Naming Conventions

| Convention | Usage | Example |
|------------|--------|---------|
| **camelCase** | API request/response parameters | customerId, productCode |
| **PascalCase** | Database models / UI labels | CardId, ResponseCode |
| **snake_case** | System logs, internal configs | transaction_type, card_status |

---

# Validation Rules

| Validation Type | Description | Applies To |
|------------------|-------------|------------|
| **Mandatory Fields** | Must be provided in every request | cardId, rrn, productCode |
| **Length Validation** | Must not exceed set limit | iban, rrn, idValue |
| **Pattern Validation** | Regex-based validation | CNIC → `[0-9]{13}` |
| **Enum Validation** | Only predefined values allowed | cardStatus, txnType |
| **Data Type Check** | Reject if type mismatch | All fields |

---

# Example Schema

```json
{
  "customerId": "10000045",
  "cardId": "100000245",
  "rrn": "23132313131313",
  "idType": "CNIC",
  "idValue": "4210101010101",
  "amount": 5000.75,
  "currency": "PKR",
  "transactionType": "Credit",
  "isActive": true,
  "createdAt": "2025-04-15T10:45:30Z"
}

Validation Output Example

| Field           | Validation Type   | Result | Message                 |
| --------------- | ----------------- | ------ | ----------------------- |
| customerId      | Length Check      | Pass   | Valid                   |
| idValue         | Pattern Check     | Pass   | CNIC format verified    |
| amount          | Decimal Precision | Pass   | Valid (2 decimals)      |
| transactionType | Enum Validation   | Fail   | Must be Credit or Debit |


## Developer Notes

- All numeric values must be sent without commas or formatting.

- Any invalid field triggers this error:

All numeric values must be sent without commas or formatting.

Any invalid field triggers this error:

- Nested JSON objects must follow OpenCMS schema rules.

- Always validate API payloads before sending requests.

## Next Steps

- Continue to Response Codes & Error Handling
- Explore Card Lifecycle APIs
- Test with API Explorer