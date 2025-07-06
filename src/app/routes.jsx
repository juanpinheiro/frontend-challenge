import { createBrowserRouter, redirect } from 'react-router-dom';
import Wrapper from '@/components/layout/wrapper';
import StepOne from './pages/step-one';
import StepTwo from './pages/step-two';
import Confirmation from './pages/confirmation';
import Success from './pages/success';
import Error from './pages/error';
import NotFound from './pages/not-found';
import {
  canAccessPersonalInfo,
  canAccessConfirmation,
  canAccessSuccess,
  canAccessError,
} from '@/stores/form-store';

const step2Loader = () => {
  if (!canAccessPersonalInfo()) {
    throw redirect('/');
  }
  return null;
};

const confirmationLoader = () => {
  if (!canAccessConfirmation()) {
    throw redirect('/');
  }
  return null;
};

const successLoader = () => {
  if (!canAccessSuccess()) {
    throw redirect('/');
  }
  return null;
};

const errorLoader = () => {
  if (!canAccessError()) {
    throw redirect('/');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <StepOne />,
      },
      {
        path: 'more-info',
        element: <StepTwo />,
        loader: step2Loader,
      },
      {
        path: 'confirmation',
        element: <Confirmation />,
        loader: confirmationLoader,
      },
      {
        path: 'success',
        element: <Success />,
        loader: successLoader,
      },
      {
        path: 'error',
        element: <Error />,
        loader: errorLoader,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
