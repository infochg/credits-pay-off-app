import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
  // Checkbox
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ErrorBoundary from '../../../containers/ErrorBoundary';

function EnhancedTableHead(props) {
  const {
    classes,
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort
  } = props;

  try {
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };

    const headCells = [
      { id: 'date', numeric: false, label: 'Date', classNm: classes.dateCell },
      {
        id: 'description',
        numeric: false,
        label: 'Description',
        classNm: classes.descCell
      },
      {
        id: 'category',
        numeric: false,
        label: 'Category',
        classNm: classes.catCell
      },
      {
        id: 'amount',
        numeric: true,
        label: 'Amount',
        classNm: classes.amountCell
      }
    ];

    return (
      <TableHead className={classes.tableHead}>
        <TableRow className={classes.tableHeadRow}>
          {/* <TableCell
            padding="checkbox"
            className={`${classes.tableHeadCell} ${classes.checkboxCell}`}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
              classes={{
                root: classes.checkboxRoot,
                checked: classes.checkboxChecked
              }}
            />
          </TableCell> */}
          {headCells.map(headCell => (
            <TableCell
              className={`${classes.tableHeadCell} ${headCell.classNm}`}
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                IconComponent={ArrowDropDownIcon}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.shape({
    tableHead: PropTypes.string,
    visuallyHidden: PropTypes.string,
    tableHeadRow: PropTypes.string,
    tableCell: PropTypes.string,
    checkboxCell: PropTypes.string,
    dateCell: PropTypes.string,
    descCell: PropTypes.string,
    catCell: PropTypes.string,
    amountCell: PropTypes.string,
    tableHeadCell: PropTypes.string,
    checkboxRoot: PropTypes.string,
    checkboxChecked: PropTypes.string
  }).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
