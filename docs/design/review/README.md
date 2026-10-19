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


## Full workload and Top 3 · 20 October 2026

- Today labels its completion metric **Top 3 progress**. Completing priorities no
  longer suggests that the employee has finished every task.
- A workload navigation strip links to all tasks, other work, and task capture.
  Beyond your Top 3 surfaces blocked, awaiting-review, and upcoming sample work.
- My tasks keeps all nine sample tasks available, with Top 3 badges across List,
  Board, and Table. Search combines with All tasks, Top 3, Needs help, and
  Awaiting review filters. Counts and an empty-results reset follow the data.
- Removed nonfunctional week/group/cancelled controls from My tasks and added a
  direct Add a task link. Existing review and blocked-task rules remain intact.
- Verified 15 source/state groups, including the 9-task/3-priority distinction,
  combined search/filter behavior, and state preservation. Chrome's local suite
  passed 21 screen/state checks; desktop and phone layouts were visually reviewed.
- These changes are local only. The older screenshots and source hashes above
  describe the previous revision. Prototype state is local to each screen and
  is not persisted or synchronized across navigation; backend integration and
  publication to Claude Design remain outside this update.


### Scanability follow-up · 20 October 2026

Today puts priority work on the left on desktop and reduces progress to a small
supporting tile. Phone workload links are compact. My tasks uses a continuous
list with consistent headings and distinct due-date text; completed rows are
collapsed until requested (search reveals matching completed work). Open/done
counts remain visible. Task updates offer a one-step Undo and confirmation.
Routine explanatory status text appears only after an action. Source verification
now passes 16 groups, including completed disclosure, search and undo transitions.
These changes support daily use but do not establish employee retention; that
requires testing with employees and persistent, integrated task data.

## Pushed to Claude Design · 20 October 2026

Version 49 of the canvas carries the full-workload and Top 3 changes:

- `employee.css` was uploaded again as `/_blob/9275412045caede2fafcdfc2bb2771d3`,
  and all 15 employee screens now link that id.
- The canvas had moved Today to a two-column masonry layout after the 19 October
  pull. The local Today changes were merged onto it: the workload overview sits
  above the columns, "Beyond your Top 3" replaces "Due soon", and on desktop the
  Top 3 column comes first.
- `Leave`, `MyReport`, `Search` and `Settings` were refreshed from the canvas.
- The new canvas artboards `Setup` (first admin sets up the company) and
  `OtherTeam` (another department's Deliverable, view only) were pulled, with
  the updated `canvas.json`. `OtherTeam` still linked the old `employee.css`
  copy, so version 50 points it at the new one.
