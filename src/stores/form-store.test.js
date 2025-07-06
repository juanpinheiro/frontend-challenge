import { act, renderHook } from '@testing-library/react';
import useSignupStore, {
  useSignupData,
  useSignupSubmission,
  canAccessPersonalInfo,
  canAccessConfirmation,
  canAccessSuccess,
  canAccessError,
} from './form-store';

describe('Form Store', () => {
  beforeEach(() => {
    const { actions } = useSignupStore.getState();
    act(() => {
      actions.resetSignup();
    });
  });

  test('completeSignupInfo should update data and progress', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.completeSignupInfo({
        name: 'John',
        email: 'john@email.com',
        password: '123456',
      });
    });

    const state = useSignupStore.getState();

    expect(state.signupData.name).toBe('John');
    expect(state.signupData.email).toBe('john@email.com');
    expect(state.signupData.password).toBe('123456');
    expect(state.progress.signupInfoCompleted).toBe(true);
  });

  test('completePersonalInfo should update data and progress', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.completePersonalInfo({
        color: 'blue',
        terms: true,
      });
    });

    const state = useSignupStore.getState();

    expect(state.signupData.color).toBe('blue');
    expect(state.signupData.terms).toBe(true);
    expect(state.progress.personalInfoCompleted).toBe(true);
  });

  test('submitSignup should update submission state with success', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.submitSignup(true);
    });

    const state = useSignupStore.getState();

    expect(state.progress.signupSubmitted).toBe(true);
    expect(state.submission.success).toBe(true);
    expect(state.submission.error).toBe(null);
  });

  test('submitSignup should update submission state with error', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.submitSignup(false, 'Erro no servidor');
    });

    const state = useSignupStore.getState();

    expect(state.progress.signupSubmitted).toBe(true);
    expect(state.submission.success).toBe(false);
    expect(state.submission.error).toBe('Erro no servidor');
  });

  test('resetSignup should reset to initial state', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.completeSignupInfo({ name: 'Test' });
      actions.completePersonalInfo({ color: 'red' });
      actions.submitSignup(true);
    });

    act(() => {
      actions.resetSignup();
    });

    const state = useSignupStore.getState();

    expect(state.signupData.name).toBe('');
    expect(state.signupData.color).toBe('');
    expect(state.progress.signupInfoCompleted).toBe(false);
    expect(state.progress.personalInfoCompleted).toBe(false);
    expect(state.progress.signupSubmitted).toBe(false);
    expect(state.submission.success).toBe(false);
    expect(state.submission.error).toBe(null);
  });

  test('useSignupData should return signup data', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.completeSignupInfo({
        name: 'Test',
        email: 'test@test.com',
      });
    });

    const { result } = renderHook(() => useSignupData());

    expect(result.current.name).toBe('Test');
    expect(result.current.email).toBe('test@test.com');
  });

  test('useSignupSubmission should return submission state', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.submitSignup(true);
    });

    const { result } = renderHook(() => useSignupSubmission());

    expect(result.current.success).toBe(true);
    expect(result.current.error).toBe(null);
  });

  test('canAccessPersonalInfo should return true after completing basic info', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.completeSignupInfo({
        name: 'Test',
        email: 'test@test.com',
        password: '123456',
      });
    });

    expect(canAccessPersonalInfo()).toBe(true);
  });

  test('canAccessConfirmation should return true after completing both steps', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.completeSignupInfo({ name: 'Test' });
      actions.completePersonalInfo({ color: 'blue' });
    });

    expect(canAccessConfirmation()).toBe(true);
  });

  test('canAccessSuccess should return true after successful submission', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.submitSignup(true);
    });

    expect(canAccessSuccess()).toBe(true);
  });

  test('canAccessError should return error message after error submission', () => {
    const { actions } = useSignupStore.getState();

    act(() => {
      actions.submitSignup(false, 'Error message');
    });

    expect(canAccessError()).toBe('Error message');
  });
});
