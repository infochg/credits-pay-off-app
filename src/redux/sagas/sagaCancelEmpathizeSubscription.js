import { call } from 'redux-saga/effects';
import { CANCEL_EMPATHIZE_SUBSCRIPTION_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const cancelEmpathizeSubscription = sagaFetch.bind(
  null,
  'billing/cancelAllSubscriptions',
  'delete',
  CANCEL_EMPATHIZE_SUBSCRIPTION_SUCCESS,
  true
);

export default function* sagaCancelEmpathizeSubscription(data) {
  yield call(cancelEmpathizeSubscription, {
    testMode: process.env.NODE_ENV !== 'production',
    ...data.payload
  });
}
