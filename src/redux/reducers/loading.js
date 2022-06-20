import { LOADING } from '../actions/actionTypes';

export default function loading(state = false, action) {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return state;
  }
}
