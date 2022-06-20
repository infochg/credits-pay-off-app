import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import Scrollbar from 'react-scrollbars-custom';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

import noData from '../../../assets/img/no-data.svg';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    transition: 'all 0.2s',
    height: 'calc(100% - 40px)',
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.03)'
    },
    '& div.ScrollbarsCustom-Track': {
      background: '#fff !important',
      borderRadius: '0 0 5px 0 !important',
      top: '0 !important',
      height: '100% !important'
    },
    '& div.ScrollbarsCustom-Thumb': {
      width: '5px !important',
      background: '#CCE1F7 !important',
      margin: '2px 0 2px 3px !important'
    }
  },
  gradientTop: {
    position: 'absolute',
    zIndex: '2',
    top: '0',
    left: '0',
    right: '15px',
    height: '40px',
    background:
      'linear-gradient(to top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%,rgba(255,255,255,1) 100%)'
  },
  gradient: {
    position: 'absolute',
    zIndex: '2',
    bottom: '0',
    left: '0',
    right: '15px',
    height: '40px',
    background:
      'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 70%,rgba(255,255,255,1) 100%)'
  },
  cardContent: {
    paddingBottom: '22px !important'
  },
  totalItem: {
    padding: '10px 0',
    display: 'flex'
  },
  totalKey: {
    fontSize: '20px',
    color: theme.palette.text.primary,
    fontWeight: '900',
    paddingRight: '5px'
  },
  totalValue: {
    fontSize: '20px',
    color: '#FF4242',
    margin: '0 0 0 auto',
    fontWeight: '900'
  },
  green: {
    color: '#65C842'
  },
  titleWrapper: {
    display: 'flex'
  },
  title: {
    fontSize: '22px',
    fontWeight: '900'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    padding: '22px 0 0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& b': {
      color: theme.palette.text.primary
    },
    '& img': {
      maxWidth: '60%',
      marginBottom: '10px'
    }
  },
  link: {
    display: 'inline-block',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    borderBottom: '1px solid transparent',
    transition: 'all 0.2s',
    fontWeight: '900',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary.main}`
    }
  },
  [theme.breakpoints.down('xs')]: {
    card: {
      height: '228px'
    }
  }
}));

function AccountBalances(props) {
  const { data, toggleAddAccountModal } = props;
  const classes = useStyles();

  try {
    let sortedData = [];

    if (data) {
      if (Array.isArray(data)) {
        sortedData = data.slice(0);

        sortedData.sort((a, b) => {
          return b.amount - a.amount;
        });
      } else if (Object.keys(data).length > 0) {
        sortedData = Object.keys(data).map(item => {
          return {
            ...data[item],
            amount: data[item].balance.amount,
            name: item
          };
        });

        sortedData.sort((a, b) => {
          return b.balance.amount - a.balance.amount;
        });
      }
    }

    return (
      <Card className={classes.card}>
        {sortedData && sortedData.length > 0 ? (
          <React.Fragment>
            <div className={classes.gradientTop} />
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <CardContent className={classes.cardContent}>
                {sortedData.map(item => {
                  return (
                    <div className={classes.totalItem} key={item.id}>
                      <Typography
                        className={classes.totalKey}
                        name="accountTitle"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        className={`${classes.totalValue} ${
                          item.isAsset || item.amount === 0 ? classes.green : ''
                        }`}
                        name="accountValue"
                      >
                        {item.amount || item.amount === 0
                          ? numberWithCommas(item.amount, true, 2)
                          : 'N/A'}
                      </Typography>
                    </div>
                  );
                })}
              </CardContent>
            </Scrollbar>
            <div className={classes.gradient} />
          </React.Fragment>
        ) : (
          <CardContent className={classes.cardContent}>
            <div className={classes.titleWrapper}>
              <Typography className={classes.title}>
                Account Balances
              </Typography>
            </div>
            <Typography className={classes.noDataText}>
              <img src={noData} alt="" />
              <span>
                <span
                  role="presentation"
                  onClick={() =>
                    toggleAddAccountModal({
                      isOpen: true
                    })
                  }
                  className={classes.link}
                >
                  Connect accounts
                </span>{' '}
                to get data
              </span>
            </Typography>
          </CardContent>
        )}
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

AccountBalances.defaultProps = {
  data: undefined,
  toggleAddAccountModal: undefined
};

AccountBalances.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({}))
  ]),
  toggleAddAccountModal: PropTypes.func
};

export default AccountBalances;
