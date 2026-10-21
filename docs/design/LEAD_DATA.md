# Lead and Leader sample data

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

The Planner counts every open change for week 43 (Dara's asked leave, Sophal's open handover), so the table shows the week as it will really look on Monday. Locking keeps this as the promise.

| Person | Available | Time to plan | Planned | Status | Note |
|---|---|---|---|---|---|
| Chenda Lim | 24h | 18h | 19h | Using buffer | Lead; +5h from Sophal (Salary file check 3h, Nightly backup check 1h, Data sync weekly 1h) |
| Dara Sok | 16h | 12h | 22h | Too much | Leave asked for Thu 22 – Fri 23, counted. Fits (12h of 12h, Balanced) once Menu sync job tests (10h) moves to week 44 |
| Pisey Chea | 19h | 14h | 17h | Using buffer | +8h from Sophal (Store sales export 4h, Payment webhook retries 4h left) |
| Rithy Heng | 32h | 24h | 29h | Using buffer | |
| Sophal Ouk | 32h | 24h | 0h | Room | Leaving; last day Fri 23 Oct; all 13h handed over from Mon 19 Oct |
| Sreymom Ly | 0h | 0h | 0h | Away | Annual leave all week |
| Vannak Prum | 32h | 24h | 35h | Too much | Says Full. "Move Vannak's work" moves Shop tablet updates (6h) and Printer setup guide (4h, due moves to Thu 29) to week 44, so nobody else's week grows. After: 25h · Using buffer |
| **Total** | **155h** | **116h** | **122h** | | Buffer 39h, routines 6h, 2 tasks with no estimate. 112h planned after Vannak's move |

Status words: Room under 70% of time to plan, Balanced 70–100%, Using buffer past time to plan but within available time, Too much past available time, Away.

The lock check lists everything open: Vannak over, Dara's leave (counted), Sophal's handover (counted), 2 tasks with no estimate. "Move Vannak's work" still works after locking, and then shows as a change in the weekly review.

## Handover of Sophal's work (week 43 loads after the move, Dara's leave counted)

| Item | Size | To | After the move |
|---|---|---|---|
| Store sales export | Small · 4h · due Wed 21 | Pisey | 13h of 14h · Balanced |
| Payment webhook retries | Medium · 4h left · blocked on provider keys | Pisey | 17h of 14h · Using buffer (19h available) |
| Salary file check | Small · 3h · confidential · due Thu 22 | Chenda | 17h of 18h · Balanced |
| Old report clean-up | — | Cancelled | |
| Store sales dashboard v1 | Deliverable lead, no hours | Pisey | |
| Nightly backup check | Routine, about 1h a week | Chenda | 18h of 18h · Balanced |
| Data sync weekly | Meeting organizer, 1h | Chenda | 19h of 18h · Using buffer (24h available) |
| Release check-in | Monthly meeting, next on 2 Nov | Chenda | Not in week 43 |

7 items move to 2 people (Pisey, Chenda) and 1 is cancelled. Each item can also go to "No owner", which puts it back in Ready to plan. The handover can be undone for 10 minutes.

## Dara's leave (Thu 22 – Fri 23 Oct)

- Dara's week 43: time to plan 24h → 12h, planned 22h → 12h once Menu sync job tests (Medium · 10h, due Thu 22) moves.
- Default: move it to week 44. Giving it to Pisey would make her 27h of 14h, Too much.

## Week 43 changes

The Planner lists every change to week 43 in one place. Open changes are counted everywhere (Planner, leave sheet, Handover), so all three screens show the same week.

| Change | State | Effect |
|---|---|---|
| Dara's leave, Thu 22 – Fri 23 | Waiting for Chenda, counted | Dara's time to plan 24h → 12h; Menu sync job tests has to move |
| Sophal's handover | Step 2 of 3, counted | 13h moves: 8h to Pisey, 5h to Chenda |
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

## Deliverables (DeliverableList)

| Deliverable | Lead | Due | Progress | Flag |
|---|---|---|---|---|
| School App sign-up flow | Chenda Lim | Fri 6 Nov | 9 of 16 tasks | Off track · 3 days · Scope change |
| Launch In-App Ordering v1 | Chenda Lim | Mon 30 Nov | 14 of 22 tasks | At risk · 7 days · Waiting on others |
| Store sales dashboard v1 | Sophal Ouk, then Pisey Chea from Mon 19 Oct | Fri 13 Nov | 5 of 12 tasks | On track |
| Faster menu pages | Chenda Lim | accepted 2 Oct | 11 of 11 tasks | Accepted |

Only Launch In-App Ordering v1 has a detail page on the canvas.

Reports (Technical, weeks 39–42): week 42 has 20 locked tasks, 17 done, as above. Over the four weeks 65 of 74 locked tasks were done in their week (88%); cancelled and reassigned tasks are left out.

## Leader screens (Goals, Goal, Weekly summary)

The Leader screens are seen by Sokha Meng (Leadership) on **Monday 19 October**, the morning the week 42 summary arrives. Flags are 3 days older than on the Lead screens: School App sign-up flow is Off track for 6 days, Launch In-App Ordering v1 is At risk for 10 days.

| Goal | Status | Result | Deliverables | Note |
|---|---|---|---|---|
| Increase in-app sales by 20% | At risk since Fri 9 Oct | +14% (from $48,200 to $54,950 a month); weeks 39–42: +6, +9, +11, +14 | 2 of 4 accepted | From Launch In-App Ordering v1, Waiting on others ("Payment provider still hasn't sent live keys. Sandbox works."), set by Chenda Lim Fri 9 Oct, back on track by Fri 23 Oct. Result ahead of pace (needed +9 by week 42, one point a week from +6 in week 39 to +20 in week 53). Owner Sokha Meng, ends Thu 31 Dec |
| Onboard 40 pilot schools | Off track since Tue 13 Oct | 22 of 40 | 1 of 3 accepted | From School App sign-up flow, Scope change (schools asked for Khmer forms). Ends Tue 15 Dec |
| Cut support reply time to 4 hours | On track; flag cleared Thu 15 Oct | 5.2h (from 9h) | 3 of 4 accepted | Support reply templates (Operations) accepted in week 42 |
| Reach 25,000 monthly users | On track | 21,400 (from 17,000) | 2 of 3 accepted | |

5 of 8 Goals are on track; the other 4 on-track Goals are not drawn. The count is the same as the week before: support came back on track and pilot schools went off track.

In-app sales Deliverables: Launch In-App Ordering v1 (Technical, Chenda Lim, due 30 Nov, At risk), Water Festival coupon campaign (Marketing, Kosal Nhem, due 20 Nov, On track), Faster menu pages (Technical, Chenda Lim, accepted 2 Oct), New app store screenshots (Design, Sreymom Kim, accepted 9 Oct).

**Weekly summary, Mon 19 Oct, covers week 42 (12–16 Oct):**
- Flags: New, School App sign-up flow (since Tue 13 Oct). Still open, Launch In-App Ordering v1 (since Fri 9 Oct). Cleared, Support inbox rules ("Second person joined from Operations").
- Finished: Support reply templates accepted (Operations). Result: in-app sales +11% → +14% (Sokha).
- Surprise work: Operations 31%, Technical 13% (matches week 42 in review), Marketing 9%, Design 6%.
- Decisions: Approve Goal "Cut stock-outs by 30%" (Bopha Meas, Operations lead, proposed Tue 13 Oct: days a shop runs out of stock, 20 → 14 a month by Wed 31 Mar; Retail App; 2 Deliverables planned). School App sign-up flow: move the date to Fri 20 Nov, or keep Fri 6 Nov and add Khmer forms later (asked by Chenda Lim).

## Writing hours

Always "Xh planned of Yh to plan". Add "Zh available" only when it explains Too much (planned past available).

## Names to use

- Payment webhook retries (not "Payment webhook").
- Weekly plan (sidebar) opens "Plan next week".
