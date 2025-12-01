"use client";
import React, { createContext, useReducer, useEffect, Dispatch } from 'react';
import type { AuthState, AuthAction } from '../../../types/auth';

const themePreference = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const initialState: AuthState = {
  isLoggedIn: false,
  githubUsername: null,
  theme: themePreference,
};

export const AuthContext = createContext<{ state: AuthState; dispatch: Dispatch<AuthAction>; } | undefined>(undefined);

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN': {
      const user = { ...state, ...action.payload, isLoggedIn: true };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }
    case 'LOGOUT': {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      return { isLoggedIn: false, githubUsername: null, theme: themePreference };
    }
    case 'SET_GITHUB_USERNAME': {
      const user = { ...state, githubUsername: action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }
    case 'SET_THEME': {
      const user = { ...state, theme: action.payload };
      if (typeof window !== 'undefined') {
        if (user.theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    }
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthState;
        if (parsed.theme === 'dark') document.documentElement.classList.add('dark');
        dispatch({ type: 'LOGIN', payload: parsed });
      } catch {}
    }
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
