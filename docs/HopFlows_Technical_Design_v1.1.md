# HopFlows — Technical Design

**VERSION 1.1**

17 October 2026

Companion to the HopFlows Product Blueprint v1.1 (including the gap-fix additions). The blueprint defines the business and design logic; this document defines how engineering implements it. When the two disagree, the blueprint's business rules (§04–§05) win and this document is updated.

# 1 Relational data model

Recommended persistence model: PostgreSQL with UUID identifiers, timestamps, organization-scoped authorization and history-bearing records. The tables below define the conceptual schema; exact SQL types, indexes and migrations can be finalized during implementation.

## A. Organization, people and products

| **Table** | **Key fields** | **Purpose** |
|----|----|----|
| organizations | id, name, timezone, settings | Company workspace and defaults |
| users | id, name, email, locale | Global account identity |
| org_memberships | id, org_id, user_id, role (admin / leadership / member), status (invited / active / suspended / deactivated), timezone, holiday_calendar_id? | User membership and access within a company; lead rights come from department roles and delegations |
| departments | id, org_id, name, lead_id | Functional teams |
| department_memberships | department_id, membership_id, role (lead / member), allocation_percent, start_at, end_at | Team membership, historical assignment and each member's default capacity share per department |
| product_lines | id, org_id, name, owner_id, status | Company product and service lines |
| product_areas | id, product_line_id, name | Optional modules within each product |
| delegations | id, org_id, from_membership_id, to_membership_id, capability, scope_type (organization / department / goal / deliverable), scope_id?, start_at, end_at? | Explicit grants behind "Delegated" in the permission matrix (Proposed) |

## B. Goals, Deliverables and Tasks

| **Table** | **Key fields** | **Purpose** |
|----|----|----|
| goals | id, org_id, title, owner_id, start_date, due_date, status (draft / proposed / active / achieved / missed / cancelled) | Strategic outcomes; a lead-proposed Goal becomes active when leadership approves it |
| goal_product_lines | goal_id, product_line_id | Goals across one or more products |
| goal_metrics | id, goal_id, metric, baseline, target, unit, direction | Outcome targets separate from task completion |
| goal_metric_updates | id, goal_metric_id, value, recorded_at | Measured outcome progress over time |
| deliverables | id, org_id, goal_id?, title, lead_id, owner_department_id, due_date, status (planned / active / in_review / accepted / cancelled), review_required, acceptance_criteria | Finite team commitments |
| deliverable_product_lines | deliverable_id, product_line_id, is_primary | Product context and reporting attribution |
| deliverable_departments | deliverable_id, department_id | Contributing departments |
| tasks | id, org_id, deliverable_id?, assignee_id?, reviewer_id?, department_id?, product_line_id?, product_area_id?, title, status (to_do / in_progress / review / done / cancelled), priority, work_type, visibility (standard / confidential), review_required, estimate_size?, estimate_minutes?, due_at, blocked_at?, blocked_reason?, blocker_owner_id?, help_requested_at?, created_by | Execution work; standalone tasks permitted. A member may create a task for themselves (assignee_id = created_by) without approval; in a committed cycle it is recorded as added work. Tasks for anyone else come from a lead or from intake_requests. |
| task_checklist_items | id, task_id, title, is_done, position | Steps within a Task |
| task_collaborators | task_id, membership_id | Contributors without diluted accountability |
| task_dependencies | task_id, depends_on_task_id | Dependency tracking; both Tasks in the same organization, and no cycles |
| task_access | task_id, membership_id, granted_by, granted_at | People who may see a Confidential Task besides its assignee, reviewer and collaborators |
| estimate_size_settings | org_id, size (small / medium / large), minutes | Converts Small / Medium / Large estimates into minutes for capacity and load |

Task product context normally derives from its Deliverable. Standalone tasks can carry optional product_line_id and product_area_id directly. An owner may be left blank during quick capture and triage; active assigned work must have one accountable owner.

Blocked and Need Help are markers on a Task, not statuses. A Confidential Task is visible only to its assignee, reviewer, collaborators, people listed in task_access and organization admins; the department lead and admins grant access. A Task with an estimate_size and no estimate_minutes uses the organization's size mapping; a Task with neither is shown as Unestimated and counted separately in load views.

## C. Planning, intake and capacity

| **Table** | **Key fields** | **Purpose** |
|----|----|----|
| intake_requests | id, org_id, department_id?, title, source, seems_urgent (requester's hint, default false), urgency (set by the lead when sorting), requester_id, triage_status (new / converted / merged / deferred / closed), deferred_until?, task_id?, source_event_id? | Captures unexpected requests; duplicates may map to one Task. Without a department, a request goes to the requester's primary department queue, otherwise to the organization triage queue |
| planning_cycles | id, org_id, department_id, start_date, end_date, status | Weekly department commitment boundary |
| plan_baselines | id, cycle_id, committed_at, committed_by, revoked_at? | Immutable committed snapshot; at most one active (not revoked) per cycle. After commit, every change is a plan_change_events entry. The committer may revoke within 10 minutes only while the cycle has no plan_change_events; revoking sets revoked_at and leaves the cycle uncommitted. |
| plan_baseline_items | baseline_id, task_id, estimate_minutes, assignee_at_commit | Original work and estimates, retained after changes |
| cycle_work_items | cycle_id, task_id, allocated_minutes, added_at | Live allocation for work in the week |
| capacity_profiles | membership_id, work_schedule (working days and minutes per day), weekly_minutes, meeting_allowance_minutes, reserved_buffer_percent | Default capacity settings; weekly_minutes is the sum of the work schedule, and the meeting allowance is prorated to the working days left after holidays and leave |
| member_unavailability | membership_id, start_at, end_at, minutes | Leave and exceptions to capacity |
| member_cycle_capacities | cycle_id, membership_id, available_minutes, plannable_minutes | Per-period capacity for one department cycle; the default split follows department_memberships.allocation_percent, and the lead can adjust it |
| effort_entries | task_id, membership_id, duration_minutes, work_date | Optional recorded effort; do not confuse with estimates |
| plan_change_events | cycle_id, task_id, change_type (added / removed / rescheduled / reassigned / handover / cancelled / carryover), reason, triggered_by_intake_id, timestamp | Explains priority shifts and displaced work |

## D. Collaboration, history and recognition

| **Table** | **Purpose** |
|----|----|
| activity_events | Append-only history for status changes, owner changes, plan changes and accepted completion. |
| comments | Discussions attached to Tasks or Deliverables, with permission-aware access. |
| attachments | References to supporting documents, photos and other evidence. |
| notifications | In-app record of every alert sent to a person; delivery channels are defined in section G. |
| achievement_definitions | Configurable achievements and qualification rules (later stage). |
| achievement_awards | Records achievements assigned to people or teams (later stage). |
| reward_events | Idempotent reward awards based on verified work events. |
| streak_states | Current streak cache that can be rebuilt from underlying events. |
| kudos | One-tap thanks from one member to another, linked to a Task, Deliverable or comment; one per giver, receiver and item, no self-kudos, never counted into rankings. |

## E. Workload, handover and risk

| **Table** | **Key fields** | **Purpose** |
|----|----|----|
| workload_band_settings | id, org_id, department_id?, room_below_percent, horizon_weeks | Configurable heatmap threshold and default horizon; a department row overrides the company default. |
| workload_by_cycle (derived view) | membership_id, cycle_id, plannable_minutes, available_minutes, baseline_minutes, added_minutes, allocated_minutes, load_band | Read model computed from member_cycle_capacities, plan_baseline_items and cycle_work_items; never stored as a score on a person. |
| handover_batches | id, org_id, from_membership_id, reason, handover_type (permanent / temporary), effective_at, return_review_at?, created_by, note | One handover action for one person, with its reason and timing. |
| handover_items | id, batch_id, entity_type, entity_id, from_membership_id, to_membership_id, decision, note | Item-level outcome for each Task, Deliverable, Goal, open intake request, department lead role, product line ownership, organized meeting or team channel that is moved, kept or cancelled. |
| risk_flags | id, org_id, entity_type (goal / deliverable), entity_id, level (at_risk / off_track), reason_category, reason_note, expected_recovery_date?, set_by, set_at, cleared_by?, cleared_at?, clear_note? | Append-only history of lead-set risk judgments; at most one active flag per entity. |

A handover updates tasks.assignee_id (and deliverables.lead_id or goals.owner_id where applicable); live cycle allocations follow the new owner. It writes activity_events and plan_change_events with change_type = handover. plan_baseline_items.assignee_at_commit is never modified, so reports can show reassigned work separately from displaced or missed work. Risk flags attach to Goals and Deliverables, never to people; Tasks keep the existing Blocked flag.

A handover receiver must be an active member other than the person handing over, with no open outbound handover of their own. A risk flag can be cleared by the person who set it, the item's current owner or leadership; a Goal owner cannot clear a flag set by leadership. When a Deliverable is accepted or cancelled, its active flag closes automatically with that reason; when it moves to another Goal, the flag moves with it.

## F. Calendar and events

| **Table** | **Key fields** | **Purpose** |
|----|----|----|
| holiday_calendars | id, org_id, name, region_code?, is_default | Company holiday calendars; a company can keep more than one (for example, per country or office). |
| holidays | id, holiday_calendar_id, name, start_date, end_date, kind (public / company), is_half_day | Non-working days, stored per year because many public holidays follow the lunar calendar. |
| calendar_events | id, org_id, event_type (meeting / custom), title, description, start_at, end_at, all_day, timezone, recurrence_rule?, location_or_link, visibility (private / attendees / department / organization), department_id?, blocks_work_time, linked_entity_type?, linked_entity_id?, created_by, cancelled_at? | Meetings and custom events, optionally linked to a Goal, Deliverable or Task (for example, a review meeting). |
| event_attendees | event_id, membership_id, is_organizer, response (invited / accepted / tentative / declined) | Who is invited and whether they will attend. |
| event_occurrence_overrides | event_id, original_start_at, status (cancelled / moved), new_start_at?, new_end_at? | Changes one occurrence of a recurring event without rewriting the series. |
| event_reminders | event_id, membership_id, minutes_before | Per-person reminders, delivered through notifications. |
| calendar_items (derived view) | viewer_membership_id, item_type (holiday / meeting / custom / leave / deadline), source_type, source_id, starts_at, ends_at, all_day | Read model merging holidays, event occurrences, member_unavailability and due dates from Goals, Deliverables and Tasks, filtered by the viewer's permissions. |

Deadlines are never copied into calendar_events. The calendar reads goals.due_date, deliverables.due_date and tasks.due_at directly, so each due date has one source of truth; moving a deadline on the calendar edits the source record and writes the normal activity_events entry (plus a plan_change_events entry when the Task is in a committed week). Holidays from the member's holiday calendar (the company default when org_memberships.holiday_calendar_id is empty) and accepted events marked blocks_work_time reduce member_cycle_capacities.available_minutes. Routine meetings are covered by capacity_profiles.meeting_allowance_minutes, so they are not subtracted twice. Overlapping holidays, leave and blocking events are subtracted once, by the union of their time ranges, so capacity never goes below zero. When a blocking event is declined or cancelled after the baseline, live capacity is recomputed and the change appears in the weekly review.

## G. Notifications and channels

| **Table** | **Key fields** | **Purpose** |
|----|----|----|
| notifications | id, org_id, recipient_membership_id, event_type, priority (urgent / normal / digest / celebration), entity_type, entity_id, dedupe_key, created_at, read_at?, acknowledged_at? | One record per person per event; feeds the in-app inbox and every channel. |
| notification_deliveries | id, notification_id, channel (in_app / push / telegram / slack / teams / email), connection_id?, status (queued / sent / delivered / failed), provider_message_id?, attempts, sent_at? | Delivery outbox and audit per channel, with retries. |
| notification_preferences | membership_id, event_type, channels, delivery (immediate / digest / off), quiet_hours_start, quiet_hours_end | Per-person choices on top of company defaults. |
| push_devices | id, user_id, platform (ios / android / web), push_token, app_version, last_seen_at, revoked_at? | Devices that receive mobile and web push. |
| channel_connections | id, user_id, provider (telegram / slack / teams), external_user_id, external_chat_id, default_org_id?, locale, status (active / blocked / revoked), linked_at | Later stage (chat apps). A person's linked chat account; at most one active connection per provider, and one external account links to only one HopFlows user. |
| channel_link_tokens | id, user_id, provider, token_hash, expires_at, used_at? | Later stage (chat apps). One-time, short-lived codes that link a chat account from inside the app. |
| team_channels | id, org_id, department_id?, provider, external_chat_id, post_types (morning brief / wins / holidays / urgent), content_level (summary / titles), added_by | Later stage (chat apps). Team or company group chats that receive shared posts. |
| notification_actions | id, notification_id, action (start / done / need_help / snooze / accept / decline), token_hash, expires_at, used_at? | One-time tokens behind chat and push buttons; each maps to the same service command as the app. Snooze offers fixed options (1 hour, 3 hours, tomorrow morning); snoozing an urgent alert never cancels its escalation. |
| message_templates | key, channel, locale (en by default; more locales such as km later), title, body, version | Channel-neutral copy, English by default; each adapter renders it for its channel. |

Every alert is written once to notifications and then fanned out through notification_deliveries by channel adapters. The first version ships the in_app and push adapters (phone and browser); telegram, slack, teams and email adapters come in a later stage. An adapter only translates a channel-neutral message (title, body, priority, actions, deep link) into push, Telegram, Slack or Teams format, so adding a new tool needs an adapter and templates, not new business logic. A button press arrives with a notification_actions token, is checked against the person's current permissions and the item's current state, and runs the same command as the app, writing the usual activity_events entry.

When a person belongs to more than one company, the bot asks which company a capture belongs to and offers to remember a default (channel_connections.default_org_id); the push budget counts per person across companies. Quiet hours, the morning brief and the daily push budget follow the member's own time zone (org_memberships.timezone, defaulting to the company's).

# 2 Technical principles

- Start with one relational transactional model rather than separate databases for planned and unplanned work.
- Make activity, baseline and approval history append-only or otherwise reliably auditable.
- Enforce organization boundaries at data access and relationship-validation layers.
- Use explicit lifecycle and permission checks in service logic, not only hidden front-end controls.
- Make computation of reports deterministic and avoid double counting allocations across cycles, products and departments.
- Keep effort logging optional during the initial pilot; prioritize adoption over exhaustive bookkeeping.
- Treat notifications and achievement awards as idempotent reactions to verified events.
- Deliver every notification through one outbox and channel adapters that respect each provider's rate limits, so Slack, Microsoft Teams or another tool needs only a new adapter and templates.
- Treat chat platforms as untrusted input: verify webhook requests, use single-use action tokens and re-check permissions on every action.

# 3 Implementation notes

- Store times in UTC with the organizer's time zone; show them in each viewer's local time. Holidays and all-day events stay date-based.
- Store one-time link codes and action tokens as hashes, with an expiry and a used-at time.
- Deduplicate notifications by dedupe_key.
- When a chat bot is blocked or a push token expires, mark the channel_connections or push_devices row inactive.
- A handover runs in a single database transaction.

# 4 Additions for gap fixes (Proposed)

Supports Blueprint §04 (Leave; Repeating daily work; Reports, search and offline; New requests) and Flow J (weekly summary for leaders). The blueprint calls the plan baseline "locked plan", a cycle "week", and triage "Sort".

| **Table** | **Key fields** | **Purpose** |
|----|----|----|
| leave_requests | id, org_id, membership_id, leave_type (annual / sick / other), start_at, end_at, is_half_day, status (requested / approved / declined / withdrawn / cancelled), private_note?, approver_membership_id?, decided_at?, created_by | Leave requests. Approval writes the matching member_unavailability row; cancellation removes it. The requester may withdraw a request while it is still requested. |
| routines | id, org_id, department_id?, owner_membership_id, title, checklist_template, recurrence_rule, window_end_time?, estimate_minutes, assignment_mode (fixed / rotation), assignee_id?, backup_assignee_id?, runs_on_holidays, paused_at? | Routine definitions; edits apply to occurrences not yet generated. |
| routine_rotation_members | routine_id, membership_id, position | Rotation order. |
| tasks (added fields) | routine_id?, occurrence_date?; status adds missed | Each routine occurrence is a Task, unique per (routine_id, occurrence_date). |
| week_signals | membership_id, cycle_id, level (room / balanced / full), note?, set_at | One per member per cycle; ignored after the cycle ends. |
| intake_requests (added fields) | closed_reason?, last_requester_update_at? | Requester updates; closing requires closed_reason. |
| leadership_briefs | id, org_id, membership_id, period_start, content_snapshot, pdf_ref, sent_at | Snapshot of each weekly brief, so later edits never change what was sent. |
| report_exports | id, org_id, requested_by, report_type, filters, format (xlsx / pdf), status, file_ref, expires_at | Generated on request; files deleted at expiry. |
| saved_views | membership_id, screen, view_type (list / board / table), filters, sort, group_by, visible_columns, updated_at | Each person's last view per screen; Board drags and Table bulk changes call the same Task commands as buttons, one command per item. |
| offline_actions | client_action_id, membership_id, action, entity_type, entity_id, occurred_at, received_at, result (applied / rejected), reason? | Idempotent sync of actions taken offline; client_action_id is unique. |

## Notes

- Generate routine occurrences a day ahead in each member's time zone, honoring the work schedule, holiday calendar, leave and runs_on_holidays; a scheduled job closes occurrences as missed when the window passes, using occurred_at from offline_actions when it arrives late.
- Routine estimates for a cycle are added to plan_baseline_items at commit; routines created later write plan_change_events with change_type = added.
- Requester updates are notifications to intake_requests.requester_id, delivered through the channel recorded in intake_requests.source plus in_app.
- Search uses one index per organization with substring (n-gram) matching for languages written without spaces, such as Khmer, filtered by the same visibility rules as the item at query time; Confidential Tasks are filtered before results are counted.
- The offline cache is encrypted on the device, holds at most the scope in Blueprint §14, and is wiped on sign-out or when the membership ends.
- Offline actions carry the entity version they were based on; the server rejects an action whose precondition no longer holds and returns a reason for the app to show.

---

*HopFlows / End of Technical Design*
