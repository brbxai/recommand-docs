---
title: How do I add a structured reference (OGM) correctly?
category: API & development
excerpt: Use the numeric format, without "+++" or "/".
updatedAt: 2025-10-13
---

The structured reference (OGM) is not strictly specified in UBL, but the common practice is to provide only the numeric part, e.g., `"reference": "123456789101"`. The notation `+++123/4567/89101+++` may appear visually on a PDF attachment, but in the UBL only the numeric part is used.