import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

import noDebts from '../../../assets/img/no-debts.svg';

const useStyles = makeStyles(theme => ({
  noDebts: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '5% auto 0 auto',
    padding: '0 15px',
    flexDirection: 'column',
    maxWidth: '550px',
    color: theme.palette.text.secondary
  },
  image: {
    maxWidth: '90%'
  },
  h3: {
    fontSize: '22px',
    fontWeight: '900',
    color: theme.palette.text.primary,
    margin: '20px auto'
  },
  btn: {
    padding: '5px 20px',
    marginBottom: '50px'
  }
}));

function NoDebts(props) {
  const { toggleAddAccountModal } = props;
  const classes = useStyles();

  try {
    return (
      <div className={classes.noDebts}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.btn}
          onClick={() =>
            toggleAddAccountModal({
              isOpen: true
            })
          }
        >
          Connect a Credit Card or Loan
        </Button>
        <img src={noDebts} alt="" className={classes.image} />
        <Typography className={classes.h3}>
          Congratulations, you have no debts!
        </Typography>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

NoDebts.defaultProps = {
  toggleAddAccountModal: undefined
};

NoDebts.propTypes = {
  toggleAddAccountModal: PropTypes.func
};

export default NoDebts;
