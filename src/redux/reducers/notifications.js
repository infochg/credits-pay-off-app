import React from 'react';
import { toast } from 'react-toastify';
import Toast from '../../components/Common/Toast';
import {
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
  MESSAGE_INFO
} from '../actions/actionTypes';

export default function notifications(state = {}, action) {
  switch (action.type) {
    case MESSAGE_ERROR:
      toast(<Toast message={action.payload} type="error" />, { type: 'error' });
      return action.payload;
    case MESSAGE_SUCCESS:
      toast(<Toast message={action.payload} type="success" />, {
        type: 'success'
      });
      return action.payload;
    case MESSAGE_INFO:
      toast(<Toast message={action.payload} type="info" />, {
        type: 'info'
      });
      return action.payload;
    default:
      return state;
  }
}
