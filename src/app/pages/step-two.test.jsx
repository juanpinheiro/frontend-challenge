import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import StepTwo from './step-two';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockCompletePersonalInfo = jest.fn();
const mockSignupData = {
  color: '',
  terms: false,
};

jest.mock('@/stores/form-store', () => ({
  useSignupData: () => mockSignupData,
  useSignupActions: () => ({
    completePersonalInfo: mockCompletePersonalInfo,
  }),
}));

jest.mock('@/services/queries', () => ({
  useColors: () => ({
    data: ['red', 'blue', 'green'],
    isPending: false,
    error: null,
  }),
}));

const renderWithRouter = component => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('StepTwo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    renderWithRouter(<StepTwo />);

    const termsCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /next/i });

    // RadixUI Select is hidden, so we need to set the value manually
    const hiddenSelect = screen.getByDisplayValue('Red');
    fireEvent.change(hiddenSelect, { target: { value: 'red' } });

    await user.click(termsCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCompletePersonalInfo).toHaveBeenCalledWith({
        color: 'red',
        terms: true,
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/confirmation');
  });

  test('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<StepTwo />);

    const submitButton = screen.getByRole('button', { name: /next/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Color is required')).toBeInTheDocument();
      expect(
        screen.getByText('You must agree to the terms')
      ).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid color and terms', async () => {
    const user = userEvent.setup();
    renderWithRouter(<StepTwo />);

    const submitButton = screen.getByRole('button', { name: /next/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Color is required')).toBeInTheDocument();
      expect(
        screen.getByText('You must agree to the terms')
      ).toBeInTheDocument();
    });
  });
});
