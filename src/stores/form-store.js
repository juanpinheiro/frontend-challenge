import { create } from 'zustand';

const SIGNUP_ACTIONS = {
  COMPLETE_SIGNUP_INFO: 'completeSignupInfo',
  COMPLETE_PERSONAL_INFO: 'completePersonalInfo',
  SUBMIT_SIGNUP: 'submitSignup',
  RESET_SIGNUP: 'resetSignup',
};

const initialState = {
  signupData: {
    name: '',
    email: '',
    password: '',
    color: '',
    terms: false,
  },
  progress: {
    signupInfoCompleted: false,
    personalInfoCompleted: false,
    signupSubmitted: false,
  },
  submission: {
    success: false,
    error: null,
  },
};

/**
 * Store definition
 */
const useSignupStore = create(set => ({
  ...initialState,
  actions: {
    completeSignupInfo: userData => {
      set(
        state => ({
          signupData: { ...state.signupData, ...userData },
          progress: { ...state.progress, signupInfoCompleted: true },
        }),
        false,
        SIGNUP_ACTIONS.COMPLETE_SIGNUP_INFO
      );
    },
    completePersonalInfo: userData => {
      set(
        state => ({
          signupData: { ...state.signupData, ...userData },
          progress: { ...state.progress, personalInfoCompleted: true },
        }),
        false,
        SIGNUP_ACTIONS.COMPLETE_PERSONAL_INFO
      );
    },
    submitSignup: (success, error = null) => {
      set(
        state => ({
          progress: { ...state.progress, signupSubmitted: true },
          submission: { success, error },
        }),
        false,
        SIGNUP_ACTIONS.SUBMIT_SIGNUP
      );
    },
    resetSignup: () => {
      set(initialState, false, SIGNUP_ACTIONS.RESET_SIGNUP);
    },
  },
}));

/**
 * Selectors
 */
export const useSignupData = () => useSignupStore(state => state.signupData);
export const useSignupActions = () => useSignupStore(state => state.actions);
export const useSignupSubmission = () =>
  useSignupStore(state => state.submission);

/**
 * Protected navigation functions
 */
const getSignupState = () => useSignupStore.getState();

export const canAccessPersonalInfo = () =>
  getSignupState().progress.signupInfoCompleted;

export const canAccessConfirmation = () => {
  const { progress } = getSignupState();
  return progress.signupInfoCompleted && progress.personalInfoCompleted;
};

export const canAccessSuccess = () => {
  const { progress, submission } = getSignupState();
  return progress.signupSubmitted && submission.success;
};

export const canAccessError = () => {
  const { progress, submission } = getSignupState();
  return progress.signupSubmitted && submission.error;
};

export default useSignupStore;
