import { render } from '@testing-library/react';

import Input from './';

describe('<Input />', () => {
  test('renders correctly', () => {
    const { getByTestId, queryByTestId } = render(
      <Input
        ref={undefined}
      />
    );

    expect(getByTestId('input')).toBeInTheDocument()
    expect(queryByTestId('input-label')).not.toBeInTheDocument()
    expect(getByTestId('input-field')).toBeInTheDocument()
  });

  test('renders with a label', () => {
    const { getByTestId, queryByTestId } = render(
      <Input
        ref={undefined}
        label='My Test Input'
      />
    );

    expect(getByTestId('input')).toBeInTheDocument()
    expect(queryByTestId('input-label')).toHaveTextContent('My Test Input')
  });
});
