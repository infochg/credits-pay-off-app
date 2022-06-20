import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '../TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../Preloader';

const required = value => (value && value !== '' ? undefined : 'Required');

const useStyles = makeStyles(() => ({
  submitBtn: {
    marginTop: '40px',
    paddingTop: '6px',
    paddingBottom: '6px',
    minWidth: '187px'
  },
  label: {
    fontSize: '22px',
    textAlign: 'left'
  }
}));

function AboutForm(props) {
  const classes = useStyles();
  const { handleSubmit, submitting, userInfo } = props;

  try {
    return Object.keys(userInfo).length > 0 ? (
      <Form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={5}>
            <Typography className={classes.label}>First Name:</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Field
              name="firstName"
              component={TextField}
              validate={required}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.label}>Last Name:</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Field
              name="lastName"
              component={TextField}
              validate={required}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.label}>Email:</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Field
              name="email"
              component={TextField}
              validate={required}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
          disabled={submitting}
          className={classes.submitBtn}
        >
          Confirm
        </Button>
      </Form>
    ) : (
      <Preloader />
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

AboutForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  userInfo: PropTypes.shape({})
};

AboutForm.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  userInfo: undefined
};

export default reduxForm({
  form: 'AboutForm',
  enableReinitialize: true
})(AboutForm);
