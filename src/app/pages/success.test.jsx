import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Success from './success';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockResetSignup = jest.fn();
jest.mock('@/stores/form-store', () => ({
  useSignupActions: () => ({
    resetSignup: mockResetSignup,
  }),
}));

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Success', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays success message correctly', async () => {
    renderWithRouter(<Success />);

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Thank you for completing the form. You should receive a confirmation email soon.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start over/i })
    ).toBeInTheDocument();
  });

  test('handles restart button click', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Success />);

    const restartButton = screen.getByRole('button', { name: /start over/i });
    await user.click(restartButton);

    await waitFor(() => {
      expect(mockResetSignup).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
