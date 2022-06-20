import { call } from 'redux-saga/effects';
import { SUBSCRIPTIONS_DATA_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const subscriptionsData = sagaFetch.bind(
  null,
  'userData/subscriptions',
  'get',
  SUBSCRIPTIONS_DATA_SUCCESS,
  true
);

export default function* sagaSubscriptionsData() {
  yield call(subscriptionsData);
}
