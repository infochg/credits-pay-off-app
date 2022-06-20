import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import history from '../../history';
import Dashboard from '../../components/Common/Dashboard';
import Footer from '../../components/Common/Footer';
import TopNavbar from '../../components/Common/TopNavbar';
import ToastsContainer from '../../components/Common/ToastsContainer';
import LogoutContainer from '../../containers/LogoutContainer';
import AddAccountContainer from '../../containers/AddAccountContainer';
import OnboardingContainer from '../../containers/OnboardingContainer';
import SubscribeContainer from '../../containers/SubscribeContainer';
import WalkthroughContainer from '../../containers/WalkthroughContainer';
import Preloader from '../../components/Common/Preloader';
import AddMoreAccountsModal from '../../components/Common/AddMoreAccountsModal';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    display: 'flex',
    paddingTop: '72px',
    minHeight: '100%'
  },
  container: {
    minHeight: '100%',
    width: '100%',
    background: '#F8FAFB'
  },
  content: {
    paddingBottom: '20px',
    minHeight: 'calc(100% - 30px)',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100% - 70px)'
    }
  }
}));

function DashboardLayout(props) {
  const {
    component,
    location,
    userInfo,
    isAddAccountOpen,
    toggleAddAccountModal,
    addWalkthroughItem,
    resetUserInfo,
    updateUserInfo
  } = props;
  const classes = useStyles();

  if (!cookie.load('token')) {
    history.push('/signin');
  }

  // Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout Modal
  const [openLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  // Add Account Modal
  const handleOpenAddAccount = () => {
    toggleAddAccountModal({
      isOpen: true
    });
  };

  const handleCloseAddAccount = () => {
    toggleAddAccountModal({
      isOpen: false
    });
  };

  // Walkthrough && Onboarding && Main account checking
  const [tryNum, setTryNum] = useState(1);

  useEffect(() => {
    if (
      Object.keys(userInfo).length > 0 &&
      !userInfo.hasPlaidAccount &&
      userInfo.email !== 'test@empathize.com'
    ) {
      if (location.pathname !== 'snapshot') {
        history.push('/snapshot');
      }
      if (tryNum < 4) {
        const reCheck = () => {
          setTryNum(tryNum + 1);
          resetUserInfo();
        };
        setTimeout(reCheck, 5000);
      } else {
        history.push('/registration');
      }
    }
    // eslint-disable-next-line
  }, [location.pathname, userInfo]);

  useEffect(() => {
    if (
      Object.keys(userInfo).length > 0 &&
      userInfo.hasPlaidAccount &&
      userInfo.registration === 'addingAccount'
    ) {
      updateUserInfo({ registration: 'infoFilling' });
    }
  }, [location.pathname, userInfo, updateUserInfo]);

  // Add More Accounts Modal
  const [openAddMoreAccounts, setOpenAddMoreAccounts] = useState(false);

  const handleOpenAddMoreAccounts = () => {
    setOpenAddMoreAccounts(true);
  };

  const handleCloseAddMoreAccounts = () => {
    setOpenAddMoreAccounts(false);
  };

  return (
    <React.Fragment>
      {Object.keys(userInfo).length > 0 &&
      (userInfo.hasPlaidAccount || userInfo.email === 'test@empathize.com') ? (
        <React.Fragment>
          <TopNavbar
            userInfo={userInfo}
            toggleMenu={toggleMenu}
            isMenuOpen={isMenuOpen}
            handleOpenLogout={handleOpenLogout}
            handleOpenAddAccount={handleOpenAddAccount}
            addWalkthroughItem={addWalkthroughItem}
          />
          <div className={classes.contentWrapper}>
            <Dashboard
              userInfo={userInfo}
              pathname={location.pathname}
              isMenuOpen={isMenuOpen}
              handleOpenLogout={handleOpenLogout}
              handleOpenAddAccount={handleOpenAddAccount}
              addWalkthroughItem={addWalkthroughItem}
            />
            <div className={classes.container}>
              <div className={classes.content}>{component}</div>
              <Footer />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Preloader isCards />
      )}

      {Object.keys(userInfo).length > 0 &&
        (userInfo.registration === null || userInfo.registration === 'done') &&
        !userInfo.is_paying &&
        userInfo.email !== 'test@empathize.com' && <SubscribeContainer />}

      {Object.keys(userInfo).length > 0 &&
        userInfo.registration &&
        (userInfo.registration === 'infoFilling' ||
          userInfo.registration === 'subscribing' ||
          userInfo.registration === 'addMoreAccounts') && (
          <OnboardingContainer />
        )}

      {Object.keys(userInfo).length > 0 &&
        userInfo.registration &&
        userInfo.registration === 'walkthrough' && <WalkthroughContainer />}

      <LogoutContainer
        openLogout={openLogout}
        handleCloseLogout={handleCloseLogout}
      />

      <AddAccountContainer
        isAddAccountOpen={isAddAccountOpen}
        closeAddAccount={handleCloseAddAccount}
        openAddMoreAccounts={handleOpenAddMoreAccounts}
        closeAddMoreAccounts={handleCloseAddMoreAccounts}
      />

      <AddMoreAccountsModal
        openAddMoreAccounts={openAddMoreAccounts}
        openAddAccount={handleOpenAddAccount}
      />
      <ToastsContainer />
    </React.Fragment>
  );
}

DashboardLayout.propTypes = {
  component: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  userInfo: PropTypes.shape({
    hasPlaidAccount: PropTypes.bool,
    is_paying: PropTypes.bool,
    email: PropTypes.string,
    registration: PropTypes.string
  }),
  isAddAccountOpen: PropTypes.shape({}),
  toggleAddAccountModal: PropTypes.func,
  addWalkthroughItem: PropTypes.func,
  resetUserInfo: PropTypes.func,
  updateUserInfo: PropTypes.func
};

DashboardLayout.defaultProps = {
  component: undefined,
  location: undefined,
  userInfo: undefined,
  isAddAccountOpen: undefined,
  toggleAddAccountModal: undefined,
  addWalkthroughItem: undefined,
  resetUserInfo: undefined,
  updateUserInfo: undefined
};

export default withRouter(DashboardLayout);
