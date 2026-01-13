import { render } from '@testing-library/react';
import Button from './';

describe('Button Component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<Button>Test Button</Button>);
    expect(getByTestId('button')).toBeInTheDocument()
  });

  test('renders Text', () => {
    const { getByTestId } = render(<Button>Test Button</Button>);
    expect(getByTestId('button')).toHaveTextContent('Test Button')
  });
});