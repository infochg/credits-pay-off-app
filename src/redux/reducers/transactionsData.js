import { TRANSACTIONS_DATA_SUCCESS } from '../actions/actionTypes';

// import transactionsDat from '../../mock/transactionsData.json';

export default function transactionsData(state = null, action) {
  // export default function transactionsData(state = transactionsDat, action) {
  switch (action.type) {
    case TRANSACTIONS_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
