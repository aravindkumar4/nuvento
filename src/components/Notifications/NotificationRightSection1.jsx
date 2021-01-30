import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { MultiSelect } from "react-sm-select";
import Slide from '@material-ui/core/Slide';
import 'react-sm-select/dist/styles.css';
import Moment from 'react-moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import ComposeMailContent from './ComposeMail';//
//import SessionAccessor from '../../core/common/sessionAccessor';commented
//import { UpdateNotificationCount } from '../../core/common/common'; commented
import { getUserMessages, updateMessageStatus } from './notificationService';

let counter = 0;
function createData(MessageId, MailBoxSubject, MailBoxMessage, MailBoxDate, Status) {
    counter += 1;
    return { id: counter, MessageId, MailBoxSubject, MailBoxMessage, MailBoxDate, Status };
}

class MailCategoriesSelect extends React.Component {

    // const searchFilterOptions = {
    //   categories: this.state.filteredCategories,
    //   searchString: this.state.searchString
    // }


    constructor(props) {
        super(props);
        this.state = {
            value: this.props.categories != undefined ? this.props.categories : [],
            options: [{ value: 1, label: "Billing & Payments" },
            // { value: 2, label: "Usage" },
            { value: 3, label: "Outages" },
            { value: 4, label: "Services Orders" }],
        };
    }

    onCategoryChange = (value) => {
        this.props.setFilterMessageCategories(value);
    }

    render() {
        const { classes } = this.props;
        const Option = ({ checked, option, isSingle }) => (
            <div className="Option__renderer">
                {!isSingle && <Checkbox type="checkbox" defaultChecked={checked} tabIndex="-1" value={this.state.value} color="secondary" />}
                <span className="Option__label"> {option.label} </span>
            </div>
        );
        return (
            <MultiSelect resetable
                maxOptionsToRender={5}
                inputProps={{
                    'aria-label': 'Drop down'
                }}
                options={this.state.options}
                value={this.state.value}
                onChange={value => this.onCategoryChange(value)}
                Option={Option} className="PopUpMultiSelect"
                valuePlaceholder="All Categories" mode="counter" hasSelectAll selectAllLabel="All Categories"
            />
        );
    }
}

class SearchBar extends React.Component {
    // const searchFilterOptions = {
    //   categories: this.state.filteredCategories,
    //   searchString: this.state.searchString
    // }
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: this.props.searchString != undefined ? this.props.searchString : ""
        }
    }

    onChange = (event) => {
        this.state.searchQuery = event.currentTarget.value;
        this.setState({ searchQuery: this.state.searchQuery });
        this.props.setSearchString(this.state.searchQuery);
    }

    render() {
        return (
            <React.Fragment>
                <TextField inputProps={{ 'aria-label': 'search' }}
                    id="filled-required" label="Search Notifications"
                    style={{ marginBottom: '0' }} className={'searchtextfield'}
                    onChange={event => this.onChange(event)}
                    value={this.state.searchQuery}
                    margin="normal" variant="filled" />
                <i class="material-icons searchicon">search</i>
            </React.Fragment>
        );
    }
}

class StarButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCardView: false,
        }
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
        this.props.onClickSaved(event.currentTarget.id);
    }
    render() {
        const propItem = this.props.currentItem;
        return (
            <IconButton aria-label="Click Here To rate"
                className="StarIconButton"
                id={propItem != undefined ? propItem.MessageId : ""}
                onClick={this.changeSavedStatus}>
                {this.state.isCardView
                    ? <i class="material-icons StarIconButtonfilled">star</i>
                    : <i class="material-icons StarIconButtonbordered">star_border</i>
                }
            </IconButton>

        );
    }
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class EnhancedTableHead extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
    constructor(props) {
        super(props);
        this.state = {
            isIconView: true,
            open: false,
            isCardView: false,
            showDeleteAll: true,
            isRestore: false,
            showDeleteMessagePopUp: false,
            isTrash: false
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    changeAllSavedStatus = () => {
        this.setState({ isCardView: !this.state.isCardView });
        this.props.updateAllMessageStatus(2);
    };
    changeAllDeleteStatus = () => {
        this.setState({ isCardView: !this.state.isCardView, showDeleteMessagePopUp: false });
        this.props.updateAllMessageStatus(3);
    };

    restoreMessages = () => {
        this.setState({ isCardView: !this.state.isCardView });
        this.props.setRestore();
        this.props.updateAllMessageStatus(1);
    };

    componentWillReceiveProps(props) {
        this.setState({ isCardView: false });
        if (props.defaultFiltereMessageStatus != undefined && props.defaultFiltereMessageStatus[0] == 3) {
            this.state.showDeleteAll = false;
        } else {
            this.state.showDeleteAll = true;
        }
        if (props.defaultFiltereMessageStatus[0] == 3)
            this.setState({ isTrash: true });
        else
            this.setState({ isTrash: false });
        this.setState({ showDeleteAll: this.state.showDeleteAll });
    }

    handleShowDeleteMessage = () => {
        this.setState({ showDeleteMessagePopUp: true });
    }
    handleCloseDeleteMessage = () => {
        this.setState({ showDeleteMessagePopUp: false });
    }
    redirectToPreferenceClick = () => {

        this.context.router.history.push("/NotificationPreferences");
    }
    render() {
        const { classes } = this.props;
        const { onSelectAllClick, numSelected, rowCount } = this.props;

        return (
            <div class="module-box">
                <div class="module-box-header">

                    <div class="module-box-topbar">
                        <div class="modulebox-topbarLeft">
                            <div class="d-flex" style={{ width: '50px' }}>
                                {rowCount > 0 && <Checkbox color="secondary"
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={numSelected === rowCount}
                                    onChange={onSelectAllClick} />}

                            </div>
                            {this.state.isIconView && (
                                <div class="OnSelectMaterial">
                                    {numSelected > 0 ? (
                                        <div>
                                            <IconButton aria-label="Click Here To Delete" id="deleteAll" color="primary" onClick={this.handleShowDeleteMessage}>
                                                <i class="material-icons">delete_outline</i>
                                            </IconButton>
                                            <IconButton color="primary" aria-label="Click Here To Restore" id="undoAll" hidden={this.state.showDeleteAll} onClick={this.restoreMessages}>
                                                <i class="material-icons">undo</i>
                                            </IconButton>
                                            <IconButton hidden={!this.state.showDeleteAll} aria-label="Click Here to rate" className="StarIconButton" onClick={this.changeAllSavedStatus}>
                                                {this.state.isCardView
                                                    ? <i class="material-icons StarIconButtonfilled">star</i>
                                                    : <i class="material-icons StarIconButtonbordered">star_border</i>
                                                }
                                            </IconButton>
                                        </div>
                                    ) : (
                                            <div> </div>
                                        )}
                                </div>
                            )}
                        </div>
                        <div class="modulebox-topbarRight">
                            {/*<div class="categorydrop">
                                <MailCategoriesSelect categories={this.props.categories} setFilterMessageCategories={this.props.setFilterMessageCategories} />
                            </div>*/}
                            <div class="searchbarnotification">
                                <SearchBar searchString={this.props.searchString} setSearchString={this.props.setSearchString} />
                            </div>
                            {/*<div class="settingbuttonarea">
                                <IconButton aria-label="Click Here To setting" color="secondary" onClick={this.redirectToPreferenceClick}>
                                    <i class="material-icons">settings</i>
                                </IconButton>

                            </div>*/}
                            <div>

                            </div>
                        </div>
                    </div>

                </div>

                <Dialog open={this.state.showDeleteMessagePopUp}
                    onClose={this.handleCloseDeleteMessage}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="small-dialog-box"
                    maxWidth='false'>
                    <DialogTitle id="alert-dialog-title">
                        Delete Message(s)
					</DialogTitle>
                    <IconButton className="modalCloseIcon" edge="start" color="inherit" onClick={this.handleCloseDeleteMessage} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        {
                            this.state.isTrash
                                ?
                                <DialogContentText className="popwidth" id="alert-dialog-description">
                                    Would you like to permanently delete this message?
						</DialogContentText>
                                :
                                <DialogContentText className="popwidth" id="alert-dialog-description">
                                    Are you sure you want to delete?
						</DialogContentText>
                        }

                    </DialogContent>
                    <DialogActions>
                        <Button aria-label="Click Here to Cancel" onClick={this.handleCloseDeleteMessage} color="secondary">
                            Cancel
					</Button>
                        <Button aria-label="Click Here to Continue" onClick={this.changeAllDeleteStatus} color="secondary" autoFocus>
                            Continue
					</Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
    onRowClick: PropTypes.func.isRequired,
};

const styles = theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 550,
        '& td:hover': {
            cursor: 'pointer'
        },
        '& tr[aria-checked=true]': {
            backgroundColor: '#daf2f8 !important'
        },
    },

    tableWrapper: {
        overflowX: 'auto',
    },
    BackButton: {
        display: 'flex',
    },



});


class NotificationRightGrid1 extends React.Component {

    constructor(props) {
        super(props);
        const param = {
            status: this.state.defaultFiltereMessageStatus,
            categories: this.state.filteredCategories,
            searchString: this.state.searchString
        };
        getUserMessages(param, this.getGridDataCallBack)
    }
    state = {
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
        showReply: false,
        showClickedMessageData: {},
        showloader: true,
        selectedMessages: [],
        defaultFiltereMessageStatus: [0, 1, 2],
        filteredCategories: [],
        searchString: '',
        isRestore: false,
    };

    componentWillReceiveProps(props) {

        if (props.isTabChanged && props != undefined && props.data != undefined) {

            this.setState({ showReply: false });
            this.setState({ showloader: true });

            this.setState({ defaultFiltereMessageStatus: props.data });
            this.setState({ showClickedMessageData: {} })
            const param = {
                status: props.data,
                categories: this.state.filteredCategories,
                searchString: this.state.searchString
            };

            getUserMessages(param, this.getGridDataCallBack)
        }
    }
    updateAllMessageStatus = (status) => {
        if (this.state.selectedMessages != undefined && this.state.selectedMessages.length > 0) {
            this.setState({ showloader: true });

            if (this.state.defaultFiltereMessageStatus[0] == 3 && status != 1) {
                status = 4;
            }
            updateMessageStatus(this.state.selectedMessages, status, this.updateMessageStatusCallback)
        }
    }
    onClick = event => {
        event.preventDefault();
        const currentStateData = this.state.data;
        const ClickedMessageData = currentStateData.filter(x => x.MessageId == Number(event.currentTarget.id))[0];
        this.setState({ showReply: !this.state.showReply })
        this.setState({ showClickedMessageData: ClickedMessageData })
        this.setState({ showloader: false });
        if (ClickedMessageData != undefined && ClickedMessageData.Status == 0) {

            updateMessageStatus([Number(event.currentTarget.id)], 1, this.updateMessageStatusCallback, ClickedMessageData.Status == 0)
        }
    };
    onClickSaved = data => {
        event.preventDefault();
        const currentStateData = this.state.data;
        const ClickedMessageData = currentStateData.filter(x => x.MessageId == Number(data))[0];
        var status = 0;
        switch (Number(ClickedMessageData.Status)) {
            case 0: status = 2;
                break;
            case 1: status = 2;
                break;
            case 2: status = 1;
                break;
            default:
                break;
        }
        if (status != 0) {
            updateMessageStatus([Number(data)], status, this.updateMessageStatusCallback);
            this.refreshGridTemporary(Number(data), status);
        }
    };

    updateMessageStatusCallback = (resp, isSuccess, status, isUnreadClick) => {
        if (isSuccess) {
            if (status == 3 || status == 4) {
                toast.success("Message(s) successfully deleted.");
                this.setState({ showReply: false });
            } else if (status == 1 && !isUnreadClick) {
                this.setState({ showReply: false });
            }
            if (this.state.isRestore && status === 1) {
                this.setState({ isRestore: false });
                toast.success("Message(s) successfully moved to the original folder.");
            }
            const param = {
                status: this.state.defaultFiltereMessageStatus,
                categories: this.state.filteredCategories,
                searchString: this.state.searchString
            };
            getUserMessages(param, this.getGridDataCallBack)

        } else {

        }
        this.setState({ selected: [] });
        this.setState({ selectedMessages: [] });
    }

    ShowTrimmedSubject(body) {
        if (body.length > 18) {
            body = body.substring(0, 17);
            body = body + "...";
        }
        return (
            <div dangerouslySetInnerHTML={{ __html: body }} />
        )
    }
    ShowTrimmedMessage(body) {
        var div = document.createElement("div");
        div.innerHTML = body;
        body = div.innerText;
        return (

            <div dangerouslySetInnerHTML={{ __html: body }} />
        )
    }
    getGridDataCallBack = (resp, isSuccess, statuses) => {
        if (isSuccess) {
            if (resp.data != null && resp.data.data != null && resp.data.data.messageList != null && resp.data.data.messageList.length > 0) {
                var respnseData = resp.data.data.messageList;

                const inboxData = [];
                respnseData.map((item, i) => {
                    inboxData.push(createData(item.messageId, item.subject, item.messageBody, item.createdDate, item.status),
                    );
                });
                this.setState(state => ({ data: [] }));
                this.setState(state => ({ data: inboxData }));
                this.setState(state => ({ showloader: false }));
                //SessionAccessor.InboxUnreadCount = resp.data.data.totalUnreadCount;
                //UpdateNotificationCount(resp.data.data.totalUnreadCount);
                if (statuses.indexOf(0) != -1) {
                    this.props.handleDataChange(resp.data.data.totalUnreadCount);
                }
            } else {
                if (statuses.indexOf(0) != -1) {
                    this.props.handleDataChange(resp.data.data.totalUnreadCount);
                }
                this.setState(state => ({ data: [] }));
                this.setState(state => ({ showloader: false }));
            }
        } else {
            this.setState(state => ({ data: [] }));
            this.setState(state => ({ showloader: false }));
        }
    }


    refreshGridTemporary = (messageId, status) => {

        if (this.state.data != null && this.state.data.length > 0 && messageId != 0) {

            const inboxData = [];
            this.state.data.map((item, i) => {
                if (item.MessageId == messageId) {
                    item.Status = status;
                    this.state.showClickedMessageData = item;
                    this.setState({ showClickedMessageData: this.state.showClickedMessageData });
                }
                inboxData.push(item);
            });

            // this.setState(state => ({ data: inboxData }));
            //this.props.handleDataChange(resp.data.data);
        }

    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            this.setState(state => ({ selectedMessages: state.data.map(n => n.MessageId) }));
            return;
        }
        this.setState({ selected: [] });
        this.setState({ selectedMessages: [] });
        this.setState({ isIconView: !this.state.isIconView })
    };

    handleClick = (event, id, messageId) => {
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
                selected.slice(selectedIndex + 1),
            );
        }
        var selectedMessagesList = this.state.selectedMessages;
        if (selectedMessagesList.indexOf(messageId) == -1) {
            selectedMessagesList.push(messageId);
        } else {
            selectedMessagesList.splice(this.state.selectedMessages.indexOf(messageId), 1);
        }

        this.setState({ selectedMessages: [] })
        this.setState({ selectedMessages: selectedMessagesList })
        this.setState({ selected: newSelected });

    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    switchStatus(status) {
        switch (Number(status)) {
            case 0: return 'unread'
                break;
            case 1: return 'read'
                break;
            default:
                break;
        }
    }


    handleSaveDeleteClickMessageContent = (id, status) => {
        if (status == 3 || status == 1) {
            this.setState({ showloader: true });
        }
        if (this.state.defaultFiltereMessageStatus[0] == 3 && status == 3) {
            status = 4;
        }

        updateMessageStatus([Number(id)], status, this.updateMessageStatusCallback);
        this.refreshGridTemporary(id, status);
    }

    setFilterMessageCategories = (categories) => {
        this.setState({ showloader: true });
        this.state.filteredCategories = categories;
        this.setState({ filteredCategories: this.state.filteredCategories })
        const param = {
            status: this.state.defaultFiltereMessageStatus,
            categories: this.state.filteredCategories,
            searchString: this.state.searchString
        };
        getUserMessages(param, this.getGridDataCallBack)
    }

    setSearchString = (searchString) => {
        this.setState({ showloader: true });
        this.state.searchString = searchString;
        this.setState({ searchString: this.state.searchString })
        const param = {
            status: this.state.defaultFiltereMessageStatus,
            categories: this.state.filteredCategories,
            searchString: this.state.searchString
        };
        getUserMessages(param, this.getGridDataCallBack)
    }

    render() {
        const { classes } = this.props;
        var propsData = this.state.showClickedMessageData
        const { data, selected, rowsPerPage, page, showReply, numSelecteds } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const ReplyForm = (props) => {
            return (
                <div>
                    <div className="BackButtonArea">
                        <IconButton aria-label="Click Here to Back" className={classes.BackButton} onClick={this.onClick.bind(this)}>
                            <i class="material-icons">arrow_back</i>
                        </IconButton>
                    </div>
                    <ComposeMailContent handleSaveDeleteClickMessageContent={this.handleSaveDeleteClickMessageContent} {...propsData} />
                </div>
            );
        }


        const searchFilterOptions = {
            categories: this.state.filteredCategories,
            searchString: this.state.searchString
        }
        return (
            <React.Fragment>
                {this.state.showReply ? <ReplyForm /> :
                    <div className="NotifTable">
                        {
                            this.state.showloader &&
                            <div className='custom-loader'><CircularProgress className="SpinnCirc" size={50} thickness={3} /></div>
                        }
                        <EnhancedTableHead defaultFiltereMessageStatus={this.state.defaultFiltereMessageStatus} numSelected={selected.length}
                            {...searchFilterOptions} setSearchString={this.setSearchString}
                            setFilterMessageCategories={this.setFilterMessageCategories}
                            onSelectAllClick={this.handleSelectAllClick}
                            rowCount={data.length} updateAllMessageStatus={this.updateAllMessageStatus} setRestore={() => this.setState({ isRestore: true })} />
                        <div className="mobile-overflow">
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <TableBody>
                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(n => {
                                            const isSelected = this.isSelected(n.id);

                                            let savedProps = {
                                                onClickSaved: this.onClickSaved,
                                                currentItem: n
                                            }

                                            return (
                                                <TableRow hover className={this.switchStatus(n.Status)}
                                                    role="checkbox" aria-checked={isSelected} id={n.MessageId} tabIndex={-1}
                                                    key={n.MessageId} selected={isSelected} >
                                                    <TableCell padding="checkbox" className="checkbox-group">
                                                        <Checkbox inputProps={{ 'aria-label': 'CheckBox' }} color="secondary" checked={isSelected} onClick={event => this.handleClick(event, n.id, n.MessageId)} />
                                                        {this.state.defaultFiltereMessageStatus[0] != 3 && <StarButton {...savedProps} inputProps={{ 'aria-label': 'Star Button' }} />}
                                                    </TableCell>
                                                    <Link aria-label="Click here to read message" to="#" id={n.MessageId} onClick={this.onClick.bind(this)} className="read-message-link">
                                                        <TableCell className="subject" padding="none" align="left" id={n.MessageId}>{this.ShowTrimmedSubject(n.MailBoxSubject)}</TableCell>
                                                        <TableCell className="message" align="left" id={n.MessageId} >{this.ShowTrimmedMessage(n.MailBoxMessage)}</TableCell>
                                                        <TableCell className="datetime" align="right" id={n.MessageId} >{<Moment format="ddd M/D">
                                                            {n.MailBoxDate}
                                                        </Moment>}
                                                        </TableCell>
                                                    </Link>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow id="emptyRows" style={{ height: 30 * emptyRows }}>
                                            {data.length == 0 && <TableCell className="message" align="center" colSpan={6}>There are no messages available in this folder.</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <TablePagination classes={{ select: 'paginationDrop', caption: 'TableTypo Responsivetbfoot', variant: "caption" }}
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


                    </div>
                }
            </React.Fragment>
        );
    }
}

NotificationRightGrid1.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(NotificationRightGrid1);