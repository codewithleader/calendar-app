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
      // TODO: Delete the Swal.fire() line and add a redirect to the login page.
      Swal.fire('Error', body.message, 'error');
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

// TODO: What is this?
// const register = user => ({
//   type: types.authStartRegister,
//   payload: user,
// });
