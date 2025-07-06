import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Error from './error';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockResetSignup = jest.fn();
const mockSubmissionData = {
  error: 'Network error occurred',
};

jest.mock('@/stores/form-store', () => ({
  useSignupActions: () => ({
    resetSignup: mockResetSignup,
  }),
  useSignupSubmission: () => mockSubmissionData,
}));

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays error message correctly', async () => {
    renderWithRouter(<Error />);

    expect(screen.getByText('Submission Error')).toBeInTheDocument();
    expect(
      screen.getByText('Uh, oh! Something went wrong.')
    ).toBeInTheDocument();
    expect(screen.getByText('Network error occurred')).toBeInTheDocument();
  });

  test('handles start over button correctly', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Error />);

    const startOverButton = screen.getByRole('button', { name: /start over/i });
    await user.click(startOverButton);

    await waitFor(() => {
      expect(mockResetSignup).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('handles try again button correctly', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Error />);

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    await user.click(tryAgainButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/confirmation');
    });
  });
});
