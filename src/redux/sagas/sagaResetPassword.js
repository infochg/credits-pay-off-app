import { call } from 'redux-saga/effects';
import sagaFetch from './sagaFetch';
import { RESET_PASSWORD_SUCCESS } from '../actions/actionTypes';

const resetPassword = sagaFetch.bind(
  null,
  'user/reset',
  'post',
  RESET_PASSWORD_SUCCESS,
  true
);

export default function* sagaResetPassword({ data }) {
  yield call(resetPassword, { ...data });
}
