import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, isAuthenticated } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      /* A spinner that is displayed while the app is checking if the user is authenticated. */
      <div className='center-spinner'>
        <div className='sk-chase'>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
          <div className='sk-chase-dot'></div>
        </div>
      </div>
    );
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path='/login'
            component={LoginScreen}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path='/'
            component={CalendarScreen}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};
