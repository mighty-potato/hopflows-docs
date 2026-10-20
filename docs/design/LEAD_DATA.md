# Lead flow sample data

The Lead screens on the design canvas (`LeadHome`, `Queue`, `Planner`, `Workload`, `Deliverable`, `WeeklyReview`, `Handover`, `Routines`, `TeamTable`) all tell the story of the same two weeks at Riverline Co.'s Technical department. Claude Design screens can't load a shared data file, so each screen keeps its own copy of the data. This page is the agreed version: when a screen changes, check it against this page so the numbers stay honest.

"Today" is **Friday 16 October 2026, week 42** (12–16 Oct). Week 43 is 19–23 Oct and is planned but not locked yet. Chenda Lim leads the department.

## Sizes and hours

| Size | Hours |
|---|---|
| Small | up to 8h |
| Medium | 9–16h |
| Large | more than 16h |

A task in progress shows the hours **left** when it moves (for example Payment webhook retries, Medium, 4h left).

## People in week 43 (Planner)

| Person | Available | Time to plan | Planned | Status | Note |
|---|---|---|---|---|---|
| Chenda Lim | 24h | 18h | 14h | Balanced | Lead, more meetings |
| Dara Sok | 32h | 24h | 22h | Balanced | Leave asked for Thu 22 – Fri 23, not decided. If approved: 16h / 12h |
| Pisey Chea | 19h | 14h | 9h | Room | Technical 60%, Design 40% |
| Rithy Heng | 32h | 24h | 29h | Using buffer | |
| Sophal Ouk | 32h | 24h | 13h | Room | Leaving; last day Fri 23 Oct; handover starts Mon 19 Oct and moves all 13h |
| Sreymom Ly | 0h | 0h | 0h | Away | Annual leave all week |
| Vannak Prum | 32h | 24h | 35h | Too much | Says Full. "Move Vannak's work" moves 10h: Shop tablet updates (Small · 6h) to week 44, Printer setup guide (Small · 4h, due Thu 22) to Chenda. After: Vannak 25h · Using buffer, Chenda 18h of 18h · Balanced |
| **Total** | **171h** | **128h** | **122h** | | Buffer 43h, routines 6h, 2 tasks with no estimate. 116h planned after Vannak's move |

Status words: Room under 70% of time to plan, Balanced 70–100%, Using buffer past time to plan but within available time, Too much past available time, Away.

## Handover of Sophal's work (week 43 loads after the move)

| Item | Size | To | After the move |
|---|---|---|---|
| Store sales export | Small · 4h · due Wed 21 | Pisey | 13h of 14h · Balanced |
| Payment webhook retries | Medium · 4h left · blocked on provider keys | Rithy | 33h of 24h · Too much (32h available), lead says why |
| Salary file check | Small · 3h · confidential · due Thu 22 | Chenda | 17h of 18h · Balanced |
| Old report clean-up | — | Cancelled | |
| Store sales dashboard v1 | Deliverable lead, no hours | Pisey | |
| Nightly backup check | Routine, about 1h a week | Pisey | 14h of 14h · Balanced |
| Data sync weekly | Meeting organizer, 1h | Dara | 23h of 24h · Balanced |
| Release check-in | Monthly meeting, next on 2 Nov | Chenda | Not in week 43 |

7 items move to 4 people and 1 is cancelled. The handover can be undone for 10 minutes.

## Dara's leave (Thu 22 – Fri 23 Oct)

- Dara's week 43: time to plan 24h → 12h, planned 22h → 12h once Menu sync job tests (Medium · 10h, due Thu 22) moves.
- Default: move it to week 44. Giving it to Pisey would make her 19h of 14h, Using buffer (the plan as it stands now, before the handover).

## Week 43 changes

The Planner lists every change to week 43 in one place, so the leave sheet and Handover don't have to assume what the other decided. Both use the plan as it stands now and link to this list.

| Change | State | Effect |
|---|---|---|
| Dara's leave, Thu 22 – Fri 23 | Waiting for Chenda | Dara's time to plan 24h → 12h; Menu sync job tests has to move |
| Sophal's handover | Step 2 of 3 | 13h moves: 5h to Pisey, 4h to Rithy, 3h to Chenda, 1h to Dara |
| Vannak's work (only after "Move 10h") | Done | 10h off Vannak |

## Week 42 in review

- Locked Mon 09:30. 20 locked tasks, 17 done. Not done: Menu photo export (Pisey, moved after her sick day), Menu sync job tests (Dara, moved for the receipt problem), Build the checkout API (Dara, sent for review Fri 15:10).
- Added after locking: Coupon breaks payment at checkout (Rithy, Small · 5h, from the Toul Kork shop on Wednesday), Fix receipt printer driver (Dara, Small · 8h, blocked on the vendor), Nightly backup alerts (Vannak, Small · 1h). Total 14h, 13% of all work.
- Carried over to week 43: Fix receipt printer driver, Menu photo export, Menu sync job tests. This is a different list from "not done": it includes the receipt printer fix (added work) and leaves out Build the checkout API (in review).
- Flags to check: Launch In-App Ordering v1 (At risk, 7 days), School App sign-up flow (Off track, 3 days).
- Routines: Sreymom is away until 30 Oct. Pisey covers Close shop on weekdays; Saturdays have nobody.
- Reassigned: 2 tasks from Pisey to Dara while Pisey was sick on Wednesday (−8h).
- Coupon rules screen (Dara) was accepted on Friday.

## Incoming Queue (4 new)

| Request | From | Matches |
|---|---|---|
| Checkout fails with the 10% coupon | Dara, 12 min ago, Seems urgent | Rithy's open task "Coupon breaks payment at checkout", so Merge is picked first |
| Receipt printer offline at Toul Kork | Shop team, 1 h | Fix receipt printer driver |
| Show prices in riel and dollars | Pisey, from Product sync, yesterday | New |
| Export sales by store | Sokha Meng, 2 days | Store sales export |

## Names to use

- Payment webhook retries (not "Payment webhook").
- Weekly plan (sidebar) opens "Plan next week".
