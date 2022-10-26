# Game of Life

[![GitHub release](https://img.shields.io/github/release/aleksbelic/game-of-life.svg?style=flat-square)](https://GitHub.com/aleksbelic/game-of-life/releases/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub license](https://img.shields.io/github/license/aleksbelic/game-of-life?style=flat-square)](https://raw.githubusercontent.com/aleksbelic/game-of-life/main/LICENSE.md)

React implementaion of John Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

![game-of-life-demo](https://user-images.githubusercontent.com/8314231/198154148-07d47dbd-f95c-46c3-8cd5-f83a104f8f9e.gif)

## RULES

- Any `live` cell with `fewer than 2` live neighbours `dies`, as if caused by underpopulation.
- Any `live` cell with `2 or 3` live neighbours `lives` on to the next generation.
- Any `live` cell with `more than 3` live neighbours `dies`, as if by overpopulation.
- Any `dead` cell with `exactly 3` live neighbours `becomes a live` cell, as if by reproduction.

## DEV

- Run app in development mode (http://localhost:3000):

  ```
  npm start
  ```

- Launch test runner in the interactive watch mode:

  ```
  npm test
  ```

- Build app for production to the `build` folder:

  ```
  npm run build
  ```
