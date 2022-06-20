import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Tooltip
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  sortWrapper: {
    display: 'flex'
  },
  title: {
    fontSize: '22px',
    fontWeight: '900',
    marginTop: '8px'
  },
  rootCheckbox: {
    color: 'rgba(0, 0, 0, 0.24)'
  },
  formControl: {
    margin: '0 0 0 auto',
    display: 'flex',
    flexDirection: 'row'
  },
  checkboxLabel: {
    fontSize: '14px'
  },
  infoIcon: {
    color: '#2D47FE',
    height: '15px',
    marginTop: '-3px'
  },
  [theme.breakpoints.down('xs')]: {
    sortWrapper: {
      flexDirection: 'column'
    },
    formControl: {
      margin: '0',
      flexDirection: 'column'
    }
  }
}));

function PayOffSorting(props) {
  const classes = useStyles();
  const { data, setSortedData, isManuallySorted } = props;
  const [checked, setChecked] = useState('avalanche');

  const avalancheSort = () => {
    const inputData = data.slice(0);

    inputData.sort((a, b) => {
      const bInterest = typeof b.interest === 'number' ? b.interest : 20;
      const aInterest = typeof a.interest === 'number' ? a.interest : 20;

      // if (bInterest === aInterest) {
      //   return a.balance - b.balance;
      // }

      return bInterest - aInterest;
    });
    setSortedData(inputData);
  };

  const snowballSort = () => {
    const inputData = data.slice(0);

    inputData.sort((a, b) => {
      return a.balance - b.balance;
    });
    setSortedData(inputData);
  };

  useEffect(() => {
    if (isManuallySorted) {
      setChecked();
    }
  }, [isManuallySorted]);

  useEffect(() => {
    if (data && data.length > 0) {
      if (checked === 'snowball') {
        snowballSort();
      } else if (checked === 'avalanche') {
        avalancheSort();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  try {
    const handleChange = event => {
      setChecked(event.target.name);
    };

    return (
      <div className={classes.sortWrapper}>
        <Typography className={classes.title}>Pay off order:</Typography>
        <div className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked === 'avalanche'}
                onChange={handleChange}
                name="avalanche"
                id="avalanche"
                color="primary"
                classes={{ root: classes.rootCheckbox }}
              />
            }
            label={
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label htmlFor="avalanche" className={classes.checkboxLabel}>
                Highest interest first{' '}
                <Tooltip
                  title="Pay down your highest interest accounts first. This saves you the most money in the long run."
                  placement="top"
                >
                  <span>
                    <Icon icon="info" className={classes.infoIcon} />
                  </span>
                </Tooltip>
              </label>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked === 'snowball'}
                onChange={handleChange}
                name="snowball"
                id="snowball"
                color="primary"
                classes={{ root: classes.rootCheckbox }}
              />
            }
            label={
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label htmlFor="snowball" className={classes.checkboxLabel}>
                Lowest balance first{' '}
                <Tooltip
                  title='Pay down your lowest balances first. This creates a "snowball" effect, as you pay off more and more of your accounts.'
                  placement="top"
                >
                  <span>
                    <Icon icon="info" className={classes.infoIcon} />
                  </span>
                </Tooltip>
              </label>
            }
          />
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

PayOffSorting.defaultProps = {
  data: undefined,
  setSortedData: undefined,
  isManuallySorted: undefined
};

PayOffSorting.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  setSortedData: PropTypes.func,
  isManuallySorted: PropTypes.bool
};

export default PayOffSorting;
