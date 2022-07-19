import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
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

        dispatch(eventAddNew(event));
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

export const startEventUpdated = event => {
  return async dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(startLogout());
      return;
    }
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const eventUpdated = event => ({
  type: types.eventUpdated,
  payload: event,
});

export const startEventDeleted = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(startLogout());
      return;
    }
    const { id } = getState().calendar.activeEvent;
    try {
      const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const eventDeleted = () => ({
  type: types.eventDeleted,
});

/**
 * It fetches events from the server, then dispatches an action to update the state with the events.
 * @returns An object with a property of type and a property of payload.
 */
export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events');
      const body = await resp.json();
      // console.log(body);
      const events = prepareEvents(body.events);
      // console.log(events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = events => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
})