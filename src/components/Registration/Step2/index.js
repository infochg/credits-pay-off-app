import React, { useState } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  submitBtn: {
    marginTop: '40px',
    paddingTop: '6px',
    paddingBottom: '6px',
    minWidth: '280px'
  },
  label: {
    textAlign: 'left'
  },
  formControl: {
    marginTop: '20px'
  },
  checkboxLabel: {
    fontSize: '16px',
    textAlign: 'left',
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}));

const validate = values => {
  const errors = {};
  if (!values.code || values.code === '') {
    errors.code = 'Field is required.';
  }

  if (values.code && !/^[0-9\b]+$/.test(values.code)) {
    errors.code = 'Code must consist of digits.';
  }

  if (values.code && values.code.length !== 6) {
    errors.code = 'Code must consist 6 digits.';
  }

  return errors;
};

function Step2(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting, loading } = props;
  const [agree, setAgree] = useState(false);

  const changeAgree = () => {
    setAgree(!agree);
  };

  try {
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={5}>
            <Typography className={classes.label}>Six-digit code</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Field
              name="code"
              component={TextField}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              id="agreebox"
              onChange={changeAgree}
              color="primary"
            />
          }
          label={
            <label htmlFor="agreebox">
              I agree to Empathize&lsquo;s{' '}
              <a
                href="https://empathize.com/tos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </a>{' '}
              and{' '}
              <a
                href="https://empathize.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </label>
          }
          classes={{ root: classes.formControl, label: classes.checkboxLabel }}
        />
        {!loading ? (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            disabled={pristine || submitting || !agree}
            className={classes.submitBtn}
          >
            Verify your number
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

Step2.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  loading: PropTypes.bool
};

Step2.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  loading: undefined
};

export default reduxForm({
  form: 'Step2',
  validate
})(Step2);
