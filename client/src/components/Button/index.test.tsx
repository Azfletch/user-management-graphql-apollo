import { fireEvent, render, waitFor } from '@testing-library/react';

import Button from './';

describe('<Button />', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<Button>Test Button</Button>);

    expect(getByTestId('button')).toBeInTheDocument()
  });

  test('renders Text', () => {
    const { getByTestId } = render(<Button>Test Button</Button>);

    expect(getByTestId('button')).toHaveTextContent('Test Button')
  });

  test('handles an onClick prop', async () => {
    const onClick = vi.fn()
    const { getByTestId } = render(<Button onClick={onClick} >Test Button</Button>);

    fireEvent.click(getByTestId('button'))

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledOnce()
    })
  });
});
