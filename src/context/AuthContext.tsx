'use client'
import React, { createContext, useReducer, useEffect, Dispatch } from 'react'
import type { AuthState, AuthAction } from '../../types/auth'

const initialState: AuthState = {
  isLoggedIn: false,
  githubUsername: null,
  theme: 'light',
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
      return { isLoggedIn: false, githubUsername: null, theme: 'light', isLoading: false }
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
        dispatch({ type: 'LOGIN', payload: parsed })
      } catch {}
    }
    dispatch({ type: 'INIT_COMPLETE' })
  }, [])

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
