import { render, screen } from '@testing-library/react';
import App from './App';

// Mock LiquidEther since WebGL is not available in the jsdom test environment
jest.mock('./LiquidEther', () => {
  return function MockLiquidEther() {
    return <div data-testid="liquid-ether-mock" />;
  };
});

test('renders portfolio heading', () => {
  render(<App />);
  const headings = screen.getAllByText(/ASHWIN RAJAN/i);
  expect(headings.length).toBeGreaterThan(0);
  expect(headings[0]).toBeInTheDocument();
});
