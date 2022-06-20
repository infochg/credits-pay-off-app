import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  // Checkbox,
  Tooltip
} from '@material-ui/core';
import moment from 'moment';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  tableWrapper: {
    padding: '15px'
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
  tableHeadRow: {
    display: 'flex',
    width: '100%'
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
  tableHeadCell: {
    display: 'inline-flex',
    border: '0',
    fontSize: '20px !important',
    color: `${theme.palette.text.secondary} !important`,
    fontWeight: '900 !important'
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
      fontSize: '16px',
      whiteSpace: 'nowrap'
    },
    descCell: {
      width: '70%',
      order: '4',
      fontSize: '16px'
    },
    descOverflow: {
      position: 'relative',
      top: '0',
      left: '0',
      right: '0'
    },
    catCell: {
      width: '50%',
      order: '3',
      fontSize: '16px',
      paddingLeft: '10px',
      justifyContent: 'flex-end'
    },
    catOverflow: {
      position: 'relative',
      top: '0',
      left: '0',
      right: '0'
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

function TransactionsTable(props) {
  const { data, page, setPage } = props;
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const rows = data.map(item => {
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

  useEffect(() => {
    if (data && data.length > 0) {
      if (data.length > 10) {
        setRowsPerPage(10);
      } else {
        setRowsPerPage(data.length);
      }
    }
  }, [data]);

  const navigateByKeys = key => {
    if (key.code === 'ArrowLeft') {
      if (page > 0) {
        setPage(page - 1);
      }
    } else if (key.code === 'ArrowRight') {
      if (page < data.length / rowsPerPage - 1) {
        setPage(page + 1);
      }
    }
    return null;
  };

  useEffect(() => {
    window.addEventListener('keydown', navigateByKeys);

    return function cleanup() {
      window.removeEventListener('keydown', navigateByKeys);
    };
  });

  try {
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleSelectAllClick = event => {
      if (event.target.checked) {
        const newSelecteds = rows.map(n => n.transactionId);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

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

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div className={classes.tableWrapper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          rowsPerPage={rowsPerPage}
          component="div"
          count={rows.length}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TransactionsTable.defaultProps = {
  data: undefined,
  page: undefined,
  setPage: undefined
};

TransactionsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  page: PropTypes.number,
  setPage: PropTypes.func
};

export default TransactionsTable;
