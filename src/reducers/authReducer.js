import { types } from '../types/types';

const initialState = {
  checking: true,
  isAuthenticated: false,
  // uid: null,
  // name: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
        isAuthenticated: true,
      };
    case types.authCheckingFinish:
      return {
        checking: false,
        isAuthenticated: false,
      };
    case types.authLogout:
      return {
        checking: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
