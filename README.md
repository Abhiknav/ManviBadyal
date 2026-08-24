# Manvi Badyal — Portfolio

Angular 17 (standalone components) portfolio for **Manvi Badyal**, Assistant
Professor of Law and enrolled advocate.

## Run

```bash
npm start              # dev server on http://localhost:4200
npm run build          # production build -> dist/manvi-portfolio/browser
npm run build:single   # production build inlined into ONE .html file
```

`build:single` writes `dist/manvi-badyal-portfolio.html` — every script, style
and image inlined, so it can be opened or hosted anywhere as a single file.

## Where to edit content

**Almost all copy lives in one file:** `src/app/core/site-content.ts`.
Change the text there and every section updates.

### Placeholders that still need real data

| Where | What to replace |
|---|---|
| `PROFILE.title` | Exact designation (currently "Assistant Professor of Law") |
| `PROFILE.institution` | Real college / university name |
| `PUBLICATIONS.items` | Real papers, journals, volumes — currently invented samples |
| `STUDENTS.quotes` | Real student feedback — currently placeholder text |
| `TEACHING.stats` | "100+ students taught" is an estimate |

## Structure

```
src/app/
  core/
    site-content.ts      all site copy
    enquiry.service.ts   "Enquire" button -> contact form bridge
  shared/
    reveal.directive.ts      scroll reveal (re-triggers on re-entry)
    typewriter.directive.ts  types text out, rewinds on exit
    count-up.directive.ts    animated counters
  components/              one standalone component per section
```

The contact form's subject dropdown is **derived** from the service and practice
names in `site-content.ts`, so every "Enquire" button always has an exactly
matching option. Add a service and its subject appears automatically.

## Adding a real backend

`ContactComponent.submit()` currently composes a `mailto:` link. To send server
side instead, swap that method for an `HttpClient.post(...)` and add
`provideHttpClient()` in `app.config.ts`. The form is already a typed reactive
form with validation, so nothing else needs to change.

The same applies to a LinkedIn feed or a student-feedback form — add a service
under `core/` and inject it into the relevant component.

## Notes

- Dark mode follows the OS setting; all colours are CSS custom properties in
  `src/styles.scss`.
- Animations respect `prefers-reduced-motion`.
- Scroll animations use `IntersectionObserver`, which does not fire while a
  document is hidden; each directive has a fallback so content is never left
  stranded invisible.

## Deploying

The site deploys to GitHub Pages automatically via `.github/workflows/deploy.yml`
on every push to `main`.

### One-time setup

1. Create an empty **public** repo named `manvi-portfolio` at
   <https://github.com/new> — no README, no .gitignore, no licence.
2. Push:

   ```bash
   git remote add origin git@github.com:Abhiknav/manvi-portfolio.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source =
   "GitHub Actions"**.

The workflow then builds with the correct `--base-href` and publishes to
<https://abhiknav.github.io/manvi-portfolio/>.

### Custom domain

Add the domain under Settings → Pages, then update the four absolute URLs in
`src/index.html` (canonical, `og:url`, `og:image`, `twitter:image`) plus
`src/robots.txt` and `src/sitemap.xml`, and commit.

### Netlify / Vercel

`netlify.toml` and `vercel.json` are committed — connect the repo and both build
without further configuration.

## Making the forms actually deliver

Both the contact form and the student feedback form currently work **without a
server**: contact opens the visitor's mail app, feedback saves to that visitor's
own browser. Neither reaches Manvi automatically.

To deliver them for real, set one value in `src/app/core/site-content.ts`:

```ts
export const SUBMIT_ENDPOINT = 'https://formspree.io/f/XXXXXXXX';
```

Get that URL free at <https://formspree.io> (sign up, create a form, copy the
endpoint). Feedback submissions POST there as JSON. The UI stops showing the
"saved to this browser only" notice once an endpoint is set.
