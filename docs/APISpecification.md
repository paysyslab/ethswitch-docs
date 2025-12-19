
# API Specification

## Authenticate API

**POST** `https://api.opencms.paysyslabs.com/api/v1/authenticate`

Obtain a JWT token for accessing all secured OpenCMS APIs.

### Description

This endpoint authenticates a user based on provided credentials and returns a valid JWT token for subsequent API requests.

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| username | string | Yes | Username (3-64 characters) |
| password | string | Yes | Password (8-128 characters) |

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| Content-Type | string | Yes | `application/json` |
| Accept | string | Yes | `application/json` |

### Response

**200 OK** — Authentication Successful

```json
{
  "responseCode": "00",
  "responseDescription": "Success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiry": "1737620181064",
    "message": "Authentication successful",
    "timeStamp": "2025-01-01T10:00:00Z"
  }
}
```

**401 Unauthorized** — Invalid Credentials

```json
{
  "responseCode": "01",
  "responseDescription": "Invalid credentials",
  "data": null
}
```

### Code Examples

#### Shell / cURL

```bash
curl --request POST \
  --url https://api.opencms.paysyslabs.com/api/v1/authenticate \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --data '{
    "username": "partner_user",
    "password": "s3cr3t#Key"
  }'
```

#### Node.js

```javascript
const fetch = require('node-fetch');

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    username: 'partner_user',
    password: 's3cr3t#Key'
  })
};

fetch('https://api.opencms.paysyslabs.com/api/v1/authenticate', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Python

```python
import requests
import json

url = "https://api.opencms.paysyslabs.com/api/v1/authenticate"
headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
payload = {
    "username": "partner_user",
    "password": "s3cr3t#Key"
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())
```

#### PHP

```php
<?php
$url = "https://api.opencms.paysyslabs.com/api/v1/authenticate";
$headers = array(
    "Content-Type: application/json",
    "Accept: application/json"
);
$payload = array(
    "username" => "partner_user",
    "password" => "s3cr3t#Key"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

#### Ruby

```ruby
require 'net/http'
require 'json'

url = URI("https://api.opencms.paysyslabs.com/api/v1/authenticate")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request["Accept"] = "application/json"
request.body = JSON.generate({
  "username" => "partner_user",
  "password" => "s3cr3t#Key"
})

response = http.request(request)
puts response.body
```

---


```

## Activate / Generate PIN / Change PIN API

**POST** `https://api.opencms.paysyslabs.com/api/v1/management/activateCard`

Activate a card, generate a new PIN, or change an existing PIN.

### Body Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| idType | string | Yes | Customer identifier type: `CNIC`, `NIN`, `PASSPORT`, `ACCOUNT`, `MOBILE`, `NICOP`, `NTN` |
| idValue | string | Yes | ID value (5-32 characters) |
| channel | string | Yes | Transaction channel: `003` (IVR), `004` (Digital) |
| cardId | integer | Yes | Valid card ID |
| pin | string | Yes | New PIN (RSA 2048 + PKCS#1 v1.5 + Base64 encrypted) |
| oldPin | string | No | Required only for PIN change (encrypted) |
| format | string | Yes | Format type (2 characters) |
| transactionDate | datetime | Yes | ISO 8601 format (e.g., `2025-01-21T05:06:14.875Z`) |
| cardExpiry | string | No | Card expiry in `YYMM` format |
| rrn | string | No | Retrieval reference number (6-32 characters) |
| accountNumber | string | No | Customer account number |
| narration | string | No | Optional narration |

### Headers

| Header | Type | Required |
|--------|------|----------|
| X-Auth-Token | string | Yes |
| Content-Type | string | Yes |

### Response

**200 OK** — Card Activation Successful

```json
{
  "responseCode": "00",
  "responseDescription": "Processed successfully.",
  "data": {
    "message": "Card activated",
    "timeStamp": "2025-10-30T12:45:33Z"
  }
}
```

**400 Bad Request** — Validation Error

```json
{
  "responseCode": "05",
  "responseDescription": "Validation error",
  "data": null,
  "timeStamp": "2025-10-30T12:46:00Z"
}
```

### Code Examples

#### Shell / cURL

```bash
curl --request POST \
  --url https://api.opencms.paysyslabs.com/api/v1/management/activateCard \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: your_token_here' \
  --data '{
    "idType": "CNIC",
    "idValue": "4210101010101",
    "channel": "003",
    "cardId": 1001,
    "pin": "BASE64_PIN",
    "format": "01",
    "transactionDate": "2025-01-21T05:06:14.875Z"
  }'
```

#### Node.js

```javascript
const fetch = require('node-fetch');

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'your_token_here'
  },
  body: JSON.stringify({
    idType: 'CNIC',
    idValue: '4210101010101',
    channel: '003',
    cardId: 1001,
    pin: 'BASE64_PIN',
    format: '01',
    transactionDate: '2025-01-21T05:06:14.875Z'
  })
};

fetch('https://api.opencms.paysyslabs.com/api/v1/management/activateCard', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Python

```python
import requests
import json

url = "https://api.opencms.paysyslabs.com/api/v1/management/activateCard"
headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": "your_token_here"
}
payload = {
    "idType": "CNIC",
    "idValue": "4210101010101",
    "channel": "003",
    "cardId": 1001,
    "pin": "BASE64_PIN",
    "format": "01",
    "transactionDate": "2025-01-21T05:06:14.875Z"
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())
```

#### PHP

```php
<?php
$url = "https://api.opencms.paysyslabs.com/api/v1/management/activateCard";
$headers = array(
    "Content-Type: application/json",
    "X-Auth-Token: your_token_here"
);
$payload = array(
    "idType" => "CNIC",
    "idValue" => "4210101010101",
    "channel" => "003",
    "cardId" => 1001,
    "pin" => "BASE64_PIN",
    "format" => "01",
    "transactionDate" => "2025-01-21T05:06:14.875Z"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

#### Ruby

```ruby
require 'net/http'
require 'json'

url = URI("https://api.opencms.paysyslabs.com/api/v1/management/activateCard")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request["X-Auth-Token"] = "your_token_here"
request.body = JSON.generate({
  "idType" => "CNIC",
  "idValue" => "4210101010101",
  "channel" => "003",
  "cardId" => 1001,
  "pin" => "BASE64_PIN",
  "format" => "01",
  "transactionDate" => "2025-01-21T05:06:14.875Z"
})

response = http.request(request)
puts response.body
```

---

```

## Create / Issue Card API

**POST** `https://api.opencms.paysyslabs.com/api/v1/Card/createCard`

Create a new card request (physical or virtual).

### Body Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| accountNumber | string | Yes | Customer account number |
| applicationType | string | Yes | `New` or `Replacement` |
| cardTitle | string | Yes | Title to appear on card |
| cardtype | string | Yes | `1` (Primary) or `2` (Supplementary) |
| firstname | string | Yes | First name |
| lastname | string | Yes | Last name |
| email | string | Yes | Email address |
| cell | string | Yes | Mobile number |
| dateOfBirth | string | Yes | Format: `DDMMYYYY` |
| idType | string | Yes | `CNIC`, `Passport`, `NICOP`, `NTN` |
| idValue | string | Yes | ID value (5-32 characters) |
| city | string | Yes | Customer city |
| mailingAddress | string | Yes | Card delivery address |
| productCode | string | Yes | Card product identifier |
| gender | string | Yes | Gender |
| fatherHusbandName | string | Yes | Parent/guardian name |
| motherMaidenName | string | Yes | Mother's maiden name |
| nationalityCode | string | Yes | Country ISO code |
| companyName | string | No | Optional company name |
| homeAddress | string | No | Home address |
| homePhone | string | No | Home phone |
| officeAddress | string | No | Office address |
| officePhone | string | No | Office phone |
| profession | string | No | Profession |
| primaryCardIdentityValue | string | No | For supplementary cards |
| relation | string | No | Relation to primary cardholder |
| replacementReason | string | No | `1` (New), `2` (Lost), `3` (Stolen), `4` (Damaged) |
| rrn | string | No | Transaction trace ID (6-32 characters) |
| branchCode | string | No | Branch code |
| branchAddress | string | No | Branch address |

### Headers

| Header | Type | Required |
|--------|------|----------|
| X-Auth-Token | string | Yes |
| Content-Type | string | Yes |

### Response

**200 OK** — Card Request Created

```json
{
  "responseCode": "00",
  "responseDescription": "Card request parked for embossing",
  "data": {
    "message": "Card request created",
    "timeStamp": "2025-01-21T10:00:00Z"
  }
}
```

### Code Examples

#### Shell / cURL

```bash
curl --request POST \
  --url https://api.opencms.paysyslabs.com/api/v1/Card/createCard \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: your_token_here' \
  --data '{
    "applicationType": "New",
    "cardtype": "1",
    "accountNumber": "123456789",
    "firstname": "Ahmed",
    "lastname": "Raza",
    "email": "test@example.com",
    "cell": "+923001234567",
    "dateOfBirth": "01011990",
    "idType": "CNIC",
    "idValue": "4210101010101",
    "city": "Karachi",
    "mailingAddress": "123 Main St, Karachi",
    "productCode": "DEBIT001",
    "gender": "M",
    "fatherHusbandName": "Father Name",
    "motherMaidenName": "Mother Name",
    "nationalityCode": "586"
  }'
```

#### Node.js

```javascript
const fetch = require('node-fetch');

const payload = {
  applicationType: 'New',
  cardtype: '1',
  accountNumber: '123456789',
  firstname: 'Ahmed',
  lastname: 'Raza',
  email: 'test@example.com',
  cell: '+923001234567',
  dateOfBirth: '01011990',
  idType: 'CNIC',
  idValue: '4210101010101',
  city: 'Karachi',
  mailingAddress: '123 Main St, Karachi',
  productCode: 'DEBIT001',
  gender: 'M',
  fatherHusbandName: 'Father Name',
  motherMaidenName: 'Mother Name',
  nationalityCode: '586'
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'your_token_here'
  },
  body: JSON.stringify(payload)
};

fetch('https://api.opencms.paysyslabs.com/api/v1/Card/createCard', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Python

```python
import requests
import json

url = "https://api.opencms.paysyslabs.com/api/v1/Card/createCard"
headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": "your_token_here"
}
payload = {
    "applicationType": "New",
    "cardtype": "1",
    "accountNumber": "123456789",
    "firstname": "Ahmed",
    "lastname": "Raza",
    "email": "test@example.com",
    "cell": "+923001234567",
    "dateOfBirth": "01011990",
    "idType": "CNIC",
    "idValue": "4210101010101",
    "city": "Karachi",
    "mailingAddress": "123 Main St, Karachi",
    "productCode": "DEBIT001",
    "gender": "M",
    "fatherHusbandName": "Father Name",
    "motherMaidenName": "Mother Name",
    "nationalityCode": "586"
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())
```

#### PHP

```php
<?php
$url = "https://api.opencms.paysyslabs.com/api/v1/Card/createCard";
$headers = array(
    "Content-Type: application/json",
    "X-Auth-Token: your_token_here"
);
$payload = array(
    "applicationType" => "New",
    "cardtype" => "1",
    "accountNumber" => "123456789",
    "firstname" => "Ahmed",
    "lastname" => "Raza",
    "email" => "test@example.com",
    "cell" => "+923001234567",
    "dateOfBirth" => "01011990",
    "idType" => "CNIC",
    "idValue" => "4210101010101",
    "city" => "Karachi",
    "mailingAddress" => "123 Main St, Karachi",
    "productCode" => "DEBIT001",
    "gender" => "M",
    "fatherHusbandName" => "Father Name",
    "motherMaidenName" => "Mother Name",
    "nationalityCode" => "586"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

#### Ruby

```ruby
require 'net/http'
require 'json'

url = URI("https://api.opencms.paysyslabs.com/api/v1/Card/createCard")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request["X-Auth-Token"] = "your_token_here"
request.body = JSON.generate({
  "applicationType" => "New",
  "cardtype" => "1",
  "accountNumber" => "123456789",
  "firstname" => "Ahmed",
  "lastname" => "Raza",
  "email" => "test@example.com",
  "cell" => "+923001234567",
  "dateOfBirth" => "01011990",
  "idType" => "CNIC",
  "idValue" => "4210101010101",
  "city" => "Karachi",
  "mailingAddress" => "123 Main St, Karachi",
  "productCode" => "DEBIT001",
  "gender" => "M",
  "fatherHusbandName" => "Father Name",
  "motherMaidenName" => "Mother Name",
  "nationalityCode" => "586"
})

response = http.request(request)
puts response.body
```

---




## Get Customer Cards API

**GET** `https://api.opencms.paysyslabs.com/getCardsByCustomer/{idValue}/{rrn}`

Retrieve all cards linked to a specific customer.

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| idValue | string | Yes | Customer ID value (5-32 characters) |
| rrn | string | Yes | Retrieval Reference Number (6-32 characters) |

### Headers

| Header | Type | Required |
|--------|------|----------|
| X-Auth-Token | string | Yes |

### Response

**200 OK** — Cards Retrieved Successfully

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

### Code Examples

#### Shell / cURL

```bash
curl --request GET \
  --url 'https://api.opencms.paysyslabs.com/getCardsByCustomer/4210101010101/23132313131313' \
  --header 'Accept: application/json' \
  --header 'X-Auth-Token: your_token_here'
```

#### Node.js

```javascript
const fetch = require('node-fetch');

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'X-Auth-Token': 'your_token_here'
  }
};

fetch('https://api.opencms.paysyslabs.com/getCardsByCustomer/4210101010101/23132313131313', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Python

```python
import requests

url = "https://api.opencms.paysyslabs.com/getCardsByCustomer/4210101010101/23132313131313"
headers = {
    "Accept": "application/json",
    "X-Auth-Token": "your_token_here"
}

response = requests.get(url, headers=headers)
print(response.json())
```

#### PHP

```php
<?php
$url = "https://api.opencms.paysyslabs.com/getCardsByCustomer/4210101010101/23132313131313";
$headers = array(
    "Accept: application/json",
    "X-Auth-Token: your_token_here"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

#### Ruby

```ruby
require 'net/http'

url = URI("https://api.opencms.paysyslabs.com/getCardsByCustomer/4210101010101/23132313131313")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Accept"] = "application/json"
request["X-Auth-Token"] = "your_token_here"

response = http.request(request)
puts response.body
```

---

## Reveal Card Details API

**POST** `https://api.opencms.paysyslabs.com/api/v1/Card/revealCardDetail`

Reveal sensitive card details linked to a card ID and customer identifier.

### Body Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cardId | string | Yes | Unique card identifier |
| idValue | string | Yes | Customer identifier (5-32 characters) |
| rrn | string | Yes | Retrieval Reference Number (6-32 characters) |

### Headers

| Header | Type | Required |
|--------|------|----------|
| X-Auth-Token | string | Yes |
| Content-Type | string | Yes |

### Response

**200 OK** — Card Details Revealed

```json
{
  "responseCode": "00",
  "responseDescription": "OK",
  "data": {
    "cardId": "100000245",
    "cardNumber": "22058XXXXXXXX269",
    "expiry": "2604",
    "productName": "PayPak Classic",
    "cardStatus": "Active"
  }
}
```

### Code Examples

#### Shell / cURL

```bash
curl --request POST \
  --url https://api.opencms.paysyslabs.com/api/v1/Card/revealCardDetail \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: your_token_here' \
  --data '{
    "cardId": "100000245",
    "idValue": "4210101010101",
    "rrn": "23132313131313"
  }'
```

#### Node.js

```javascript
const fetch = require('node-fetch');

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'your_token_here'
  },
  body: JSON.stringify({
    cardId: '100000245',
    idValue: '4210101010101',
    rrn: '23132313131313'
  })
};

fetch('https://api.opencms.paysyslabs.com/api/v1/Card/revealCardDetail', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Python

```python
import requests

url = "https://api.opencms.paysyslabs.com/api/v1/Card/revealCardDetail"
headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": "your_token_here"
}
payload = {
    "cardId": "100000245",
    "idValue": "4210101010101",
    "rrn": "23132313131313"
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())
```

#### PHP

```php
<?php
$url = "https://api.opencms.paysyslabs.com/api/v1/Card/revealCardDetail";
$headers = array(
    "Content-Type: application/json",
    "X-Auth-Token: your_token_here"
);
$payload = array(
    "cardId" => "100000245",
    "idValue" => "4210101010101",
    "rrn" => "23132313131313"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

#### Ruby

```ruby
require 'net/http'
require 'json'

url = URI("https://api.opencms.paysyslabs.com/api/v1/Card/revealCardDetail")
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request["X-Auth-Token"] = "your_token_here"
request.body = JSON.generate({
  "cardId" => "100000245",
  "idValue" => "4210101010101",
  "rrn" => "23132313131313"
})

response = http.request(request)
puts response.body
```

---

## Additional Endpoints

The following endpoints are also available in the OpenCMS API:

### Card Operations
- **GET** `/getCardDetails/{idValue}/{cardId}/{rrn}` — Retrieve full card details
- **POST** `/updateCustomerCardLimits` — Set customer card limits
- **GET** `/customerCardLimits/{idValue}/{cardId}/{rrn}` — Get customer card limits
- **POST** `/getCardBlockRules` — Get card block rules
- **POST** `/updateCardBlockRules` — Update card block rules
- **POST** `/setCardStatus` — Set card status (block/activate)

### Product & Preferences
- **POST** `/productList` — Get all product list
- **POST** `/api/v1/cardApi/channelPreferences` — Get customer channel preferences
- **POST** `/api/v1/cardApi/updateChannelPreference` — Update customer channel preferences

For detailed documentation on these endpoints, please refer to the ReadMe.io API reference or contact support.
