# Pulled from Claude Design

Local copy of the **HopFlows Web App** design canvas.

- Source: https://claude.ai/artifact/KcFhzuaEqjfwAJoM3jnTSz
- Pulled: 19 October 2026 (version 1792418324-b343); pushed and re-pulled 20 October 2026 (version 50, 1792437141-4c09); lead-flow fixes pushed 20 October 2026 (version 51, 1792505157-6aba) second pass (version 52, 1792514541-aa5a) third pass (version 53, 1792516195-ebc2) fourth pass (version 54, 1792517137-bcef) fifth pass (version 55, 1792521324-5439) and sixth pass (version 56, 1792522891-67b7); leader-flow fixes pushed 21 October 2026 (version 57, 1792558207-08f3) and second pass (version 58, 1792569845-cf0b) and third pass, adding Company reports (version 59, 1792570159-9fdb); second leader-flow review fixes (version 60, 1792578210-9437); third leader-flow review fixes (version 61, 1792590353-bf74); leader-flow P2 pass (version 62, 1792591155-3062); P3 polish (version 63, 1792599167-cce6); fourth leader-flow review fixes (version 64, 1792601117-bb9f); Company reports trend (version 65, 1792601590-7066); fifth leader-flow review fixes (version 66, 1792602665-92de); first employee-flow review fixes (version 67, 1792605602-e777); employee-flow P2 pass (version 68, 1792652365-8267); canvas edits pulled 26 October 2026 (version 1792989657-d22c): AddWork, Main, MyTasks, Sidebar, TaskDetail and Topbar merged into the local files, with the canvas layout kept and local behaviour carried over (TaskDetail review mode, blocker note, comments; Today overdue date picker and routine tick). The other screens on the canvas were older than the local copies and were not pulled; local files pushed back 26 October 2026 (version 73, 1792996548-f906), 31 screens, so the canvas matches this folder; MyTasks colour-coded list groups pulled 26 October 2026 (version 1792999580-f422); Google made the main sign-in on SignIn and the phone MSignIn, pushed 27 October 2026 (version 97, 1793035921-16c9); the canvas's "Mobile app" page (23 phone screens, `M*.dc.html`) pulled 27 October 2026 from the same version. The 39 web screens were already identical to this folder.
- Design system it uses: `ds/hopflows/tokens.json` (same as `../design-system/tokens.json`)

| Path | What |
|---|---|
| `canvas.json` | Canvas index: every artboard, its position and size |
| `M*.dc.html` | The phone app, 390 wide, on the canvas's "Mobile app" page (23): `MSignIn`, `MWelcome`, `MConnect` (alerts and Telegram set-up), shared `MTabBar`; employee `MToday`, `MTask`, `MMyTasks`, `MAddWork`, `MNeedHelp`, `MRoutine`, `MRequests`, `MWeek`; everyone `MCalendar`, `MInbox`, `MPush` (alerts with one-tap buttons), `MSearch`, `MMenu`, `MSettings`; lead and leader `MLeadHome`, `MSort`, `MApprove`, `MGoals`, `MSummary` |
| `*.dc.html` | One file per web screen (39): employee `Main` (Today), `SignIn`, `Setup` (first admin sets up the company), `Welcome`, `AddWork`, `TaskDetail`, `NeedHelp`, `MyTasks`, `MyRequests`, `Leave`, `MyReport`, `MyRoutines`, `OtherTeam` (another department's Deliverable, view only); lead `LeadHome`, `Queue`, `Planner`, `Workload`, `Deliverable`, `WeeklyReview`, `Handover`, `Routines`, `TeamTable`, `DeliverableList` (lead's list of Deliverables); leader `Goals`, `GoalDetail`, `Summary`, `CompanyReports` (a leader's Reports); everyone `Calendar`, `Event`, `Inbox`, `Search`, `Reports`, `Settings`; admin `People`, `Holidays`, `Org`; shared `Sidebar`, `Topbar`, `MobileNav` |
| `assets/` | Images the screens use |
| `employee.css` | Employee responsive and accessibility rules, uploaded to the canvas as an asset |

## Asset references

The screens point at uploads as `/_blob/<id>`. Those resolve only inside Claude Design; the local preview server maps them to these files:

| Reference | File |
|---|---|
| `/_blob/637eea0f0cb0fc9affcb69602a64aeba` | `assets/hopflows-app-icon.svg` |
| `/_blob/af734ff66eba4c9a8304432b5f21b934` | `assets/punh-punh-done.png` |
| `/_blob/a431a6fdd4e19f548f54f9fd97283158` | `assets/punh-punh-wave.png` |
| `/_blob/780266c96f9700604ecc05b950fef158` | `assets/punh-punh-wave-right.png` |
| `/_blob/8baaebf55e0c1d993e17cdd2cd7bfe02` | `assets/punh-punh-welcome.png` |
| `/_blob/45ad8afd0afb75ee4546f634d05e9875` | `assets/punh-punh-welcome-right.png` |
| `/_blob/9275412045caede2fafcdfc2bb2771d3` | `employee.css` |

The `.dc.html` files are Design Component pages: they load `./support.js` from Claude Design and use `<dc-import>`, `<sc-for>` and `{{…}}` holes, so they do not render as plain HTML. Read them as the source of each screen's layout, copy and styles.

This is a snapshot. Edits made here do not flow back to Claude Design; pull again after changes there.

## Employee refinements · 18–19 October 2026

The seven employee improvements in [`review/README.md`](review/README.md) were
made here on 18 October and pushed to the canvas on 19 October (versions 43
and 45). Work continued on the canvas after that, and this pull includes it.

Preview with `rtk proxy python3 tools/design-preview/server.py` from the repository
root, then open `http://127.0.0.1:4173`. The preview implements the template features
used by these files locally; it is not Claude Design's runtime. Prototype actions
use sample state and do not send requests or publish changes to the source artifact.
