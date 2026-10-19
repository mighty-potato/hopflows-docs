# Pulled from Claude Design

Local copy of the **HopFlows Web App** design canvas.

- Source: https://claude.ai/artifact/KcFhzuaEqjfwAJoM3jnTSz
- Pulled: 19 October 2026 (version 1792385534-5406)
- Design system it uses: `ds/hopflows/tokens.json` (same as `../design-system/tokens.json`)

| Path | What |
|---|---|
| `canvas.json` | Canvas index: every artboard, its position and size |
| `*.dc.html` | One file per screen (35): employee `Main` (Today), `SignIn`, `Welcome`, `AddWork`, `TaskDetail`, `NeedHelp`, `MyTasks`, `MyRequests`, `Leave`, `MyReport`, `MyRoutines`; lead `LeadHome`, `Queue`, `Planner`, `Workload`, `Deliverable`, `WeeklyReview`, `Handover`, `Routines`, `TeamTable`; leader `Goals`, `GoalDetail`, `Summary`; everyone `Calendar`, `Event`, `Inbox`, `Search`, `Reports`, `Settings`; admin `People`, `Holidays`, `Org`; shared `Sidebar`, `Topbar`, `MobileNav` |
| `employee.css` | Shared employee styles (touch targets, disclosures, phone navigation) |
| `assets/` | Images the screens use |

## Image references

The screens point at uploads as `/_blob/<id>`. Those resolve only inside Claude Design; the local files are:

| Reference | File |
|---|---|
| `/_blob/637eea0f0cb0fc9affcb69602a64aeba` | `assets/hopflows-app-icon.svg` |
| `/_blob/af734ff66eba4c9a8304432b5f21b934` | `assets/punh-punh-done.png` |
| `/_blob/a431a6fdd4e19f548f54f9fd97283158` | `assets/punh-punh-wave.png` |
| `/_blob/780266c96f9700604ecc05b950fef158` | `assets/punh-punh-wave-right.png` |
| `/_blob/8baaebf55e0c1d993e17cdd2cd7bfe02` | `assets/punh-punh-welcome.png` |
| `/_blob/45ad8afd0afb75ee4546f634d05e9875` | `assets/punh-punh-welcome-right.png` |

The `.dc.html` files are Design Component pages: they load `./support.js` from Claude Design and use `<dc-import>`, `<sc-for>` and `{{…}}` holes, so they do not render as plain HTML. Read them as the source of each screen's layout, copy and styles.

This is a snapshot. Edits made here do not flow back to Claude Design; pull again after changes there.
