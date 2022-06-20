import { call } from 'redux-saga/effects';
import { NOTIFICATIONS_DATA_SUCCESS } from '../actions/actionTypes';
import sagaFetch from './sagaFetch';

const notificationsData = sagaFetch.bind(
  null,
  'notifications/get',
  'get',
  NOTIFICATIONS_DATA_SUCCESS,
  true
);

export default function* sagaNotificationsData() {
  yield call(notificationsData);
}
