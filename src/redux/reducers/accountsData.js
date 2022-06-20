import { ACCOUNTS_DATA_SUCCESS } from '../actions/actionTypes';

export default function accountsData(state = null, action) {
  switch (action.type) {
    case ACCOUNTS_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
