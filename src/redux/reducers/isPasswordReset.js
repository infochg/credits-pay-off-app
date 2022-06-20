import { RESET_PASSWORD_SUCCESS } from '../actions/actionTypes';

export default function isPasswordReset(state = false, action) {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return action.payload.status && action.payload.status === 'success';
    default:
      return state;
  }
}
