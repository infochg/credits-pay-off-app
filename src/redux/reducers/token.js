import cookie from 'react-cookies';
import { VERIFY_PHONE_SUCCESS, SIGNIN_SUCCESS } from '../actions/actionTypes';

export default function token(state = '', action) {
  const expires = new Date(Date.now() + 43200 * 1000);
  switch (action.type) {
    case VERIFY_PHONE_SUCCESS:
      if (action.payload.Authorization) {
        cookie.save('token', action.payload.Authorization, {
          path: '/',
          sameSite: 'Lax'
        });
      }
      return action.payload;
    case SIGNIN_SUCCESS:
      if (action.payload.data) {
        cookie.save('token', action.payload.data.Authorization, {
          path: '/',
          sameSite: 'Lax',
          expires
        });
      }
      return action.payload;
    default:
      return state;
  }
}
