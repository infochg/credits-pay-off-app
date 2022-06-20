import { call } from 'redux-saga/effects';
import { TRANSACTIONS_DATA_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const overviewTransactionsData = sagaFetch.bind(
  null,
  'userData/transactions?pageSize=10&pageNum=1',
  'get',
  TRANSACTIONS_DATA_SUCCESS,
  false
);

const transactionsData = sagaFetch.bind(
  null,
  'userData/transactions?pageSize=10000&pageNum=1',
  'get',
  TRANSACTIONS_DATA_SUCCESS,
  true
);

export default function* sagaTransactionsData({ payload }) {
  if (payload && payload.type === 'overview') {
    yield call(overviewTransactionsData);
  } else {
    yield call(transactionsData);
  }
}
