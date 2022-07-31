# Game of Life

Browser implementaion of John Conway's [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

![screenshot](https://user-images.githubusercontent.com/8314231/36358375-d0f04902-150d-11e8-95fe-18bed40e14ed.png)

# Rules

- Any live cell with fewer than 2 live neighbours dies, as if caused by underpopulation.
- Any live cell with 2 or 3 live neighbours lives on to the next generation.
- Any live cell with more than 3 live neighbours dies, as if by overpopulation.
- Any dead cell with exactly 3 live neighbours becomes a live cell, as if by reproduction.

# Development

Install dependencies:

```
$ npm install
```

Run DEV Server:

```
$ npx http-server --cors --port 8889
```

Test your local changes at `http://localhost:8889`.
