import {render, screen} from '@testing-library/react';
import GameOfLife from './components/GameOfLife';

test('renders generation count label', () => {
  render(<GameOfLife />);
  const generationCountElem = screen.getByText(/Generation/i);
  expect(generationCountElem).toBeInTheDocument();
});
