---
title: Can I send an XML document directly via the API?
category: API & development
excerpt: Yes, via the send document endpoint, as long as the XML document is fully Peppol/UBL compliant.
updatedAt: 2025-10-13
---

You can send a complete XML document as a string via `/send`. Ensure that the document type (`doctypeId`) is correctly filled in, for example:

```
urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1
```

Check the UBL for validity.
