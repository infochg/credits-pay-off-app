import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import { FullStoryAPI } from 'react-fullstory';
import mixpanel from 'mixpanel-browser';
import { systemRoutes, dashboardRoutes } from '../../routes';
import Splash from '../Splash';
import ErrorPage from '../ErrorPage';
import DashboardLayout from '../../layouts/DashboardLayout';
import SystemLayout from '../../layouts/SystemLayout';

import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  TOGGLE_ADD_ACCOUNT,
  ADD_WALKTHROUGHT_ITEM,
  UPDATE_USER_INFO_REQUEST
} from '../../redux/actions/actionTypes';

function App(props) {
  const {
    userInfo,
    fetchUserInfo,
    isAddAccountOpen,
    toggleAddAccountModal,
    addWalkthroughItem,
    resetUserInfo,
    updateUserInfo
  } = props;

  useEffect(() => {
    if (cookie.load('token') && Object.values(userInfo).length === 0) {
      fetchUserInfo();
    }
  }, [userInfo, fetchUserInfo]);

  useEffect(() => {
    if (Object.values(userInfo).length > 0) {
      // Fullstory
      FullStoryAPI('identify', userInfo.id, {
        email: userInfo.email || '',
        phone: userInfo.phoneNumber || '',
        name: `${userInfo.firstName} ${userInfo.lastName}` || ''
      });

      // mixedin
      const USER_ID = userInfo.id;
      mixpanel.people.set({
        $email: userInfo.email,
        $phone: userInfo.phoneNumber,
        USER_ID
      });
      mixpanel.identify(USER_ID);
    }
  }, [userInfo]);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <SystemLayout
              isAddAccountOpen={isAddAccountOpen}
              toggleAddAccountModal={toggleAddAccountModal}
              component={<Splash />}
            />
          )}
        />
        <Route
          exact
          path="/index.html"
          render={() => (
            <SystemLayout
              isAddAccountOpen={isAddAccountOpen}
              toggleAddAccountModal={toggleAddAccountModal}
              component={<Splash />}
            />
          )}
        />
        {systemRoutes.map(item => (
          <Route
            key={item.path || new Date()}
            path={item.path}
            render={() => (
              <SystemLayout
                isAddAccountOpen={isAddAccountOpen}
                toggleAddAccountModal={toggleAddAccountModal}
                component={item.component}
              />
            )}
          />
        ))}
        {dashboardRoutes.map(item => (
          <Route
            key={item.path + item.title}
            path={item.path}
            render={() => (
              <DashboardLayout
                userInfo={userInfo}
                component={item.component}
                isAddAccountOpen={isAddAccountOpen}
                toggleAddAccountModal={toggleAddAccountModal}
                addWalkthroughItem={addWalkthroughItem}
                resetUserInfo={resetUserInfo}
                updateUserInfo={updateUserInfo}
              />
            )}
          />
        ))}
        <Route render={() => <SystemLayout component={<ErrorPage />} />} />
      </Switch>
    </React.Fragment>
  );
}

App.defaultProps = {
  userInfo: undefined,
  fetchUserInfo: undefined,
  isAddAccountOpen: undefined,
  toggleAddAccountModal: undefined,
  addWalkthroughItem: undefined,
  resetUserInfo: undefined,
  updateUserInfo: undefined
};

App.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }),
  fetchUserInfo: PropTypes.func,
  isAddAccountOpen: PropTypes.shape({}),
  toggleAddAccountModal: PropTypes.func,
  addWalkthroughItem: PropTypes.func,
  resetUserInfo: PropTypes.func,
  updateUserInfo: PropTypes.func
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  isAddAccountOpen: state.isAddAccountOpen
});

const actionsStateToProps = {
  fetchUserInfo: () => ({ type: USER_INFO_REQUEST }),
  toggleAddAccountModal: payload => ({ type: TOGGLE_ADD_ACCOUNT, payload }),
  addWalkthroughItem: payload => ({ type: ADD_WALKTHROUGHT_ITEM, payload }),
  resetUserInfo: () => ({ type: USER_INFO_SUCCESS, payload: {} }),
  updateUserInfo: data => ({ type: UPDATE_USER_INFO_REQUEST, data })
};

export default connect(mapStateToProps, actionsStateToProps)(App);
