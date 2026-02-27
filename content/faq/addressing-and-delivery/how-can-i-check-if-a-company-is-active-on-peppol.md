---
title: How can I check if a company is active on the Peppol network?
category: Addressing & delivery
excerpt: Use our /verify API endpoint or our Peppol search to verify if a Peppol address is valid.
updatedAt: 2025-10-13
---

The verify endpoint (/api/v1/verify) checks whether a company is actively registered on Peppol.
Use the correct format for Peppol addresses (e.g. 0208:1012081766). A common mistake is passing a VAT number instead of a Peppol ID.
A valid call returns `{"isValid": true}`.

See [API reference - Verify recipient](/reference/recipients/verify-recipient)

For quick checks outside your integration, you can also use our [Peppol search](https://recommand.eu/en/peppol-search).

When you try to send a document, we also check if the company is active on Peppol. If it isn't, the send attempt will fail with an error message.
