import { put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import { RESET } from '../actions/actionTypes';

export default function* sagaLogout() {
  yield put({ type: RESET });
  cookie.remove('token');
  window.sessionStorage.removeItem('yodleeToken');
  window.sessionStorage.removeItem('yodleeTokenTime');
}
