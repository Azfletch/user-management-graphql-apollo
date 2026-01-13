import { render } from '@testing-library/react';

import Close from './';

describe('<Close />', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<Close />);

    expect(getByTestId('close-icon')).toBeInTheDocument()
  });
});
