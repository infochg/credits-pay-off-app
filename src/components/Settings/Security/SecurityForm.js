import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: '22px'
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.secondary
  },
  topBtn: {
    margin: '0 0 0 auto'
  },
  submitBtn: {
    padding: '3px 20px'
  },
  content: {
    maxWidth: '360px',
    paddingTop: '20px'
  },
  label: {
    fontWeight: '500',
    paddingTop: '10px'
  },
  arrowLeft: {
    display: 'none !important'
  },
  [theme.breakpoints.down('xs')]: {
    form: {
      position: 'relative',
      paddingBottom: '50px'
    },
    topBtn: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      marginLeft: '-90px'
    },
    arrowLeft: {
      display: 'inline-block !important',
      height: '14px',
      marginRight: '10px'
    }
  }
}));

const validate = values => {
  const errors = {};
  if (!values.oldPassword || values.oldPassword === '') {
    errors.oldPassword = 'Field is required.';
  }

  if (!values.newPassword || values.newPassword === '') {
    errors.newPassword = 'Field is required.';
  }

  if (
    values.newPassword &&
    !/^(?=.*\d)(?=.*[\W]).{8,20}$/.test(values.newPassword)
  ) {
    errors.newPassword =
      'You must have at least 8 characters, special character and number';
  }

  if (!values.newPasswordAgain || values.newPasswordAgain === '') {
    errors.newPasswordAgain = 'Field is required.';
  }

  if (values.newPasswordAgain !== values.newPassword) {
    errors.newPasswordAgain =
      'Password confirmation is not matching New password';
  }
  return errors;
};

function SecurityForm(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting, showPreloader, goBack } = props;

  try {
    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.titleWrapper}>
            <div>
              <Typography className={classes.title}>
                <Icon
                  icon="arrow-left"
                  className={classes.arrowLeft}
                  role="presentation"
                  onClick={goBack}
                />
                Security
              </Typography>
              <Typography className={classes.subTitle}>
                Password & security questions
              </Typography>
            </div>
            <div className={classes.topBtn}>
              {!showPreloader ? (
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.submitBtn}
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Change password
                </Button>
              ) : (
                <div className={classes.submitBtn}>
                  <CircularProgress />
                </div>
              )}
            </div>
          </div>
          <div className={classes.content}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Field
                  name="oldPassword"
                  label="Old password"
                  component={TextField}
                  variant="outlined"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="newPassword"
                  label="New password"
                  component={TextField}
                  variant="outlined"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="newPasswordAgain"
                  label="New password again"
                  component={TextField}
                  variant="outlined"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        </Form>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SecurityForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  showPreloader: PropTypes.bool,
  goBack: PropTypes.func
};

SecurityForm.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  showPreloader: undefined,
  goBack: undefined
};

export default reduxForm({
  form: 'SecurityForm',
  validate
})(SecurityForm);
