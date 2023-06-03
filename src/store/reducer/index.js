export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false
};

export const reducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN': {
    localStorage.setItem('isLoggedIn', JSON.stringify(action.payload.isLoggedIn))
    return {
      isLoggedIn: action.payload.isLoggedIn
    }
  }
  case 'LOGOUT': {
    localStorage.clear()
    return {
      isLoggedIn: false
    }
  }
  default:
    return state;
  }
};
