import { render } from '@testing-library/react';

import Alert from './';

describe('<Alert />', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<Alert />);

    expect(getByTestId('alert-icon')).toBeInTheDocument()
  });
});
