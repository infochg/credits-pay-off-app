import { ADD_WALKTHROUGHT_ITEM } from '../actions/actionTypes';

export default function walkthrough(state = [], action) {
  switch (action.type) {
    case ADD_WALKTHROUGHT_ITEM:
      if (state.filter(item => item.id === action.payload.id).length === 0) {
        const anchors = state.slice(0);
        anchors.push(action.payload);
        return anchors;
      }
      return state;
    default:
      return state;
  }
}
