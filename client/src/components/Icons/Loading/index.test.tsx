import { render } from '@testing-library/react';

import Loading from './';

describe('<Loading />', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('loading-icon')).toBeInTheDocument()
  });
});
