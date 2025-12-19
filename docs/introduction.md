# Introduction

![OpenCMS](/img/CMD.png)
Welcome to the Open CMS API Portal, your complete reference for integrating with Paysys Labs’ Card Management System (OpenCMS). This portal enables banks, fintechs, and partner systems to perform full card lifecycle operations through a secure, RESTful interface — from card issuance and activation to limit management, blocking rules, and channel preferences. OpenCMS serves as a centralized platform to manage debit, prepaid, and credit cards in real-time, providing seamless connectivity with external systems such as core banking, middleware, and mobile channels.

 

## What You Can Do with OpenCMS

- Card Issuance & Lifecycle Management: Create, activate, block, and manage cards instantly.

- Customer-Level Inquiry: Fetch cards, details, and channel preferences for any customer using their CNIC or account reference.

- Dynamic Limit Controls: Define per-day and per-transaction limits by channel.

- Block Rules & Risk Management: Apply restrictions based on country codes or merchant categories.

- Channel Preferences: Enable or disable channels such as ECOM, POS, or ATM.

- Secure API Access: Use JWT-based authentication with strong audit and traceability via RRN.

  

## API Security

Each request to OpenCMS APIs must include a valid token generated from the Authentication endpoint. All endpoints are secured via HTTPS and require an X-Auth-Token header.

makefile

`X-Auth-Token: <Your JWT Token> Content-Type: application/json`

Tokens are valid for a limited duration and should be refreshed periodically.

  

## Integration Model

OpenCMS APIs are designed to integrate directly with:

- Core Banking Systems (for account and GL operations)

- Issuer Hosts (for authorization and personalization)

- Digital Channels (mobile apps, merchant portals, IVR)

- External Middleware (OpenConnect, Acquiring Gateways)

- These APIs follow consistent naming, error handling, and field structures to simplify partner integrations and ensure scalability across multiple clients.


**UAT**

`https://uat.opencms.paysyslabs.com`

Testing environment for integration validation

**Production**

`https://api.opencms.paysyslabs.com`

Live processing environment

  

## Documentation Structure

Section

Description

**Developer Workflow**

Step-by-step guide to authenticate and perform transactions

**API Reference**

All endpoints grouped by module (Card Lifecycle, Inquiry, etc.)

**Data Type References**

Detailed request and response object structures

**Response Codes**

Full list of success, warning, and error codes

**Changelog** _(optional)_

Future section for version tracking (e.g., 3.2.4 → 3.3.0)

  

## Tip

All API requests should include a unique RRN (Retrieval Reference Number) to track and audit transactions across systems. RRNs are used end-to-end for reconciliation, error tracing, and reporting.