import { render, fireEvent, waitFor } from '@testing-library/react';
import Header from './';

describe('Header Component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<Header setShowAddUserModal={vi.fn()}/>);

    expect(getByTestId('app-header')).toBeInTheDocument()
    expect(getByTestId('app-header-text')).toHaveTextContent('Users')
    expect(getByTestId('app-header-button')).toHaveTextContent('Add User')
  });

  test('Brings up the add user modal when button is clicked', async () => {
    const setShowAddUserModal = vi.fn()
    const { getByTestId } = render(<Header setShowAddUserModal={setShowAddUserModal} />);

    fireEvent.click(getByTestId('app-header-button'))

    await waitFor(() => {
      expect(setShowAddUserModal).toHaveBeenCalledOnce()
    })
  });
});