# Developer Workflow

Integrate with OpenCMS API for card lifecycle management, authentication, inquiries, limits, and preferences.

---

## 1 Authentication

Obtain a JWT token to authorize all API requests.

**Endpoint:** `POST /api/v1/authenticate`

**Request:**
```json
{
  "username": "partner_user",
  "password": "s3cr3t#Key"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiry": "1737620181064"
}
```

**Header for all requests:**
```
X-Auth-Token: eyJhbGciOiJI...
```
---

## 2 Card Lifecycle (Create → Activate)

### A. Create Card

Issue a physical or virtual card using `/api/v1/Card/create`.

**Request:**
```json
{
  "idValue": "4220142163583",
  "idType": "CNIC",
  "productCode": "DEBIT001",
  "embossName": "MEGAN ROSS",
  "virtual": true,
  "idempotencyKey": "f0d32e10-91d7-4029-8ad3-1a70b8c93d7a",
  "rrn": "21212121232"
}
```

### B. Activate Card / Generate PIN

Activate the card using `/activateCard`.

**Request:**
```json
{
  "idType": "CNIC",
  "idValue": "4220142163583",
  "format": "01",
  "pin": "BASE64ENC_PIN",
  "rrn": "21212121232",
  "transactionDate": "2025-01-21T05:06:14.875Z"
}
```---

## 3 Card Inquiry

Retrieve all cards linked to a customer using `/getCardsByCustomer`.

**Endpoint:** `GET /getCardsByCustomer/{idValue}/{rrn}`

**Response:**
```json
{
  "responseCode": "00",
  "responseDescription": "OK",
  "data": {
    "cardList": [
      {
        "cardId": 202,
        "cardNumber": "22058*****000269",
        "cardStatus": "Fresh",
        "productName": "PayPak Pink Cards"
      }
    ]
  }
}
```
---

## 4 Card Limits

Set or update card transaction limits using `/setCustomerCardLimits`.

**Request:**
```json
{
  "idType": "CNIC",
  "idValue": "4220142163583",
  "dailyLimit": 50000,
  "perTxnLimit": 20000,
  "channel": "ECOM",
  "rrn": "21212121232"
}
```---

## 5 Block Rules

### Get Rules

Retrieve card block rules using `/getCardBlockRules`.

**Request:**
```json
{
  "cardId": 3,
  "type": "ALL",
  "rrn": "21212121232"
}
```

### Update Rules

Update card block rules using `/updateCardBlockRules`.

**Request:**
```json
{
  "cardId": 3,
  "countryCodes": [{ "countryAlpha3Code": "ARG", "status": "ACTIVE" }],
  "mcc": [{ "code": "4111", "status": "ACTIVE" }],
  "rrn": "21212121232"
}
```---

## 6 Channel Preferences

### Get Preferences

Retrieve customer channel preferences using `/getCustomerChannelPreferences`.

**Endpoint:** `GET /getCustomerChannelPreferences/{idValue}/{rrn}`

### Update Preferences

Update customer channel preferences using `/updateCustomerChannelPreferences`.

**Request:**
```json
{
  "idType": "CNIC",
  "idValue": "4220142163583",
  "preferences": [
    { "channelCode": "ECOM", "enabled": true }
  ],
  "rrn": "21212121232"
}
```---

## 7 Card Status

Block or re-activate a card using `/setCardStatus`.

**Request:**
```json
{
  "cardId": 12345,
  "status": "BLOCKED",
  "reason": "Customer request",
  "rrn": "21212121232"
}
```---

## 8 Error Handling

All API failures return a standard error structure.

**Error Response:**
```json
{
  "responseCode": "99",
  "responseDescription": "Invalid parameter or card not found"
}
```

Refer to the Response Codes section for complete error mappings.

## Workflow Summary

| Step | Description          | Example                                  |
| ---- | -------------------- | ---------------------------------------- |
| 1    | Obtain token         | `/api/v1/authenticate`                   |
| 2    | Create/activate card | `/api/v1/Card/create`, `/activateCard`   |
| 3    | Fetch details        | `/getCardsByCustomer`, `/getCardDetails` |
| 4    | Configure limits     | `/setCustomerCardLimits`                 |
| 5    | Apply restrictions   | `/updateCardBlockRules`                  |
| 6    | Manage preferences   | `/updateCustomerChannelPreferences`      |
| 7    | Manage status        | `/setCardStatus`                         |
| 8    | Handle errors        | `responseCode + responseDescription`     |