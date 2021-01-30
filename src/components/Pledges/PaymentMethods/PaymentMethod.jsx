import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import RadioButtonsGroup from "./RadioButton";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddPaymentMethod from "./AddPaymentMethod"

let counter = 0;
function createData(PaymentMethod, DefaultRadio, Created, ActionButtons) {
  counter += 1;
  return { id: counter, PaymentMethod,DefaultRadio,  Created, ActionButtons};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'PaymentMethod', numeric: false, disablePadding: false, label: 'PaymentMethod' },
  { id: 'DefaultRadio', numeric: false, disablePadding: false, label: 'DEFAULT' }, 
  { id: 'Created', numeric: false, disablePadding: false, label: 'CREATED' },
  { id: 'ActionButtons', numeric: false, disablePadding: false, label: '' },
];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
    enduserpopup: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleOnClickDeleteMethod = () => {
    this.setState({ popupprop: true });
    this.setState({ anchorEl: null });
  };
  handleOnCloseProp = () => {
    this.setState({ popupprop: false });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu classes={{ paper: 'LongMenuWrapper' }}
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {/* {options.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))} */}
            <MenuItem onClick={this.handleClose}>Edit</MenuItem>
            <MenuItem onClick={this.handleOnClickDeleteMethod}>Delete</MenuItem>
        </Menu>
        <Dialog className="smallpopup"
          open={this.state.popupprop}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleOnCloseProp}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" classes={{ root: 'smpopuphead' }}>
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete your saved payment menthod ending in 9899? 
            </DialogContentText>
          </DialogContent>
          <DialogActions classes={{ root: 'actionbuttonarea', action: 'actionbutton' }}>
            <Button onClick={this.handleOnCloseProp} color="secondary">
              Cancel
            </Button>
			      <Button color="secondary">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };


  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map( row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'checkbox'}
                sortDirection={orderBy === row.id ? order : false} >
                <Tooltip title="Sort" placement={row.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                  <TableSortLabel active={orderBy === row.id} direction={order} onClick={this.createSortHandler(row.id)} >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  appBar: {
    position: 'relative',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
 row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  topButton:{
    margin:0,
  },
  Fcontainer:{
    marginTop:50,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PaymentMethodMain extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'Portfolios',
    selected: [],
    data: [
      createData('BofA***********8989', 1 ,'12/12/18'),
      createData('BofA***********1100', 1 ,'13/12/18'),
      createData('BofA***********1212', 1 ,'14/12/18'),
      createData('BofA***********1011', 1 ,'16/12/18'),
      createData('BofA***********1010', 1 ,'16/12/18'),
      createData('BofA***********0101', 1 ,'17/12/18'),
      createData('BofA***********1000', 1 ,'18/12/18'),
      createData('BofA***********1001', 1 ,'19/12/18'),
    ],
    page: 0,
    rowsPerPage: 5,
	 open: false,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
	<section class="page-wrapper">
	<MDBContainer>
	<MDBRow>
	<div class="pageheading-wrapper">
	  <MDBCol lg="8" sm="8" xs="12">
		<div class="pageheading-box portfolio_pageHeading"><h1 class="MainHeading">Payment Methods</h1></div>
		</MDBCol>
	  <MDBCol lg="4" sm="4" xs="12">
		<div class="AddPortolioButton"><MDBBtn className={classes.topButton} color="primary" variant="outlined" onClick={this.handleClickOpen}>Add Payment</MDBBtn></div>
		</MDBCol>		
	</div>	
	</MDBRow>
	<MDBRow>	
	<MDBCol lg="12" sm="12" xs="12">
      <Paper className={'tableMargin paymethoddesign responsiveTbl'}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover role="row" tabIndex={-1} className={classes.row} key={n.id}>
                      <TableCell width="45%" padding="checkbox" align="left" data-label="PaymentMethod"> {n.PaymentMethod} </TableCell>
                      <TableCell width="35%" padding="checkbox" align="left" data-label="Default">
                      <RadioButtonsGroup />
                      </TableCell>
                      <TableCell width="15%" padding="checkbox" align="left" data-label="Created">{n.Created}</TableCell>
                      <TableCell width="5%" padding="checkbox" align="left" className={'respMenuRmvespc'}><LongMenu/></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination classes={{toolbar:'ResponsiveToolbar',input:'ResponsiveInput',select: 'paginationDrop',caption:'TableTypo Responsivetbfoot',variant:"caption"}}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
	</MDBCol>
	</MDBRow>		
	</MDBContainer>
	<Dialog fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition} classes={{ paperScrollPaper: 'dialogclass' }} >
          <div className="gutterareapop">
            <IconButton edge="start" color="inherit" onClick={this.handleClose}  aria-label="Close">
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h6" color="inherit" className="h6Heading">
                Add Payment Method
              </Typography>
          <AddPaymentMethod />        
        </Dialog>
	</section>
    );
  }
}

PaymentMethodMain.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PaymentMethodMain);