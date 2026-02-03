# Unified Layer API Specification

## Overview

**Title:** Unified Layer  
**Description:** Unified Layer API Gateway For Channel  
**Version:** 1.0.0  
**Base URL:** `http://192.168.20.99:9091`

**Contact Information:**
- **Name:** Paysys Labs
- **URL:** https://www.paysyslabs.com/
- **Email:** umer.atiq@paysyslabs.com

---

## Authentication

The API uses Bearer Token authentication (JWT). All endpoints except `/authenticate` require a valid Bearer token in the Authorization header.

**Security Scheme:**
- **Type:** HTTP Bearer Authentication
- **Scheme:** bearer
- **Bearer Format:** JWT

---

## Endpoints

### 1. Authentication

#### POST `/authenticate`

**Summary:** Get Access Token  
**Description:** Validate User and Generate Access Token  
**Tags:** Authentication Controller

**Headers:**
- `Authorization` (optional): Bearer Token

**Request Body:**

**JSON Example:**
```json
{
  "username": "abcd",
  "password": "testing",
  "channel": "modelbank"
}
```

**XML Example:**
```xml
<request>
  <username>abcd</username>
  <password>testing</password>
  <channel>modelbank</channel>
</request>
```

**Schema:**
```json
{
  "username": "string (required, min length: 1)",
  "password": "string (required, min length: 1)",
  "channel": "string (required, min length: 1)"
}
```

**Responses:**

**Success (200):**

JSON:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1bWVyfG1vZGVsYmFuayIsImV4cCI6MTc1NDAzNzAwNSwiaWF0IjoxNzUzOTUwNjA1fQ.7bttxPS8CLL3t9JZbiPgvNc_Ng16vHYzw1MooRI1LwGgDilEyCrGF8vqHhef1THLud9Wv9Y_4k7ZgVuu1R71Rg",
  "expiry": "1754037005"
}
```

XML:
```xml
<JwtResponse>
  <token>eyJhbGciOiJIUzUxMiJ9...</token>
  <expiry>1754036537</expiry>
</JwtResponse>
```

**Error - Invalid Channel (200):**
```json
{
  "response": {
    "response_code": "401",
    "response_desc": "Invalid channel"
  }
}
```

**Error - Invalid Credentials (200):**
```json
{
  "response": {
    "response_code": "401",
    "response_desc": "invalid username/pass"
  }
}
```

**Internal Server Error (500):**
```json
{
  "response": {
    "response_code": "500",
    "response_desc": "Internal Server Error"
  }
}
```

---

### 2. Transaction Inquiry

#### POST `/api/v1/paysyslabs/txninquiry`

**Summary:** Initiate a Transaction Inquiry  
**Description:** Initiate a Transaction Inquiry to The Receiver Bank for processes Transaction - PACS028  
**Tags:** Payment (P2P) Controller  
**Security:** Requires Bearer Token

**Headers:**
- `Authorization` (optional): Bearer Token

**Request Body:**

**JSON Example:**
```json
{
  "info": {
    "senderRef": "AWINETAA509014010010000901",
    "txnDateTime": "2023-06-24T00:00:00.000+03:00"
  },
  "orgTxnInfo": {
    "originalTransactionID": "AWINETAA509014010010000500",
    "receiverParticipantBIC": "ETSETAAX"
  }
}
```

**XML Example:**
```xml
<request>
  <info>
    <senderRef>AWINETAA509014010010000901</senderRef>
    <txnDateTime>2023-06-24T00:00:00.000+03:00</txnDateTime>
  </info>
  <orgTxnInfo>
    <originalTransactionID>AWINETAA509014010010000500</originalTransactionID>
    <receiverParticipantBIC>ETSETAAX</receiverParticipantBIC>
  </orgTxnInfo>
</request>
```

**Schema:**

**Info Object:**
- `senderRef`: string (required, min: 6, max: 40)
- `txnDateTime`: string (required, pattern: `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$`)

**OrgTxnInfo Object:**
- `originalTransactionID`: string (required, length: 26, pattern: `^[A-Z]{8}[0-9]{18}$`)
- `receiverParticipantBIC`: string (required, min: 5, max: 16, pattern: `^(?!.*<[^>]*>).*`)

**Responses:**

**Success (200):**

JSON:
```json
{
  "response": {
    "response_code": "000",
    "response_desc": "Success",
    "info": {
      "senderRef": "AWINETAA509014010010000900",
      "receiverRef": "AWINETAA509014010010000500"
    },
    "orgTxnResult": {
      "response_code": "000",
      "toAccount": "1234567890",
      "amount": "600",
      "orgnlTxId": "AWINETAA509014010010000500",
      "response_desc": "Success",
      "bankBIC": "IPSETAAX",
      "fromAccount": "05421236547552",
      "txnDateTime": "2025-07-12T11:20:54.450+03:00"
    }
  }
}
```

**Error - Transaction Not Found (200):**
```json
{
  "response": {
    "response_code": "007",
    "response_desc": "TxnID was not found in IPS.",
    "info": {
      "senderRef": "AWINETAA509014010010000901",
      "receiverRef": "AWINETAA509014010010000510"
    }
  }
}
```

**Bad Request (400):**

Invalid Token:
```json
{
  "response": {
    "response_code": "400",
    "response_desc": "Error while parsing token"
  }
}
```

Malformed Token:
```json
{
  "response": {
    "response_code": "401",
    "response_desc": "Malformed Token"
  }
}
```

**Internal Server Error (500):**
```json
{
  "response": {
    "response_code": "500",
    "response_desc": "Internal Server Error"
  }
}
```

---

### 3. Return Payment

#### POST `/api/v1/paysyslabs/returnpayment`

**Summary:** Initiate a Return Payment to the Destination Bank  
**Description:** Send a Return Payment Request to Sender Participant (If credit failed on Receiver side / Dispute) - (PACS004)  
**Tags:** Payment (P2P) Controller  
**Security:** Requires Bearer Token

**Headers:**
- `Authorization` (optional): Bearer Token

**Request Body:**

**JSON Example:**
```json
{
  "info": {
    "senderRef": "AWINETAA509014010010000899",
    "txnDateTime": "2023-06-24T00:00:00.000+03:00"
  },
  "orgTxnInfo": {
    "originalTransactionID": "AWINETAA509014010010000890",
    "bankBIC": "IPSETAAX",
    "returnAmount": 600,
    "currency": "ETB",
    "reasonCode": "EJXS",
    "reason": "Account not valid"
  }
}
```

**XML Example:**
```xml
<root>
  <info>
    <senderRef>AWINETAA509014010010000899</senderRef>
    <txnDateTime>2023-06-24T00:00:00.000+03:00</txnDateTime>
  </info>
  <orgTxnInfo>
    <originalTransactionID>AWINETAA509014010010000890</originalTransactionID>
    <bankBIC>IPSETAAX</bankBIC>
    <returnAmount>600</returnAmount>
    <currency>ETB</currency>
    <reasonCode>EJXS</reasonCode>
    <reason>Account not valid</reason>
  </orgTxnInfo>
</root>
```

**Schema:**

**ReturnPaymentOrgTxnInfo Object:**
- `originalTransactionID`: string (required, min: 6, max: 40)
- `bankBIC`: string (required, min: 8, max: 16, pattern: `^(?!.*<[^>]*>).*`)
- `returnAmount`: number (required)
- `currency`: string (required, length: 3)
- `reasonCode`: string (required, min: 3, max: 10)
- `reason`: string (required, min: 1)

**Responses:**

**Success (200):**

JSON:
```json
{
  "response": {
    "response_code": "000",
    "response_desc": "Success",
    "info": {
      "senderRef": "AWINETAA509014010010000899",
      "receiverRef": "AWINETAA509014010010000890"
    }
  }
}
```

**Error - Invalid Creditor BIC (200):**
```json
{
  "response": {
    "response_code": "037",
    "response_desc": "Creditor BIC identifier is invalid or missing",
    "info": {
      "senderRef": "AWINETAA509014010010000892",
      "receiverRef": "AWINETAA509014010010000890"
    }
  }
}
```

**Bad Request (400):**
```json
{
  "response": {
    "response_code": "400",
    "response_desc": "Error while parsing token"
  }
}
```

**Internal Server Error (500):**
```json
{
  "response": {
    "response_code": "500",
    "response_desc": "Internal Server Error"
  }
}
```

---

### 4. Get Participant List

#### GET `/api/v1/paysyslabs/participantlist`

**Summary:** Get Participant List (Banks)  
**Description:** Get Participant List From DB (Banks)  
**Tags:** Common Controller  
**Security:** Requires Bearer Token

**Headers:**
- `Authorization` (optional): Bearer Token

**Responses:**

**Success (200):**

JSON:
```json
{
  "response": {
    "response_code": "000",
    "response_desc": "Success",
    "participants": [
      {
        "bankBIC": "AWINETAA",
        "bankDisplayName": "AWINETAA",
        "availableP2PALIAS": false,
        "availableP2P": false,
        "availableBulk": false,
        "availableTF": false,
        "availableP2M": false,
        "availableP2MRTP": false
      },
      {
        "bankBIC": "DASHETAA",
        "bankDisplayName": "DASHETAA",
        "availableP2PALIAS": true,
        "availableP2P": true,
        "availableBulk": true,
        "availableTF": true,
        "availableP2M": true,
        "availableP2MRTP": true
      }
    ]
  }
}
```

**Bad Request (400)**

**Internal Server Error (500)**

---

### 5. Get Transaction Purpose

#### GET `/api/v1/paysyslabs/gettransactionpurpose`

**Summary:** Get Purpose List  
**Description:** Get Transaction Purpose List  
**Tags:** Payment (P2P) Controller  
**Security:** Requires Bearer Token

**Headers:**
- `Authorization` (optional): Bearer Token

**Responses:**

**Success (200):**

JSON:
```json
{
  "response": {
    "response_code": "000",
    "data": {
      "data_wrapper": [
        {
          "code": "AIRTK",
          "description": "AIRTK"
        },
        {
          "code": "BCLUB",
          "description": "BCLUB"
        },
        {
          "code": "BUSTP",
          "description": "BUSTP"
        }
      ]
    },
    "response_desc": "Success"
  }
}
```

**Bad Request (400)**

**Internal Server Error (500)**

---

### 6. Get Transaction Categories

#### GET `/api/v1/paysyslabs/gettransactioncategories`

**Summary:** Get Category List  
**Description:** Get Transaction Category List  
**Tags:** Payment (P2P) Controller  
**Security:** Requires Bearer Token

**Headers:**
- `Authorization` (optional): Bearer Token

**Responses:**

**Success (200):**

JSON:
```json
{
  "response": {
    "response_code": "000",
    "data": {
      "data_wrapper": [
        {
          "code": "C2BBPT",
          "description": "C2BBPT"
        },
        {
          "code": "C2CCRT",
          "description": "C2CCRT"
        },
        {
          "code": "C2CRTP",
          "description": "C2CRTP"
        }
      ]
    }
  }
}
```

**Bad Request (400)**

**Internal Server Error (500)**

---

### 7. Create Customer

#### POST `/api/v1/paysyslabs/customers/createCustomer`

**Summary:** Create Customer  
**Description:** Create Customer Details in IPS  
**Tags:** Customer Management Controller  
**Security:** Requires Bearer Token

**Headers:**
- `Authorization` (optional): Bearer Token

**Request Body:**

**JSON Example:**
```json
{
  "info": {
    "senderRef": "AWINETAA509014010010000635",
    "txnDateTime": "2023-06-24T00:00:00.000+03:00"
  },
  "firstName": "Mutaher",
  "lastName": "Affan",
  "gender": "MALE",
  "companyName": "MutaherAffan0302",
  "dob": "1988-06-05T08:46:16.353Z",
  "type": "COMPANY",
  "firstEmail": "mutheraffan22@ethswitch.com",
  "secondEmail": "mutaher.affan22@gmail.com",
  "externalId": "1234567727",
  "linkageType": "UNIVERSAL_DEFAULT",
  "documentType": "NATIONAL_ID",
  "documentId": "4420365899663",
  "documentValidityDate": "2024-12-31T08:46:16.353Z",
  "msisdn": "+251-911-1234527"
}
```

**Schema:**
- `info`: Info object (required)
- `companyName`: string
- `firstName`: string
- `lastName`: string
- `gender`: string
- `dob`: string (pattern: `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$`)
- `type`: string (required, min: 1)
- `firstEmail`: string (required, min: 1)
- `secondEmail`: string (required, min: 1)
- `externalId`: string (required, min: 1)
- `linkageType`: string (required, min: 1)
- `documentType`: string (required, min: 1)
- `documentId`: string (required, min: 1)
- `documentValidityDate`: string (required, min: 1, pattern: `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$`)
- `msisdn`: string (required, min: 1)

**Responses:**

**Success (200):**

JSON:
```json
{
  "response": {
    "response_code": "000",
    "data": {
      "response": {
        "lastName": null,
        "gender": null,
        "documentValidityDate": "2024-12-31T08:46:16.353Z",
        "documentType": "NATIONAL_ID",
        "companyName": "MutaherAffan0302",
        "secondEmail": "mutaher.affan21@gmail.com",
        "linkageType": "UNIVERSAL_DEFAULT",
        "externalId": "1234567726",
        "type": "COMPANY",
        "uuid": "f857435d-3688-4f00-b9ce-f21b2efe7cef",
        "firstName": null,
        "createdDate": "2025-07-31T11:29:25.362Z",
        "firstEmail": "mutheraffan21@ethswitch.com",
        "msisdnIsOwned": "true",
        "dob": null,
        "modifiedDate": null,
        "documentId": "4420365899662",
        "id": "11141",
        "msisdn": "+251-911-1234526",
        "status": "ACTIVE"
      }
    },
    "response_desc": "Success"
  }
}
```

**Bad Request (400)**

**Internal Server Error (500)**

---

### 8. Get Customer Info by UUID

#### POST `/api/v1/paysyslabs/customers/getCustomerInfoByUUID`

**Summary:** Get Customer Info  
**Description:** Get Customer Info By UUID  
**Tags:** Customer Management Controller  
**Security:** Requires Bearer Token

**Headers:**
- `Authorization` (optional): Bearer Token

**Request Body:**

**JSON Example:**
```json
{
  "info": {
    "senderRef": "AWINETAA509014010010000635",
    "txnDateTime": "2023-06-24T00:00:00.000+03:00"
  },
  "customerUUID": "35bbb9b9-8a72-4854-8b4d-912492da73f6"
}
```

**Schema:**
- `info`: Info object (required)
- `customerUUID`: string (required, min: 1)

**Responses:**

**Success (200)**

**Bad Request (400)**

**Internal Server Error (500)**

---

## Common Data Models

### Info Object

```json
{
  "senderRef": "string (min: 6, max: 40)",
  "txnDateTime": "string (format: YYYY-MM-DDTHH:mm:ss.SSS±HH:mm)"
}
```

**Validations:**
- `senderRef`: Required, minimum 6 characters, maximum 40 characters
- `txnDateTime`: Required, must match pattern `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$`

---

## Response Codes

| Code | Description |
|------|-------------|
| 000 | Success |
| 007 | TxnID was not found in IPS |
| 037 | Creditor BIC identifier is invalid or missing |
| 400 | Error while parsing token |
| 401 | Invalid channel / Invalid username/pass / Malformed Token |
| 500 | Internal Server Error |

---

## Notes

1. **Date/Time Formats:**
   - Transaction DateTime: `YYYY-MM-DDTHH:mm:ss.SSS±HH:mm` (e.g., `2023-06-24T00:00:00.000+03:00`)
   - Customer DOB/Document Validity: `YYYY-MM-DDTHH:mm:ss.SSSZ` (e.g., `1988-06-05T08:46:16.353Z`)

2. **Content Types:**
   - The API supports both `application/json` and `application/xml` for request and response bodies

3. **Authentication Flow:**
   - First, call `/authenticate` with credentials to obtain a JWT token
   - Include the token in the `Authorization` header as `Bearer <token>` for subsequent requests
   - Tokens have an expiry time included in the authentication response

4. **Transaction ID Format:**
   - Original Transaction ID must be 26 characters
   - Pattern: 8 uppercase letters followed by 18 digits (e.g., `AWINETAA509014010010000500`)

5. **BIC Code Format:**
   - Bank BIC codes must be between 5-16 characters for receiver participant
   - Between 8-16 characters for return payment operations
   - Must not contain HTML tags

---

## Error Handling

All endpoints return errors in a consistent format:

```json
{
  "response": {
    "response_code": "error_code",
    "response_desc": "Error description"
  }
}
```

Common error scenarios:
- **Invalid/Malformed Token:** Returns 400/401 with appropriate message
- **Internal Server Error:** Returns 500 with generic error message
- **Business Logic Errors:** Returns 200 with specific error codes (007, 037, etc.)