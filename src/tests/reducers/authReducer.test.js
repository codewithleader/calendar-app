import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initialState = {
  checking: true,
  isAuthenticated: false,
  // uid: null,
  // name: null,
};

describe('Test in authReducer.js', () => {
  test('should return initial state', () => {
    const action = {};
    const state = authReducer(initialState, action);
    // console.log('Test1:', state);
    expect(state).toEqual(initialState);
  });

  test('should user authenticated', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Elis Antonio',
      },
    };
    const state = authReducer(initialState, action);
    // console.log(state);
    expect(state).toEqual({
      checking: false,
      uid: '123',
      name: 'Elis Antonio',
      isAuthenticated: true,
    });
  });
});
