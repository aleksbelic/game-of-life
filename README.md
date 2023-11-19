# Game of Life

[![GitHub release](https://img.shields.io/github/release/aleksbelic/game-of-life.svg?style=flat-square)](https://GitHub.com/aleksbelic/game-of-life/releases/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub license](https://img.shields.io/github/license/aleksbelic/game-of-life?style=flat-square)](https://raw.githubusercontent.com/aleksbelic/game-of-life/main/LICENSE.md)

React implementation of John Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

![game-of-life-demo](https://user-images.githubusercontent.com/8314231/198154148-07d47dbd-f95c-46c3-8cd5-f83a104f8f9e.gif)

## RULES

- Any `live` cell with `fewer than 2` live neighbors `dies`, as if caused by under-population.
- Any `live` cell with `2 or 3` live neighbors `lives` on to the next generation.
- Any `live` cell with `more than 3` live neighbors `dies`, as if by overpopulation.
- Any `dead` cell with `exactly 3` live neighbors `becomes a live` cell, as if by reproduction.

## DEV

- Run app in development mode (http://localhost:5173):

  ```
  npm run dev
  ```

- Build app for production and output it to the `/dist` folder:

  ```
  npm run build
  ```

- Start local web server that serves the built solution from `/dist` folder for previewing:

  ```
  npm run preview
  ```
