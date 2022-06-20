import { VERIFY_RESET_CODE_SUCCESS } from '../actions/actionTypes';

export default function isResetCodeVerified(state = null, action) {
  switch (action.type) {
    case VERIFY_RESET_CODE_SUCCESS:
      return action.payload.message && action.payload.message.token
        ? action.payload.message.token
        : null;
    default:
      return state;
  }
}
