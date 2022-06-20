import { NOTIFICATIONS_DATA_SUCCESS } from '../actions/actionTypes';

export default function notificationsData(state = null, action) {
  switch (action.type) {
    case NOTIFICATIONS_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
