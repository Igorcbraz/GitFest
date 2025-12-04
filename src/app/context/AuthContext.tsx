'use client'
import React, { createContext, useReducer, useEffect, Dispatch } from 'react'
import type { AuthState, AuthAction } from '../../../types/auth'

const themePreference = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const initialState: AuthState = {
  isLoggedIn: false,
  githubUsername: null,
  theme: themePreference,
  isLoading: true,
}

export const AuthContext = createContext<{ state: AuthState; dispatch: Dispatch<AuthAction>; } | undefined>(undefined)

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN': {
      const user = { ...state, ...action.payload, isLoggedIn: true }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    }
    case 'LOGOUT': {
      if (typeof window !== 'undefined') {
        localStorage.clear()
      }
      return { isLoggedIn: false, githubUsername: null, theme: themePreference, isLoading: false }
    }
    case 'SET_GITHUB_USERNAME': {
      const user = { ...state, githubUsername: action.payload }
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    }
    case 'SET_THEME': {
      const user = { ...state, theme: action.payload }
      if (typeof window !== 'undefined') {
        if (user.theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    }
    case 'INIT_COMPLETE': {
      return { ...state, isLoading: false }
    }
    default:
      return state
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthState
        if (parsed.theme === 'dark') document.documentElement.classList.add('dark')
        dispatch({ type: 'LOGIN', payload: parsed })
      } catch {}
    }
    dispatch({ type: 'INIT_COMPLETE' })
  }, [])

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
