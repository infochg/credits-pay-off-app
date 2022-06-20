import { call } from 'redux-saga/effects';
import { UPDATE_USER_INFO_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const updateUser = sagaFetch.bind(
  null,
  'user/update',
  'put',
  UPDATE_USER_INFO_SUCCESS,
  true
);

export default function* sagaUpdateUserInfo({ data }) {
  yield call(updateUser, { ...data });
}
