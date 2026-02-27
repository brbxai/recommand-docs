# Recommand Docs

The official documentation for the [Recommand Peppol API](https://github.com/brbxai/recommand-peppol), hosted at [docs.recommand.eu](https://docs.recommand.eu).

Built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.vercel.app).

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the docs locally.

## Project Structure

- `content/docs/` — Guides and tutorials
- `content/reference/` — API reference (auto-generated from OpenAPI spec)
- `content/integrations/` — Integration guides
- `content/changelog/` — Release notes
- `content/faq/` — Frequently asked questions
- `src/` — Next.js app, components, and utilities
- `scripts/` — OpenAPI generation and link validation scripts

## Scripts

- `bun dev` — Start development server
- `bun run build` — Build for production
- `bun run generate:api` — Generate API reference from OpenAPI spec
- `bun run lint` — Run ESLint
- `bun run lint:links` — Validate internal links

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Community & Support

- [Discord](https://discord.gg/a2tcQYA3ew)
- [Contact](https://recommand.eu/contact) or email us at [support@recommand.eu](mailto:support@recommand.eu)

## License

This project is licensed under the [MIT License](LICENSE).
