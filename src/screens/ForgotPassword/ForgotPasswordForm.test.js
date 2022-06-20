import React from 'react';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ForgotPasswordForm from './ForgotPasswordForm';

describe('<ForgotPasswordForm />', () => {
  const fieldReducer = (state = {}, { type }) => {
    switch (type) {
      default:
        return state;
    }
  };

  const reducer = combineReducers({
    field: fieldReducer,
    form: formReducer
  });

  let wrapper;

  beforeEach(() => {
    const store = createStore(reducer);

    wrapper = mount(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have an email field', () => {
    expect(
      wrapper.find('input[placeholder="Email or Phone number"]').length
    ).toEqual(1);
  });

  it('fills the input with a default value (empty)', () => {
    expect(
      wrapper.find('input[placeholder="Email or Phone number"]').prop('value')
    ).toBe('');
  });

  it('updates input value when changed', () => {
    const event = { target: { value: 'Test' } };
    wrapper
      .find('input[placeholder="Email or Phone number"]')
      .simulate('change', event);
    expect(
      wrapper.find('input[placeholder="Email or Phone number"]').prop('value')
    ).toBe('Test');
  });
});
