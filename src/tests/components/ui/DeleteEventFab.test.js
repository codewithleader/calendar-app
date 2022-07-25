import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { startEventDeleted } from '../../../actions/events';
import { startLogout } from '../../../actions/auth';

jest.mock('../../../actions/events', () => ({
  startEventDeleted: jest.fn(),
}));

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe('Test in <DeleteEventFab />', () => {
  test('should show correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('If token exist should call startEventDeleted when click', () => {
    localStorage.setItem('token', '123');
    wrapper.find('button').prop('onClick')();
    expect(startEventDeleted).toHaveBeenCalled();
  });

  test('If token not exist should call startLogout', () => {
    localStorage.removeItem('token');
    wrapper.find('button').prop('onClick')();
    expect(startLogout).toHaveBeenCalled();
  });
});
