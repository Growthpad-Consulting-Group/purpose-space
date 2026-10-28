# Purpose Space Realtors

Purpose Space is a Next.js website with property content managed in Sanity.

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website and
[http://localhost:3000/studio](http://localhost:3000/studio) to open Sanity
Studio.

## Sanity

The following variables are required in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

To import property content and upload images, also provide a private write token:

```bash
SANITY_API_WRITE_TOKEN=
```

Never prefix the write token with `NEXT_PUBLIC_` and never commit it.

The property import is idempotent. Put the downloaded SharePoint folders inside
one local directory, then run:

```bash
PROPERTY_IMAGE_ROOT=/absolute/path/to/Website\ Photos npm run sanity:import
```

Listings without a matching photo folder are created as unpublished drafts. Use
`npm run sanity:import -- --dry-run` to validate the manifest without writing to
Sanity.
