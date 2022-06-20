import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../components/Common/Footer';
import TopNavbar from '../../components/Common/TopNavbar';
import ToastsContainer from '../../components/Common/ToastsContainer';
import AddAccountContainer from '../../containers/AddAccountContainer';

const useStyles = makeStyles(theme => ({
  content: {
    paddingTop: '72px',
    minHeight: 'calc(100% - 30px)',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100% - 70px)'
    }
  },
  container: {
    paddingTop: '20px',
    paddingBottom: '20px'
  }
}));

function SystemLayout(props) {
  const {
    component,
    location,
    toggleAddAccountModal,
    isAddAccountOpen
  } = props;
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  return (
    <React.Fragment>
      <TopNavbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} isSystem />
      <div className={classes.content}>
        <Container className={classes.container}>{component}</Container>
      </div>
      <Footer />

      {isAddAccountOpen ? (
        <AddAccountContainer
          isAddAccountOpen={isAddAccountOpen}
          openAddAccount={handleOpenAddAccount}
          closeAddAccount={handleCloseAddAccount}
        />
      ) : null}
      <ToastsContainer />
    </React.Fragment>
  );
}

SystemLayout.propTypes = {
  component: PropTypes.node,
  isAddAccountOpen: PropTypes.shape({}),
  toggleAddAccountModal: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

SystemLayout.defaultProps = {
  component: undefined,
  isAddAccountOpen: undefined,
  toggleAddAccountModal: undefined,
  location: undefined
};

export default withRouter(SystemLayout);
