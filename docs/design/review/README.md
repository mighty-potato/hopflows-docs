# Employee design improvements · 18 October 2026

Implemented in the checked-in Claude Design source, preserving Soft Bento's
palette, Geist type, rounded tiles, employee/lead separation, and task review rules.

| Item | Result | Source |
| --- | --- | --- |
| 1. Next action before progress | Phone progress is a compact strip; active work precedes completed work; Send to review and Need help precede the checklist. | `Main.dc.html`, `employee.css` |
| 2. Finished versus approved | Sending work for review does not increase Done. Two Done plus one Review says the employee's part is done. Only three accepted tasks show All clear. Task Detail uses the same wording and removes duplicate submission. | `Main.dc.html`, `TaskDetail.dc.html` |
| 3. Active and blocked work first | Default List orders In progress, Needs help, To do, Awaiting review, Done. Blocked work offers Update blocker and Unblock, stays In progress, and cannot finish while blocked. Counts follow the displayed sample tasks. | `MyTasks.dc.html` |
| 4. Dedicated mobile navigation | Today, Calendar, Add work, Inbox, and Menu share a fixed, safe-area-aware tab bar across all 11 employee screens. Menu exposes tasks, requests, leave, search, reports, and settings. Desktop retains its sidebar; tablet layout avoids a full-width sidebar above the work. Calendar defaults to a phone agenda with overdue and upcoming work and a desktop month grid. | `MobileNav.dc.html`, `Calendar.dc.html`, `employee.css`, employee imports |
| 5. Short capture path | Role choice, title, routing explanation, and primary action remain visible; details, checklist, attachments, and scheduling sit inside a native Add details disclosure. Task/request routing is preserved. | `AddWork.dc.html` |
| 6. Understand and discuss priorities | Today explains that priorities come from the weekly plan with Chenda. Discuss priorities requires a note, confirms the request, and leaves the plan unchanged. | `Main.dc.html` |
| 7. Accessible controls | Checklist inputs use real checkboxes in 44px labels. Task actions, disclosure summaries, remove-photo control, calendar filters, and settings checkbox rows meet the 44px height target. Every task view includes a native status disclosure with buttons, so status changes do not require dragging. | `Main.dc.html`, `MyTasks.dc.html`, `AddWork.dc.html`, `Calendar.dc.html`, `Settings.dc.html`, `employee.css` |

## Verification

- `rtk proxy node tools/design-preview/verify.mjs`: 14 state/structure verification
  groups, including review gating, blocked transitions, shared data across views,
  checklist persistence, priority-note validation, helper permissions, task/request
  routing, and component import validity.
- `verification.json`: native Chrome ran the local preview's interaction checks
  and measured desktop/phone layouts. It covers 21 screen/state/width combinations,
  including Today at 320, 390, 760, 768, and 1440px. The result records runtime
  errors, unresolved bindings, page overflow, and small control heights.
- `state-checks.txt`: output from the final source-level verification.
- `source-sha256.json`: source hashes recorded after verification.
- Visual review used the saved browser screenshots linked below; both viewport
  widths are rendered from the actual source files through the local adapter.
- Native keyboard check: focused a task's Update status summary, toggled it with
  Space, tabbed to Send to review, and pressed Enter. The task moved to Awaiting
  review and displayed the confirmation that the employee's part was done.

## Screenshots

- [Today · next action and compact progress](01-today.png)
- [My tasks · active and blocked work first](02-my-tasks.png)
- [Add Work · optional details collapsed](03-add-work.png)
- [Calendar · desktop month and phone agenda](04-calendar-final.png)
- [Task Detail · desktop before submission, phone awaiting review](05-review.png)

## Preview and rerun

```sh
rtk proxy python3 tools/design-preview/server.py --port 4173
rtk proxy node tools/design-preview/verify.mjs
```

Open `http://127.0.0.1:4173`. The controls switch screens and sample states;
**Verify all** reruns the browser suite and saves `verification.json` locally.

## Limits

These are editable design components and local prototype interactions. They are
not a production app or a backend integration. The local adapter implements
`dc-import`, `sc-if`, `sc-for`, template bindings, and component state for this
snapshot; native Claude Design behavior still needs checking when importing the
updated files there.

## Pushed to Claude Design · 19 October 2026

These refinements are now on the
[HopFlows Web App canvas](https://claude.ai/artifact/KcFhzuaEqjfwAJoM3jnTSz):

- Version 43 added the 11 updated employee screens, `MobileNav` (as a new
  artboard beside the Top bar) and `employee.css`.
- Version 45 uploaded `employee.css` as a canvas asset
  (`/_blob/c52bbdf2c39dd7f3bbf7d8eb18fb6c9c`). Each employee screen links it in
  `<head>` after `support.js`, instead of linking `./employee.css` inside
  `<helmet>`. The local preview server maps that id to `docs/design/employee.css`.

Other work landed on the canvas between those two versions: more states on
Today, Task, Leave and Calendar, plus new `Event`, `MyReport` and `MyRoutines`
screens. The 19 October pull brought all of it into `docs/design/`.
