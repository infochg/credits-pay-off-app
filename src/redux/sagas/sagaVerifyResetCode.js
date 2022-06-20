import { call } from 'redux-saga/effects';
import sagaFetch from './sagaFetch';
import { VERIFY_RESET_CODE_SUCCESS } from '../actions/actionTypes';

const verifyResetCode = sagaFetch.bind(
  null,
  'user/verifyResetCode',
  'post',
  VERIFY_RESET_CODE_SUCCESS,
  true
);

export default function* sagaVerifyResetCode({ data }) {
  yield call(verifyResetCode, { ...data });
}
