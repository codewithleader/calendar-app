import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startEventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const token = localStorage.getItem('token');
    if (token) {
    dispatch(startEventDeleted());
    } else {
      dispatch(startLogout());
    }
  };
  return (
    <button className='btn btn-danger fab-danger' onClick={handleDelete}>
      <i className='fas fa-trash'></i>
      <span> Delete event </span>
    </button>
  );
};
