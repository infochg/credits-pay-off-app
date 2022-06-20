import { FORGOT_PASSWORD_SUCCESS } from '../actions/actionTypes';

export default function isContactSent(state = false, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return action.payload.status && action.payload.status === 'success';
    default:
      return state;
  }
}
