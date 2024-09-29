import '@testing-library/jest-dom/extend-expect'; // For additional matchers like 'toBeInTheDocument'
import { render,  screen, fireEvent } from '@testing-library/react';
import {  expect,test,describe,  } from 'vitest';
import Challenge from '@/components/challenge-1/Challenge';

describe('Challenge Component', () => {
  test('renders the Challenge component with initial content', () => {
    render(<Challenge />);

    // Check if the paragraph with "Challenge 1" text is present
    const paragraphElement = screen.getByText('Challenge 1');
    expect(paragraphElement).toBeDefined();

    // Check if the span element is present with the correct text
    const spanElement = screen.getByText("I'm a span");
    expect(spanElement).toBeDefined();
    expect(spanElement).toHaveClass('text-purple-600');

    // Check if the button with initial count of 0 is present
    const buttonElement = screen.getByRole('button', { name: /0/i });
   expect(buttonElement).toBeInTheDocument();
  });

  test('increments the count when the button is clicked', () => {
    render(<Challenge />);

    // Get the button element and verify initial count is 0
    const buttonElement = screen.getByRole('button', { name: /0/i });
   expect(buttonElement).toBeInTheDocument();

    // Simulate a button click
    fireEvent.click(buttonElement);

    // After clicking, the count should increment to 1
   expect(buttonElement).toHaveTextContent('1');
  });
});
