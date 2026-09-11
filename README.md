# Servara website

Static product and technical-preview download site. It intentionally uses no framework, cookies, analytics, remote fonts, forms, or third-party scripts.

## Local preview

Run from the repository root so the download links can reach the release archives:

```bash
npx serve . -l 4173
```

Then open `http://localhost:4173/website/`.

## Deployment

The two archives are hosted as assets on the public GitHub release at
`https://github.com/amrithasb/servara/releases/tag/v1.0.0`. Their permanent
asset URLs are configured at the top of `script.js`. Deploy the contents of
`website/` as the static site root.

Before calling the site a public production release, replace the unsigned archives with signed builds, publish monitored support and security contacts, have the legal/privacy language professionally reviewed, and update every technical-preview notice.
