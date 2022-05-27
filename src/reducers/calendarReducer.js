import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Event 1',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Buy some food',
      user: {
        _id: 'ABC123',
        name: 'Elis Antonio',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(e =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(e => (e.id !== state.activeEvent.id)),
        activeEvent: null,
      };
    // case 'DELETE_EVENT':
    //   return {
    //     ...state,
    //     events: state.events.filter(event => event._id !== action.id),
    //   };
    // case 'SET_ACTIVE_EVENT':
    //   return {
    //     ...state,
    //     activeEvent: action.event,
    //   };
    // case 'UPDATE_EVENT':
    //   return {
    //     ...state,
    //     events: state.events.map(event => event._id === action.event._id ? action.event : event),
    //   };
    default:
      return state;
  }
};
