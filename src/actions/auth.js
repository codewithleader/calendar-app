import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  // Thunk middleware: The "dispatch" argument is the function that is provided by Redux Thunk.
  return async dispatch => {
    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.message, 'error');
    }
  };
};

const login = user => ({
  type: types.authLogin,
  payload: user,
});

export const startRegister = (name, email, password) => {
  return async dispatch => {
    const resp = await fetchWithoutToken('auth/new', { name, email, password }, 'POST');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.message, 'error');
    }
  };
};

export const startChecking = () => {
  return async dispatch => {
    const resp = await fetchWithToken('auth/renew');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return async dispatch => {
    // Remove token from localStorage with localStorage.clear() OR  more specifically with localStorage.removeItem('propertyName') like this:
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('token-init-date');
    dispatch(logout());
  };
}

const logout = () => ({
  type: types.authLogout,
})