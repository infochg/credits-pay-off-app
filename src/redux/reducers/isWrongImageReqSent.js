import { WRONG_IMAGE_SUCCESS } from '../actions/actionTypes';

export default function isWrongImageReqSent(state = false, action) {
  switch (action.type) {
    case WRONG_IMAGE_SUCCESS:
      return !!action.payload;
    default:
      return state;
  }
}
