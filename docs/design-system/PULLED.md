# Pulled from Claude Design

Local copy of the **HopFlows Soft Bento** design system.

- Source: https://claude.ai/artifact/MfdfJyMi7yzpp4iqjiqT8b
- Pulled: 17 October 2026 (version 1792217447-4a5c)
- Start with `README.md` (the brand book), then `tokens.json`.

| Path | What |
|---|---|
| `README.md` | Brand book: principles, content, visual foundations, layout, logo, mascot, accessibility |
| `tokens.json` | Colour, type, spacing and radius tokens (Light and Black themes) |
| `design-system.json` | Index of the system (asset groups, namespace, last change) |
| `components/` | `Button`, `StatusPill`, `CapacityCell`, `Tile`: guidelines, previews, `bundle.js`, `bundle.css`, `index.d.ts` |
| `assets/Logos/` | App icon, square master, notification icon, App Store PNG, Android adaptive layers |
| `assets/Mascot/` | Punh Punh poses (welcome, wave, done), each facing left and right |

In Claude Design, images are uploads referenced as `/_blob/<id>`; here they are files under `assets/` named as in `design-system.json`. The previews in `components/` expect the Claude Design page (tokens CSS, fonts, React) and will not render on their own.

This is a snapshot. Edits made here do not flow back to Claude Design; pull again after changes there.
