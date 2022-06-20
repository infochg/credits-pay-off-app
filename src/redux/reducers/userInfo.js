import {
  USER_INFO_SUCCESS,
  UPDATE_USER_INFO_SUCCESS
} from '../actions/actionTypes';

// import userDat from '../../mock/userData.json';

export default function userInfo(state = {}, action) {
  // export default function userData(state = userDat, action) {
  switch (action.type) {
    case USER_INFO_SUCCESS:
      return action.payload;
    case UPDATE_USER_INFO_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
