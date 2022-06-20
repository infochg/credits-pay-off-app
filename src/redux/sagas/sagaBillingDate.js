import { call } from 'redux-saga/effects';
import { BILLING_DATE_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const billingDate = sagaFetch.bind(
  null,
  'billing/billingDate',
  'post',
  BILLING_DATE_SUCCESS,
  false
);

export default function* sagaBillingDate() {
  yield call(billingDate, {
    testMode: process.env.NODE_ENV !== 'production'
  });
}
