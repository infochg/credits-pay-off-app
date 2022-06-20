import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ForgotPassword from './index';

describe('<ForgotPassword /> before sending email', () => {
  const mockStore = configureStore();
  let wrapper;

  beforeEach(() => {
    const store = mockStore({
      isContactSent: false
    });

    wrapper = mount(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain(
      'We will send link to reset your password to your contact.'
    );
  });
});

describe('<ForgotPassword /> after sending email', () => {
  const mockStore = configureStore();
  let wrapper;

  beforeEach(() => {
    const store = mockStore({
      isContactSent: true
    });

    wrapper = mount(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    );
  });

  it('renders correctly after sending email', () => {
    expect(wrapper.text()).toContain(
      'We have sent link to your mail, please, check it.'
    );
  });
});
