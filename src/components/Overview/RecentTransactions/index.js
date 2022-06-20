import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  // Checkbox,
  Tooltip,
  Typography
} from '@material-ui/core';
import moment from 'moment';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { numberWithCommas } from '../../../utils/helpers';
import noData from '../../../assets/img/no-data.svg';

const useStyles = makeStyles(theme => ({
  tableWrapper: {
    boxSizing: 'border-box',
    width: '100%'
  },
  title: {
    fontSize: '22px',
    fontWeight: '900',
    paddingLeft: '5px',
    marginTop: '20px'
  },
  titleLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  table: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  tableBody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  tableRow: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '10px 0'
  },
  selectedRow: {
    background: '#FFFFFF !important'
  },
  checkboxRoot: {
    '&:hover': {
      background: 'transparent'
    }
  },
  checkboxChecked: {
    color: `${theme.palette.primary.main} !important`,
    '&:hover': {
      background: 'transparent !important'
    }
  },
  tableCell: {
    display: 'inline-flex',
    border: '0',
    fontSize: '20px'
  },
  checkboxCell: {
    width: '5%'
  },
  dateCell: {
    // width: '15%',
    width: '20%',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap'
  },
  descCell: {
    width: '40%',
    position: 'relative'
  },
  descOverflow: {
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'absolute',
    top: '0',
    left: '16px',
    right: '16px'
  },
  catCell: {
    width: '20%',
    color: theme.palette.text.secondary,
    fontWeight: '900',
    position: 'relative'
  },
  catOverflow: {
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'absolute',
    top: '0',
    left: '16px',
    right: '16px'
  },
  amountCell: {
    width: '20%',
    fontWeight: '900',
    color: theme.palette.text.primary
  },
  creditRow: {
    color: '#65C842'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  noDataTextWrapper: {
    textAlign: 'center'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    paddingLeft: '5px',
    fontSize: '20px',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    '& b': {
      color: theme.palette.text.primary
    },
    '& img': {
      margin: '10px auto'
    }
  },
  connectBtn: {
    padding: '4px 18px',
    marginTop: '10px'
  },
  [theme.breakpoints.down('xs')]: {
    tableHead: {
      display: 'none'
    },
    tableRow: {
      flexWrap: 'wrap',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
    tableCell: {
      paddingTop: '0',
      paddingBottom: '0'
    },
    checkboxCell: {
      width: '30px',
      order: '1'
    },
    dateCell: {
      // width: 'calc(50% - 30px)',
      width: '50%',
      order: '2',
      fontSize: '16px'
    },
    descCell: {
      width: '70%',
      order: '4',
      fontSize: '16px'
    },
    descOverflow: {
      top: '-10px'
    },
    catCell: {
      width: '50%',
      order: '3',
      fontSize: '16px',
      paddingLeft: '10px',
      justifyContent: 'flex-end'
    },
    catOverflow: {
      left: 'auto',
      top: '-10px'
    },
    amountCell: {
      width: '30%',
      order: '5',
      fontSize: '16px'
    }
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function RecentTransactions(props) {
  const { data, toggleAddAccountModal } = props;
  const classes = useStyles();
  const [order] = useState('desc');
  const [orderBy] = useState('date');
  // const [selected, setSelected] = useState([]);
  const [selected] = useState([]);
  const [page] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  let rows = [];
  if (data && data.transactions && data.transactions.length > 0) {
    rows = data.transactions.slice(0, 10).map(item => {
      return {
        transactionId: item.transactionId || item.transactionID,
        date: item.transactionDate,
        description: item.description,
        category:
          typeof item.category === 'object'
            ? item.category.join(', ')
            : item.category,
        amount: item.amount,
        baseType: item.baseType
      };
    });
  }

  useEffect(() => {
    if (data && data.transactions && data.transactions.length > 0) {
      setRowsPerPage(data.transactions.length);
    }
  }, [data]);

  try {
    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name);
    //   let newSelected = [];
    //
    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       selected.slice(0, selectedIndex),
    //       selected.slice(selectedIndex + 1)
    //     );
    //   }
    //
    //   setSelected(newSelected);
    // };

    const handleClick = () => {};

    const isSelected = name => selected.indexOf(name) !== -1;

    return (
      <div className={classes.tableWrapper}>
        <Link to="/transactions" className={classes.titleLink}>
          <Typography className={classes.title}>Recent Transactions</Typography>
        </Link>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <TableBody className={classes.tableBody}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = isSelected(row.transactionId);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.transactionId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.transactionId}
                      selected={isItemSelected}
                      classes={{
                        root: classes.tableRow,
                        selected: classes.selectedRow
                      }}
                    >
                      {/* <TableCell
                        padding="checkbox"
                        className={`${classes.tableCell} ${classes.checkboxCell}`}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          classes={{
                            root: classes.checkboxRoot,
                            checked: classes.checkboxChecked
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        className={`${classes.tableCell} ${classes.dateCell}`}
                      >
                        {moment(row.date).format('MMMM DD')}
                      </TableCell>
                      <TableCell
                        className={`${classes.tableCell} ${classes.descCell}`}
                      >
                        <span
                          className={classes.descOverflow}
                          name="transactionName"
                        >
                          {row.description}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`${classes.tableCell} ${classes.catCell}`}
                      >
                        <Tooltip title={row.category}>
                          <span
                            className={classes.catOverflow}
                            name="transactionCategory"
                          >
                            {row.category}
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        className={`${classes.tableCell} ${
                          classes.amountCell
                        } ${row.amount > 0 ? classes.creditRow : ''}`}
                        align="right"
                        name="transactionAmount"
                      >
                        {numberWithCommas(row.amount, true, 2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length === 0 && (
          <div className={classes.noDataTextWrapper}>
            <Typography className={classes.noDataText}>
              <img src={noData} alt="" />
              <b>You have no recent transactions</b>
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
                Connect Account
              </Button>
            </Typography>
          </div>
        )}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

RecentTransactions.defaultProps = {
  data: undefined,
  toggleAddAccountModal: undefined
};

RecentTransactions.propTypes = {
  data: PropTypes.shape({
    transactions: PropTypes.arrayOf(PropTypes.shape({})),
    toggleAddAccountModal: PropTypes.func
  })
};

export default RecentTransactions;
