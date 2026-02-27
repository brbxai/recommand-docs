---
title: Can I see if my invoice was read?
category: General usage
excerpt: You can see when the document was marked as read within your team, but not if the recipient opened it.
updatedAt: 2025-10-13
---

Peppol does not provide receipt or read confirmation from the recipient. In Recommand, you can use the `readAt` field, which indicates when a document was marked as read within your own environment via the `/markAsRead` endpoint.

View the endpoint in the [API reference](/reference/documents/mark-as-read)

Through the Peppol network, an Invoice Message Response can be used.
This allows the invoice recipient to indicate whether the invoice was received correctly, approved or rejected, etc.
These types of documents are supported by Recommand, but unfortunately not by all senders or recipients in the network.
Therefore, when sending an invoice, you will usually not receive an Invoice Message Response, even if you set this up and the document was delivered correctly.
