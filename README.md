# Game of Life

React implementaion of John Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## RULES

- Any `live` cell with `fewer than 2` live neighbours `dies`, as if caused by underpopulation.
- Any `live` cell with `2 or 3` live neighbours `lives` on to the next generation.
- Any `live` cell with `more than 3` live neighbours `dies`, as if by overpopulation.
- Any `dead` cell with `exactly 3` live neighbours `becomes a live` cell, as if by reproduction.

## DEV

Run app in development mode (http://localhost:3000):

```
$ npm start
```

Launch test runner in the interactive watch mode:

```
$ npm test
```

Build app for production to the `build` folder.

```
$ npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

Your app is ready to be deployed!
