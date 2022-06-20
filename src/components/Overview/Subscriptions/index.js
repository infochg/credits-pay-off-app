import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import Image from '../../Common/Image';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

import noSubscriptions from '../../../assets/img/no-subscriptions.svg';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  titleWrapper: {
    display: 'flex',
    marginBottom: '10px'
  },
  title: {
    fontSize: '22px',
    fontWeight: '900'
  },
  titleLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  showMore: {
    margin: '2px 0 0 auto',
    fontSize: '20px',
    fontWeight: '900',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      color: theme.palette.text.primary
    }
  },
  itemsWrapper: {
    maxHeight: '185px',
    overflowY: 'hidden',
    transition: 'all 5s',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '165px'
    }
  },
  fullHeight: {
    maxHeight: '9000px',
    overflowY: 'visible'
  },
  item: {
    display: 'inline-flex',
    flexDirection: 'column',
    padding: '15px',
    margin: '10px 8px',
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: '15px',
    minWidth: '155px',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '15px 8px',
      minWidth: '135px',
      margin: '5px 5px'
    }
  },
  image: {
    width: '100%',
    height: '30px',
    marginBottom: '10px',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  amount: {
    fontSize: '24px',
    fontWeight: '900'
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: '16px'
  },
  noDataTextWrapper: {
    textAlign: 'center'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    display: 'inline-flex',
    textAlign: 'left',
    margin: '0 auto',
    '& b': {
      color: theme.palette.text.primary
    },
    '& img': {
      marginRight: '30px'
    }
  },
  connectBtn: {
    padding: '4px 18px',
    marginTop: '10px'
  },
  [theme.breakpoints.down('sm')]: {
    noDataText: {
      flexDirection: 'column',
      textAlign: 'center',
      '& img': {
        marginRight: '0',
        marginBottom: '10px'
      }
    }
  }
}));

function Subscriptions(props) {
  const { data, toggleAddAccountModal } = props;
  const [sortedData, setSortedData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [fullHeight, setFullHeight] = useState(false);
  const classes = useStyles();

  const wrapperRef = useRef();
  const listRef = useRef();

  const handleResize = () => {
    if (data && data.length > 0) {
      if (
        listRef.current &&
        wrapperRef.current &&
        listRef.current.offsetHeight > wrapperRef.current.offsetHeight + 20
      ) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  useEffect(() => {
    if (sortedData && sortedData.length > 0) {
      handleResize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setSortedData(
        data.sort(
          (a, b) =>
            moment(new Date(a.billDate)).format('YYYYMMDD') -
            moment(new Date(b.billDate)).format('YYYYMMDD')
        )
      );
    }
  }, [data]);

  try {
    const frequency = {
      monthly: 'month'
    };

    const showMoreItems = () => {
      setFullHeight(true);
      setShowMore(false);
    };

    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.titleWrapper}>
            <Link to="/subscriptions" className={classes.titleLink}>
              <Typography className={classes.title}>Subscriptions</Typography>
            </Link>
            {showMore ? (
              <Typography
                className={classes.showMore}
                role="presentation"
                onClick={showMoreItems}
              >
                Show more
              </Typography>
            ) : null}
          </div>
          {sortedData && sortedData.length > 0 ? (
            <div
              className={`${classes.itemsWrapper} ${
                fullHeight ? classes.fullHeight : ''
              }`}
              ref={wrapperRef}
            >
              <div id="items-list" className={classes.itemsList} ref={listRef}>
                {sortedData.map(item => (
                  <Link
                    to="/subscriptions"
                    key={Math.random() * 1000}
                    className={classes.item}
                  >
                    <div className={classes.image} name="subscriptionTitle">
                      <Image src={item.image} name={item.name} isShort />
                    </div>
                    <Typography
                      className={classes.amount}
                      name="subscriptionValue"
                    >
                      {item.amount || item.amount === 0
                        ? numberWithCommas(item.amount, true, 2)
                        : 'N/A'}
                    </Typography>
                    <Typography className={classes.text}>
                      per {item.frequency ? frequency[item.frequency] : 'N/A'}
                    </Typography>
                    <Typography className={classes.text}>
                      bills{' '}
                      {item.billDate ? moment(item.billDate).fromNow() : 'N/A'}
                    </Typography>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className={classes.noDataTextWrapper}>
              <Typography className={classes.noDataText}>
                <img src={noSubscriptions} alt="" />
                <span>
                  <b>Congratulations!</b>
                  <br />
                  There are no subscriptions in your accounts.
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    type="button"
                    onClick={() =>
                      toggleAddAccountModal({
                        isOpen: true
                      })
                    }
                    className={classes.connectBtn}
                  >
                    Connect more accounts
                  </Button>
                </span>
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Subscriptions.defaultProps = {
  data: undefined,
  toggleAddAccountModal: undefined
};

Subscriptions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  toggleAddAccountModal: PropTypes.func
};

export default Subscriptions;
