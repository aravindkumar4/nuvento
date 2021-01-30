//import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
//import CircularProgress from "@material-ui/core/CircularProgress";
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from "@material-ui/core/DialogActions";
//import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
//import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
//import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { default as React} from 'react';
//import Moment from "react-moment";
//import { Link } from "react-router-dom";
import { MultiSelect } from "react-sm-select";
import 'react-sm-select/dist/styles.css';
import { toast } from "react-toastify";
import ComposeMailContent from './ComposeMail';
//import ControlledExpansionPanels from '../Notifications/ExpansionPanel';
//import RequestHelper from "../../common/RequestHelper";
//import RequestMiddleware from "../../common/RequestMiddleware";
//import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from '../../core/Enum';

let counter = 0;
function createData(MailBoxSubject, MailBoxMessage, MailBoxDate, Status) {
  counter += 1;
  return { id: counter, MailBoxSubject, MailBoxMessage, MailBoxDate, Status };
}

class MailCategoriesSelect extends React.Component {
  //static contextType = UserContextModel;
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: "Billing", label: "Billing" },
        { value: "Usage", label: "Usage" },
        { value: "Outages", label: "Outages" },
        { value: "Services", label: "Services" },
        { value: "Efficiency", label: "Efficiency" },
      ],
    };
    this.multiselectRef = React.forwardRef();
  }

  handleOnChange(value) {
    this.props.GetSelectedCategory(value)
  }

  render() {
    const { classes } = this.props;
    const Option = ({ checked, option, isSingle }) => (
      <div className="Option__renderer">
        {!isSingle && (
          <Checkbox
            type="checkbox"
            defaultChecked={checked}
            tabIndex="-1"
            value={this.state.value}
            color="secondary"
          />
        )}
        <span className="Option__label"> {option.label} </span>
      </div>
    );
    return (
      <MultiSelect
        resetable
        maxOptionsToRender={5}
        options={this.state.options}
        value={this.state.value}
        onChange={(value) => this.setState({ value })}
        Option={Option}
        className="PopUpMultiSelect"
        valuePlaceholder="All Categories"
        mode="counter"
        hasSelectAll
        selectAllLabel="All Categories"
        onChange={this.handleOnChange.bind(this)}
      />
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TextField
          id="filled-required"
          label="Search Notifications"
          style={{ marginBottom: "0" }}
          className={"searchtextfield"}
          margin="normal"
          variant="filled"
        />
        <i className="material-icons searchicon">search</i>
      </React.Fragment>
    );
  }
}

class StarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardView: false,
      };

      if (props.currentItem != undefined) {
          if (props.currentItem.Status == 2) {
              this.setState({ isCardView: true });
              this.state.isCardView = true;
          } else {
              this.setState({ isCardView: false });
              this.state.isCardView = false;
          }
      }
    }

    changeSavedStatus = event => {
        this.setState({ isCardView: !this.state.isCardView });
        //this.props.onClickSaved(event.currentTarget.id);
    }

    render() {
        const propItem = this.props.currentItem;
    return (
      <IconButton
        className="StarIconButton"
        id={propItem != undefined ? propItem.MessageId : ""}
        onClick={this.changeSavedStatus}
        aria-label="Favourite"
      >
        {this.state.isCardView ? (
          <i className="material-icons StarIconButtonfilled">star</i>
        ) : (
          <i className="material-icons StarIconButtonbordered">star_border</i>
        )}
      </IconButton>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 550,
    "& td:hover": {
      cursor: "pointer",
    },
    "& tr[aria-checked=true]": {
      backgroundColor: "#daf2f8 !important",
    },
  },

  tableWrapper: {
    overflowX: "auto",
  },
  BackButton: {
    display: "flex",
  },
});

class NotificationRightGrid extends React.Component {
  //static contextType = UserContextModel;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
      showReply: false,
    };
    this.GetSelectedCategories = this.GetSelectedCategories.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  GetSelectedCategories(values) {
   this.props.categoryFilter(values);
  }

  onClick = (n) => {
    event.preventDefault();
    this.setState({ showReply: !this.state.showReply, showMessage: n });
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops.state.gridData != this.props.state.gridData) {
      const messages = nextprops.state.gridData && nextprops.state.gridData.messageList || [];
      let data = [];
      messages.forEach((m) => {
        let dt = new Date(m.createdDate).toString().split(" ");
        data.push(
          createData(m.subject, m.messageBody, `${dt[0]} ${dt[1]} ${dt[2]}`, "")
        );
      });
      this.setState({ data: data });
    }
  }

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
      return;
    }
    this.setState({ selected: [] });
    this.setState({ isIconView: !this.state.isIconView });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  ShowTrimmedMessage(body) {
    var div = document.createElement("div");
    div.innerHTML = body;
    body = div.innerText;
    return <div dangerouslySetInnerHTML={{ __html: body }} />;
  }

  ShowTrimmedSubject(body, length) {
    if (body.length > length) {
      body = body.substring(0, length);
      body = body + "...";
    }
    return (
      <div
        dangerouslySetInnerHTML={{ __html: body.replace(/(<([^>]+)>)/g, "") }}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const {
      data,
      selected,
      rowsPerPage,
      page,
      showReply,
      numSelecteds,
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const ReplyForm = (props) => {
      return (
        <div>
          {/* {this.state.loading && <Loader />} */}
          <div className="BackButtonArea">
            <IconButton
              aria-label="Delete"
              className={classes.BackButton}
              onClick={this.onClick.bind(this)}
            >
              <i className="material-icons">arrow_back</i>
            </IconButton>
          </div>
          <ComposeMailContent {...props}/>
        </div>
      );
    };

    return (
      <React.Fragment>
        {this.state.showReply ? (
          <ReplyForm showMessageData={this.state.showMessage}/>
        ) : (
          <div className="NotifTable table-responsive">
            <div className="module-box">
              <div className="module-box-header">
                <div className="module-box-topbar module-box-topbarRes">
                  <div className="modulebox-topbarLeft">
                    <div className="d-flex" style={{ width: "50px" }}>
                      <Checkbox
                        color="secondary"
                        indeterminate={selected > 0 && selected < data.length}
                        checked={selected === data.length}
                        // onChange={onSelectAllClick}
                      />
                    </div>
                    {this.state.isIconView && (
                      <div className="OnSelectMaterial">
                        {selected > 0 ? (
                          <div>
                            <IconButton
                              color="primary"
                              aria-label="Settings"
                              onClick={() => {
                                console.log("!23");
                              }}
                            >
                              <i className="material-icons">delete_outline</i>
                            </IconButton>
                            <StarButton />
                          </div>
                        ) : (
                          <div> </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="modulebox-topbarRight">
                    {/* <div className="categorydrop categorydropRes">
                      <MailCategoriesSelect GetSelectedCategory={this.GetSelectedCategories.bind(this)}/>
                    </div> */}
                    <div className="searchbarnotification">
                      <SearchBar />
                    </div>
                    {/*<div className="settingbuttonarea">
                      <IconButton color="primary" aria-label="Settings">
                        <i className="material-icons">settings</i>
                      </IconButton>
                    </div>*/}
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n) => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        className={n.Status}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="secondary"
                            checked={isSelected}
                            // onClick={(event) => this.handleClick(event, n.id)}
                          />
                          <StarButton />
                        </TableCell>
                        <TableCell
                          className="subject"
                          padding="none"
                          align="left"
                          onClick={()=>this.onClick(n)}
                        >
                          {this.ShowTrimmedSubject(n.MailBoxSubject, 21)}
                        </TableCell>
                        <TableCell
                          className="message"
                          align="left"
                          onClick={()=>this.onClick(n)}
                        >
                          {this.ShowTrimmedSubject(n.MailBoxMessage, 100)}
                        </TableCell>
                        <TableCell
                          className="datetime"
                          align="right"
                          onClick={()=>this.onClick(n)}
                        >
                          {n.MailBoxDate}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow id="emptyRows" style={{ height: 30 * emptyRows }}>
                    {data.length == 0 && (
                      <TableCell className="message" align="center" colSpan={6}>
                        There are no messages available in this folder.
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              classes={{
                select: "paginationDrop",
                caption: "TableTypo Responsivetbfoot",
                variant: "caption",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

NotificationRightGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationRightGrid);

