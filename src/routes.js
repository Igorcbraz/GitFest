import { Landing } from './pages/Landing'
import { Home } from './pages/Home'

export const routes = [
  {
    path: '/',
    element: <Landing/>
  },
  {
    path: '/home',
    element: <Home/>
  }
]
