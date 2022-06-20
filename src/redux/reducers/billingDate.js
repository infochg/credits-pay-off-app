import { BILLING_DATE_SUCCESS } from '../actions/actionTypes';

export default function billingDate(state = null, action) {
  switch (action.type) {
    case BILLING_DATE_SUCCESS:
      return action.payload.message;
    default:
      return state;
  }
}
