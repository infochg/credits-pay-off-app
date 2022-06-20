import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Menu, MenuItem, Typography } from '@material-ui/core';
import AccountItem from './AccountItem';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../../Common/Preloader';
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
    paddingTop: '20px'
  },
  arrowLeft: {
    display: 'none !important'
  },
  filterActiveEl: {
    padding: '0',
    margin: '10px 0 0 0',
    fontSize: '16px',
    fontWeight: '900',
    '&:hover': {
      background: 'transparent'
    }
  },
  activeItemIco: {
    width: '10px',
    marginLeft: '20px'
  },
  filterItem: {
    fontSize: '16px'
  },
  [theme.breakpoints.down('xs')]: {
    contentWrapper: {
      position: 'relative',
      paddingBottom: '50px'
    },
    topBtn: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      marginLeft: '-80px'
    },
    arrowLeft: {
      display: 'inline-block !important',
      height: '14px',
      marginRight: '10px'
    }
  }
}));

function Accounts(props) {
  const { data, toggleAddAccountModal, goBack } = props;
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState('all');
  const [filterEl, setFilterEl] = useState(null);

  const accountTypes = {
    all: 'All Accounts',
    depository: 'Checking/ Savings',
    investment: 'Investments',
    credit: 'Credit Cards',
    loan: 'Loans',
    other: 'Other'
  };

  try {
    let cardsArray = [];

    if (data) {
      if (data.accounts) {
        Object.values(data.accounts).map(item => {
          cardsArray = cardsArray.concat(item);
          return null;
        });
      } else {
        cardsArray = data.slice(0);
      }
    }

    if (activeItem !== 'all') {
      cardsArray = cardsArray.filter(item => item.type === activeItem);
    }

    const openFilter = event => {
      setFilterEl(event.currentTarget);
    };

    const closeFilter = () => {
      setFilterEl(null);
    };

    const changeFilter = filter => {
      setActiveItem(filter);
      closeFilter();
    };

    const openAddAccount = () => toggleAddAccountModal({ isOpen: true });

    return data ? (
      <div className={classes.contentWrapper}>
        <div className={classes.titleWrapper}>
          <div>
            <Typography className={classes.title}>
              <Icon
                icon="arrow-left"
                className={classes.arrowLeft}
                role="presentation"
                onClick={goBack}
              />{' '}
              Accounts
            </Typography>
            <Typography className={classes.subTitle}>
              Connected accounts
            </Typography>

            <div className={classes.filterWrapper}>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={openFilter}
                className={classes.filterActiveEl}
              >
                {accountTypes[activeItem]}
                <Icon icon="arrow-down" className={classes.activeItemIco} />
              </Button>
              <Menu
                className={classes.filter}
                anchorEl={filterEl}
                keepMounted
                open={Boolean(filterEl)}
                onClose={closeFilter}
              >
                {Object.keys(accountTypes).map(item => (
                  <MenuItem
                    onClick={() => changeFilter(item)}
                    key={item}
                    className={classes.filterItem}
                  >
                    {accountTypes[item]}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <div className={classes.topBtn}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.submitBtn}
              onClick={openAddAccount}
            >
              +Add account
            </Button>
          </div>
        </div>
        <div className={classes.content}>
          {cardsArray.map(item => {
            return <AccountItem key={item.id} data={item} />;
          })}
        </div>
      </div>
    ) : (
      <Preloader isCards />
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Accounts.defaultProps = {
  data: undefined,
  toggleAddAccountModal: undefined,
  goBack: undefined
};

Accounts.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  toggleAddAccountModal: PropTypes.func,
  goBack: PropTypes.func
};

export default Accounts;
