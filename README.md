# Chaitanya Keny Portfolio Website

This is a portfolio site built with **React + TypeScript + Vite**.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Deploy to GitHub Pages (recommended)

Because this repository is named `chaitanyakeny.github.io`, GitHub Pages can host it directly at:

- `https://chaitanyakeny.github.io`

### One-time GitHub setup

1. Push this repository to GitHub.
2. In your GitHub repo, open **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source** = `GitHub Actions`

### How deployment works

This repo includes a workflow at `.github/workflows/deploy.yml` that:

- installs dependencies,
- runs `npm run build`,
- uploads the `dist/` folder,
- publishes it to GitHub Pages.

Every push to `main` triggers a deployment automatically.

### Deploy updates

Whenever you want to publish new portfolio changes:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Actions will rebuild and redeploy the site.

## Troubleshooting

- If you see a 404 after deploy, wait 1–2 minutes and refresh.
- Check the **Actions** tab for failed workflow runs.
- Confirm **Settings → Pages → Source** is still set to **GitHub Actions**.

## Change the favicon

This repo uses `public/favicon.svg` as the browser tab icon.

To set your own favicon:

1. Replace `public/favicon.svg` with your own icon file.
2. Keep the same filename (`favicon.svg`) **or** update `href` in `index.html`.
3. Commit and push to `main` to deploy the change.
