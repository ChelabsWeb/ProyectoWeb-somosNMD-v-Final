# Ambiguous folders — 2026-04-21

Investigation: for each folder at repo root that looked suspicious, check if
it is referenced by the Next.js app or packages. If referenced, keep as-is.
If not referenced, flag for founder decision — do NOT auto-delete these, as
they may contain raw client assets not yet integrated.

| Folder | Referenced by `apps/web/src` or `packages/`? | Recommendation |
|---|---|---|
| `beats caba/` | No | **Likely raw audio deliverables** from the client. Do not delete. Suggest: move to `docs/pending-assets/beats-caba/` (rename to remove the space) once the shop integration moves forward, or integrate the files into `apps/web/public/assets/audio/samples/` if that is their final home. |
| `shop assets/` | No | **Likely raw product photography / shop artwork** from the client. Do not delete. Same recommendation as above — either relocate to `docs/pending-assets/shop-assets/` or integrate into `apps/web/public/assets/shop/`. |
| `_bmad/` | No | Unknown. Possibly a BMAD-method agent output artefact. Safe to delete if confirmed unused, but confirm with the founders first. |
| `_bmad-output/` | No | Same as above. |
| `web-bundles/` | No | Unknown. Likely an older build or template output. Confirm before deleting. |
| `infra/` | Contains `vercel.json` | **Keep.** This is deployment config. |

## Root-level .agent / .husky / .claude / .turbo

These are tooling folders, all legitimate:

- `.agent/` — agent/automation state
- `.claude/` — Claude Code project-local settings
- `.husky/` — Git hooks
- `.turbo/` — already in `.gitignore`

## Additional noise still at root

Now cleaned up (Phase D1):

- ~~`tmp2.tsx`, `tmp3.diff`, `tmp4.diff`, `tmp5.diff`, `tmp6.tsx`, `tmp_footer_log.txt`, `tmp_footer_old.tsx`~~ — deleted
- ~~`lint_output.txt`, `lint_output8.txt`, `test_output.txt`, `test_output8.txt`~~ — deleted
- ~~`npm-shrinkwrap.json`~~ — deleted (pnpm is the configured package manager)

## Open question for the user

Please confirm, for each of the "Unknown" rows above, whether the folder can
be deleted or should be kept. If kept, consider adding a short README inside
it stating what the contents are and what is supposed to happen to them.
