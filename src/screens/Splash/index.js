import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import history from '../../history';
import ErrorBoundary from '../../containers/ErrorBoundary';

import splash from '../../assets/img/splash.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    justifyContent: 'center'
  },
  img: {
    marginRight: '30px',
    maxWidth: '80%'
  },
  rightBlock: {
    textAlign: 'center'
  },
  h1: {
    fontSize: '32px',
    fontWeight: '900'
  },
  subtext: {
    fontSize: '22px',
    color: theme.palette.text.secondary,
    margin: '10px auto 40px auto'
  },
  link: {
    textDecoration: 'none'
  },
  submitBtn: {
    padding: '6px 50px'
  },
  loginLink: {
    display: 'block',
    margin: '20px auto',
    fontSize: '22px',
    fontWeight: '900',
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  [theme.breakpoints.down('sm')]: {
    wrapper: {
      flexDirection: 'column'
    },
    img: {
      marginRight: '0'
    }
  }
}));

function Splash() {
  const classes = useStyles();

  try {
    if (cookie.load('token')) {
      history.push('/snapshot');
    }

    return (
      <div className={classes.wrapper}>
        <img src={splash} alt="" className={classes.img} />
        <div className={classes.rightBlock}>
          <Typography className={classes.h1}>Welcome to Empathize</Typography>
          <Typography className={classes.subtext}>Let’s Get Started</Typography>
          <Link to="/registration" className={classes.link}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
              className={classes.submitBtn}
            >
              Get Started
            </Button>
          </Link>
          <Link to="/signin" className={classes.loginLink}>
            Log in
          </Link>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Splash;
