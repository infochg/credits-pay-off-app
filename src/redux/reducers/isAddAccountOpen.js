import { TOGGLE_ADD_ACCOUNT } from '../actions/actionTypes';

export default function isAddAccountOpen(state = { isOpen: false }, action) {
  switch (action.type) {
    case TOGGLE_ADD_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}
