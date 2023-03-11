import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { AuthUserFragmentResponse } from '../../../graphql/fragments';
import { useAuthUser } from '../../../hooks/useAuthUser';

export const useAuthUserContext = () => {
  return useContext(AuthContext);
};

const AuthContext = createContext({
  authUser: null as AuthUserFragmentResponse | null | undefined,
  authUserLoading: true,
  isAuthUser: false,
});

type Props = {
  children: ReactNode;
};
const AuthProvider: FC<Props> = ({ children }) => {
  const { authUser, authUserLoading, isAuthUser } = useAuthUser();
  const value = {
    authUser,
    authUserLoading,
    isAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
