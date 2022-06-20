import { call } from 'redux-saga/effects';
import sagaFetch from './sagaFetch';
import { CHANGE_PASSWORD_SUCCESS } from '../actions/actionTypes';

const changePassword = sagaFetch.bind(
  null,
  'user/changePassword',
  'post',
  CHANGE_PASSWORD_SUCCESS,
  true
);

export default function* sagaChangePassword({ data }) {
  yield call(changePassword, { ...data });
}
