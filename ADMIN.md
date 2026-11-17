# Editing the product catalogue

Vardaan uses the free hosted Pages CMS (https://app.pagescms.org/) to edit `products.json` and upload product photos to `assets/` in this publishing repository.

## One-time setup by the repository owner

1. Sign in to https://app.pagescms.org/ with the GitHub account that owns this repository and install the Pages CMS GitHub App, granting it access only to `Presto412/vardaan-site-redirector`.
2. Select that repository and the `master` branch in Pages CMS. The Product catalogue form is defined by `.pages.yml`.
3. Invite each staff member as a GitHub collaborator with write access to this repository. Staff must accept the invitation, then sign in to Pages CMS with their own GitHub account.
4. Make a small test edit and verify the Pages deployment and live website. A repository writer can change any file in this repository, not just products; only grant access to trusted staff.

## Editing

Open the product catalogue in Pages CMS. Add, edit, reorder or remove products, upload or select a product photo, and save. Each product has a name, range, category, photo and optional description. Saving commits the changes to GitHub; GitHub Pages publishes them automatically after its deployment completes. The website displays any supplied description and supports searching descriptions.

Keep images reasonably sized. The media library includes images from the site; removing an image that other products use will break those product photos. The legacy brochure is a separate PDF and does not update when products are edited.
