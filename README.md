# Minesweeper but in other way
Play on [HERE](https://amedrygal.pl/minesweeper-2/)

## Rules

### Standard
Big number represents distance to the nearest mine and small represents amounts of the mines in that distance.
Distance is a square builded around the tile, so for example if on tile is number 1, the mine is in it's direct neighborhood in any direction.

### Alternative
Big number represents space around the tile which is clear from mines, small means the same as in standard (quantity of mines outside the clear square), but if big number is **0** the quantity of mines is not shown.

## Contribution
Form and clone the repository and install the dependencies
```
npm i
```

To run develop server execute
```
npm run serve
```

To build SASS and Babel JS
```
npm run build
```

To watch files
```
npm run watch
```