# Study Buddy

A no-build static website built with HTML, CSS, and JavaScript. The website is organized for Cloudflare Pages deployment, with its published files in `public/`.

## Run locally

Open `public/index.html` in a browser, or serve the `public/` directory with a local static file server. No package installation or build step is required.

## Deploy with Cloudflare Pages and GitHub

1. In the Cloudflare dashboard, go to **Workers & Pages** and create a **Pages** application using **Connect to Git**.
2. Select this GitHub repository and authorize Cloudflare to read it.
3. Set the production branch to `main`.
4. Configure the build:
   - **Build command:** leave empty (this is a static site with no build step).
   - **Build output directory:** `public`.
   - **Root directory:** `/` (the repository root).
5. Save and deploy. Cloudflare Pages will deploy the site and automatically create deployments for later pushes to the connected branch.

The root `wrangler.jsonc` records the Pages output directory and compatibility date for Wrangler-based local preview or deployment.

## Future AI and document processing

This starter does not send study material to an AI service or process PDF/Word contents yet. The front end does not contain API keys. For secure AI tutoring or server-side document processing, add Cloudflare Pages Functions under a root-level `functions/` directory (or use a Cloudflare Worker), make the browser call those endpoints, and store provider credentials as encrypted Cloudflare secrets rather than in `public/` or frontend JavaScript.

When adding that backend, configure its required bindings/secrets in the Cloudflare dashboard for each environment (production and preview), and use `wrangler pages dev public` for local development with local secret values kept out of Git. Add only the required secret names to Wrangler configuration; never commit secret values. If backend runtime bindings require additional Wrangler settings, add them to `wrangler.jsonc` at that stage.