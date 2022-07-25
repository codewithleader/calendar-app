import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test in <AppRouter />', () => {
  test('should show the SPINNER', () => {
    const initialState = {
      auth: {
        checking: true,
        isAuthenticated: false,
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    // localStorage.removeItem('token');
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.center-spinner').exists()).toBe(true);
  });

  test('should show the PUBLIC ROUTE', () => {
    const initialState = {
      auth: {
        checking: false,
        isAuthenticated: false,
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('should show the PRIVATE ROUTE', () => {
    const initialState = {
      calendar: {
        events: [],
      },
      ui: {
        isModalOpen: false,
      },
      auth: {
        checking: false,
        isAuthenticated: true,
        uid: '62d7152960c767f9901e7659',
        name: 'Elis Antonio',
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
