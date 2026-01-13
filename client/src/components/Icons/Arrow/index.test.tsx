import { render } from '@testing-library/react';

import Arrow from './';

describe('<Arrow />', () => {
  test('renders pointing up', () => {
    const { getByTestId } = render(<Arrow direction='up' />);

    expect(getByTestId('arrow-icon-up')).toBeInTheDocument()
  });

  test('renders pointing down', () => {
    const { getByTestId } = render(<Arrow direction='down' />);

    expect(getByTestId('arrow-icon-down')).toBeInTheDocument()
  });
});