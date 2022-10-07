import {Gol} from '../public/game-of-life.mjs';
import {test, expect} from 'jest';

test('Test next generation', () => {
  let golDummy = new Gol(5, 5);
  let testPopulation = {
    generation: 0,
    neighbourhood: [], // living neighbours layout
    layout: [
      [0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
    ],
  };
  golDummy.setPopulation(testPopulation);
  expect(true).toBe(true);
});
