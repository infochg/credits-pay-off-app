import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../../components/Common/TextField';
import ErrorBoundary from '../../containers/ErrorBoundary';

const required = value => (value && value !== '' ? undefined : 'Required');

const useStyles = makeStyles(theme => ({
  submitBtn: {
    marginTop: '40px'
  },
  forgotText: {
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}));

function SendPhoneCodeForm(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting, loading } = props;

  try {
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Field
              name="code"
              component={TextField}
              placeholder="Email or Phone number"
              validate={required}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        {!loading ? (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            disabled={pristine || submitting}
            className={classes.submitBtn}
          >
            Send Code
          </Button>
        ) : (
          <div className={classes.submitBtn}>
            <CircularProgress />
          </div>
        )}
      </Form>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SendPhoneCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  loading: PropTypes.bool
};

SendPhoneCodeForm.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  loading: undefined
};

export default reduxForm({
  form: 'SendPhoneCodeForm'
})(SendPhoneCodeForm);
