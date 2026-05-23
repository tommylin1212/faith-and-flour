# Faith + Flour Creations

A custom sugar cookie business website built with **Next.js 16**, featuring a pastel theme system, gallery, pricing, order intake form, and built-in electronic contract signing (no paid e-sign subscription).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/gallery` | Cookie design gallery |
| `/pricing` | Pricing tiers & add-ons |
| `/order` | Client intake / order inquiry form |
| `/contracts` | Create & manage agreements |
| `/contracts/sign/[token]` | Client signing page |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

### Business copy & pricing

Edit `src/lib/content.ts` — business info, gallery items, pricing tiers, and add-ons.

### Themes

Themes live in `src/lib/themes.ts`. Each theme is a set of CSS variables. Users can switch themes in the UI; the choice is saved in `localStorage`. To add a theme:

1. Add a new entry to the `themes` object
2. Add its id to the `ThemeId` type and `themeIds` array

No component changes required.

### Contract templates

Edit `src/lib/contract-templates.ts` for legal text and template options.

### Gallery photos

Replace placeholder emoji cards in `gallery/page.tsx` with `<Image>` components pointing to files in `public/gallery/`.

## Data storage

Order inquiries and signed contracts are saved as JSON files in the `data/` directory (gitignored). On Vercel or similar serverless hosts, use a database or blob storage instead — the filesystem is ephemeral there.

## E-signing (free, built-in)

1. Create a contract on `/contracts`
2. Copy the signing link and send it to your client
3. They read the agreement, draw a signature, and consent
4. Download the signed HTML record (print to PDF from the browser)

Each signed document includes a timestamp, signature image, and SHA-256 integrity hash.

> **Note:** This is a practical small-business tool, not legal advice. Have an attorney review your contract templates before use. Add authentication to `/contracts` before going live in production.

## Deploy

```bash
pnpm build
pnpm start
```

Compatible with Vercel, Netlify, or any Node.js host. Remember to configure persistent storage for production.
