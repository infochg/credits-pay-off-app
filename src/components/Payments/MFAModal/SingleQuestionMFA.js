import React, { useEffect } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import ProgressBar from '../../Common/ProgressBar';

const useStyles = makeStyles(theme => ({
  modalTitle: {
    fontSize: '22px',
    color: theme.palette.text.primary,
    fontWeight: '900'
  },
  modalSubTitle: {
    fontSize: '18px',
    color: theme.palette.text.secondary
  },
  label: {
    textAlign: 'left'
  },
  modalBtns: {
    paddingTop: '20px',
    width: '100%',
    maxWidth: '480px'
  },
  modalBtn: {
    width: '144px',
    padding: '6px 10px',
    margin: '10px 20px'
  },
  loadText: {
    color: theme.palette.text.secondary,
    padding: '5px 0 15px 0',
    fontSize: '18px'
  },
  noWrap: {
    whiteSpace: 'nowrap'
  },
  [theme.breakpoints.down('xs')]: {
    form: {
      position: 'relative',
      paddingBottom: '50px'
    }
  }
}));

const validate = values => {
  const errors = {};
  if (!values.answer || values.answer === '') {
    errors.answer = 'Field is required.';
  }
  return errors;
};

function SingleQuestionMFA(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    endProcess,
    pristine,
    submitting,
    reset,
    loadingInModal,
    mfa
  } = props;

  useEffect(() => {
    reset();
  }, [mfa, reset]);

  try {
    return (
      <React.Fragment>
        <Typography className={classes.modalTitle}>
          {Object.values(mfa).map(item => item)}
        </Typography>
        <Form onSubmit={handleSubmit} className={classes.form}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Field
                name="answer"
                component={TextField}
                variant="outlined"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.modalBtns}>
                {!loadingInModal ? (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.modalBtn}
                      onClick={endProcess}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      className={classes.modalBtn}
                      type="submit"
                      disabled={pristine || submitting}
                    >
                      Send
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography className={classes.loadText}>
                      Submitting payment. This can take{' '}
                      <span className={classes.noWrap}>
                        up to 2 minutes ...
                      </span>
                    </Typography>
                    <ProgressBar withTimer />
                  </React.Fragment>
                )}
              </div>
            </Grid>
          </Grid>
        </Form>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SingleQuestionMFA.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  classes: PropTypes.shape({}),
  loadingInModal: PropTypes.bool,
  endProcess: PropTypes.func,
  mfa: PropTypes.shape({})
};

SingleQuestionMFA.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  reset: undefined,
  classes: undefined,
  loadingInModal: undefined,
  endProcess: undefined,
  mfa: undefined
};

export default reduxForm({
  form: 'SingleQuestionMFA',
  validate
})(SingleQuestionMFA);
