import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MDBCol } from 'mdbreact';
import TextField from '@material-ui/core/TextField';

import {
  GetSorting,
  StableSort,
  SearchGrid,
  RowsPerPageOptions,
} from "../../core/GridFunction";

import Pagination from "./../../shared/Views/Table/TablePagination";
import Header from "../../shared/Views/Table/TableHeader";
import { GridSearchTypeEnum } from "../../core/Enum";

function createData(Address, ServiceAddress, SmallText, Account, PaymentDate, Payment) {
  return { Address, ServiceAddress, SmallText, Account, PaymentDate, Payment };
}

const rows = [
  createData('Tatiana Santiago', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Alexandra Childress', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Jordan Porter', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Miranda Castillo', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Samantha Blanchard', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Shanika Gijsbert', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Forrest Welch', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Theodor Lovrenc', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Xuan-Xi Ling', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Janice Yevgeny', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Tatiana Santiago', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Alexandra Childress', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Jordan Porter', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Samantha Blanchard', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Forrest Welch', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Theodor Lovrenc', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Forrest Welch', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Alexandra Childress', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
  createData('Janice Yevgeny', '12345678 Apple Seed St, Unit 1', 'Second Row Information', '000000012345', '11/20/19', '$116.12'),
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const headCells = [
  { id: 'Address', numeric: false, disablePadding: false, label: 'Customer' },
  { id: 'ServiceAddress', numeric: false, disablePadding: false, label: 'Service Address' },
  { id: 'Account', numeric: false, disablePadding: false, label: 'Account #' },
  { id: 'PaymentDate', numeric: false, disablePadding: false, label: 'Payment Date' },
  { id: 'Payment', numeric: false, disablePadding: false, label: 'Payment' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
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
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [selected, setselected] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Customer");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = useState(rows);
  const [searchData, setSearchData] = useState(rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
  const handleOnSearch = (e, data) => {
    if(e.target.value.length==0){
      setData(searchData);
    }else{

    const searchData = SearchGrid(data, e.target.value, GridSearchTypeEnum.PaymentHistory);
    setData(searchData);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <MDBCol lg="6" sm="6" xs="12" className="accountboxContainer">
          <div className="searchportfolio pldgehistrysrch">
            <TextField id="filled-required" onChange={(e)=>handleOnSearch(e, searchData)}
            placeholder="Search by name, address, or account" className={'searchtextfield'} margin="normal" variant="filled" />
            <i class="material-icons searchicon">search</i>
          </div>
        </MDBCol>
        <MDBCol lg="12" sm="12" xs="12" className="paymentHisTable">
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <Header
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            headCells={headCells}
          />
            <TableBody>
              {StableSort(data, GetSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell width="20%" padding="default" align="left" data-label="Customer">{row.Address}</TableCell>
                      <TableCell width="30%" padding="default" className="smltxtspacing" align="left" data-label="Service Address">
                        {row.ServiceAddress}
                        <p className="smlltxt">{row.SmallText}</p>
                      </TableCell>
                      <TableCell width="20%" padding="default" align="left" data-label="Account #">{row.Account}</TableCell>
                      <TableCell width="20%" padding="default" align="left" data-label="Payment Date">{row.PaymentDate}</TableCell>
                      <TableCell width="10%" padding="default" align="left" data-label="Payment">{row.Payment}</TableCell>
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
        <Pagination
        rowsPerPageOptions={RowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
        <div className="download_tbllnk Resdownload_tbllnk">
          <Typography component="p" color="textPrimary">
            <a aria-label="Click here to download paymemt history" href="" role="button" download><i class="material-icons icoaccor">get_app</i>Download Payment History (Excel)</a>
          </Typography>
        </div>
        </MDBCol>
        
      </Paper>
    </div>
  );
}
