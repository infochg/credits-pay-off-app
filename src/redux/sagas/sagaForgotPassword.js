import { call } from 'redux-saga/effects';
import sagaFetch from './sagaFetch';
import { FORGOT_PASSWORD_SUCCESS } from '../actions/actionTypes';

const forgotPassword = sagaFetch.bind(
  null,
  'user/forgot',
  'post',
  FORGOT_PASSWORD_SUCCESS,
  true
);

export default function* sagaForgotPassword({ data }) {
  yield call(forgotPassword, { ...data });
}
