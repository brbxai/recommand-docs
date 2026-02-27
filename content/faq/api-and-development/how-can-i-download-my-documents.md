---
title: How can I download my sent or received documents?
category: API & development
excerpt: You can download documents as a complete package (ZIP) or just the XML file via the API or dashboard.
updatedAt: 2025-10-13
---

When you send or receive an invoice or other document via Recommand, a document package (ZIP) is automatically created.
This package contains:

- the original UBL XML file,
- any attachments (such as a PDF version),
- the parsed document in JSON format

Download complete package:
Via the API endpoint `/api/v1/documents/{documentId}/download-package` or directly from the dashboard.

Get only the XML file:
Use the endpoint
GET `/api/v1/documents/{documentId}`
and retrieve the XML file from the xml field.
