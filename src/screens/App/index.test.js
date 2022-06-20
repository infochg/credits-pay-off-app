import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from 'redux-mock-store';
import mixpanel from 'mixpanel-browser';
import cookie from 'react-cookies';
import history from '../../history';
import App from './index';

mixpanel.init('787ce3b362ce474c1c19d3006547c24f');

describe('<App /> without any data', () => {
  const mockStore = configureStore();
  let wrapper;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const store = mockStore({
      userInfo: {}
    });

    wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly welcome screen', () => {
    expect(wrapper.text()).toContain('Welcome to Empathize');
  });
});

describe('<App /> with userInfo', () => {
  const mockStore = configureStore();
  let wrapper;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    cookie.save('token', 'testToken');
    const store = mockStore({
      userInfo: {
        hasPlaidAccount: true,
        firstName: 'Test',
        lastName: 'Test',
        registration: 'done',
        is_paying: true
      }
    });

    wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
  });

  afterEach(() => {
    cookie.remove('token');
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly user Firstname and Lastname at dashboard', () => {
    expect(wrapper.text()).toContain('Test Test');
  });
});

describe('<App /> without Empathize subscription', () => {
  const mockStore = configureStore();
  let wrapper;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    cookie.save('token', 'testToken');
    const store = mockStore({
      userInfo: {
        hasPlaidAccount: true,
        firstName: 'Test',
        lastName: 'Test',
        registration: 'done',
        is_paying: false
      }
    });

    wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
  });

  afterEach(() => {
    cookie.remove('token');
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly Subscription Modal', () => {
    expect(wrapper.text()).toContain('Let’s Crush YourDebt Once and For All');
  });
});
