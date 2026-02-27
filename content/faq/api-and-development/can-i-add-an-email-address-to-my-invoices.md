---
title: Can I add an email address to my invoices?
category: API & development
excerpt: Yes, but only when sending a raw UBL document.
updatedAt: 2025-10-13
---

The Peppol UBL format supports a `cac:Contact` element in the `AccountingSupplierParty`. The simplified JSON API of Recommand does not currently expose this field, but when sending your own XML you can add this. See Peppol syntax guide.