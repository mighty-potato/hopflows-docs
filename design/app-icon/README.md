# HopFlows app icon: Punh Checklist

A large Punh Punh, tilted 12° to the right and leaning in front of a checklist card on a soft sky tile: two items ticked, one still open. Version 2 (16 October 2026) made Punh Punh about 40% bigger so the face reads on a home screen; version 1 is in `design/archives/app-icon-v1/`. Usage rules live in the product blueprint (§11 App icon).

## Files

| File | Size | Use |
|----|----|----|
| `hopflows-app-icon.svg` | vector, rounded corners | Web app, documents, slides |
| `hopflows-app-icon-square.svg` | vector, square | Master for phone and store icons; the system adds the corners |
| `hopflows-notification-icon.svg` | vector, white on transparent | Android status-bar icon |
| `png/app-store-1024.png` | 1024 × 1024, no transparency | App Store |
| `png/play-store-512.png` | 512 × 512, no transparency | Google Play |
| `png/apple-touch-icon-180.png` | 180 × 180, no transparency | iOS home screen for the web app |
| `png/icon-512.png`, `png/icon-192.png` | rounded, transparent corners | Web app manifest, install icon |
| `png/icon-48.png`, `png/icon-32.png`, `png/icon-16.png` | rounded, transparent corners | Favicons |
| `png/notification-icon-96.png` | 96 × 96, white on transparent | Android notification icon (xxxhdpi) |

## Android adaptive icon

Android 8+ launchers cut the icon into a circle, squircle or rounded square, and only the centre 66 of 108 dp is guaranteed to show. The Android icon is therefore built in layers, with the same art shrunk to 62% so all of it, Punh Punh's eraser included, sits inside that safe circle.

| File | Use |
|----|----|
| `android/hopflows-adaptive-foreground.svg` | Card and Punh Punh on transparent, 108 × 108 grid. Import into Android Studio as a vector if preferred |
| `android/hopflows-adaptive-background.svg` | Plain sky `#C9DDE8` layer |
| `android/hopflows-adaptive-monochrome.svg` | Ticked box for Android 13+ themed icons (single colour; the system tints it) |
| `android/res/` | Drop-in resources: copy into the app's `app/src/main/res/` |

`android/res/` holds `mipmap-anydpi-v26/ic_launcher.xml` and `ic_launcher_round.xml` (the adaptive icon), `values/ic_launcher_background.xml` (the sky colour), and for each density (mdpi to xxxhdpi) `ic_launcher_foreground.png`, `ic_launcher_monochrome.png`, plus legacy `ic_launcher.png` and `ic_launcher_round.png` for Android 7 and older.

## Colours

| Part | Colour |
|----|----|
| Tile (sky) | `#C9DDE8` |
| Checklist card | `#FFFFFF` |
| Ticked boxes, open box, next item | `#1C1B1F` |
| Ticks | `#F7C83A` |
| Finished items | `#E7E5DF` |
| Punh Punh | See `design/mascot/README.md` |

The SVGs are drawn on a 100 × 100 grid. Other logo options are in `design/archives/logo-options/`.
