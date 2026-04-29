## Maosen Chen - Web Developer

This is a my personal website. You can pay me a vist at  [https://www.maosen-chen.me](https://www.maosen-chen.me).
- Built with HTML, Sass, JavaScript and JQuery
- Configured Nginx-based Ubuntu server to host the site
- Responsive web design using media queries

### Deployment

The site deploys to GitHub Pages from `.github/workflows/pages.yml`. In the repository settings, set
Pages > Build and deployment > Source to `GitHub Actions`; every push to `master` will then build and publish
the `dist` directory.

Pull requests opened from branches in this repository also get a preview deployment from
`.github/workflows/pr-preview.yml`. The workflow builds the PR, publishes it under
`/pr-preview/pr-<number>/`, comments the preview link on the PR, and removes that preview when the PR closes.
