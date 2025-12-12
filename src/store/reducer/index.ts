export type Theme = 'dark' | 'light';

export interface State {
	isLoggedIn: boolean;
	githubUsername: string | null;
	theme: Theme;
}

export type Action =
	| { type: 'LOGIN'; payload: Partial<State> }
	| { type: 'LOGOUT' }
	| { type: 'SET_GITHUB_USERNAME'; payload: string }
	| { type: 'SET_THEME'; payload: Theme };

const themePreference: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const initialState: State = JSON.parse(localStorage.getItem('user') || 'null') || {
  isLoggedIn: false,
  githubUsername: null,
  theme: themePreference,
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN': {
      const user = {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      }
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    case 'LOGOUT': {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        githubUsername: null,
        theme: themePreference,
      }
    }
    case 'SET_GITHUB_USERNAME': {
      const user = {
        ...state,
        githubUsername: action.payload,
      }
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    case 'SET_THEME': {
      const user = {
        ...state,
        theme: action.payload,
      }
      if (user.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    default:
      return state
  }
}
