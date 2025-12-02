const themePreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
export const initialState = JSON.parse(localStorage.getItem('user')) || {
  isLoggedIn: false,
  githubUsername: null,
  theme: themePreference
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const user = {
        ...state,
        ...action.payload,
        isLoggedIn: true
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
        theme: themePreference
      }
    }
    case 'SET_GITHUB_USERNAME': {
      const user = {
        ...state,
        githubUsername: action.payload
      }

      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    case 'SET_THEME': {
      const user = {
        ...state,
        theme: action.payload
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
