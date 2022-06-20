import { REGISTRATION_ERROR } from '../actions/actionTypes';

export default function registrationError(state = null, action) {
  switch (action.type) {
    case REGISTRATION_ERROR:
      return action.payload;
    default:
      return state;
  }
}
