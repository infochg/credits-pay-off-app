import { call } from 'redux-saga/effects';
import sagaFetch from './sagaFetch';

import { RESET_EMPATHIZE_SUBSCRIPTION_SUCCESS } from '../actions/actionTypes';

const resetEmpathizeSubscription = sagaFetch.bind(
  null,
  'billing/addUserWithSubscription',
  'post',
  RESET_EMPATHIZE_SUBSCRIPTION_SUCCESS,
  true
);

export default function* sagaResetEmpathizeSubscription() {
  yield call(resetEmpathizeSubscription, {
    testMode: process.env.NODE_ENV !== 'production'
  });
}
