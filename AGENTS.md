# devaocubo-ds

Shared Tailwind v4 design tokens for DevAoCuboHub and its plugins.

## Contract

- `tokens.css` is the runtime CSS entrypoint. It stores HSL channel triples,
  theme selectors, and the Tailwind `@theme inline` mappings.
- `defaults.json` is the light/dark data entrypoint for generators such as
  ProjectsCLI. It uses complete CSS values and is exported as
  `devaocubo-ds/defaults.json`.
- `README.md` documents the consumer import and component recipe convention.
- The package's explicit `files` list includes `tokens.css`, `defaults.json`,
  and `README.md`.

Keep the CSS token names and JSON shape compatible with their consumers. Do
not add component implementations here; copy the established recipes from a
consumer when a plugin needs a shared component.

## design-library/

`design-library/` holds the local design library: small agent skills, curated
references and HTML mockups used as visual examples. It is outside the package
`files` list, so consumers never receive it, and nothing in it is imported by an
app. Keep it text-only (no images or other binaries) so a git install stays
light. The mockups are reference material, not component implementations; the
rule above still applies to the package itself. See `design-library/README.md`
and `docs/superpowers/specs/2026-10-29-design-library-design.md`.

## Verification

Run `npm test` to execute the built-in Node test runner for `defaults.json`.
This package has no build or lint script.
