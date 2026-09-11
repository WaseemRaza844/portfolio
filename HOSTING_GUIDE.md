# Hosting options

This is a static website, so it can be hosted without a database or paid server.

## GitHub Pages

1. Push the project to GitHub.
2. In repository Settings → Pages, choose GitHub Actions.
3. Add a static-site workflow that publishes the `dist` folder.
4. GitHub provides an address such as `https://username.github.io/repository/`.

GitHub Pages is free for public repositories and works well with Codespaces.

## Cloudflare Pages

1. Create a Cloudflare account and choose Workers & Pages → Create application → Pages.
2. Connect the GitHub repository.
3. Leave the build command empty and set the output directory to `dist`.
4. Deploy. Cloudflare supplies HTTPS and a free `pages.dev` address.

## Netlify

1. Import the GitHub repository in Netlify.
2. Leave the build command empty and set the publish directory to `dist`.
3. Deploy to the free Netlify subdomain or connect a custom domain.

## Vercel

1. Import the repository into Vercel.
2. Select “Other” as the framework preset.
3. Leave the build command empty and set the output directory to `dist`.
4. Deploy and optionally connect a custom domain.

For this project, GitHub Pages is the simplest if the repository is public. Cloudflare Pages is a strong alternative when you want fast global delivery and easy custom-domain configuration. A paid virtual server is unnecessary unless the site later gains a database, private admin editor, or server-side APIs.
