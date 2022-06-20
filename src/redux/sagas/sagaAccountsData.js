import { call } from 'redux-saga/effects';
import { ACCOUNTS_DATA_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const accountsData = sagaFetch.bind(
  null,
  'accounts/get',
  'get',
  ACCOUNTS_DATA_SUCCESS,
  false
);

export default function* sagaAccountsData() {
  yield call(accountsData);
}
