import { put } from 'redux-saga/effects';
import { LOADING } from '../actions/actionTypes';

export default function* sagaLoading(bool) {
  yield put({ type: LOADING, payload: bool });
}
