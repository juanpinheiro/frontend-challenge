import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import StepOne from './step-one';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockCompleteSignupInfo = jest.fn();
const mockSignupData = {
  name: '',
  email: '',
  password: '',
};

jest.mock('@/stores/form-store', () => ({
  useSignupData: () => mockSignupData,
  useSignupActions: () => ({
    completeSignupInfo: mockCompleteSignupInfo,
  }),
}));

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('StepOne', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    renderWithRouter(<StepOne />);

    const nameInput = screen.getByLabelText(/first name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /next/i });

    await user.type(nameInput, 'Test');
    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, '123456');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCompleteSignupInfo).toHaveBeenCalledWith({
        name: 'Test',
        email: 'test@test.com',
        password: '123456',
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/more-info');
  });

  test('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<StepOne />);

    const submitButton = screen.getByRole('button', { name: /next/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(
        screen.getByText('Password must be at least 6 characters')
      ).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid email and password', async () => {
    const user = userEvent.setup();
    renderWithRouter(<StepOne />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'not-an-email');
    await user.type(passwordInput, '123');

    const submitButton = screen.getByRole('button', { name: /next/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Password must be at least 6 characters')
      ).toBeInTheDocument();
    });
  });
});
