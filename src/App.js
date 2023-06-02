import React, { createContext, useReducer } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from './routes';
import { initialState, reducer } from './store/reducer';

import './global.css';

export const AuthContext = createContext()

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = createBrowserRouter(routes)

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}
