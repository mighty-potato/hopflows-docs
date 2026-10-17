# Tile

The bento building block: a solid, 28px-radius tile with a small label on top and a big number or line below.

- `tone`: `card` (default), `yellow` (the one hero per screen), `sky` (info), `blush` (people, kudos).
- `hero` sets the value at 88px mono; use it only on the yellow tile.
- `label` is the small caption; `value` is a mono number; `text` a short line; `note` a sentence under the number.
- Put Punh Punh or buttons in `children`. For the mascot in the hero corner, give the tile `position: relative; overflow: hidden` and place the image absolutely at the bottom-right.
- No borders, no shadows, no nested tiles of the same tone.
