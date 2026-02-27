---
title: Which documents can be sent over the Peppol network?
category: Peppol basics
excerpt: Invoices, but also credit notes, orders, despatch advices, etc.
updatedAt: 2025-10-13
---

Although e-invoicing is the most well-known use case, Peppol supports a wide range of structured business documents.
These documents are based on the **Peppol BIS specifications (Business Interoperability Specifications)**.

Below are some of the most common documents that can be sent over the Peppol network.

| Document type                                 | Description                                                         | BIS specification                        | Typical use case                                     |
| --------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| **Invoice (BIS Billing 3.0)**                 | Electronic invoice in structured UBL format                         | `BIS Billing 3.0`                        | Sales invoices to customers or governments           |
| **Credit Note (BIS Billing 3.0)**             | Structured credit note, often linked to an invoice reference        | `BIS Billing 3.0`                        | Correction of previously invoiced amounts            |
| **Order (BIS Order 3.0)**                     | Official purchase order from a customer to a supplier               | `BIS Order 3.0`                          | Procurement orders, especially in e-procurement      |
| **Order Response (BIS Order Agreement 3.0)**  | Confirmation or adjustment of a received order                      | `BIS Order Agreement 3.0`                | Approval, rejection or modification of orders        |
| **Despatch Advice (BIS Despatch Advice 3.0)** | Shipping notice with details about the goods sent                   | `BIS Despatch Advice 3.0`                | Confirmation of shipment or delivery                 |
| **Receipt Advice (BIS Despatch Advice 3.0)**  | Message confirming the goods have been received                     | `BIS Despatch Advice 3.0`                | Receipt confirmation after delivery                  |
| **Catalogue (BIS Catalogue 3.0)**             | Product catalogue with prices, references and descriptions          | `BIS Catalogue 3.0`                      | Synchronizing product information between systems    |
| **Self-Billing Invoice**                      | Invoice created by the customer on behalf of the supplier           | `BIS Billing 3.0 (Self Billing variant)` | Common in agriculture, retail and platform economy   |
| **Reminder / Statement** _(in development)_   | Overview or reminder of outstanding documents                       | —                                        | Expected in future Peppol extensions                 |

**In short:**
Peppol is evolving from an invoicing network into a **fully interoperable business communication network**.
This allows companies to fully automate their **purchase-to-pay (P2P)** or **order-to-cash (O2C)** processes in a secure and structured way, without manual processing.
