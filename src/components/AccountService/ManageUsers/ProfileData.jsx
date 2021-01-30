import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import LongMenu from './LongMenu';
import { MDBCol } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import MessageBox from "../../../shared/Views/MessageBox";
import Loader from "../../../shared/Views/Loader";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from "../../../core/Enum";
import RequestHelper from "../../../common/RequestHelper";
import { SearchGrid } from "../../../core/GridFunction";
import { GridSearchTypeEnum } from "../../../core/Enum";

// function createData(Users, Role, Status) {
//     return { Users, Role, Status };
// }

// const rows = [
//     createData('Ren Xue', 'Usage Analyst', 'Request Sent'),
//     createData('Malin Quist', 'Usage Analyst', 'Request Sent'),
//     createData('Leon Hunt', 'Usage Analyst', 'Active'),
//     createData('Stepan Assonov', 'Usage Analyst', 'Active'),
//     createData('Seri Anand', 'Usage Analyst', 'Inactive'),
//     createData('Fatima Delgadillo', 'Usage Analyst', 'Active'),
//     createData('Thitiwat Shimma', 'Usage Analyst', 'Inactive'),
//     createData('Paulina Gayoso', 'Usage Analyst', 'Active'),
//     createData('Mbe Tshiguta', 'Usage Analyst', 'Active'),
//     createData('Luvleen Lawrence', 'Usage Analyst', 'Inactive'),
//     createData('Nguyễn Nguyên Khang', 'Usage Analyst', 'Request Sent'),
//     createData('Christofer Todd', 'Usage Analyst', 'Request Sent'),
//     createData('Leonardo Oliveira', 'Usage Analyst', 'Inactive'),
// ];

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

const headCells = [
    { id: 'userName', numeric: false, disablePadding: false, label: 'User' },
    { id: 'primaryAddress', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'roleName', numeric: false, disablePadding: false, label: 'Role' },
    { id: 'expiryDate', numeric: false, disablePadding: false, label: 'Exp Date' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'Action', numeric: false, disablePadding: false, label: '' },
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
                            direction={order}
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
        marginBottom: theme.spacing(2),
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
    avatar: {
        float: 'left',
        marginRight: '10px',
        width: '30px',
        height: '30px',
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
}));

export default function ProfileData(props) {
    let ctrl = document.getElementById("dtAccount");
    if (ctrl) {
        ctrl.classList.add("active");
    }
    const classes = useStyles();

    const messageRef = React.useRef(null);
    const [loading, setLoading] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('userName');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = React.useState([]);
    const [searchData, setSearchData] = React.useState([]);

    React.useEffect(() => {


        //
        const url = "GuestUser/GetAll";
        const params = "?userId=" + localStorage.getItem("UserId");
        setLoading(true);

        RequestHelper.GET(
            url,
            APIURLTypeEnum.Agency,
            params,
            (res) => {
                setLoading(false);
                if (res && res.status == StatusCodeEnum.OK) {
                    if (res.data) {
                        if (res.data.data) {

                            //   res.data.data.forEach(element => {
                            //         element.expiryDate = element.expiryDate ? formatDate(element.expiryDate).result : ''
                            //   });

                            let result = res.data.data.reduce((e, o) => {
                                if (!(o.status == 'Request Send' && new Date(o.expiryDate) < new Date()) || (o.status == 'Request Send' && o.expiryDate === null)) {
                                    e.push({
                                        ...o,
                                        expiryDate: o.expiryDate ? formatDate(o.expiryDate).result : ''
                                    });
                                }
                                return e;
                            }, []);
                            setLoading(false);
                            setData(result);
                            setSearchData(result);
                        } else {
                        }
                    } else {
                        setData(res.data.data);
                        setSearchData(res.data.data);
                    }
                } else {
                    if (res.response.data.status.message !== "No Data Found") {
                        messageRef.current.showMessage(
                            res.response.data.status.message,
                            NotificationMessageTypeEnum.Error
                        );
                    }
                    setLoading(false);
                }
            }
        );
    }, [props]);


    const formatDate = (date) => {

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        const result = [month, day, year].join('-');
        return { result };
    }

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = data.map(n => n.name);
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
        //
        if (e.target.value.length == 0) {
            setData(searchData);
        } else {
            const searchData1 = SearchGrid(
                data,
                getSearchedValue(e.target.value),
                GridSearchTypeEnum.ManageUsers
            );
            setData(searchData1);
        }
    };

    const getSearchedValue = (val) => {
        switch (val) {
            case "Admin":
                return "admin";
            case "Viewer":
                return "viewer";
            default:
                return val;
        }
    };

    const refresh = () => {
        //
        props.pageRefresh();
        //  props.closedForm.closedForm =1;
    };

    const showMessage = (row, mesg, mesgType) => {
        //

        // Update row UI
        if (mesgType === NotificationMessageTypeEnum.Success) {
            let d = data;

            setData([]);

            var result = d.find(obj => {
                return obj.guestId === row.guestId
            })

            result.roleName = row.roleName;// "Test";
            result.primaryAddress = row.primaryEMail;
            result.expiryDate = new Date(row.accessExpiryDate).toISOString()
            result.userName = row.userFirstName + " " + row.userLastName;

            setData(d);
        }

        messageRef.current.showMessage(
            mesg,
            mesgType
        );
    };

    return (

        <div className={classes.root}>
            {loading && (
                <Loader />
            )}
            <Paper className={classes.paper}>
                <MDBCol lg="6" sm="6" xs="12" className="accountboxContainer manage-user-module" role="region" aria-label="manage user">
                    <div className="searchportfolio pldgehistrysrch profileDataSearch">
                        <TextField
                            id="filled-required"
                            placeholder="Search"
                            className={'searchtextfield'}
                            margin="normal"
                            variant="filled"
                            onChange={(e) => handleOnSearch(e, searchData)}
                        />
                        <i class="material-icons searchicon">search</i>
                    </div>
                </MDBCol>
                <MDBCol lg="12" sm="12" xs="12" className="accountboxTabble table-responsive">
                    <Table
                        className={`table ${classes.table}`}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>

                            {data.length == 0 && (
                                <TableRow >
                                    <TableCell colSpan={6} >
                                        No Data Found

                                    </TableCell>
                                </TableRow>
                            )}
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >

                                            <TableCell width="35%" component="td" id={labelId} scope="row" padding="default" data-label="userName">
                                                {row.userName}
                                            </TableCell>
                                            <TableCell width="35%" align="left" padding="default" data-label="roleName">{row.primaryAddress}</TableCell>
                                            <TableCell width="35%" align="left" padding="default" data-label="roleName">{row.roleName}</TableCell>
                                            <TableCell width="35%" align="left" padding="default" data-label="roleName">{row.expiryDate ? row.expiryDate.replace(/-/g, "/") : ''}</TableCell>
                                            <TableCell width="25%" align="left" padding="default" data-label="status">

                                                {row.status === 'Active' &&
                                                    <span class="badge badge-pill badge-green">{row.status}</span>
                                                }
                                                {row.status === 'Request Send' &&
                                                    <span class="badge badge-pill badge-orange">{'Request Sent'}</span>
                                                }
                                                {row.status === 'InActive' &&
                                                    <span class="badge badge-pill badge-red">{'Inactive'}</span>
                                                }
                                                {row.status !== 'Request Send' && row.status !== 'Active' && row.status !== 'InActive' &&
                                                    <span class="badge badge-pill badge-red">{row.status}</span>
                                                }

                                            </TableCell>
                                            <TableCell width="5%" align="left" padding="default" className="respMenu">
                                                {localStorage.getItem("RoleType") !== "Viewer" &&
                                                    <LongMenu roleName={row.roleName} guestId={row.guestId} email={row.primaryAddress} name={row.userName} expiryDate={row.expiryDate} status={row.status} showMessage={showMessage} refresh={refresh} />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}


                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </MDBCol>


                <MessageBox ref={messageRef} />


            </Paper>
        </div>
    );
}
