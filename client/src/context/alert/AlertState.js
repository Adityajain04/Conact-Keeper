import React, { useReducer } from 'react';
import { v4 } from 'uuid';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {

  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = v4();
    dispatch({ type: SET_ALERT, payload: {msg, type, id} });

    setTimeout(() => {
      clearAlert(id)
    }, timeout)
  }

  // Remove Alert
  const clearAlert = (id) => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }

  return (
    <AlertContext.Provider
      value={{
      alerts: state,
      setAlert,
      clearAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
