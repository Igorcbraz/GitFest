import React, { createContext, useReducer } from 'react'
import { ToastContainer } from 'react-toastify'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { routes } from './routes'
import { initialState, reducer } from './store/reducer'

import './global.css'
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        theme='colored'
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}
