import { CANCEL_EMPATHIZE_SUBSCRIPTION_SUCCESS } from '../actions/actionTypes';

export default function isUserUnsubscribed(state = false, action) {
  switch (action.type) {
    case CANCEL_EMPATHIZE_SUBSCRIPTION_SUCCESS:
      return true;
    default:
      return state;
  }
}
