# Lead and Leader sample data

The Lead screens on the design canvas (`LeadHome`, `Queue`, `Planner`, `Workload`, `Deliverable`, `WeeklyReview`, `Handover`, `Routines`, `TeamTable`) all tell the story of the same two weeks at Riverline Co.'s Technical department. Claude Design screens can't load a shared data file, so each screen keeps its own copy of the data. This page is the agreed version: when a screen changes, check it against this page so the numbers stay honest.

"Today" is **Friday 16 October 2026, week 42** (12–16 Oct). On the Lead screens it is about **16:30**: Dara's coupon request came in at 13:58, Build the checkout API went to review at 15:10, Sophal asked for help at 16:05, and Chenda locks week 43 at 16:40. Week 43 is 19–23 Oct and is planned but not locked yet. Chenda Lim leads the department.

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
| Sophal Ouk | 32h | 24h | 0h | Leaving | Takes no new work; last day Fri 23 Oct; all 13h handed over from Mon 19 Oct |
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

Queue tabs: Postponed · 2 (Khmer font in menu PDFs, Dara, back Tue 3 Nov; Dark mode for the shop app, Vannak, back Mon 26 Oct). Sorted · 1 (Receipt prints the wrong shop address, Dara, merged into Fix receipt printer driver on Wed). Merge targets: Coupon breaks payment at checkout (Rithy), Fix receipt printer driver (Dara), Store sales export (moving from Sophal to Pisey). Sophal can't be picked as an owner (leaving Fri 23).

## Workload, week 42 (this week)

| Person | Available | Time to plan | Planned | Status |
|---|---|---|---|---|
| Chenda Lim | 32h | 18h | 16h | Balanced |
| Dara Sok | 32h | 24h | 22h | Balanced |
| Pisey Chea | 19h | 14h | 12h | Balanced (sick Wed) |
| Rithy Heng | 32h | 24h | 29h | Using buffer (24h + 5h added) |
| Sophal Ouk | 32h | 24h | 10h | Leaving |
| Sreymom Ly | 0h | 0h | 0h | Away |
| Vannak Prum | 32h | 24h | 14h | Room, says Full |

Workload shows week 42 and week 43 by default; week 43 matches the Planner table above. Routines: Open shop checklist runs working days by 09:00 (Dara Tue and Thu, Vannak Mon, Wed and Fri); Check overnight error emails is Dara's, working days by 09:30.

## Deliverables (DeliverableList)

| Deliverable | Lead | Due | Progress | Flag |
|---|---|---|---|---|
| School App sign-up flow | Chenda Lim | Fri 6 Nov | 9 of 16 tasks | Off track · 3 days · Scope change |
| Launch In-App Ordering v1 | Chenda Lim | Mon 30 Nov | 14 of 22 tasks | At risk · 7 days · Waiting on others |
| Store sales dashboard v1 | Sophal Ouk, then Pisey Chea from Mon 19 Oct | Fri 13 Nov | 5 of 12 tasks | On track |
| Faster menu pages | Chenda Lim | accepted 2 Oct | 11 of 11 tasks | Accepted |

Only Launch In-App Ordering v1 has a detail page on the canvas.

Reports (Technical, weeks 39–42): week 42 has 20 locked tasks, 17 done, as above. Over the four weeks 65 of 75 locked tasks were done in their week (87%); cancelled and reassigned tasks are left out.

## Leader screens (Goals, Goal, Weekly summary)

The Leader screens are seen by Sokha Meng (Leadership) on **Monday 19 October**, the morning the week 42 summary arrives. Flags are 3 days older than on the Lead screens: School App sign-up flow is Off track for 6 days, Launch In-App Ordering v1 is At risk for 10 days.

| Goal | Status | Result | Deliverables | Note |
|---|---|---|---|---|
| Increase in-app sales by 20% | At risk since Fri 9 Oct | +14% (from $48,200 to $54,950 a month); weeks 39–42: +6, +9, +11, +14 | 2 of 4 accepted | From Launch In-App Ordering v1, Waiting on others ("Payment provider still hasn't sent live keys. Sandbox works."), set by Chenda Lim Fri 9 Oct, back on track by Fri 23 Oct. Result ahead of pace (needed +9 by week 42, one point a week from +6 in week 39 to +20 in week 53). Owner Sokha Meng, ends Thu 31 Dec |
| Onboard 40 pilot schools | Off track since Tue 13 Oct | 22 of 40 | 1 of 3 accepted | From School App sign-up flow, Scope change (schools asked for Khmer forms). Ends Tue 15 Dec |
| Cut support reply time to 4 hours | On track; flag cleared Thu 15 Oct | 5.2h (from 9h) | 3 of 4 accepted | Support reply templates (Operations) accepted in week 42 |
| Reach 25,000 monthly users | On track | 21,400 (from 17,000) | 2 of 3 accepted | Marketing, Technical |
| Cut new-hire setup to 2 days | At risk since Mon 28 Sep (3 weeks, so it is now a leader decision) | 4 days (from 6) | 1 of 2 accepted | From Staff laptop setup guide, Time (not enough people). Operations, no product, ends 18 Dec |
| Keep the app rating at 4.5 or higher | On track | 4.6 (from 4.4) | 1 of 1 accepted | Design, Retail App |
| Cut card fees in shops by 15% | On track | −9% (from $1,900 a month) | 1 of 2 accepted | Operations, no product |
| Sign 5 school partners | On track | 3 of 5 | 1 of 2 accepted | Marketing, School App, ends 15 Dec |

Needed by now (Mon 19 Oct), as a share of the way from start to target: in-app sales 45% (has 70%), pilot schools 60% (55%), new-hire setup 70% (50%), support 70% (76%), monthly users 50% (55%), app rating 100% (100%), card fees 55% (60%), school partners 60% (60%). Goal cards show this as a short line on the bar and are sorted Off track, At risk, On track. Each card has one verdict line: in-app sales "Result ahead of pace; launch date at risk (payment keys late, back by Fri 23 Oct)"; pilot schools and new-hire setup "Result behind pace; … Waiting for your decision"; the rest "Ahead of pace", "On pace" or "On target".

All 8 Goals are drawn on the Goals page, with filters for flag, product and department. Only in-app sales has its own Goal page on the canvas. 5 of 8 Goals are on track. The count is the same as the week before: support came back on track and pilot schools went off track.

In-app sales Deliverables: Launch In-App Ordering v1 (Technical, Chenda Lim, due 30 Nov, At risk), Water Festival coupon campaign (Marketing, Kosal Nhem, due 20 Nov, On track), Faster menu pages (Technical, Chenda Lim, accepted 2 Oct), New app store screenshots (Design, Sreymom Kim, accepted 9 Oct).

**Weekly summary, Mon 19 Oct, covers week 42 (12–16 Oct):**
- Flags: New, School App sign-up flow (since Tue 13 Oct). Still open, Launch In-App Ordering v1 (since Fri 9 Oct) and Staff laptop setup guide (since Mon 28 Sep, open 3 weeks, so now a decision). Cleared, Support inbox rules ("Second person joined from Operations").
- Finished: Support reply templates accepted (Operations). Result: in-app sales +11% → +14% (Sokha).
- Earlier summaries: week 41 (Mon 12 Oct) 5 of 8, in-app sales went At risk, app store screenshots accepted, no decisions; week 40 (Mon 5 Oct) 6 of 8, support reply time and new-hire setup went At risk; week 39 (Mon 28 Sep) 8 of 8, Q4 Goals approved.
- Surprise work: Operations 31%, Technical 13% (matches week 42 in review), Marketing 9%, Design 6%.
- Decisions: Approve Goal "Cut stock-outs by 30%" (Bopha Meas, Operations lead, proposed Tue 13 Oct: days a shop runs out of stock, 20 → 14 a month by Wed 31 Mar; Retail App; 2 Deliverables planned). School App sign-up flow: move the date to Fri 20 Nov, or keep Fri 6 Nov and add Khmer forms later (asked by Chenda Lim). Cut new-hire setup (flag open 3 weeks, Bopha Meas): lend one person from Design until Fri 18 Dec, move the end date to Wed 31 Mar, or keep waiting and ask again Mon 2 Nov.
- Approving Cut stock-outs adds about 6h a week of shop stock counts to Operations from January. While Operations is over its buffer (31% surprise work, setup guide short of people), the suggested choice is Send back.
- School App has a third choice: lower the target to 34 schools by Tue 15 Dec (34 of 34); Kosal Nhem, the Goal owner, must agree. School App answers go to Chenda and Kosal; lending from Design goes to Bopha and Sreymom Kim.
- The Goal page shows work done as 41 of 64 tasks across in-app sales' Deliverables. App rating started at 4.4 and has been above 4.5 since week 40.
- Effect on the Goal for each choice: School App, move the date to Fri 20 Nov → about 30 of 40 pilot schools by Tue 15 Dec, all with Khmer forms; keep Fri 6 Nov → about 34 of 40 by Tue 15 Dec, Khmer-only schools in January. New-hire setup: lend from Design → 2 days by Fri 18 Dec; move to Wed 31 Mar → 2 days by then; keep waiting → likely 3 days by Fri 18 Dec. Design planned 52h of its 64h available in week 42 (about 12h a week free).
- Flag lines on Goal cards: in-app sales, set by Chenda Lim Fri 9 Oct, 10 days, back by Fri 23 Oct; pilot schools, set by Chenda Lim Tue 13 Oct, 6 days, no date; new-hire setup, set by Bopha Meas Mon 28 Sep, 3 weeks, no date.
- Owners: in-app sales, you (Sokha Meng); pilot schools, users and school partners, Kosal Nhem; new-hire setup, support and card fees, Bopha Meas; app rating, Sreymom Kim. Ask Chenda Lim about in-app sales and pilot schools, Bopha Meas about new-hire setup.

**Company reports (the Leader's Reports), plan vs. reality by department.** Locked = done + not done + cancelled. Added = share of hours added after locking.

| Week | Operations | Technical | Marketing | Design |
|---|---|---|---|---|
| 42 | 18 locked, 13 done, 5 not done, 31% added, 1 reassigned | 20, 17, 3, 13%, 2 reassigned | 12, 11, 1, 9% | 10, 9, 1, 6% |
| 41 | 17, 13, 4, 27% | 19, 17, 1 not done, 1 cancelled, 8% | 12, 10, 2, 11% | 9, 9, 0, 4% |
| 40 | 16, 12, 4, 24%, 1 reassigned | 20, 15, 5, 18% | 11, 10, 1, 7% | 10, 8, 2, 10% |

Trend view (weeks 40–42): surprise work Operations 24% → 27% → 31% (+7 pts), Technical 18% → 8% → 13% (−5), Marketing 7% → 11% → 9% (+2), Design 10% → 4% → 6% (−4). Done in the week: Operations 75%, 76%, 72%; Technical 75%, 94%, 85%; Marketing 91%, 83%, 92%; Design 80%, 100%, 90%.

Technical's rows match its own Reports (weeks 39–42: 65 of 75 locked tasks done in their week, 87%, cancelled and reassigned tasks left out). The Goal status table repeats the 8 Goals with done vs needed, owner and who to ask.

## Dara's week (employee screens)

Today on the employee screens is **Friday 16 October, 14:10** (before Build the checkout API goes to review at 15:10). Dara Sok, Technical, lead Chenda Lim.

- Top 3 today: Build the checkout API (Medium, 12h estimate, in progress, due 17:00), Check menu photos with Design (Small, due today, from Pisey on Wednesday), Update receipt footer text (Small, from Pisey on Wednesday, done 10:24).
- Beyond the Top 3: Fix receipt printer driver (added Tue, 8h, blocked on the vendor, due Wed 21), Coupon rules screen (with Chenda since Thu; accepted later on Friday), Write release notes (due Tue 10 Nov), Menu sync job tests (Medium, 10h, due Thu 22, moving to week 44), Contract renewal check (confidential, due Thu 22, during the leave).
- Week 42 so far: 4 planned (1 done, 1 with Chenda, 1 due today, 1 moved), 3 came in (the printer driver, and 2 tasks from Pisey), 2 move to week 43. Routines 10 of 11 on time; Daily wrap-up notes missed on Wednesday.
- Routines: Check overnight error emails (working days by 09:30, done 09:12 today), Daily wrap-up notes (working days by 18:00), Open shop checklist (Tue and Thu by 09:00).
- Week 43 as Chenda plans it: 22h planned of 12h to plan with the leave counted; Menu sync job tests moves to week 44, then 12h of 12h. Without the leave: 22h of 24h.
- Leave: Annual Thu 22 – Fri 23 Oct, waiting for Chenda. Sample new request: Annual Mon 9 – Tue 10 Nov (Menu sync job release Mon 9 Nov, Write release notes Tue 10 Nov). Backup approver: Sokha Meng.
- Week 41 (My week report, final): 3 of 3 planned done (Payment webhook retries, Order history endpoint, Coupon banner tests), 1 came in (Shop tablet login times out, fixed Mon), nothing moved, routines 10 of 10.
- Need help (blocked state): Build the checkout API waits on the payment provider's live keys ("Sandbox works"), since Fri 16 Oct 12:05; same wording as the Goal flag.
- Today header: "This week you said Balanced"; next week as "12h planned of 12h to plan, once Menu sync job tests moves to week 44".
- Requests I sent: Checkout fails with the 10% coupon (sent 13:58 today, waiting; matches Rithy's open task in the Queue), Add Khmer search to the menu (waiting), Receipt prints the wrong shop address (joined), Khmer font in menu PDFs (back on Tue 3 Nov), and two older ones.

## Writing hours

Always "Xh planned of Yh to plan". Add "Zh available" only when it explains Too much (planned past available).

## Names to use

- Payment webhook retries (not "Payment webhook").
- Weekly plan (sidebar) opens "Plan next week".
