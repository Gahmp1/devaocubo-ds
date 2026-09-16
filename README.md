# devaocubo-ds

Shared Tailwind v4 design tokens for DevAoCuboHub and every plugin mounted
under it (devAoCuboSocials today; any future `/plugin-slug` app).

Source of truth for the token *values* is devAoCuboSocials' `app/globals.css`.
This package does not redesign anything — it only centralizes what socials
already had, so updating a token here updates every consumer.

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

3. Do not redeclare `--background`, `--foreground`, `--card`, `--border`,
   `--input`, `--muted`, `--primary`, `--secondary`, `--destructive`,
   `--accent`, `--ring`, `--success`, `--warning`, `--radius`, or any
   `--color-*` / `--radius-*` Tailwind mapping — they all come from the
   package. If your app is standalone (not proxied under the hub), the same
   import still gives you an OS-dark-aware, standalone-correct look with no
   extra wiring.

4. Component recipes (Button, Card, Input, Label, Collapsible, ...) are not part of this
   package — copy the Tailwind classNames from devAoCuboSocials'
   `components/ui/*` (the canonical `new-york` shadcn style) when adding a
   shared component to a new plugin, the same way DevAoCuboHub's were
   aligned.

5. Do not fork or override token values locally "just for this page" — if a
   value needs to change, change it here and every consumer picks it up.
