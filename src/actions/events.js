import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import { startLogout } from './auth';

export const startAddNewEvent = event => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(startLogout());
      return;
    }
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();

      // console.log(body);

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };

        // console.log(event);

        dispatch(
          eventAddNew(event)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = event => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = event => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventUpdated = event => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
