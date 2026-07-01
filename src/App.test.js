import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio home page', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /ferdavs majitov/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /activity/i })).toBeInTheDocument();
  expect(screen.getByText(/open-source contributions/i)).toBeInTheDocument();
});
