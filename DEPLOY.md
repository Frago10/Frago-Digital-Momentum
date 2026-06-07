# Deploy Guide — Frago's Momentum Media

This project supports **two deploy targets** out of the box.

---

## Option A (recommended) — Vercel

Zero-config. The `vercel.json` at the root tells Vercel everything it needs.

### One-time setup

1. Go to https://vercel.com/new and import the GitHub repo
   `Frago10/Frago-Digital-Momentum`.
2. Vercel auto-detects Next.js — leave all defaults.
3. (Optional) Set environment variables in **Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = your custom domain (e.g. `https://momentum.fragovanguard.com`) once attached.

That's it. Every push to `main` auto-deploys.

### Adding a custom domain later

1. Vercel project → **Settings → Domains** → add `momentum.example.com`.
2. Add the CNAME record Vercel shows to your DNS provider.
3. Update `NEXT_PUBLIC_SITE_URL` to the custom domain so OG image / sitemap / robots
   metadata point at the new URL.

---

## Option B (fallback) — GitHub Pages

Still wired and working as a backup deploy.

- Workflow file: `.github/workflows/deploy.yml`
- Triggered automatically on push to `main`.
- Live at: https://frago10.github.io/Frago-Digital-Momentum/

The workflow sets `GITHUB_PAGES=true`, which switches `next.config.mjs` into
static-export mode (`output: "export"`, `basePath: "/Frago-Digital-Momentum"`).

Vercel ignores that env var, so the same repo serves both targets without
collision.

---

## Local dev

```bash
npm install
npm run dev   # http://localhost:3000
```

No env vars required. The site auto-falls back to the GitHub Pages URL for
metadata when neither `NEXT_PUBLIC_SITE_URL` nor `VERCEL_URL` is set.

---

## Configuration knobs

| Variable | Where | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel env / shell | Overrides the canonical site URL used in metadata, OG image, sitemap, robots. |
| `NEXT_PUBLIC_VERCEL_URL` | Auto-set by Vercel | Used as canonical URL until a custom domain is attached. |
| `GITHUB_PAGES` | GitHub Actions only | Activates static export + basePath. Don't set this locally or on Vercel. |
| `FORMSPREE_ENDPOINT` (in `components/ContactForm.tsx`) | Source code | Paste your Formspree form URL to make the contact form send for real. Currently demo mode. |
| `SPLINE_SCENE` (in `components/Manifesto.tsx`) | Source code | Spline embed URL. Currently wired to the Clarity Stream scene. |
