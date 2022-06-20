import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu,
  MenuItem,
  Button,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  infoWrapper: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 35px',
    minHeight: '100px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '15px 20px'
    }
  },
  bankWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  bankText: {
    marginRight: '50px',
    fontSize: '18px',
    fontWeight: '900',
    [theme.breakpoints.down('sm')]: {
      marginRight: '15px'
    }
  },
  choosedItem: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #D4DEE8',
    boxSizing: 'border-box',
    borderRadius: '5px',
    height: '60px',
    width: '400px',
    padding: '0 30px',
    [theme.breakpoints.down('md')]: {
      width: '300px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '200px'
    }
  },
  choosedItemText: {
    fontSize: '16px',
    textTransform: 'uppercase',
    fontWeight: '900',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'left'
  },
  arrowDown: {
    color: theme.palette.text.secondary,
    height: '6px',
    marginLeft: 'auto'
  },
  formControl: {
    margin: '0 0 0 auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 0 -10px'
    }
  },
  label: {
    fontSize: '16px'
  },
  menuItem: {
    width: '100%'
  },
  [theme.breakpoints.down('xs')]: {
    choosedItem: {
      padding: '0 10px'
    }
  }
}));

function TransactionsFilter(props) {
  const { data, accounts, setData, setPage } = props;
  const classes = useStyles();
  const [inputData, setInputData] = useState([]);
  const [sortedAccounts, setSortedAccounts] = useState([]);
  const [currentBankId, setCurrentBankId] = useState();
  const [excludeTransfers, setExcludeTransfers] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const filterByBankId = useCallback(
    dataToFilter => {
      let filteredData = dataToFilter;

      if (excludeTransfers) {
        filteredData = dataToFilter.filter(
          item =>
            item.category.indexOf('Transfer') === -1 &&
            item.category.indexOf('Payment') === -1
        );
      }

      if (currentBankId) {
        setData(
          filteredData.filter(item => {
            const id = item.accountId || item.accountID;
            return id === currentBankId;
          })
        );
      } else {
        setData(filteredData);
      }
    },
    [currentBankId, excludeTransfers, setData]
  );

  useEffect(() => {
    if (data && data.length > 0 && data !== inputData) {
      // sorting bank accounts byt their transactions volumes
      if (accounts) {
        if (data) {
          let sortedBanks = [];

          if (Array.isArray(accounts)) {
            sortedBanks = accounts.map(item => {
              return {
                accountId: item.id,
                count: data.filter(dataItem => dataItem.accountId === item.id)
                  .length,
                name: item.name
              };
            });
          } else if (Object.keys(accounts).length > 0) {
            Object.keys(accounts).map(account => {
              sortedBanks.push({
                accountId: account,
                count: data.filter(item => item.accountId === account).length,
                name: accounts[account]
              });
              return null;
            });
          }

          sortedBanks.sort((a, b) => {
            return b.count - a.count;
          });

          setSortedAccounts(sortedBanks);
        }
      }
      // update transactions list
      setInputData(data);
      filterByBankId(data);
    }
  }, [data, accounts, inputData, filterByBankId]);

  useEffect(() => {
    filterByBankId(data);
  }, [currentBankId, filterByBankId, data]);

  try {
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const changeBank = bankId => {
      setCurrentBankId(bankId);
      handleClose();
      setPage(0);
    };

    const changeExcludeTransfers = () => {
      setExcludeTransfers(!excludeTransfers);
    };

    let curBankName;
    if (currentBankId) {
      if (Array.isArray(accounts)) {
        curBankName = accounts.find(item => item.id === currentBankId).name;
      } else if (Object.keys(accounts).length > 0) {
        curBankName = accounts[currentBankId];
      }
    }

    return (
      <div className={classes.infoWrapper}>
        <div className={classes.bankWrapper}>
          <Typography className={classes.bankText}>Bank:</Typography>
          <Button onClick={handleClick} className={classes.choosedItem}>
            <Typography className={classes.choosedItemText}>
              {curBankName || 'All Accounts'}
            </Typography>
            <Icon icon="arrow-down" className={classes.arrowDown} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem className={classes.menuItem} onClick={() => changeBank()}>
              <Typography>All Accounts</Typography>
            </MenuItem>
            {sortedAccounts.map(item => (
              <MenuItem
                className={classes.menuItem}
                onClick={() => changeBank(item.accountId)}
                key={item.accountId}
              >
                <Typography>{item.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={excludeTransfers}
              onChange={changeExcludeTransfers}
              color="primary"
            />
          }
          label="Exclude Transfers & Payments"
          classes={{ root: classes.formControl, label: classes.label }}
        />
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TransactionsFilter.defaultProps = {
  data: undefined,
  accounts: undefined,
  setData: undefined,
  setPage: undefined
};

TransactionsFilter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  accounts: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({}))
  ]),
  setData: PropTypes.func,
  setPage: PropTypes.func
};

export default TransactionsFilter;
