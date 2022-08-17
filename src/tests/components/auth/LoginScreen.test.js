import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

console.log(process.env);

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Test in <LoginScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call startLogin', () => {
    // Simulate a change in the input Email
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'elisperezmusic@test.com',
      },
    });
    // Simulate a change in the input Password
    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456',
      },
    });
    // Simulate onSubmit at the first form found
    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() {},
    }); // exist 2 forms, the first is the login form. With "at(0)" we select the first form.

    // Check if the startLogin action was called
    expect(startLogin).toHaveBeenCalledWith('elisperezmusic@test.com', '123456');
  });

  test('If the password are different, should not do register', () => {
    // Simulate a change in the input rPassword1
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });
    // Simulate a change in the input rPassword2
    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: 'DifferentPassword',
      },
    });
    // Simulate onSubmit at the second form found
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    }); // exist 2 forms, the second is the register form. With "at(1)" we select the second form.

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'The passwords do not match', 'error');
  });

  test('should do Register', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });

    expect(Swal.fire).not.toHaveBeenCalled();

    expect(startRegister).toHaveBeenCalledWith('', '', '123456'); // The first argument is the email, the second is the name, the third is the password, but we don't need email and name.
  });
});
