import { call } from 'redux-saga/effects';
import { USER_INFO_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const userInfo = sagaFetch.bind(
  null,
  'user/info',
  'get',
  USER_INFO_SUCCESS,
  false
);

export default function* sagaUserInfo() {
  yield call(userInfo);
}
