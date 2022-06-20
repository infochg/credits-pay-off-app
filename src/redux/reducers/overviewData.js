import { OVERVIEW_DATA_SUCCESS } from '../actions/actionTypes';

// import overviewDat from '../../mock/overviewData.json';

export default function overviewData(state = null, action) {
  // export default function overviewData(state = overviewDat, action) {
  switch (action.type) {
    case OVERVIEW_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
