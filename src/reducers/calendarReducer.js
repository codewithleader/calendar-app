import { types } from '../types/types';

/** Event's reference */
// {
//   id: '62d6be91fca269189573fd63',
//   title: 'Event Title',
//   start: '2019-01-01T00:00:00.000Z',
//   end: '2019-02-01T00:00:00.000Z',
//   bgcolor: '#fafafa',
//   notes: 'Buy some food',
//   user: {
//     _id: 'ABC123',
//     name: 'Elis Antonio',
//   },
// }

const initialState = {
  events: [],
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
        events: state.events.map(e => (e.id === action.payload.id ? action.payload : e)),
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(e => e.id !== state.activeEvent.id),
        activeEvent: null,
      };
    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
        activeEvent: null,
      };
    case types.eventLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
