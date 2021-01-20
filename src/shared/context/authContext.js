import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  expiredTime: null,
  login: () => {},
  logout: () => {},
});
