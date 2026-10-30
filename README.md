# devaocubo-ds

Shared Tailwind v4 design tokens for DevAoCuboHub and every plugin mounted
under it (devAoCuboSocials today; any future `/plugin-slug` app).

`tokens.css` is the source of truth for runtime token values. It was extracted
from devAoCuboSocials and is imported by that app's `web/app/globals.css`.
This package does not redesign anything — it centralizes the shared values, and
consumers receive updates when they install or update this git dependency.

## Usage

1. Install as a git dependency (no npm registry is set up for this workspace):

   ```bash
   npm install "devaocubo-ds@git+ssh://git@github.com/Gahmp1/devaocubo-ds.git"
   ```

2. In your app's `globals.css`, import it after Tailwind and before your own
   `@theme` / base-layer rules:

   ```css
   @import "tailwindcss";
   @import "devaocubo-ds/tokens.css";
   ```

3. Do not redeclare the variables or `@theme inline` mappings provided by
   `tokens.css`, including `--background`, `--foreground`, `--card`,
   `--border`, `--input`, `--muted`, `--primary`, `--secondary`,
   `--destructive`, `--accent`, `--ring`, `--success`, `--warning`, and
   `--radius`. If your app is standalone (not proxied under the hub), the same
   import still gives you an OS-dark-aware, standalone-correct look with no
   extra wiring.

4. Do not fork or override token values locally "just for this page" — if a
   value needs to change, change it in `ds/packages/theme/src/legacy/devaocubo.ts`
   and run `npm run build` in `ds/`; every consumer picks it up.

5. `defaults.json` exports the light and dark default values for generators
   such as ProjectsCLI. Consume it as `devaocubo-ds/defaults.json`; the
   runtime CSS remains `devaocubo-ds/tokens.css`.

## `@gahmp1/ds-*` packages

The monorepo also holds the component packages, separate from this root package (which stays tokens-only):

- `@gahmp1/ds-theme` (`ds/packages/theme`): the nine-axis theme, light and dark, for `devaocubo`, `swfitness`,
  `somma` and `trippo`. It generates the per-theme `--ds-*` CSS, the Tailwind 4 mapping and this package's legacy
  files, and checks WCAG contrast.
- Catalogs: `ds/apps/catalog-web` (Storybook) and `ds/apps/catalog-native` (Expo).

`ds-core`, `ds-native`, `ds-web` and `ds-mcp` arrive in wave 1, together with the first GitHub Packages publish.
Nothing is published in this wave.
