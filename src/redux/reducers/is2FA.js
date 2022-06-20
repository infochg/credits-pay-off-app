import { SHOW_2FA } from '../actions/actionTypes';

export default function is2FA(state = false, action) {
  switch (action.type) {
    case SHOW_2FA:
      return action.payload;
    default:
      return state;
  }
}
