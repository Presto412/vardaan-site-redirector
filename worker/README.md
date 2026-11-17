# Vardaan product admin Worker

This is a separate, same-origin admin application. Cloudflare Access authenticates staff; the Worker reads and updates `products.json` and uploads photos to the existing GitHub Pages repository. The public site stays on GitHub Pages. The Worker refuses every request unless Cloudflare Access has authenticated it, even if its URL is accidentally exposed. Existing Pages CMS remains available.

## Free setup

1. Create a Cloudflare account and enable Zero Trust on the Free plan. In Workers & Pages, create a workers.dev subdomain if prompted. Install Node.js and Wrangler: `npm install -g wrangler`, then `wrangler login` in a terminal. The Worker uses no paid bindings. See Cloudflare's current Workers and Zero Trust plan limits before choosing a plan.
2. In GitHub, create a fine-grained personal access token restricted to `Presto412/vardaan-site-redirector`, with **Contents: Read and write** permission. Set a reasonable expiry and renew before it expires. Never put the token in a source file or send it to staff. This token can modify all repository contents; treat it as a secret. A GitHub App installation token can replace the PAT later.
3. In this directory, run `node build.mjs`, then `wrangler deploy`. The application will respond 403 until Access is configured.
4. Set the token as a secret: `wrangler secret put GITHUB_TOKEN`. Paste the token when Wrangler prompts; do not put it on the command line. Do not commit `.dev.vars` or credentials.
5. In the Cloudflare dashboard, protect this Worker with **Cloudflare Access on all production and preview URLs**, using an Allow policy listing only approved staff email addresses. Enable one-time PIN or your preferred identity provider. Configure the protection on the Worker itself (not only one custom hostname) so that direct Worker invocations receive `ctx.access` on every route. Remove any broad account-level policy that gives unintended users access. See https://developers.cloudflare.com/workers/configuration/cloudflare-access/.
6. Verify that an unapproved or signed-out browser cannot reach the editor or API; check `GET /api/products` without Access. Sign in as approved staff, test adding, editing and deleting a sample product, and confirm GitHub Pages publishes each change. Rotate or remove staff access in Cloudflare Access when needed.
7. Only after those checks, update the existing `/admin/` page to link to the Worker's HTTPS URL, or attach a custom subdomain such as `admin.vardaandistributors.com` through Cloudflare and link there. DNS/domain configuration may require moving or adding records in the domain's DNS provider. Do not remove the old editor until the new flow has been verified.

## Testing

Run `node build.mjs` then `node test.mjs` for backend security, validation and GitHub mock checks. `node test-ui.cjs` runs the editor against a mock API using Playwright and Chromium if those are installed. These do not replace an authenticated production test.

## Operational notes

- Edits use the GitHub file SHA to detect concurrent changes. If there is a conflict, reload and repeat the change.
- Photo upload and catalogue save are separate commits. A failed catalogue save can leave an unused photo; remove unused uploads manually when convenient. Deleting a listing does not delete its image because another listing might use it.
- The brochure PDF is a historical document and is not changed by this editor.
- The editor uses a single photo per product and accepts JPEG, PNG or WebP up to 3 MB. GitHub Pages deployment may take a few minutes.
- If Cloudflare Access is unavailable or not configured, the Worker is deliberately inaccessible. Do not bypass its authentication check. No secrets belong in HTML, JavaScript, Git history or chat.
