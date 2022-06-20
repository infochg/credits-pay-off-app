import { call } from 'redux-saga/effects';
import cookie from 'react-cookies';

export default function* sagaSendLog({ data }) {
  try {
    yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}logger/log`, {
        method: 'POST',
        headers: {
          Authorization: cookie.load('token') || '',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...data })
      })
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
