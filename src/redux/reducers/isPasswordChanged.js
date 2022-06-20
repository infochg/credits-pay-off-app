import { CHANGE_PASSWORD_SUCCESS } from '../actions/actionTypes';

export default function isPasswordChanged(state = false, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return action.payload.status && action.payload.status === 'success';
    default:
      return state;
  }
}
