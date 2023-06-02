export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  user: JSON.parse(localStorage.getItem('user')) || null
};

export const reducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN': {
    localStorage.setItem('isLoggedIn', JSON.stringify(action.payload.isLoggedIn))
    localStorage.setItem('user', JSON.stringify(action.payload.user))
    return {
      isLoggedIn: action.payload.isLoggedIn,
      user: action.payload.user
    };
  }
  case 'LOGOUT': {
    localStorage.clear()
    return {
      isLoggedIn: false,
      user: null
    };
  }
  default:
    return state;
  }
};
