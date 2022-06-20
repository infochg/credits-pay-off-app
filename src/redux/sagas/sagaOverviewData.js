import { call } from 'redux-saga/effects';
import { OVERVIEW_DATA_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const overviewData = sagaFetch.bind(
  null,
  'userData/overview',
  'get',
  OVERVIEW_DATA_SUCCESS,
  false
);

export default function* sagaOverviewData() {
  yield call(overviewData);
}
