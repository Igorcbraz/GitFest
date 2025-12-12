'use client'
import { ToastContainer } from 'react-toastify'

export function ToastProvider() {
  return (
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
  )
}
