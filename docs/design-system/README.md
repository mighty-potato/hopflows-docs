# HopFlows Soft Bento

HopFlows is a simple, role-based work platform: a team captures requests, plans the week against real capacity and sees progress without writing status reports. Soft Bento is its look: plain words in rounded tiles, near-black actions, a floating tab bar, and Hop yellow on one hero tile at a time. Its mascot is **Punh Punh**, a chubby pencil. It ships in two themes, **Light** and **Black**, from the same tokens.

## Product principles the design serves

- **One question per home screen.** Employee: "What should I do next?" Lead: "Is my team OK, and what needs me?" Leadership: "Are we on track for our Goals?" Show only what that person needs to act; everything else is one tap away.
- **Three to five items by default,** then *See all*. One main action per screen.
- **Words and colours before numbers.** "On track", "Needs you" and capacity colours come first; hours and percentages appear on tap or in a smaller mono line.
- **Plain language for employees:** "Planned this week", not *baseline*; "New request", not *intake*.
- **One in, one out.** A new element on a default screen pushes something else one tap deeper.

## Content fundamentals

- **Voice: a calm teammate.** Short, plain, encouraging. "One more hop." beats "You have 1 remaining task."
- **Name things by what people do.** Capture, Start, Done, Need help, Accept, Later, Reschedule. Buttons are verbs or short answers, never "Submit" or "OK".
- **Words lead, numbers back them up.** Headline the answer in words ("Fits, but one person is over", "Mostly on track") and put the numbers on a smaller Geist Mono line under it (`115h planned · 128h to plan`). A big number leads only when it is the answer itself, like `2/3` on Today.
- **Sentence case everywhere.** Labels like "Up next · due today" use a middle dot to join two facts.
- **Serious moments stay plain.** Urgent alerts, Need help, risk flags, handovers and confidential items use direct wording, no mascot and no celebration.
- **Tagline:** Small steps. Big wins.

## Visual foundations

**Ground and tiles.** Every screen is a `ground` page with tiles on it. A tile is a solid fill with `radius-xl` (28px) corners, `space-5` padding and no border or shadow. Tiles sit on a grid with a `space-3` gutter: 12 columns on web, 2 on phone.

**One hero per screen.** Exactly one tile uses `hop-yellow` (with `on-yellow` text): usually Top 3 progress on Today, the "Needs you" count for a lead, or Goal progress for leadership. Hop yellow also fills the `+` capture button and small count badges. Never two yellow tiles side by side.

**Supporting tints.** `sky` for information (next meeting), `blush` for people and kudos, `card` for everything else. Text on each tint uses its `on-` partner.

**Actions are carbon.** The primary button is `action` on `on-action`, pill shaped (`radius-pill`), 48px tall (44px compact). In Black mode `action` flips to chalk, so the primary button stays the highest-contrast thing on screen. Secondary buttons use `card` on ground or `inset` inside a card.

**Status is form plus colour.** Status pills pair an 8px dot with a word ("On track", "At risk", "Off track"); capacity cells pair a fill with a word ("Room", "Balanced", "Using buffer", "Too much", "Away"). Never colour alone. "Away" is a 45° hatch of `away-a` / `away-b`. Warnings are orange (`warning-*`), never yellow, so Hop yellow is never read as an alert.

**Type.** Geist 400–700 for everything written, Geist Mono 500–600 for numbers. Headings tighten letter-spacing (−0.02 to −0.045em); body stays at 0.

**Black mode** is a real theme, not an inversion: ground `#0E0D11`, cards `#1C1B1F`, tints darkened so their `on-` text keeps 4.5:1. Hop yellow is identical in both themes.

## Layout

- **Phone (390 wide):** `space-4` side gutter, a header row (date + title + avatar), the yellow hero tile, a 2-up row of stat tiles, then the up-next card. A floating `action`-coloured tab bar sits 22px above the bottom, `radius-pill`, with four slots: Home (role-specific), Calendar, the yellow `+` in the middle, Inbox. Everything else lives in Menu.
- **Web (1280–1440 wide):** a 232px sidebar with the nav and a streak card, then the bento grid on the right at `space-7` padding. At 760px and below the sidebar becomes a top row and every tile spans the full width.
- **Lead heatmap:** rows of members, columns of weeks, one `CapacityCell` per cell; sorted by team and name, never by load.

## Iconography

Line icons at 18px, 2px stroke, round caps and joins, drawn in `currentColor` so they follow the text. No filled icons, no emoji. Icon-only buttons always carry an `aria-label`.

## Logo: Punh Checklist

The HopFlows logo and app icon is **Punh Checklist** (in **Assets › Logos**): a white checklist card on a `sky` tile, two items ticked in `hop-yellow` on carbon boxes and one still open, with a large Punh Punh in front of it, tilted 12° to the right. It says what the product does: small steps, ticked off one by one.

- **Which file:** the rounded `hopflows-app-icon.svg` for web, documents and slides; the square `hopflows-app-icon-square.svg` as the master for phone and store icons (iOS and Android add their own corners); `hopflows-notification-icon.svg`, a white tick in a rounded box, only for the Android status bar and other one-colour slots.
- **Colours are fixed:** tile `sky` `#C9DDE8`, card `#FFFFFF`, boxes and next item `#1C1B1F`, ticks `hop-yellow` `#F7C83A`, finished items `stone` `#E7E5DF`. The icon looks the same in Light and Black; never recolour or invert it.
- **Size:** Punh Punh is drawn big so its face and the yellow ticks still read at home-screen size (48px). At 29px and below the checklist lines merge, so use those sizes only where the platform demands them (favicons).
- **Android:** launchers crop to a circle or squircle and keep only the centre 66 of 108 dp, which would cut Punh Punh. Android 8+ uses the adaptive icon instead: `hopflows-adaptive-foreground.svg` (the same art at 62%, inside the safe circle) on a plain `sky` background layer, and `hopflows-adaptive-monochrome.svg` for themed icons.
- **Wordmark:** there is no drawn wordmark yet. Next to the icon, set "HopFlows" in Geist 600 with −0.03em letter-spacing in `ink`.

## Mascot: Punh Punh

Punh Punh (in **Assets › Mascot**) is a short, chubby pencil: striped yellow body, cream sharpened cone with a rounded graphite tip, pink eraser base. It is the friendly face of the product: it guides new users, fills empty screens and celebrates verified wins.

- **Where it appears:** onboarding, empty Today / Inbox / Calendar states, the completion moment and "All clear", beside the private streak and received kudos, calm error and offline states.
- **How:** at most once per screen; tucked into the corner of the hero tile and bleeding off its bottom-right edge, or as a 44–52px tile next to a streak or greeting. Never behind text, never recoloured, always with alt text.
- **Never on:** urgent alerts, Need help, risk flags, handovers or confidential items, and never in anything that compares or ranks people. No sad or disappointed poses.
- **Motion:** celebrations are short and silent by default and respect reduced motion; people can turn mascot animation off.
- **Character colours** are illustration-only tokens (`pencil-stripe`, `eraser`, `cream`, `graphite`); its body yellow is `hop-yellow`. Don't use them for UI.

## Accessibility

- Text pairs meet 4.5:1 in both themes; `ink-muted` is the lightest text allowed on `ground` or `card`.
- Touch targets are at least 44px.
- Focus: a 2px `ink` outline with 2px offset on every interactive element.
- Status and capacity always carry a word, never colour alone.

## Components

`Button`, `StatusPill`, `CapacityCell` and `Tile`, under the `HopFlows` namespace. See each one's card for props and rules.
