import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventUpdated, startAddNewEvent } from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hour');
const nowPlus1 = now.clone().add(30, 'minutes');

const initEvent = {
  end: nowPlus1.toDate(),
  notes: '',
  start: now.toDate(),
  title: '',
};

export const CalendarModal = () => {
  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);
  const { end, notes, start, title } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    // console.log('closing modal...');
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = e => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };
  const handleEndDateChange = e => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'The end date must be greater than the start date.', 'error');
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(startAddNewEvent(formValues));
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-background'
    >
      <h1>{activeEvent ? 'Editing Event' : 'New Event'}</h1>
      <hr />
      <form className='container' onSubmit={handleSubmitForm}>
        <div className='form-group'>
          <label>Start date and time</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>End date and time</label>
          <DateTimePicker
            className='form-control'
            minDate={dateStart}
            onChange={handleEndDateChange}
            value={dateEnd}
          />
        </div>
        <hr />
        <div className='form-group'>
          <label>Title and notes</label>
          <input
            autoComplete='off'
            className={`form-control${!titleValid ? ' is-invalid' : ''}`}
            name='title'
            onChange={handleInputChange}
            placeholder="Event's Title"
            type='text'
            value={title}
          />
          <small id='emailHelp' className='form-text text-muted'>
            A short description
          </small>
        </div>

        <div className='form-group'>
          <textarea
            className='form-control'
            name='notes'
            onChange={handleInputChange}
            placeholder='Notes'
            rows='5'
            type='text'
            value={notes}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Additional information
          </small>
        </div>

        <div className='d-flex'>
          <button
            onClick={closeModal}
            type='button'
            className='btn btn-outline-danger flex-fill mr-1'
          >
            <i className='far fa-window-close'></i>
            <span> Cancel</span>
          </button>
          <button type='submit' className='btn btn-outline-primary flex-fill'>
            <i className='far fa-save'></i>
            <span> Save</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
