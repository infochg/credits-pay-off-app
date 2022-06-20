import {
  ADD_EMPATHIZE_SUBSCRIPTION_SUCCESS,
  RESET_EMPATHIZE_SUBSCRIPTION_SUCCESS
} from '../actions/actionTypes';

export default function isUserSubscribed(state = false, action) {
  switch (action.type) {
    case ADD_EMPATHIZE_SUBSCRIPTION_SUCCESS:
      return true;
    case RESET_EMPATHIZE_SUBSCRIPTION_SUCCESS:
      return true;
    default:
      return state;
  }
}
