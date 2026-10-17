# Logos

Punh Checklist, the HopFlows logo and app icon. All vectors are drawn on a 100 × 100 grid.

| File | Use |
|---|---|
| `hopflows-app-icon.svg` | Rounded corners. Web app, documents, slides, anywhere the icon sits on its own |
| `hopflows-app-icon-square.svg` | Square master for phone and store icons; the system adds the corners |
| `hopflows-notification-icon.svg` | White tick in a rounded box on transparent. Android status bar only; it is invisible on light grounds |
| `app-store-1024.png` | 1024 × 1024, no transparency. App Store and as the source for any other raster size |

Never recolour, outline or put the icon on a busy photo without its own tile. Keep at least 12% of the icon's width clear around it.


## Android adaptive icon

| File | Use |
|---|---|
| `hopflows-adaptive-foreground.svg` | Card and Punh Punh on transparent, 108 × 108 grid, art shrunk to 62% so it all sits inside the 66 dp safe circle. Background layer is plain `sky` `#C9DDE8` |
| `hopflows-adaptive-monochrome.svg` | Ticked box for Android 13+ themed icons; the system tints it |

Ready-to-use Android resources (`mipmap-*`, `ic_launcher.xml`) live in the repo at `design/app-icon/android/res/`.
