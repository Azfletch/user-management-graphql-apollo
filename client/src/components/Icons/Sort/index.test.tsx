import { render } from '@testing-library/react';

import Sort from './';

describe('<Sort />', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<Sort />);

    expect(getByTestId('sort-icon')).toBeInTheDocument()
  });
});
