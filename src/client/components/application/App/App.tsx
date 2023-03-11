import type { FC } from 'react';
import { lazy } from 'react';

import { Providers } from '../Providers';
import { Routes } from '../Routes';

const SignInModal = lazy(() => import('../../modal/SignInModal'));
const SignUpModal = lazy(() => import('../../modal/SignUpModal'));
export const App: FC = () => {
  return (
    <Providers>
      <Routes />
      <SignInModal />
      <SignUpModal />
    </Providers>
  );
};
