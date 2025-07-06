import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Confirmation from './confirmation';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockSubmitSignup = jest.fn();
const mockSignupData = {
  name: 'Test User',
  email: 'test@test.com',
  password: '123456',
  color: 'red',
  terms: true,
};

jest.mock('@/stores/form-store', () => ({
  useSignupData: () => mockSignupData,
  useSignupActions: () => ({
    submitSignup: mockSubmitSignup,
  }),
}));

const mockSubmitMutation = jest.fn();
jest.mock('@/services/queries', () => ({
  useSubmitForm: () => ({
    mutateAsync: mockSubmitMutation,
    isError: false,
    error: null,
    isPending: false,
  }),
}));

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Confirmation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays user information correctly', async () => {
    renderWithRouter(<Confirmation />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('submits form with valid data and navigates to success page', async () => {
    const user = userEvent.setup();
    mockSubmitMutation.mockResolvedValue();

    renderWithRouter(<Confirmation />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitMutation).toHaveBeenCalledWith(mockSignupData);
      expect(mockSubmitSignup).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith('/success');
    });
  });

  test('submits form with invalid data and navigates to error page on submission failure', async () => {
    const user = userEvent.setup();
    const mockError = new Error('Submission failed');
    mockSubmitMutation.mockRejectedValue(mockError);

    renderWithRouter(<Confirmation />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitSignup).toHaveBeenCalledWith(false, 'Submission failed');
      expect(mockNavigate).toHaveBeenCalledWith('/error');
    });
  });
});
