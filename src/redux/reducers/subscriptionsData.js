import { SUBSCRIPTIONS_DATA_SUCCESS } from '../actions/actionTypes';

export default function subscriptionsData(state = null, action) {
  switch (action.type) {
    case SUBSCRIPTIONS_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
