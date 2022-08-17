import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
  startEventUpdated,
  eventClearActiveEvent,
  startAddNewEvent,
} from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../../actions/events', () => ({
  startEventUpdated: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  startAddNewEvent: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Event 1',
      notes: 'Event 1 notes',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'Elis Antonio',
  },
  ui: {
    isModalOpen: true,
  },
};

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Testing in <CalendarModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show the Modal', () => {
    // expect(wrapper.find('.modal').exists()).toBe(true);

    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should call the update and close Modal actions', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    expect(startEventUpdated).toHaveBeenCalled();
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should show an error if the title is missing', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    // expect(startEventUpdated).toHaveBeenCalled();
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });

  test('should create a new event', () => {
    const initialState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: '123',
        name: 'Elis Antonio',
      },
      ui: {
        isModalOpen: true,
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Event title 1',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(startAddNewEvent).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Event title 1',
      notes: '',
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('Should validate the date', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Event title 1',
      },
    });

    const today = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'The end date must be greater than the start date.',
      'error'
    );
  });
});
