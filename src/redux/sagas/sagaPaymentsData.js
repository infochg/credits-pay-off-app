import { call } from 'redux-saga/effects';
import { PAYMENTS_DATA_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const paymentsData = sagaFetch.bind(
  null,
  'userData/payments',
  'get',
  PAYMENTS_DATA_SUCCESS,
  false
);

export default function* sagaOverviewData() {
  yield call(paymentsData);
}
