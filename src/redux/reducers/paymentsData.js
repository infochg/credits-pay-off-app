import { PAYMENTS_DATA_SUCCESS } from '../actions/actionTypes';

// import paymentsDat from '../../mock/paymentsData.json';

export default function paymentsData(state = null, action) {
  // export default function overviewData(state = paymentsDat.paymentsData, action) {
  switch (action.type) {
    case PAYMENTS_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
